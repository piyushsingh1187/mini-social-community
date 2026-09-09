import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";

import { useAuth } from "../context/AuthContext";
import api from "../services/api";

const Home = () => {
    const { user } = useAuth();

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Fetch posts
    const getPosts = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get("/posts");

            setPosts(response.data.posts);
        } catch (error) {
            console.error(error);

            setError("Error loading posts");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getPosts();
    }, []);

    // Create post
    const handleCreatePost = async (postData) => {
        try {
            const response = await api.post(
                "/posts",
                postData
            );

            setPosts((prevPosts) => [ // new post is added to the beginning of the posts array
                response.data.post, //using spread operator
                ...prevPosts
            ]);
        } catch (error) {
            console.error(error);

            throw error;
        }
    };

    // Delete post
    const handleDeletePost = async (postId) => {
        try {
            await api.delete(`/posts/${postId}`);

            setPosts((prevPosts) =>
                prevPosts.filter(
                    (post) => post._id !== postId
                )
            );
        } catch (error) {
            console.error(error);

            alert(
                error.response?.data?.message ||
                "Failed to delete post"
            );
        }
    };
    
    const handleLikePost = async (postId) => {
        try {
            const response = await api.post(
                `/posts/${postId}/like`
            );

            setPosts((prevPosts) =>
                prevPosts.map((post) =>
                    post._id === postId
                        ? response.data.post
                        : post
                )
            );
        } catch (error) {
            console.error(error);

            alert(
                error.response?.data?.message ||
                "Failed to like post"
            );
        }
    };
    const handleAddComment = async (
        postId,
        content
    ) => {
        try {
            const response = await api.post(
                `/posts/${postId}/comments`,
                { content }
            );

            setPosts((prevPosts) =>
                prevPosts.map((post) =>
                    post._id === postId
                        ? response.data.post
                        : post
                )
            );
        } catch (error) {
            console.error(error);

            alert(
                error.response?.data?.message ||
                "Failed to add comment"
            );
        }
    };

    const handleDeleteComment = async (
        commentId
    ) => {
        try {
            const response = await api.delete(
                `/posts/comments/${commentId}`
            );

            const updatedPost = response.data.post;

            setPosts((prevPosts) =>
                prevPosts.map((post) =>
                    post._id === updatedPost._id
                        ? updatedPost
                        : post
                )
            );
        } catch (error) {
            console.error(error);

            alert(
                error.response?.data?.message ||
                "Failed to delete comment"
            );
        }
    };

    return (
        <div>
            <Navbar />

            <main>
                <h1>Community Feed</h1>

                {user && (
                    <PostForm
                        onCreatePost={handleCreatePost}
                    />
                )}

                <section>
                    <h2>Posts</h2>

                    {loading && <p>Loading...</p>}

                    {error && <p>{error}</p>}

                    {!loading &&
                        !error &&
                        posts.length === 0 && (
                            <p>No posts yet.</p>
                        )}

                    {!loading &&
                        posts.map((post) => (
                            <PostCard
                                key={post._id}
                                post={post}
                                user={user}
                                onDelete={handleDeletePost}
                                onLike={handleLikePost}
                                onAddComment={handleAddComment}
                                onDeleteComment={handleDeleteComment}
                            />
                        ))}
                </section>
            </main>
        </div>
    );
};

export default Home;