'use client';

import { useState, useEffect } from 'react';
import { Typography, Box, Button } from '@mui/material';
import { Comment } from '@/lib/types';
import { useAuth } from '@/context/AuthContext';
import { fetchComments, deleteComment } from '@/lib/api';

interface CommentListProps {
    blogId: number; // Pass blogId instead of comments
    blogAuthorId?: number;
}

export default function CommentList({ blogId, blogAuthorId }: CommentListProps) {
    const { user, token } = useAuth();
    const [comments, setComments] = useState<Comment[]>([]);

    useEffect(() => {
        if (token) {
            fetchComments(blogId)
                .then((fetchedComments) => {
                    console.log("Fetched Comments:", fetchedComments);
                    setComments(fetchedComments || []);
                })
                .catch((error) => console.error("Error fetching comments:", error));
        }
    }, [blogId, token]);

    const handleDelete = async (id: number) => {
        if (!token) {
            alert('You must be logged in to delete a comment');
            return;
        }
        try {
            await deleteComment(id, token);
            setComments((prevComments) => prevComments.filter((comment) => comment.id !== id));
            alert('Comment deleted successfully');
        } catch (error: any) {
            alert(`Failed to delete comment: ${error.message}`);
        }
    };

    return (
        <Box mt={2}>
            {comments.length === 0 ? (
                <Typography>No comments yet.</Typography>
            ) : (
                comments.map((comment) => {
                    const author = comment.author || (comment as any).attributes?.author || "Anonymous";
                    return (
                        <Box key={comment.id} mb={2} pb={1} sx={{ borderBottom: '1px solid #eee' }}>
                            <Typography>{comment.content || (comment as any).attributes?.content}</Typography>
                            <Typography variant="caption" color="textSecondary">
                                By {author}
                            </Typography>
                            {user && (user.id === blogAuthorId || user.role?.name === 'Admin') && (
                                <Button onClick={() => handleDelete(comment.id)} color="error" size="small">
                                    Delete
                                </Button>
                            )}
                        </Box>
                    );
                })
            )}
        </Box>
    );
}
