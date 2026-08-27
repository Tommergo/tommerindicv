import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const makeData = (compBase: number[], nonCompBase: number[]) =>
  compBase.map((v, i) => ({
    age: `${10 + i * 2}-${12 + i * 2}`,
    competitive: v,
    nonCompetitive: nonCompBase[i],
  }));

const panels = [
  { label: "Small Sports", data: makeData([5, 12, 22, 15, 8], [3, 8, 14, 10, 6]), color: "hsl(160, 84%, 39%)" },
  { label: "Medium Sports", data: makeData([8, 18, 30, 20, 12], [4, 10, 18, 12, 7]), color: "hsl(38, 92%, 50%)" },
  { label: "Large Sports", data: makeData([10, 22, 38, 28, 18], [6, 14, 24, 16, 10]), color: "hsl(217, 91%, 60%)" },
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
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 30%, 22%)" vertical={false} />
            <XAxis dataKey="age" tick={{ fontSize: 9, fill: "hsl(215, 20%, 60%)" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 9, fill: "hsl(215, 20%, 60%)" }} unit="%" axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: 12, border: "none", fontSize: 11, boxShadow: "0 8px 24px rgba(0,0,0,0.3)", padding: "6px 12px", background: "hsl(222, 47%, 16%)", color: "hsl(210, 40%, 96%)" }} />
            <Legend wrapperStyle={{ fontSize: 10, color: "hsl(215, 20%, 60%)" }} />
            <Area type="monotone" dataKey="competitive" stroke="hsl(347, 77%, 50%)" fill="hsl(347, 77%, 50%)" fillOpacity={0.12} strokeWidth={2.5} name="Competitive" />
            <Area type="monotone" dataKey="nonCompetitive" stroke="hsl(217, 91%, 60%)" fill="hsl(217, 91%, 60%)" fillOpacity={0.12} strokeWidth={2} name="Non-Competitive" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    ))}
  </div>
);

export default DropoutCharts;
