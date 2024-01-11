import React, { useState, useEffect } from "react";
import { fetchProviders } from "./api";
import {
  Container,
  Chip,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  CircularProgress,
  Box,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useNavigate } from "react-router-dom";

const ProvidersList = () => {
  const [providers, setProviders] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleListItemClick = (providerId) => {
    navigate(`/provider/${providerId}`);
  };

  useEffect(() => {
    fetchProviders()
      .then((data) => {
        setProviders(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  });

  if (isLoading) {
    return (
      <Container sx={{ display: "flex", justifyContent: "center", pt: "1" }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography variant="body1">Error: Could not fetch providers.</Typography>
      </Container>
    );
  }

  return (
    <Box sx={{}}>
      <Box
        sx={{
          width: "100%",
          background: "white",
          borderBottom: 1,
          borderColor: "grey.200",
          boxShadow: "0px 4px 2px -2px rgba(0,0,0,0.2)",
        }}
      >
        <Box sx={{ m: 0, px: 4, py: { xs: 4, md: 8 }, maxWidth: "700px", mx: "auto" }}>
          <Typography variant="h6" component="h4" gutterBottom>
            Browse our providers
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" gutterBottom>
            Mental Wellness
          </Typography>
          <Chip
            avatar={
              <Avatar>
                <LocationOnIcon sx={{ color: "#1970e6", background: "white" }} />
              </Avatar>
            }
            label="ON"
            clickable
            sx={{ mt: 2, background: "white", border: "1px solid grey" }}
          />
        </Box>
      </Box>
      <List sx={{ maxWidth: "700px", mx: "auto" }}>
        <ListItem key={"count"}>
          <ListItemText
            primary={`${providers?.length} providers in Ontario`}
            primaryTypographyProps={{ variant: "body2" }}
          />
        </ListItem>

        {providers.map((provider) => (
          <ListItem
            key={provider.id}
            sx={{
              display: "block",
              my: 1,
              background: "white",
              borderRadius: 1,
              boxShadow: 1,
              boxShadow: "none",
              ":hover": {
                cursor: "pointer",
                backgroundColor: "rgba(0, 0, 0, 0.04)",
              },
            }}
            onClick={() => handleListItemClick(provider.id)}
          >
            <Box sx={{ display: "flex" }}>
              <ListItemAvatar>
                <Avatar sx={{ border: "5px solid #f6f3f3" }} src={provider.avatarUrl || "/default-avatar.png"} />
              </ListItemAvatar>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  {provider.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {provider.title}
                </Typography>
              </Box>
            </Box>
            <Box>
              <Typography
                sx={{
                  display: "-webkit-box",
                  overflow: "hidden",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 2,
                  textOverflow: "ellipsis",
                }}
                component="p"
                variant="body2"
              >
                {provider.bio}
              </Typography>
            </Box>
            <Box
              component="span"
              size="small"
              sx={{
                display: "inline-block",
                background: "#e0e4fc",
                borderRadius: 4,
                padding: "4px 11px",
                my: 2,
              }}
            >
              Available {provider?.availabilty}
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ProvidersList;
