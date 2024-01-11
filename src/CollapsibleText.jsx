import React, { useState, useEffect } from "react";
import { useTheme, useMediaQuery, Typography, Button, IconButton, Card } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const CollapsibleText = ({ text }) => {
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [isCollapsed, setIsCollapsed] = useState(isMediumScreen);

  useEffect(() => {
    setIsCollapsed(isMediumScreen);
  }, [isMediumScreen]);

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <Card
      sx={{
        boxShadow: "none",
        borderRadius: "0",
        p: 2,
      }}
    >
      <Typography variant="body2" color="textSecondary">
        {isCollapsed ? text.slice(0, 300) + "..." : text}
      </Typography>
      <IconButton
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          backgroundColor: "transparent",
          "&:hover": {
            backgroundColor: "white",
            // Reset on touch devices, it doesn't add specificity
            "@media (hover: none)": {
              backgroundColor: "transparent",
            },
          },
        }}
        onClick={handleToggle}
        size="small"
      >
        <Typography variant="body2" color="primary" component="span">
          {isCollapsed ? "Read More" : "Read Less"}
        </Typography>
        {isCollapsed ? <ExpandMoreIcon color="primary" /> : <ExpandLessIcon color="primary" />}
      </IconButton>
    </Card>
  );
};

export default CollapsibleText;
