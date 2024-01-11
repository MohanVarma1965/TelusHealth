import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Breadcrumbs, Link, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const ProviderDetailsBreadcrumbs = ({ name }) => {
  return (
    <Breadcrumbs
      sx={{ background: "#eeeeee", py: 2 }}
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
    >
      <Link sx={{ color: "black", textDecoration: "none" }} component={RouterLink} to="/">
        Mental Wellness
      </Link>
      <Link sx={{ color: "black", textDecoration: "none" }} component={RouterLink}>
        {name}
      </Link>
    </Breadcrumbs>
  );
};

export default ProviderDetailsBreadcrumbs;
