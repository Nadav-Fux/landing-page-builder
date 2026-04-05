"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

interface NavLink {
    label: string;
    href: string;
    isButton?: boolean;
}

interface HeaderProps {
    logo?: string;
    logoText?: string;
    links?: NavLink[];
    ctaText?: string;
    ctaLink?: string;
    sticky?: boolean;
    transparent?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
    logo,
    logoText = "PageCraft",
    links = [
        { label: "Features", href: "#features" },
        { label: "Pricing", href: "#pricing" },
        { label: "Testimonials", href: "#testimonials" },
        { label: "FAQ", href: "#faq" },
    ],
    ctaText = "Get Started",
    ctaLink = "#",
    sticky = true,
    transparent = false,
}) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header
            className={cn(
                "w-full z-50 transition-all duration-300",
                sticky ? "sticky top-0" : "relative",
                transparent
                    ? "bg-transparent"
                    : "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800"
            )}
        >
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 lg:h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <a
                            href="/"
                            className="flex items-center gap-2"
                            aria-label="Go to homepage"
                        >
                            {logo ? (
                                <img src={logo} alt={logoText} className="h-8 w-auto" />
                            ) : (
                                <span
                                    className={cn(
                                        "text-xl lg:text-2xl font-bold",
                                        "bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                                    )}
                                >
                                    {logoText}
                                </span>
                            )}
                        </a>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-8">
                        {links.map((link, index) => (
                            <a
                                key={index}
                                href={link.href}
                                className={cn(
                                    "text-sm font-medium transition-colors duration-200",
                                    "text-gray-600 hover:text-gray-900",
                                    "dark:text-gray-300 dark:hover:text-white"
                                )}
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    {/* CTA Button (Desktop) */}
                    <div className="hidden lg:flex items-center gap-4">
                        <Button asChild size="sm" className="px-6">
                            <a href={ctaLink}>{ctaText}</a>
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        type="button"
                        className="lg:hidden p-2 rounded-md text-gray-600 dark:text-gray-300"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-expanded={mobileMenuOpen}
                        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                    >
                        {mobileMenuOpen ? (
                            <X className="h-6 w-6" />
                        ) : (
                            <Menu className="h-6 w-6" />
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                <div
                    className={cn(
                        "lg:hidden overflow-hidden transition-all duration-300",
                        mobileMenuOpen ? "max-h-96 pb-4" : "max-h-0"
                    )}
                >
                    <div className="flex flex-col gap-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                        {links.map((link, index) => (
                            <a
                                key={index}
                                href={link.href}
                                className={cn(
                                    "text-base font-medium px-2 py-2 rounded-lg transition-colors",
                                    "text-gray-600 hover:text-gray-900 hover:bg-gray-100",
                                    "dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800"
                                )}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {link.label}
                            </a>
                        ))}
                        <Button asChild className="mt-2">
                            <a href={ctaLink}>{ctaText}</a>
                        </Button>
                    </div>
                </div>
            </nav>
        </header>
    );
};
