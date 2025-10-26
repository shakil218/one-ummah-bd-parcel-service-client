// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import FAQItem from "./FAQItem";
import arrowImg from '../../../assets/arrow.png'

const FAQSection = () => {
  const faqs = [
    {
      question: "How does this posture corrector work?",
      answer:
        "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day. Here’s how it typically functions: A posture corrector works by providing support and gentle alignment to your shoulders.",
    },
    {
      question: "Is it suitable for all ages and body types?",
      answer:
        "Our program (or product) is designed with flexibility and adaptability in mind — allowing each individual to adjust the intensity and pace according to their comfort level. Whether you’re a beginner, senior, or advanced user, it’s safe and effective for everyone.",
    },
    {
      question: "Does it really help with back pain and posture improvement?",
      answer:
        "The program is designed to strengthen core muscles, improve flexibility, and promote proper body alignment — all of which play a key role in reducing back discomfort and supporting better posture over time. However, if you have a pre-existing medical condition, it’s always best to consult with a healthcare professional before starting.",
    },
    {
      question: "Does it have smart features like vibration alerts?",
      answer:
        "The built-in smart sensors provide gentle vibration reminders to help you maintain correct posture throughout the day. These real-time alerts encourage consistent posture habits without being distracting, making it easier to stay aligned and comfortable.",
    },
    {
      question: "How will I be notified when the product is back in stock?",
      answer:
        "Simply enter your email or phone number in the “Notify Me” section on the product page, and we’ll send you an automatic alert as soon as it’s available again — no need to keep checking manually.",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 relative w-full overflow-hidden py-16 bg-base-200">
      {/* Decorative background shapes */}
      {/* <div className="absolute top-20 -left-20 h-64 w-64 bg-blue-200/40 rounded-full blur-3xl" />
      <div className="absolute -right-20 bottom-20 h-64 w-64 bg-blue-200/40 rounded-full blur-3xl" /> */}

      <div className="relative container mx-auto max-w-4xl px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 mx-auto max-w-3xl px-4"
        >
          <h2 className="text-3xl font-extrabold text-[#03373D] mb-2">
            Frequently Asked Question (FAQ)
          </h2>
          <p className="text-sm text-gray-500">
            Enhance posture, mobility, and well-being effortlessly with Posture
            Pro. Achieve proper alignment, reduce pain, and strengthen your body
            with ease!
          </p>
        </motion.div>

        {/* FAQ List */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <FAQItem key={index} {...faq} index={index} />
          ))}
        </div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12 p-6"
        >
          {/* <div className="bg-blue-100 text-blue-500 mb-4 inline-flex items-center justify-center rounded-full p-3">
            <Mail className="h-5 w-5" />
          </div>
          <p className="text-gray-900 font-medium mb-1">
            Still have questions?
          </p>
          <p className="text-gray-500 text-sm mb-4">We’re here to help you</p> */}
          <div className="flex justify-center items-center">
            <button className="btn btn-primary font-bold text-[#1F1F1F]  px-4 py-2 rounded-md text-sm  transition">
            See More FAQ’s
          </button>
          <img src={arrowImg} alt="" className="w-10 h-10"/>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
