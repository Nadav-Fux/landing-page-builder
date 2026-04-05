import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface ContactFormProps {
  title?: string;
  subtitle?: string;
  submitButtonText?: string;
  successMessage?: string;
  errorMessage?: string;
  backgroundColor?: "white" | "gray" | "slate" | "blue";
  fields?: {
    name?: boolean;
    email?: boolean;
    phone?: boolean;
    company?: boolean;
    subject?: boolean;
    message?: boolean;
  };
}

export const ContactForm: React.FC<ContactFormProps> = ({
  title = "Get In Touch",
  subtitle = "We'd love to hear from you",
  submitButtonText = "Send Message",
  successMessage = "Thank you for your message! We'll get back to you soon.",
  errorMessage = "Something went wrong. Please try again.",
  backgroundColor = "white",
  fields = {
    name: true,
    email: true,
    phone: false,
    company: false,
    subject: false,
    message: true,
  },
}) => {
  const toast = useToast();
  const [formData, setFormData] = useState<Record<string, string>>({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Background color classes
  const bgClasses = {
    white: "bg-white dark:bg-gray-800",
    gray: "bg-gray-50 dark:bg-gray-900/50",
    slate: "bg-slate-50 dark:bg-slate-900/50",
    blue: "bg-blue-50 dark:bg-blue-900/20",
  };

  // Form validation
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (fields.email && !formData.email) {
      newErrors.email = "Email is required";
    } else if (fields.email && formData.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      }
    }

    if (fields.name && !formData.name) {
      newErrors.name = "Name is required";
    }

    if (fields.message && !formData.message) {
      newErrors.message = "Message is required";
    } else if (fields.message && formData.message && formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Validation Error", {
        description: "Please fix the errors in the form",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Show success toast
      toast.success(successMessage, {
        description: "Your message has been sent successfully",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        subject: "",
        message: "",
      });
      setErrors({});
    } catch (error) {
      // Show error toast
      toast.error("Submission Failed", {
        description: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  return (
    <section
      className={cn(
        "py-16 sm:py-20 px-4 sm:px-6 lg:px-8",
        bgClasses[backgroundColor]
      )}
      aria-labelledby="contact-heading"
    >
      <div className="max-w-2xl mx-auto">
        {/* Form Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2
            id="contact-heading"
            className={cn(
              "text-3xl sm:text-4xl",
              "font-bold text-gray-900 dark:text-white mb-4",
              "tracking-tight"
            )}
          >
            {title}
          </h2>
          <p className={cn(
            "text-lg sm:text-xl",
            "text-gray-600 dark:text-gray-300",
            "leading-relaxed"
          )}>
            {subtitle}
          </p>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8 border border-gray-200 dark:border-gray-700">
            {/* Form Fields Grid */}
            <div className="grid grid-cols-1 gap-6">
              {/* Name Field */}
              {fields.name && (
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Name <span className="text-red-500" aria-label="required">*</span>
                  </Label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className={cn(
                      "w-full",
                      errors.name && "border-red-500 focus:border-red-500"
                    )}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && (
                    <p id="name-error" className="text-sm text-red-600 dark:text-red-400" role="alert">
                      {errors.name}
                    </p>
                  )}
                </div>
              )}

              {/* Email Field */}
              {fields.email && (
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email <span className="text-red-500" aria-label="required">*</span>
                  </Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className={cn(
                      "w-full",
                      errors.email && "border-red-500 focus:border-red-500"
                    )}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && (
                    <p id="email-error" className="text-sm text-red-600 dark:text-red-400" role="alert">
                      {errors.email}
                    </p>
                  )}
                </div>
              )}

              {/* Phone Field */}
              {fields.phone && (
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Phone
                  </Label>
                  <Input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full"
                  />
                </div>
              )}

              {/* Company Field */}
              {fields.company && (
                <div className="space-y-2">
                  <Label htmlFor="company" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Company
                  </Label>
                  <Input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Acme Corporation"
                    className="w-full"
                  />
                </div>
              )}

              {/* Subject Field */}
              {fields.subject && (
                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Subject
                  </Label>
                  <Input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help?"
                    className="w-full"
                  />
                </div>
              )}

              {/* Message Field */}
              {fields.message && (
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Message <span className="text-red-500" aria-label="required">*</span>
                  </Label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us more about your project..."
                    rows={5}
                    className={cn(
                      "w-full px-3 py-2",
                      "border border-gray-300 dark:border-gray-600",
                      "rounded-md",
                      "bg-white dark:bg-gray-700",
                      "text-gray-900 dark:text-white",
                      "placeholder-gray-500 dark:placeholder-gray-400",
                      "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                      "transition-colors duration-200",
                      errors.message && "border-red-500 focus:border-red-500"
                    )}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    aria-invalid={!!errors.message}
                  />
                  {errors.message && (
                    <p id="message-error" className="text-sm text-red-600 dark:text-red-400" role="alert">
                      {errors.message}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="mt-8">
              <Button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "w-full px-6 py-3 text-base font-semibold",
                  "bg-blue-600 hover:bg-blue-700",
                  "text-white",
                  "rounded-lg",
                  "transition-all duration-200",
                  "disabled:opacity-50 disabled:cursor-not-allowed",
                  "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
                  "transform hover:scale-[1.02] active:scale-[0.98]"
                )}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  submitButtonText
                )}
              </Button>
            </div>
          </div>
        </form>

        {/* Form Information */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            We respect your privacy. Read our{" "}
            <a href="/privacy" className="text-blue-600 hover:text-blue-700 underline">
              Privacy Policy
            </a>{" "}
            to learn more.
          </p>
        </div>
      </div>
    </section>
  );
};