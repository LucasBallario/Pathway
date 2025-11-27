import React from 'react'
import { GlobeLock,ShieldOff,BookCheck,BadgeX } from "lucide-react"

export default function Privacy() {
  return (
    <div className='flex flex-col text-center mt-15 gap-5 '>
        <div className='flex gap-4 items-center'>
            <h1 className='text-4xl font-bold text-slate-600'>Your privacy maters to us</h1>
            <GlobeLock color="#ffffff" />
        </div>

        <div className='flex'>
            <p className='text-2xl'>We dont store your data</p>
            <ShieldOff color="#ffffff" />
        </div>
       
        <div className='flex'>
            <p className='text-2xl'>We use only public sources</p>
            <BookCheck color="#ffffff" />
        </div>

        <div className='flex'>
            <p className='text-2xl'>You can delete your information at any time</p>
            <BadgeX color="#ffffff" />
        </div>



    </div>
  )
}

