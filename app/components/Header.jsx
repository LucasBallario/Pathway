'use client'
import React from 'react'
import Image from 'next/image'
import Phone from '@/public/phone.svg'
import Information from './Information'
import Instructions from './Instructions'
import Privacy from './Privacy'
import { useRouter } from 'next/navigation'



export default function Header() {
  const Router = useRouter()
  return (
    <div className="flex flex-col items-center text-white">
      {/* Hero Section */}
      <div className="min-h-[90vh] flex flex-col lg:flex-row items-center justify-center px-6 lg:px-16 w-full max-w-6xl mx-auto gap-12 lg:gap-20">
        {/* Left - Text Content */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left flex-1">
          <p className="text-xs tracking-[0.25em] uppercase text-slate-500 mb-6">Pathway</p>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium leading-tight text-balance">
            Find your digital footprint before others do
          </h1>
          
          <p className="text-base text-slate-400 mt-5 leading-relaxed max-w-md font-light">
            We analyze your online presence to help you protect your privacy and reduce digital risks
          </p>

          <button 
            onClick={() => Router.push('/consent')} 
            className='px-8 py-3 rounded-full bg-white text-black hover:bg-slate-200 transition-colors font-medium text-sm mt-8 cursor-pointer'
          >
            Get Started
          </button>
        </div>

        {/* Right - Phone Image */}
        <div className="flex-shrink-0">
          <Image
            src={Phone || "/placeholder.svg"}
            alt="Phone mockup showing Pathway app interface for digital privacy protection"
            height={380}
            width={380}
            className="h-72 w-72 md:h-80 md:w-80 lg:h-[380px] lg:w-[380px] object-contain"
          />
        </div>
      </div>
      <Information />
      <Instructions />
      <Privacy />
    </div>
  )
}
