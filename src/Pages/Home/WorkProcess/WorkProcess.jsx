import {
  FaBuilding,
  FaMoneyBillWave,
  FaMotorcycle,
  FaWarehouse,
} from "react-icons/fa";
import { motion } from "motion/react";

const WorkProcess = () => {
  const works = [
    {
      id: 1,
      title: "Booking Pick & Drop",
      icon: FaMotorcycle,
      description:
        "Book your delivery quickly through our platform and enjoy doorstep pickup and drop-off service with real-time tracking.",
    },
    {
      id: 2,
      title: "Cash On Delivery",
      icon: FaMoneyBillWave,
      description:
        "We provide secure cash-on-delivery services across Bangladesh, ensuring safe payments and smooth order completion.",
    },
    {
      id: 3,
      title: "Delivery Hub",
      icon: FaWarehouse,
      description:
        "Our centralized delivery hubs handle your parcels efficiently, ensuring timely sorting and dispatch to every destination.",
    },
    {
      id: 4,
      title: "Booking SME & Corporate",
      icon: FaBuilding,
      description:
        "We offer dedicated delivery and logistics solutions for SMEs and corporate clients, ensuring reliability and convenience.",
    },
  ];

  return (
    <section className="w-full bg-base-100 ">
      <div className="max-w-7xl mx-auto px-4 ">
        {/* Section Title */}
        <h2 className="text-3xl font-bold mb-4">How It Works</h2>

        {/* Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {works.map((step) => {
            const Icon = step.icon;
            return (
              <motion.div
                whileHover={{ scale: 1.05, backgroundColor: "#CAEB66" }}
                transition={{ duration: 0.3 }}
                key={step.id}
                className="card bg-white shadow-md p-6 rounded-xl flex flex-col items-center text-center"
              >
                {/* Icon */}
                <div className="text-[#CAEB66] mb-4 flex justify-center items-center w-20 h-20 rounded-full bg-linear-to-b from-[#EEEDFC] to-[#EEEDFC] to-0%">
                  <Icon size={50} />
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>

                {/* Description */}
                <p className="text-gray-600 text-sm">{step.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WorkProcess;
