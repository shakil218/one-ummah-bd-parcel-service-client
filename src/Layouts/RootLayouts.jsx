import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Pages/Shared/Navbar/Navbar';
import Footer from '../Pages/Shared/Footer/Footer';

const RootLayouts = () => {
  return (
    <div className='my-5'>
      <Navbar></Navbar>
      <div className='min-h-[calc(100vh-420px)]'>
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default RootLayouts;