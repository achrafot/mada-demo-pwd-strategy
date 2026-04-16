// DESIGN: صفحة خطة العمل التفصيلية
// Colors: Maroon #8B1A4A primary, pillar colors per section
// Layout: RTL, tabbed interface, detailed project cards

import { useState } from "react";
import { Link } from "wouter";
import { pillars } from "@/lib/strategyData";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Users,
  Target,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Building2,
  BarChart2,
} from "lucide-react";

// ─── Action Plan Data ─────────────────────────────────────────
interface Project {
  id: string;
  name: string;
  pillarId: number;
  responsible: string;
  timeline: string;
  phase: string;
  activities: string[];
  kpis: { indicator: string; target2027: string; target2029: string; target2031: string }[];
  risks: { risk: string; mitigation: string }[];
  resources: string;
}

const projects: Project[] = [
  // Pillar 1
  {
    id: "P1-1",
    name: "برنامج مواءمة التشريعات القطاعية",
    pillarId: 1,
    responsible: "وزارة التنمية الاجتماعية والأسرة + وزارة العدل",
    timeline: "2026–2027",
    phase: "التأسيس",
    activities: [
      "مراجعة شاملة لجميع التشريعات القطاعية الحالية",
      "تحديد الفجوات بين التشريعات والقانون رقم 22",
      "إعداد مقترحات التعديل التشريعي",
      "التشاور مع الجهات المعنية والمجتمع المدني",
      "رفع مقترحات التعديل للجهات التشريعية",
    ],
    kpis: [
      { indicator: "نسبة التشريعات المراجعة", target2027: "50%", target2029: "80%", target2031: "100%" },
      { indicator: "نسبة التشريعات المعدلة", target2027: "30%", target2029: "70%", target2031: "100%" },
    ],
    risks: [
      { risk: "تأخر الإجراءات التشريعية", mitigation: "إنشاء فريق عمل مشترك وجدول زمني محدد" },
      { risk: "تعارض مصالح بعض القطاعات", mitigation: "آلية تشاور منظمة مع جميع الأطراف" },
    ],
    resources: "فريق قانوني متخصص (10 أفراد)، ميزانية مراجعة تشريعية",
  },
  {
    id: "P1-2",
    name: "النظام الوطني للرقابة والامتثال",
    pillarId: 1,
    responsible: "وزارة التنمية الاجتماعية والأسرة",
    timeline: "2026–2028",
    phase: "التأسيس",
    activities: [
      "تأسيس الوحدة الرقابية المتخصصة",
      "وضع إطار العقوبات المتدرجة",
      "تطوير نظام الشكاوى والبلاغات",
      "تدريب المفتشين والرقباء",
      "إطلاق حملات توعية بمعايير الامتثال",
    ],
    kpis: [
      { indicator: "نسبة الجهات الملتزمة", target2027: "40%", target2029: "70%", target2031: "95%" },
      { indicator: "معدل معالجة الشكاوى", target2027: "60 يوم", target2029: "30 يوم", target2031: "15 يوم" },
    ],
    risks: [
      { risk: "محدودية الكوادر الرقابية", mitigation: "برنامج تدريب مكثف وتوظيف مختصين" },
      { risk: "ضعف التعاون المؤسسي", mitigation: "بروتوكولات تعاون رسمية بين الجهات" },
    ],
    resources: "وحدة رقابية (25 موظف)، نظام معلوماتي للشكاوى",
  },
  {
    id: "P1-3",
    name: "برنامج تعزيز الوصول إلى العدالة",
    pillarId: 1,
    responsible: "وزارة العدل + وزارة التنمية الاجتماعية والأسرة",
    timeline: "2027–2029",
    phase: "التوسع",
    activities: [
      "تبسيط إجراءات التقاضي للأشخاص ذوي الإعاقة",
      "توفير مترجمين ومساعدين قانونيين",
      "تهيئة مرافق المحاكم وفق معايير الوصول",
      "تدريب الكوادر القضائية على قضايا الإعاقة",
      "إنشاء وحدات قانونية متخصصة",
    ],
    kpis: [
      { indicator: "نسبة المحاكم المُهيَّأة", target2027: "30%", target2029: "70%", target2031: "100%" },
      { indicator: "نسبة القضاة المدربين", target2027: "40%", target2029: "80%", target2031: "100%" },
    ],
    risks: [
      { risk: "تعقيد الإجراءات القضائية", mitigation: "لجنة مشتركة لتبسيط الإجراءات" },
    ],
    resources: "برامج تدريب قضائي، تجهيزات مرافق المحاكم",
  },
  {
    id: "P1-4",
    name: "دليل الامتثال الوطني",
    pillarId: 1,
    responsible: "وزارة التنمية الاجتماعية والأسرة",
    timeline: "2026–2027",
    phase: "التأسيس",
    activities: [
      "إعداد الدليل الشامل لمتطلبات الامتثال",
      "تطوير أدوات التقييم الذاتي للجهات",
      "إطلاق منصة إلكترونية للدليل",
      "تنظيم ورش توعية للجهات المعنية",
    ],
    kpis: [
      { indicator: "نسبة الجهات التي اعتمدت الدليل", target2027: "60%", target2029: "85%", target2031: "100%" },
    ],
    risks: [
      { risk: "تفاوت تطبيق الدليل بين الجهات", mitigation: "آلية متابعة دورية وتقارير امتثال" },
    ],
    resources: "فريق إعداد الدليل، منصة إلكترونية",
  },
  // Pillar 2
  {
    id: "P2-1",
    name: "البرنامج الوطني للدمج في الأنظمة التعليمية",
    pillarId: 2,
    responsible: "وزارة التعليم والتعليم العالي",
    timeline: "2026–2031",
    phase: "التأسيس والتوسع",
    activities: [
      "تقييم الوضع الراهن للتعليم الدامج في جميع المدارس",
      "وضع معايير الدمج الشامل وتهيئة البيئات التعليمية",
      "تطوير بروتوكولات القبول والتسجيل الدامج",
      "توفير التكنولوجيا المساعدة في الفصول الدراسية",
      "إنشاء مراكز دعم الطلبة في كل مدرسة",
    ],
    kpis: [
      { indicator: "نسبة الطلبة في التعليم الدامج", target2027: "60%", target2029: "80%", target2031: "95%" },
      { indicator: "نسبة المدارس المُهيَّأة", target2027: "50%", target2029: "80%", target2031: "100%" },
    ],
    risks: [
      { risk: "مقاومة بعض المدارس للدمج", mitigation: "برامج توعية وتحفيز للمدارس الرائدة" },
      { risk: "نقص الكوادر المتخصصة", mitigation: "برامج تدريب مكثفة وتوظيف متخصصين" },
    ],
    resources: "فرق تقييم ميداني، ميزانية تجهيز المدارس، تكنولوجيا مساعدة",
  },
  {
    id: "P2-2",
    name: "تطبيق خطط التعليم الفردية (IEPs)",
    pillarId: 2,
    responsible: "وزارة التعليم والتعليم العالي + المدارس",
    timeline: "2026–2029",
    phase: "التأسيس",
    activities: [
      "تطوير نموذج IEP وطني موحد",
      "تدريب المعلمين على إعداد وتطبيق IEPs",
      "إنشاء نظام إلكتروني لإدارة IEPs",
      "تفعيل مشاركة الأسر في وضع الخطط",
      "مراجعة دورية للخطط وتحديثها",
    ],
    kpis: [
      { indicator: "نسبة الطلبة لديهم IEP", target2027: "70%", target2029: "90%", target2031: "100%" },
      { indicator: "معدل تحقيق أهداف IEP", target2027: "60%", target2029: "75%", target2031: "85%" },
    ],
    risks: [
      { risk: "ضعف مشاركة الأسر", mitigation: "برامج توعية وتيسير التواصل مع الأسر" },
    ],
    resources: "نظام إلكتروني لإدارة IEPs، برامج تدريب المعلمين",
  },
  {
    id: "P2-3",
    name: "بناء القدرات التعليمية",
    pillarId: 2,
    responsible: "وزارة التعليم + مؤسسات التدريب",
    timeline: "2026–2031",
    phase: "مستمر",
    activities: [
      "تصميم برنامج تدريب إلزامي شامل للمعلمين",
      "تنفيذ دورات تدريبية في استراتيجيات التعليم الدامج",
      "تطوير برامج الدرجات العلمية في التعليم الخاص",
      "إنشاء شبكة من المعلمين المتخصصين كمرشدين",
      "تقييم أثر التدريب على أداء الطلبة",
    ],
    kpis: [
      { indicator: "نسبة المعلمين المدربين", target2027: "60%", target2029: "85%", target2031: "100%" },
    ],
    risks: [
      { risk: "دوران الكوادر التعليمية", mitigation: "برامج احتفاظ وتحفيز للمعلمين المتخصصين" },
    ],
    resources: "مراكز تدريب، مدربون متخصصون، منصات تعلم إلكتروني",
  },
  // Pillar 3
  {
    id: "P3-1",
    name: "البرنامج الوطني للكشف المبكر",
    pillarId: 3,
    responsible: "وزارة الصحة العامة + مؤسسة حمد الطبية",
    timeline: "2026–2028",
    phase: "التأسيس",
    activities: [
      "تطوير بروتوكول فحص شامل لحديثي الولادة",
      "تدريب الكوادر الصحية على أدوات الكشف المبكر",
      "إنشاء نظام إحالة سريع للتدخل المبكر",
      "تطوير برامج التدخل المبكر للأطفال (0-6 سنوات)",
      "تفعيل نظام متابعة الحالات",
    ],
    kpis: [
      { indicator: "نسبة الأطفال المفحوصين", target2027: "80%", target2029: "95%", target2031: "100%" },
      { indicator: "متوسط عمر التشخيص (أشهر)", target2027: "18", target2029: "12", target2031: "9" },
    ],
    risks: [
      { risk: "محدودية الوعي لدى الأسر", mitigation: "حملات توعية مكثفة في المستشفيات والمراكز الصحية" },
    ],
    resources: "أجهزة فحص طبية، كوادر متخصصة في التدخل المبكر",
  },
  {
    id: "P3-2",
    name: "إنشاء وتطوير مراكز التأهيل المتكاملة",
    pillarId: 3,
    responsible: "وزارة الصحة العامة + وزارة التنمية الاجتماعية",
    timeline: "2026–2030",
    phase: "التأسيس والتوسع",
    activities: [
      "تقييم الطاقة الاستيعابية الحالية لمراكز التأهيل",
      "إنشاء مراكز تأهيل متكاملة جديدة في المناطق المختلفة",
      "تطوير معايير جودة خدمات التأهيل",
      "توفير تخصصات متعددة (طبيعي، وظيفي، نطق)",
      "تطوير برامج التأهيل المنزلي والمجتمعي",
    ],
    kpis: [
      { indicator: "عدد مراكز التأهيل المتكاملة", target2027: "5", target2029: "10", target2031: "15" },
      { indicator: "نسبة تغطية خدمات التأهيل", target2027: "50%", target2029: "75%", target2031: "90%" },
    ],
    risks: [
      { risk: "ارتفاع تكاليف الإنشاء", mitigation: "شراكات مع القطاع الخاص وتمويل حكومي مخصص" },
    ],
    resources: "ميزانية إنشاء المراكز، كوادر طبية متخصصة متعددة التخصصات",
  },
  // Pillar 4
  {
    id: "P4-1",
    name: "نظام الحصص الوظيفية",
    pillarId: 4,
    responsible: "وزارة العمل + وزارة التنمية الاجتماعية",
    timeline: "2026–2028",
    phase: "التأسيس",
    activities: [
      "تحديد نسب التوظيف الإلزامية لكل قطاع",
      "تطوير نظام تتبع الامتثال بالحصص",
      "وضع آلية الإعفاءات والبدائل",
      "إنشاء قاعدة بيانات الباحثين عن عمل من ذوي الإعاقة",
      "تفعيل آلية الإنفاذ والعقوبات",
    ],
    kpis: [
      { indicator: "نسبة التزام الجهات بالحصص", target2027: "40%", target2029: "70%", target2031: "90%" },
      { indicator: "نسبة التوظيف من ذوي الإعاقة", target2027: "2%", target2029: "3.5%", target2031: "5%" },
    ],
    risks: [
      { risk: "مقاومة أصحاب العمل", mitigation: "برامج توعية وحوافز مالية للملتزمين" },
      { risk: "عدم ملاءمة المهارات لمتطلبات السوق", mitigation: "ربط الحصص ببرامج التدريب المهني" },
    ],
    resources: "نظام معلوماتي للتتبع، فريق تفتيش عمالي متخصص",
  },
  {
    id: "P4-2",
    name: "برنامج الحوافز للقطاع الخاص",
    pillarId: 4,
    responsible: "وزارة التجارة والصناعة + وزارة العمل",
    timeline: "2026–2029",
    phase: "التأسيس",
    activities: [
      "تصميم حزمة الحوافز المالية والضريبية",
      "وضع معايير الشركات المؤهلة للحوافز",
      "إنشاء جائزة وطنية للتوظيف الدامج",
      "تطوير برنامج الشراكة مع الشركات الرائدة",
      "إصدار تقارير سنوية عن أفضل الممارسات",
    ],
    kpis: [
      { indicator: "عدد الشركات المستفيدة من الحوافز", target2027: "50", target2029: "150", target2031: "300" },
      { indicator: "نسبة الشركات ذات سياسات دمج", target2027: "20%", target2029: "45%", target2031: "70%" },
    ],
    risks: [
      { risk: "محدودية الميزانية المخصصة للحوافز", mitigation: "دراسة الجدوى الاقتصادية وتدرج الحوافز" },
    ],
    resources: "صندوق حوافز التوظيف الدامج، فريق تقييم الطلبات",
  },
  // Pillar 5
  {
    id: "P5-1",
    name: "الكود القطري للبناء الشامل",
    pillarId: 5,
    responsible: "وزارة البلدية + وزارة التنمية الاجتماعية",
    timeline: "2026–2027",
    phase: "التأسيس",
    activities: [
      "مراجعة وتحديث كود البناء الحالي",
      "إدراج معايير الوصول الشامل بشكل إلزامي",
      "تدريب المهندسين والمعماريين على المعايير الجديدة",
      "وضع آلية التدقيق والاعتماد للمباني الجديدة",
      "وضع خطة لتحديث المباني القائمة",
    ],
    kpis: [
      { indicator: "نسبة المباني الجديدة الملتزمة", target2027: "80%", target2029: "95%", target2031: "100%" },
      { indicator: "نسبة المباني القائمة المحدثة", target2027: "20%", target2029: "50%", target2031: "80%" },
    ],
    risks: [
      { risk: "ارتفاع تكاليف التحديث", mitigation: "برنامج دعم مالي للمباني القائمة" },
    ],
    resources: "فريق مراجعة الكود، مدربون معتمدون، نظام اعتماد المباني",
  },
  {
    id: "P5-2",
    name: "سياسة النفاذ الرقمي الوطنية",
    pillarId: 5,
    responsible: "وزارة الاتصالات + جميع الجهات الحكومية",
    timeline: "2026–2029",
    phase: "التأسيس والتوسع",
    activities: [
      "اعتماد معايير WCAG 2.1 إلزامية للمواقع الحكومية",
      "تدقيق شامل لجميع المواقع والتطبيقات الحكومية",
      "وضع خطة تحديث للمواقع غير الملتزمة",
      "تطوير أدوات التدقيق الآلي للنفاذ الرقمي",
      "توفير التكنولوجيا المساعدة الرقمية",
    ],
    kpis: [
      { indicator: "نسبة المواقع الحكومية الملتزمة بـ WCAG", target2027: "50%", target2029: "80%", target2031: "100%" },
      { indicator: "نسبة الخدمات الرقمية المتاحة", target2027: "60%", target2029: "85%", target2031: "100%" },
    ],
    risks: [
      { risk: "تعقيد تحديث الأنظمة القائمة", mitigation: "خطة تدريجية مع أولويات واضحة" },
    ],
    resources: "فريق تقني متخصص، أدوات تدقيق رقمي، ميزانية تحديث المواقع",
  },
  // Pillar 6
  {
    id: "P6-1",
    name: "برنامج الدعم المالي الموجه",
    pillarId: 6,
    responsible: "وزارة التنمية الاجتماعية والأسرة",
    timeline: "2026–2028",
    phase: "التأسيس",
    activities: [
      "تطوير نظام تقييم شامل للاحتياجات",
      "تصميم حزم دعم مالي مرنة ومتدرجة",
      "إنشاء نظام إلكتروني لإدارة الدعم",
      "وضع آلية مراجعة دورية للاستحقاقات",
      "تفعيل نظام الشكاوى والتظلمات",
    ],
    kpis: [
      { indicator: "نسبة المستفيدين من الدعم المالي", target2027: "70%", target2029: "85%", target2031: "95%" },
      { indicator: "متوسط زمن صرف الدعم (أيام)", target2027: "30", target2029: "15", target2031: "7" },
    ],
    risks: [
      { risk: "ضغط الطلب على الميزانية", mitigation: "تحديد معايير أهلية واضحة وتدرج الدعم" },
    ],
    resources: "نظام إدارة الدعم الاجتماعي، فريق تقييم الاحتياجات",
  },
  {
    id: "P6-2",
    name: "الخدمات المجتمعية البديلة",
    pillarId: 6,
    responsible: "وزارة التنمية الاجتماعية والأسرة + البلديات",
    timeline: "2027–2031",
    phase: "التوسع",
    activities: [
      "تطوير نموذج الخدمات المنزلية المتكاملة",
      "تدريب وتوظيف مساعدين شخصيين",
      "إنشاء مراكز دعم مجتمعي في الأحياء",
      "تطوير برامج الإسكان المدعوم",
      "تفعيل شبكة الدعم المجتمعي",
    ],
    kpis: [
      { indicator: "نسبة المستفيدين من الخدمات المجتمعية", target2027: "30%", target2029: "55%", target2031: "75%" },
    ],
    risks: [
      { risk: "نقص الكوادر المدربة للخدمات المنزلية", mitigation: "برامج تدريب وتوظيف مكثفة" },
    ],
    resources: "مراكز دعم مجتمعي، مساعدون شخصيون مدربون",
  },
  // Pillar 7
  {
    id: "P7-1",
    name: "برنامج التأهيل الاجتماعي المجتمعي",
    pillarId: 7,
    responsible: "وزارة التنمية الاجتماعية والأسرة",
    timeline: "2026–2031",
    phase: "مستمر",
    activities: [
      "تطوير برامج مهارات الحياة اليومية",
      "تقديم تدريب على التنقل المستقل",
      "برامج التواصل الاجتماعي والمهارات الشخصية",
      "تطوير مراكز التأهيل المجتمعي",
      "تقييم مستوى الاستقلالية دورياً",
    ],
    kpis: [
      { indicator: "عدد المستفيدين سنوياً", target2027: "500", target2029: "1200", target2031: "2000" },
      { indicator: "نسبة تحقيق مستوى استقلالية أعلى", target2027: "50%", target2029: "65%", target2031: "80%" },
    ],
    risks: [
      { risk: "تفاوت الاحتياجات الفردية", mitigation: "تخصيص البرامج وفق التقييم الفردي" },
    ],
    resources: "مراكز تأهيل مجتمعي، أخصائيون اجتماعيون، برامج تأهيل متخصصة",
  },
  {
    id: "P7-2",
    name: "برامج الدمج المجتمعي الثقافي والرياضي",
    pillarId: 7,
    responsible: "وزارة الثقافة + وزارة الرياضة + وزارة التنمية الاجتماعية",
    timeline: "2026–2031",
    phase: "مستمر",
    activities: [
      "إدماج الأشخاص ذوي الإعاقة في الفعاليات الثقافية",
      "تطوير برامج رياضية دامجة وبطولات متخصصة",
      "دعم مشاركة ذوي الإعاقة في الأنشطة التطوعية",
      "إنشاء نوادٍ اجتماعية دامجة",
      "تنظيم فعاليات توعوية مجتمعية",
    ],
    kpis: [
      { indicator: "نسبة المشاركة في الأنشطة المجتمعية", target2027: "30%", target2029: "50%", target2031: "70%" },
    ],
    risks: [
      { risk: "محدودية الوعي المجتمعي بالدمج", mitigation: "حملات توعية مستمرة وقصص نجاح" },
    ],
    resources: "ميزانية الفعاليات، شراكات مع المنظمات الرياضية والثقافية",
  },
  // Pillar 8
  {
    id: "P8-1",
    name: "السجل الوطني للإعاقة",
    pillarId: 8,
    responsible: "وزارة التنمية الاجتماعية والأسرة + وزارة الاتصالات",
    timeline: "2026–2028",
    phase: "التأسيس",
    activities: [
      "تصميم هيكل قاعدة البيانات الوطنية",
      "تطوير نظام التسجيل والتصنيف الموحد",
      "ربط السجل بجميع الجهات الحكومية المعنية",
      "وضع سياسات حماية البيانات والخصوصية",
      "تطوير واجهات برمجية للتكامل مع الأنظمة الأخرى",
    ],
    kpis: [
      { indicator: "نسبة اكتمال السجل الوطني", target2027: "60%", target2029: "85%", target2031: "95%" },
      { indicator: "نسبة دقة البيانات", target2027: "85%", target2029: "92%", target2031: "98%" },
    ],
    risks: [
      { risk: "مخاوف الخصوصية وحماية البيانات", mitigation: "تطبيق أعلى معايير أمن البيانات والتشريعات المحلية" },
      { risk: "صعوبة التسجيل لبعض الفئات", mitigation: "فرق ميدانية للتسجيل وتيسير الإجراءات" },
    ],
    resources: "بنية تحتية تقنية متقدمة، فريق تطوير متخصص، خبراء أمن بيانات",
  },
  {
    id: "P8-2",
    name: "المنصة الوطنية الموحدة للخدمات",
    pillarId: 8,
    responsible: "وزارة الاتصالات + جميع الجهات الحكومية",
    timeline: "2027–2030",
    phase: "التوسع",
    activities: [
      "تصميم المنصة الرقمية الموحدة",
      "تطوير واجهة مستخدم سهلة وميسرة",
      "ربط جميع خدمات الإعاقة في منصة واحدة",
      "تطوير تطبيق جوال للمنصة",
      "تدريب المستخدمين والجهات على المنصة",
    ],
    kpis: [
      { indicator: "نسبة الخدمات المتاحة عبر المنصة", target2027: "30%", target2029: "65%", target2031: "90%" },
      { indicator: "نسبة رضا المستخدمين عن المنصة", target2027: "70%", target2029: "80%", target2031: "90%" },
    ],
    risks: [
      { risk: "تعقيد تكامل الأنظمة المختلفة", mitigation: "خطة تكامل تدريجية مع اختبار شامل" },
    ],
    resources: "فريق تطوير برمجي، بنية تحتية سحابية، ميزانية تطوير المنصة",
  },
];

