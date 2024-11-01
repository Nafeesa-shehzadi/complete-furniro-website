import React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Box,
  Button,
  Typography,
  TextField,
  InputAdornment,
  Grid2,
} from "@mui/material";
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import SellIcon from "@mui/icons-material/Sell";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import Search from "@mui/icons-material/Search";
import { Link } from "react-router-dom";

const theme = createTheme();

const HeroSection = styled(Box)(({ theme }) => ({
  backgroundImage: `url(./shop.png)`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  height: "70vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.common.black,
  textAlign: "center",
}));

const BlogComsec = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "flex-start",
  height: "auto",
  padding: theme.spacing(4),
  overflowX: "hidden",
  maxWidth: "100%",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column", // Stack on smaller screens
  },
}));

const BlogSection = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  width: "55%", // Default width
  padding: theme.spacing(5),
  [theme.breakpoints.down("md")]: {
    width: "100%", // Full width on smaller screens
  },
}));

const BlogNextSection = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  width: "25%", // Default width
  padding: theme.spacing(3),
  [theme.breakpoints.down("md")]: {
    width: "100%", // Full width on smaller screens
  },
}));

const Categories = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  height: "auto",
  overflowX: "hidden",
  width: "100%",
  padding: theme.spacing(1),
  gap: theme.spacing(2),
}));

const CategoryItem = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  paddingLeft: theme.spacing(2),
  paddingTop: theme.spacing(2),
  gap: theme.spacing(8),
}));

const Recentpost = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  height: "auto",
  width: "100%",
  padding: theme.spacing(2),
}));

const RecentPostItem = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  height: "auto",
  width: "100%",
  padding: theme.spacing(2),
}));

const PostImage = styled("img")(({ theme }) => ({
  width: 60,
  height: 60,
}));

const PostTitle = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  variant: "h6",
}));

const PostTextContainer = styled(Box)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  display: "flex",
  flexWrap: "wrap",
  gap: theme.spacing(0.5),
  width: "40%",
  height: "auto",
}));

const BlogSearch = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  height: "auto",
  width: "100%",
  marginTop: theme.spacing(2),
  marginLeft: theme.spacing(2),
}));

const BlogImage = styled("img")(({ theme }) => ({
  width: "100%",
  height: "auto",
  borderRadius: "10px",
}));

const IconContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  marginTop: theme.spacing(2),
  marginLeft: theme.spacing(0),
  gap: theme.spacing(7),
}));

const IconWithText = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  flexDirection: "row",
  alignItems: "start",
}));

const BlogTitle = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  width: "100%",
  variant: "h4",
  fontSize: 30,
}));

const BlogContent = styled(Typography)(({ theme }) => ({
  variant: "body1",
  width: "100%",
  marginBottom: theme.spacing(3),
}));

const BlogMore = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  color: theme.palette.primary.main,
  textDecoration: "underline",
  cursor: "pointer",
  variant: "body2",
}));

const ButtonContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  marginTop: theme.spacing(2),
  marginLeft: theme.spacing(70),
  width: "40%",
  maxWidth: "100%",
  gap: theme.spacing(2),
  [theme.breakpoints.down("md")]: {
    marginLeft: theme.spacing(0), // Reset margin for smaller screens
    flexDirection: "column", // Stack buttons vertically on smaller screens
    alignItems: "center", // Center buttons
    width: "100%", // Full width on smaller screens
  },
}));

const NextButtons = styled(Button)(({ theme }) => ({
  fontSize: 20,
  backgroundColor: "#e6d6bc",
  color: theme.palette.common.white,
  borderRadius: "7px",
}));

const ServiceBoxTitle = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  variant: "h6",
  textAlign: "center", // Center the text
  marginBottom: theme.spacing(1), // Add some space below the title
  marginTop: theme.spacing(1),
  width: "50%",
}));

const ServiceBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap", // Allow items to wrap onto the next line
  alignItems: "flex-start", // Align items at the start
  backgroundColor: "#e6d6bc",
  padding: theme.spacing(10, 2), // Reduce padding to prevent overflow
  height: "auto",
  gap: theme.spacing(1), // Space between items
  overflow: "hidden", // Prevent overflow
}));

const ServiceImage = styled("img")(({ theme }) => ({
  width: 60,
  height: 60,
  paddingLeft: theme.spacing(5),
}));

const ServiceTextContainer = styled(Box)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "flex-start",
  paddingTop: theme.spacing(2),
}));

const ServiceTitle = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  variant: "h6",
}));

const ServiceDescription = styled(Typography)(({ theme }) => ({
  variant: "body2",
  color: theme.palette.text.secondary,
}));

