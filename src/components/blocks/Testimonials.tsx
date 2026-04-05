"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Star, Quote } from "lucide-react";

interface Testimonial {
    name: string;
    role?: string;
    company?: string;
    avatar?: string;
    content: string;
    rating?: number;
}

interface TestimonialsProps {
    title?: string;
    subtitle?: string;
    testimonials?: Testimonial[];
    columns?: 1 | 2 | 3;
    backgroundColor?: "white" | "gray" | "slate" | "dark";
}

export const Testimonials: React.FC<TestimonialsProps> = ({
    title = "What Our Customers Say",
    subtitle = "Don't just take our word for it",
    backgroundColor = "gray",
    columns = 3,
    testimonials = [
        {
            name: "Sarah Johnson",
            role: "CEO",
            company: "TechStart",
            content: "This platform has completely transformed how we build landing pages. The AI features are incredible!",
            rating: 5,
        },
        {
            name: "Michael Chen",
            role: "Marketing Director",
            company: "GrowthCo",
            content: "We've seen a 3x increase in conversions since switching to this builder. Highly recommended!",
            rating: 5,
        },
        {
            name: "Emily Davis",
            role: "Founder",
            company: "DesignLab",
            content: "The templates are beautiful and the customization options are endless. Perfect for our needs.",
            rating: 5,
        },
    ],
}) => {
    const bgClasses = {
        white: "bg-white dark:bg-gray-900",
        gray: "bg-gray-50 dark:bg-gray-900/50",
        slate: "bg-slate-50 dark:bg-slate-900/50",
        dark: "bg-gray-900 dark:bg-gray-950",
    };

    const gridClasses = {
        1: "grid-cols-1",
        2: "grid-cols-1 md:grid-cols-2",
        3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    };

    const isDark = backgroundColor === "dark";

    return (
        <section
            className={cn(
                "py-16 sm:py-24 px-4 sm:px-6 lg:px-8",
                bgClasses[backgroundColor]
            )}
            aria-labelledby="testimonials-heading"
        >
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-12 sm:mb-16">
                    <h2
                        id="testimonials-heading"
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
                            "text-lg sm:text-xl max-w-3xl mx-auto",
                            isDark ? "text-gray-300" : "text-gray-600 dark:text-gray-300"
                        )}
                    >
                        {subtitle}
                    </p>
                </div>

                {/* Testimonials Grid */}
                <div className={cn("grid gap-8", gridClasses[columns])}>
                    {testimonials.map((testimonial, index) => (
                        <Card
                            key={index}
                            className={cn(
                                "relative overflow-hidden",
                                "transition-all duration-300",
                                "hover:shadow-lg hover:-translate-y-1",
                                isDark
                                    ? "bg-gray-800 border-gray-700"
                                    : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                            )}
                        >
                            <CardContent className="p-6 sm:p-8">
                                {/* Quote Icon */}
                                <Quote
                                    className={cn(
                                        "h-8 w-8 mb-4",
                                        isDark ? "text-blue-400/50" : "text-blue-500/30 dark:text-blue-400/50"
                                    )}
                                    aria-hidden="true"
                                />

                                {/* Rating */}
                                {testimonial.rating && (
                                    <div className="flex gap-1 mb-4" aria-label={`${testimonial.rating} out of 5 stars`}>
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={cn(
                                                    "h-5 w-5",
                                                    i < testimonial.rating!
                                                        ? "text-yellow-400 fill-yellow-400"
                                                        : "text-gray-300 dark:text-gray-600"
                                                )}
                                            />
                                        ))}
                                    </div>
                                )}

                                {/* Content */}
                                <blockquote
                                    className={cn(
                                        "text-base sm:text-lg leading-relaxed mb-6",
                                        isDark ? "text-gray-200" : "text-gray-700 dark:text-gray-200"
                                    )}
                                >
                                    "{testimonial.content}"
                                </blockquote>

                                {/* Author */}
                                <div className="flex items-center gap-4">
                                    {/* Avatar */}
                                    <div
                                        className={cn(
                                            "w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold",
                                            "bg-gradient-to-br from-blue-500 to-purple-600 text-white"
                                        )}
                                    >
                                        {testimonial.avatar ? (
                                            <img
                                                src={testimonial.avatar}
                                                alt={testimonial.name}
                                                className="w-full h-full rounded-full object-cover"
                                            />
                                        ) : (
                                            testimonial.name.charAt(0)
                                        )}
                                    </div>

                                    {/* Info */}
                                    <div>
                                        <div
                                            className={cn(
                                                "font-semibold",
                                                isDark ? "text-white" : "text-gray-900 dark:text-white"
                                            )}
                                        >
                                            {testimonial.name}
                                        </div>
                                        {(testimonial.role || testimonial.company) && (
                                            <div
                                                className={cn(
                                                    "text-sm",
                                                    isDark ? "text-gray-400" : "text-gray-500 dark:text-gray-400"
                                                )}
                                            >
                                                {testimonial.role}
                                                {testimonial.role && testimonial.company && " at "}
                                                {testimonial.company}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};
