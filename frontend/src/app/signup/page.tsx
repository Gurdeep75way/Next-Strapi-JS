'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { signupUser } from '@/lib/auth';
import { useAuth } from '@/context/AuthContext';

export default function Signup() {
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { jwt, user } = await signupUser(username, email, password);
            login(user, jwt);
            router.push('/');
        } catch (error) {
            alert('Signup failed');
        }
    };

    return (
        <Container maxWidth="sm" sx={{ py: 8 }}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                <Typography variant="h1" gutterBottom>Signup</Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField label="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <Button type="submit" variant="contained">Signup</Button>
                </Box>
            </motion.div>
        </Container>
    );
}