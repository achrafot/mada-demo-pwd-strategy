// DESIGN: لوحة مؤشرات الأداء التفاعلية
// Colors: Maroon #8B1A4A, Steel Blue #2B5A7A, Gold #E8C84A
// Layout: RTL, dark sidebar + light content, Recharts visualizations
// Philosophy: Data-driven, institutional, high-contrast KPI cards

import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  AreaChart,
  Area,
  Cell,
} from "recharts";
import {
  ArrowRight,
  LayoutDashboard,
  TrendingUp,
  Target,
  Award,
  CheckCircle2,
  Clock,
  BarChart2,
  Activity,
  Layers,
  ChevronDown,
  Info,
} from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────
const outcomes = [
  {
    id: 1,
    icon: "⚖️",
    title: "العدالة وعدم التمييز",
    fullTitle: "مجتمع قائم على العدالة وعدم التمييز",
    pillar: "التشريعات والامتثال",
    color: "#8B1A4A",
    light: "#FFF0F5",
    progress2027: 45,
    progress2029: 72,
    progress2031: 95,
    kpis: [
      { name: "مواءمة التشريعات", value2027: 50, value2029: 75, value2031: 100, unit: "%" },
      { name: "التزام الجهات", value2027: 40, value2029: 70, value2031: 90, unit: "%" },
      { name: "محاكم مُهيَّأة", value2027: 60, value2029: 85, value2031: 100, unit: "%" },
      { name: "معالجة الشكاوى", value2027: 30, value2029: 65, value2031: 90, unit: "%" },
    ],
    radarScore: 85,
  },
  {
    id: 2,
    icon: "📚",
    title: "التعليم الدامج",
    fullTitle: "نظام تعليمي دامج وعالي الجودة",
    pillar: "التعليم الدامج",
    color: "#2B5A7A",
    light: "#EEF4F9",
    progress2027: 55,
    progress2029: 78,
    progress2031: 95,
    kpis: [
      { name: "الطلبة في الدمج", value2027: 60, value2029: 80, value2031: 95, unit: "%" },
      { name: "مدارس مُهيَّأة", value2027: 50, value2029: 75, value2031: 95, unit: "%" },
      { name: "معلمون مدربون", value2027: 55, value2029: 85, value2031: 100, unit: "%" },
      { name: "خطط IEP", value2027: 55, value2029: 75, value2031: 90, unit: "%" },
    ],
    radarScore: 90,
  },
  {
    id: 3,
    icon: "🏥",
    title: "الصحة والتأهيل",
    fullTitle: "صحة وتأهيل يُعزِّزان القدرات الوظيفية",
    pillar: "الصحة والتأهيل",
    color: "#1A7A4A",
    light: "#EEF9F3",
    progress2027: 60,
    progress2029: 80,
    progress2031: 97,
    kpis: [
      { name: "الكشف المبكر", value2027: 80, value2029: 95, value2031: 100, unit: "%" },
      { name: "مراكز التأهيل", value2027: 5, value2029: 10, value2031: 15, unit: "مركز" },
      { name: "الصحة النفسية", value2027: 40, value2029: 65, value2031: 85, unit: "%" },
      { name: "تغطية الخدمات", value2027: 55, value2029: 75, value2031: 95, unit: "%" },
    ],
    radarScore: 88,
  },
  {
    id: 4,
    icon: "💼",
    title: "التوظيف والتمكين",
    fullTitle: "مشاركة اقتصادية فعالة ومستدامة",
    pillar: "التوظيف والتمكين الاقتصادي",
    color: "#7A5A1A",
    light: "#FBF6EE",
    progress2027: 35,
    progress2029: 62,
    progress2031: 88,
    kpis: [
      { name: "نسبة التوظيف", value2027: 2, value2029: 3.5, value2031: 5, unit: "%" },
      { name: "التزام الحصص", value2027: 40, value2029: 70, value2031: 90, unit: "%" },
      { name: "برامج التدريب", value2027: 500, value2029: 1200, value2031: 2500, unit: "مستفيد" },
      { name: "الشمول المالي", value2027: 35, value2029: 60, value2031: 80, unit: "%" },
    ],
    radarScore: 75,
  },
  {
    id: 5,
    icon: "♿",
    title: "الوصول الشامل",
    fullTitle: "بيئة وطنية خالية من العوائق",
    pillar: "الوصول الشامل",
    color: "#1A4A7A",
    light: "#EEF2F9",
    progress2027: 65,
    progress2029: 82,
    progress2031: 98,
    kpis: [
      { name: "مباني ملتزمة", value2027: 80, value2029: 95, value2031: 100, unit: "%" },
      { name: "خدمات رقمية", value2027: 50, value2029: 80, value2031: 100, unit: "%" },
      { name: "وسائل النقل", value2027: 60, value2029: 80, value2031: 95, unit: "%" },
      { name: "الفضاءات العامة", value2027: 55, value2029: 75, value2031: 95, unit: "%" },
    ],
    radarScore: 92,
  },
  {
    id: 6,
    icon: "🛡️",
    title: "الحماية الاجتماعية",
    fullTitle: "نظام حماية اجتماعية داعم للاستقلالية",
    pillar: "الحماية الاجتماعية",
    color: "#5A1A7A",
    light: "#F5EEF9",
    progress2027: 58,
    progress2029: 76,
    progress2031: 93,
    kpis: [
      { name: "تغطية الدعم المالي", value2027: 70, value2029: 85, value2031: 95, unit: "%" },
      { name: "خدمات مجتمعية", value2027: 30, value2029: 55, value2031: 75, unit: "%" },
      { name: "دعم الأسرة", value2027: 50, value2029: 70, value2031: 90, unit: "%" },
      { name: "مساكن مستقلة", value2027: 20, value2029: 40, value2031: 65, unit: "%" },
    ],
    radarScore: 82,
  },
  {
    id: 7,
    icon: "🤝",
    title: "التأهيل الاجتماعي",
    fullTitle: "استقلالية واندماج مجتمعي حقيقي",
    pillar: "التأهيل الاجتماعي",
    color: "#1A7A6A",
    light: "#EEF9F7",
    progress2027: 42,
    progress2029: 65,
    progress2031: 90,
    kpis: [
      { name: "مشاركة مجتمعية", value2027: 30, value2029: 50, value2031: 70, unit: "%" },
      { name: "مستفيدو التأهيل", value2027: 500, value2029: 1200, value2031: 2000, unit: "شخص" },
      { name: "إرشاد أسري", value2027: 40, value2029: 65, value2031: 85, unit: "%" },
      { name: "أنشطة رياضية", value2027: 35, value2029: 60, value2031: 80, unit: "%" },
    ],
    radarScore: 78,
  },
  {
    id: 8,
    icon: "📊",
    title: "الحوكمة والبيانات",
    fullTitle: "حوكمة فعّالة ونظام بيانات وطني متكامل",
    pillar: "الحوكمة والبيانات",
    color: "#4A3A1A",
    light: "#F9F6EE",
    progress2027: 50,
    progress2029: 75,
    progress2031: 95,
    kpis: [
      { name: "السجل الوطني", value2027: 60, value2029: 85, value2031: 95, unit: "%" },
      { name: "خدمات المنصة", value2027: 30, value2029: 65, value2031: 90, unit: "%" },
      { name: "دقة البيانات", value2027: 70, value2029: 85, value2031: 95, unit: "%" },
      { name: "ربط الجهات", value2027: 40, value2029: 70, value2031: 90, unit: "%" },
    ],
    radarScore: 87,
  },
];

