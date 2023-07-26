import { useTheme } from "@mui/material";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LineChart,
  Line,
  Legend,
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
type BiaxialLineChartProps = {
  data: Array<Data>;
  xAxisDataKey: string;
  areaKey1: string;
  areaKey2: string;
};

const BiaxialLineChart = ({
  data: lineChartData,
  xAxisDataKey,
  areaKey1,
  areaKey2,
}: BiaxialLineChartProps) => {
  const { palette } = useTheme();
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={lineChartData}
        margin={{
          top: 30,
          right: 25,
          left: 10,
          bottom: 65,
        }}
      >
        <CartesianGrid vertical={false} stroke={palette.grey[800]} />
        <XAxis
          dataKey={xAxisDataKey}
          tickLine={false}
          axisLine={{ strokeWidth: "0" }}
          style={{ fontSize: "12px" }}
        />
        <YAxis
          yAxisId="left"
          tickLine={false}
          axisLine={false}
          style={{ fontSize: "12px" }}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          tickLine={false}
          axisLine={false}
          style={{ fontSize: "12px" }}
        />
        <Tooltip />
        <Legend
          height={20}
          wrapperStyle={
            {
              // margin: "0 0 10px 0",
            }
          }
        />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey={areaKey2}
          stroke={palette.tertiary[500]}
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey={areaKey1}
          stroke={palette.primary.main}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default BiaxialLineChart;
