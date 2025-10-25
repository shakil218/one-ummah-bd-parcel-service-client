import React from 'react';
import Banner from '../Banner/Banner';
import ServiceSection from '../Services/ServiceSection';
import ClientLogoSlider from '../ClientLogoSlider/ClientLogoSlider';
import BenefitsSection from '../BenefitsSection/BenefitsSection';
import WorkProcess from '../WorkProcess/WorkProcess';

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <WorkProcess></WorkProcess>
      <ServiceSection></ServiceSection>
      <ClientLogoSlider></ClientLogoSlider>
      <BenefitsSection></BenefitsSection>
    </div>
  );
};

export default Home;