// Overall progress timeline data
const timelineData = [
  { year: "2026", overall: 0, ...Object.fromEntries(outcomes.map((o) => [o.id, 0])) },
  { year: "2027", overall: 51, ...Object.fromEntries(outcomes.map((o) => [o.id, o.progress2027])) },
  { year: "2028", overall: 63, ...Object.fromEntries(outcomes.map((o) => [o.id, Math.round((o.progress2027 + o.progress2029) / 2)])) },
  { year: "2029", overall: 74, ...Object.fromEntries(outcomes.map((o) => [o.id, o.progress2029])) },
  { year: "2030", overall: 85, ...Object.fromEntries(outcomes.map((o) => [o.id, Math.round((o.progress2029 + o.progress2031) / 2)])) },
  { year: "2031", overall: 94, ...Object.fromEntries(outcomes.map((o) => [o.id, o.progress2031])) },
];

// Radar data for overall strategy
const radarData = outcomes.map((o) => ({
  subject: o.title,
  "2027": o.progress2027,
  "2029": o.progress2029,
  "2031": o.progress2031,
}));

// ─── Helpers ──────────────────────────────────────────────────
function getProgressColor(value: number) {
  if (value >= 85) return "#1A7A4A";
  if (value >= 65) return "#2B5A7A";
  if (value >= 45) return "#E8C84A";
  return "#8B1A4A";
}

