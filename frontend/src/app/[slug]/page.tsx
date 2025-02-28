// [slug]/page.tsx
import { Container, Typography, Button, Box } from '@mui/material';
import { fetchBlogBySlug, fetchLikes, postLike } from '@/lib/api';
import { Blog } from '@/lib/types';
import CommentForm from '@/components/blog/CommentForm';
import CommentList from '@/components/blog/CommentList';
import { Metadata } from 'next';

interface BlogPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
    const { slug } = await params;
    const blog = await fetchBlogBySlug(slug);
    if (!blog) return { title: 'Blog Not Found' };
    return {
        title: blog.title,
        description: blog.content.slice(0, 150),
        openGraph: { title: blog.title, description: blog.content.slice(0, 150) },
    };
}

async function handleLike(formData: FormData) {
    'use server';
    const blogId = Number(formData.get('blogId'));
    try {
        await postLike({ blog: blogId, author: 'guest' }, process.env.NEXT_PUBLIC_STRAPI_API_TOKEN!);
    } catch (error) {
        console.error('Server Action failed:', error);
        throw new Error('Failed to like the blog');
    }
}

export default async function BlogPage({ params }: BlogPageProps) {
    const { slug } = await params;
    const blog = await fetchBlogBySlug(slug);
    if (!blog) {
        console.log(`BlogPage: No blog found for slug ${slug}`);
        return <Typography>Blog not found</Typography>;
    }

    const likeCount = await fetchLikes(blog.id);

    return (
        <Container maxWidth="md" sx={{ paddingTop: 4, paddingBottom: 4 }}>
            <Typography variant="h1" gutterBottom>{blog.title}</Typography>
            <Typography variant="subtitle1">
                By {blog.user?.username || 'Unknown'} | Version: {blog.version} | Category: {blog.category || 'Uncategorized'}
            </Typography>
            <Box dangerouslySetInnerHTML={{ __html: blog.content }} my={2} />
            <Typography>Likes: {likeCount}</Typography>
            <form action={handleLike}>
                <input type="hidden" name="blogId" value={blog.id} />
                <Button type="submit" variant="contained" sx={{ marginTop: 2 }}>Like</Button>
            </form>
            <Typography variant="h3" mt={4}>Comments</Typography>
            <CommentList blogId={blog.id} blogAuthorId={blog.user?.id} />
            <CommentForm blogId={blog.id} />
        </Container>
    );
}