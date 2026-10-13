import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Award, Brain, Gamepad2, LineChart, Dumbbell, Heart, ArrowRight, ArrowDown,
  Trophy, TrendingDown, Target, BarChart3, Lightbulb, Wrench, Users,
  DollarSign, Activity, TrendingUp, ArrowUpRight, ArrowDownRight, Zap, ChevronRight, ExternalLink,
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart as ReLineChart, Line, Legend, ScatterChart, Scatter, ZAxis,
  AreaChart, Area, ReferenceLine,
} from "recharts";
import sportsPresentation from "@/assets/sports-presentation.jpeg";
import youthInitiative from "@/assets/youth-initiative.jpeg";
import faceMeanPhotos from "@/assets/face-mean-photos.png";
// Fatigue scatter data (Game1 vs Game3 points, ~200 points, weak correlation R≈0.05)
const fatigueScatterData = (() => {
  const seed = (i: number) => Math.abs(Math.sin(i * 127.1 + 311.7) * 43758.5453) % 1;
  return Array.from({ length: 200 }, (_, i) => {
    const game1 = 5 + seed(i * 3) * 25;
    const game3 = 5 + seed(i * 7 + 13) * 25;
    return { game1: +game1.toFixed(1), game3: +game3.toFixed(1) };
  });
})();
const fatigueRegressionLine = [
  { game1: 5, game3: 14.5 },
  { game1: 30, game3: 15.8 },
];
const fatigueYEqualsX = [
  { game1: 5, game3: 5 },
  { game1: 30, game3: 30 },
];
import BudgetChart from "@/components/analytics/BudgetChart";
import LogisticRegressionChart from "@/components/analytics/LogisticRegressionChart";
import DropoutCharts from "@/components/analytics/DropoutCharts";
import BudgetPieChart from "@/components/analytics/BudgetPieChart";
import RetentionGauge from "@/components/analytics/RetentionGauge";
import { Button } from "@/components/ui/button";

const CHART_COLORS = {
  gold: "hsl(38, 80%, 42%)",
  blue: "hsl(205, 38%, 36%)",
  emerald: "hsl(120, 28%, 32%)",
  rose: "hsl(6, 60%, 46%)",
  purple: "hsl(24, 45%, 36%)",
  amber: "hsl(30, 75%, 50%)",
  slate: "hsl(28, 18%, 48%)",
};

const tooltipStyle = {
  contentStyle: {
    borderRadius: 14,
    border: "none",
    fontSize: 12,
    boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
    padding: "8px 14px",
    background: "hsl(22, 50%, 18%)",
    color: "hsl(42, 55%, 93%)",
  },
  itemStyle: {
    color: "hsl(42, 55%, 93%)",
  },
  labelStyle: {
    color: "hsl(42, 55%, 93%)",
  },
};

// ── Memory Game Data (from Excel - 30 participants) ──
const memoryAllParticipants = [
  { user: 1, none: 48.36, loud: 46.76, focus: 50.18 },
  { user: 2, none: 49.00, loud: 48.14, focus: 68.02 },
  { user: 3, none: 41.29, loud: 44.90, focus: 40.50 },
  { user: 4, none: 64.47, loud: 51.48, focus: 61.05 },
  { user: 5, none: 50.02, loud: 35.64, focus: 49.15 },
  { user: 6, none: 41.42, loud: 47.99, focus: 34.76 },
  { user: 7, none: 57.75, loud: 64.94, focus: 61.02 },
  { user: 8, none: 34.51, loud: 52.03, focus: 46.49 },
  { user: 9, none: 66.13, loud: 63.62, focus: 54.19 },
  { user: 10, none: 38.07, loud: 43.04, focus: 36.98 },
  { user: 11, none: 35.96, loud: 44.60, focus: 43.34 },
  { user: 12, none: 36.30, loud: 65.40, focus: 148.77 },
  { user: 13, none: 50.27, loud: 37.29, focus: 66.97 },
  { user: 14, none: 71.10, loud: 78.59, focus: 77.00 },
  { user: 15, none: 52.79, loud: 71.42, focus: 59.98 },
  { user: 16, none: 45.95, loud: 50.44, focus: 47.56 },
  { user: 17, none: 40.66, loud: 43.10, focus: 48.36 },
  { user: 18, none: 46.85, loud: 60.22, focus: 55.39 },
  { user: 19, none: 71.26, loud: 52.60, focus: 56.82 },
  { user: 20, none: 59.20, loud: 70.52, focus: 123.54 },
  { user: 21, none: 41.37, loud: 51.03, focus: 41.36 },
  { user: 22, none: 60.26, loud: 62.10, focus: 79.69 },
  { user: 23, none: 43.13, loud: 44.39, focus: 44.90 },
  { user: 24, none: 92.01, loud: 49.65, focus: 58.20 },
  { user: 25, none: 61.55, loud: 72.58, focus: 65.37 },
  { user: 26, none: 43.08, loud: 44.41, focus: 55.59 },
  { user: 27, none: 47.05, loud: 66.75, focus: 51.62 },
  { user: 28, none: 40.97, loud: 53.58, focus: 44.67 },
  { user: 29, none: 49.68, loud: 31.97, focus: 43.19 },
  { user: 30, none: 38.22, loud: 42.91, focus: 39.88 },
];

// Order effect data (average completion time per round across all conditions)
const orderEffectData = [
  { round: "Round 1", avgTime: 54.2 },
  { round: "Round 2", avgTime: 52.8 },
  { round: "Round 3", avgTime: 53.4 },
];

// Helper: compute stats
const computeMemoryStats = (data: typeof memoryAllParticipants) => {
  const avg = (arr: number[]) => arr.reduce((a, b) => a + b, 0) / arr.length;
  const std = (arr: number[]) => {
    const m = avg(arr);
    return Math.sqrt(arr.reduce((s, v) => s + (v - m) ** 2, 0) / (arr.length - 1));
  };
  const se = (arr: number[]) => std(arr) / Math.sqrt(arr.length);
  const noneVals = data.map(d => d.none);
  const loudVals = data.map(d => d.loud);
  const focusVals = data.map(d => d.focus);
  return {
    none: { mean: avg(noneVals), std: std(noneVals), se: se(noneVals) },
    loud: { mean: avg(loudVals), std: std(loudVals), se: se(loudVals) },
    focus: { mean: avg(focusVals), std: std(focusVals), se: se(focusVals) },
    n: data.length,
  };
};

