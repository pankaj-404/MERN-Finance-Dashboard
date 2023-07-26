import { useTheme } from "@mui/material";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
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
type StackedAreaChartProps = {
  data: Array<Data>;
  xAxisDataKey: string;
  areaKey1: string;
  areaKey2: string;
};

const StackedAreaChart = ({
  data: areaChartData,
  xAxisDataKey,
  areaKey1,
  areaKey2,
}: StackedAreaChartProps) => {
  const { palette } = useTheme();
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        // width={500}
        // height={400}
        data={areaChartData}
        margin={{
          top: 30,
          right: 25,
          left: 10,
          bottom: 60,
        }}
      >
        <defs>
          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor={palette.primary[300]}
              stopOpacity={0.5}
            />
            <stop
              offset="95%"
              stopColor={palette.primary[300]}
              stopOpacity={0}
            />
          </linearGradient>
          <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor={palette.redAccent[300]}
              stopOpacity={0.5}
            />
            <stop
              offset="95%"
              stopColor={palette.redAccent[300]}
              stopOpacity={0}
            />
          </linearGradient>
        </defs>
        {/* <CartesianGrid strokeDasharray="3 3" /> */}

        <XAxis
          dataKey={xAxisDataKey}
          tickLine={false}
          axisLine={{ strokeWidth: "0" }}
          style={{ fontSize: "12px" }}
        />
        <YAxis
          tickLine={false}
          axisLine={{ strokeWidth: "0" }}
          style={{ fontSize: "12px" }}
        />
        <Tooltip />
        <Area
          type="monotone"
          dataKey={areaKey2}
          stackId="1"
          dot={true}
          stroke={palette.redAccent[400]}
          fillOpacity={1}
          fill="url(#colorExpenses)"
        />
        <Area
          type="monotone"
          dataKey={areaKey1}
          stackId="1"
          stroke={palette.primary.main}
          dot={true}
          fillOpacity={1}
          fill="url(#colorRevenue)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default StackedAreaChart;
