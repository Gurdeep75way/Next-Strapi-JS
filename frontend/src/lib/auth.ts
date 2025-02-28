// auth.ts
import axios from 'axios';
import { User } from '@/lib/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function loginUser(identifier: string, password: string): Promise<{ jwt: string; user: User }> {
    const res = await axios.post(`${API_URL}/auth/local`, { identifier, password });
    return res.data;
}

export async function signupUser(username: string, email: string, password: string): Promise<{ jwt: string; user: User }> {
    const res = await axios.post(`${API_URL}/auth/local/register`, {
        username,
        email,
        password,
    });
    return res.data;
}

