const express = require("express");

const {
    createPost,
    getPosts,
    getPost,
    updatePost,
    deletePost,
    toggleLike,
    addComment,
    deleteComment
} = require("../controllers/postController");

const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.get("/", getPosts);

router.get("/:id", getPost);

router.post("/", authMiddleware, createPost);

router.put("/:id", authMiddleware, updatePost);

router.delete("/:id", authMiddleware, deletePost);

router.post("/:id/like", authMiddleware, toggleLike);

router.post(
    "/:postId/comments",
    authMiddleware,
    addComment
);

router.delete(
    "/comments/:id",
    authMiddleware,
    deleteComment
);

module.exports = router;