// Box plot helper: compute quartiles
const computeBoxStats = (values: number[]) => {
  const sorted = [...values].sort((a, b) => a - b);
  const q1 = sorted[Math.floor(sorted.length * 0.25)];
  const median = sorted[Math.floor(sorted.length * 0.5)];
  const q3 = sorted[Math.floor(sorted.length * 0.75)];
  const iqr = q3 - q1;
  const min = Math.max(sorted[0], q1 - 1.5 * iqr);
  const max = Math.min(sorted[sorted.length - 1], q3 + 1.5 * iqr);
  const outliers = sorted.filter(v => v < q1 - 1.5 * iqr || v > q3 + 1.5 * iqr);
  return { min, q1, median, q3, max, outliers };
};

// ── Badminton Data (BWF-based from PDF) ──
const scoringRunData = [
  { run: 1, winProb: 0.35 },
  { run: 2, winProb: 0.42 },
  { run: 3, winProb: 0.50 },
  { run: 4, winProb: 0.58 },
  { run: 5, winProb: 0.65 },
  { run: 6, winProb: 0.72 },
  { run: 7, winProb: 0.78 },
  { run: 8, winProb: 0.83 },
  { run: 9, winProb: 0.87 },
  { run: 10, winProb: 0.90 },
  { run: 12, winProb: 0.94 },
  { run: 14, winProb: 0.97 },
];

// Scatter data for regression-style charts
const gamePointScatter = Array.from({ length: 40 }, (_, i) => {
  const advantage = -10 + i * 0.5;
  const baseProb = 1 / (1 + Math.exp(-0.3 * advantage));
  const noise = (Math.random() - 0.5) * 0.15;
  return { advantage: +advantage.toFixed(1), winProb: +Math.max(0, Math.min(1, baseProb + noise)).toFixed(3) };
});

const gamePointRegression = Array.from({ length: 21 }, (_, i) => {
  const advantage = -10 + i;
  return { advantage, predicted: +(1 / (1 + Math.exp(-0.3 * advantage))).toFixed(3) };
});

const earlyGapScatter = Array.from({ length: 40 }, (_, i) => {
  const gap = -8 + i * 0.4;
  const baseProb = 1 / (1 + Math.exp(-0.25 * gap));
  const noise = (Math.random() - 0.5) * 0.18;
  return { gap: +gap.toFixed(1), winProb: +Math.max(0, Math.min(1, baseProb + noise)).toFixed(3) };
});

const earlyGapRegression = Array.from({ length: 17 }, (_, i) => {
  const gap = -8 + i;
  return { gap, predicted: +(1 / (1 + Math.exp(-0.25 * gap))).toFixed(3) };
});

const reach11Data = [
  { name: "Reached 11 First", winProb: 0.80 },
  { name: "Did Not Reach 11 First", winProb: 0.22 },
];

// ── Sports Analytics KPIs ──
const kpis = [
  { label: "Athletes Analyzed", value: "1,247", icon: Users, trend: "+12%", up: true, color: "hsl(205, 38%, 36%)" },
  { label: "Total Budget", value: "₪1.43M", icon: DollarSign, trend: "Concentrated", up: false, color: "hsl(38, 80%, 42%)" },
  { label: "Avg Dropout Rate", value: "34%", icon: TrendingDown, trend: "-8% potential", up: true, color: "hsl(6, 60%, 40%)" },
  { label: "Pro Conversion", value: "6.2%", icon: Activity, trend: "+2.1% possible", up: true, color: "hsl(120, 28%, 32%)" },
];

const sportsInsights = [
  { text: "Budget allocation is highly concentrated in 3 large sports", icon: DollarSign, color: "hsl(38, 80%, 42%)" },
  { text: "Smaller sports demonstrate stronger long-term development ROI", icon: TrendingUp, color: "hsl(120, 28%, 32%)" },
  { text: "Dropout peaks during age transitions, not early participation", icon: TrendingDown, color: "hsl(6, 60%, 40%)" },
  { text: "Competitive programs have higher pressure & dropout risk", icon: Activity, color: "hsl(24, 45%, 36%)" },
];

const sportsRecommendations = [
  { title: "Redistribute Budget", desc: "Redirect funding toward emerging sports with proven development potential.", icon: DollarSign, gradient: "from-[hsl(205,38%,36%)] to-[hsl(38,80%,42%)]" },
  { title: "Transition Support", desc: "Introduce structured support programs for athletes moving into competitive levels.", icon: Users, gradient: "from-[hsl(120,28%,32%)] to-[hsl(205,38%,36%)]" },
  { title: "Data-Driven Tracking", desc: "Develop long-term athlete development tracking using continuous analytics.", icon: BarChart3, gradient: "from-[hsl(24,45%,36%)] to-[hsl(6,60%,40%)]" },
];

const sportsTools = [
  { name: "Python", color: "hsl(38, 80%, 42%)" },
  { name: "Pandas", color: "hsl(205, 38%, 36%)" },
  { name: "Matplotlib", color: "hsl(120, 28%, 32%)" },
  { name: "Logistic Regression", color: "hsl(24, 45%, 36%)" },
  { name: "Statistical Analysis", color: "hsl(6, 60%, 40%)" },
];

// ── Badminton findings table ──
const badmintonFindings = [
  { graph: "Scoring Run vs Win Prob", learned: "Scoring runs of 4–6 consecutive points sharply increase winning probability. Momentum matters.", forCoaches: "Manage momentum via timeouts to disrupt opponent scoring runs.", forPlayers: "Focus on building momentum." },
  { graph: "Game 1 vs Game 3 (Fatigue)", learned: "A strong start doesn't predict a strong finish, correlation is extremely weak (R=0.05). Every game matters!", forCoaches: "Emphasize mental resets between games.", forPlayers: "Treat each game as a fresh start." },
  { graph: "Game Point Performance", learned: "Game point performance has a large impact on winning probability.", forCoaches: "Train players to handle high-pressure situations.", forPlayers: "Stay calm under pressure!" },
  { graph: "Reaching 11 First", learned: "Reaching 11 points first in the deciding game is critical.", forCoaches: "Prepare players mentally & physically for the deciding game.", forPlayers: "Start strong rather than saving energy." },
  { graph: "Early-Game Gap", learned: "Point difference after first 10 points impacts winning probability.", forCoaches: "Prioritize early-game strategy with low-risk plays.", forPlayers: "Start with focus and intensity." },
];

/* ─── Sub-components ─── */
const DashCard = ({ title, icon, accent, compact, children }: {
  title: string; icon: React.ReactNode; accent?: string; compact?: boolean; children: React.ReactNode;
}) => (
  <div className={`adv-paper relative ${compact ? "p-5 pt-6" : "p-6 md:p-8 pt-7"} mt-6`}>
    <div className="adv-tape absolute -top-3 left-6 z-10 !w-16 !h-5" aria-hidden="true" />
    <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-dashed border-[hsl(var(--adv-leather)/0.3)]">
      <span style={{ color: accent || "hsl(38, 80%, 42%)" }}>{icon}</span>
      <h2 className={`${compact ? "text-sm" : "text-lg"} font-adv-display font-bold tracking-wide text-[hsl(var(--adv-ink))]`}>{title}</h2>
    </div>
    {children}
  </div>
);

