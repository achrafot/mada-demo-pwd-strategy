// DESIGN: صفحة تفاصيل المحور - نفس هوية الاستراتيجية
// Colors: Pillar-specific color + Maroon #8B1A4A accents
// Layout: RTL, header with pillar color, content sections

import { useParams, Link } from "wouter";
import { pillars } from "@/lib/strategyData";
import { motion } from "framer-motion";
import { ArrowRight, Target, BarChart2, Lightbulb, CheckCircle2 } from "lucide-react";

export default function PillarPage() {
  const { id } = useParams<{ id: string }>();
  const pillar = pillars.find((p) => p.id === Number(id));

  if (!pillar) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">المحور غير موجود</p>
          <Link href="/" className="text-[#8B1A4A] font-bold hover:underline">
            العودة للرئيسية
          </Link>
        </div>
      </div>
    );
  }

  const currentIndex = pillars.findIndex((p) => p.id === pillar.id);
  const prevPillar = currentIndex > 0 ? pillars[currentIndex - 1] : null;
  const nextPillar = currentIndex < pillars.length - 1 ? pillars[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Nav Bar */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-40 shadow-sm">
        <div className="container flex items-center justify-between h-14">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-[#8B1A4A] transition-colors"
          >
            <ArrowRight size={16} />
            <span>العودة للرئيسية</span>
          </Link>
          <div className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ background: pillar.color }}
            />
            <span className="text-sm font-bold text-gray-700">{pillar.subtitle}</span>
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <div
        className="relative py-16 overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${pillar.color}, ${pillar.color}BB)` }}
      >
        {/* Arch decorative pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="archPillar" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M30 0 Q45 15 45 30 Q45 45 30 60 Q15 45 15 30 Q15 15 30 0Z" fill="none" stroke="white" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#archPillar)"/>
          </svg>
        </div>

        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">{pillar.icon}</span>
              <div>
                <p className="text-white/70 text-sm font-medium">{pillar.title}</p>
                <h1 className="text-3xl md:text-4xl font-black text-white">{pillar.subtitle}</h1>
              </div>
            </div>

            <div className="max-w-3xl">
              <div className="flex items-start gap-3 bg-white/15 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <Target size={18} className="text-white/80 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white/70 text-xs font-semibold mb-1">الهدف الاستراتيجي</p>
                  <p className="text-white font-bold text-sm leading-relaxed">{pillar.goal}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="container py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
            >
              <h2 className="text-xl font-black text-gray-900 mb-4 flex items-center gap-2">
                <span
                  className="w-1 h-6 rounded-full inline-block"
                  style={{ background: pillar.color }}
                />
                نظرة عامة
              </h2>
              <p className="text-gray-700 leading-relaxed text-sm">{pillar.description}</p>
            </motion.div>

            {/* Initiatives */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
            >
              <h2 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
                <Lightbulb size={20} style={{ color: pillar.color }} />
                أبرز المبادرات والبرامج
              </h2>
              <div className="space-y-5">
                {pillar.initiatives.map((initiative, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.08 }}
                    className="flex gap-4 p-5 rounded-xl border-r-4"
                    style={{
                      borderRightColor: pillar.color,
                      background: pillar.lightColor,
                    }}
                  >
                    <div className="flex-shrink-0 mt-0.5">
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-black"
                        style={{ background: pillar.color }}
                      >
                        {i + 1}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-black text-gray-900 mb-2 text-sm">{initiative.title}</h3>
                      <p className="text-gray-600 text-xs leading-relaxed">{initiative.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar - KPIs */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
            >
              <h2 className="text-lg font-black text-gray-900 mb-5 flex items-center gap-2">
                <BarChart2 size={18} style={{ color: pillar.color }} />
                مؤشرات الأداء (KPIs)
              </h2>
              <div className="space-y-3">
                {pillar.kpis.map((kpi, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2
                      size={16}
                      className="mt-0.5 flex-shrink-0"
                      style={{ color: pillar.color }}
                    />
                    <p className="text-sm text-gray-700 leading-relaxed">{kpi.text}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="rounded-2xl p-6 text-white"
              style={{ background: `linear-gradient(135deg, ${pillar.color}, ${pillar.color}AA)` }}
            >
              <h3 className="font-black mb-4 text-sm">إحصائيات المحور</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/15 rounded-xl p-4 text-center">
                  <div className="text-3xl font-black">{pillar.initiatives.length}</div>
                  <div className="text-xs text-white/80 mt-1">مبادرة</div>
                </div>
                <div className="bg-white/15 rounded-xl p-4 text-center">
                  <div className="text-3xl font-black">{pillar.kpis.length}</div>
                  <div className="text-xs text-white/80 mt-1">مؤشر أداء</div>
                </div>
              </div>
            </motion.div>

            {/* Action Plan Link */}
            <Link href="/action-plan">
              <div
                className="rounded-2xl p-6 cursor-pointer hover:opacity-90 transition-opacity"
                style={{ background: "#8B1A4A" }}
              >
                <p className="text-white font-black text-sm mb-2">خطة العمل التفصيلية</p>
                <p className="text-white/70 text-xs leading-relaxed">
                  استعرض خطة العمل الكاملة مع الجداول الزمنية ومؤشرات الأداء لجميع المحاور
                </p>
              </div>
            </Link>
          </div>
        </div>

        {/* Navigation between pillars */}
        <div className="flex items-center justify-between mt-12 pt-8 border-t border-gray-200">
          {prevPillar ? (
            <Link href={`/pillar/${prevPillar.id}`}>
              <div className="flex items-center gap-3 group cursor-pointer">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white"
                  style={{ background: prevPillar.color }}
                >
                  <ArrowRight size={18} />
                </div>
                <div>
                  <p className="text-xs text-gray-400">المحور السابق</p>
                  <p className="text-sm font-bold text-gray-700 group-hover:text-[#8B1A4A] transition-colors">
                    {prevPillar.subtitle}
                  </p>
                </div>
              </div>
            </Link>
          ) : (
            <div />
          )}

          {nextPillar ? (
            <Link href={`/pillar/${nextPillar.id}`}>
              <div className="flex items-center gap-3 group cursor-pointer">
                <div>
                  <p className="text-xs text-gray-400 text-left">المحور التالي</p>
                  <p className="text-sm font-bold text-gray-700 group-hover:text-[#8B1A4A] transition-colors">
                    {nextPillar.subtitle}
                  </p>
                </div>
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white"
                  style={{ background: nextPillar.color }}
                >
                  <ArrowRight size={18} className="rotate-180" />
                </div>
              </div>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
}
