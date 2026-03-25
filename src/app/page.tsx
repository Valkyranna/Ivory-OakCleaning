'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Content from '@/components/Content'
import Footer from '@/components/Footer'

export default function Home() {
  const [selectedAddress, setSelectedAddress] = useState('')

  return (
    <>
      <Navbar />
      <Hero initialAddress={selectedAddress} onAddressChange={setSelectedAddress} />
      <Content onAddressSelect={setSelectedAddress} currentAddress={selectedAddress} />
      <Footer />
    </>
  )
}