// ─── Project Card ─────────────────────────────────────────────
function ProjectCard({ project }: { project: Project }) {
  const [expanded, setExpanded] = useState(false);
  const pillar = pillars.find((p) => p.id === project.pillarId)!;

  return (
    <motion.div
      layout
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
    >
      {/* Card Header */}
      <div
        className="p-5 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
        style={{ borderRight: `4px solid ${pillar.color}` }}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span
                className="text-xs font-bold px-2 py-0.5 rounded-full text-white"
                style={{ background: pillar.color }}
              >
                {project.id}
              </span>
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <Clock size={10} />
                {project.timeline}
              </span>
              <span
                className="text-xs px-2 py-0.5 rounded-full font-medium"
                style={{ background: pillar.lightColor, color: pillar.color }}
              >
                {project.phase}
              </span>
            </div>
            <h3 className="font-black text-gray-900 text-sm leading-tight">{project.name}</h3>
            <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
              <Building2 size={12} />
              <span>{project.responsible}</span>
            </div>
          </div>
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-200"
            style={{
              background: pillar.lightColor,
              transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 4L6 8L10 4" stroke={pillar.color} strokeWidth="2" strokeLinecap="round"/>
            </svg>
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
            <div className="px-5 pb-5 space-y-5 border-t border-gray-100 pt-4">
              {/* Activities */}
              <div>
                <h4 className="text-xs font-black text-gray-700 mb-3 flex items-center gap-1.5">
                  <CheckCircle2 size={13} style={{ color: pillar.color }} />
                  الأنشطة الرئيسية
                </h4>
                <ul className="space-y-2">
                  {project.activities.map((act, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-gray-600">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                        style={{ background: pillar.color }}
                      />
                      {act}
                    </li>
                  ))}
                </ul>
              </div>

              {/* KPIs Table */}
              <div>
                <h4 className="text-xs font-black text-gray-700 mb-3 flex items-center gap-1.5">
                  <TrendingUp size={13} style={{ color: pillar.color }} />
                  مؤشرات الأداء والمستهدفات
                </h4>
                <div className="overflow-x-auto rounded-xl border border-gray-100">
                  <table className="w-full text-xs">
                    <thead>
                      <tr style={{ background: pillar.lightColor }}>
                        <th className="text-right p-2.5 font-bold text-gray-700">المؤشر</th>
                        <th className="text-center p-2.5 font-bold" style={{ color: pillar.color }}>2027</th>
                        <th className="text-center p-2.5 font-bold" style={{ color: pillar.color }}>2029</th>
                        <th className="text-center p-2.5 font-bold" style={{ color: pillar.color }}>2031</th>
                      </tr>
                    </thead>
                    <tbody>
                      {project.kpis.map((kpi, i) => (
                        <tr key={i} className="border-t border-gray-100">
                          <td className="p-2.5 text-gray-700">{kpi.indicator}</td>
                          <td className="p-2.5 text-center font-bold text-gray-800">{kpi.target2027}</td>
                          <td className="p-2.5 text-center font-bold text-gray-800">{kpi.target2029}</td>
                          <td className="p-2.5 text-center font-bold text-gray-800">{kpi.target2031}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Risks */}
              <div>
                <h4 className="text-xs font-black text-gray-700 mb-3 flex items-center gap-1.5">
                  <AlertTriangle size={13} className="text-amber-500" />
                  المخاطر وخطط التخفيف
                </h4>
                <div className="space-y-2">
                  {project.risks.map((r, i) => (
                    <div key={i} className="bg-amber-50 rounded-lg p-3 border border-amber-100">
                      <p className="text-xs font-bold text-amber-800 mb-1">⚠ {r.risk}</p>
                      <p className="text-xs text-amber-700">✓ {r.mitigation}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Resources */}
              <div className="flex items-start gap-2 bg-gray-50 rounded-lg p-3">
                <Users size={13} className="text-gray-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-bold text-gray-600 mb-0.5">الموارد المطلوبة</p>
                  <p className="text-xs text-gray-600">{project.resources}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Main Action Plan Page ────────────────────────────────────
export default function ActionPlan() {
  const [activePillar, setActivePillar] = useState<number | null>(null);

  const filteredProjects = activePillar
    ? projects.filter((p) => p.pillarId === activePillar)
    : projects;

  const totalProjects = projects.length;

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
            <BarChart2 size={16} className="text-[#8B1A4A]" />
            <span className="text-sm font-black text-gray-800">خطة العمل التنفيذية 2026–2031</span>
          </div>
        </div>
      </div>

      {/* Page Header */}
      <div
        className="py-14"
        style={{ background: "linear-gradient(135deg, #1B3A5A 0%, #2B5A7A 50%, #8B1A4A 100%)" }}
      >
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white"
          >
            <h1 className="text-3xl md:text-4xl font-black mb-3">
              خطة العمل التنفيذية المفصلة
            </h1>
            <p className="text-white/70 text-base mb-6">
              الاستراتيجية الوطنية لحقوق الأشخاص ذوي الإعاقة 2026–2031
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <div className="text-center">
                <div className="text-3xl font-black text-[#E8C84A]">{totalProjects}</div>
                <div className="text-xs text-white/70">مشروع تنفيذي</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-[#E8C84A]">8</div>
                <div className="text-xs text-white/70">محاور استراتيجية</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-[#E8C84A]">3</div>
                <div className="text-xs text-white/70">مراحل تنفيذية</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white border-b border-gray-100 sticky top-14 z-30">
        <div className="container">
          <div className="flex items-center gap-2 overflow-x-auto py-3 scrollbar-hide">
            <button
              onClick={() => setActivePillar(null)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-all ${
                activePillar === null
                  ? "bg-[#8B1A4A] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              الكل ({totalProjects})
            </button>
            {pillars.map((pillar) => {
              const count = projects.filter((p) => p.pillarId === pillar.id).length;
              return (
                <button
                  key={pillar.id}
                  onClick={() => setActivePillar(pillar.id)}
                  className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all`}
                  style={
                    activePillar === pillar.id
                      ? { background: pillar.color, color: "white" }
                      : { background: pillar.lightColor, color: pillar.color }
                  }
                >
                  <span>{pillar.icon}</span>
                  <span>{pillar.subtitle}</span>
                  <span className="opacity-70">({count})</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Projects List */}
      <div className="container py-8">
        {/* Active Pillar Info */}
        {activePillar && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 rounded-2xl p-6 text-white"
            style={{
              background: `linear-gradient(135deg, ${pillars.find((p) => p.id === activePillar)!.color}, ${pillars.find((p) => p.id === activePillar)!.color}BB)`,
            }}
          >
            <div className="flex items-start gap-4">
              <span className="text-3xl">{pillars.find((p) => p.id === activePillar)!.icon}</span>
              <div>
                <h2 className="font-black text-lg mb-1">
                  {pillars.find((p) => p.id === activePillar)!.subtitle}
                </h2>
                <p className="text-white/80 text-sm leading-relaxed">
                  {pillars.find((p) => p.id === activePillar)!.goal}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Projects */}
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-500 font-medium">
              عرض {filteredProjects.length} من {totalProjects} مشروع
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <Target size={12} />
              <span>انقر على المشروع لعرض التفاصيل</span>
            </div>
          </div>

          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ delay: i * 0.04 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
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
