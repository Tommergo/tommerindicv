import { motion } from "framer-motion";
import {
  Trophy, TrendingDown, Target, BarChart3, ArrowLeft,
  Lightbulb, Wrench, Users, DollarSign, Activity, TrendingUp,
  ArrowUpRight, ArrowDownRight, Zap, ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/portfolio/Navbar";
import Footer from "@/components/portfolio/Footer";
import BudgetChart from "@/components/analytics/BudgetChart";
import LogisticRegressionChart from "@/components/analytics/LogisticRegressionChart";
import DropoutCharts from "@/components/analytics/DropoutCharts";
import BudgetPieChart from "@/components/analytics/BudgetPieChart";
import RetentionGauge from "@/components/analytics/RetentionGauge";

const fade = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.07, duration: 0.55, ease: [0.25, 0.1, 0.25, 1] as const } }),
};

const kpis = [
  { label: "Athletes Analyzed", value: "1,247", icon: Users, trend: "+12%", up: true, color: "hsl(217, 91%, 60%)" },
  { label: "Total Budget", value: "₪1.43M", icon: DollarSign, trend: "Concentrated", up: false, color: "hsl(43, 96%, 56%)" },
  { label: "Avg Dropout Rate", value: "34%", icon: TrendingDown, trend: "-8% potential", up: true, color: "hsl(347, 77%, 50%)" },
  { label: "Pro Conversion", value: "6.2%", icon: Activity, trend: "+2.1% possible", up: true, color: "hsl(160, 84%, 39%)" },
];

const insights = [
  { text: "Budget allocation is highly concentrated in 3 large sports", icon: DollarSign, color: "hsl(43, 96%, 56%)" },
  { text: "Smaller sports demonstrate stronger long-term development ROI", icon: TrendingUp, color: "hsl(160, 84%, 39%)" },
  { text: "Dropout peaks during age transitions, not early participation", icon: TrendingDown, color: "hsl(347, 77%, 50%)" },
  { text: "Competitive programs have higher pressure & dropout risk", icon: Activity, color: "hsl(271, 81%, 56%)" },
];

const recommendations = [
  { title: "Redistribute Budget", desc: "Redirect a portion of funding toward emerging sports with proven development potential.", icon: DollarSign, gradient: "from-[hsl(217,91%,60%)] to-[hsl(43,96%,56%)]" },
  { title: "Transition Support", desc: "Introduce structured support programs for athletes moving into competitive levels.", icon: Users, gradient: "from-[hsl(160,84%,39%)] to-[hsl(217,91%,60%)]" },
  { title: "Data-Driven Tracking", desc: "Develop long-term athlete development tracking using continuous analytics.", icon: BarChart3, gradient: "from-[hsl(271,81%,56%)] to-[hsl(347,77%,50%)]" },
];

const tools = [
  { name: "Python", color: "hsl(43, 96%, 56%)" },
  { name: "Pandas", color: "hsl(217, 91%, 60%)" },
  { name: "Matplotlib", color: "hsl(160, 84%, 39%)" },
  { name: "Logistic Regression", color: "hsl(271, 81%, 56%)" },
  { name: "Statistical Analysis", color: "hsl(347, 77%, 50%)" },
];

