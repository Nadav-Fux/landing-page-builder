"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface FAQItem {
    question: string;
    answer: string;
}

interface FAQProps {
    title?: string;
    subtitle?: string;
    items?: FAQItem[];
    backgroundColor?: "white" | "gray" | "slate" | "dark";
}

export const FAQ: React.FC<FAQProps> = ({
    title = "Frequently Asked Questions",
    subtitle = "Everything you need to know about our product",
    backgroundColor = "white",
    items = [
        {
            question: "How do I get started?",
            answer: "Getting started is easy! Simply sign up for an account, choose a template, and start customizing your landing page with our intuitive drag-and-drop editor.",
        },
        {
            question: "Can I use my own domain?",
            answer: "Yes! You can connect your own custom domain to any of our paid plans. We provide easy step-by-step instructions to help you set it up.",
        },
        {
            question: "Is there a free trial?",
            answer: "Absolutely! We offer a 14-day free trial on all our plans. No credit card required to get started.",
        },
        {
            question: "How does the AI generation work?",
            answer: "Our AI understands your requirements and generates professional landing page content in seconds. Simply describe what you need, and the AI will create headlines, copy, and layouts tailored to your needs.",
        },
        {
            question: "Can I cancel my subscription anytime?",
            answer: "Yes, you can cancel your subscription at any time. There are no long-term contracts or cancellation fees.",
        },
    ],
}) => {
    const [openItems, setOpenItems] = useState<number[]>([0]); // First item open by default

    const bgClasses = {
        white: "bg-white dark:bg-gray-900",
        gray: "bg-gray-50 dark:bg-gray-900/50",
        slate: "bg-slate-50 dark:bg-slate-900/50",
        dark: "bg-gray-900 dark:bg-gray-950",
    };

    const isDark = backgroundColor === "dark";

    const toggleItem = (index: number) => {
        setOpenItems((prev) =>
            prev.includes(index)
                ? prev.filter((i) => i !== index)
                : [...prev, index]
        );
    };

    return (
        <section
            className={cn(
                "py-16 sm:py-24 px-4 sm:px-6 lg:px-8",
                bgClasses[backgroundColor]
            )}
            aria-labelledby="faq-heading"
        >
            <div className="max-w-3xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-12 sm:mb-16">
                    <h2
                        id="faq-heading"
                        className={cn(
                            "text-3xl sm:text-4xl lg:text-5xl",
                            "font-bold mb-4 tracking-tight",
                            isDark ? "text-white" : "text-gray-900 dark:text-white"
                        )}
                    >
                        {title}
                    </h2>
                    <p
                        className={cn(
                            "text-lg sm:text-xl",
                            isDark ? "text-gray-300" : "text-gray-600 dark:text-gray-300"
                        )}
                    >
                        {subtitle}
                    </p>
                </div>

                {/* FAQ Items */}
                <div className="space-y-4">
                    {items.map((item, index) => {
                        const isOpen = openItems.includes(index);

                        return (
                            <div
                                key={index}
                                className={cn(
                                    "rounded-lg overflow-hidden",
                                    "border transition-all duration-200",
                                    isDark
                                        ? "bg-gray-800 border-gray-700"
                                        : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700",
                                    isOpen && "shadow-md"
                                )}
                            >
                                <button
                                    onClick={() => toggleItem(index)}
                                    className={cn(
                                        "w-full px-6 py-5 flex items-center justify-between",
                                        "text-left transition-colors duration-200",
                                        "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                                    )}
                                    aria-expanded={isOpen}
                                    aria-controls={`faq-answer-${index}`}
                                >
                                    <span
                                        className={cn(
                                            "text-base sm:text-lg font-medium pr-4",
                                            isDark ? "text-white" : "text-gray-900 dark:text-white"
                                        )}
                                    >
                                        {item.question}
                                    </span>
                                    <ChevronDown
                                        className={cn(
                                            "h-5 w-5 flex-shrink-0 transition-transform duration-200",
                                            isDark ? "text-gray-400" : "text-gray-500 dark:text-gray-400",
                                            isOpen && "rotate-180"
                                        )}
                                        aria-hidden="true"
                                    />
                                </button>

                                <div
                                    id={`faq-answer-${index}`}
                                    className={cn(
                                        "overflow-hidden transition-all duration-300",
                                        isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                                    )}
                                >
                                    <div
                                        className={cn(
                                            "px-6 pb-5",
                                            isDark ? "text-gray-300" : "text-gray-600 dark:text-gray-300"
                                        )}
                                    >
                                        {item.answer}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
