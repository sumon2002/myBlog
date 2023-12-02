import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import { Typography, createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";

const theme = createTheme({
  palette: {
    mode: "dark", // Set the theme to dark mode
  },
});

const UserBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  //get user blogs
  const getUserBlogs = async () => {
    try {
      const id = localStorage.getItem("userId");
      const { data } = await axios.get(`/api/v1/blog/user-blog/${id}`);
      if (data?.success) {
        setBlogs(data?.userBlog.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserBlogs();
  }, []);
  console.log(blogs);
  return (
    <ThemeProvider theme={theme}>
      <div>
        {blogs && blogs.length > 0 ? (
          blogs.map((blog) => (
            <BlogCard
              id={blog._id}
              isUser={true}
              title={blog.title}
              description={blog.description}
              image={blog.image}
              username={blog.user.username}
              time={blog.createdAt}
            />
          ))
        ) : (
          <div
            style={{
              textAlign: "center",
              backgroundColor: theme.palette.background.default,
              height: "100vh",
            }}
          >
            <Typography
              variant="h3"
              style={{ color: theme.palette.primary.main }}
            >
              You have no blogs.Create one now!!
            </Typography>
          </div>
        )}
      </div>
    </ThemeProvider>
  );
};

export default UserBlogs;