function ProgressRing({ value, color, size = 80 }: { value: number; color: string; size?: number }) {
  const r = (size - 12) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (value / 100) * circ;
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#E5E7EB" strokeWidth={8} />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={8}
        strokeLinecap="round"
        strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
    </svg>
  );
}

// ─── KPI Summary Cards ────────────────────────────────────────
function SummaryCards({ selectedYear }: { selectedYear: "2027" | "2029" | "2031" }) {
  const yearKey = `progress${selectedYear}` as keyof (typeof outcomes)[0];
  const values = outcomes.map((o) => o[yearKey] as number);
  const avg = Math.round(values.reduce((a, b) => a + b, 0) / values.length);
  const above80 = values.filter((v) => v >= 80).length;
  const below50 = values.filter((v) => v < 50).length;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {[
        { label: "متوسط الإنجاز الكلي", value: `${avg}%`, icon: <Activity size={20} />, color: "#2B5A7A", bg: "#EEF4F9" },
        { label: "نتائج تجاوزت 80%", value: `${above80} / 8`, icon: <CheckCircle2 size={20} />, color: "#1A7A4A", bg: "#EEF9F3" },
        { label: "نتائج تحت 50%", value: `${below50} / 8`, icon: <Clock size={20} />, color: "#8B1A4A", bg: "#FFF0F5" },
        { label: "السنة المستهدفة", value: selectedYear, icon: <Target size={20} />, color: "#7A5A1A", bg: "#FBF6EE" },
      ].map((card, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
          className="rounded-2xl p-5 flex items-center gap-4"
          style={{ background: card.bg }}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white flex-shrink-0"
            style={{ background: card.color }}
          >
            {card.icon}
          </div>
          <div>
            <div className="text-xl font-black" style={{ color: card.color }}>{card.value}</div>
            <div className="text-xs text-gray-500 leading-tight">{card.label}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Outcome Progress Cards ───────────────────────────────────
function OutcomeProgressGrid({ selectedYear }: { selectedYear: "2027" | "2029" | "2031" }) {
  const [selected, setSelected] = useState<number | null>(null);
  const yearKey = `progress${selectedYear}` as keyof (typeof outcomes)[0];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {outcomes.map((outcome, i) => {
        const progress = outcome[yearKey] as number;
        const isSelected = selected === outcome.id;
        return (
          <motion.div
            key={outcome.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.06 }}
            className="rounded-2xl overflow-hidden cursor-pointer border-2 transition-all duration-200"
            style={{
              borderColor: isSelected ? outcome.color : "transparent",
              boxShadow: isSelected ? `0 4px 20px ${outcome.color}30` : "0 1px 4px rgba(0,0,0,0.06)",
              background: "white",
            }}
            onClick={() => setSelected(isSelected ? null : outcome.id)}
          >
            {/* Card Top */}
            <div className="p-4" style={{ background: outcome.light }}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl">{outcome.icon}</span>
                <div className="relative">
                  <ProgressRing value={progress} color={outcome.color} size={56} />
                  <div
                    className="absolute inset-0 flex items-center justify-center text-xs font-black"
                    style={{ color: outcome.color }}
                  >
                    {progress}%
                  </div>
                </div>
              </div>
              <p className="text-xs font-black leading-tight" style={{ color: outcome.color }}>
                {outcome.title}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">{outcome.pillar}</p>
            </div>

            {/* Progress Bar */}
            <div className="px-4 py-3">
              <div className="flex justify-between text-xs text-gray-400 mb-1.5">
                <span>الإنجاز المتوقع</span>
                <span style={{ color: getProgressColor(progress) }}>{progress}%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: outcome.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1, ease: "easeOut", delay: i * 0.06 }}
                />
              </div>
            </div>

            {/* Expanded KPIs */}
            <AnimatePresence>
              {isSelected && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden border-t border-gray-100"
                >
                  <div className="p-4 space-y-3">
                    <p className="text-xs font-black text-gray-700 mb-2">المؤشرات التفصيلية:</p>
                    {outcome.kpis.map((kpi, ki) => {
                      const kpiVal = selectedYear === "2027" ? kpi.value2027 : selectedYear === "2029" ? kpi.value2029 : kpi.value2031;
                      const maxVal = kpi.value2031;
                      const pct = Math.round((kpiVal / maxVal) * 100);
                      return (
                        <div key={ki}>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-gray-600">{kpi.name}</span>
                            <span className="font-bold" style={{ color: outcome.color }}>
                              {kpiVal} {kpi.unit}
                            </span>
                          </div>
                          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full rounded-full"
                              style={{ background: `${outcome.color}99` }}
                              initial={{ width: 0 }}
                              animate={{ width: `${pct}%` }}
                              transition={{ duration: 0.8, delay: ki * 0.1 }}
                            />
                          </div>
                        </div>
                      );
                    })}
                    <Link href="/outcomes">
                      <div
                        className="mt-3 text-center text-xs font-bold py-2 rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                        style={{ background: outcome.light, color: outcome.color }}
                      >
                        عرض التفاصيل الكاملة ←
                      </div>
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}

// ─── Bar Chart: Comparison ────────────────────────────────────
function ComparisonBarChart() {
  const data = outcomes.map((o) => ({
    name: o.title,
    "2027": o.progress2027,
    "2029": o.progress2029,
    "2031": o.progress2031,
    color: o.color,
  }));

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
      <h3 className="text-base font-black text-gray-900 mb-1 flex items-center gap-2">
        <BarChart2 size={16} className="text-[#2B5A7A]" />
        مقارنة نسب الإنجاز عبر السنوات الثلاث
      </h3>
      <p className="text-xs text-gray-400 mb-5">نسبة الإنجاز المتوقعة لكل نتيجة استراتيجية في المراحل الزمنية الثلاث</p>
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 60 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 10, fontFamily: "Lusail", fill: "#6B7280" }}
            angle={-35}
            textAnchor="end"
            interval={0}
          />
          <YAxis tick={{ fontSize: 10, fontFamily: "Lusail", fill: "#6B7280" }} domain={[0, 100]} unit="%" />
          <Tooltip
            contentStyle={{ fontFamily: "Lusail", fontSize: 12, borderRadius: 12, border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.12)" }}
            formatter={(value: number) => [`${value}%`]}
          />
          <Legend
            wrapperStyle={{ fontFamily: "Lusail", fontSize: 12, paddingTop: 16 }}
            formatter={(value) => `مستهدف ${value}`}
          />
          <Bar dataKey="2027" fill="#8B1A4A" radius={[4, 4, 0, 0]} />
          <Bar dataKey="2029" fill="#2B5A7A" radius={[4, 4, 0, 0]} />
          <Bar dataKey="2031" fill="#1A7A4A" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// ─── Area Chart: Overall Progress Timeline ────────────────────
function ProgressTimeline() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
      <h3 className="text-base font-black text-gray-900 mb-1 flex items-center gap-2">
        <TrendingUp size={16} className="text-[#1A7A4A]" />
        مسار الإنجاز الكلي للاستراتيجية (2026–2031)
      </h3>
      <p className="text-xs text-gray-400 mb-5">متوسط نسبة الإنجاز الإجمالي عبر جميع النتائج الوطنية الثمانية</p>
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={timelineData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
          <defs>
            <linearGradient id="overallGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2B5A7A" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#2B5A7A" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
          <XAxis dataKey="year" tick={{ fontSize: 11, fontFamily: "Lusail", fill: "#6B7280" }} />
          <YAxis tick={{ fontSize: 11, fontFamily: "Lusail", fill: "#6B7280" }} domain={[0, 100]} unit="%" />
          <Tooltip
            contentStyle={{ fontFamily: "Lusail", fontSize: 12, borderRadius: 12, border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.12)" }}
            formatter={(value: number) => [`${value}%`, "الإنجاز الكلي"]}
          />
          <Area
            type="monotone"
            dataKey="overall"
            stroke="#2B5A7A"
            strokeWidth={3}
            fill="url(#overallGrad)"
            dot={{ fill: "#2B5A7A", r: 5, strokeWidth: 2, stroke: "white" }}
            activeDot={{ r: 7, fill: "#8B1A4A" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

// ─── Line Chart: Per-Outcome Trends ──────────────────────────
function OutcomeTrendsChart({ selectedOutcomes }: { selectedOutcomes: number[] }) {
  const filtered = outcomes.filter((o) => selectedOutcomes.includes(o.id));
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
      <h3 className="text-base font-black text-gray-900 mb-1 flex items-center gap-2">
        <Activity size={16} className="text-[#8B1A4A]" />
        مسار تطور النتائج المحددة
      </h3>
      <p className="text-xs text-gray-400 mb-5">اختر النتائج من القائمة أدناه لمقارنة مساراتها</p>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={timelineData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
          <XAxis dataKey="year" tick={{ fontSize: 11, fontFamily: "Lusail", fill: "#6B7280" }} />
          <YAxis tick={{ fontSize: 11, fontFamily: "Lusail", fill: "#6B7280" }} domain={[0, 100]} unit="%" />
          <Tooltip
            contentStyle={{ fontFamily: "Lusail", fontSize: 12, borderRadius: 12, border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.12)" }}
            formatter={(value: number, name: string) => {
              const o = outcomes.find((x) => String(x.id) === name);
              return [`${value}%`, o?.title || name];
            }}
          />
          {filtered.map((o) => (
            <Line
              key={o.id}
              type="monotone"
              dataKey={String(o.id)}
              stroke={o.color}
              strokeWidth={2.5}
              dot={{ fill: o.color, r: 4, strokeWidth: 2, stroke: "white" }}
              activeDot={{ r: 6 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

// ─── Radar Chart ──────────────────────────────────────────────
function StrategyRadarChart({ selectedYear }: { selectedYear: "2027" | "2029" | "2031" }) {
  const yearKey = `progress${selectedYear}` as keyof (typeof outcomes)[0];
  const data = outcomes.map((o) => ({
    subject: o.title,
    value: o[yearKey] as number,
    fullMark: 100,
  }));

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
      <h3 className="text-base font-black text-gray-900 mb-1 flex items-center gap-2">
        <Layers size={16} className="text-[#5A1A7A]" />
        مخطط الشبكة — توازن الإنجاز عبر النتائج
      </h3>
      <p className="text-xs text-gray-400 mb-2">مستهدف {selectedYear}</p>
      <ResponsiveContainer width="100%" height={320}>
        <RadarChart data={data}>
          <PolarGrid stroke="#E5E7EB" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fontSize: 10, fontFamily: "Lusail", fill: "#6B7280" }}
          />
          <Radar
            name={`مستهدف ${selectedYear}`}
            dataKey="value"
            stroke="#2B5A7A"
            fill="#2B5A7A"
            fillOpacity={0.2}
            strokeWidth={2}
          />
          <Tooltip
            contentStyle={{ fontFamily: "Lusail", fontSize: 12, borderRadius: 12, border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.12)" }}
            formatter={(value: number) => [`${value}%`]}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

// ─── Main Dashboard Page ──────────────────────────────────────
export default function Dashboard() {
  const [selectedYear, setSelectedYear] = useState<"2027" | "2029" | "2031">("2031");
  const [selectedOutcomes, setSelectedOutcomes] = useState<number[]>([1, 2, 3, 4]);
  const [activeTab, setActiveTab] = useState<"overview" | "comparison" | "trends" | "radar">("overview");

  const toggleOutcome = (id: number) => {
    setSelectedOutcomes((prev) =>
      prev.includes(id) ? (prev.length > 1 ? prev.filter((x) => x !== id) : prev) : [...prev, id]
    );
  };

  const tabs = [
    { id: "overview", label: "نظرة عامة", icon: <LayoutDashboard size={14} /> },
    { id: "comparison", label: "المقارنة", icon: <BarChart2 size={14} /> },
    { id: "trends", label: "المسارات", icon: <TrendingUp size={14} /> },
    { id: "radar", label: "مخطط الشبكة", icon: <Activity size={14} /> },
  ] as const;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Nav */}
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
            <LayoutDashboard size={16} className="text-[#2B5A7A]" />
            <span className="text-sm font-black text-gray-800">لوحة مؤشرات الأداء</span>
          </div>
        </div>
      </div>

      {/* Page Header */}
      <div
        className="py-12 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0F2A40 0%, #1B3A5A 50%, #2B5A7A 100%)" }}
      >
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="dashGrid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M40 0L0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dashGrid)" />
          </svg>
        </div>

        <div className="container relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="text-white">
              <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 rounded-full px-3 py-1.5 mb-4">
                <LayoutDashboard size={12} />
                <span className="text-xs font-medium">الاستراتيجية الوطنية 2026–2031</span>
              </div>
              <h1 className="text-2xl md:text-4xl font-black mb-2">لوحة مؤشرات الأداء</h1>
              <p className="text-white/65 text-sm">
                متابعة تفاعلية لنسب الإنجاز المتوقعة للنتائج الوطنية الثمانية
              </p>
            </div>

            {/* Year Selector */}
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-2xl p-1.5 border border-white/20">
              {(["2027", "2029", "2031"] as const).map((year) => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className="px-4 py-2 rounded-xl text-sm font-black transition-all duration-200"
                  style={
                    selectedYear === year
                      ? { background: "#E8C84A", color: "#1B3A5A" }
                      : { color: "rgba(255,255,255,0.7)" }
                  }
                >
                  {year}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container py-8">
        {/* Summary Cards */}
        <SummaryCards selectedYear={selectedYear} />

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all duration-200 flex-shrink-0"
              style={
                activeTab === tab.id
                  ? { background: "#1B3A5A", color: "white" }
                  : { background: "white", color: "#6B7280", border: "1px solid #E5E7EB" }
              }
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
            >
              <div className="bg-[#EEF4F9] rounded-2xl p-4 mb-6 flex items-start gap-3 border border-[#2B5A7A]/15">
                <Info size={16} className="text-[#2B5A7A] mt-0.5 flex-shrink-0" />
                <p className="text-xs text-[#2B5A7A] leading-relaxed">
                  انقر على أي بطاقة لعرض المؤشرات التفصيلية. تعكس النسب الإنجاز المتوقع بناءً على المستهدفات الواردة في الاستراتيجية الوطنية.
                </p>
              </div>
              <OutcomeProgressGrid selectedYear={selectedYear} />
              <ProgressTimeline />
            </motion.div>
          )}

          {activeTab === "comparison" && (
            <motion.div
              key="comparison"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
            >
              <ComparisonBarChart />

              {/* Heatmap-style table */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-base font-black text-gray-900 mb-4 flex items-center gap-2">
                  <Award size={16} className="text-[#E8C84A]" />
                  جدول المستهدفات التفصيلي
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100">
                        <th className="text-right py-3 px-3 text-xs font-black text-gray-500 w-48">النتيجة الوطنية</th>
                        <th className="text-center py-3 px-3 text-xs font-black text-[#8B1A4A]">2027</th>
                        <th className="text-center py-3 px-3 text-xs font-black text-[#2B5A7A]">2029</th>
                        <th className="text-center py-3 px-3 text-xs font-black text-[#1A7A4A]">2031</th>
                        <th className="text-center py-3 px-3 text-xs font-black text-gray-500">التقدم</th>
                      </tr>
                    </thead>
                    <tbody>
                      {outcomes.map((o) => (
                        <tr key={o.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                          <td className="py-3 px-3">
                            <div className="flex items-center gap-2">
                              <span>{o.icon}</span>
                              <span className="text-xs font-bold text-gray-700">{o.title}</span>
                            </div>
                          </td>
                          {[o.progress2027, o.progress2029, o.progress2031].map((val, vi) => (
                            <td key={vi} className="py-3 px-3 text-center">
                              <span
                                className="inline-block px-2.5 py-1 rounded-full text-xs font-black text-white"
                                style={{ background: getProgressColor(val) }}
                              >
                                {val}%
                              </span>
                            </td>
                          ))}
                          <td className="py-3 px-3">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                  className="h-full rounded-full transition-all duration-700"
                                  style={{
                                    width: `${o.progress2031}%`,
                                    background: `linear-gradient(90deg, ${o.color}80, ${o.color})`,
                                  }}
                                />
                              </div>
                              <span className="text-xs font-bold text-gray-500 w-8">{o.progress2031}%</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "trends" && (
            <motion.div
              key="trends"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
            >
              {/* Outcome selector */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-6">
                <p className="text-sm font-black text-gray-700 mb-3">اختر النتائج للمقارنة:</p>
                <div className="flex flex-wrap gap-2">
                  {outcomes.map((o) => (
                    <button
                      key={o.id}
                      onClick={() => toggleOutcome(o.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200"
                      style={
                        selectedOutcomes.includes(o.id)
                          ? { background: o.color, color: "white" }
                          : { background: o.light, color: o.color, border: `1.5px solid ${o.color}30` }
                      }
                    >
                      <span>{o.icon}</span>
                      {o.title}
                    </button>
                  ))}
                </div>
              </div>
              <OutcomeTrendsChart selectedOutcomes={selectedOutcomes} />
              <ProgressTimeline />
            </motion.div>
          )}

          {activeTab === "radar" && (
            <motion.div
              key="radar"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
            >
              <div className="grid md:grid-cols-2 gap-6">
                <StrategyRadarChart selectedYear={selectedYear} />
                <div className="space-y-4">
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h3 className="text-base font-black text-gray-900 mb-4 flex items-center gap-2">
                      <Target size={16} className="text-[#8B1A4A]" />
                      تصنيف النتائج حسب الإنجاز — {selectedYear}
                    </h3>
                    <div className="space-y-3">
                      {[...outcomes]
                        .sort((a, b) => {
                          const key = `progress${selectedYear}` as keyof typeof a;
                          return (b[key] as number) - (a[key] as number);
                        })
                        .map((o, rank) => {
                          const key = `progress${selectedYear}` as keyof typeof o;
                          const val = o[key] as number;
                          return (
                            <div key={o.id} className="flex items-center gap-3">
                              <div
                                className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-black flex-shrink-0"
                                style={{ background: rank < 3 ? "#E8C84A" : "#E5E7EB", color: rank < 3 ? "#1B3A5A" : "#9CA3AF" }}
                              >
                                {rank + 1}
                              </div>
                              <span className="text-sm">{o.icon}</span>
                              <div className="flex-1">
                                <div className="flex justify-between mb-1">
                                  <span className="text-xs font-bold text-gray-700">{o.title}</span>
                                  <span className="text-xs font-black" style={{ color: o.color }}>{val}%</span>
                                </div>
                                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                  <div
                                    className="h-full rounded-full"
                                    style={{ width: `${val}%`, background: o.color }}
                                  />
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Links */}
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          <Link href="/outcomes">
            <div className="rounded-2xl p-5 cursor-pointer hover:opacity-90 transition-opacity text-white" style={{ background: "linear-gradient(135deg, #8B1A4A, #6B1238)" }}>
              <Award size={20} className="mb-2" />
              <p className="font-black text-sm">النتائج الاستراتيجية</p>
              <p className="text-white/65 text-xs mt-1">تفاصيل النتائج الثمانية والمؤشرات</p>
            </div>
          </Link>
          <Link href="/action-plan">
            <div className="rounded-2xl p-5 cursor-pointer hover:opacity-90 transition-opacity text-white" style={{ background: "linear-gradient(135deg, #2B5A7A, #1B3A5A)" }}>
              <BarChart2 size={20} className="mb-2" />
              <p className="font-black text-sm">خطة العمل التنفيذية</p>
              <p className="text-white/65 text-xs mt-1">المشاريع التفصيلية والجداول الزمنية</p>
            </div>
          </Link>
          <Link href="/#pillars">
            <div className="rounded-2xl p-5 cursor-pointer hover:opacity-90 transition-opacity text-white" style={{ background: "linear-gradient(135deg, #1A7A4A, #0F5A35)" }}>
              <Layers size={20} className="mb-2" />
              <p className="font-black text-sm">المحاور الاستراتيجية</p>
              <p className="text-white/65 text-xs mt-1">المحاور الثمانية والمبادرات</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-8">
        <div className="container text-center">
          <p className="text-gray-400 text-sm">الاستراتيجية الوطنية لحقوق الأشخاص ذوي الإعاقة 2026–2031 | دولة قطر</p>
          <p className="text-gray-600 text-xs mt-2">"تمكين يحقق الاستقلالية"</p>
        </div>
      </footer>
    </div>
  );
}
