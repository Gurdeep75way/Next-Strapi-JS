'use client';

import { useState, useEffect } from 'react';
import { Container, Typography, Button, Grid } from '@mui/material';
import { fetchUserBlogs, deleteBlog } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import BlogCard from '@/components/blog/BlogCard';
import UpdateBlog from '@/components/blog/UpdateBlog';

export default function MyBlogs() {
    const { user, token } = useAuth();
    const [blogs, setBlogs] = useState<any[]>([]);
    const [editingBlog, setEditingBlog] = useState<any | null>(null);

    useEffect(() => {
        if (user && token) {
            fetchUserBlogs(user.id, token).then(setBlogs);
        }
    }, [user, token]);

    const handleDelete = async (id: number) => {
        if (token) {
            await deleteBlog(id, token);
            setBlogs(blogs.filter((blog) => blog.id !== id));
        }
    };

    return (
        <Container maxWidth="lg" sx={{ py: 8 }}>
            <Typography variant="h1" gutterBottom>My Blogs</Typography>
            {!user ? (
                <Typography>Please log in to view your blogs.</Typography>
            ) : (
                <Grid container spacing={3}>
                    {blogs.map((blog) => (
                        <Grid item xs={12} sm={6} md={4} key={blog.id}>
                            {editingBlog?.id === blog.id ? (
                                <UpdateBlog blog={blog} onUpdate={() => setEditingBlog(null)} />
                            ) : (
                                <>
                                    <BlogCard blog={blog} />
                                    <Button onClick={() => setEditingBlog(blog)}>Edit</Button>
                                    <Button onClick={() => handleDelete(blog.id)} color="error">Delete</Button>
                                </>
                            )}
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
}
