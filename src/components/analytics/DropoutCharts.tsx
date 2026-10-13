import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const makeData = (compBase: number[], nonCompBase: number[]) =>
  compBase.map((v, i) => ({
    age: `${10 + i * 2}-${12 + i * 2}`,
    competitive: v,
    nonCompetitive: nonCompBase[i],
  }));

const panels = [
  { label: "Small Sports", data: makeData([5, 12, 22, 15, 8], [3, 8, 14, 10, 6]), color: "hsl(120, 28%, 32%)" },
  { label: "Medium Sports", data: makeData([8, 18, 30, 20, 12], [4, 10, 18, 12, 7]), color: "hsl(30, 75%, 50%)" },
  { label: "Large Sports", data: makeData([10, 22, 38, 28, 18], [6, 14, 24, 16, 10]), color: "hsl(205, 38%, 36%)" },
];

const DropoutCharts = () => (
  <div className="grid md:grid-cols-3 gap-4">
    {panels.map((p) => (
      <div key={p.label} className="rounded-xl bg-secondary/50 border border-border p-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: p.color }} />
          <h4 className="text-sm font-semibold text-foreground">{p.label}</h4>
        </div>
        <ResponsiveContainer width="100%" height={180}>
          <AreaChart data={p.data} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(35, 28%, 80%)" vertical={false} />
            <XAxis dataKey="age" tick={{ fontSize: 9, fill: "hsl(28, 18%, 42%)" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 9, fill: "hsl(28, 18%, 42%)" }} unit="%" axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: 12, border: "none", fontSize: 11, boxShadow: "0 8px 24px rgba(0,0,0,0.3)", padding: "6px 12px", background: "hsl(22, 50%, 18%)", color: "hsl(42, 55%, 93%)" }} />
            <Legend wrapperStyle={{ fontSize: 10, color: "hsl(28, 18%, 42%)" }} />
            <Area type="monotone" dataKey="competitive" stroke="hsl(6, 60%, 40%)" fill="hsl(6, 60%, 40%)" fillOpacity={0.12} strokeWidth={2.5} name="Competitive" />
            <Area type="monotone" dataKey="nonCompetitive" stroke="hsl(205, 38%, 36%)" fill="hsl(205, 38%, 36%)" fillOpacity={0.12} strokeWidth={2} name="Non-Competitive" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    ))}
  </div>
);

export default DropoutCharts;
