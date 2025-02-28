// components/blog/CommentForm.tsx
'use client';

import { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { postComment } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

interface CommentFormProps {
    blogId: number;
}

export default function CommentForm({ blogId }: CommentFormProps) {
    const [author, setAuthor] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const { token, user } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!token) {
            alert('You must be logged in to comment');
            return;
        }
        if (!content.trim()) {
            alert('Comment content cannot be empty');
            return;
        }
        const commentData = {
            blog: blogId,
            author: user?.username || author || 'Anonymous',
            content: content.trim(),
            commentStatus: 'Pending' as const, // Match Strapi enum
        };
        console.log('Submitting comment:', commentData);
        try {
            const newComment = await postComment(commentData, token);
            console.log('New comment:', newComment);
            alert('Comment submitted for approval!');
            setAuthor('');
            setContent('');
        } catch (error: any) {
            console.error('Submit comment error:', error.message, error.response?.data);
            alert(`Failed to submit comment: ${error.message}`);
        }
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Box component="form" onSubmit={handleSubmit} mt={2}>
                {!user && (
                    <TextField
                        label="Your Name"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required={!user}
                        fullWidth
                        margin="normal"
                    />
                )}
                <TextField
                    label="Your Comment"
                    multiline
                    rows={4}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    fullWidth
                    margin="normal"
                />
                <Button type="submit" variant="contained" sx={{ mt: 2 }}>Submit Comment</Button>
            </Box>
        </motion.div>
    );
}