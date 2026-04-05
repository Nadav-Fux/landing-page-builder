"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight, Sparkles } from "lucide-react";

interface CTAProps {
    title?: string;
    subtitle?: string;
    primaryButtonText?: string;
    primaryButtonLink?: string;
    secondaryButtonText?: string;
    secondaryButtonLink?: string;
    variant?: "simple" | "gradient" | "dark" | "split";
    showIcon?: boolean;
}

export const CTA: React.FC<CTAProps> = ({
    title = "Ready to Get Started?",
    subtitle = "Join thousands of satisfied customers building amazing landing pages",
    primaryButtonText = "Start Free Trial",
    primaryButtonLink = "#",
    secondaryButtonText = "Learn More",
    secondaryButtonLink = "#",
    variant = "gradient",
    showIcon = true,
}) => {
    const variantClasses = {
        simple: "bg-white dark:bg-gray-900 border-y border-gray-200 dark:border-gray-700",
        gradient: "bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-[length:200%_100%] animate-gradient",
        dark: "bg-gray-900 dark:bg-gray-950",
        split: "bg-white dark:bg-gray-900",
    };

    const isLight = variant === "simple" || variant === "split";

    return (
        <section
            className={cn(
                "py-16 sm:py-24 px-4 sm:px-6 lg:px-8",
                "relative overflow-hidden",
                variantClasses[variant]
            )}
            aria-labelledby="cta-heading"
        >
            {/* Background decoration for gradient variant */}
            {variant === "gradient" && (
                <>
                    <div
                        className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"
                        aria-hidden="true"
                    />
                    <div
                        className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"
                        aria-hidden="true"
                    />
                    <div
                        className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"
                        aria-hidden="true"
                    />
                </>
            )}

            <div className="relative max-w-4xl mx-auto text-center">
                {/* Icon */}
                {showIcon && variant === "gradient" && (
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-6">
                        <Sparkles className="w-8 h-8 text-white" />
                    </div>
                )}

                {/* Title */}
                <h2
                    id="cta-heading"
                    className={cn(
                        "text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 tracking-tight",
                        isLight ? "text-gray-900 dark:text-white" : "text-white"
                    )}
                >
                    {title}
                </h2>

                {/* Subtitle */}
                <p
                    className={cn(
                        "text-lg sm:text-xl max-w-2xl mx-auto mb-8",
                        isLight ? "text-gray-600 dark:text-gray-300" : "text-white/90"
                    )}
                >
                    {subtitle}
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Button
                        asChild
                        size="lg"
                        className={cn(
                            "px-8 py-6 text-lg font-semibold",
                            "transform hover:scale-105 transition-all duration-200",
                            isLight
                                ? "bg-blue-600 hover:bg-blue-700 text-white"
                                : "bg-white hover:bg-gray-100 text-gray-900"
                        )}
                    >
                        <a href={primaryButtonLink}>
                            {primaryButtonText}
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </a>
                    </Button>

                    {secondaryButtonText && (
                        <Button
                            asChild
                            variant="outline"
                            size="lg"
                            className={cn(
                                "px-8 py-6 text-lg font-semibold",
                                "transform hover:scale-105 transition-all duration-200",
                                isLight
                                    ? "border-gray-300 dark:border-gray-600"
                                    : "border-white/50 text-white hover:bg-white/10"
                            )}
                        >
                            <a href={secondaryButtonLink}>{secondaryButtonText}</a>
                        </Button>
                    )}
                </div>

                {/* Trust badges */}
                <div
                    className={cn(
                        "mt-10 pt-8 border-t",
                        isLight ? "border-gray-200 dark:border-gray-700" : "border-white/20"
                    )}
                >
                    <p
                        className={cn(
                            "text-sm mb-4",
                            isLight ? "text-gray-500 dark:text-gray-400" : "text-white/70"
                        )}
                    >
                        Trusted by 10,000+ businesses worldwide
                    </p>
                    <div className="flex justify-center items-center gap-8 opacity-70">
                        {/* Placeholder logos - in real use, these would be actual company logos */}
                        {["Company 1", "Company 2", "Company 3", "Company 4"].map((company, index) => (
                            <div
                                key={index}
                                className={cn(
                                    "text-sm font-semibold",
                                    isLight ? "text-gray-400 dark:text-gray-500" : "text-white/50"
                                )}
                            >
                                {company}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
