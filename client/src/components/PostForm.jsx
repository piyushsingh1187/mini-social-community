import { useState } from "react";

const PostForm = ({ onCreatePost }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim() || !content.trim()) {
            return;
        }

        try {
            setLoading(true);

            await onCreatePost({
                title,
                content
            });

            setTitle("");
            setContent("");
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create Post</h2>

            <div>
                <label>Title</label>

                <input
                    type="text"
                    value={title}
                    onChange={(e) =>
                        setTitle(e.target.value)
                    }
                    placeholder="Post title"
                />
            </div>

            <div>
                <label>Content</label>

                <textarea
                    value={content}
                    onChange={(e) =>
                        setContent(e.target.value)
                    }
                    placeholder="What's on your mind?"
                />
            </div>

            <button
                type="submit"
                disabled={loading}
            >
                {loading ? "Creating..." : "Create Post"}
            </button>
        </form>
    );
};

export default PostForm;