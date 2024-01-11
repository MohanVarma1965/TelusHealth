import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  Button,
  CircularProgress,
  Box,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SchoolIcon from "@mui/icons-material/School";
import LanguageIcon from "@mui/icons-material/Language";
import { fetchProvider } from "./api";
import CollapsibleText from "./CollapsibleText";
import ProviderDetailsBreadcrumbs from "./ProviderDetailsBreadcrumbs";

const ProviderDetails = () => {
  const { id } = useParams();
  const [provider, setProvider] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const theme = useTheme();
  const matchesMediumUp = useMediaQuery(theme.breakpoints.up("md"));

  useEffect(() => {
    fetchProvider(id)
      .then((data) => {
        setProvider(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return (
      <Container sx={{ display: "flex", justifyContent: "center", pt: "1" }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error || !provider) {
    return (
      <Container maxWidth="sm">
        <Typography variant="body1">Error: Could not fetch provider details.</Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Card
        sx={{
          boxShadow: "none",
          borderRadius: "0",
          maxWidth: 700,
          mx: "auto",
          my: 4,
          borderRadius: 0,
          padding: 0,
          "& .MuiCardContent-root": {
            padding: 0,
            "&:last-child": {
              paddingBottom: 0,
            },
          },
        }}
      >
        {matchesMediumUp && <ProviderDetailsBreadcrumbs name={provider.name} />}
        <CardContent sx={{ padding: 0 }}>
          <Grid container spacing={0}>
            <Grid
              item
              xs={12}
              sm={12}
              md={4}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                background: "#eeeeee",
                margin: 0,
                padding: 0,
                paddingRight: { xs: 0, md: 2 },
                "& > .MuiGrid-item": {
                  padding: 0,
                },
              }}
            >
              <Avatar
                src={provider.avatarUrl || "/default-avatar.png"}
                alt={provider.name}
                sx={{
                  width: { xs: "100%", md: "200" },
                  height: { xs: 200, md: 200 },
                  border: "2px solid",
                  borderRadius: "0",
                }}
              />
            </Grid>

            <Grid
              item
              xs={12}
              sm={12}
              md={8}
              sx={{
                padding: 2,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography variant="h5" sx={{ mt: 2, pl: 2 }}>
                {provider.name}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary" sx={{ pl: 2 }}>
                {provider.title}
              </Typography>

              <CollapsibleText text={provider.bio} />

              <ListItem>
                <ListItemIcon>
                  <LocationOnIcon sx={{ color: "#d8cbe5" }} />
                </ListItemIcon>
                <ListItemText disableTypography>
                  <Typography variant="body2" color="textSecondary">
                    Location
                  </Typography>
                  <Typography variant="body1"> {provider.location}</Typography>
                </ListItemText>
              </ListItem>

              <ListItem>
                <ListItemIcon>
                  <SchoolIcon sx={{ color: "#d8cbe5" }} />
                </ListItemIcon>
                <ListItemText disableTypography>
                  <Typography variant="body2" color="textSecondary">
                    Education
                  </Typography>
                  <Typography variant="body1"> {provider.education}</Typography>
                </ListItemText>
              </ListItem>

              <ListItem>
                <ListItemIcon>
                  <LanguageIcon sx={{ color: "#d8cbe5" }} />
                </ListItemIcon>
                <ListItemText disableTypography>
                  <Typography variant="body2" color="textSecondary">
                    Language
                  </Typography>
                  <Typography variant="body1"> {provider.languages.join(", ")}</Typography>
                </ListItemText>
              </ListItem>

              {/* Button */}
              <Button variant="contained" color="primary" sx={{ mt: 2, background: "#613889", borderRadius: "20px" }}>
                Book with us
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProviderDetails;
