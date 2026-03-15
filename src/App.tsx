/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Palette, 
  Share2, 
  Globe, 
  CheckCircle2, 
  ArrowRight, 
  Instagram, 
  Twitter, 
  Linkedin, 
  Facebook, 
  Mail, 
  Phone, 
  MapPin, 
  Menu, 
  X,
  Star,
  Zap,
  Shield,
  Rocket,
  Sun,
  Moon,
  ExternalLink,
  MessageCircle,
  Send
} from 'lucide-react';

// --- Components ---

const Navbar = ({ theme, toggleTheme }: { theme: string, toggleTheme: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Works', href: '#portfolio' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'glass py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#" className="flex items-center gap-2">
          <img 
            src="https://image2url.com/r2/default/images/1773590606447-3197630d-d8e3-4f44-b499-28a495c78c6a.jpg" 
            alt="NovaWave Logo" 
            className="h-10 w-auto object-contain"
            referrerPolicy="no-referrer"
          />
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm font-medium text-[var(--text-secondary)] hover:text-brand-accent transition-colors"
            >
              {link.name}
            </a>
          ))}
          
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full glass hover:bg-brand-purple/20 transition-all text-[var(--text-primary)]"
            title="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <a href="#pricing" className="px-5 py-2 rounded-full bg-brand-purple hover:bg-brand-purple/80 transition-all text-sm font-semibold text-white glow-purple">
            Start Project
          </a>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full glass text-[var(--text-primary)]"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button className="text-[var(--text-primary)]" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 w-full glass md:hidden py-8 px-6 flex flex-col gap-6 backdrop-blur-2xl shadow-2xl overflow-hidden"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-xl font-bold hover:text-brand-accent transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <a href="#pricing" className="w-full py-4 rounded-xl bg-brand-purple text-center font-bold shadow-lg glow-purple" onClick={() => setIsOpen(false)}>
              Start Project
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-24 md:pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-brand-purple/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-brand-accent/10 rounded-full blur-[120px] animate-pulse" />
      
      {/* Animated Waves */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 400C240 300 480 500 720 400C960 300 1200 500 1440 400V800H0V400Z" fill="url(#grad1)" className="animate-wave" />
          <defs>
            <linearGradient id="grad1" x1="720" y1="400" x2="720" y2="800" gradientUnits="userSpaceOnUse">
              <stop stopColor="#6D28D9" />
              <stop offset="1" stopColor="#0A192F" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest text-brand-accent mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-accent"></span>
            </span>
            Future-Ready Digital Agency
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mb-6">
            Ride the Future of <br />
            <span className="gradient-text">Digital Innovation</span> <br />
            with NovaWave
          </h1>
          <p className="text-lg text-white/60 mb-10 max-w-lg leading-relaxed">
            We help brands grow through powerful design, strategic social media management, and high-performance websites.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#pricing" className="px-8 py-4 rounded-full bg-brand-purple hover:bg-brand-purple/80 transition-all font-bold flex items-center gap-2 glow-purple">
              Start Your Project <ArrowRight size={20} />
            </a>
            <a href="#services" className="px-8 py-4 rounded-full glass hover:bg-white/10 transition-all font-bold">
              View Our Services
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative hidden lg:block"
        >
          <div className="relative z-10 animate-float">
            <div className="w-full aspect-square rounded-3xl glass p-8 flex items-center justify-center overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/20 to-brand-accent/20" />
               <div className="relative grid grid-cols-2 gap-4">
                  {[Palette, Share2, Globe, Rocket].map((Icon, i) => (
                    <div key={i} className="w-24 h-24 rounded-2xl glass flex items-center justify-center text-brand-accent">
                      <Icon size={40} />
                    </div>
                  ))}
               </div>
            </div>
          </div>
          {/* Decorative rings */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-white/5 rounded-full pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border border-white/5 rounded-full pointer-events-none" />
        </motion.div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-16 md:py-24 relative">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold mb-6">
            Empowering Brands in the <span className="gradient-text">Digital Era</span>
          </h2>
          <p className="text-lg text-white/60 mb-8 leading-relaxed">
            NovaWave Digital Solutions PLC is a forward-thinking digital agency dedicated to helping businesses establish a powerful online presence. We blend creativity with cutting-edge technology to deliver results that matter.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-6 mb-10">
            {[
              "Logo and brand identity design that resonates",
              "Social media management and audience growth",
              "Professional website development for performance"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 justify-center">
                <div className="w-6 h-6 rounded-full bg-brand-accent/20 flex items-center justify-center text-brand-accent shrink-0">
                  <CheckCircle2 size={14} />
                </div>
                <span className="text-white/80 text-sm">{item}</span>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-6 max-w-md mx-auto">
            <div className="p-4 rounded-2xl glass">
              <h4 className="font-bold text-brand-accent mb-1">Creativity</h4>
              <p className="text-xs text-white/50">Pushing boundaries of design.</p>
            </div>
            <div className="p-4 rounded-2xl glass">
              <h4 className="font-bold text-brand-accent mb-1">Reliability</h4>
              <p className="text-xs text-white/50">Your success is our priority.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    {
      title: "Logo Design",
      description: "Professional logos that build strong brand identity. Include custom concepts, revisions, and scalable vector files.",
      icon: Palette,
      color: "from-brand-purple to-brand-neon"
    },
    {
      title: "Social Media Management",
      description: "Complete social media strategy including content creation, posting schedule, audience growth, and engagement.",
      icon: Share2,
      color: "from-blue-500 to-brand-purple"
    },
    {
      title: "Web Development",
      description: "Modern, responsive websites built for performance, speed, and user experience. Optimized for all devices.",
      icon: Globe,
      color: "from-brand-accent to-emerald-400"
    }
  ];

  return (
    <section id="services" className="py-16 md:py-24 bg-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Our <span className="gradient-text">Expertise</span></h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            We provide comprehensive digital solutions tailored to your business goals.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group p-8 rounded-3xl glass hover:bg-white/10 transition-all duration-500"
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <service.icon size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
              <p className="text-white/60 leading-relaxed mb-6">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Pricing = () => {
  const packages = [
    {
      name: "Bronze",
      price: "2500",
      description: "Starter Businesses",
      features: [
        "1 Custom Logo Design",
        "3 Logo Revisions",
        "Basic Social Media Setup (1 Platform)",
        "5 Social Media Posts per Month",
        "Basic 1-Page Website",
        "Email Support"
      ]
    },
    {
      name: "Silver",
      price: "3500",
      description: "Growing Businesses",
      features: [
        "2 Logo Concepts",
        "5 Logo Revisions",
        "Social Media Management (2 Platforms)",
        "12 Posts per Month",
        "3-Page Professional Website",
        "Basic SEO Setup",
        "Priority Email Support"
      ]
    },
    {
      name: "Gold",
      price: "4500",
      description: "Established Businesses",
      popular: true,
      features: [
        "3 Logo Concepts + Brand Kit",
        "Unlimited Logo Revisions",
        "Social Media Management (3 Platforms)",
        "20 Posts per Month",
        "5-Page Custom Website",
        "SEO Optimization",
        "Monthly Performance Report",
        "Priority Support"
      ]
    },
    {
      name: "Premium",
      price: "12000",
      description: "Full Business Solution",
      features: [
        "Complete Brand Identity Package",
        "Unlimited Logo Concepts and Revisions",
        "Social Media Management (All Platforms)",
        "30+ Posts per Month",
        "Advanced Custom Website (Unlimited Pages)",
        "Advanced SEO Optimization",
        "Content Strategy and Analytics",
        "Dedicated Account Manager",
        "24/7 Priority Support"
      ]
    }
  ];

  return (
    <section id="pricing" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Choose Your <span className="gradient-text">Growth Path</span></h2>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            Transparent pricing designed to scale with your business needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          {packages.map((pkg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative p-8 rounded-3xl flex flex-col ${pkg.popular ? 'bg-brand-purple/20 border-2 border-brand-purple glow-purple scale-105 z-10' : 'glass'}`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-brand-purple rounded-full text-xs font-bold uppercase tracking-widest text-white">
                  Most Popular
                </div>
              )}
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-1">{pkg.name}</h3>
                <p className="text-xs text-[var(--text-secondary)] uppercase tracking-widest mb-4">{pkg.description}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold">{pkg.price}</span>
                  <span className="text-[var(--text-secondary)] text-sm"> Birr</span>
                </div>
              </div>
              <div className="space-y-4 mb-8 flex-grow">
                {pkg.features.map((feature, j) => (
                  <div key={j} className="flex items-start gap-3 text-sm">
                    <CheckCircle2 size={16} className="text-brand-accent mt-0.5 shrink-0" />
                    <span className="text-[var(--text-secondary)]">{feature}</span>
                  </div>
                ))}
              </div>
              <a 
                href="https://wa.me/251940471155" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`w-full py-4 rounded-xl font-bold transition-all text-center ${pkg.popular ? 'bg-brand-purple hover:bg-brand-purple/80 text-white' : 'glass hover:bg-white/10'}`}
              >
                Get Started
              </a>
            </motion.div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <p className="text-sm font-bold text-[var(--text-primary)]">
            N.B the domain name can slightly affect the price ex: .com, .org .....
          </p>
        </div>
      </div>
    </section>
  );
};

const Portfolio = () => {
  const projects = [
    {
      title: "AMEF",
      url: "https://amef.netlify.app",
      description: "Modern web application for AMEF."
    },
    {
      title: "Miki16",
      url: "https://miki16.netlify.app",
      description: "Creative portfolio and platform."
    },
    {
      title: "Andinet Mun",
      url: "https://andinetmun.netlify.app",
      description: "Official club platform."
    }
  ];

  return (
    <section id="portfolio" className="py-16 md:py-24 bg-brand-purple/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Our <span className="gradient-text">Some Works</span></h2>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            A glimpse into some of the successful projects we've delivered.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.a
              key={i}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group p-8 rounded-3xl glass hover:border-brand-accent/50 transition-all flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-brand-accent/10 flex items-center justify-center text-brand-accent mb-6 group-hover:scale-110 transition-transform">
                <ExternalLink size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-brand-accent transition-colors">{project.title}</h3>
              <p className="text-sm text-[var(--text-secondary)] mb-4">{project.description}</p>
              <span className="text-xs font-mono text-brand-accent opacity-60 group-hover:opacity-100 transition-opacity">
                {project.url.replace('https://', '')}
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const testimonials = [
    {
      name: "Mesel Production",
      role: "Client",
      content: "NovaWave transformed our brand identity completely. Their attention to detail and futuristic vision is exactly what we needed.",
    },
    {
      name: "Andinet Mun Club",
      role: "Client",
      content: "The web development team delivered a high-performance site that doubled our conversion rate. Professional and highly skilled.",
    },
    {
      name: "My Choice Pharmacy",
      role: "Client",
      content: "Our social media engagement has skyrocketed since NovaWave took over. They truly understand audience growth.",
    }
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Client <span className="gradient-text">Success Stories</span></h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Hear from the businesses we've helped reach new heights.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-3xl glass relative"
            >
              <div className="flex gap-1 text-brand-accent mb-6">
                {[...Array(5)].map((_, j) => <Star key={j} size={16} fill="currentColor" />)}
              </div>
              <p className="text-lg text-white/80 italic mb-8 leading-relaxed">
                "{t.content}"
              </p>
              <div className="flex items-center gap-4">
                <div>
                  <h5 className="font-bold">{t.name}</h5>
                  <p className="text-xs text-white/50">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Logo Design',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `NovaWave Inquiry: ${formData.service} from ${formData.name}`;
    const body = `Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0APhone: ${formData.phone}%0D%0AService: ${formData.service}%0D%0A%0D%0AMessage:%0D%0A${formData.message}`;
    window.location.href = `mailto:genanewmichael90@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-purple/10 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold mb-6">
              Let's Build Something <span className="gradient-text">Amazing</span> Together.
            </h2>
            <p className="text-lg text-white/60 mb-10 leading-relaxed">
              Ready to elevate your digital presence? Fill out the form and our team will get back to you within 24 hours.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-brand-accent">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-xs text-[var(--text-secondary)] uppercase tracking-widest">Email Us</p>
                  <p className="font-bold">genanewmichael90@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-brand-accent">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-xs text-[var(--text-secondary)] uppercase tracking-widest">Call Us</p>
                  <p className="font-bold">+251940471155</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-brand-accent">
                  <MessageCircle size={24} />
                </div>
                <div>
                  <p className="text-xs text-[var(--text-secondary)] uppercase tracking-widest">WhatsApp</p>
                  <a href="https://wa.me/251940471155" target="_blank" rel="noopener noreferrer" className="font-bold hover:text-brand-accent transition-colors">+251940471155</a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-brand-accent">
                  <Send size={24} />
                </div>
                <div>
                  <p className="text-xs text-[var(--text-secondary)] uppercase tracking-widest">Telegram</p>
                  <a href="https://t.me/+251940471155" target="_blank" rel="noopener noreferrer" className="font-bold hover:text-brand-accent transition-colors">+251940471155</a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-brand-accent">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-xs text-[var(--text-secondary)] uppercase tracking-widest">Visit Us</p>
                  <p className="font-bold">Addis Ababa, Ethiopia</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 md:p-10 rounded-3xl glass"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/70">Full Name</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-brand-accent outline-none transition-all text-base" 
                    placeholder="John Doe" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/70">Email Address</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-brand-accent outline-none transition-all text-base" 
                    placeholder="john@example.com" 
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/70">Phone Number</label>
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-brand-accent outline-none transition-all text-base" 
                    placeholder="+1 (555) 000-0000" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/70">Service Needed</label>
                  <select 
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-brand-accent outline-none transition-all appearance-none text-base"
                  >
                    <option className="bg-brand-blue">Logo Design</option>
                    <option className="bg-brand-blue">Social Media Management</option>
                    <option className="bg-brand-blue">Web Development</option>
                    <option className="bg-brand-blue">Full Package</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">Your Message</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4} 
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-brand-accent outline-none transition-all text-base" 
                  placeholder="Tell us about your project..."
                ></textarea>
              </div>
              <button type="submit" className="w-full py-4 rounded-xl bg-brand-purple hover:bg-brand-purple/80 transition-all font-bold glow-purple">
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Team = () => {
  const staff = [
    {
      name: "Michael Genanew",
      role: "CEO and Founder",
      description: "Visionary leader with a passion for digital transformation and innovative design. Michael drives the creative direction and long-term strategy of NovaWave.",
      img: "https://image2url.com/r2/default/images/1773593056146-3f228030-a44a-4ac8-a337-0257b41496ae.jpg"
    },
    {
      name: "Adonai Fikreselassie",
      role: "General Manager",
      description: "Strategic expert focused on operational excellence and client success. Adonai ensures every project meets our high standards of quality and efficiency.",
      img: "https://image2url.com/r2/default/images/1773593151276-eb9ace60-3fb2-4f08-a6c4-67b0cc6bac03.jpg"
    }
  ];

  return (
    <section id="team" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Meet Our <span className="gradient-text">Staff</span></h2>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            The dedicated professionals driving innovation and excellence at NovaWave.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {staff.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-3xl glass flex flex-col items-center text-center group hover:bg-white/5 transition-all"
            >
              <div className="w-32 h-32 rounded-full overflow-hidden mb-6 border-2 border-brand-purple/30 group-hover:border-brand-accent transition-colors">
                <img 
                  src={member.img} 
                  alt={member.name} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
              <p className="text-brand-accent text-sm font-bold uppercase tracking-widest mb-4">{member.role}</p>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                {member.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Legal = () => {
  return (
    <section id="legal" className="py-24 bg-brand-purple/5">
      <div className="max-w-4xl mx-auto px-6 grid md:grid-cols-2 gap-16">
        <div>
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Shield className="text-brand-accent" size={24} /> Privacy Policy
          </h3>
          <div className="space-y-4 text-sm text-[var(--text-secondary)] leading-relaxed">
            <p>At NovaWave, we take your privacy seriously. We only collect information necessary to provide our services and improve your experience.</p>
            <p>Your data is encrypted and never shared with third parties without your explicit consent. We comply with international data protection standards.</p>
          </div>
        </div>
        <div>
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Rocket className="text-brand-accent" size={24} /> Terms & Conditions
          </h3>
          <div className="space-y-4 text-sm text-[var(--text-secondary)] leading-relaxed">
            <p>By using our services, you agree to our commitment to quality and transparency. All projects are subject to clear milestones and delivery timelines.</p>
            <p>Intellectual property rights for delivered works are transferred to the client upon full payment, ensuring you have complete ownership of your brand assets.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="pt-24 pb-12 bg-black/40 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <a href="#" className="flex items-center gap-2">
              <img 
                src="https://image2url.com/r2/default/images/1773590606447-3197630d-d8e3-4f44-b499-28a495c78c6a.jpg" 
                alt="NovaWave Logo" 
                className="h-10 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </a>
            <p className="text-white/50 text-sm leading-relaxed">
              Leading the digital revolution with innovative design and high-performance solutions for modern businesses.
            </p>
            <div className="flex gap-4">
              {[Instagram, Twitter, Linkedin, Facebook].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-brand-purple transition-all text-white/70 hover:text-white">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm text-white/50">
              <li><a href="#about" className="hover:text-brand-accent transition-colors">About Us</a></li>
              <li><a href="#services" className="hover:text-brand-accent transition-colors">Our Services</a></li>
              <li><a href="#pricing" className="hover:text-brand-accent transition-colors">Pricing Plans</a></li>
              <li><a href="#portfolio" className="hover:text-brand-accent transition-colors">Portfolio</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Services</h4>
            <ul className="space-y-4 text-sm text-white/50">
              <li><a href="#" className="hover:text-brand-accent transition-colors">Brand Identity</a></li>
              <li><a href="#" className="hover:text-brand-accent transition-colors">UI/UX Design</a></li>
              <li><a href="#" className="hover:text-brand-accent transition-colors">Social Strategy</a></li>
              <li><a href="#" className="hover:text-brand-accent transition-colors">Web Apps</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Newsletter</h4>
            <p className="text-sm text-white/50 mb-4">Subscribe to get the latest digital trends.</p>
            <div className="flex gap-2">
              <input type="email" className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm outline-none focus:border-brand-accent flex-grow" placeholder="Email" />
              <button className="p-2 bg-brand-purple rounded-lg hover:bg-brand-purple/80 transition-all">
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/30 uppercase tracking-widest">
          <p>© 2026 NovaWave Digital Solutions PLC. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#legal" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#legal" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('light', savedTheme === 'light');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('light', newTheme === 'light');
  };

  return (
    <div className="min-h-screen bg-brand-blue selection:bg-brand-purple/30">
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <Hero />
      <About />
      <Team />
      <Services />
      <Pricing />
      <Portfolio />
      <Testimonials />
      <Contact />
      <Legal />
      <Footer />
    </div>
  );
}
