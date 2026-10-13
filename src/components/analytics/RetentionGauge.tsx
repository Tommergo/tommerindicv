import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";

const data = [
  { name: "Retention", value: 66, fill: "hsl(205, 38%, 36%)" },
];

const RetentionGauge = () => (
  <div className="flex flex-col items-center">
    <div className="relative w-36 h-36">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="72%"
          outerRadius="100%"
          startAngle={210}
          endAngle={-30}
          data={data}
          barSize={12}
        >
          <RadialBar
            dataKey="value"
            cornerRadius={10}
            background={{ fill: "hsl(40, 40%, 86%)" }}
          />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-foreground">66%</span>
        <span className="text-[10px] text-muted-foreground">Retention</span>
      </div>
    </div>
    <p className="text-xs text-muted-foreground mt-2 text-center">Overall athlete retention rate</p>
  </div>
);

export default RetentionGauge;
