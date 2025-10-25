import React from 'react';
import Banner from '../Banner/Banner';
import ServiceSection from '../Services/ServiceSection';
import ClientLogoSlider from '../ClientLogoSlider/ClientLogoSlider';
import BenefitsSection from '../BenefitsSection/BenefitsSection';

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <ServiceSection></ServiceSection>
      <ClientLogoSlider></ClientLogoSlider>
      <BenefitsSection></BenefitsSection>
    </div>
  );
};

export default Home;