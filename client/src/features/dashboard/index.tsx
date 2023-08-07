import SimpleBarChart from "@/components/BarChart";
import BiaxialLineChart from "@/components/BiaxialLineChart";
import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import CustomPieChart from "@/components/CustomPieChart";
import StackedAreaChart from "@/components/StackedAreaChart";
import { useGetKpisQuery, useGetProductsQuery,useGetTransactionsQuery } from "@/state/apis";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useMemo } from "react";
import FlexBetween from "@/components/FlexBetween";
import SimpleScatterChart from "@/components/SimpleScatterChart";
import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import { Cell, Pie, PieChart } from "recharts";

// eslint-disable-next-line @typescript-eslint/ban-types
const gridLargeScreenTemplate = `
"a b c"
"a b c"
"a b c"
"a b f"
"d e f"
"d e f"
"d h i"
"g h i"
"g h j"
"g h j"
`;
const gridMediumScreenTemplate = `
"a" 
"a" 
"a" 
"a" 
"b" 
"b" 
"b" 
"b" 
"c"
"c"
"c"
"d"
"d"
"d"
"e"
"e"
"f"
"f"
"f"
"f"
"g"
"g"
"g"
"h"
"h"
"h"
"h"
"i"
"i"
"j"
"j"
`;

type revenueData = {
  month: string;
  revenue: number;
};
type revenueExpensesData = {
  month: string;
  revenue: number;
  expenses: number;
};
type revenueProfitData = {
  month: string;
  revenue: number;
  expenses: number;
};
type operationalExpensesData = {
  month: string;
  operationalExpenses: number;
  nonOperationalExpenses: number;
};
type productExpenseData = {
  _id: string;
  price : number;
  expense: number;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Dashboard = () => {
  const { palette } = useTheme();
  const isAboveMediumScreen = useMediaQuery("(min-width:1200px");
  const pieColors = [palette.primary[400], palette.redAccent[100]];
  // eslint-disable-next-line
  const { data } = useGetKpisQuery();
  // eslint-disable-next-line
  const { data:productsData } = useGetProductsQuery();
  // eslint-disable-next-line
  const { data:transactionsData } = useGetTransactionsQuery();
  const revenue = useMemo(() => {
    return (
      data &&
      data[0]?.monthlyData?.map(({ month, revenue }: revenueData) => {
        return {
          name: month.substring(0, 3),
          revenue: revenue,
        };
      })
    );
  }, [data]);

  const revenueExpenses = useMemo(() => {
    return (
      data &&
      data[0]?.monthlyData?.map(
        ({ month, revenue, expenses }: revenueExpensesData) => {
          return {
            name: month.substring(0, 3),
            revenue: revenue,
            expenses: expenses,
          };
        }
      )
    );
  }, [data]);

  const revenueProfit = useMemo(() => {
    return (
      data &&
      data[0]?.monthlyData?.map(
        ({ month, revenue, expenses }: revenueProfitData) => {
          return {
            name: month.substring(0, 3),
            revenue: revenue,
            profit:  parseInt((revenue - expenses).toFixed(2)),
          };
        }
      )
    );
  }, [data]);

   const operationalExpenses = useMemo(() => {
    return (
      data &&
      data[0]?.monthlyData?.map(
        ({ month, operationalExpenses, nonOperationalExpenses }:operationalExpensesData) => {
          return {
            name: month.substring(0, 3),
            revenue: operationalExpenses,
            profit: nonOperationalExpenses,
            // "Operational Expenses": operationalExpenses,
            // "Non Operational Expenses": nonOperationalExpenses,
          };
        }
      )
    );
  }, [data]);

 const pieChartData = useMemo(() => {
    if (data) {
      const totalExpenses = data[0].totalExpenses;
      return Object.entries(data[0].expensesByCategory).map(
        ([key, value]) => {
          return [
            {
              name: key,
              value: value,
            },
            {
              name: `${key} of Total`,
              value: (totalExpenses - value),
            },
          ];
        }
      );
    }
  }, [data]);

  const productColumns = [
    {
      field: "_id",
      headerName: "id",
      flex: 1,
    },
    {
      field: "expense",
      headerName: "Expense",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
  ];

  const transactionColumns = [
    {
      field: "_id",
      headerName: "id",
      flex: 1,
    },
    {
      field: "buyer",
      headerName: "Buyer",
      flex: 0.67,
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 0.35,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
    {
      field: "productIds",
      headerName: "Count",
      flex: 0.1,
      renderCell: (params: GridCellParams) =>
        (params.value as Array<string>).length
    },
  ];

  const pieData = [
  { name: "Group A", value: 600 },
  { name: "Group B", value: 400 },
];

  const productExpense = useMemo(() => {
    return (
      productsData &&
      productsData?.map(({ _id, price, expense }:productExpenseData) => {
        return {
          id: _id,
          price: price,
          expense: expense,
        };
      })
    );
  }, [productsData]);

  return (
    <Box
      color={palette.grey[300]}
      width="100%"
      height="100%"
      display="grid"
      gap="1rem"
      sx={
        isAboveMediumScreen
          ? {
              gridTemplateAreas: gridLargeScreenTemplate,
              gridTemplateColumns: "repeat(3, minmax(370px, 1fr))",
              gridTemplateRows: "repeat(10, minmax(60px, 1fr))",
            }
          : {
              gridTemplateAreas: gridMediumScreenTemplate,
              gridAutoColumns: "1fr",
              gridAutoRows: "80px",
            }
      }
    >
      <DashboardBox gridArea="a">
        <BoxHeader
          title={"Revenue and Expenses"}
          subtitle={
            "top line represents revenue, bottom line represents expenses"
          }
          sideText={"+6%"}
        />
        <StackedAreaChart
          data={revenueExpenses}
          xAxisDataKey="name"
          areaKey1="revenue"
          areaKey2="expenses"
        />
      </DashboardBox>
      <DashboardBox gridArea="b">
        <BoxHeader
          title={"Revenue and Profit"}
          subtitle={
            "top line represents revenue, bottom line represents profit"
          }
          sideText={"+6%"}
        />
        <BiaxialLineChart
          data={revenueProfit}
          xAxisDataKey="name"
          areaKey1="revenue"
          areaKey2="profit"
        />
      </DashboardBox>
      <DashboardBox gridArea="c">
        <BoxHeader
          title="Revenue Month by Month"
          subtitle="graph representing the revenue month by month"
          sideText="+4%"
        />
        <SimpleBarChart
          data={revenue}
          xAxisDataKey="name"
          areaKey1="revenue"
          areaKey2=""
        />
      </DashboardBox>
      <DashboardBox gridArea="d">
        <BoxHeader
          title={"Operational vs Non-Operational Expenses"}
          subtitle={""}
          sideText={"+6%"}
        />
        <BiaxialLineChart
          data={operationalExpenses}
          xAxisDataKey="name"
          areaKey1="profit"

          areaKey2="revenue"
          // areaKey1="Non Operational Expenses"
          // areaKey2="Operational Expenses"
        />
      </DashboardBox>
      <DashboardBox gridArea="e">
        <BoxHeader
          title={"Campaigns and Targets"}
          subtitle={""}
          sideText={"+6%"}
        />
        <FlexBetween mt="0.25rem" gap="1.5rem" pr="1rem">
        <CustomPieChart data={pieData} />
        <Box ml="-0.7rem" flexBasis="40%" textAlign="center">
            <Typography variant="h5">Target Sales</Typography>
            <Typography m="0.3rem 0" variant="h3" color={palette.primary[300]}>
              83
            </Typography>
            <Typography variant="h6">
              Finance goals of the campaign that is desired
            </Typography>
          </Box>
          <Box flexBasis="40%">
            <Typography variant="h5">Losses in Revenue</Typography>
            <Typography variant="h6">Losses are down 25%</Typography>
            <Typography mt="0.4rem" variant="h5">
              Profit Margins
            </Typography>
            <Typography variant="h6">
              Margins are up by 30% from last month.
            </Typography>
          </Box>
          </FlexBetween>
      </DashboardBox>
      <DashboardBox gridArea="f">
        <BoxHeader
          title="Product Prices vs Expenses"
          subtitle=""
          sideText="+4%"
        />
        <SimpleScatterChart 
        data={productExpense} 
xAxisDataKey={"price"}
areaKey1={"expense"} 
areaKey2={""} 
/>
      </DashboardBox>
      <DashboardBox gridArea="g">
        <BoxHeader
          title="List of Products"
          subtitle=""
          sideText={`${productsData?.length} products`}
        />
        <Box
          mt="0.5rem"
          p="0 0.5rem"
          height="75%"
          sx={{
            "& .MuiDataGrid-root": {
              color: palette.grey[300],
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnSeparator": {
              visibility: "hidden",
            },
          }}
        >
          <DataGrid
            columnHeaderHeight={25}
            rowHeight={35}
            hideFooter={true}
            rows={productsData || []}
            columns={productColumns}
          />
        </Box>
      </DashboardBox>
      <DashboardBox gridArea="h">
        <BoxHeader
          title="Recent Orders"
          subtitle=""
          sideText={`${transactionsData?.length} latest transactions`}
        />
        <Box
          mt="1rem"
          p="0 0.5rem"
          height="80%"
          sx={{
            "& .MuiDataGrid-root": {
              color: palette.grey[300],
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnSeparator": {
              visibility: "hidden",
            },
          }}
        >
          <DataGrid
            columnHeaderHeight={25}
            rowHeight={35}
            hideFooter={true}
            rows={transactionsData || []}
            columns={transactionColumns}
          />
        </Box>
      </DashboardBox>
      <DashboardBox gridArea="i">
        <BoxHeader
          title="Expense Breakdown by Category"
          subtitle=""
          sideText="+4%"
        />
        <FlexBetween mt="0.5rem" gap="0.5rem" p="0 1rem" textAlign="center">
          {pieChartData?.map((data, i) => (
            <Box key={`${data[0].name}-${i}`}>
              <PieChart width={110} height={window.innerHeight/8.5>95?window.innerHeight/8.5:75} margin={{bottom:0,top:0}}>
                <Pie
                  stroke="none"
                  data={data}
                  innerRadius={15}
                  outerRadius={window.innerHeight/20>30?window.innerHeight/20:30}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index]} />
                  ))}
                </Pie>
              </PieChart>
              <Typography variant="h5">{data[0].name}</Typography>
            </Box>
          ))}
        </FlexBetween>
      </DashboardBox>
      <DashboardBox gridArea="j">
        <BoxHeader
          title="Overall Summery and Explanation Data"
          subtitle=""
          sideText="+20%"
        />
        <Box
          height="15px"
          margin="1.25rem 1rem 0.4rem 1rem"
          bgcolor={palette.primary[800]}
          borderRadius="1rem"
        >
          <Box
            height="15px"
            bgcolor={palette.primary[600]}
            borderRadius="1rem"
            width="40%"
          ></Box>
        </Box>
        <Typography margin="0 1rem" variant="h6">
          Orci aliquam enim vel diam. Venenatis euismod id donec mus lorem etiam
          ullamcorper odio sed. Ipsum non sed gravida etiam urna egestas
          molestie volutpat et. Malesuada quis pretium aliquet lacinia ornare
          sed. In volutpat nullam at est id cum pulvinar nunc.
        </Typography>
      </DashboardBox>
    </Box>
  );
};

export default Dashboard;
