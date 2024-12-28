"use client";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqData } from "@/utils/static";

const Faq = () => {
  return (
    <div className="max-w-[73.25rem] mx-auto">
      <Header type={1} />
      <main className="flex items-center justify-center min-h-screen w-full">
        <div className="flex justify-between w-full">
          <div className="max-w-[16.63rem]">
            <h1 className="text-[#C1C1C1] text-[2.00rem] font-geist-medium">
              Frequently Asked questions
            </h1>
          </div>
          <div className="w-[36.06rem]">
            <Accordion type="single" collapsible className="w-full">
              {faqData.map((faq, i) => (
                <AccordionItem value={`item-${i + 1}`} key={i}>
                  <AccordionTrigger className="text-[#C1C1C1] text-[1.25rem] font-geist-medium leading-[24.8px]">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-[#999999] font-geist-medium text-[1.00rem] leading-[1.25rem] ml-8">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </main>
      <Footer expand />
    </div>
  );
};

export default Faq;
