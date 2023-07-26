import { CartesianGrid, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis, ZAxis } from 'recharts'
import {useTheme} from "@mui/material"
type Data = {
   _id: string;
  price : number;
  expense: number;
};
type ScatterChartProps = {
    data: Array<Data>;
    xAxisDataKey: string;
  areaKey1: string;
  areaKey2: string;
}

const SimpleScatterChart = ({
  data: productExpenseData,
  xAxisDataKey,
  areaKey1,
//   areaKey2,
}: ScatterChartProps) => {
    const {palette} = useTheme()
  return (
    <ResponsiveContainer width="100%" height="100%">
          <ScatterChart
            margin={{
              top: 20,
              right: 25,
              bottom: 40,
              left: -10,
            }}
          >
            <CartesianGrid stroke={palette.grey[800]} />
            <XAxis
              type="number"
              dataKey={xAxisDataKey}
              name={xAxisDataKey}
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
              tickFormatter={(v) => `$${v}`}
            />
            <YAxis
              type="number"
              dataKey={areaKey1}
              name={areaKey1}
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
              tickFormatter={(v) => `$${v}`}
            />
            <ZAxis type="number" range={[20]} />
            <Tooltip formatter={(v) => `$${v}`} />
            <Scatter
              name="Product Expense Ratio"
              data={productExpenseData}
              fill={palette.tertiary[500]}
            />
          </ScatterChart>
        </ResponsiveContainer>
  )
}

export default SimpleScatterChart