// DESIGN: الاستراتيجية الوطنية للإعاقة 2026-2031
// Colors: Maroon #8B1A4A, Steel Blue #2B5A7A, White background
// Typography: Cairo Bold headings, Cairo Regular body
// Layout: RTL, arch motif decorative elements, pillar color coding

import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { pillars, strategyStats, timeline } from "@/lib/strategyData";
import { motion } from "framer-motion";
import { ChevronLeft, Menu, X, ExternalLink, BarChart2, BookOpen, Target, Clock, LayoutDashboard } from "lucide-react";

// ─── Animated Counter ────────────────────────────────────────
function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1800;
          const start = Date.now();
          const startVal = 0;
          const tick = () => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(startVal + (target - startVal) * eased));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="counter-value">
      {count.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}

// ─── Navigation ───────────────────────────────────────────────
function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "الرئيسية", href: "#hero" },
    { label: "عن الاستراتيجية", href: "#about" },
    { label: "المحاور", href: "#pillars" },
    { label: "النتائج الاستراتيجية", href: "/outcomes" },
    { label: "لوحة المؤشرات", href: "/dashboard" },
    { label: "الجدول الزمني", href: "#timeline" },
    { label: "خطة العمل", href: "/action-plan" },
  ];

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-sm shadow-md" : "bg-transparent"
      }`}
    >
      <div className="w-full px-6 lg:px-12 flex items-center justify-between h-28">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center gap-3 cursor-pointer">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663558513650/dMxAUDvHijMNWGnbHYkJhR/logo-strategy_2a010eab.png"
              alt="الاستراتيجية الوطنية للإعاقة"
              className="h-24 w-auto object-contain"
              style={{ filter: scrolled ? "none" : "brightness(0) invert(1)" }}
            />
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 mr-auto pr-12">
          {navLinks.map((link) =>
            link.href.startsWith("/") ? (
              <Link
                key={link.label}
                href={link.href}
                className={`text-base font-medium transition-colors hover:text-[#8B1A4A] ${
                  scrolled ? "text-gray-700" : "text-white"
                }`}
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                className={`text-base font-medium transition-colors hover:text-[#8B1A4A] ${
                  scrolled ? "text-gray-700" : "text-white"
                }`}
              >
                {link.label}
              </a>
            )
          )}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className={`md:hidden ${scrolled ? "text-gray-700" : "text-white"}`}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          {navLinks.map((link) =>
            link.href.startsWith("/") ? (
              <Link
                key={link.label}
                href={link.href}
                className="block px-6 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#8B1A4A]"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                className="block px-6 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#8B1A4A]"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            )
          )}
        </div>
      )}
    </header>
  );
}

// ─── Hero Section ─────────────────────────────────────────────
function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #1B3A5A 0%, #2B5A7A 40%, #8B1A4A 100%)",
      }}
    >
      {/* Geometric pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="arch" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M40 0 Q60 20 60 40 Q60 60 40 80 Q20 60 20 40 Q20 20 40 0Z" fill="none" stroke="white" strokeWidth="1"/>
              <rect x="0" y="0" width="80" height="80" fill="none" stroke="white" strokeWidth="0.5" opacity="0.3"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#arch)"/>
        </svg>
      </div>

      {/* Arch decorative element - right side */}
      <div
        className="absolute right-0 top-0 bottom-0 w-1/3 opacity-20"
        style={{
          background: "linear-gradient(to left, rgba(255,255,255,0.15), transparent)",
          clipPath: "polygon(30% 0, 100% 0, 100% 100%, 30% 100%, 0% 50%)",
        }}
      />

      <div className="container relative z-10 py-32">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-[#E8C84A] animate-pulse" />
            <span className="text-white text-sm font-medium">دولة قطر — وزارة التنمية الاجتماعية والأسرة</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-white leading-tight mb-4"
          >
            الاستراتيجية الوطنية
            <br />
            <span style={{ color: "#E8C84A" }}>لحقوق الأشخاص ذوي الإعاقة</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-2xl md:text-3xl font-bold text-white/90 mb-6"
          >
            2026 – 2031
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl text-white/80 mb-4 font-medium"
          >
            "تمكين يحقق الاستقلالية"
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-base text-white/70 mb-10 max-w-2xl leading-relaxed"
          >
            إطار وطني متكامل يُحدِّد التوجه الاستراتيجي نحو بناء مجتمع دامج يُتيح للأشخاص ذوي الإعاقة فرصاً متكافئة في التعليم والعمل والصحة والحياة المجتمعية.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#pillars"
              className="inline-flex items-center gap-2 bg-[#8B1A4A] hover:bg-[#6B1238] text-white font-bold px-6 py-3 rounded-lg transition-all duration-200 shadow-lg"
            >
              <span>استعرض المحاور</span>
              <ChevronLeft size={18} />
            </a>
            <Link
              href="/action-plan"
              className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/40 text-white font-bold px-6 py-3 rounded-lg transition-all duration-200"
            >
              <BarChart2 size={18} />
              <span>خطة العمل التفصيلية</span>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Ministry Logo - top right corner */}
      <div className="absolute top-28 left-8 hidden lg:block">
        <motion.img
          src="https://d2xsxph8kpxj0f.cloudfront.net/310519663558513650/dMxAUDvHijMNWGnbHYkJhR/logo-ministry_f900d2d6.png"
          alt="وزارة التنمية الاجتماعية والأسرة"
          className="h-16 w-auto object-contain opacity-90"
          style={{ filter: "brightness(0) invert(1)" }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 0.9, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        />
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50">
        <span className="text-xs">مرر للأسفل</span>
        <div className="w-px h-8 bg-white/30 animate-pulse" />
      </div>
    </section>
  );
}

// ─── Stats Section ────────────────────────────────────────────
function StatsSection() {
  return (
    <section className="py-16 bg-white border-b border-gray-100">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {strategyStats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div
                className="text-4xl md:text-5xl font-black mb-2"
                style={{ color: "#8B1A4A" }}
              >
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── About Section ────────────────────────────────────────────
function AboutSection() {
  const values = [
    "عدم التمييز المطلق",
    "تكافؤ الفرص",
    "الوصول الشامل",
    "المشاركة الفاعلة",
    "المساءلة والشفافية",
    "الاستدامة",
  ];

  const goals = [
    { icon: "⚖️", text: "تحقيق العدالة وتكافؤ الفرص" },
    { icon: "🌟", text: "تعزيز الاستقلالية وجودة الحياة" },
    { icon: "🤝", text: "تعزيز المشاركة الكاملة في المجتمع" },
    { icon: "💼", text: "تعزيز المشاركة الاقتصادية" },
    { icon: "♿", text: "تحقيق الوصول الشامل" },
    { icon: "📊", text: "بناء نظام وطني قائم على البيانات والحوكمة" },
  ];

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-[#8B1A4A]/10 text-[#8B1A4A] px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            <BookOpen size={14} />
            عن الاستراتيجية
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
            الرؤية والرسالة والأهداف
          </h2>
          <div className="w-16 h-1 bg-[#8B1A4A] mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
          {/* Vision & Mission */}
          <div className="space-y-6">
            <div
              className="rounded-2xl p-8 text-white"
              style={{ background: "linear-gradient(135deg, #1B3A5A, #2B5A7A)" }}
            >
              <h3 className="text-lg font-bold mb-3 text-[#E8C84A]">الرؤية</h3>
              <p className="text-xl font-black leading-relaxed">
                "مجتمع قطري دامج وممكِّن"
              </p>
            </div>
            <div
              className="rounded-2xl p-8 text-white"
              style={{ background: "linear-gradient(135deg, #8B1A4A, #6B1238)" }}
            >
              <h3 className="text-lg font-bold mb-3 text-[#E8C84A]">الرسالة</h3>
              <p className="text-base leading-relaxed text-white/90">
                قيادة وتطوير منظومة وطنية متكاملة ومستدامة قائمة على الحقوق، تضمن تقديم خدمات عالية الجودة وشاملة، وتُعزِّز الإدماج الفعلي من خلال سياسات عامة فعالة، وشراكات استراتيجية متينة، ونظم تقييم ومتابعة مبنية على البيانات.
              </p>
            </div>
          </div>

          {/* Values */}
          <div>
            <h3 className="text-xl font-black text-gray-800 mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-[#8B1A4A] rounded-full inline-block" />
              القيم الحاكمة
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {values.map((v, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm border border-gray-100"
                >
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: "#8B1A4A" }}
                  />
                  <span className="text-sm font-semibold text-gray-700">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Strategic Goals */}
        <div>
          <h3 className="text-xl font-black text-gray-800 mb-6 flex items-center gap-2">
            <Target size={20} className="text-[#8B1A4A]" />
            الأهداف الاستراتيجية
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {goals.map((goal, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-start gap-4 bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <span className="text-2xl flex-shrink-0">{goal.icon}</span>
                <div>
                  <span className="text-sm font-bold text-gray-500 mb-1 block">الهدف {i + 1}</span>
                  <p className="text-sm font-semibold text-gray-800 leading-relaxed">{goal.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Pillars Section ──────────────────────────────────────────
function PillarsSection() {
  return (
    <section id="pillars" className="py-20 bg-white">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-[#2B5A7A]/10 text-[#2B5A7A] px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            المحاور الاستراتيجية
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
            المحاور الثمانية للاستراتيجية
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm leading-relaxed">
            تتضمن الاستراتيجية ثمانية محاور استراتيجية متكاملة تغطي جميع جوانب حياة الأشخاص ذوي الإعاقة
          </p>
          <div className="w-16 h-1 bg-[#2B5A7A] mx-auto rounded-full mt-4" />
        </div>

        {/* Pillars Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
            >
              <Link href={`/pillar/${pillar.id}`}>
                <div
                  className="pillar-card rounded-2xl overflow-hidden cursor-pointer group h-full"
                  style={{ border: `2px solid ${pillar.color}20` }}
                >
                  {/* Card Header */}
                  <div
                    className="p-6 text-white relative overflow-hidden"
                    style={{ background: `linear-gradient(135deg, ${pillar.color}, ${pillar.color}CC)` }}
                  >
                    {/* Arch decorative */}
                    <div
                      className="absolute -left-4 -top-4 w-20 h-20 rounded-full opacity-20"
                      style={{ background: "white" }}
                    />
                    <div className="relative z-10">
                      <span className="text-3xl mb-3 block">{pillar.icon}</span>
                      <p className="text-xs font-medium text-white/70 mb-1">{pillar.title}</p>
                      <h3 className="text-base font-black leading-tight">{pillar.subtitle}</h3>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5" style={{ background: pillar.lightColor }}>
                    <p className="text-xs text-gray-600 leading-relaxed mb-4 line-clamp-3">
                      {pillar.goal}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold" style={{ color: pillar.color }}>
                        {pillar.initiatives.length} مبادرات
                      </span>
                      <div
                        className="flex items-center gap-1 text-xs font-bold group-hover:gap-2 transition-all"
                        style={{ color: pillar.color }}
                      >
                        <span>التفاصيل</span>
                        <ChevronLeft size={14} />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Strategic Outcomes Preview Section ─────────────────────
function OutcomesPreviewSection() {
  const outcomesPreview = [
    { id: 1, icon: "⚖️", title: "مجتمع قائم على العدالة وعدم التمييز", color: "#8B1A4A", light: "#FFF0F5" },
    { id: 2, icon: "📚", title: "نظام تعليمي دامج وعالي الجودة", color: "#2B5A7A", light: "#EEF4F9" },
    { id: 3, icon: "🏥", title: "صحة وتأهيل يُعزِّزان القدرات الوظيفية", color: "#1A7A4A", light: "#EEF9F3" },
    { id: 4, icon: "💼", title: "مشاركة اقتصادية فعالة ومستدامة", color: "#7A5A1A", light: "#FBF6EE" },
    { id: 5, icon: "♿", title: "بيئة وطنية خالية من العوائق", color: "#1A4A7A", light: "#EEF2F9" },
    { id: 6, icon: "🛡️", title: "نظام حماية اجتماعية داعم للاستقلالية", color: "#5A1A7A", light: "#F5EEF9" },
    { id: 7, icon: "🤝", title: "استقلالية واندماج مجتمعي حقيقي", color: "#1A7A6A", light: "#EEF9F7" },
    { id: 8, icon: "📊", title: "حوكمة فعّالة ونظام بيانات وطني متكامل", color: "#4A1A1A", light: "#F9EEEE" },
  ];

  return (
    <section id="outcomes" className="py-20 bg-white">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-[#8B1A4A]/10 text-[#8B1A4A] px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            <span>🎯</span>
            النتائج الوطنية المستهدفة
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
            ماذا ستُحقق الاستراتيجية؟
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm leading-relaxed">
            ثمانية نتائج وطنية استراتيجية تُمثِّل الأثر الحقيقي المنشود على حياة الأشخاص ذوي الإعاقة في قطر بحلول 2031
          </p>
          <div className="w-16 h-1 bg-[#8B1A4A] mx-auto rounded-full mt-4" />
        </div>

        {/* Outcomes Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {outcomesPreview.map((outcome, i) => (
            <motion.div
              key={outcome.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="rounded-2xl p-5 flex flex-col items-center text-center hover:shadow-md transition-shadow cursor-pointer"
              style={{ background: outcome.light, border: `1.5px solid ${outcome.color}20` }}
            >
              <span className="text-3xl mb-3">{outcome.icon}</span>
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-black mb-2"
                style={{ background: outcome.color }}
              >
                {outcome.id}
              </div>
              <p className="text-sm font-bold leading-tight" style={{ color: outcome.color }}>
                {outcome.title}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/outcomes"
            className="inline-flex items-center gap-2 font-bold px-6 py-3 rounded-xl text-white transition-all hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #8B1A4A, #2B5A7A)" }}
          >
            <span>استعرض النتائج الاستراتيجية التفصيلية</span>
            <ChevronLeft size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Timeline Section ─────────────────────────────────────────
function TimelineSection() {
  return (
    <section id="timeline" className="py-20 bg-gray-50">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-[#8B1A4A]/10 text-[#8B1A4A] px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            <Clock size={14} />
            الجدول الزمني
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
            مراحل التنفيذ
          </h2>
          <div className="w-16 h-1 bg-[#8B1A4A] mx-auto rounded-full" />
        </div>

        {/* Timeline */}
        <div className="grid md:grid-cols-3 gap-8">
          {timeline.map((phase, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative"
            >
              {/* Connector line */}
              {i < timeline.length - 1 && (
                <div className="hidden md:block absolute top-8 left-0 w-full h-0.5 bg-gray-200 -z-10" />
              )}

              <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                {/* Phase Header */}
                <div
                  className="p-6 text-white"
                  style={{ background: `linear-gradient(135deg, ${phase.color}, ${phase.color}BB)` }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm font-black">
                      {i + 1}
                    </div>
                    <span className="text-sm font-bold text-white/80">{phase.phase}</span>
                  </div>
                  <h3 className="text-xl font-black mb-1">{phase.title}</h3>
                  <p className="text-white/80 text-sm font-semibold">{phase.period}</p>
                </div>

                {/* Phase Items */}
                <div className="p-5">
                  <ul className="space-y-3">
                    {phase.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <div
                          className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                          style={{ background: phase.color }}
                        />
                        <span className="text-sm text-gray-700 leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Dashboard Preview Section ──────────────────────────────
function DashboardPreviewSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container">
        <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-100" style={{ background: "linear-gradient(135deg, #0F2A40 0%, #1B3A5A 60%, #2B5A7A 100%)" }}>
          <div className="p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
            <div className="text-white flex-1">
              <div className="inline-flex items-center gap-2 bg-white/15 border border-white/25 rounded-full px-3 py-1.5 mb-4">
                <LayoutDashboard size={12} />
                <span className="text-xs font-medium">جديد</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black mb-3">لوحة مؤشرات الأداء التفاعلية</h2>
              <p className="text-white/65 text-sm leading-relaxed mb-6">
                تابع نسب الإنجاز المتوقعة لكل نتيجة وطنية عبر رسوم بيانية تفاعلية متحركة ومقارنات زمنية ومخططات شبكة وجداول مفصلة
              </p>
              <div className="flex flex-wrap gap-3 mb-6">
                {[
                  { icon: "📊", label: "مخطط المقارنة" },
                  { icon: "📈", label: "مسار الإنجاز" },
                  { icon: "🎯", label: "مخطط الشبكة" },
                  { icon: "📅", label: "جدول المستهدفات" },
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-1.5 bg-white/10 rounded-full px-3 py-1.5">
                    <span className="text-sm">{f.icon}</span>
                    <span className="text-xs text-white/80">{f.label}</span>
                  </div>
                ))}
              </div>
              <Link href="/dashboard">
                <div className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-black text-sm cursor-pointer hover:opacity-90 transition-opacity" style={{ background: "#E8C84A", color: "#1B3A5A" }}>
                  <LayoutDashboard size={16} />
                  <span>افتح لوحة المؤشرات</span>
                </div>
              </Link>
            </div>
            {/* Mini preview */}
            <div className="flex-shrink-0 w-full md:w-64">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <p className="text-white/60 text-xs mb-3 font-semibold">متوسط الإنجاز — 2031</p>
                {outcomes.slice(0, 4).map((o) => (
                  <div key={o.id} className="mb-3">
                    <div className="flex justify-between mb-1">
                      <span className="text-white/75 text-xs">{o.icon} {o.title}</span>
                      <span className="text-xs font-black" style={{ color: "#E8C84A" }}>{o.progress2031}%</span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${o.progress2031}%`, background: o.color }} />
                    </div>
                  </div>
                ))}
                <p className="text-white/40 text-xs text-center mt-2">+ 4 نتائج أخرى...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const outcomes = [
  { id: 1, icon: "⚖️", title: "العدالة وعدم التمييز", color: "#8B1A4A", progress2031: 95 },
  { id: 2, icon: "📚", title: "التعليم الدامج", color: "#2B5A7A", progress2031: 95 },
  { id: 3, icon: "🏥", title: "الصحة والتأهيل", color: "#1A7A4A", progress2031: 97 },
  { id: 4, icon: "💼", title: "التوظيف والتمكين", color: "#7A5A1A", progress2031: 88 },
];

