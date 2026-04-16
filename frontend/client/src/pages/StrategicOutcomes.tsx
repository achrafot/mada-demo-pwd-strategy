// DESIGN: صفحة النتائج الاستراتيجية
// Colors: Maroon #8B1A4A, Steel Blue #2B5A7A, pillar colors
// Layout: RTL, cards with progress indicators, outcome-pillar mapping

import { useState } from "react";
import { Link } from "wouter";
import { pillars } from "@/lib/strategyData";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Target,
  TrendingUp,
  CheckCircle2,
  BarChart2,
  Award,
  ChevronDown,
  Layers,
} from "lucide-react";

// ─── النتائج الوطنية المستهدفة ────────────────────────────────
interface StrategicOutcome {
  id: number;
  title: string;
  subtitle: string;
  pillarId: number;
  icon: string;
  color: string;
  lightColor: string;
  description: string;
  indicators: string[];
  targets: { year: string; target: string }[];
  enablers: string[];
  linkedPillar: string;
}

const outcomes: StrategicOutcome[] = [
  {
    id: 1,
    title: "النتيجة الوطنية الأولى",
    subtitle: "مجتمع قائم على العدالة وعدم التمييز",
    pillarId: 1,
    icon: "⚖️",
    color: "#8B1A4A",
    lightColor: "#FFF0F5",
    description:
      "تحقيق مجتمع قطري يكفل العدالة الكاملة لجميع أفراده دون تمييز، من خلال تطبيق فعّال لقانون حقوق الأشخاص ذوي الإعاقة رقم (22) لسنة 2025، ومواءمة جميع التشريعات القطاعية مع مبادئ عدم التمييز والوصول الشامل، وتوفير سبل الانتصاف القانوني الفعّال.",
    indicators: [
      "نسبة التشريعات والسياسات القطاعية المتوافقة مع القانون رقم (22)",
      "نسبة الجهات الحكومية الملتزمة بمعايير الامتثال",
      "عدد حالات التمييز التي تم التعامل معها ضمن الأطر القانونية",
      "نسبة المحاكم والجهات القضائية المُهيَّأة للأشخاص ذوي الإعاقة",
      "متوسط زمن معالجة الشكاوى المتعلقة بحقوق الأشخاص ذوي الإعاقة",
    ],
    targets: [
      { year: "2027", target: "مواءمة 50% من التشريعات القطاعية مع القانون رقم 22" },
      { year: "2029", target: "التزام 70% من الجهات الحكومية بمعايير الامتثال" },
      { year: "2031", target: "تحقيق 100% من التشريعات المتوافقة وصفر تمييز موثق" },
    ],
    enablers: [
      "برنامج مواءمة التشريعات القطاعية",
      "النظام الوطني للرقابة والامتثال",
      "برنامج تعزيز الوصول إلى العدالة",
      "دليل الامتثال الوطني",
    ],
    linkedPillar: "التشريعات والامتثال",
  },
  {
    id: 2,
    title: "النتيجة الوطنية الثانية",
    subtitle: "نظام تعليمي دامج وعالي الجودة",
    pillarId: 2,
    icon: "📚",
    color: "#2B5A7A",
    lightColor: "#EEF4F9",
    description:
      "بناء نظام تعليمي وطني دامج يضمن حق كل طالب ذي إعاقة في الوصول إلى تعليم عالي الجودة في بيئات دامجة، مع توفير الدعم الفردي المناسب، وتأهيل الكوادر التعليمية، وتهيئة البيئات المدرسية لاستيعاب جميع الطلبة.",
    indicators: [
      "نسبة الأطفال ذوي الإعاقة الملتحقين بالتعليم الدامج",
      "نسبة المدارس المُهيَّأة وفق معايير الدمج الشامل",
      "نسبة المعلمين المؤهلين في التعليم الدامج",
      "نسبة الطلبة ذوي الإعاقة الحاصلين على خطط تعليمية فردية (IEP)",
      "معدل التحصيل الأكاديمي للطلبة ذوي الإعاقة مقارنة بأقرانهم",
    ],
    targets: [
      { year: "2027", target: "60% من الطلبة في التعليم الدامج و50% من المدارس مُهيَّأة" },
      { year: "2029", target: "80% من الطلبة في التعليم الدامج و85% من المعلمين مدربون" },
      { year: "2031", target: "95% من الطلبة في بيئات دامجة مع تكافؤ كامل في التحصيل" },
    ],
    enablers: [
      "البرنامج الوطني للدمج في الأنظمة التعليمية",
      "تطبيق خطط التعليم الفردية (IEPs)",
      "بناء القدرات التعليمية",
      "الانتقال للتعليم العالي",
    ],
    linkedPillar: "التعليم الدامج",
  },
  {
    id: 3,
    title: "النتيجة الوطنية الثالثة",
    subtitle: "صحة وتأهيل يُعزِّزان القدرات الوظيفية",
    pillarId: 3,
    icon: "🏥",
    color: "#1A7A4A",
    lightColor: "#EEF9F3",
    description:
      "تطوير منظومة صحية وتأهيلية متكاملة تضمن الكشف المبكر عن الإعاقة، وتوفير خدمات التأهيل الشامل التي تُعزِّز القدرات الوظيفية للأشخاص ذوي الإعاقة وتُمكِّنهم من المشاركة الفاعلة في الحياة اليومية والمجتمعية.",
    indicators: [
      "نسبة الأطفال الخاضعين للفحص المبكر عند الولادة",
      "متوسط عمر التشخيص للإعاقات الشائعة (بالأشهر)",
      "نسبة الأشخاص ذوي الإعاقة الحاصلين على خدمات التأهيل اللازمة",
      "عدد مراكز التأهيل المتكاملة المتاحة",
      "نسبة الأشخاص ذوي الإعاقة الحاصلين على دعم الصحة النفسية",
    ],
    targets: [
      { year: "2027", target: "80% تغطية الكشف المبكر، 5 مراكز تأهيل متكاملة" },
      { year: "2029", target: "95% تغطية الكشف المبكر، 10 مراكز تأهيل" },
      { year: "2031", target: "100% تغطية الكشف المبكر، 15 مركز تأهيل متكامل" },
    ],
    enablers: [
      "البرنامج الوطني للكشف المبكر",
      "إنشاء وتطوير مراكز التأهيل المتكاملة",
      "خدمات الصحة النفسية",
    ],
    linkedPillar: "الصحة والتأهيل",
  },
  {
    id: 4,
    title: "النتيجة الوطنية الرابعة",
    subtitle: "مشاركة اقتصادية فعالة ومستدامة",
    pillarId: 4,
    icon: "💼",
    color: "#7A5A1A",
    lightColor: "#FBF6EE",
    description:
      "تحقيق مشاركة اقتصادية حقيقية ومستدامة للأشخاص ذوي الإعاقة في سوق العمل القطري، من خلال تطبيق نظام الحصص الوظيفية، وتوفير برامج التدريب المهني الملائمة، وتحفيز القطاع الخاص على التوظيف الدامج، وتعزيز الشمول المالي.",
    indicators: [
      "نسبة توظيف الأشخاص ذوي الإعاقة في القطاعين العام والخاص",
      "نسبة الجهات الملتزمة بنظام الحصص الوظيفية",
      "عدد الأشخاص ذوي الإعاقة المستفيدين من برامج التدريب المهني",
      "نسبة الأشخاص ذوي الإعاقة المستفيدين من خدمات الشمول المالي",
      "متوسط الدخل للأشخاص ذوي الإعاقة العاملين",
    ],
    targets: [
      { year: "2027", target: "2% نسبة توظيف، 40% التزام الجهات بالحصص" },
      { year: "2029", target: "3.5% نسبة توظيف، 70% التزام الجهات بالحصص" },
      { year: "2031", target: "5% نسبة توظيف، 90% التزام الجهات بالحصص" },
    ],
    enablers: [
      "نظام الحصص الوظيفية",
      "برنامج الحوافز للقطاع الخاص",
      "برامج التدريب المهني",
      "الشمول المالي",
    ],
    linkedPillar: "التوظيف والتمكين الاقتصادي",
  },
  {
    id: 5,
    title: "النتيجة الوطنية الخامسة",
    subtitle: "بيئة وطنية خالية من العوائق",
    pillarId: 5,
    icon: "♿",
    color: "#1A4A7A",
    lightColor: "#EEF2F9",
    description:
      "تحويل البيئة المادية والرقمية في قطر إلى بيئة شاملة ومتاحة للجميع، من خلال تطبيق معايير البناء الشامل في جميع المنشآت الجديدة، وتحديث المنشآت القائمة، وضمان الوصول الشامل لخدمات النقل والفضاء الرقمي.",
    indicators: [
      "نسبة المباني الجديدة الملتزمة بمعايير الوصول الشامل",
      "نسبة المباني القائمة التي تم تحديثها",
      "نسبة وسائل النقل العام المُهيَّأة",
      "نسبة المواقع والخدمات الحكومية الرقمية الملتزمة بمعايير WCAG 2.1",
      "نسبة الفضاءات العامة المُهيَّأة",
    ],
    targets: [
      { year: "2027", target: "80% مباني جديدة ملتزمة، 50% مواقع حكومية رقمية ملتزمة" },
      { year: "2029", target: "95% مباني جديدة ملتزمة، 80% مواقع حكومية رقمية ملتزمة" },
      { year: "2031", target: "100% مباني جديدة ملتزمة، 100% خدمات رقمية متاحة" },
    ],
    enablers: [
      "الكود القطري للبناء الشامل",
      "سياسة النفاذ الرقمي الوطنية",
      "استراتيجية النقل الشامل",
    ],
    linkedPillar: "الوصول الشامل",
  },
  {
    id: 6,
    title: "النتيجة الوطنية السادسة",
    subtitle: "نظام حماية اجتماعية داعم للاستقلالية",
    pillarId: 6,
    icon: "🛡️",
    color: "#5A1A7A",
    lightColor: "#F5EEF9",
    description:
      "بناء منظومة حماية اجتماعية شاملة ومتكاملة تضمن للأشخاص ذوي الإعاقة الحصول على الدعم المالي والخدمات الاجتماعية اللازمة لتحقيق الاستقلالية والكرامة، مع التحول التدريجي نحو نماذج الخدمات المجتمعية البديلة.",
    indicators: [
      "نسبة الأشخاص ذوي الإعاقة المستفيدين من الدعم المالي الملائم",
      "نسبة الأشخاص ذوي الإعاقة الحاصلين على خدمات مجتمعية",
      "متوسط زمن صرف الدعم المالي (بالأيام)",
      "نسبة الأسر المستفيدة من برامج دعم الأسرة",
      "نسبة الأشخاص ذوي الإعاقة في مساكن مستقلة أو مدعومة",
    ],
    targets: [
      { year: "2027", target: "70% تغطية الدعم المالي، 30% خدمات مجتمعية" },
      { year: "2029", target: "85% تغطية الدعم المالي، 55% خدمات مجتمعية" },
      { year: "2031", target: "95% تغطية الدعم المالي، 75% خدمات مجتمعية" },
    ],
    enablers: [
      "برنامج الدعم المالي الموجه",
      "الخدمات المجتمعية البديلة",
      "خدمات الطوارئ والأزمات",
    ],
    linkedPillar: "الحماية الاجتماعية",
  },
  {
    id: 7,
    title: "النتيجة الوطنية السابعة",
    subtitle: "استقلالية واندماج مجتمعي حقيقي",
    pillarId: 7,
    icon: "🤝",
    color: "#1A7A6A",
    lightColor: "#EEF9F7",
    description:
      "تحقيق اندماج مجتمعي حقيقي للأشخاص ذوي الإعاقة من خلال تعزيز مهارات الحياة المستقلة، وتطوير برامج التأهيل الاجتماعي، وتمكينهم من المشاركة الفاعلة في الأنشطة الثقافية والرياضية والمجتمعية.",
    indicators: [
      "نسبة الأشخاص ذوي الإعاقة المشاركين في الأنشطة المجتمعية",
      "نسبة الأشخاص ذوي الإعاقة الذين حققوا مستوى استقلالية أعلى",
      "عدد المستفيدين من برامج التأهيل الاجتماعي سنوياً",
      "نسبة الأسر المستفيدة من الإرشاد الأسري",
      "نسبة الأشخاص ذوي الإعاقة المشاركين في الأنشطة الرياضية والثقافية",
    ],
    targets: [
      { year: "2027", target: "30% مشاركة مجتمعية، 500 مستفيد من التأهيل الاجتماعي" },
      { year: "2029", target: "50% مشاركة مجتمعية، 1200 مستفيد من التأهيل الاجتماعي" },
      { year: "2031", target: "70% مشاركة مجتمعية، 2000 مستفيد من التأهيل الاجتماعي" },
    ],
    enablers: [
      "برنامج التأهيل الاجتماعي المجتمعي",
      "برامج الدمج الثقافي والرياضي",
      "الإرشاد الأسري",
    ],
    linkedPillar: "التأهيل الاجتماعي",
  },
  {
    id: 8,
    title: "النتيجة الوطنية الثامنة",
    subtitle: "حوكمة فعّالة ونظام بيانات وطني متكامل",
    pillarId: 8,
    icon: "📊",
    color: "#4A1A1A",
    lightColor: "#F9EEEE",
    description:
      "بناء منظومة حوكمة وبيانات وطنية متكاملة تعزز التنسيق المؤسسي وتدعم اتخاذ القرار المبني على البيانات، من خلال إنشاء السجل الوطني للإعاقة، وتطوير المنصة الموحدة للخدمات، وتفعيل لوحة المؤشرات الوطنية.",
    indicators: [
      "نسبة اكتمال السجل الوطني للإعاقة",
      "نسبة الخدمات المتاحة عبر المنصة الموحدة",
      "نسبة دقة البيانات في السجل الوطني",
      "نسبة رضا المستخدمين عن المنصة الموحدة",
      "نسبة الجهات المرتبطة بنظام تبادل البيانات",
    ],
    targets: [
      { year: "2027", target: "60% اكتمال السجل الوطني، 30% خدمات عبر المنصة" },
      { year: "2029", target: "85% اكتمال السجل الوطني، 65% خدمات عبر المنصة" },
      { year: "2031", target: "95% اكتمال السجل الوطني، 90% خدمات عبر المنصة" },
    ],
    enablers: [
      "السجل الوطني للإعاقة",
      "المنصة الوطنية الموحدة للخدمات",
      "لوحة المؤشرات الوطنية",
    ],
    linkedPillar: "الحوكمة والبيانات",
  },
];

