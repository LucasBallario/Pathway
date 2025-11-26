import React from 'react'
import Image from 'next/image'
import Phone from '@/public/phone.svg'

export default function Header() {
  return (
    <div className="flex flex-col items-center justify-center text-white py-16 px-4">
      <div className="mb-6">
        <h1 className="text-4xl font-bold tracking-tight">Pathway</h1>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-center gap-4 lg:gap-8 max-w-4xl">
        <div className="flex flex-col flex-1 text-center lg:text-left">
          <h2 className="text-3xl lg:text-4xl font-semibold leading-tight text-balance">
            Find your digital footprint before others do
          </h2>
          <p className="text-lg lg:text-xl text-slate-300 mt-4 leading-relaxed">
            We analyze your online presence to help you protect your privacy and reduce digital risks
          </p>
        </div>

        <div className="flex justify-center flex-shrink-0">
          <Image
            src={Phone}
            alt="Phone mockup showing Pathway app interface for digital privacy protection"
            height={256}
            width={256}
            className="h-48 w-48 lg:h-64 lg:w-64 object-contain"
          />
        </div>
      </div>
    </div>
  )
}