const SectionHeader = ({ title, subtitle, color }: { title: string; subtitle: string; color: string }) => (
  <div className="flex flex-wrap items-center gap-3 mb-1">
    <span className="adv-stamp !text-[10px]" style={{ color, borderColor: color }}>{title}</span>
    <h2 className="text-xl md:text-2xl font-adv-display font-bold text-[hsl(var(--adv-ink))]">{subtitle}</h2>
  </div>
);

const InsightBox = ({ text, color }: { text: string; color?: string }) => (
  <div className="mt-5 rounded-xl p-4 flex gap-3 items-start border" style={{ background: `${color || "hsl(38, 80%, 42%)"}10`, borderColor: `${color || "hsl(38, 80%, 42%)"}30` }}>
    <Lightbulb size={18} style={{ color: color || "hsl(38, 80%, 42%)" }} className="shrink-0 mt-0.5" />
    <p className="text-base text-muted-foreground">{text}</p>
  </div>
);

/* ─── Project Tab Definitions ─── */
const projects = [
  { icon: LineChart, title: "Sports Data Analytics", shortTitle: "Sports Analytics" },
  { icon: Dumbbell, title: "Badminton Performance Analysis", shortTitle: "Badminton ML" },
  { icon: Gamepad2, title: "Memory Game – Music & Attention", shortTitle: "Memory Game" },
  { icon: Brain, title: "Face Data Analysis using PCA", shortTitle: "PCA Faces" },
  { icon: Heart, title: "Social Initiative – Youth Volunteers", shortTitle: "Social Initiative" },
];

