import { useState } from "react";
import { Link } from "react-router-dom";

const PostCard = ({
    post,
    user,
    onDelete,
    onLike,
    onAddComment,
    onDeleteComment
}) => {
    const [commentText, setCommentText] = useState("");

    const isOwner =
        user &&
        post.author?._id === user.id;

    const isAdmin =
        user &&
        user.role === "ADMIN";

    const canEdit = isOwner;
    const canDelete = isOwner || isAdmin;

    const hasLiked =
        user &&
        post.likes?.some(
            (id) => id === user.id
        );

    const handleCommentSubmit = async (e) => {
        e.preventDefault();

        if (!commentText.trim()) {
            return;
        }

        await onAddComment(
            post._id,
            commentText
        );

        setCommentText("");
    };

    return (
        <article>
            <h2>{post.title}</h2>

            <p>
                By: {post.author?.name}
            </p>

            <p>{post.content}</p>

            <p>
                Likes: {post.likes?.length || 0}
            </p>

            <p>
                Comments: {post.comments?.length || 0}
            </p>

            <div>
                {canEdit && (
                    <button>Edit</button>
                )}

                {canDelete && (
                    <button
                        onClick={() =>
                            onDelete(post._id)
                        }
                    >
                        Delete
                    </button>
                )}

                {user && (
                    <button
                        onClick={() =>
                            onLike(post._id)
                        }
                    >
                        {hasLiked
                            ? "Unlike"
                            : "Like"}
                    </button>
                )}

                <Link to={`/post/${post._id}`}>
                    View
                </Link>
            </div>

            <hr />

            <h3>Comments</h3>

            {post.comments?.length === 0 && (
                <p>No comments yet.</p>
            )}

            {post.comments?.map((comment) => {
                const canDeleteComment =
                    user &&
                    (
                        comment.author?._id === user.id ||
                        user.role === "ADMIN"
                    );

                return (
                    <div key={comment._id}>
                        <strong>
                            {comment.author?.name}
                        </strong>

                        <p>
                            {comment.content}
                        </p>

                        {canDeleteComment && (
                            <button
                                onClick={() =>
                                    onDeleteComment(
                                        comment._id
                                    )
                                }
                            >
                                Delete Comment
                            </button>
                        )}
                    </div>
                );
            })}

            {user && (
                <form
                    onSubmit={handleCommentSubmit}
                >
                    <input
                        type="text"
                        value={commentText}
                        onChange={(e) =>
                            setCommentText(
                                e.target.value
                            )
                        }
                        placeholder="Write a comment"
                    />

                    <button type="submit">
                        Comment
                    </button>
                </form>
            )}
        </article>
    );
};

export default PostCard;