function CTASection() {
  return (
    <section className="py-20" style={{ background: "linear-gradient(135deg, #1B3A5A 0%, #2B5A7A 50%, #8B1A4A 100%)" }}>
      <div className="container text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            استعرض خطة العمل التفصيلية
          </h2>
          <p className="text-white/70 mb-8 max-w-xl mx-auto text-base leading-relaxed">
            خطة عمل شاملة تتضمن 28 مشروعاً تنفيذياً مع مؤشرات الأداء والجداول الزمنية والمسؤوليات لكل محور
          </p>
          <Link
            href="/action-plan"
            className="inline-flex items-center gap-2 bg-white text-[#8B1A4A] font-black px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors shadow-lg text-base"
          >
            <ExternalLink size={18} />
            <span>عرض خطة العمل الكاملة</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Strategy Logo */}
          <div className="flex items-center gap-4">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663558513650/dMxAUDvHijMNWGnbHYkJhR/logo-strategy_2a010eab.png"
              alt="الاستراتيجية الوطنية للإعاقة"
              className="h-14 w-auto object-contain"
              style={{ filter: "brightness(0) invert(1)" }}
            />
          </div>
          {/* Ministry Logo */}
          <div className="flex items-center gap-4">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663558513650/dMxAUDvHijMNWGnbHYkJhR/logo-ministry_f900d2d6.png"
              alt="وزارة التنمية الاجتماعية والأسرة"
              className="h-12 w-auto object-contain opacity-80"
              style={{ filter: "brightness(0) invert(1)" }}
            />
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-xs">اللجنة الوطنية للمرأة والطفل والأشخاص ذوي الإعاقة وكبار السن</p>
          <p className="text-gray-600 text-xs">
            "تمكين يحقق الاستقلالية" — رؤية قطر الوطنية 2030
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── Main Home Page ───────────────────────────────────────────
export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <StatsSection />
      <AboutSection />
      <PillarsSection />
      <OutcomesPreviewSection />
      <DashboardPreviewSection />
      <TimelineSection />
      <CTASection />
      <Footer />
    </div>
  );
}
