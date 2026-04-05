"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface Stat {
    value: string;
    label: string;
    prefix?: string;
    suffix?: string;
}

interface StatsProps {
    title?: string;
    subtitle?: string;
    stats?: Stat[];
    columns?: 2 | 3 | 4;
    backgroundColor?: "white" | "gray" | "dark" | "gradient";
}

export const Stats: React.FC<StatsProps> = ({
    title,
    subtitle,
    backgroundColor = "gradient",
    columns = 4,
    stats = [
        { value: "10K+", label: "Happy Customers" },
        { value: "50M+", label: "Pages Created" },
        { value: "99.9%", label: "Uptime" },
        { value: "24/7", label: "Support" },
    ],
}) => {
    const bgClasses = {
        white: "bg-white dark:bg-gray-900",
        gray: "bg-gray-50 dark:bg-gray-900/50",
        dark: "bg-gray-900 dark:bg-gray-950",
        gradient: "bg-gradient-to-r from-blue-600 to-purple-600",
    };

    const gridClasses = {
        2: "grid-cols-2",
        3: "grid-cols-2 lg:grid-cols-3",
        4: "grid-cols-2 lg:grid-cols-4",
    };

    const isGradient = backgroundColor === "gradient";
    const isDark = backgroundColor === "dark" || isGradient;

    return (
        <section
            className={cn(
                "py-16 sm:py-20 px-4 sm:px-6 lg:px-8",
                bgClasses[backgroundColor]
            )}
            aria-labelledby={title ? "stats-heading" : undefined}
        >
            <div className="max-w-7xl mx-auto">
                {/* Optional Header */}
                {(title || subtitle) && (
                    <div className="text-center mb-12">
                        {title && (
                            <h2
                                id="stats-heading"
                                className={cn(
                                    "text-3xl sm:text-4xl font-bold mb-4 tracking-tight",
                                    isDark ? "text-white" : "text-gray-900 dark:text-white"
                                )}
                            >
                                {title}
                            </h2>
                        )}
                        {subtitle && (
                            <p
                                className={cn(
                                    "text-lg max-w-2xl mx-auto",
                                    isDark ? "text-white/80" : "text-gray-600 dark:text-gray-300"
                                )}
                            >
                                {subtitle}
                            </p>
                        )}
                    </div>
                )}

                {/* Stats Grid */}
                <div className={cn("grid gap-8 sm:gap-12", gridClasses[columns])}>
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className={cn(
                                "text-center",
                                "p-6 rounded-xl",
                                isGradient && "bg-white/10 backdrop-blur-sm"
                            )}
                        >
                            <div
                                className={cn(
                                    "text-4xl sm:text-5xl lg:text-6xl font-bold mb-2",
                                    isDark ? "text-white" : "text-gray-900 dark:text-white"
                                )}
                            >
                                {stat.prefix}
                                {stat.value}
                                {stat.suffix}
                            </div>
                            <div
                                className={cn(
                                    "text-sm sm:text-base uppercase tracking-wide font-medium",
                                    isDark ? "text-white/70" : "text-gray-500 dark:text-gray-400"
                                )}
                            >
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
