'use server';
import { auth, db } from "@/firebase/admin";
import path from "path";
import { cookies } from "next/headers";
// import { _success } from "zod/v4/core";

 //to make the file server render

export async function signUp(params:SignUpParams){
    const {uid,name,email} =params;

    try{
        const userRecord = await db.collection('users').doc(uid).get();
        if(userRecord.exists){
            return{
                success:false,
                message:'user already exists. Please sign in instead'
            }
        }
        await db.collection('users').doc(uid).set({
            name,email
        })
        return{
            success:true,
            message:'account created successfully. Please sign in'
        }
    }
    catch(e:any){
        console.log("error creating a user",e);
        if(e.code==='auth/email-already-exists') {
            return{
                success:false,
                message: 'this email is already in use'
            }
        }
        return {
            success:false,
            message: 'failed to create an account'
        }
    }
}

export async function signIn(params:SignInParams){
    const{email,idToken} =params;

    try{
        const userRecord = await auth.getUserByEmail(email);
        if(!userRecord){
            return{
                success : false,
                message:'User does not exist. create an account instead'
            }
        }
        await setSessionsCookie(idToken);
    }
    catch(e){
        console.log(e);
        return{
            success: false,
            message: ' failed to log into an account'
        }
    }
}

export async function setSessionsCookie(idToken:string){
    const cookieStore = await cookies();

    const sessionCookie =await auth.createSessionCookie(idToken,{
        expiresIn:60*60*24*7 * 1000,
    })
    cookieStore.set('session',sessionCookie,{
        maxAge : 60*60*24*7,
        httpOnly:true,
        secure: process.env.NODE_ENV === 'production',
        path : '/',
        sameSite : 'lax'
    })
}

export async function getCurrentUser(): Promise<User | null>{
    const cookieStore=await cookies();
    const sessionCookie=cookieStore.get('session')?.value;
    if(!sessionCookie) return null;

    try{
        const decodedClaims = await auth.verifySessionCookie(sessionCookie,true);
        const userRecord = await db.collection('users').doc(decodedClaims.uid).get();

        if(!userRecord.exists) return null;

        return{
            ...userRecord.data(),
            id:userRecord.id,
        } as User;
    }
    catch(e){
        console.log(e)
        return null;
    }
}

export async function isAuthenticated(){
    const user= await getCurrentUser();

    return !!user;
}

