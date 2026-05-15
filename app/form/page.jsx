'use client'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useRouter } from 'next/navigation'
import {useScan} from '../context/ScanContext'
import ScanningLoader from '../components/ScanningLoader'
import { fadeInUp, scaleIn, staggerContainer, staggerItem } from '@/lib/motion-presets'

export default function Page() {
  const router = useRouter()
  const { setScanResults } = useScan()
  const [isScanning, setIsScanning] = useState(false);
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
    setIsScanning(true)

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
        setIsScanning(false);

      })

  }

  return (
    <div className='flex min-h-screen items-center justify-center bg-midnight-void p-6'>
      <AnimatePresence>
        {isScanning && <ScanningLoader key="scan-loader" />}
      </AnimatePresence>
      <motion.div
        className='w-full max-w-md rounded-lg border border-dark-carbon bg-deep-space p-8'
        variants={scaleIn}
        initial="hidden"
        animate="visible"
      >
        <motion.div className='mb-8' variants={fadeInUp} initial="hidden" animate="visible">
          <h1 className='mb-2 text-center text-[1.75rem] font-bold leading-[1.22] text-polar-white'>Search Information</h1>
          <p className='text-center text-[13px] font-normal leading-[1.43] text-ash-gray'>Complete the form to begin your search</p>
        </motion.div>

        <motion.form
          onSubmit={handleFormSubmit}
          className='space-y-6'
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={staggerItem} className='space-y-2'>
            <label className='block text-[14px] font-normal text-polar-white'>
              Full Name/Alias
            </label>
            <input onChange={handleChange} value={formData.fullName} name='fullName'
              className='w-full rounded-lg border border-dark-carbon bg-midnight-void px-4 py-3 text-[14px] text-polar-white outline-none transition-colors placeholder:text-ash-gray focus:border-slate focus:ring-1 focus:ring-slate'
              type='text'
              placeholder='Enter name or alias'
            />
          </motion.div>

          <motion.div variants={staggerItem} className='space-y-2'>
            <label className='block text-[14px] font-normal text-polar-white'>
              Gmail
            </label>
            <input onChange={handleChange} value={formData.email} name='email'
              className='w-full rounded-lg border border-dark-carbon bg-midnight-void px-4 py-3 text-[14px] text-polar-white outline-none transition-colors placeholder:text-ash-gray focus:border-slate focus:ring-1 focus:ring-slate'
              type='email'
              placeholder='example@gmail.com'
            />
          </motion.div>

          <motion.div variants={staggerItem} className='space-y-2'>
            <label className='block text-[14px] font-normal text-polar-white'>
              Additional Keywords
            </label>
            <input onChange={handleChange} value={formData.keyWords} name='keyWords'
              className='w-full rounded-lg border border-dark-carbon bg-midnight-void px-4 py-3 text-[14px] text-polar-white outline-none transition-colors placeholder:text-ash-gray focus:border-slate focus:ring-1 focus:ring-slate'
              type='text'
              placeholder='Enter keywords separated by commas'
            />
          </motion.div>

          <motion.div variants={staggerItem} className='space-y-2'>
            <label className='block text-[14px] font-normal text-polar-white'>
              Country
            </label>
            <select onChange={handleChange} value={formData.region} name='region'
              className='w-full cursor-pointer rounded-lg border border-dark-carbon bg-midnight-void px-4 py-3 text-[14px] text-polar-white outline-none transition-colors focus:border-slate focus:ring-1 focus:ring-slate'
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
          </motion.div>

          <motion.button
            type='submit'
            variants={staggerItem}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.985 }}
            transition={{ type: 'spring', stiffness: 480, damping: 22 }}
            className='w-full cursor-pointer rounded-[4.5px] bg-gradient-to-b from-[#3a3a3a] to-dark-carbon py-3 text-[16px] font-normal text-absolute-zero transition-opacity hover:opacity-90'
          >
            {isScanning ? 'Processing...' : 'Search'}
          </motion.button>
        </motion.form>
      </motion.div>
    </div>
  )
}
