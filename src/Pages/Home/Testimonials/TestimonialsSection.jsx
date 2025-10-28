import React from "react";
import Marquee from "react-fast-marquee";
import TestimonialCard from "./TestimonialCard";
import testimonialImg from "../../../assets/customer-top.png";

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Awlad Hossain",
      title: "Senior Product Designer",
      quote:
        "Profast Courier has been a game changer for our online store. Their fast delivery and real-time tracking give our customers total confidence when ordering.",
    },
    {
      id: 2,
      name: "Rasel Ahamed",
      title: "CTO, Tech Valley Ltd.",
      quote:
        "We rely on Profast for nationwide delivery — and they never disappoint. Packages always reach on time, even in rural areas.",
    },
    {
      id: 3,
      name: "Nasir Uddin",
      title: "CEO, Urban Styles",
      quote:
        "Their same-day delivery in Dhaka is super convenient. We’ve seen a big improvement in customer satisfaction since switching to Profast.",
    },
    {
      id: 4,
      name: "Sadia Rahman",
      title: "Owner, Craftify BD",
      quote:
        "The fulfillment service is excellent. I can manage inventory, packaging, and delivery all from one platform — it saves me hours every week!",
    },
    {
      id: 5,
      name: "Tanvir Alam",
      title: "E-commerce Seller",
      quote:
        "I’ve been using Profast for over a year now. Their customer support is quick, friendly, and always ready to solve any issue.",
    },
    {
      id: 6,
      name: "Mithila Chowdhury",
      title: "Marketing Executive, StyleBuzz",
      quote:
        "We love how transparent Profast’s tracking system is. Our customers can see exactly where their parcel is — it builds trust instantly.",
    },
    {
      id: 7,
      name: "Rafiul Hasan",
      title: "Logistics Manager, FoodBangla",
      quote:
        "Their corporate logistics solution has streamlined our entire delivery process. We can now track all orders in one dashboard. Amazing service!",
    },
    {
      id: 8,
      name: "Farzana Akter",
      title: "Founder, PetShop BD",
      quote:
        "Safe delivery is our top priority — and Profast delivers! Every parcel arrives on time and damage-free. Highly recommended!",
    },
    {
      id: 9,
      name: "Imran Kabir",
      title: "Operations Head, GreenMart",
      quote:
        "Excellent service quality and on-time delivery. Their reverse logistics system (parcel return) has made customer exchanges effortless.",
    },
    {
      id: 10,
      name: "Ayesha Siddique",
      title: "Freelance Seller",
      quote:
        "Profast’s delivery network is reliable and affordable. It’s perfect for small business owners like me who need consistent service.",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-10 bg-gray-100 rounded-2xl lg:rounded-3xl">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-12">
          <div>
            <img src={testimonialImg} alt="" />
          </div>
          <h2 className="text-3xl font-bold text-center my-5">
            What our customers are sayings
          </h2>
          <p>
            Enhance posture, mobility, and well-being effortlessly with Posture
            Pro. Achieve proper alignment, reduce pain, and strengthen your body
            with ease!
          </p>
        </div>

        <Marquee pauseOnHover speed={50} gradient={false}>
          <div className="flex flex-wrap justify-center items-stretch gap-6">
            {testimonials.map((testimonial) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
              ></TestimonialCard>
            ))}
          </div>
        </Marquee>
      </div>
    </section>
  );
};

export default TestimonialsSection;
