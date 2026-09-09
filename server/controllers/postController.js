const Post = require("../models/Post");

// CREATE POST
const createPost = async (req, res) => {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({
                message: "Title and content are required"
            });
        }

        const post = await Post.create({
            title,
            content,
            author: req.user._id
        });

        const populatedPost = await post.populate(
            "author",
            "name email"
        );

        res.status(201).json({
            message: "Post created successfully",
            post: populatedPost
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


// GET ALL POSTS
const getPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate("author", "name email")
            .populate("comments.author", "name email")
            .sort({ createdAt: -1 });

        res.status(200).json({
            posts
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


// GET SINGLE POST
const getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
            .populate("author", "name email")
            .populate("comments.author", "name email");

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        res.status(200).json({
            post
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


// UPDATE POST
const updatePost = async (req, res) => {
    try {
        const { title, content } = req.body;

        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        // Check ownership
        const isOwner = post.author.equals(req.user._id);

        if (!isOwner) {
            return res.status(403).json({
                message: "You are not authorized to update this post"
            });
        }

        if (title !== undefined) {
            post.title = title;
        }

        if (content !== undefined) {
            post.content = content;
        }

        await post.save();

        const updatedPost = await post.populate(
            "author",
            "name email"
        );

        res.status(200).json({
            message: "Post updated successfully",
            post: updatedPost
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


// DELETE POST
const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        // Admin can delete any post
        if (req.user.role === "ADMIN") {
            await post.deleteOne();

            return res.status(200).json({
                message: "Post deleted successfully"
            });
        }

        // Normal user can delete only their own post
        const isOwner = post.author.equals(req.user._id);

        if (!isOwner) {
            return res.status(403).json({
                message: "You are not authorized to delete this post"
            });
        }

        await post.deleteOne();

        res.status(200).json({
            message: "Post deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

const toggleLike = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        const userId = req.user._id;//current logged in user id

        const alreadyLiked = post.likes.some(
            (id) => id.equals(userId)
        );

        if (alreadyLiked) {
            // Unlike
            post.likes = post.likes.filter(
                (id) => !id.equals(userId)
            );
        } else {
            // Like
            post.likes.push(userId);
        }

        await post.save();

        const updatedPost = await post.populate(
            "author",
            "name email"
        );

        res.status(200).json({
            message: alreadyLiked
                ? "Post unliked"
                : "Post liked",
            post: updatedPost
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

const addComment = async (req, res) => {
    try {
        const { content } = req.body;

        if (!content || !content.trim()) {
            return res.status(400).json({
                message: "Comment content is required"
            });
        }

        const post = await Post.findById(req.params.postId);

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        post.comments.push({
            content,
            author: req.user._id
        });

        await post.save();

        const updatedPost = await Post.findById(post._id)
            .populate("author", "name email")
            .populate("comments.author", "name email");

        res.status(201).json({
            message: "Comment added successfully",
            post: updatedPost
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

const deleteComment = async (req, res) => {
    try {
        const post = await Post.findOne({
            "comments._id": req.params.id
        });

        if (!post) {
            return res.status(404).json({
                message: "Comment not found"
            });
        }

        const comment = post.comments.id(req.params.id);

        const isOwner = comment.author.equals(req.user._id);

        const isAdmin = req.user.role === "ADMIN";

        if (!isOwner && !isAdmin) {
            return res.status(403).json({
                message: "You are not authorized to delete this comment"
            });
        }

        comment.deleteOne();

        await post.save();

        const updatedPost = await Post.findById(post._id)
            .populate("author", "name email")
            .populate("comments.author", "name email");

        res.status(200).json({
            message: "Comment deleted successfully",
            post: updatedPost
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


module.exports = {
    createPost,
    getPosts,
    getPost,
    updatePost,
    deletePost,
    toggleLike,
    addComment,
    deleteComment
};