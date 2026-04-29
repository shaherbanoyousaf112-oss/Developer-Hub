import React from 'react'
import Navbar from '../components/Home/Navbar'
import HeroSection from '../components/Home/HeroSection'
import HeroBanner from '../components/Home/HeroBanner'
import FreePlatformBanner from '../components/Home/FreePlatformBanner'
import Features from '../components/Home/Features'
import ConsultationSection from '../components/Home/ConsultSection'
import TestimonialsSection from '../components/Home/Testimonials'
import Footer from '../components/Home/Footer'

function Home() {

  return (
    <>
      <Navbar />
      <HeroSection/>
      <HeroBanner/>
      <FreePlatformBanner/>
      <Features/>
      <ConsultationSection/>
      <TestimonialsSection/>
      <Footer/>
    </>
  )
}

export default Home
