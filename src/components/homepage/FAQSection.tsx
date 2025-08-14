import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is NexusPro and who can join?",
    answer:
      "NexusPro is a distinguished membership platform for top-level African leaders. It fosters a vibrant community of influential professionals across the continent.",
  },
  {
    question: "How can I join NexusPro?",
    answer:
      "You can join by exploring our membership options and following the application process on our website.",
  },
  {
    question: "What benefits do members receive?",
    answer:
      "Members receive access to exclusive events, world-class mentors, coaching, and a supportive community dedicated to professional growth.",
  },
  {
    question: "Are there any events available?",
    answer:
      "Yes, we curate luxurious C-Suite–focused events annually in partnership with premier venues and industry leaders.",
  },
  {
    question: "How does NexusPro support diversity?",
    answer:
      "Our mission is to empower leaders—both men and women—by connecting them with global peers and fostering an inclusive community dedicated to driving sustainable economic impact.",
  },
];

const FAQSection = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
            Get answers to the most common questions about our community,
            membership, and events.
          </p>
        </div>
        <Accordion
          type="single"
          collapsible
          className="w-full max-w-3xl mx-auto"
        >
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left font-semibold text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 dark:text-gray-400">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
