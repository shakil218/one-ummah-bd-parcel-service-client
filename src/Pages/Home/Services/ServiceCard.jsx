// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

const ServiceCard = ({ icon, title, description }) => {
  return (
    <motion.div whileHover={{ scale: 1.05,backgroundColor:'#CAEB66' }}
                transition={{ duration: 0.3 }} className="card bg-base-100 shadow-md p-6 border border-base-200 md:rounded-2xl lg:rounded-3xl">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="flex justify-center items-center w-20 h-20 rounded-full bg-linear-to-b from-[#EEEDFC] to-[#EEEDFC] to-0%">{icon}</div>
        <h3 className="text-lg font-bold text-[#03373D]">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
