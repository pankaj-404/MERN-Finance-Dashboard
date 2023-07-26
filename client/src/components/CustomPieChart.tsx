import { Cell, Pie,PieChart } from 'recharts'
import { useTheme } from "@mui/material";

type Data = {
  name:string;
value:number;
};
type BarChartProps = {
  data: Array<Data>;
};

const CustomPieChart = ({
  data: pieChartData,
}: BarChartProps) => {
    const { palette } = useTheme();
    const pieColors = [palette.primary[800], palette.primary[300]];
  return (
    <PieChart
            width={110}
            height={100}
            margin={{
              top: 0,
              right: -10,
              left: 10,
              bottom: 0,
            }}
          >
            <Pie
              stroke="none"
              data={pieChartData}
              innerRadius={18}
              outerRadius={38}
              paddingAngle={2}
              dataKey="value"
            >
              {pieChartData?.map((entry, index) => (
                <Cell key={`cell-${index}=${entry}`} fill={pieColors[index]} />
              ))}
            </Pie>
          </PieChart>
  )
}

export default CustomPieChart