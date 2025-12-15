'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import {useScan} from '../context/ScanContext'

export default function Page() {
  const router = useRouter()
  const { setScanResults } = useScan()
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    keyWords: "",
    region: ""
  })
  const handleChange = (e) => {
    const {name, value} = e.target
    setFormData((prev) => ({
      ...prev,
      [name] : value }))

    
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    const data = new FormData()
    
    data.append("fullName", formData.fullName)
    data.append("email", formData.email)
    data.append("keyWords", formData.keyWords)
    data.append("region", formData.region)

    fetch("/api/scan", { method: "POST", body: data })
      .then(async response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        } 
        const result = await response.json()
        setScanResults(result.results)
        router.push("/scan/results")
        console.log("SCAN RESULT:", result) 

      })
      .catch(error => {
        console.error('Error fetching JSON:', error);

      })

  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-6'>
      <div className='w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-slate-200'>
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-slate-800 text-center mb-2'>Search Information</h1>
          <p className='text-slate-500 text-center text-sm'>Complete the form to begin your search</p>
        </div>

        <form onSubmit={handleFormSubmit} className='space-y-6'>
          <div className='space-y-2'>
            <label className='block text-sm font-medium text-slate-700'>
              Full Name/Alias
            </label>
            <input onChange={handleChange} value={formData.fullName} name='fullName'
              className='w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-600 focus:border-transparent outline-none transition-all' 
              type='text'
              placeholder='Enter name or alias'
            />
          </div>

          <div className='space-y-2'>
            <label className='block text-sm font-medium text-slate-700'>
              Gmail
            </label>
            <input onChange={handleChange} value={formData.email} name='email'
              className='w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-600 focus:border-transparent outline-none transition-all' 
              type='email'
              placeholder='example@gmail.com'
            />
          </div>

          <div className='space-y-2'>
            <label className='block text-sm font-medium text-slate-700'>
              Additional Keywords
            </label>
            <input onChange={handleChange} value={formData.keyWords} name='keyWords'
              className='w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-600 focus:border-transparent outline-none transition-all' 
              type='text'
              placeholder='Enter keywords separated by commas'
            />
          </div>

          <div className='space-y-2'>
            <label className='block text-sm font-medium text-slate-700'>
              Country
            </label>
            <select onChange={handleChange} value={formData.region} name='region'
              className='w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-600 focus:border-transparent outline-none transition-all bg-white cursor-pointer'
            >
              <option value=''>Select a country</option>
              <option value='AR'>Argentina</option>
              <option value='US'>United States</option>
              <option value='MX'>Mexico</option>
              <option value='ES'>Spain</option>
              <option value='CO'>Colombia</option>
              <option value='CL'>Chile</option>
              <option value='PE'>Peru</option>
              <option value='VE'>Venezuela</option>
              <option value='EC'>Ecuador</option>
              <option value='BR'>Brazil</option>
              <option value='UY'>Uruguay</option>
              <option value='PY'>Paraguay</option>
              <option value='BO'>Bolivia</option>
              <option value='CR'>Costa Rica</option>
              <option value='PA'>Panama</option>
              <option value='GT'>Guatemala</option>
              <option value='HN'>Honduras</option>
              <option value='SV'>El Salvador</option>
              <option value='NI'>Nicaragua</option>
              <option value='DO'>Dominican Republic</option>
              <option value='CU'>Cuba</option>
              <option value='PR'>Puerto Rico</option>
            </select>
          </div>

          <button
            type='submit'
            className='w-full bg-slate-600 hover:bg-black cursor-pointer text-white font-semibold py-3 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg'
          >
            Search
          </button>
        </form>
      </div>
    </div>
  )
}