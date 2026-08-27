import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "Football", value: 420 },
  { name: "Basketball", value: 380 },
  { name: "Swimming", value: 310 },
  { name: "Tennis", value: 120 },
  { name: "Judo", value: 90 },
  { name: "Other", value: 110 },
];

const COLORS = [
  "hsl(217, 91%, 60%)",
  "hsl(239, 84%, 67%)",
  "hsl(271, 81%, 56%)",
  "hsl(38, 92%, 50%)",
  "hsl(160, 84%, 39%)",
  "hsl(215, 20%, 75%)",
];

const BudgetPieChart = () => (
  <div>
    <ResponsiveContainer width="100%" height={240}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={55}
          outerRadius={90}
          paddingAngle={3}
          dataKey="value"
          stroke="none"
        >
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            borderRadius: 14,
            border: "none",
            fontSize: 12,
            boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
            padding: "8px 14px",
            background: "hsl(222, 47%, 16%)",
            color: "hsl(210, 40%, 96%)",
          }}
          formatter={(value: number) => [`₪${value}K`, "Budget"]}
        />
      </PieChart>
    </ResponsiveContainer>
    <div className="flex flex-wrap gap-3 justify-center mt-2">
      {data.map((d, i) => (
        <span key={d.name} className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: COLORS[i] }} />
          {d.name}
        </span>
      ))}
    </div>
  </div>
);

export default BudgetPieChart;
