'use client';
import Footer from '@/components/shared/Footer';
import Header from '@/components/shared/Header';
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { faqData } from '@/utils/static';

const Faq = () => {
  return (
    <div className="mx-auto lg:max-w-[73.25rem]">
      <Header type={1} />
      <main className="mt-[6.5625rem] flex w-full items-center justify-center px-6 lg:mt-0 lg:min-h-screen lg:px-0">
        <div className="flex w-full flex-col justify-between gap-[3.6875rem] lg:flex-row lg:gap-0">
          <div className="lg:max-w-[16.63rem]">
            <h1 className="font-geist-medium text-2xl text-[#C1C1C1] lg:text-[2.00rem]">Frequently Asked questions</h1>
          </div>
          <div className="lg:w-[36.06rem]">
            <Accordion type="single" collapsible className="w-full">
              {faqData.map((faq, i) => (
                <AccordionItem value={`item-${i + 1}`} key={i}>
                  <AccordionTrigger className="py-4 font-geist-medium text-base leading-[24.8px] text-[#C1C1C1] lg:py-6 lg:text-[1.25rem]">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="ml-8 font-geist-medium text-sm leading-[1.25rem] text-[#999999] lg:text-[1.00rem]">
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
