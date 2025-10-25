import React from "react";
import ServiceSectionTitle from "./ServiceSectionTitle";
import ServiceCard from "./ServiceCard";
import { FaBoxes, FaBuilding, FaMapMarkedAlt, FaUndo } from "react-icons/fa";
import { FaHandHoldingDollar, FaTruckFast } from "react-icons/fa6";

const ServiceSection = () => {
  const servicesData = [
    {
      icon: <FaTruckFast className="text-4xl text-[#CAEB66]" />,
      title: "Express & Standard Delivery",
      description:
        "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
    },
    {
      icon: <FaMapMarkedAlt className="text-4xl text-[#CAEB66]" />,
      title: "Nationwide Delivery",
      description:
        "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
    },
    {
      icon: <FaBoxes className="text-4xl text-[#CAEB66]" />,
      title: "Fulfillment Solution",
      description:
        "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
    },
    {
      icon: <FaHandHoldingDollar className="text-4xl text-[#CAEB66]" />,
      title: "Cash on Home Delivery",
      description:
        "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
    },
    {
      icon: <FaBuilding className="text-4xl text-[#CAEB66]" />,
      title: "Corporate Service / Contract In Logistics",
      description:
        "Customized corporate services which includes warehouse and inventory management support.",
    },
    {
      icon: <FaUndo className="text-4xl text-[#CAEB66]" />,
      title: "Parcel Return",
      description:
        "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
    },
  ];


  return (
    <section className="p-4 md:p-10 lg:p-16 bg-[#03373D] rounded-xl md:rounded-2xl lg:rounded-4xl my-10">
      <div className="container mx-auto ">
        <ServiceSectionTitle
          title="Our Services"
          subtitle="Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
