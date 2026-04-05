"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/components/language-provider';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Globe, Sparkles, ArrowRight, Play, ChevronRight, Star, CheckCircle, TrendingUp, ArrowUpRight, Menu, X } from 'lucide-react';
import Link from 'next/link';

// SVG Icons
const SparkleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
  </svg>
);

const MagicWandIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 4V2" />
    <path d="M15 16v-2" />
    <path d="M8 9h2" />
    <path d="M20 9h2" />
    <path d="m17.8 11.8 1.2 1.2" />
    <path d="m15 9 2-2" />
    <path d="m3 21 9-9" />
  </svg>
);

const LayersIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2 2 7l10 5 10-5-10-5Z" />
    <path d="m2 17 10 5 10-5" />
    <path d="m2 12 10 5 10-5" />
  </svg>
);

const GlobeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
    <path d="M2 12h20" />
  </svg>
);

const UsersIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);


const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerChildren = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5 }
};


export default function Home() {
  const { language, direction, setLanguage, t } = useLanguage();
  const [isHovered, setIsHovered] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Features data
  const features = [
    {
      icon: SparkleIcon,
      title: t('features.ai.title'),
      description: t('features.ai.description'),
      gradient: "from-purple-500 to-pink-500",
      bgGlow: "bg-purple-500/10",
      features: [t('features.ai.prompts'), t('features.ai.smart'), t('features.ai.seo'), t('features.ai.mobile')]
    },
    {
      icon: MagicWandIcon,
      title: t('features.editor.title'),
      description: t('features.editor.description'),
      gradient: "from-blue-500 to-cyan-500",
      bgGlow: "bg-blue-500/10",
      features: [t('features.editor.drag'), t('features.editor.preview'), t('features.editor.components'), t('features.editor.brand')]
    },
    {
      icon: LayersIcon,
      title: t('features.templates.title'),
      description: t('features.templates.description'),
      gradient: "from-green-500 to-emerald-500",
      bgGlow: "bg-green-500/10",
      features: [t('features.ai.templates'), t('features.ai.industry'), t('features.ai.abtesting'), t('features.ai.optimized')]
    }
  ];

  // Stats data
  const stats = [
    { value: "50K+", label: t('stats.pages'), icon: LayersIcon },
    { value: "500+", label: t('stats.templates'), icon: MagicWandIcon },
    { value: "10K+", label: t('stats.users'), icon: UsersIcon },
    { value: "120+", label: t('stats.countries'), icon: GlobeIcon }
  ];

  return (
    <div className={`min-h-screen bg-gradient-to-b from-background via-background to-muted/20 ${direction === 'rtl' ? 'rtl' : 'ltr'}`}>
      {/* Language Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setLanguage(language === 'en' ? 'he' : 'en')}
          className="glass backdrop-blur-md"
        >
          <Globe className="h-4 w-4 mr-2" />
          {language === 'en' ? 'עברית' : 'English'}
        </Button>
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      >
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-primary to-secondary">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold gradient-text">PageCraft</span>
            </Link>

            <div className="hidden md:flex items-center space-x-6">
              <a href="#features" className="nav-link hover:text-primary transition-colors">
                {t('nav.features')}
              </a>
              <a href="#templates" className="nav-link hover:text-primary transition-colors">
                {t('nav.templates')}
              </a>
              <a href="#pricing" className="nav-link hover:text-primary transition-colors">
                {t('nav.pricing')}
              </a>
            </div>

            <div className="hidden md:flex items-center space-x-2">
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  {t('nav.login')}
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm" className="gradient-bg">
                  {t('nav.signup')}
                </Button>
              </Link>
            </div>

            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t bg-background/95 backdrop-blur"
            >
              <div className="container-custom py-4 space-y-4">
                <a href="#features" className="block py-2 hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>
                  {t('nav.features')}
                </a>
                <a href="#templates" className="block py-2 hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>
                  {t('nav.templates')}
                </a>
                <a href="#pricing" className="block py-2 hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>
                  {t('nav.pricing')}
                </a>
                <div className="flex space-x-2 pt-2">
                  <Link href="/login" className="flex-1" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full">
                      {t('nav.login')}
                    </Button>
                  </Link>
                  <Link href="/register" className="flex-1" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full gradient-bg">
                      {t('nav.signup')}
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32">
        {/* Background gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-gradient-to-r from-secondary/10 to-primary/10 blur-3xl" />

        <div className="container-custom relative">
          <motion.div {...fadeInUp} className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-6"
            >
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <Sparkles className="h-4 w-4 mr-2" />
                Powered by AI • {t('hero.trial')}
              </Badge>
            </motion.div>

            {/* Main heading */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              <span className="block">{t('hero.title')}</span>
              <span className={`block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent ${direction === 'rtl' ? 'text-gradient-rtl' : ''}`}>
                {t('hero.subtitle')}
              </span>
            </h1>

            {/* Description */}
            <motion.p
              {...fadeInUp}
              transition={{ delay: 0.2 }}
              className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
            >
              {t('hero.description')}
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link href="/register">
                <Button
                  size="lg"
                  className="gradient-bg text-white px-8 py-6 text-lg group relative overflow-hidden"
                  onMouseEnter={() => setIsHovered('primary')}
                  onMouseLeave={() => setIsHovered(null)}
                >
                  <span className="relative z-10 flex items-center">
                    {t('hero.cta.primary')}
                    <ArrowRight className={`h-5 w-5 ml-2 transition-transform ${isHovered === 'primary' ? 'translate-x-1' : ''}`} />
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary/80 to-secondary/80"
                    initial={{ x: "-100%" }}
                    animate={{ x: isHovered === 'primary' ? "0%" : "-100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </Button>
              </Link>

              <Button
                variant="outline"
                size="lg"
                className="px-8 py-6 text-lg group"
                onMouseEnter={() => setIsHovered('secondary')}
                onMouseLeave={() => setIsHovered(null)}
              >
                <Play className="h-5 w-5 mr-2" />
                {t('hero.cta.secondary')}
                <ChevronRight className={`h-5 w-5 ml-2 transition-transform ${isHovered === 'secondary' ? 'translate-x-1' : ''}`} />
              </Button>
            </motion.div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-16 flex flex-col items-center space-y-4"
            >
              <p className="text-sm text-muted-foreground">
                {t('trustedby.title')}
              </p>
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="ml-2 text-sm font-medium">{t('trustedby.rating')}</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container-custom">
          <motion.div
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {stats.map((stat) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  variants={scaleIn}
                  className="text-center"
                >
                  <div className="flex justify-center mb-4">
                    <div className="p-3 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold gradient-text mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 sm:py-32">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge variant="outline" className="mb-4">
              {t('features.title')}
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              {t('features.title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('features.subtitle')}
            </p>
          </motion.div>

          <motion.div
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid lg:grid-cols-3 gap-8"
          >
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  variants={scaleIn}
                  whileHover={{ y: -5 }}
                  className="group relative"
                >
                  <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-gradient-to-b from-card to-card/50">
                    <CardHeader className="text-center pb-4">
                      <div className={`mx-auto mb-4 p-4 rounded-2xl bg-gradient-to-r ${feature.gradient} ${feature.bgGlow} group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle className="text-xl mb-2">
                        {feature.title}
                      </CardTitle>
                      <CardDescription className="text-base">
                        {feature.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <ul className="space-y-3">
                        {feature.features.map((item, i) => (
                          <li key={i} className="flex items-center text-sm">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10" />
        <div className="container-custom relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full mb-6">
              <TrendingUp className="h-4 w-4 mr-2 text-primary" />
              <span className="text-sm font-medium">{t('cta.trial')}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              {t('cta.title')}
            </h2>

            <p className="text-lg text-muted-foreground mb-8">
              {t('cta.description')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Link href="/register">
                <Button
                  size="lg"
                  className="gradient-bg text-white px-8 py-6 text-lg group"
                  onMouseEnter={() => setIsHovered('cta')}
                  onMouseLeave={() => setIsHovered(null)}
                >
                  <span className="flex items-center">
                    {t('cta.button')}
                    <ArrowUpRight className={`h-5 w-5 ml-2 transition-transform ${isHovered === 'cta' ? 'translate-x-1 translate-y-[-1px]' : ''}`} />
                  </span>
                </Button>
              </Link>
            </div>

            <p className="text-sm text-muted-foreground">
              {t('cta.trial')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container-custom py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            <div className="col-span-2 lg:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-primary to-secondary">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <span className="text-lg font-bold gradient-text">PageCraft</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4 max-w-xs">
                {t('hero.description')}
              </p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Globe className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">{t('footer.product')}</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/#features" className="hover:text-primary transition-colors">{t('footer.features')}</Link></li>
                <li><Link href="/templates" className="hover:text-primary transition-colors">{t('footer.templates')}</Link></li>
                <li><a href="#pricing" className="hover:text-primary transition-colors">{t('footer.pricing')}</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">{t('footer.company')}</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#about" className="hover:text-primary transition-colors">{t('footer.about')}</a></li>
                <li><a href="#blog" className="hover:text-primary transition-colors">{t('footer.blog')}</a></li>
                <li><a href="#careers" className="hover:text-primary transition-colors">{t('footer.careers')}</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">{t('footer.support')}</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#help" className="hover:text-primary transition-colors">{t('footer.help')}</a></li>
                <li><a href="#contact" className="hover:text-primary transition-colors">{t('footer.contact')}</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">{t('footer.legal')}</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#privacy" className="hover:text-primary transition-colors">{t('footer.privacy')}</a></li>
                <li><a href="#terms" className="hover:text-primary transition-colors">{t('footer.terms')}</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
            {t('footer.copyright').replace('{year}', new Date().getFullYear().toString())}
          </div>
        </div>
      </footer>
    </div>
  )
}