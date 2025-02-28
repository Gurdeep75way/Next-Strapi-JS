'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { loginUser } from '@/lib/auth';
import { useAuth } from '@/context/AuthContext';

export default function Login() {
    const [identifier, setIdentifier] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { jwt, user } = await loginUser(identifier, password);
            login(user, jwt);
            router.push('/');
        } catch (error) {
            alert('Login failed');
        }
    };

    return (
        <Container maxWidth="sm" sx={{ py: 8 }}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                <Typography variant="h1" gutterBottom>
                    Login
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                        label="Email or Username"
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        required
                    />
                    <TextField
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Button type="submit" variant="contained">
                        Login
                    </Button>
                </Box>
            </motion.div>
        </Container>
    );
}