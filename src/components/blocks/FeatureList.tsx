import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Feature {
  icon?: string;
  title?: string;
  description?: string;
  badge?: string;
  badgeVariant?: "default" | "secondary" | "destructive" | "outline";
}

interface FeatureListProps {
  title?: string;
  subtitle?: string;
  features?: Feature[];
  columns?: 1 | 2 | 3 | 4;
}

export const FeatureList: React.FC<FeatureListProps> = ({
  title = "Our Features",
  subtitle = "Discover what makes our platform amazing",
  features = [
    {
      icon: "⚡",
      title: "Lightning Fast",
      description: "Build pages quickly with our intuitive interface",
      badge: "Popular",
      badgeVariant: "default",
    },
    {
      icon: "🎨",
      title: "Beautiful Designs",
      description: "Professional templates to get you started",
      badge: "Premium",
      badgeVariant: "secondary",
    },
    {
      icon: "📱",
      title: "Mobile Responsive",
      description: "Your pages look great on any device",
    },
  ],
  columns = 3,
}) => {
  // Responsive grid classes based on columns prop
  const gridClasses = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  };

  return (
    <section
      className={cn(
        "py-16 sm:py-20 px-4 sm:px-6 lg:px-8",
        "bg-gray-50 dark:bg-gray-900/50"
      )}
      aria-labelledby="features-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2
            id="features-heading"
            className={cn(
              "text-3xl sm:text-4xl lg:text-5xl",
              "font-bold text-gray-900 dark:text-white mb-4",
              "tracking-tight"
            )}
          >
            {title}
          </h2>
          <p className={cn(
            "text-lg sm:text-xl",
            "text-gray-600 dark:text-gray-300",
            "max-w-3xl mx-auto",
            "leading-relaxed"
          )}>
            {subtitle}
          </p>
        </div>

        {/* Features Grid */}
        <div className={cn(
          "grid gap-6 sm:gap-8",
          gridClasses[columns]
        )}>
          {features.map((feature, index) => (
            <Card
              key={index}
              className={cn(
                "group relative overflow-hidden",
                "bg-white dark:bg-gray-800",
                "border border-gray-200 dark:border-gray-700",
                "hover:shadow-lg hover:shadow-gray-200/50 dark:hover:shadow-gray-900/50",
                "transition-all duration-300 ease-out",
                "hover:-translate-y-1",
                "focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2"
              )}
            >
              <CardHeader className="pb-4">
                {/* Icon and Badge */}
                <div className="flex items-start justify-between mb-4">
                  <div className={cn(
                    "text-3xl sm:text-4xl",
                    "p-3 rounded-lg",
                    "bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20",
                    "group-hover:scale-110 transition-transform duration-300"
                  )}>
                    {feature.icon || "✨"}
                  </div>

                  {feature.badge && (
                    <Badge
                      variant={feature.badgeVariant}
                      className="text-xs font-medium animate-fade-in"
                    >
                      {feature.badge}
                    </Badge>
                  )}
                </div>

                {/* Title */}
                <CardTitle className={cn(
                  "text-xl sm:text-2xl",
                  "text-gray-900 dark:text-white",
                  "group-hover:text-blue-600 dark:group-hover:text-blue-400",
                  "transition-colors duration-200"
                )}>
                  {feature.title || "Feature Title"}
                </CardTitle>
              </CardHeader>

              <CardContent className="pt-0">
                {/* Description */}
                <CardDescription className={cn(
                  "text-base sm:text-lg",
                  "text-gray-600 dark:text-gray-300",
                  "leading-relaxed",
                  "line-clamp-3"
                )}>
                  {feature.description || "Feature description goes here"}
                </CardDescription>
              </CardContent>

              {/* Hover effect overlay */}
              <div className={cn(
                "absolute inset-0",
                "bg-gradient-to-r from-blue-600/5 to-indigo-600/5",
                "opacity-0 group-hover:opacity-100",
                "transition-opacity duration-300",
                "pointer-events-none"
              )} aria-hidden="true" />
            </Card>
          ))}
        </div>

        {/* Accessibility note */}
        <div className="sr-only" role="status" aria-live="polite">
          Features section with {features.length} items displayed
        </div>
      </div>
    </section>
  );
};