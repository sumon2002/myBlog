import React, { useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Button,
  Typography,
  Tabs,
  Tab,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import toast from "react-hot-toast";

const Header = () => {
  // Global State
  let isLogin = useSelector((state) => state.isLogin);
  isLogin = isLogin || localStorage.getItem("userId");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // console.log(isLogin);

  // State
  const [value, setValue] = useState();

  // Theme Dark
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#1976d2",
      },
    },
  });

  // Handle logout
  const handleLogout = () => {
    try {
      dispatch(authActions.logout());
      toast.success("Logout successfully!");
      navigate("/login");
      localStorage.clear();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <AppBar position="sticky">
          <Toolbar enableColorOnDark>
            <Typography variant="h4">MyBlog</Typography>
            {isLogin && (
              <Box display={"flex"} marginLeft={"auto"} marginRight={"auto"}>
                <Tabs
                  textColor="inherit"
                  value={value}
                  onChange={(e, val) => setValue(val)}
                >
                  <Tab label="Blogs" LinkComponent={Link} to="/blogs" />
                  <Tab label="My Blogs" LinkComponent={Link} to="/my-blogs" />
                  <Tab
                    label="Create Blog"
                    LinkComponent={Link}
                    to="/create-blog"
                  />
                </Tabs>
              </Box>
            )}
            <Box display={"flex"} marginLeft={"auto"}>
              {!isLogin && (
                <>
                  <Button
                    sx={{ margin: 1, color: "white" }}
                    LinkComponent={Link}
                    to="/login"
                  >
                    Login
                  </Button>
                  <Button
                    sx={{ margin: 1, color: "white" }}
                    LinkComponent={Link}
                    to="/register"
                  >
                    Register
                  </Button>
                </>
              )}
              {isLogin && (
                <Button
                  sx={{ margin: 1, color: "white" }}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              )}
            </Box>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </>
  );
};

export default Header;
