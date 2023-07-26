import { useTheme } from "@mui/material";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";

type Data = {
  id: string;
  _id: string;
  month: string;
  revenue: number;
  expenses: number;
  operationalExpenses: number;
  nonOperationalExpenses: number;
};
type BarChartProps = {
  data: Array<Data>;
  xAxisDataKey: string;
  areaKey1: string;
  areaKey2: string;
};

const SimpleBarChart = ({
  data: barChartData,
  xAxisDataKey,
  areaKey1,
  areaKey2,
}: BarChartProps) => {
  const { palette } = useTheme();
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={barChartData}
        margin={{
          top: 30,
          right: 25,
          left: 10,
          bottom: 60,
        }}
      >
        <defs>
          <linearGradient id="revenueColor" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor={`${palette.primary[300]}`}
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor={`${palette.primary[300]}`}
              stopOpacity={0}
            />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} stroke={palette.grey[800]} />
        <XAxis
          dataKey={xAxisDataKey}
          axisLine={false}
          tickLine={false}
          style={{ fontSize: "10px" }}
        />
        <YAxis axisLine={false} tickLine={false} style={{ fontSize: "10px" }} />
        <Tooltip />
        <Bar dataKey={areaKey1} fill="url(#revenueColor)" />
        {areaKey2 && <Bar dataKey={areaKey2} fill="url(#revenueColor)" />}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default SimpleBarChart;
