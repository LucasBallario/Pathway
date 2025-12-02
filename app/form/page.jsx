import React from 'react'

export default function page() {
  return (
    <div className='p-10 bg-white border-slate-500 rounded-xl w-[40%] justify-center items-center m-auto'>
        <div className=''>
            <p className='text-2xl font-semibold text-center'>Personal information</p>

              <form className='flex flex-col gap-3'>
                <label>Full Name/Alias</label>
                <input className='px-5 border-1 border-slate-500 rounded-lg' type='text' />

                <label>Gmail</label>
                <input className='px-5 border-1 border-slate-500 rounded-lg' type='text' />

                <label>Additional keywords</label>
                <input className='px-5 border-1 border-slate-500 rounded-lg' type='text' />

                <label>Region</label>
                <input type='radio' />
              </form>
        </div>


    </div>
  )
}
