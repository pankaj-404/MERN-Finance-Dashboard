import DashboardBox from "@/components/DashboardBox";
import { Box, useMediaQuery, useTheme } from "@mui/material";

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {};
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Dashboard = (props: Props) => {
  const { palette } = useTheme();
  const isAboveMediumScreen = useMediaQuery("(min-width:1200px");
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
      <DashboardBox gridArea="a">a</DashboardBox>
      <DashboardBox gridArea="b">b</DashboardBox>
      <DashboardBox gridArea="c">c</DashboardBox>
      <DashboardBox gridArea="d">d</DashboardBox>
      <DashboardBox gridArea="e">e</DashboardBox>
      <DashboardBox gridArea="f">f</DashboardBox>
      <DashboardBox gridArea="g">g</DashboardBox>
      <DashboardBox gridArea="h">h</DashboardBox>
      <DashboardBox gridArea="i">i</DashboardBox>
      <DashboardBox gridArea="j">j</DashboardBox>
    </Box>
  );
};

export default Dashboard;
