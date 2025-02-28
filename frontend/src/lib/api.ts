// api.ts
import axios, { AxiosInstance } from 'axios';
import { Blog, Comment, Like } from '@/lib/types';

const createApiInstance = (token?: string): AxiosInstance => {
    const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
    const API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

    console.log('STRAPI_URL:', STRAPI_URL); // Debug
    console.log('API_TOKEN:', API_TOKEN ? 'Present' : 'Missing'); // Debug

    if (!STRAPI_URL) {
        throw new Error('Missing NEXT_PUBLIC_STRAPI_URL in environment variables');
    }

    return axios.create({
        baseURL: `${STRAPI_URL}/api`,
        headers: {
            Authorization: `Bearer ${token || API_TOKEN}`, // Use user token if provided, fallback to API token
            'Content-Type': 'application/json',
        },
    });
};

// Fetch all approved blogs (server-side)
export const fetchBlogs = async (): Promise<Blog[]> => {
    try {
        const api = createApiInstance();
        const res = await api.get('/blogs?filters[blogStatus][$eq]=Approved&populate[user][fields][0]=username');
        console.log('fetchBlogs FULL response:', JSON.stringify(res.data, null, 2));
        return res.data.data || [];
    } catch (error: any) {
        console.error('Error fetching blogs:', { message: error.message, status: error.response?.status, data: error.response?.data });
        return [];
    }
};

// Fetch a blog by slug (server-side)
export const fetchBlogBySlug = async (slug: string): Promise<Blog | undefined> => {
    try {
        const api = createApiInstance();
        const query = `/blogs?filters[slug][$eq]=${slug}&filters[blogStatus][$eq]=Approved&populate[user][fields][0]=username`;
        console.log('fetchBlogBySlug query:', query);
        const res = await api.get(query);
        console.log('fetchBlogBySlug FULL response:', JSON.stringify(res.data, null, 2));
        const blog = res.data.data[0];
        if (!blog) console.log(`No blog found for slug: ${slug}`);
        return blog;
    } catch (error: any) {
        console.error(`Error fetching blog with slug ${slug}:`, { message: error.message, status: error.response?.status, data: error.response?.data });
        return undefined;
    }
};

export const fetchLikes = async (blogId: number): Promise<number> => {
    try {
        const api = createApiInstance();
        const res = await api.get(`/likes?filters[blog][id][$eq]=${blogId}`);
        console.log('fetchLikes response:', res.data);
        return res.data.data.length || 0;
    } catch (error: any) {
        console.error(`Error fetching likes for blog ${blogId}:`, error.message, error.response?.data);
        return 0;
    }
};
// Fetch approved comments for a blog (server-side)
export const fetchComments = async (blogId: number): Promise<Comment[]> => {
    try {
        const api = createApiInstance();
        const res = await api.get(`/comments?filters[blog][id][$eq]=${blogId}&filters[commentStatus][$eq]=Approved`);
        console.log('fetchComments raw response:', JSON.stringify(res.data, null, 2));
        return res.data.data || [];
    } catch (error: any) {
        console.error(`Error fetching comments for blog ${blogId}:`, error.message, error.response?.data);
        return [];
    }
};

// api.ts (snippet)
export const postComment = async (data: { blog: number; author: string; content: string; commentStatus?: 'Pending' | 'Approved' }, token: string) => {
    try {
        const api = createApiInstance(token);
        const payload = {
            data: {
                blog: data.blog,
                author: data.author,
                content: data.content,
                commentStatus: data.commentStatus || 'Pending', // Matches Strapi enum
            },
        };
        console.log('postComment payload:', JSON.stringify(payload, null, 2));
        const res = await api.post('/comments', payload);
        console.log('postComment FULL response:', JSON.stringify(res.data, null, 2));

        // Check if data exists
        if (!res.data.data) {
            console.error('Unexpected response structure:', res.data);
            throw new Error('Invalid response structure from Strapi');
        }

        // Access fields directly from res.data.data (flat structure)
        return {
            id: res.data.data.id,
            author: res.data.data.author,
            content: res.data.data.content,
            commentStatus: res.data.data.commentStatus as 'Pending' | 'Approved',
        };
    } catch (error: any) {
        console.error('Error posting comment:', {
            message: error.message,
            status: error.response?.status,
            data: error.response?.data,
        });
        throw error instanceof Error ? error : new Error('Failed to post comment');
    }
};

// Post a like (client-side, requires token)
export const postLike = async (data: { blog: number; author: string }, token: string) => {
    try {
        const api = createApiInstance(token);
        const res = await api.post('/likes', { data });
        console.log('postLike response:', res.data);
        return res.data;
    } catch (error: any) {
        console.error('Error posting like:', error.message, error.response?.data);
        throw error;
    }
};

// Delete a comment (client-side, requires token)
export const deleteComment = async (id: number, token: string) => {
    try {
        const api = createApiInstance(token);
        const res = await api.delete(`/comments/${id}`);
        console.log('deleteComment response:', res.data);
        return res.data;
    } catch (error: any) {
        console.error('Error deleting comment:', error.message, error.response?.data);
        throw error;
    }
};

// Delete a blog (client-side, requires token)
export const deleteBlog = async (id: number, token: string) => {
    try {
        const api = createApiInstance(token);
        const res = await api.delete(`/blogs/${id}`);
        console.log('deleteBlog response:', res.data);
        return res.data;
    } catch (error: any) {
        console.error('Error deleting blog:', error.message, error.response?.data);
        throw error;
    }
};

// Update a blog (client-side, requires token)
export const updateBlog = async (id: number, data: { title?: string; content?: string; slug?: string }, token: string) => {
    try {
        const api = createApiInstance(token);
        const res = await api.put(`/blogs/${id}`, { data });
        console.log('updateBlog response:', res.data);
        return res.data;
    } catch (error: any) {
        console.error('Error updating blog:', error.message, error.response?.data);
        throw error;
    }
};

// Create a blog (client-side, requires token)
// api.ts (snippet)
// api.ts
export const createBlog = async (data: { title: string; content: string; slug: string; user: number; category?: string }, token: string) => {
    try {
        const api = createApiInstance(token);
        const payload = {
            data: {
                title: data.title,
                content: data.content,
                slug: data.slug,
                blogStatus: 'Pending ', // Match Strapi's enum value with trailing space
                user: { id: data.user },
                category: data.category,
            },
        };
        console.log('createBlog payload:', JSON.stringify(payload, null, 2));
        const res = await api.post('/blogs', payload);
        console.log('createBlog response:', JSON.stringify(res.data, null, 2));
        return res.data;
    } catch (error: any) {
        console.error('Error creating blog:', {
            message: error.message,
            status: error.response?.status,
            data: error.response?.data,
        });
        throw error;
    }
};
// Fetch user's blogs (client-side, requires token)
export const fetchUserBlogs = async (userId: number, token: string): Promise<Blog[]> => {
    try {
        const api = createApiInstance(token);
        const res = await api.get(`/blogs?filters[user][id][$eq]=${userId}&populate[user][fields][0]=username`);
        console.log('fetchUserBlogs response:', JSON.stringify(res.data, null, 2));
        return res.data.data || [];
    } catch (error: any) {
        console.error('Error fetching user blogs:', error.message, error.response?.data);
        return [];
    }
};