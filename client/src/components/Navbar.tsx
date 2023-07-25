import { Box, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import FlexBetween from "@/components/FlexBetween";
import PixIcon from "@mui/icons-material/Pix";

const Navbar = () => {
  const { palette } = useTheme();
  const [selected, setSelected] = useState("dashboard");
  return (
    <FlexBetween mb="0.25rem" p="0.5rem 0rem" color={palette.grey[300]}>
      <FlexBetween gap="0.75rem">
        <PixIcon sx={{ fontSize: "28px" }} />
        <Typography variant="h4" fontSize="20px">
          FinTracker
        </Typography>
      </FlexBetween>
      <FlexBetween gap="1.5rem">
        <Box sx={{ "&:hover": { color: palette.primary[300] } }}>
          <Link
            to="/"
            onClick={() => setSelected("dashboard")}
            style={{
              color: selected === "dashboard" ? "inherit" : palette.grey[600],
              textDecoration: "inherit",
            }}
          >
            Dashboard
          </Link>
        </Box>
        <Box sx={{ "&:hover": { color: palette.primary[300] } }}>
          <Link
            to="/prediction"
            onClick={() => setSelected("prediction")}
            style={{
              color: selected === "prediction" ? "inherit" : palette.grey[600],
              textDecoration: "inherit",
            }}
          >
            Prediction
          </Link>
        </Box>
      </FlexBetween>
    </FlexBetween>
  );
};

export default Navbar;
