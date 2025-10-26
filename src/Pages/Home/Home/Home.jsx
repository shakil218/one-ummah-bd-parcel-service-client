import React from 'react';
import Banner from '../Banner/Banner';
import ServiceSection from '../Services/ServiceSection';
import ClientLogoSlider from '../ClientLogoSlider/ClientLogoSlider';
import BenefitsSection from '../BenefitsSection/BenefitsSection';
import WorkProcess from '../WorkProcess/WorkProcess';
import Merchant from '../Merchant/Merchant';
import TestimonialCarousal from '../TestimonialCarousal/TestimonialCarousal';
import FAQSection from '../FAQSection/FAQSection';


const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <WorkProcess></WorkProcess>
      <ServiceSection></ServiceSection>
      <ClientLogoSlider></ClientLogoSlider>
      <BenefitsSection></BenefitsSection>
      <Merchant></Merchant>
      <TestimonialCarousal></TestimonialCarousal>
      <FAQSection></FAQSection>
    </div>
  );
};

export default Home;