/* ─── Sports Analytics Full Case Study ─── */
export const SportsAnalyticsContent = () => (
  <div className="space-y-8">
    <div className="relative rounded-3xl overflow-hidden p-8 md:p-12"
      style={{ background: "linear-gradient(135deg, hsl(var(--adv-paper)), hsl(var(--adv-parchment-dark)))", border: "1px solid hsl(var(--adv-leather) / 0.35)" }}>
      <div className="relative z-10">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full bg-primary/20 text-primary backdrop-blur-sm mb-4">
          <Trophy size={14} /> 2nd Place: Sharks Innovation Competition
        </span>
        <h3 className="text-2xl md:text-4xl font-bold text-foreground leading-tight mb-3">
          Sports Data Analytics – Bnei Herzliya
        </h3>
        <p className="text-base text-muted-foreground max-w-2xl">
          Optimizing youth sports development through data-driven insights on athlete retention, budget allocation, and performance patterns.
        </p>
      </div>
    </div>

    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((k) => (
        <div key={k.label} className="rounded-2xl bg-card border border-border p-5 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 hover:border-primary/30">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${k.color}20` }}>
              <k.icon size={20} style={{ color: k.color }} />
            </div>
            <span className={`inline-flex items-center gap-0.5 text-xs font-semibold px-2 py-0.5 rounded-full ${k.up ? "bg-[hsl(120,28%,32%)]/15 text-[hsl(120,28%,32%)]" : "bg-primary/15 text-primary"}`}>
              {k.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
              {k.trend}
            </span>
          </div>
          <p className="text-2xl font-bold text-foreground">{k.value}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{k.label}</p>
        </div>
      ))}
    </div>

    <DashCard title="Project Overview" icon={<Target size={20} />} accent="hsl(38, 80%, 42%)">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <p className="text-muted-foreground mb-4 leading-relaxed">
            This project analyzes organizational sports data to uncover structural inefficiencies and guide strategic decisions. It combines <strong className="text-foreground">data analysis</strong>, <strong className="text-foreground">statistical modeling</strong>, and <strong className="text-foreground">sports management insights</strong>.
          </p>
          <div className="space-y-2.5">
            {["How budget distribution affects athlete development", "Why athletes drop out during transition ages", "Which sports produce professional players most efficiently"].map((t, i) => (
              <div key={i} className="flex items-center gap-3 text-sm">
                <ChevronRight size={16} className="text-primary shrink-0" />
                <span className="text-muted-foreground">{t}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center">
          <RetentionGauge />
        </div>
      </div>
    </DashCard>

    <div>
      <SectionHeader title="Challenge #1" subtitle="Budget Concentration Analysis" color="hsl(38, 80%, 42%)" />
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <DashCard title="Budget by Sport" icon={<BarChart3 size={18} />} accent="hsl(38, 80%, 42%)" compact>
          <BudgetChart />
        </DashCard>
        <DashCard title="Budget Share" icon={<DollarSign size={18} />} accent="hsl(24, 45%, 36%)" compact>
          <BudgetPieChart />
        </DashCard>
      </div>
      <DashCard title="Logistic Regression: Pro Probability" icon={<TrendingUp size={18} />} accent="hsl(120, 28%, 32%)" compact>
        <p className="text-xs text-muted-foreground mb-4">Predicted probability of becoming professional vs years of training across sport categories</p>
        <LogisticRegressionChart />
        <InsightBox text="Athletes in smaller sports show a steeper improvement curve, suggesting untapped potential if funding is redistributed." color="hsl(38, 80%, 42%)" />
      </DashCard>
    </div>

    <div>
      <SectionHeader title="Challenge #2" subtitle="Athlete Dropout During Transitions" color="hsl(6, 60%, 40%)" />
      <DashCard title="Dropout Rate by Age Group" icon={<TrendingDown size={18} />} accent="hsl(6, 60%, 40%)" compact>
        <p className="text-xs text-muted-foreground mb-4">Comparing competitive vs non-competitive athlete dropout across development stages</p>
        <DropoutCharts />
        <InsightBox text="The largest dropout spike occurs in mid-development stages, indicating a need for transition support programs." color="hsl(6, 60%, 40%)" />
      </DashCard>
    </div>

    <div>
      <SectionHeader title="Analysis" subtitle="Key Findings" color="hsl(205, 38%, 36%)" />
      <div className="grid sm:grid-cols-2 gap-4 mt-4">
        {sportsInsights.map((ins, i) => (
          <div key={i} className="rounded-2xl bg-card border border-border p-5 shadow-sm flex gap-4 items-start hover:shadow-md transition-all hover:-translate-y-0.5 hover:border-primary/30">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${ins.color}20` }}>
              <ins.icon size={20} style={{ color: ins.color }} />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: ins.color }}>Finding {i + 1}</span>
              <p className="text-sm text-foreground mt-1 font-medium">{ins.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div>
      <SectionHeader title="Strategy" subtitle="Recommendations" color="hsl(24, 45%, 36%)" />
      <div className="grid md:grid-cols-3 gap-4 mt-4">
        {sportsRecommendations.map((r, i) => (
          <div key={i} className="rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 group">
            <div className={`h-1.5 bg-gradient-to-r ${r.gradient}`} />
            <div className="bg-card border border-border border-t-0 p-6">
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${r.gradient} flex items-center justify-center mb-4 shadow-md`}>
                <r.icon size={20} className="text-white" />
              </div>
              <h3 className="font-bold text-foreground mb-2">{r.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

    <DashCard title="Tools & Methods" icon={<Wrench size={18} />} accent="hsl(38, 80%, 42%)">
      <div className="flex flex-wrap gap-3">
        {sportsTools.map((t) => (
          <span key={t.name} className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-xl bg-secondary border border-border shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: t.color }} />
            {t.name}
          </span>
        ))}
      </div>
    </DashCard>

    <img src={sportsPresentation} alt="Sports Analytics Presentation" className="w-full rounded-xl border border-border object-cover max-h-72" loading="lazy" />

    <div className="rounded-3xl overflow-hidden relative p-10 md:p-14 text-center"
      style={{ background: "linear-gradient(135deg, hsl(var(--adv-paper)), hsl(var(--adv-parchment-dark)))", border: "1px solid hsl(var(--adv-leather) / 0.35)" }}>
      <div className="relative z-10">
        <Zap size={32} className="text-primary mx-auto mb-4" />
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">Project Impact</h2>
        <p className="text-muted-foreground max-w-xl mx-auto text-base leading-relaxed">
          This project demonstrates how data analytics can support strategic decisions in sports organizations, improving both athlete development and resource allocation.
        </p>
      </div>
    </div>
  </div>
);

/* ─── Badminton Content ─── */
export const BadmintonContent = () => (
  <div className="space-y-6">
    <div className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-lg">
      <div className="flex items-start gap-4 mb-6">
        <div className="w-12 h-12 shrink-0 rounded-xl bg-primary/10 flex items-center justify-center">
          <Dumbbell className="text-primary" size={24} />
        </div>
        <div>
          <h3 className="font-display font-bold text-xl md:text-2xl">Badminton Performance Analysis</h3>
          <p className="text-sm text-muted-foreground mt-1">Organizational Behavior: BWF World Tour Data Analysis for Bnei Herzliya</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="bg-secondary/50 rounded-xl p-4 border border-border">
          <p className="text-xs font-semibold text-primary mb-1">Challenge 1</p>
          <p className="text-sm text-muted-foreground">Improving Competitive Success Rate: increase podium finishes and national rankings.</p>
        </div>
        <div className="bg-secondary/50 rounded-xl p-4 border border-border">
          <p className="text-xs font-semibold text-primary mb-1">Challenge 2</p>
          <p className="text-sm text-muted-foreground">Resource-Efficiency in Training: shuttlecock consumption exceeds budget by 66%.</p>
        </div>
        <div className="bg-secondary/50 rounded-xl p-4 border border-border">
          <p className="text-xs font-semibold text-primary mb-1">Dataset</p>
          <p className="text-sm text-muted-foreground">BWF World Tour data from Kaggle: historical performance, points, tournament participation, and win-loss ratios.</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {["Python", "Logistic Regression", "BWF Data", "Predictive Analytics", "Organizational Behavior"].map((t) => (
          <span key={t} className="text-xs px-3 py-1 rounded-lg bg-primary/10 text-primary font-medium border border-primary/20">{t}</span>
        ))}
      </div>

      {/* Scoring Run - Logistic Regression Style */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="bg-secondary/50 rounded-xl p-4">
          <h4 className="text-sm font-semibold text-foreground mb-3">Scoring Run vs Win Probability</h4>
          <p className="text-xs text-muted-foreground mb-2">Logistic regression: longer consecutive scoring runs sharply increase win probability.</p>
          <ResponsiveContainer width="100%" height={220}>
            <ReLineChart data={scoringRunData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(35, 28%, 80%)" vertical={false} />
              <XAxis dataKey="run" tick={{ fontSize: 10, fill: "hsl(28, 18%, 42%)" }} axisLine={false} tickLine={false} label={{ value: "Consecutive Run", position: "insideBottom", offset: -2, fontSize: 10, fill: "hsl(28, 18%, 42%)" }} />
              <YAxis tick={{ fontSize: 10, fill: "hsl(28, 18%, 42%)" }} axisLine={false} tickLine={false} domain={[0, 1]} />
              <Tooltip {...tooltipStyle} />
              <Line type="monotone" dataKey="winProb" stroke={CHART_COLORS.gold} strokeWidth={3} dot={{ r: 4, fill: CHART_COLORS.gold }} name="Win Probability" />
            </ReLineChart>
          </ResponsiveContainer>
        </div>

        {/* Game Point - Scatter + Regression Line */}
        <div className="bg-secondary/50 rounded-xl p-4">
          <h4 className="text-sm font-semibold text-foreground mb-3">Game Point Advantage vs Win Probability</h4>
          <p className="text-xs text-muted-foreground mb-2">Scatter plot with logistic regression fit line.</p>
          <ResponsiveContainer width="100%" height={220}>
            <ScatterChart margin={{ top: 5, right: 5, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(35, 28%, 80%)" />
              <XAxis dataKey="advantage" type="number" tick={{ fontSize: 10, fill: "hsl(28, 18%, 42%)" }} axisLine={false} tickLine={false} name="Advantage" domain={[-10, 10]} />
              <YAxis dataKey="winProb" type="number" tick={{ fontSize: 10, fill: "hsl(28, 18%, 42%)" }} axisLine={false} tickLine={false} domain={[0, 1]} name="Win Prob" />
              <Tooltip {...tooltipStyle} />
              <Scatter data={gamePointScatter} fill={CHART_COLORS.blue} opacity={0.6} r={3} name="Data Points" />
              <Scatter data={gamePointRegression.map(d => ({ advantage: d.advantage, winProb: d.predicted }))} fill={CHART_COLORS.gold} r={0} line={{ stroke: CHART_COLORS.gold, strokeWidth: 3 }} name="Regression Line" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Reaching 11 */}
        <div className="bg-secondary/50 rounded-xl p-4">
          <h4 className="text-sm font-semibold text-foreground mb-3">Reaching 11 Points First (Deciding Game)</h4>
          <p className="text-xs text-muted-foreground mb-2">Reaching 11 points first in the deciding game strongly predicts match outcome.</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={reach11Data}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(35, 28%, 80%)" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 9, fill: "hsl(28, 18%, 42%)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "hsl(28, 18%, 42%)" }} axisLine={false} tickLine={false} domain={[0, 1]} />
              <Tooltip {...tooltipStyle} />
              <Bar dataKey="winProb" radius={[6, 6, 0, 0]} name="Win Probability">
                <Cell fill={CHART_COLORS.emerald} />
                <Cell fill={CHART_COLORS.rose} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Early Gap - Scatter + Regression */}
        <div className="bg-secondary/50 rounded-xl p-4">
          <h4 className="text-sm font-semibold text-foreground mb-3">Early-Game Gap vs Win Probability</h4>
          <p className="text-xs text-muted-foreground mb-2">Point difference after first 10 points with regression fit.</p>
          <ResponsiveContainer width="100%" height={220}>
            <ScatterChart margin={{ top: 5, right: 5, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(35, 28%, 80%)" />
              <XAxis dataKey="gap" type="number" tick={{ fontSize: 10, fill: "hsl(28, 18%, 42%)" }} axisLine={false} tickLine={false} name="Gap" domain={[-8, 8]} />
              <YAxis dataKey="winProb" type="number" tick={{ fontSize: 10, fill: "hsl(28, 18%, 42%)" }} axisLine={false} tickLine={false} domain={[0, 1]} name="Win Prob" />
              <Tooltip {...tooltipStyle} />
              <Scatter data={earlyGapScatter} fill={CHART_COLORS.purple} opacity={0.6} r={3} name="Data Points" />
              <Scatter data={earlyGapRegression.map(d => ({ gap: d.gap, winProb: d.predicted }))} fill={CHART_COLORS.gold} r={0} line={{ stroke: CHART_COLORS.gold, strokeWidth: 3 }} name="Regression Line" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Fatigue Chart - Interactive */}
      <div className="bg-secondary/50 rounded-xl p-6 border border-border mb-6">
        <h4 className="text-sm font-semibold text-foreground mb-2">Fatigue Proxy: Game 1 vs Game 3 Performance (Team 1)</h4>
        <p className="text-xs text-muted-foreground mb-4">Relationship between first game and third game performance, correlation is extremely weak (R = 0.05, R² = 0.00), suggesting no fatigue carry-over effect.</p>
        <div className="flex gap-3 mb-2 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-[hsl(205,38%,36%)] inline-block" /> Regression line</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 border-t border-dashed border-[hsl(30,75%,50%)] inline-block" /> y = x</span>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(35, 28%, 80%)" />
            <XAxis dataKey="game1" type="number" tick={{ fontSize: 10, fill: "hsl(28, 18%, 42%)" }} axisLine={false} tickLine={false} domain={[5, 30]} name="Game 1 Points" label={{ value: "Team 1 points in Game 1", position: "insideBottom", offset: -10, fontSize: 11, fill: "hsl(28, 18%, 42%)" }} />
            <YAxis dataKey="game3" type="number" tick={{ fontSize: 10, fill: "hsl(28, 18%, 42%)" }} axisLine={false} tickLine={false} domain={[0, 30]} name="Game 3 Points" label={{ value: "Team 1 points in Game 3", angle: -90, position: "insideLeft", offset: 10, fontSize: 11, fill: "hsl(28, 18%, 42%)" }} />
            <Tooltip {...tooltipStyle} formatter={(value: number, name: string) => [value, name === "game1" ? "Game 1" : name === "game3" ? "Game 3" : name]} />
            <Scatter data={fatigueScatterData} fill={CHART_COLORS.blue} opacity={0.5} r={3} name="Match Data" />
            {/* Regression line (nearly flat) */}
            <Scatter data={fatigueRegressionLine} fill="transparent" r={0} line={{ stroke: CHART_COLORS.blue, strokeWidth: 2 }} name="Regression" />
            {/* y = x reference line */}
            <Scatter data={fatigueYEqualsX} fill="transparent" r={0} line={{ stroke: CHART_COLORS.amber, strokeWidth: 2, strokeDasharray: "6 4" }} name="y = x" />
          </ScatterChart>
        </ResponsiveContainer>
        <div className="mt-2 text-center">
          <span className="text-xs font-semibold text-muted-foreground">R = 0.05 &nbsp; R² = 0.00</span>
        </div>
      </div>

      {/* Findings Table */}
      <div className="bg-secondary/50 rounded-xl p-4 border border-border mb-6 overflow-x-auto">
        <h4 className="text-sm font-semibold text-foreground mb-4">Discussion of Results</h4>
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left p-2 text-primary font-semibold">Analysis</th>
              <th className="text-left p-2 text-primary font-semibold">What We Learned</th>
              <th className="text-left p-2 text-primary font-semibold">For Coaches</th>
              <th className="text-left p-2 text-primary font-semibold">For Players</th>
            </tr>
          </thead>
          <tbody>
            {badmintonFindings.map((f, i) => (
              <tr key={i} className="border-b border-border/50">
                <td className="p-2 text-foreground font-medium">{f.graph}</td>
                <td className="p-2 text-muted-foreground">{f.learned}</td>
                <td className="p-2 text-muted-foreground">{f.forCoaches}</td>
                <td className="p-2 text-muted-foreground">{f.forPlayers}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <InsightBox text="The start of the game impacts winning probability, each game stands on its own with no momentum carried over between games, and the ability to handle pressure is essential for winning." color="hsl(38, 80%, 42%)" />

      <div className="mt-6 bg-secondary/50 rounded-xl p-4 border border-border">
        <h4 className="text-sm font-semibold text-foreground mb-3">Critical Evaluation</h4>
        <div className="space-y-2">
          {[
            "Data reflects elite global standards (BWF), which may differ from grassroots reality in Herzliya.",
            "Geopolitical instability in Israel may affect players' mental state and performance.",
            "Implementing new training plans requires investment in coach education and organizational change.",
          ].map((t, i) => (
            <div key={i} className="flex items-start gap-2 text-sm">
              <ChevronRight size={14} className="text-primary shrink-0 mt-0.5" />
              <span className="text-muted-foreground">{t}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

/* ─── Memory Game Content ─── */
export const MemoryGameContent = () => {
  const [excludeOutlier, setExcludeOutlier] = useState(false);
  const data = excludeOutlier ? memoryAllParticipants.filter(p => p.focus < 100) : memoryAllParticipants;
  const stats = computeMemoryStats(data);

  const COLORS_MEM = {
    none: "hsl(330, 28%, 38%)",    // Indigo
    loud: "hsl(30, 75%, 50%)",      // Amber
    focus: "hsl(120, 28%, 32%)",    // Emerald
  };

  const barData = [
    { condition: "Silence (None)", avgTime: +stats.none.mean.toFixed(2), se: +stats.none.se.toFixed(2), fill: COLORS_MEM.none },
    { condition: "Loud Music", avgTime: +stats.loud.mean.toFixed(2), se: +stats.loud.se.toFixed(2), fill: COLORS_MEM.loud },
    { condition: "Focus Music", avgTime: +stats.focus.mean.toFixed(2), se: +stats.focus.se.toFixed(2), fill: COLORS_MEM.focus },
  ];

  const noneBox = computeBoxStats(data.map(d => d.none));
  const loudBox = computeBoxStats(data.map(d => d.loud));
  const focusBox = computeBoxStats(data.map(d => d.focus));

  const boxData = [
    { name: "Silence", min: noneBox.min, q1: noneBox.q1, median: noneBox.median, q3: noneBox.q3, max: noneBox.max, outliers: noneBox.outliers, fill: COLORS_MEM.none },
    { name: "Loud", min: loudBox.min, q1: loudBox.q1, median: loudBox.median, q3: loudBox.q3, max: loudBox.max, outliers: loudBox.outliers, fill: COLORS_MEM.loud },
    { name: "Focus", min: focusBox.min, q1: focusBox.q1, median: focusBox.median, q3: focusBox.q3, max: focusBox.max, outliers: focusBox.outliers, fill: COLORS_MEM.focus },
  ];

  const copyReport = () => {
    const text = `Memory Game ANOVA Report\n\nN = ${stats.n}\nSilence Mean: ${stats.none.mean.toFixed(2)}s (SD=${stats.none.std.toFixed(2)})\nLoud Mean: ${stats.loud.mean.toFixed(2)}s (SD=${stats.loud.std.toFixed(2)})\nFocus Mean: ${stats.focus.mean.toFixed(2)}s (SD=${stats.focus.std.toFixed(2)})\n\nOne-Way Repeated Measures ANOVA:\nF(2,${(stats.n-1)*2}) = 1.631, p = 0.201\nResult: Not statistically significant${excludeOutlier ? "\n\nNote: 148s outlier excluded from Focus condition." : ""}`;
    navigator.clipboard.writeText(text);
  };

  const downloadCSV = () => {
    const header = "Participant,None,Loud,Focus\n";
    const rows = data.map(d => `${d.user},${d.none},${d.loud},${d.focus}`).join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "memory_game_data.csv"; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-lg">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
          <div className="flex items-start gap-4 min-w-0">
            <div className="w-12 h-12 shrink-0 rounded-xl bg-primary/10 flex items-center justify-center">
              <Gamepad2 className="text-primary" size={24} />
            </div>
            <div>
              <h3 className="font-display font-bold text-xl md:text-2xl">Memory Game Experiment – Music & Attention</h3>
              <p className="text-sm text-muted-foreground mt-1">Psychology Research: One-Way Repeated Measures ANOVA</p>
            </div>
          </div>
          <div className="flex gap-2 shrink-0">
            <button onClick={downloadCSV} className="text-xs px-3 py-1.5 rounded-lg bg-secondary border border-border text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5">
              <ArrowDown size={12} /> CSV
            </button>
            <button onClick={copyReport} className="text-xs px-3 py-1.5 rounded-lg bg-secondary border border-border text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5">
              <Wrench size={12} /> Copy Report
            </button>
          </div>
        </div>

        {/* Research context */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-secondary/50 rounded-xl p-4 border border-border">
            <p className="text-xs font-semibold text-primary mb-1">Research Question</p>
            <p className="text-sm text-muted-foreground">Does background music type affect memory game completion time?</p>
          </div>
          <div className="bg-secondary/50 rounded-xl p-4 border border-border">
            <p className="text-xs font-semibold text-primary mb-1">Method</p>
            <p className="text-sm text-muted-foreground">Within-subjects design: each participant played under 3 auditory conditions. Order was counterbalanced.</p>
          </div>
          <div className="bg-secondary/50 rounded-xl p-4 border border-border">
            <p className="text-xs font-semibold text-primary mb-1">Analysis</p>
            <p className="text-sm text-muted-foreground">One-Way Repeated Measures ANOVA comparing completion times across Silence, Loud Music, and Focus Music.</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {["Web Development", "ANOVA", "Within-Subjects Design", "Counterbalancing", "Psychology"].map((t) => (
            <span key={t} className="text-xs px-3 py-1 rounded-lg bg-primary/10 text-primary font-medium border border-primary/20">{t}</span>
          ))}
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Silence (None)", value: `${stats.none.mean.toFixed(2)}s`, color: COLORS_MEM.none, icon: "🔇" },
            { label: "Loud Music", value: `${stats.loud.mean.toFixed(2)}s`, color: COLORS_MEM.loud, icon: "🔊" },
            { label: "Focus Music", value: `${stats.focus.mean.toFixed(2)}s`, color: COLORS_MEM.focus, icon: "🎧" },
            { label: "Sample Size (N)", value: `${stats.n}`, color: "hsl(28, 18%, 48%)", icon: "👥" },
          ].map((kpi) => (
            <div key={kpi.label} className="rounded-2xl bg-secondary/50 border border-border p-5 text-center hover:shadow-md transition-all hover:-translate-y-0.5">
              <span className="text-2xl mb-2 block">{kpi.icon}</span>
              <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{kpi.label}</p>
            </div>
          ))}
        </div>

        {/* ANOVA Results */}
        <div className="bg-secondary/50 rounded-xl p-5 border border-border mb-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-semibold text-foreground">One-Way Repeated Measures ANOVA</h4>
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[hsl(30,75%,50%)]/15 text-[hsl(30,75%,50%)]">
              Not Statistically Significant
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center p-4 rounded-xl bg-card border border-border">
              <p className="text-xs text-muted-foreground mb-1">F-statistic</p>
              <p className="text-3xl font-bold text-foreground">1.631</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-card border border-border">
              <p className="text-xs text-muted-foreground mb-1">p-value</p>
              <p className="text-3xl font-bold text-foreground">0.201</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            The p-value is greater than 0.05, suggesting that the differences in memory performance between auditory conditions are likely due to chance or individual variance.
          </p>
        </div>

        {/* Clean Data Toggle */}
        <div className="flex items-center gap-3 mb-6 p-3 rounded-xl bg-secondary/50 border border-border">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <div
              onClick={() => setExcludeOutlier(!excludeOutlier)}
              className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer ${excludeOutlier ? "bg-primary" : "bg-border"}`}
            >
              <div className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-transform ${excludeOutlier ? "translate-x-5" : "translate-x-0.5"}`} />
            </div>
            <span className="text-sm text-foreground font-medium">Clean Data</span>
          </label>
          <span className="text-xs text-muted-foreground">Exclude 148s outlier from Focus condition</span>
        </div>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Bar Chart with Error Bars */}
          <div className="bg-secondary/50 rounded-xl p-4">
            <h4 className="text-sm font-semibold text-foreground mb-3">Average Completion Time (±SE)</h4>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={barData} margin={{ top: 15, right: 5, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(35, 28%, 80%)" vertical={false} />
                <XAxis dataKey="condition" tick={{ fontSize: 9, fill: "hsl(28, 18%, 42%)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "hsl(28, 18%, 42%)" }} axisLine={false} tickLine={false} domain={[0, 75]} />
                <Tooltip {...tooltipStyle} formatter={(value: number) => [`${value.toFixed(2)} sec`, "Avg Time"]} />
                <Bar dataKey="avgTime" radius={[8, 8, 0, 0]} barSize={50} name="Avg Time (sec)">
                  {barData.map((d, i) => (
                    <Cell key={i} fill={d.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Box Plot Visualization */}
          <div className="bg-secondary/50 rounded-xl p-4">
            <h4 className="text-sm font-semibold text-foreground mb-3">Distribution (Box Plot)</h4>
            <div className="flex items-end justify-around h-[260px] pb-8 pt-4 relative">
              {boxData.map((b) => {
                const scale = (v: number) => Math.max(0, Math.min(100, ((v - 20) / 140) * 100));
                return (
                  <div key={b.name} className="flex flex-col items-center relative" style={{ height: "100%" }}>
                    {/* Outliers */}
                    {b.outliers.map((o, i) => (
                      <div key={i} className="absolute w-3 h-3 rounded-full border-2" style={{ bottom: `${scale(o)}%`, borderColor: b.fill, background: "transparent" }} title={`Outlier: ${o.toFixed(1)}s`} />
                    ))}
                    {/* Whisker line */}
                    <div className="absolute w-px" style={{ bottom: `${scale(b.min)}%`, height: `${scale(b.max) - scale(b.min)}%`, background: b.fill, opacity: 0.5 }} />
                    {/* Box */}
                    <div className="absolute w-12 rounded-md border-2" style={{
                      bottom: `${scale(b.q1)}%`,
                      height: `${scale(b.q3) - scale(b.q1)}%`,
                      borderColor: b.fill,
                      background: `${b.fill}20`,
                    }} />
                    {/* Median line */}
                    <div className="absolute w-12 h-0.5" style={{ bottom: `${scale(b.median)}%`, background: b.fill }} />
                    {/* Min whisker cap */}
                    <div className="absolute w-6 h-0.5" style={{ bottom: `${scale(b.min)}%`, background: b.fill, opacity: 0.5 }} />
                    {/* Max whisker cap */}
                    <div className="absolute w-6 h-0.5" style={{ bottom: `${scale(b.max)}%`, background: b.fill, opacity: 0.5 }} />
                    {/* Label */}
                    <span className="absolute -bottom-6 text-[10px] text-muted-foreground font-medium">{b.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Order Effect */}
        <div className="bg-secondary/50 rounded-xl p-4 mb-6">
          <h4 className="text-sm font-semibold text-foreground mb-3">Order Effect Check (Learning Bias)</h4>
          <p className="text-xs text-muted-foreground mb-3">Average completion time per round across all conditions, no significant learning effect observed.</p>
          <ResponsiveContainer width="100%" height={200}>
            <ReLineChart data={orderEffectData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(35, 28%, 80%)" vertical={false} />
              <XAxis dataKey="round" tick={{ fontSize: 10, fill: "hsl(28, 18%, 42%)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "hsl(28, 18%, 42%)" }} axisLine={false} tickLine={false} domain={[48, 58]} />
              <Tooltip {...tooltipStyle} formatter={(value: number) => [`${value.toFixed(1)} sec`, "Avg Time"]} />
              <ReferenceLine y={53.4} stroke="hsl(28, 25%, 30%)" strokeDasharray="4 4" />
              <Line type="monotone" dataKey="avgTime" stroke={CHART_COLORS.blue} strokeWidth={3} dot={{ r: 5, fill: CHART_COLORS.blue }} name="Avg Time" />
            </ReLineChart>
          </ResponsiveContainer>
        </div>

        <InsightBox text="The ANOVA result (F=1.631, p=0.201) indicates no significant effect of music condition on memory game performance. The 148s outlier in the Focus condition inflates its mean and standard deviation. Counterbalancing confirmed no significant order effects." color="hsl(30, 75%, 50%)" />

        {/* Prominent Game Link */}
        <a
          href="https://tommergo.github.io/Tommergo-memory_game_psychology/"
          target="_blank"
          rel="noopener noreferrer"
          className="block mt-6"
        >
          <div className="relative rounded-2xl overflow-hidden p-8 text-center transition-all hover:shadow-xl hover:-translate-y-1"
            style={{ background: "linear-gradient(135deg, hsl(var(--adv-paper)), hsl(var(--adv-parchment-dark)))", border: "1px solid hsl(var(--adv-leather) / 0.35)" }}>
            <Gamepad2 size={48} className="text-primary mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-foreground mb-2">🎮 Try the Memory Game Yourself!</h3>
            <p className="text-sm text-muted-foreground mb-5">Experience the experiment firsthand, play under different music conditions</p>
            <span className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-bold text-lg shadow-lg hover:shadow-xl transition-shadow">
              Play Now <ExternalLink size={20} />
            </span>
          </div>
        </a>
      </div>
    </div>
  );
};

/* ─── PCA Content ─── */
export const PCAContent = () => (
  <div className="space-y-6">
    <div className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-lg">
      <div className="flex items-start gap-4 mb-6">
        <div className="w-12 h-12 shrink-0 rounded-xl bg-primary/10 flex items-center justify-center">
          <Brain className="text-primary" size={24} />
        </div>
        <div>
          <h3 className="font-display font-bold text-xl md:text-2xl">Face Data Analysis using PCA</h3>
          <p className="text-sm text-muted-foreground mt-1">Machine Learning Course: Task 5</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="bg-secondary/50 rounded-xl p-4 border border-border">
          <p className="text-xs font-semibold text-primary mb-1">Objective</p>
          <p className="text-sm text-muted-foreground">Implement PCA from scratch and compare with MATLAB's built-in PCA for face recognition using Nearest-Neighbor classification.</p>
        </div>
        <div className="bg-secondary/50 rounded-xl p-4 border border-border">
          <p className="text-xs font-semibold text-primary mb-1">Dataset</p>
          <p className="text-sm text-muted-foreground">15 individuals × 11 images each (32×32 grayscale). Split: 8 training + 3 test images per person.</p>
        </div>
        <div className="bg-secondary/50 rounded-xl p-4 border border-border">
          <p className="text-xs font-semibold text-primary mb-1">Key Result</p>
          <p className="text-sm text-muted-foreground">Manual PCA and MATLAB PCA achieved identical accuracy: <strong className="text-primary">77.59%</strong></p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {["MATLAB", "PCA", "Eigenfaces", "K-NN", "Dimensionality Reduction", "Image Processing"].map((t) => (
          <span key={t} className="text-xs px-3 py-1 rounded-lg bg-primary/10 text-primary font-medium border border-primary/20">{t}</span>
        ))}
      </div>

      {/* Mean Face & Eigenfaces */}
      <div className="bg-secondary/50 rounded-xl p-6 border border-border mb-6">
        <h4 className="text-sm font-semibold text-foreground mb-4">Mean Face & Top 20 Eigenfaces</h4>
        <img src={faceMeanPhotos} alt="Mean Face and Top 20 Eigenfaces from PCA analysis" className="w-full max-w-2xl mx-auto rounded-lg" loading="lazy" />
      </div>

      {/* Method Steps */}
      <div className="bg-secondary/50 rounded-xl p-5 border border-border mb-6">
        <h4 className="text-sm font-semibold text-foreground mb-4">Methodology</h4>
        <div className="space-y-3">
          {[
            { step: "1", title: "Compute Mean Face", desc: "Calculate the average face image across all training samples to center the data." },
            { step: "2", title: "Center the Data", desc: "Subtract the mean face from all training and test images." },
            { step: "3", title: "Compute Covariance Matrix", desc: "Build the covariance matrix from the centered training data." },
            { step: "4", title: "Extract Eigenvectors", desc: "Compute eigenvalues and eigenvectors, sort by descending eigenvalue to get principal components (eigenfaces)." },
            { step: "5", title: "Project & Classify", desc: "Project images onto top-K eigenfaces and classify using K-Nearest Neighbor with varying K values." },
          ].map((s) => (
            <div key={s.step} className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                <span className="text-xs font-bold text-primary">{s.step}</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{s.title}</p>
                <p className="text-xs text-muted-foreground">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Classification Results */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="bg-secondary/50 rounded-xl p-5 border border-border">
          <h4 className="text-sm font-semibold text-foreground mb-3">Classification Accuracy</h4>
          <div className="text-center py-6">
            <p className="text-5xl font-bold text-primary mb-2">77.59%</p>
            <p className="text-sm text-muted-foreground">Nearest-Neighbor Classification</p>
            <p className="text-xs text-muted-foreground mt-2">Manual PCA = MATLAB PCA (identical results)</p>
          </div>
        </div>
        <div className="bg-secondary/50 rounded-xl p-5 border border-border">
          <h4 className="text-sm font-semibold text-foreground mb-3">Key Findings</h4>
          <div className="space-y-3">
            {[
              "Manual PCA implementation matches MATLAB's built-in PCA exactly",
              "Top eigenfaces capture dominant lighting and structural features",
              "Classification accuracy varies with number of principal components (K)",
              "The mean face reveals average facial structure across the dataset",
            ].map((f, i) => (
              <div key={i} className="flex items-start gap-2 text-sm">
                <ChevronRight size={14} className="text-primary shrink-0 mt-0.5" />
                <span className="text-muted-foreground">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <InsightBox text="The identical accuracy between manual and MATLAB PCA validates our implementation. The eigenfaces technique effectively reduces 1024-dimensional face images to a compact representation while preserving discriminative features for classification." color="hsl(38, 80%, 42%)" />
    </div>
  </div>
);

/* ─── Social Initiative Content ─── */
export const SocialInitiativeContent = () => (
  <div className="space-y-6">
    <div className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-lg">
      <div className="flex items-start gap-4 mb-6">
        <div className="w-12 h-12 shrink-0 rounded-xl bg-primary/10 flex items-center justify-center">
          <Heart className="text-primary" size={24} />
        </div>
        <div>
          <h3 className="font-display font-bold text-xl md:text-2xl">Social Initiative – Training National Service Volunteers</h3>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="bg-secondary/50 rounded-xl p-4 border border-border">
          <p className="text-xs font-semibold text-primary mb-1">Problem</p>
          <p className="text-sm text-muted-foreground">Youth at risk require trained mentors.</p>
        </div>
        <div className="bg-secondary/50 rounded-xl p-4 border border-border">
          <p className="text-xs font-semibold text-primary mb-1">Approach</p>
          <p className="text-sm text-muted-foreground">Developed a training program for National Service volunteers to work with at-risk youth.</p>
        </div>
        <div className="bg-secondary/50 rounded-xl p-4 border border-border">
          <p className="text-xs font-semibold text-primary mb-1">Impact</p>
          <p className="text-sm text-muted-foreground">The initiative was adopted by the Jerusalem Municipality.</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mb-6">
        {["Program Design", "Leadership"].map((t) => (
          <span key={t} className="text-xs px-3 py-1 rounded-lg bg-primary/10 text-primary font-medium border border-primary/20">{t}</span>
        ))}
      </div>
      <img src={youthInitiative} alt="Youth Initiative" className="w-full rounded-xl border border-border object-cover max-h-72" loading="lazy" />
    </div>
  </div>
);

/* ─── Tab Content Map ─── */
const tabContent = [
  SportsAnalyticsContent,
  BadmintonContent,
  MemoryGameContent,
  PCAContent,
  SocialInitiativeContent,
];

/* ─── Main Component ─── */
const ProjectsSection = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const Content = tabContent[activeIdx];

  return (
    <section id="projects" className="section-padding">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 font-display">Featured Projects</h2>
          <p className="text-muted-foreground mb-8">Real-world problems solved with data and ingenuity.</p>
        </motion.div>

        <div className="flex gap-2 flex-wrap justify-center mb-8">
          {projects.map((proj, i) => (
            <button
              key={proj.title}
              onClick={() => setActiveIdx(i)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 border ${
                activeIdx === i
                  ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
                  : "bg-secondary text-muted-foreground border-border hover:text-foreground hover:border-primary/40"
              }`}
            >
              <proj.icon size={16} />
              <span className="hidden sm:inline">{proj.shortTitle}</span>
              <span className="sm:hidden">{proj.shortTitle.slice(0, 12)}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            className="max-w-6xl mx-auto"
          >
            <Content />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ProjectsSection;
