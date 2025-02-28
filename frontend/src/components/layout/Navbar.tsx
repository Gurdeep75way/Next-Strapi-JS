'use client';

import { AppBar, Toolbar, Typography, Button, Box, Avatar, Menu, MenuItem, IconButton } from '@mui/material';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';

export default function Navbar() {
    const { user, logout } = useAuth();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="static" sx={{ background: '#1E1E2D', boxShadow: 'none', borderBottom: '2px solid #3A3A4A' }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {/* Logo & Brand */}
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#fff' }}>
                    <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>Blog Platform</Link>
                </Typography>

                {/* Navigation Links */}
                <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
                    <Link href="/" passHref>
                        <Button sx={{ color: '#fff', '&:hover': { color: '#fca311' } }}>Home</Button>
                    </Link>

                    {user ? (
                        <>
                            <Link href="/my-blogs" passHref>
                                <Button sx={{ color: '#fff', '&:hover': { color: '#fca311' } }}>My Blogs</Button>
                            </Link>
                            <Link href="/create-blog" passHref>
                                <Button sx={{ color: '#fff', '&:hover': { color: '#fca311' } }}>Create Blog</Button>
                            </Link>
                            <Link href="/profile" passHref>
                                <Button sx={{ color: '#fff', '&:hover': { color: '#fca311' } }}>Profile</Button>
                            </Link>
                            <MenuItem onClick={logout}>Logout</MenuItem>
                        </>
                    ) : (
                        <>
                            <Link href="/login" passHref>
                                <Button sx={{ color: '#fff', '&:hover': { color: '#fca311' } }}>Login</Button>
                            </Link>
                            <Link href="/signup" passHref>
                                <Button sx={{ color: '#fff', '&:hover': { color: '#fca311' } }}>Signup</Button>
                            </Link>
                        </>
                    )}
                </Box>

                {/* Mobile Menu (Hamburger) */}
                <IconButton sx={{ display: { xs: 'flex', md: 'none' }, color: '#fff' }} onClick={handleMenuOpen}>
                    <MenuIcon />
                </IconButton>

                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                    <MenuItem onClick={handleMenuClose}>
                        <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>Home</Link>
                    </MenuItem>
                    {user ? (
                        <>
                            <MenuItem onClick={handleMenuClose}>
                                <Link href="/my-blogs" style={{ textDecoration: 'none', color: 'inherit' }}>My Blogs</Link>
                            </MenuItem>
                            <MenuItem onClick={handleMenuClose}>
                                <Link href="/create-blog" style={{ textDecoration: 'none', color: 'inherit' }}>Create Blog</Link>
                            </MenuItem>
                            <MenuItem onClick={logout}>Logout</MenuItem>
                        </>
                    ) : (
                        <>
                            <MenuItem onClick={handleMenuClose}>
                                <Link href="/login" style={{ textDecoration: 'none', color: 'inherit' }}>Login</Link>
                            </MenuItem>
                            <MenuItem onClick={handleMenuClose}>
                                <Link href="/signup" style={{ textDecoration: 'none', color: 'inherit' }}>Signup</Link>
                            </MenuItem>
                        </>
                    )}
                </Menu>
            </Toolbar>
        </AppBar>
    );
}