function Blog() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <HeroSection>
          <Box>
            <img src="mainlogo.png" alt="logo" />
            <Typography variant="h4" fontWeight="bold">
              Blog
            </Typography>
            <Typography
              variant="h5"
              component="div"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Link
                to="/"
                style={{
                  textDecoration: "none",
                  fontWeight: "bold",
                  color: "#000",
                  marginRight: "8px",
                }}
              >
                Home
              </Link>
              <NavigateNextOutlinedIcon />
              <Typography
                variant="h5"
                component="span"
                sx={{ marginLeft: "8px" }}
              >
                Blog
              </Typography>
            </Typography>
          </Box>
        </HeroSection>
        <BlogComsec>
          <BlogSection>
            <BlogImage src="blog.png" alt="blog1" />
            <IconContainer>
              <IconWithText>
                <PersonOutlineOutlinedIcon />
                <Typography variant="subtitle 3">admin </Typography>
              </IconWithText>
              <IconWithText>
                <CalendarMonthRoundedIcon />
                <Typography variant="subtitle 3">3 Sep 2024</Typography>
              </IconWithText>
              <IconWithText>
                <SellIcon />
                <Typography variant="subtitle 3">wood</Typography>
              </IconWithText>
            </IconContainer>
            <BlogTitle>Going all-in with millennial design</BlogTitle>
            <BlogContent>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              faucibus arcu nec ipsum congue, vitae pharetra ipsum fermentum.
              Nulla facilisi. Nullam non purus vel ipsum tincidunt imperdiet vel
              vel ipsum. Duis vel arcu vel sapien consectetur consectetur. Sed
              non nisi non ipsum varius bibendum. Donec non est ac justo auctor
              sagittis. Donec pharetra, massa eu condimentum vestibulum, ipsum
              tellus semper velit, ac facilisis felis nunc a turpis. Integer
              lobortis, nunc vel consectetur faucibus, mauris velit consectetur
              velit, in consectetur ligula ligula ut odio.
            </BlogContent>
            <BlogMore>Read more</BlogMore>
            <BlogImage src="blog2.png" alt="blog1" />
            <IconContainer>
              <IconWithText>
                <PersonOutlineOutlinedIcon />
                <Typography variant="subtitle 3">admin </Typography>
              </IconWithText>
              <IconWithText>
                <CalendarMonthRoundedIcon />
                <Typography variant="subtitle 3">3 Sep 2024</Typography>
              </IconWithText>
              <IconWithText>
                <SellIcon />
                <Typography variant="subtitle 3">wood</Typography>
              </IconWithText>
            </IconContainer>
            <BlogTitle>Exploring new ways of decorating </BlogTitle>
            <BlogContent>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              faucibus arcu nec ipsum congue, vitae pharetra ipsum fermentum.
              Nulla facilisi. Nullam non purus vel ipsum tincidunt imperdiet vel
              vel ipsum.
            </BlogContent>

            <BlogMore>Read more</BlogMore>

            <BlogImage src="blog3.png" alt="blog3" />
            <IconContainer>
              <IconWithText>
                <PersonOutlineOutlinedIcon />
                <Typography variant="subtitle 3">admin </Typography>
              </IconWithText>
              <IconWithText>
                <CalendarMonthRoundedIcon />
                <Typography variant="subtitle 3">3 Sep 2024</Typography>
              </IconWithText>
              <IconWithText>
                <SellIcon />
                <Typography variant="subtitle 3">wood</Typography>
              </IconWithText>
            </IconContainer>
            <BlogTitle>Handmade pieces that took time to make</BlogTitle>
            <BlogContent>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              faucibus arcu nec ipsum congue, vitae pharetra ipsum fermentum.
              Nulla facilisi. Nullam non purus vel ipsum tincidunt imperdiet vel
              vel ipsum. Duis vel arcu vel sapien consectetur consectetur. Sed
              non nisi non ipsum varius bibendum. Donec non est ac justo auctor
              sagittis. Donec pharetra, massa eu condimentum vestibulum, ipsum
              tellus semper velit, ac facilisis felis nunc a turpis. Integer
              lobortis, nunc vel consectetur faucibus, mauris velit consectetur
              velit, in consectetur ligula ligula ut odio.
            </BlogContent>
            <BlogMore>Read more</BlogMore>
            <ButtonContainer>
              <NextButtons
                sx={{
                  backgroundColor: "#ad8544",
                }}
              >
                1
              </NextButtons>
              <NextButtons>2</NextButtons>
              <NextButtons>3</NextButtons>
              <NextButtons>Next</NextButtons>
            </ButtonContainer>
          </BlogSection>
          <BlogNextSection>
            <BlogSearch>
              <TextField
                variant="outlined"
                placeholder="Search..."
                size="small"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    ),
                  },
                }}
              />
              <Categories>
                <ServiceBoxTitle>Categories</ServiceBoxTitle>
                <Grid2 container direction="column">
                  {/* Crafts */}
                  <Grid2 item xs={12}>
                    <CategoryItem>
                      <Typography>Crafts</Typography>
                      <Typography>2</Typography>
                    </CategoryItem>
                  </Grid2>

                  {/* Handmade */}
                  <Grid2 item xs={12}>
                    <CategoryItem>
                      <Typography>Handmade</Typography>
                      <Typography>8</Typography>
                    </CategoryItem>
                  </Grid2>

                  {/* Interior */}
                  <Grid2 item xs={12}>
                    <CategoryItem>
                      <Typography>Interior</Typography>
                      <Typography>5</Typography>
                    </CategoryItem>
                  </Grid2>

                  {/* Exterior */}
                  <Grid2 item xs={12}>
                    <CategoryItem>
                      <Typography>Exterior</Typography>
                      <Typography>2</Typography>
                    </CategoryItem>
                  </Grid2>
                </Grid2>
              </Categories>
              <Recentpost>
                <ServiceBoxTitle>Recent Posts</ServiceBoxTitle>
                <RecentPostItem>
                  <PostImage src="post1.png" alt="recent1" />
                  <PostTextContainer>
                    <PostTitle variant="subtitle 2">
                      Going all-in with millennial design
                    </PostTitle>
                    <Typography variant="subtiltle2">3 Aug 2024</Typography>
                  </PostTextContainer>
                </RecentPostItem>
                <RecentPostItem>
                  <PostImage src="post2.png" alt="recent2" />
                  <PostTextContainer>
                    <PostTitle variant="subtitle 2">
                      Exploring new ways of decorating
                    </PostTitle>
                    <Typography variant="subtiltle2">3 jan 2024</Typography>
                  </PostTextContainer>
                </RecentPostItem>
                <RecentPostItem>
                  <PostImage src="post3.png" alt="recent3" />
                  <PostTextContainer>
                    <PostTitle variant="subtitle 2">
                      Handmade pieces that took time to make
                    </PostTitle>
                    <Typography variant="subtiltle2">3 sep 2024</Typography>
                  </PostTextContainer>
                </RecentPostItem>
                <RecentPostItem>
                  <PostImage src="post4.png" alt="recent4" />
                  <PostTextContainer>
                    <PostTitle variant="subtitle 2">
                      Handmade pieces that took time to make
                    </PostTitle>
                    <Typography variant="subtiltle2">3 sep 2024</Typography>
                  </PostTextContainer>
                </RecentPostItem>
                <RecentPostItem>
                  <PostImage src="post5.png" alt="recent5" />
                  <PostTextContainer>
                    <PostTitle variant="subtitle 2">
                      Handmade pieces that took time to make
                    </PostTitle>
                    <Typography variant="subtiltle2">3 sep 2024</Typography>
                  </PostTextContainer>
                </RecentPostItem>
              </Recentpost>
            </BlogSearch>
          </BlogNextSection>
        </BlogComsec>
        <Grid2 item xs={12} sm={6}>
          <ServiceBox>
            <ServiceImage src="quality.png" alt="logo" />
            <ServiceTextContainer>
              <ServiceTitle>High Quality</ServiceTitle>
              <ServiceDescription>
                crafted from top materials
              </ServiceDescription>
            </ServiceTextContainer>
            <ServiceImage src="wrnty.png" alt="logo" />
            <ServiceTextContainer>
              <ServiceTitle>Warranty Protection</ServiceTitle>
              <ServiceDescription>over 2 years</ServiceDescription>
            </ServiceTextContainer>

            <ServiceImage src="shiping.png" alt="logo" />
            <ServiceTextContainer>
              <ServiceTitle>Free Shipping</ServiceTitle>
              <ServiceDescription>order over 150 $</ServiceDescription>
            </ServiceTextContainer>
            <ServiceImage src="support.png" alt="logo" />
            <ServiceTextContainer>
              <ServiceTitle>24 / 7 Support</ServiceTitle>
              <ServiceDescription>Dedicated support</ServiceDescription>
            </ServiceTextContainer>
          </ServiceBox>
        </Grid2>
      </ThemeProvider>
    </>
  );
}

export default Blog;
