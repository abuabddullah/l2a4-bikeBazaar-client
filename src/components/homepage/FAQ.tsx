import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from "@reach/accordion";
import "@reach/accordion/styles.css";
import { ChevronUpIcon } from "lucide-react";
import HeadLine from "../shared/HeadLine";

const FAQ = () => {
  const faqItems = [
    {
      question: "What types of bikes do you offer?",
      answer:
        "We offer a wide range of bikes including road bikes, mountain bikes, hybrid bikes, electric bikes, and cruisers. All our bikes are carefully selected from top manufacturers.",
    },
    {
      question: "Do you offer warranty on bikes?",
      answer:
        "Yes, all our new bikes come with a manufacturer's warranty. The warranty period varies by brand and model, typically ranging from 1-5 years for frame and components.",
    },
    {
      question: "Can I test ride before purchasing?",
      answer:
        "Absolutely! We encourage test rides to ensure you find the perfect bike. Visit our store with a valid ID to test ride any bike in our inventory.",
    },
    {
      question: "Do you offer bike maintenance services?",
      answer:
        "Yes, we provide comprehensive bike maintenance services including tune-ups, repairs, and regular maintenance. Our certified technicians ensure your bike stays in top condition.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, debit cards, cash, and various digital payment methods. We also offer financing options for qualified customers.",
    },
  ];

  return (
    <div className="w-full px-4 py-16 bg-gradient-to-r from-yellow-500 via-red-500 to-orange-600 bg-opacity-80 bg-pattern-stripes">
      <div className="mx-auto w-full max-w-3xl rounded-2xl bg-white p-8 shadow-lg shadow-teal-400/30">
        <div className="text-center">
          <HeadLine heading="FAQs" />
        </div>
        <Accordion>
          {faqItems.map((item, index) => (
            <AccordionItem key={index} className="my-4">
              <AccordionButton className="flex w-full justify-between items-center rounded-xl bg-[#F97316] px-6 py-5 text-lg font-semibold text-white hover:bg-orange-600 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 transition ease-in-out duration-200">
                <span className="text-left">{item.question}</span>
                <ChevronUpIcon className="h-6 w-6 text-white transition-transform duration-200 transform rotate-0 group-open:rotate-180" />
              </AccordionButton>
              <AccordionPanel className="px-6 pt-4 pb-6 text-sm text-gray-700 bg-gray-50 rounded-lg">
                {item.answer}
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default FAQ;
