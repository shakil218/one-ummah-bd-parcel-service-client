import React from "react";
import trackingImg from "../../../assets/live-tracking.png";
import safeDeliveryImg from "../../../assets/safe-delivery.png";
import supportImg from "../../../assets/safe-delivery.png";

const BenefitsSection = () => {
  const benefits = [
    {
      id: 1,
      title: "Live Parcel Tracking",
      description:
        "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
      image: trackingImg,
    },
    {
      id: 2,
      title: "100% Safe Delivery",
      description:
        "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
      image: safeDeliveryImg,
    },
    {
      id: 3,
      title: "24/7 Call Center Support",
      description:
        "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
      image: supportImg,
    },
  ];
  return (
    <section className="w-full bg-base-100 ">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col gap-8">
          {benefits.map((benefit) => (
            <div
              key={benefit.id}
              className="flex flex-col lg:flex-row bg-white rounded-xl shadow-md p-6 flex-1 items-center"
            >
              {/* Left side image */}
              <div className="lg:w-1/5 w-full flex justify-center  mb-4 lg:mb-0">
                <img
                  src={benefit.image}
                  alt={benefit.title}
                  className="w-32 h-32 object-contain"
                />
              </div>

              {/* Divider */}
              <div className=" divider lg:divider-horizontal mx-6" />

              {/* Right side title + description */}
              <div className="flex-1 text-center lg:text-left">
                <h3 className="text-2xl text-[#03373D] font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
        <hr className="hidden lg:block border border-dashed my-12" />
      </div>
    </section>
  );
};

export default BenefitsSection;
