'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { createBlog } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

export default function CreateBlog() {
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [slug, setSlug] = useState<string>('');
    const { user, token } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || !token) {
            alert('You must be logged in to create a blog');
            return;
        }
        console.log('User:', user);
        console.log('Token:', token);
        try {
            await createBlog({ title, content, slug, user: user.id }, token);
            alert('Blog submitted for approval!');
            router.push('/my-blogs');
        } catch (error: any) {
            console.error('Create blog error:', error.message, error.response?.status, error.response?.data);
            alert(`Failed to create blog: ${error.message}`);
        }
    };

    return (
        <Container maxWidth="md" sx={{ py: 8 }}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                <Typography variant="h1" gutterBottom>Create Blog</Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    <TextField label="Slug" value={slug} onChange={(e) => setSlug(e.target.value)} required />
                    <TextField label="Content" multiline rows={10} value={content} onChange={(e) => setContent(e.target.value)} required />
                    <Button type="submit" variant="contained">Submit Blog</Button>
                </Box>
            </motion.div>
        </Container>
    );
}