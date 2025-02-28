export interface Blog {
    id: number;
    title: string;
    slug: string | null;
    content: string;
    blogStatus: 'Draft' | 'Pending' | 'Approved' | 'Rejected'; // Updated enum
    version: number;
    user: { id: number; username: string } | null;
    category?: string;
}
export interface Comment {
    id: number;
    author: string;
    content: string;
    commentStatus: 'Pending' | 'Approved';
}

export interface Like {
    id: number;
    author: string;
}

export interface User {
    id: number;
    username: string;
    email: string;
    role: { name: string };
}