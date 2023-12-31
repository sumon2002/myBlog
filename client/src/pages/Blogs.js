import axios from "axios";
import React, { useState, useEffect } from "react";
import BlogCard from "../components/BlogCard";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";

const theme = createTheme({
  palette: {
    mode: "dark", // Set the theme to dark mode
  },
});
const Blogs = () => {
  // State
  const [blogs, setBlogs] = useState([]);

  // Get blogs from server
  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get(
        "https://blog-backend-fwlq.onrender.com/api/v1/blog/all-blog"
      );
      if (data?.success) {
        setBlogs(data?.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <div>
        {blogs &&
          blogs.map((blog) => (
            <BlogCard
              id={blog?._id}
              isUser={localStorage.getItem("userId") === blog?.user?._id}
              title={blog?.title}
              description={blog?.description}
              image={blog?.image}
              username={blog?.user?.username}
              time={blog?.createdAt}
            />
          ))}
      </div>
    </ThemeProvider>
  );
};

export default Blogs;
