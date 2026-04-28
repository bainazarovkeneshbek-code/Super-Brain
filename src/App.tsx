/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { 
  Brain, 
  Target, 
  Smartphone, 
  GraduationCap, 
  Users, 
  ShieldCheck, 
  ArrowRight, 
  Instagram, 
  Youtube, 
  Send,
  CheckCircle2,
  AlertCircle,
  Menu,
  X,
  Languages,
  Globe,
  Play
} from "lucide-react";
import React, { ReactNode, useState, useEffect } from "react";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
  key?: React.Key;
}

const FadeIn = ({ 
  children, 
  delay = 0, 
  direction = "up",
  className = "" 
}: FadeInProps) => {
  const directions = {
    up: { y: 30, scale: 0.98 },
    down: { y: -30, scale: 0.98 },
    left: { x: 30, scale: 0.98 },
    right: { x: -30, scale: 0.98 }
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 1, 
        delay, 
        ease: [0.16, 1, 0.3, 1] 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const Float = ({ children, duration = 4, delay = 0 }: { children: React.ReactNode, duration?: number, delay?: number }) => (
  <motion.div
    animate={{ y: [0, -10, 0] }}
    transition={{ 
      duration, 
      repeat: Infinity, 
      ease: "easeInOut",
      delay 
    }}
  >
    {children}
  </motion.div>
);

const MeshBackground = () => (
  <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none opacity-20">
    <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-brand-accent/30 blur-[120px] animate-pulse" />
    <div className="absolute bottom-[20%] right-[-10%] w-[40%] h-[60%] rounded-full bg-indigo-600/20 blur-[150px]" />
    <div className="absolute top-[40%] left-[20%] w-[25%] h-[25%] rounded-full bg-brand-accent/40 blur-[100px]" />
    <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="mesh-grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#mesh-grid)" />
    </svg>
  </div>
);

const DataTicker = () => {
  const [tickerData, setTickerData] = useState<{ weather: string; rates: string } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const weatherRes = await fetch("https://api.open-meteo.com/v1/forecast?latitude=42.87&longitude=74.59&current_weather=true");
        const weatherJson = await weatherRes.json();
        const temp = weatherJson.current_weather.temperature;

        const currencyRes = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
        const currencyJson = await currencyRes.json();
        const kgs = currencyJson.rates.KGS.toFixed(2);
        const rub = currencyJson.rates.RUB.toFixed(2);
        const eur = (1 / currencyJson.rates.EUR).toFixed(2);

        setTickerData({
          weather: `Бишкек: ${temp}°C`,
          rates: `USD/KGS: ${kgs} • EUR/USD: ${eur} • USD/RUB: ${rub}`
        });
      } catch (err) {
        console.warn("Ticker data fetch failed. Using fallback.", err);
        setTickerData({
          weather: "Бишкек: +22°C",
          rates: "USD/KGS: 89.45 • EUR/USD: 1.08 • USD/RUB: 92.10"
        });
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 300000);
    return () => clearInterval(interval);
  }, []);

  if (!tickerData) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-brand-secondary/90 backdrop-blur-xl border-b border-white/5 py-2 overflow-hidden h-8">
      <motion.div
        animate={{ x: [0, -1500] }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        className="flex items-center gap-24 whitespace-nowrap px-4"
      >
        <div className="flex items-center gap-12 text-[10px] font-black uppercase tracking-[0.4em] text-brand-gold/80">
          <span>{tickerData.weather}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-brand-accent/40" />
          <span>{tickerData.rates}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-brand-accent/40" />
          <span>Super Brain: Мээни өнүктүрүү жана эс тутумду күчөтүү курсу </span>
          <span className="w-1.5 h-1.5 rounded-full bg-brand-accent/40" />
          <span>{tickerData.weather}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-brand-accent/40" />
          <span>{tickerData.rates}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-brand-accent/40" />
          <span>Европалык методика менен эффективдүү окутуу</span>
        </div>
      </motion.div>
    </div>
  );
};

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const playClickSound = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      // Modern UI "click" sound
      oscillator.type = "triangle";
      oscillator.frequency.setValueAtTime(1200, audioCtx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(80, audioCtx.currentTime + 0.04);

      gainNode.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.04);

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.04);
    } catch (e) {
      console.warn("Audio Context failed", e);
    }
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLElement>) => {
    playClickSound();
  };

  const whatsappLink = "https://wa.me/996770026262";
  const instagramLink = "https://www.instagram.com/elnura.ai?igsh=MWw4bWphcWhvem84cA==";
  const youtubeLink = "https://youtube.com/channel/UCLFRLYrFvRUaNILtP1IjOuQ?si=MHo-XwlJGUq6LsN9";

  return (
    <div className="min-h-screen font-sans selection:bg-brand-accent/30 overflow-x-hidden">
      <DataTicker />
      {/* Header */}
      <header 
        className={`fixed top-8 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? "py-3 glass shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] border-b border-white/5" : "py-8 bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-6 group relative cursor-pointer" onClick={() => { playClickSound(); window.scrollTo({top: 0, behavior: 'smooth'}); }}>
            <div className="relative">
              <div className="absolute inset-0 border border-brand-accent/40 bg-brand-accent/5 transition-all duration-700 group-hover:bg-brand-accent/10 group-hover:rotate-45" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="relative z-10 w-12 h-12 p-2 flex items-center justify-center"
              >
                <img 
                   src="/input_file_0.png" 
                   alt="Logo"
                   className="w-full h-full object-contain filter brightness-125"
                   referrerPolicy="no-referrer"
                 />
              </motion.div>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-black tracking-tighter text-white uppercase italic leading-none">
                Super Brain
              </span>
              <span className="text-[8px] font-black uppercase tracking-[0.4em] text-brand-accent/60 mt-1">Elnura Erikovna</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 px-1 py-1 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-xl">
            {[
              { label: "Эксперт", href: "#about" },
              { label: "Курс", href: "#course" },
              { label: "Пикирлер", href: "#testimonials" },
              { label: "Кимдер үчүн", href: "#audience" }
            ].map((link) => (
              <motion.a 
                key={link.label}
                href={link.href} 
                onClick={handleLinkClick} 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-300"
              >
                {link.label}
              </motion.a>
            ))}
            <div className="w-px h-4 bg-white/10 mx-2" />
            <a 
              href={whatsappLink} 
              target="_blank" 
              onClick={handleLinkClick}
              className="bg-brand-accent text-white px-6 py-2.5 rounded-xl hover:shadow-[0_0_20px_rgba(139,92,246,0.5)] transition-all duration-500 flex items-center gap-2 text-xs font-black uppercase tracking-widest border border-white/10"
            >
              Азыр жазылуу
            </a>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-white"
            onClick={() => {
              playClickSound();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-brand-secondary/95 backdrop-blur-2xl md:hidden flex flex-col justify-center items-center p-12 text-center"
          >
            <MeshBackground />
            <button 
              className="absolute top-8 right-8 text-white w-12 h-12 flex items-center justify-center bg-white/5 rounded-full border border-white/10"
              onClick={() => { playClickSound(); setMobileMenuOpen(false); }}
            >
              <X className="w-6 h-6" />
            </button>

            <div className="w-full max-w-sm flex flex-col gap-8">
              {[
                { label: "Эксперт", href: "#about" },
                { label: "Курс", href: "#course" },
                { label: "Пикирлер", href: "#testimonials" },
                { label: "Кимдер үчүн", href: "#audience" }
              ].map((link, idx) => (
                <motion.a 
                  key={link.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  href={link.href} 
                  onClick={() => { playClickSound(); setMobileMenuOpen(false); }}
                  className="text-4xl font-serif font-black text-white hover:text-brand-accent transition-colors tracking-tight uppercase italic"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                href={whatsappLink} 
                className="mt-8 bg-brand-accent text-white px-8 py-5 rounded-[2rem] text-2xl font-black uppercase tracking-widest shadow-2xl shadow-brand-accent/30"
                onClick={() => { playClickSound(); setMobileMenuOpen(false); }}
              >
                Азыр жазылуу
              </motion.a>

              <div className="mt-12 flex justify-center gap-8">
                <Instagram className="text-slate-500 w-6 h-6" />
                <Youtube className="text-slate-500 w-6 h-6" />
                <Send className="text-slate-500 w-6 h-6" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="bg-brand-secondary relative">
        <MeshBackground />

        {/* Hero Section */}
        <section className="relative pt-40 pb-20 md:pt-56 md:pb-32 overflow-hidden">
          <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
            <FadeIn direction="up">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-accent/10 border border-brand-accent/20 rounded-full mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-accent"></span>
                </span>
                <span className="text-brand-accent text-[10px] font-bold uppercase tracking-[0.2em]">New Batch: May 2024</span>
              </div>
              <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] text-white mb-8 tracking-tighter">
                Super <span className="text-brand-accent italic relative">
                  Brain
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 100 20" preserveAspectRatio="none">
                    <path d="M0,10 Q50,20 100,10" stroke="currentColor" fill="none" strokeWidth="4" />
                  </svg>
                </span> <br/>
                <span className="opacity-80">Experience</span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-lg leading-relaxed font-light">
                Unleash your cognitive potential with Belgium-certified neuro-methodology. Better memory, laser focus, and cognitive freedom.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <a 
                  href={whatsappLink} 
                  target="_blank"
                  onClick={handleLinkClick}
                  className="group relative bg-brand-accent text-white px-10 py-5 rounded-2xl text-lg font-bold transition-all duration-500 hover:shadow-[0_20px_50px_rgba(59,130,246,0.3)] flex items-center justify-center gap-3 overflow-hidden"
                >
                  <motion.div 
                    className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  <span className="relative z-10 flex items-center gap-3">
                    Азыр жазылуу <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </a>
                <a 
                  href="#course" 
                  onClick={handleLinkClick}
                  className="px-10 py-5 rounded-2xl text-lg font-bold border-2 border-slate-800 text-white hover:border-brand-accent transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm"
                >
                  Курс жөнүндө
                </a>
              </div>
              
                <div className="mt-12 flex items-center gap-6 text-slate-500">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-brand-secondary bg-slate-800 flex items-center justify-center overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-brand-accent to-indigo-900 flex items-center justify-center">
                        <Users className="w-5 h-5 text-white/50" />
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-sm tracking-tight"><span className="text-brand-gold font-black">8,000+</span> graduates worldwide</p>
              </div>
            </FadeIn>
            
            <FadeIn direction="left" delay={0.2} className="relative lg:block hidden">
              <div className="relative group">
                <div className="absolute -inset-4 bg-brand-accent/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border border-white/5 bg-slate-900">
                  <img 
                    src="/input_file_0.png" 
                    alt="Elnura Erikovna" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-1000" 
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-secondary via-transparent to-transparent" />
                  
                  <div className="absolute bottom-10 left-10 right-10">
                    <div className="flex flex-col gap-4">
                      <div className="h-px w-20 bg-brand-gold" />
                      <h2 className="text-4xl font-serif font-bold text-white leading-tight">Эльнура <br/> Эриковна</h2>
                      <p className="text-brand-gold font-bold uppercase tracking-widest text-[10px]">Principal Founder & Expert</p>
                    </div>
                  </div>
                </div>

                {/* Floating Stats */}
                <div className="absolute -top-10 -left-10">
                  <Float>
                    <div className="glass p-6 rounded-3xl shadow-2xl border border-white/10 bg-black/40 backdrop-blur-2xl">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-brand-gold/10 rounded-2xl flex items-center justify-center text-brand-gold">
                          <GraduationCap className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-white tracking-widest">9 Yr</p>
                          <p className="text-[10px] uppercase font-black text-brand-gold/60 tracking-tighter">Belgium Academy</p>
                        </div>
                      </div>
                    </div>
                  </Float>
                </div>
                
                <div className="absolute -bottom-6 -right-6">
                  <Float delay={1}>
                    <div className="glass p-6 rounded-3xl shadow-2xl border border-white/10 bg-black/40 backdrop-blur-2xl">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-brand-gold/10 rounded-2xl flex items-center justify-center text-brand-gold">
                          <Globe className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-white tracking-widest">6</p>
                          <p className="text-[10px] uppercase font-black text-brand-gold/60 tracking-tighter">Fluent Languages</p>
                        </div>
                      </div>
                    </div>
                  </Float>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Problem Section (Enhanced Technical Look) */}
        <section className="py-24 relative">
          <div className="container mx-auto px-6">
            <FadeIn>
              <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
                <div className="max-w-2xl">
                  <h2 className="font-serif text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                    Мээңиз <span className="text-slate-500 italic">чарчап</span> калдыбы?
                  </h2>
                  <p className="text-slate-400 text-lg">Заманбап дүйнөдө биз маалыматтын ашыкча көптүгүнөн жапа чегебиз.</p>
                </div>
                <div className="h-px flex-grow bg-slate-800 mx-8 hidden md:block" />
                <div className="text-right">
                  <p className="text-6xl font-serif font-black text-brand-gold/10 italic">01</p>
                </div>
              </div>
            </FadeIn>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-800 border border-slate-800 rounded-[3rem] overflow-hidden shadow-2xl">
              {[
                { 
                  icon: <AlertCircle className="w-10 h-10" />, 
                  title: "Унутчак болуу", 
                  desc: "Керектүү маалыматтарды бат унутуп жатасызбы?" 
                },
                { 
                  icon: <Smartphone className="w-10 h-10" />, 
                  title: "Цифралык чарчоо", 
                  desc: "Телефонго болгон көз карандылык мээңизди жабыркатууда." 
                },
                { 
                  icon: <Target className="w-10 h-10" />, 
                  title: "Фокустун жоктугу", 
                  desc: "Бир ишке көңүл топтой албай, чачыранды болуп жатасыз." 
                },
                { 
                  icon: <GraduationCap className="w-10 h-10" />, 
                  title: "Окуудагы кыйынчылык", 
                  desc: "Жаңы маалыматты өздөштүрүү мурункудан оор болууда." 
                },
                { 
                  icon: <Brain className="w-10 h-10" />, 
                  title: "Энергиянын азайышы", 
                  desc: "Күндүн ортосунда эле мээңиз чарчап, иштөө жөндөмү төмөндөйт." 
                },
                { 
                  icon: <Users className="w-10 h-10" />, 
                  title: "Социалдык эффект", 
                  desc: "Башкалар менен баарлашууда сөздөрдү таба албай кыйналасыз." 
                }
              ].map((item, idx) => (
                <FadeIn key={idx} delay={idx * 0.05} className="bg-brand-secondary border-slate-800 border-r border-b">
                  <div className="relative z-10 p-12 group transition-all duration-700 hover:bg-brand-dark hover:scale-[1.02]">
                    <div className="w-20 h-20 bg-brand-accent/5 rounded-3xl flex items-center justify-center text-brand-accent mb-8 group-hover:bg-brand-accent group-hover:text-white transition-all duration-500 group-hover:rotate-12 group-hover:scale-110">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        {item.icon}
                      </motion.div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{item.title}</h3>
                    <p className="text-slate-400 leading-relaxed font-light">{item.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Expert Profile */}
        <section id="about" className="py-24 bg-brand-dark text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-accent/10 skew-x-12 translate-x-1/2" />
          <div className="container mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <FadeIn direction="right">
                <div className="relative">
                  <div className="aspect-[3/4] rounded-[3rem] overflow-hidden border-4 border-white/10 shadow-2xl">
                    <img 
                      src="/input_file_0.png" 
                      alt="Elnura Erikovna" 
                      className="w-full h-full object-cover hover:scale-105 transition-all duration-700" 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="absolute -bottom-8 -right-8 glass p-8 rounded-[2rem] text-white hidden md:block">
                    <p className="text-5xl font-serif font-bold text-brand-accent mb-1">20+</p>
                    <p className="text-sm font-bold uppercase tracking-widest">Жылдык тажрыйба</p>
                  </div>
                </div>
              </FadeIn>

              <FadeIn direction="left">
                <h2 className="font-serif text-4xl md:text-5xl font-bold mb-8">Эксперт тууралуу</h2>
                <p className="text-2xl text-brand-accent font-serif mb-6 italic">Эльнура Эриковна</p>
                <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                  Программист, мугалим жана “Супермозг” курсунун негиздөөчүсү. Европалык билим берүү стандарттарын Кыргызстанга алып келүүдө.
                </p>
                
                <div className="space-y-6">
                  {[
                    { icon: <Globe className="w-5 h-5" />, text: "20 жылдан ашуун Бельгияда жашап келген" },
                    { icon: <GraduationCap className="w-5 h-5" />, text: "Бельгияда 9 жылдык мектептин негиздөөчүсү" },
                    { icon: <Users className="w-5 h-5" />, text: "8000ден ашуун бүтүрүүчү чыгарган" },
                    { icon: <CheckCircle2 className="w-5 h-5" />, text: "2026-жылы Кыргызстанда 500дөн ашуун окуучуга билим берген" },
                    { icon: <Languages className="w-5 h-5" />, text: "6 тилде эркин сүйлөйт" }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                      <div className="text-brand-accent mt-1">{item.icon}</div>
                      <p className="text-lg font-medium">{item.text}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-12 p-8 rounded-3xl bg-brand-accent/20 border border-brand-accent/30">
                  <p className="text-xl font-serif italic leading-relaxed text-white">
                    "Менин максатым — адамдардын жашыруун мүмкүнчүлүктөрүн ачып, күчтүү эс тутум жана ийгиликтүү келечек түзүүгө жардам берүү."
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Course Info */}
        <section id="course" className="py-24 bg-brand-secondary">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-16">
              <div className="lg:w-1/3">
                <FadeIn>
                  <h2 className="font-serif text-4xl font-bold text-white mb-6">“Супермозг” курсу</h2>
                  <p className="text-slate-400 text-lg mb-8">
                    Бул программа сиздин мээңиздин иштөөсүн оптималдаштыруу үчүн иштелип чыккан.
                  </p>
                  <div className="space-y-4">
                    <div className="p-6 rounded-2xl bg-brand-dark shadow-sm border border-slate-800">
                      <p className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-1">Окуу мөөнөтү</p>
                      <p className="text-2xl font-bold text-white">1 ай</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-brand-dark shadow-sm border border-slate-800">
                      <p className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-1">Жеткиликтүүлүк</p>
                      <p className="text-2xl font-bold text-white">3 ай</p>
                    </div>
                  </div>
                </FadeIn>
              </div>

              <div className="lg:w-2/3">
                <FadeIn delay={0.2}>
                  <div className="bg-brand-dark p-10 md:p-16 rounded-[3rem] shadow-xl border border-slate-800">
                    <h3 className="text-2xl font-bold text-white mb-8 border-b border-slate-800 pb-6">Бул курс сизге жардам берет:</h3>
                    <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
                      {[
                        "Эс тутумду жакшыртууга",
                        "Концентрацияны күчөтүүгө",
                        "Телефонго көз карандылыкты азайтууга",
                        "Бат үйрөнүүгө",
                        "Балдардын сабакка кызыгуусун арттууга",
                        "Мээнин иштөөсүн күчөтүүгө",
                        "Өзүңүзгө болгон ишенимди көтөрүүгө"
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <CheckCircle2 className="w-6 h-6 text-brand-accent shrink-0" />
                          <span className="text-lg font-medium text-slate-300">{item}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-12 flex justify-center">
                      <a 
                        href={whatsappLink} 
                        target="_blank"
                        onClick={handleLinkClick}
                        className="bg-brand-accent text-white px-10 py-5 rounded-2xl text-xl font-bold hover:scale-105 active:scale-95 transition-all shadow-lg shadow-brand-accent/20"
                      >
                        Курска жазылуу
                      </a>
                    </div>
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>
        </section>

        {/* Why this course (Bento Layout) */}
        <section className="py-24 relative overflow-hidden bg-brand-dark">
          <div className="container mx-auto px-6">
            <FadeIn>
              <div className="text-center mb-20">
                <h2 className="font-serif text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight text-balance">
                  Эмне үчүн бизди <span className="text-brand-accent">тандашат</span>?
                </h2>
                <p className="text-slate-400 text-lg">Бир гана бизде уникалдуу европалык методика.</p>
              </div>
            </FadeIn>

            <div className="grid md:grid-cols-4 md:grid-rows-2 gap-6 h-auto md:h-[600px]">
              <FadeIn className="md:col-span-2 md:row-span-2 bg-gradient-to-br from-brand-accent to-indigo-900 p-12 rounded-[3.5rem] flex flex-col justify-end group cursor-default shadow-2xl shadow-brand-accent/20 border border-white/10">
                <Globe className="w-16 h-16 text-white mb-8 group-hover:scale-110 transition-transform duration-500" />
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Бельгиялык <br/> методика</h3>
                <p className="text-slate-100 text-lg opacity-80 font-light">Бельгиянын билим берүү стандарттарына негизделген, 20 жылдык тажрыйбадан келип чыккан уникалдуу программа.</p>
              </FadeIn>

              <FadeIn delay={0.1} className="md:col-span-2 bg-slate-800 p-10 rounded-[3rem] border border-slate-700 flex flex-col justify-center hover:border-brand-accent/50 transition-colors">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-brand-accent/10 rounded-2xl flex items-center justify-center text-brand-accent shrink-0">
                    <Smartphone className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Жеңил жана түшүнүктүү</h3>
                    <p className="text-slate-400 text-sm italic">Татаал нерселерди эң жөнөкөй тилде жеткирүү — биздин өзгөчөлүк.</p>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.2} className="bg-slate-800 p-10 rounded-[3rem] border border-slate-700 flex flex-col justify-center hover:border-brand-accent/50 transition-colors">
                <Target className="w-10 h-10 text-brand-accent mb-6" />
                <h3 className="text-lg font-bold text-white mb-2">Практика</h3>
                <p className="text-slate-500 text-xs uppercase tracking-widest font-black">100% Real Results</p>
              </FadeIn>

              <FadeIn delay={0.3} className="bg-slate-900 p-10 rounded-[3rem] border border-slate-800 flex flex-col justify-center border-dashed">
                <Users className="w-10 h-10 text-brand-accent mb-6 opacity-30" />
                <p className="text-white font-medium leading-tight">Биринчи жумадан баштап эле мээңиздеги өзгөрүүнү сезесиз.</p>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Testimonials (Dashboard/Premium Look) */}
        <section id="testimonials" className="py-24 bg-brand-secondary">
          <div className="container mx-auto px-6">
            <FadeIn>
              <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
                <div>
                  <h2 className="font-serif text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                    Бүтүрүүчүлөр <br/> <span className="text-brand-accent italic">сүйлөйт</span>
                  </h2>
                  <p className="text-slate-400 text-lg">Биздин эң чоң жетишкендигибиз — бул окуучуларыбыздын ийгилиги.</p>
                </div>
                <div className="flex gap-4">
                  <div className="px-6 py-3 bg-brand-dark border border-slate-800 rounded-2xl text-xs font-bold uppercase tracking-widest text-slate-500">
                    Video Reviews
                  </div>
                </div>
              </div>
            </FadeIn>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {[
                { 
                  name: "Айбек", 
                  status: "Ата-эне", 
                  img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
                  review: "Балам үчүн мыкты тандоо болду. Эс тутуму абдан жакшырды."
                },
                { 
                  name: "Гульзат", 
                  status: "Студент", 
                  img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1970&auto=format&fit=crop",
                  review: "Сабактарды бат өздөштүрүп, экзамендерди оңой тапшырып жатам."
                },
                { 
                  name: "Тилек", 
                  status: "Программист", 
                  img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1970&auto=format&fit=crop",
                  review: "Концентрациям жогорулады. Жаңы технологияларды үйрөнүү жеңилдеди."
                }
              ].map((video, idx) => (
                <FadeIn key={idx} delay={idx * 0.1}>
                  <div className="group relative rounded-[2.5rem] overflow-hidden bg-brand-dark border border-slate-800 shadow-2xl hover:-translate-y-2 transition-all duration-700">
                    <div className="aspect-video relative overflow-hidden">
                      <img 
                        src={video.img} 
                        alt={video.name} 
                        className="w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" 
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div 
                          whileHover={{ scale: 1.15 }}
                          whileTap={{ scale: 0.9 }}
                          className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 shadow-2xl cursor-pointer"
                          onClick={playClickSound}
                        >
                          <Play className="w-6 h-6 fill-current translate-x-0.5 text-brand-accent" />
                        </motion.div>
                      </div>
                      <div className="absolute top-4 left-4">
                        <div className="px-3 py-1 bg-brand-accent/20 backdrop-blur-md border border-brand-accent/30 rounded-full text-[10px] font-black text-brand-accent uppercase tracking-widest">
                          New Story
                        </div>
                      </div>
                    </div>
                    <div className="p-10">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-brand-secondary overflow-hidden border border-slate-700">
                          <img src={video.img} className="w-full h-full object-cover grayscale" />
                        </div>
                        <div>
                          <p className="text-xl font-bold text-white">{video.name}</p>
                          <p className="text-slate-500 text-xs font-black uppercase tracking-widest leading-none">{video.status}</p>
                        </div>
                      </div>
                      <p className="text-slate-400 italic font-serif text-lg leading-relaxed mb-8">“{video.review}”</p>
                      <div className="h-px w-full bg-slate-800" />
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Audience Section */}
        <section id="audience" className="py-32 bg-brand-dark relative overflow-hidden">
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-brand-accent/20 blur-[100px] rounded-full" />
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-20 items-center">
              <FadeIn className="lg:w-1/2 space-y-10">
                <div className="w-20 h-20 bg-brand-gold flex items-center justify-center text-black rounded-[2rem] shadow-2xl shadow-brand-gold/20 rotate-3">
                  <Users className="w-10 h-10" />
                </div>
                <h2 className="font-serif text-5xl md:text-7xl font-bold text-white tracking-tighter leading-none">
                  Кимдер үчүн <br/> <span className="text-slate-500 italic">ылайыктуу</span>?
                </h2>
                <p className="text-xl text-slate-400 font-light max-w-md">Биздин программа ар түрдүү курактагы жана кесиптеги адамдарга багытталган.</p>
              </FadeIn>

              <FadeIn direction="left" className="lg:w-1/2 grid grid-cols-1 gap-4">
                {[
                  "Баласынын окуусун жакшырткысы келген ата-энелерге",
                  "Концентрациясын күчөткүсү келгендерге",
                  "Эс тутумун жакшырткысы келгендерге",
                  "Телефонго көп алаксыгандарга",
                  "Өзүн өнүктүрүүнү каалагандарга"
                ].map((item, idx) => (
                    <div key={idx} className="group flex items-center gap-6 bg-slate-900/40 backdrop-blur-sm p-8 rounded-[2.5rem] border border-white/5 hover:border-brand-gold/30 transition-all duration-500">
                    <div className="w-3 h-3 bg-brand-gold rounded-full shadow-[0_0_15px_rgba(251,191,36,0.8)] group-hover:scale-150 transition-transform" />
                    <span className="text-xl font-medium text-slate-200 tracking-tight leading-snug">{item}</span>
                  </div>
                ))}
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Registration Section */}
        <section id="register" className="py-24 bg-brand-dark relative overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto glass p-12 md:p-16 rounded-[4rem] border border-white/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/20 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
              
              <FadeIn className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-accent/20 rounded-full text-brand-accent text-sm font-black uppercase tracking-widest mb-6">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-accent"></span>
                  </span>
                  Акысыз сабак
                </div>
                <h2 className="font-serif text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                  5-март эс тутум боюнча акысыз сабак өтүлөт🤩
                </h2>
                <p className="text-xl text-slate-400 font-light">
                  Катталуу үчүн анкетаны толтуруңуз⬇️
                </p>
              </FadeIn>

              <form className="max-w-xl mx-auto space-y-8" onSubmit={(e) => { e.preventDefault(); playClickSound(); }}>
                <FadeIn delay={0.1}>
                  <div className="space-y-4">
                    <label className="block text-slate-400 text-sm font-bold uppercase tracking-widest pl-4">Аты жөнүңүз *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Мисалы: Асан Асанов"
                      className="w-full bg-white/5 border border-white/10 rounded-3xl px-8 py-5 text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-accent/50 focus:bg-white/10 transition-all"
                    />
                  </div>
                </FadeIn>

                <FadeIn delay={0.2}>
                  <div className="space-y-4">
                    <label className="block text-slate-400 text-sm font-bold uppercase tracking-widest pl-4">Телефон номериңиз *</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="+996 (___) __-__-__"
                      className="w-full bg-white/5 border border-white/10 rounded-3xl px-8 py-5 text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-accent/50 focus:bg-white/10 transition-all"
                    />
                  </div>
                </FadeIn>

                <FadeIn delay={0.3}>
                  <p className="text-slate-500 text-center text-sm font-light italic mb-8">
                    Байланышта болуңуз менеджер-адисибиз сизге байланышып маалымат берет💫
                  </p>
                  
                  {/* Purple framed button */}
                  <div className="p-2 border-2 border-brand-accent/30 rounded-[2.5rem] bg-brand-accent/5">
                    <button 
                      type="submit"
                      onClick={playClickSound}
                      className="w-full bg-brand-accent text-white py-6 rounded-[2rem] text-xl font-black uppercase tracking-[0.2em] hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] hover:scale-[1.01] active:scale-95 transition-all duration-500 flex items-center justify-center gap-3"
                    >
                      Жөнөтүү <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </FadeIn>
              </form>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 bg-brand-secondary relative overflow-hidden">
          <div className="container mx-auto px-6 text-center relative z-10">
            <FadeIn>
              <h2 className="font-serif text-5xl md:text-8xl font-bold text-white mb-8 tracking-tighter">
                Мээңиздин <span className="text-brand-gold italic">потенциалын</span> ачыңыз
              </h2>
              <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto font-light">
                Убакытты текке кетирбеңиз, бүгүн баштаңыз. Эс тутум — бул сиздин эң чоң байлыгыңыз.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <a 
                  href={whatsappLink} 
                  target="_blank"
                  onClick={handleLinkClick}
                  className="bg-brand-gold text-black px-12 py-6 rounded-[2.5rem] text-2xl font-black uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-2xl shadow-brand-gold/20 flex items-center justify-center gap-3"
                >
                  <Send className="w-6 h-6" /> Азыр жазылуу
                </a>
              </div>
              <div className="mt-16 flex justify-center gap-8">
                <motion.a 
                  href={instagramLink} 
                  target="_blank" 
                  onClick={handleLinkClick} 
                  whileHover={{ y: -5, color: "#3B82F6" }}
                  className="text-slate-500 transition-colors flex items-center gap-2 font-bold uppercase tracking-widest text-xs"
                >
                  <Instagram className="w-5 h-5" /> Instagram
                </motion.a>
                <motion.a 
                  href={youtubeLink} 
                  target="_blank" 
                  onClick={handleLinkClick} 
                  whileHover={{ y: -5, color: "#3B82F6" }}
                  className="text-slate-500 transition-colors flex items-center gap-2 font-bold uppercase tracking-widest text-xs"
                >
                  <Youtube className="w-5 h-5" /> YouTube
                </motion.a>
              </div>
            </FadeIn>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-full h-full bg-brand-accent/10 blur-[150px] rounded-full scale-150" />
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 bg-brand-dark border-t border-slate-800">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8 text-slate-500 text-sm font-medium">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 border border-brand-accent/40 bg-brand-accent/10 flex items-center justify-center">
              <Brain className="w-5 h-5 text-brand-accent" />
            </div>
            <span className="font-serif font-black tracking-tighter text-white uppercase italic">Super Brain</span>
          </div>
          <p>© 2026 Эльнура Эриковна. Бардык укуктар корголгон.</p>
          <div className="flex gap-6">
             <a href={instagramLink} target="_blank" onClick={handleLinkClick} className="hover:text-brand-accent transition-colors">Instagram</a>
             <a href={youtubeLink} target="_blank" onClick={handleLinkClick} className="hover:text-brand-accent transition-colors">YouTube</a>
             <a href={whatsappLink} target="_blank" onClick={handleLinkClick} className="hover:text-brand-accent transition-colors">WhatsApp</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

