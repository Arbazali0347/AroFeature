import React from 'react'
import { useApp } from '../context/AppContextProvider'
import Hero from '../components/Hero'
import ProblemSection from '../components/ProblemSection'
import SolutionSection from '../components/SolutionSection'
import ProductPreview from '../components/ProductPreview'
import WhyAroFeature from '../components/WhyAroFeature'
import CTASection from '../components/CTASection'
import Footer from '../components/Footer'

const Home = () => {
    const {name} = useApp()
  return (
    <div>
      <Hero/>
      <ProblemSection/>
      <SolutionSection/>
      <ProductPreview/>
      <WhyAroFeature/>
      <CTASection/>
      <Footer/>
    </div>
  )
}

export default Home