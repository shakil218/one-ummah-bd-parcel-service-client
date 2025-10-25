import React from "react";
import profile from "../../../assets/image-upload-icon.png";
import { FaQuoteRight } from "react-icons/fa";

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="card w-80 bg-base-100 shadow-lg p-6 border border-base-200 md:rounded-2xl lg:rounded-3xl">
      <div className="flex flex-col  space-y-4">
        {/* <div className="flex justify-center items-center w-20 h-20 rounded-full bg-linear-to-b from-[#EEEDFC] to-[#EEEDFC] to-0%">{}</div> */}

        <FaQuoteRight className="text-4xl text-primary/50 mb-4" />
        <p className="text-gray-600 leading-relaxed mb-6">
          {testimonial.quote}
        </p>
        <hr className="border-gray-200 mb-4" />

        <div className=" flex items-center gap-4">
          <img
            src={profile}
            alt={testimonial.name}
            className="w-12 h-12 rounded-full object-cover border-2 border-primary"
          />
          <div className="text-left">
            <h4 className="font-semibold text-lg text-primary">
              {testimonial.name}
            </h4>
            <p className="text-gray-500 text-sm">{testimonial.title}</p>
          </div>
        </div>
        {/* <h3 className="text-lg font-bold text-[#03373D]">{}</h3>
        <p className="text-sm text-gray-600">{}</p> */}
      </div>
    </div>
  );
};

export default TestimonialCard;