const SportsAnalyticsPage = () => (
  <div className="adv-theme min-h-screen">
    <Navbar />
    <div className="pt-20 pb-16">
      <div className="container mx-auto px-4 max-w-6xl">

        {/* Back */}
        <Link to="/projects" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-6 group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Projects
        </Link>

        {/* Hero banner */}
        <motion.div initial="hidden" animate="show" custom={0} variants={fade}
          className="relative rounded-3xl overflow-hidden mb-8 p-8 md:p-12"
          style={{ background: "linear-gradient(135deg, hsl(222, 47%, 14%), hsl(222, 47%, 20%), hsl(43, 96%, 56% / 0.3))" }}
        >
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40" />
          <div className="relative z-10">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full bg-primary/20 text-primary backdrop-blur-sm mb-4">
              <Trophy size={14} /> 2nd Place — Sharks Innovation Competition
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground leading-tight mb-3">
              Sports Data Analytics
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl">
              Optimizing youth sports development through data-driven insights on athlete retention, budget allocation, and performance patterns.
            </p>
          </div>
        </motion.div>

        {/* KPI Cards */}
        <motion.div initial="hidden" animate="show" custom={1} variants={fade} className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {kpis.map((k) => (
            <div key={k.label} className="rounded-2xl bg-card border border-border p-5 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 hover:border-primary/30">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${k.color}20` }}>
                  <k.icon size={20} style={{ color: k.color }} />
                </div>
                <span className={`inline-flex items-center gap-0.5 text-xs font-semibold px-2 py-0.5 rounded-full ${k.up ? "bg-[hsl(160,84%,39%)]/15 text-[hsl(160,84%,39%)]" : "bg-primary/15 text-primary"}`}>
                  {k.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                  {k.trend}
                </span>
              </div>
              <p className="text-2xl font-bold text-foreground">{k.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{k.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Overview */}
        <motion.section initial="hidden" whileInView="show" viewport={{ once: true }} custom={2} variants={fade} className="mb-8">
          <DashCard title="Project Overview" icon={<Target size={20} />} accent="hsl(43, 96%, 56%)">
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
        </motion.section>

        {/* Budget section */}
        <motion.section initial="hidden" whileInView="show" viewport={{ once: true }} custom={3} variants={fade} className="mb-8">
          <SectionHeader title="Challenge #1" subtitle="Budget Concentration Analysis" color="hsl(43, 96%, 56%)" />
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <DashCard title="Budget by Sport" icon={<BarChart3 size={18} />} accent="hsl(43, 96%, 56%)" compact>
              <BudgetChart />
            </DashCard>
            <DashCard title="Budget Share" icon={<DollarSign size={18} />} accent="hsl(271, 81%, 56%)" compact>
              <BudgetPieChart />
            </DashCard>
          </div>
          <DashCard title="Logistic Regression — Pro Probability" icon={<TrendingUp size={18} />} accent="hsl(160, 84%, 39%)" compact>
            <p className="text-xs text-muted-foreground mb-4">Predicted probability of becoming professional vs years of training across sport categories</p>
            <LogisticRegressionChart />
            <InsightBox text="Athletes in smaller sports show a steeper improvement curve, suggesting untapped potential if funding is redistributed." color="hsl(43, 96%, 56%)" />
          </DashCard>
        </motion.section>

        {/* Dropout section */}
        <motion.section initial="hidden" whileInView="show" viewport={{ once: true }} custom={4} variants={fade} className="mb-8">
          <SectionHeader title="Challenge #2" subtitle="Athlete Dropout During Transitions" color="hsl(347, 77%, 50%)" />
          <DashCard title="Dropout Rate by Age Group" icon={<TrendingDown size={18} />} accent="hsl(347, 77%, 50%)" compact>
            <p className="text-xs text-muted-foreground mb-4">Comparing competitive vs non-competitive athlete dropout across development stages</p>
            <DropoutCharts />
            <InsightBox text="The largest dropout spike occurs in mid-development stages, indicating a need for transition support programs." color="hsl(347, 77%, 50%)" />
          </DashCard>
        </motion.section>

        {/* Insights */}
        <motion.section initial="hidden" whileInView="show" viewport={{ once: true }} custom={5} variants={fade} className="mb-8">
          <SectionHeader title="Analysis" subtitle="Key Findings" color="hsl(217, 91%, 60%)" />
          <div className="grid sm:grid-cols-2 gap-4">
            {insights.map((ins, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="rounded-2xl bg-card border border-border p-5 shadow-sm flex gap-4 items-start hover:shadow-md transition-all hover:-translate-y-0.5 hover:border-primary/30"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${ins.color}20` }}>
                  <ins.icon size={20} style={{ color: ins.color }} />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: ins.color }}>Finding {i + 1}</span>
                  <p className="text-sm text-foreground mt-1 font-medium">{ins.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Recommendations */}
        <motion.section initial="hidden" whileInView="show" viewport={{ once: true }} custom={6} variants={fade} className="mb-8">
          <SectionHeader title="Strategy" subtitle="Recommendations" color="hsl(271, 81%, 56%)" />
          <div className="grid md:grid-cols-3 gap-4">
            {recommendations.map((r, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}
                className="rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 group"
              >
                <div className={`h-1.5 bg-gradient-to-r ${r.gradient}`} />
                <div className="bg-card border border-border border-t-0 p-6">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${r.gradient} flex items-center justify-center mb-4 shadow-md`}>
                    <r.icon size={20} className="text-white" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{r.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Tools */}
        <motion.section initial="hidden" whileInView="show" viewport={{ once: true }} custom={7} variants={fade} className="mb-8">
          <DashCard title="Tools & Methods" icon={<Wrench size={18} />} accent="hsl(43, 96%, 56%)">
            <div className="flex flex-wrap gap-3">
              {tools.map((t) => (
                <span key={t.name} className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-xl bg-secondary border border-border shadow-sm hover:shadow-md transition-all hover:border-primary/30">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: t.color }} />
                  {t.name}
                </span>
              ))}
            </div>
          </DashCard>
        </motion.section>

        {/* Impact */}
        <motion.section initial="hidden" whileInView="show" viewport={{ once: true }} custom={8} variants={fade}>
          <div className="rounded-3xl overflow-hidden relative p-10 md:p-14 text-center"
            style={{ background: "linear-gradient(135deg, hsl(222, 47%, 14%), hsl(222, 47%, 20%), hsl(43, 96%, 56% / 0.2))" }}>
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40" />
            <div className="relative z-10">
              <Zap size={32} className="text-primary mx-auto mb-4" />
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">Project Impact</h2>
              <p className="text-muted-foreground max-w-xl mx-auto text-base leading-relaxed">
                This project demonstrates how data analytics can support strategic decisions in sports organizations, improving both athlete development and resource allocation.
              </p>
            </div>
          </div>
        </motion.section>

      </div>
    </div>
    <Footer />
  </div>
);

/* ─── Sub-components ─── */

const DashCard = ({ title, icon, accent, compact, children }: {
  title: string; icon: React.ReactNode; accent?: string; compact?: boolean; children: React.ReactNode;
}) => (
  <div className={`rounded-2xl bg-card border border-border shadow-sm ${compact ? "p-5" : "p-6 md:p-8"} mt-4`}>
    <div className="flex items-center gap-2.5 mb-4">
      <span style={{ color: accent || "hsl(43, 96%, 56%)" }}>{icon}</span>
      <h2 className={`${compact ? "text-sm" : "text-lg"} font-bold text-foreground`}>{title}</h2>
    </div>
    {children}
  </div>
);

const SectionHeader = ({ title, subtitle, color }: { title: string; subtitle: string; color: string }) => (
  <div className="flex items-center gap-3 mb-1">
    <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full" style={{ background: `${color}20`, color }}>{title}</span>
    <h2 className="text-xl font-bold text-foreground">{subtitle}</h2>
  </div>
);

const InsightBox = ({ text, color }: { text: string; color?: string }) => (
  <div className="mt-5 rounded-xl p-4 flex gap-3 items-start border" style={{ background: `${color || "hsl(43, 96%, 56%)"}10`, borderColor: `${color || "hsl(43, 96%, 56%)"}30` }}>
    <Lightbulb size={18} style={{ color: color || "hsl(43, 96%, 56%)" }} className="shrink-0 mt-0.5" />
    <p className="text-sm text-muted-foreground">{text}</p>
  </div>
);

export default SportsAnalyticsPage;
