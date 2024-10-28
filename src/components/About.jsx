import React from "react";
import { NavLink } from "react-router-dom";
import { Box, Typography, Button, Grid } from "@mui/material";
import { styled } from "@mui/system";

const StyledContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(5),
  margin: theme.spacing(5, 0),
}));

const StyledImage = styled("img")({
  height: "400px",
  width: "400px",
});

const StyledTitle = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  marginBottom: theme.spacing(4),
}));

const About = () => {
  return (
    <StyledContainer>
      <Grid container spacing={2}>
        <Grid item md={6}>
          <StyledTitle variant="h1">About Us</StyledTitle>
          <Typography variant="body1" marginBottom={4}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo
            molestiae earum rem doloremque, nihil delectus ullam error
            consectetur? Dicta, non exercitationem in consectetur totam dolorum
            at voluptate laudantium aliquam, officiis perspiciatis molestias
            reiciendis consequuntur ullam perferendis velit blanditiis
            distinctio assumenda a maxime reprehenderit atque. Nam eius rerum
            distinctio, a illo earum, optio molestias nostrum maxime quibusdam
            delectus, adipisci impedit? Nam corporis reiciendis minus quod
            eaque, laborum veritatis voluptatibus id maiores tempore accusantium
            recusandae perspiciatis, officia cum ad maxime fuga repellendus a
            magni consequatur. Unde adipisci hic provident est sint corporis,
            dolorem esse autem soluta molestiae optio quisquam eligendi
            obcaecati minima?
          </Typography>
          <NavLink to="/contact">
            <Button variant="outlined" color="primary" sx={{ paddingX: 3 }}>
              Contact Us
            </Button>
          </NavLink>
        </Grid>
        <Grid item md={6} container justifyContent="center">
          <StyledImage src="./about.png" alt="About Us" />
        </Grid>
      </Grid>
    </StyledContainer>
  );
};

export default About;
