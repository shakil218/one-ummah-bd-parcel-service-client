import React, { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import testimonialImg from "../../../assets/customer-top.png";
import { FaQuoteRight } from "react-icons/fa";


const testimonials = [
  {
    id: 1,
    name: "Awlad Hossain",
    title: "Senior Product Designer",
    image: "https://i.pravatar.cc/100?img=1",
    quote:
      "Profast Courier has been a game changer for our online store. Their fast delivery and real-time tracking give our customers total confidence when ordering.",
  },
  {
    id: 2,
    name: "Rasel Ahamed",
    title: "CTO, Tech Valley Ltd.",
    image: "https://i.pravatar.cc/100?img=2",
    quote:
      "We rely on Profast for nationwide delivery — and they never disappoint. Packages always reach on time, even in rural areas.",
  },
  {
    id: 3,
    name: "Nasir Uddin",
    title: "CEO, Urban Styles",
    image: "https://i.pravatar.cc/100?img=3",
    quote:
      "Their same-day delivery in Dhaka is super convenient. We’ve seen a big improvement in customer satisfaction since switching to Profast.",
  },
  {
    id: 4,
    name: "Sadia Rahman",
    title: "Owner, Craftify BD",
    image: "https://i.pravatar.cc/100?img=4",
    quote:
      "The fulfillment service is excellent. I can manage inventory, packaging, and delivery all from one platform — it saves me hours every week!",
  },
  {
    id: 5,
    name: "Tanvir Alam",
    title: "E-commerce Seller",
    image: "https://i.pravatar.cc/100?img=5",
    quote:
      "I’ve been using Profast for over a year now. Their customer support is quick, friendly, and always ready to solve any issue.",
  },
  {
    id: 6,
    name: "Mithila Chowdhury",
    title: "Marketing Executive, StyleBuzz",
    image: "https://i.pravatar.cc/100?img=6",
    quote:
      "We love how transparent Profast’s tracking system is. Our customers can see exactly where their parcel is — it builds trust instantly.",
  },
  {
    id: 7,
    name: "Rafiul Hasan",
    title: "Logistics Manager, FoodBangla",
    image: "https://i.pravatar.cc/100?img=7",
    quote:
      "Their corporate logistics solution has streamlined our entire delivery process. We can now track all orders in one dashboard. Amazing service!",
  },
  {
    id: 8,
    name: "Farzana Akter",
    title: "Founder, PetShop BD",
    image: "https://i.pravatar.cc/100?img=8",
    quote:
      "Safe delivery is our top priority — and Profast delivers! Every parcel arrives on time and damage-free. Highly recommended!",
  },
  {
    id: 9,
    name: "Imran Kabir",
    title: "Operations Head, GreenMart",
    image: "https://i.pravatar.cc/100?img=9",
    quote:
      "Excellent service quality and on-time delivery. Their reverse logistics system (parcel return) has made customer exchanges effortless.",
  },
  {
    id: 10,
    name: "Ayesha Siddique",
    title: "Freelance Seller",
    image: "https://i.pravatar.cc/100?img=10",
    quote:
      "Profast’s delivery network is reliable and affordable. It’s perfect for small business owners like me who need consistent service.",
  },
];

const TestimonialCarousal = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    containScroll: "trimSnaps",
  });

  // autoplay effect
  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 3000);
    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <section className="max-w-7xl mx-auto py-16 bg-base-200 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-primary/10 to-transparent blur-3xl"></div>

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-12">
            <div>
              <img src={testimonialImg} alt="" />
            </div>
            <h2 className="text-3xl font-extrabold text-[#03373D] text-center my-5">
              What our customers are sayings
            </h2>
            <p>
              Enhance posture, mobility, and well-being effortlessly with
              Posture Pro. Achieve proper alignment, reduce pain, and strengthen
              your body with ease!
            </p>
          </div>
        </motion.div>

        {/* Embla Carousel */}
        <div className="overflow-hidden pb-4" ref={emblaRef}>
          <div className="flex">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="flex justify-center px-4 flex-none w-full md:w-1/2 lg:w-1/3"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ scale: 1.05, backgroundColor: "#F3F4F6" }}
                  className="card bg-base-100 shadow-xl border border-gray-200 p-6 w-full max-w-md"
                >
                  <div className="mb-4 text-primary">
                    {/* <FaQuoteRight className="text-4xl text-primary/50 mb-4" /> */}
                    <Quote className="w-10 h-10 opacity-70" />
                  </div>
                  <p className="text-gray-700 mb-6">{t.quote}</p>
                  <div className="divider my-3"></div>
                  <div className="flex items-center space-x-3">
                    <img
                      src={t.image}
                      alt={t.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-primary/20"
                    />
                    <div>
                      <h4 className="font-bold">{t.name}</h4>
                      <p className="text-sm text-gray-500">{t.title}</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default TestimonialCarousal;
