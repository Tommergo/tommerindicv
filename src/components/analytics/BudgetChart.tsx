import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from "recharts";
import { ResponsiveContainer } from "@/components/journal/motion";

const data = [
  { name: "Football", budget: 420, size: "large" },
  { name: "Basketball", budget: 380, size: "large" },
  { name: "Swimming", budget: 310, size: "large" },
  { name: "Tennis", budget: 120, size: "medium" },
  { name: "Judo", budget: 90, size: "medium" },
  { name: "Badminton", budget: 45, size: "small" },
  { name: "Fencing", budget: 35, size: "small" },
  { name: "Table Tennis", budget: 30, size: "small" },
];

const colorMap: Record<string, string> = {
  large: "hsl(205, 38%, 36%)",
  medium: "hsl(24, 45%, 36%)",
  small: "hsl(120, 28%, 32%)",
};

const BudgetChart = () => (
  <div>
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data} margin={{ top: 5, right: 5, left: -15, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(35, 28%, 80%)" vertical={false} />
        <XAxis dataKey="name" tick={{ fontSize: 10, fill: "hsl(28, 18%, 42%)" }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 10, fill: "hsl(28, 18%, 42%)" }} axisLine={false} tickLine={false} />
        <Tooltip
          contentStyle={{
            borderRadius: 14,
            border: "none",
            fontSize: 12,
            boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
            padding: "8px 14px",
            background: "hsl(22, 50%, 18%)",
            color: "hsl(42, 55%, 93%)",
          }}
          formatter={(value: number) => [`₪${value}K`, "Budget"]}
        />
        <Bar dataKey="budget" radius={[8, 8, 0, 0]} barSize={28}>
          {data.map((entry, i) => (
            <Cell key={i} fill={colorMap[entry.size]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
    <div className="flex gap-5 mt-3 justify-center">
      {Object.entries(colorMap).map(([label, color]) => (
        <span key={label} className="flex items-center gap-1.5 text-[11px] text-muted-foreground capitalize">
          <span className="w-3 h-3 rounded-full shadow-sm" style={{ background: color }} />
          {label}
        </span>
      ))}
    </div>
  </div>
);

export default BudgetChart;