// ─── Outcome Card ─────────────────────────────────────────────
function OutcomeCard({ outcome }: { outcome: StrategicOutcome }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      layout
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
    >
      {/* Card Header */}
      <div
        className="cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div
          className="p-6 text-white relative overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${outcome.color}, ${outcome.color}CC)` }}
        >
          {/* Decorative arch */}
          <div
            className="absolute -left-6 -top-6 w-24 h-24 rounded-full opacity-15"
            style={{ background: "white" }}
          />
          <div
            className="absolute left-8 bottom-0 w-12 h-12 rounded-full opacity-10"
            style={{ background: "white" }}
          />

          <div className="relative z-10">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{outcome.icon}</span>
                <div>
                  <p className="text-white/70 text-xs font-semibold mb-0.5">{outcome.title}</p>
                  <h3 className="text-lg font-black leading-tight">{outcome.subtitle}</h3>
                </div>
              </div>
              <div
                className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 transition-transform duration-300"
                style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}
              >
                <ChevronDown size={16} className="text-white" />
              </div>
            </div>

            {/* Linked Pillar Badge */}
            <div className="mt-3 inline-flex items-center gap-1.5 bg-white/20 rounded-full px-3 py-1">
              <Layers size={11} />
              <span className="text-xs font-medium">{outcome.linkedPillar}</span>
            </div>
          </div>
        </div>

        {/* Targets Preview */}
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
          <div className="grid grid-cols-3 gap-3">
            {outcome.targets.map((t, i) => (
              <div key={i} className="text-center">
                <div
                  className="text-xs font-black mb-1"
                  style={{ color: outcome.color }}
                >
                  {t.year}
                </div>
                <div className="text-xs text-gray-500 leading-tight line-clamp-2">{t.target}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Expanded Content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-6 space-y-6">
              {/* Description */}
              <div>
                <h4 className="text-sm font-black text-gray-800 mb-2 flex items-center gap-2">
                  <Target size={14} style={{ color: outcome.color }} />
                  الوصف التفصيلي
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">{outcome.description}</p>
              </div>

              {/* Indicators */}
              <div>
                <h4 className="text-sm font-black text-gray-800 mb-3 flex items-center gap-2">
                  <TrendingUp size={14} style={{ color: outcome.color }} />
                  مؤشرات قياس النتيجة
                </h4>
                <div className="space-y-2">
                  {outcome.indicators.map((ind, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <CheckCircle2
                        size={14}
                        className="mt-0.5 flex-shrink-0"
                        style={{ color: outcome.color }}
                      />
                      <span className="text-sm text-gray-700">{ind}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Detailed Targets */}
              <div>
                <h4 className="text-sm font-black text-gray-800 mb-3 flex items-center gap-2">
                  <Award size={14} style={{ color: outcome.color }} />
                  المستهدفات الزمنية التفصيلية
                </h4>
                <div className="space-y-3">
                  {outcome.targets.map((t, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 rounded-xl p-4"
                      style={{ background: outcome.lightColor }}
                    >
                      <div
                        className="w-12 h-7 rounded-full flex items-center justify-center text-white text-xs font-black flex-shrink-0"
                        style={{ background: outcome.color }}
                      >
                        {t.year}
                      </div>
                      <p className="text-sm text-gray-700 font-medium leading-relaxed">{t.target}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Enablers */}
              <div>
                <h4 className="text-sm font-black text-gray-800 mb-3 flex items-center gap-2">
                  <Layers size={14} style={{ color: outcome.color }} />
                  المبادرات المُمكِّنة لتحقيق النتيجة
                </h4>
                <div className="flex flex-wrap gap-2">
                  {outcome.enablers.map((e, i) => (
                    <span
                      key={i}
                      className="text-xs font-semibold px-3 py-1.5 rounded-full"
                      style={{ background: outcome.lightColor, color: outcome.color }}
                    >
                      {e}
                    </span>
                  ))}
                </div>
              </div>

              {/* Link to Pillar */}
              <Link href={`/pillar/${outcome.pillarId}`}>
                <div
                  className="flex items-center justify-between p-4 rounded-xl cursor-pointer hover:opacity-90 transition-opacity"
                  style={{ background: outcome.color }}
                >
                  <div>
                    <p className="text-white/70 text-xs">المحور المرتبط</p>
                    <p className="text-white font-black text-sm">{outcome.linkedPillar}</p>
                  </div>
                  <ArrowRight size={18} className="text-white/80" />
                </div>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Outcomes Overview Chart ──────────────────────────────────
function OutcomesOverview() {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-10">
      <h3 className="text-lg font-black text-gray-900 mb-6 flex items-center gap-2">
        <BarChart2 size={20} className="text-[#8B1A4A]" />
        ربط النتائج الوطنية بالمحاور الاستراتيجية
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {outcomes.map((outcome) => {
          const pillar = pillars.find((p) => p.id === outcome.pillarId);
          return (
            <div
              key={outcome.id}
              className="rounded-xl p-4 text-center"
              style={{ background: outcome.lightColor }}
            >
              <span className="text-2xl block mb-2">{outcome.icon}</span>
              <p
                className="text-xs font-black leading-tight mb-1"
                style={{ color: outcome.color }}
              >
                {outcome.subtitle}
              </p>
              <p className="text-xs text-gray-400">{pillar?.title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────
export default function StrategicOutcomes() {
  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "'Cairo', sans-serif" }}>
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
            <Award size={16} className="text-[#8B1A4A]" />
            <span className="text-sm font-black text-gray-800">النتائج الاستراتيجية الوطنية</span>
          </div>
        </div>
      </div>

      {/* Page Header */}
      <div
        className="py-16 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1B3A5A 0%, #2B5A7A 45%, #8B1A4A 100%)" }}
      >
        {/* Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="archOut" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M30 0 Q45 15 45 30 Q45 45 30 60 Q15 45 15 30 Q15 15 30 0Z" fill="none" stroke="white" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#archOut)"/>
          </svg>
        </div>

        <div className="container relative z-10 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 mb-5">
              <Award size={14} />
              <span className="text-sm font-medium">الاستراتيجية الوطنية 2026–2031</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black mb-4">
              النتائج الوطنية المستهدفة
            </h1>
            <p className="text-white/75 max-w-2xl mx-auto text-base leading-relaxed mb-8">
              ثمانية نتائج وطنية استراتيجية تُمثِّل الأثر الحقيقي المنشود من تنفيذ الاستراتيجية على حياة الأشخاص ذوي الإعاقة في قطر بحلول عام 2031
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8">
              <div>
                <div className="text-3xl font-black text-[#E8C84A]">8</div>
                <div className="text-xs text-white/70">نتائج وطنية</div>
              </div>
              <div>
                <div className="text-3xl font-black text-[#E8C84A]">24</div>
                <div className="text-xs text-white/70">مستهدف قابل للقياس</div>
              </div>
              <div>
                <div className="text-3xl font-black text-[#E8C84A]">3</div>
                <div className="text-xs text-white/70">نقاط قياس زمنية</div>
              </div>
              <div>
                <div className="text-3xl font-black text-[#E8C84A]">40+</div>
                <div className="text-xs text-white/70">مؤشر أداء</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="container py-10">
        {/* Overview */}
        <OutcomesOverview />

        {/* Outcomes Cards */}
        <div className="mb-6">
          <h2 className="text-xl font-black text-gray-900 mb-1 flex items-center gap-2">
            <span className="w-1 h-6 bg-[#8B1A4A] rounded-full inline-block" />
            تفاصيل النتائج الوطنية الثمانية
          </h2>
          <p className="text-sm text-gray-500 mr-5">انقر على أي نتيجة لعرض التفاصيل الكاملة والمؤشرات والمستهدفات</p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {outcomes.map((outcome, i) => (
            <motion.div
              key={outcome.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
            >
              <OutcomeCard outcome={outcome} />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 grid md:grid-cols-2 gap-5">
          <Link href="/action-plan">
            <div
              className="rounded-2xl p-6 cursor-pointer hover:opacity-90 transition-opacity text-white"
              style={{ background: "linear-gradient(135deg, #8B1A4A, #6B1238)" }}
            >
              <BarChart2 size={24} className="mb-3" />
              <h3 className="font-black text-lg mb-2">خطة العمل التنفيذية</h3>
              <p className="text-white/75 text-sm leading-relaxed">
                استعرض المشاريع التنفيذية المفصلة التي تُحقق هذه النتائج الوطنية
              </p>
            </div>
          </Link>
          <Link href="/#pillars">
            <div
              className="rounded-2xl p-6 cursor-pointer hover:opacity-90 transition-opacity text-white"
              style={{ background: "linear-gradient(135deg, #1B3A5A, #2B5A7A)" }}
            >
              <Layers size={24} className="mb-3" />
              <h3 className="font-black text-lg mb-2">المحاور الاستراتيجية</h3>
              <p className="text-white/75 text-sm leading-relaxed">
                تعرف على المحاور الثمانية التي تُشكِّل الإطار التنفيذي للاستراتيجية
              </p>
            </div>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="container text-center">
          <p className="text-gray-400 text-sm">
            الاستراتيجية الوطنية لحقوق الأشخاص ذوي الإعاقة 2026–2031 | دولة قطر
          </p>
          <p className="text-gray-600 text-xs mt-2">"تمكين يحقق الاستقلالية"</p>
        </div>
      </footer>
    </div>
  );
}
