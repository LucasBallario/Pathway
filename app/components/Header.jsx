import React from 'react'
import Image from 'next/image'
import Phone from '@/public/phone.svg'

export default function Header() {
  return (
    <div className='flex flex-col text-center text-white'>
        <div className='m-6'>
            <h1 className=' text-3xl'>Pathway</h1>
        </div>

        <div className='flex justify-center text-center'>
              <h2>See your digital footprint and protect yourself</h2>
              <Image src={Phone} alt='phone' className='h-30 w-30'/>

        </div>
    </div>
  )
}
