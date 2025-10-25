import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

import client1 from "../../../assets/brands/amazon.png";
import client2 from "../../../assets/brands/moonstar.png";
import client3 from "../../../assets/brands/casio.png";
import client4 from "../../../assets/brands/amazon_vector.png";
import client5 from "../../../assets/brands/randstad.png";
import client6 from "../../../assets/brands/start-people 1.png";
import client7 from "../../../assets/brands/start.png";


const logos = [client1, client2, client3, client4, client5, client6, client7];

const ClientLogoSlider = () => {
  return (
    <section className="py-16 bg-base-100">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-[#03373D] mb-10">We've helped thousands of sales teams</h2>

        <Swiper
          modules={[Autoplay]}
          slidesPerView={2}
          spaceBetween={30}
          loop={true}
          autoplay={{
            delay: 0, // No delay between slides
            disableOnInteraction: false,
            reverseDirection: false,
            pauseOnMouseEnter:true,
          }}
          speed={4000} // controls speed of slide movement
          breakpoints={{
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
          }}
          className="mySwiper"
        >
          {logos.map((logo, index) => (
            <SwiperSlide key={index}>
              <div className="flex justify-center items-center">
                <img
                  src={logo}
                  alt={`Client ${index + 1}`}
                  className="w-28 h-6 sm:w-32 md:w-36 lg:w-40 object-contain  transition-all duration-300"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <hr className="hidden lg:block border border-dashed mt-12" />
      </div>
    </section>
  );
};

export default ClientLogoSlider;
