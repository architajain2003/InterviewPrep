import React from 'react'
import dayjs from 'dayjs';
import { create } from 'domain';
import { getRandomInterviewCover } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';
import DisplayTechIcons from './DisplayTechIcons';
import { getFeedbackByInterviewId } from '@/lib/actions/general.action';

const InterviewCard = async({id,userId,role,type,techstack,createdAt}:InterviewCardProps) => {
    const feedback = userId && id ? await getFeedbackByInterviewId({interviewId : id,userId}) :null;
    const normaizedType=/mix/gi.test(type) ? 'Mixed' : type;
    const formattedDate=dayjs(feedback?.createdAt || createdAt || Date.now()).format('MM DD,YYYY')
  return (
    <div className='card-border w-[360px] max-sm:w-full min-h-96'>
        <div className='card-interview'>
            <div>
                <div className='absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg bg-light-600'>
                    <p className='badge-text'>{normaizedType}</p>
                </div>
                <Image src={getRandomInterviewCover()} alt="cover image" width={90} height={90} className="rounded-full object-fit size-[90px]"></Image>
                <h3 className='mt-5 capitalize'>{role} Interview</h3>
                <div className='flex flex-row gap-5 mt-3'>
                    <div className='flex flex-row gap-2'>
                        <Image src="/calendar.svg" alt="calendar" width={22} height={22}></Image>
                        <p>{formattedDate}</p>
                    </div>
                    <div className='flex flex-row gap-2 items-center'>
                        <Image src='/star.svg' alt='star' width={22} height={22}></Image>
                        <p>{feedback?.totalScore|| '---'}/100</p>
                    </div>
                </div>
                <p className="line-clampt-2 mt-2">
                    {feedback?.finalAssessment || "You haven't taken the interview yet. Take it now to improve your skills."}
                </p>
            </div>
            <div className='flex flex-row justify-between'>
                <DisplayTechIcons techStack={techstack}></DisplayTechIcons>
                <Button className="btn-primary">
                    <Link href={feedback? `/interview/${id}/feedback` : `/interview/${id}`}>
                    {feedback? 'Check Feedback' : 'View Interview'}
                    </Link>
                </Button>
            </div>
        </div>
    </div>
  )
}

export default InterviewCard
