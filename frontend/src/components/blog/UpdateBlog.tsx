'use client';

import { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { updateBlog } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { Blog } from '@/lib/types';

interface UpdateBlogProps {
    blog: Blog;
    onUpdate: () => void;
}

export default function UpdateBlog({ blog, onUpdate }: UpdateBlogProps) {
    const [title, setTitle] = useState<string>(blog.title);
    const [content, setContent] = useState<string>(blog.content);
    const [slug, setSlug] = useState<string>(blog.slug || '');
    const { token } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await updateBlog(blog.id, { title, content, slug }, token!);
            alert('Blog updated!');
            onUpdate();
        } catch (error) {
            alert('Failed to update blog');
        }
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required fullWidth margin="normal" />
                <TextField label="Slug" value={slug} onChange={(e) => setSlug(e.target.value)} required fullWidth margin="normal" />
                <TextField label="Content" multiline rows={10} value={content} onChange={(e) => setContent(e.target.value)} required fullWidth margin="normal" />
                <Button type="submit" variant="contained" sx={{ mt: 2 }}>Update Blog</Button>
            </Box>
        </motion.div>
    );
}