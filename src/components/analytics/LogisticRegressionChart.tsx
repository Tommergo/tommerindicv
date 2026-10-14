import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { ResponsiveContainer } from "@/components/journal/motion";

const data = Array.from({ length: 11 }, (_, i) => ({
  years: i,
  small: +(1 / (1 + Math.exp(-(0.9 * i - 4.5)))).toFixed(3),
  medium: +(1 / (1 + Math.exp(-(0.6 * i - 3.5)))).toFixed(3),
  large: +(1 / (1 + Math.exp(-(0.4 * i - 3)))).toFixed(3),
}));

const LogisticRegressionChart = () => (
  <ResponsiveContainer width="100%" height={260}>
    <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" stroke="hsl(35, 28%, 80%)" vertical={false} />
      <XAxis dataKey="years" tick={{ fontSize: 11, fill: "hsl(28, 18%, 42%)" }} axisLine={false} tickLine={false}
        label={{ value: "Years of Training", position: "insideBottomRight", offset: -5, fontSize: 10, fill: "hsl(28, 18%, 42%)" }} />
      <YAxis tick={{ fontSize: 11, fill: "hsl(28, 18%, 42%)" }} domain={[0, 1]} axisLine={false} tickLine={false} />
      <Tooltip contentStyle={{ borderRadius: 14, border: "none", fontSize: 12, boxShadow: "0 8px 30px rgba(0,0,0,0.3)", padding: "8px 14px", background: "hsl(22, 50%, 18%)", color: "hsl(42, 55%, 93%)" }} />
      <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8, color: "hsl(28, 18%, 42%)" }} />
      <Line type="monotone" dataKey="small" stroke="hsl(120, 28%, 32%)" strokeWidth={3} dot={false} name="Small Sports" />
      <Line type="monotone" dataKey="medium" stroke="hsl(30, 75%, 50%)" strokeWidth={2.5} dot={false} name="Medium Sports" strokeDasharray="6 3" />
      <Line type="monotone" dataKey="large" stroke="hsl(28, 18%, 48%)" strokeWidth={2} dot={false} name="Large Sports" strokeDasharray="4 4" />
    </LineChart>
  </ResponsiveContainer>
);

export default LogisticRegressionChart;
