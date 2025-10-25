import locationMerchant from "../../../assets/location-merchant.png";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

const Merchant = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 bg-[url('assets/be-a-merchant-bg.png')] bg-[#03373D] bg-top bg-no-repeat rounded-xl lg:rounded-3xl my-10">
      {/* Overlay for better text visibility */}

      <div className="max-w-6xl mx-auto px-6 flex flex-col-reverse lg:flex-row items-center gap-10 py-12 text-white">
        {/* Left Side Content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex-1 text-center lg:text-left"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Merchant and Customer Satisfaction is Our First Priority
          </h2>
          <p className="text-gray-200 mb-8">
            Join thousands of businesses across Bangladesh who trust Profast
            Courier for fast, safe, and reliable parcel delivery. Become a
            merchant and grow your business with our seamless logistics
            solutions.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button className="btn btn-primary px-6 py-2 rounded-full text-[#1F1F1F]">
              Become a Merchant
            </button>
            <button className="btn btn-outline btn-primary px-6 py-2 rounded-full hover:text-[#1F1F1F]">
              Earn with Profast Courier
            </button>
          </div>
        </motion.div>

        {/* Right Side Image */}
        <div className="flex-1 flex justify-center">
          <img
            src={locationMerchant}
            alt="Merchant Partnership"
            className="w-full max-w-md object-contain drop-shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default Merchant;
