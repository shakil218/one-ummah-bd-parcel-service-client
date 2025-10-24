import React from "react";

const ServiceSectionTitle = ({title,subtitle}) => {
  return (
    <div className="text-center max-w-2xl mx-auto mb-10 text-white">
      <h2 className="text-3xl font-extrabold mb-3">{title}</h2>
      <p className="">{subtitle}</p>
    </div>
  );
};

export default ServiceSectionTitle;
