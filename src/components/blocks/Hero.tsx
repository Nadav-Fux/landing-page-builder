import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HeroProps {
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
}

export const Hero: React.FC<HeroProps> = ({
  title = "Welcome to Our Landing Page",
  subtitle = "Create amazing pages with our builder",
  backgroundImage = "",
  primaryButtonText = "Get Started",
  primaryButtonLink = "#",
  secondaryButtonText = "Learn More",
  secondaryButtonLink = "#",
}) => {
  return (
    <section
      className={cn(
        "relative flex items-center justify-center min-h-screen",
        "bg-gradient-to-br from-gray-900 to-gray-800",
        "dark:from-gray-950 dark:to-gray-900"
      )}
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      role="banner"
      aria-label="Hero section"
    >
      {backgroundImage && (
        <div className="absolute inset-0 bg-black/60 dark:bg-black/80" aria-hidden="true"></div>
      )}

      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className={cn(
          "text-4xl sm:text-5xl md:text-6xl lg:text-7xl",
          "font-bold mb-6",
          "tracking-tight",
          "text-white dark:text-white",
          "animate-fade-in-up"
        )}>
          {title}
        </h1>

        <p className={cn(
          "text-lg sm:text-xl md:text-2xl lg:text-xl",
          "mb-8 text-gray-200 dark:text-gray-300",
          "max-w-3xl mx-auto",
          "leading-relaxed"
        )}>
          {subtitle}
        </p>

        <div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          role="group"
          aria-label="Call to action buttons"
        >
          <Button
            asChild
            size="lg"
            className="w-full sm:w-auto px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
          >
            <a
              href={primaryButtonLink}
              aria-label={`Primary action: ${primaryButtonText}`}
            >
              {primaryButtonText}
            </a>
          </Button>

          {secondaryButtonText && (
            <Button
              asChild
              variant="outline"
              size="lg"
              className={cn(
                "w-full sm:w-auto px-8 py-6 text-lg font-semibold",
                "border-2 border-white/50 text-white hover:bg-white hover:text-gray-900",
                "backdrop-blur-sm transition-all duration-200",
                "transform hover:scale-105"
              )}
            >
              <a
                href={secondaryButtonLink}
                aria-label={`Secondary action: ${secondaryButtonText}`}
              >
                {secondaryButtonText}
              </a>
            </Button>
          )}
        </div>
      </div>

      <a
        href="#main-content"
        className="absolute -top-full left-0 p-2 bg-white text-gray-900 rounded-br-lg focus:top-0 focus:left-0 z-50"
        aria-label="Skip to main content"
      >
        Skip to content
      </a>
    </section>
  );
};
