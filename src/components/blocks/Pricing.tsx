"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";

interface PricingFeature {
    text: string;
    included: boolean;
}

interface PricingTier {
    name: string;
    price: string;
    period?: string;
    description?: string;
    features: PricingFeature[];
    buttonText?: string;
    buttonLink?: string;
    popular?: boolean;
    badge?: string;
}

interface PricingProps {
    title?: string;
    subtitle?: string;
    tiers?: PricingTier[];
    backgroundColor?: "white" | "gray" | "slate" | "dark";
}

export const Pricing: React.FC<PricingProps> = ({
    title = "Simple, Transparent Pricing",
    subtitle = "Choose the plan that works best for you",
    backgroundColor = "white",
    tiers = [
        {
            name: "Starter",
            price: "$9",
            period: "/month",
            description: "Perfect for getting started",
            features: [
                { text: "Up to 5 projects", included: true },
                { text: "Basic analytics", included: true },
                { text: "24/7 support", included: false },
                { text: "Custom domain", included: false },
            ],
            buttonText: "Get Started",
            buttonLink: "#",
        },
        {
            name: "Pro",
            price: "$29",
            period: "/month",
            description: "Best for professionals",
            features: [
                { text: "Unlimited projects", included: true },
                { text: "Advanced analytics", included: true },
                { text: "24/7 support", included: true },
                { text: "Custom domain", included: true },
            ],
            buttonText: "Start Free Trial",
            buttonLink: "#",
            popular: true,
            badge: "Most Popular",
        },
        {
            name: "Enterprise",
            price: "$99",
            period: "/month",
            description: "For large teams",
            features: [
                { text: "Everything in Pro", included: true },
                { text: "Dedicated support", included: true },
                { text: "SLA guarantee", included: true },
                { text: "Custom integrations", included: true },
            ],
            buttonText: "Contact Sales",
            buttonLink: "#",
        },
    ],
}) => {
    const bgClasses = {
        white: "bg-white dark:bg-gray-900",
        gray: "bg-gray-50 dark:bg-gray-900/50",
        slate: "bg-slate-50 dark:bg-slate-900/50",
        dark: "bg-gray-900 dark:bg-gray-950",
    };

    const isDark = backgroundColor === "dark";

    return (
        <section
            className={cn(
                "py-16 sm:py-24 px-4 sm:px-6 lg:px-8",
                bgClasses[backgroundColor]
            )}
            aria-labelledby="pricing-heading"
        >
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-12 sm:mb-16">
                    <h2
                        id="pricing-heading"
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

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {tiers.map((tier, index) => (
                        <Card
                            key={index}
                            className={cn(
                                "relative flex flex-col",
                                "transition-all duration-300",
                                "hover:shadow-xl hover:-translate-y-1",
                                tier.popular
                                    ? "border-2 border-blue-500 dark:border-blue-400 shadow-lg scale-105"
                                    : "border border-gray-200 dark:border-gray-700",
                                isDark ? "bg-gray-800" : "bg-white dark:bg-gray-800"
                            )}
                        >
                            {tier.badge && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                    <Badge className="bg-blue-600 text-white px-4 py-1">
                                        {tier.badge}
                                    </Badge>
                                </div>
                            )}

                            <CardHeader className="pb-4">
                                <CardTitle
                                    className={cn(
                                        "text-xl font-semibold",
                                        isDark ? "text-white" : "text-gray-900 dark:text-white"
                                    )}
                                >
                                    {tier.name}
                                </CardTitle>
                                {tier.description && (
                                    <CardDescription
                                        className={cn(
                                            isDark ? "text-gray-400" : "text-gray-500 dark:text-gray-400"
                                        )}
                                    >
                                        {tier.description}
                                    </CardDescription>
                                )}
                            </CardHeader>

                            <CardContent className="flex-1">
                                {/* Price */}
                                <div className="mb-6">
                                    <span
                                        className={cn(
                                            "text-4xl sm:text-5xl font-bold",
                                            isDark ? "text-white" : "text-gray-900 dark:text-white"
                                        )}
                                    >
                                        {tier.price}
                                    </span>
                                    {tier.period && (
                                        <span
                                            className={cn(
                                                "text-lg",
                                                isDark ? "text-gray-400" : "text-gray-500 dark:text-gray-400"
                                            )}
                                        >
                                            {tier.period}
                                        </span>
                                    )}
                                </div>

                                {/* Features */}
                                <ul className="space-y-3" role="list">
                                    {tier.features.map((feature, featureIndex) => (
                                        <li
                                            key={featureIndex}
                                            className="flex items-center gap-3"
                                        >
                                            {feature.included ? (
                                                <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                                            ) : (
                                                <X className="h-5 w-5 text-gray-400 flex-shrink-0" />
                                            )}
                                            <span
                                                className={cn(
                                                    "text-sm",
                                                    feature.included
                                                        ? isDark
                                                            ? "text-gray-200"
                                                            : "text-gray-700 dark:text-gray-200"
                                                        : isDark
                                                            ? "text-gray-500"
                                                            : "text-gray-400 dark:text-gray-500"
                                                )}
                                            >
                                                {feature.text}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>

                            <CardFooter className="pt-4">
                                <Button
                                    asChild
                                    className={cn(
                                        "w-full",
                                        tier.popular
                                            ? "bg-blue-600 hover:bg-blue-700 text-white"
                                            : ""
                                    )}
                                    variant={tier.popular ? "default" : "outline"}
                                    size="lg"
                                >
                                    <a href={tier.buttonLink || "#"}>
                                        {tier.buttonText || "Get Started"}
                                    </a>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};
