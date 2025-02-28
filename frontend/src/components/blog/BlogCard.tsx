'use client';

import { Card, CardContent, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Blog } from '@/lib/types';

interface BlogCardProps {
    blog: Blog | undefined;
}

export default function BlogCard({ blog }: BlogCardProps) {
    if (!blog) {
        return <Typography>Invalid blog data</Typography>;
    }

    return (
        <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
            <Card>
                <CardContent>
                    <Typography variant="h5">{blog.title || 'Untitled'}</Typography>
                    <Typography variant="body2" color="textSecondary">
                        {blog.content?.slice(0, 100) || 'No content'}...
                    </Typography>
                    <Link href={`/${blog.slug || ''}`}>
                        <Button variant="text">Read More</Button>
                    </Link>
                </CardContent>
            </Card>
        </motion.div>
    );
}