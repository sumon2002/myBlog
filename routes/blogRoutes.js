const express = require("express");
const {
  getAllBlogsController,
  createBlogController,
  updateBlogController,
  getBlogByIdController,
  deleteBlogController,
  userBlogController,
} = require("../controllers/blogControllers");
const router = express.Router();

// Get all blogs
router.get("/all-blog", getAllBlogsController);

// Create blog
router.post("/create-blog", createBlogController);

// Update Blog
router.put("/update-blog/:id", updateBlogController);

// Get a single blog
router.get("/get-blog/:id", getBlogByIdController);

// Delete Blog
router.delete("/delete-blog/:id", deleteBlogController);

// GET || User blog
router.get("/user-blog/:id", userBlogController);

module.exports = router;
