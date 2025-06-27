import React from 'react'
import Agent from '@/components/Agents'
import { getCurrentUser } from '@/lib/actions/auth.actions'

// interface AgentProps {
//   userName: string;
//   userId: string;
//   type: "generate" | "somethingElse"; // use actual valid values
// }

const Page = async() => {

  const user = await getCurrentUser();

  return (
    <>
    <h3>Interview Generation</h3>
    <Agent userName={user?.name} userId={user?.id} type="generate"></Agent>
    </>
  )
}

export default Page
