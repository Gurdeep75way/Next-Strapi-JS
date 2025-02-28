import { Container, Grid, Typography } from '@mui/material';
import BlogCard from '@/components/blog/BlogCard';
import { fetchBlogs } from '@/lib/api';
import { Blog } from '@/lib/types';
import styles from './page.module.css';

export default async function Home() {
  const blogs = await fetchBlogs();

  return (
    <Container maxWidth="lg" className={styles.container}>
      <Typography variant="h1" gutterBottom>
        Latest Blogs
      </Typography>
      {blogs.length > 0 ? (
        <Grid container spacing={3}>
          {blogs.map((blog) => (
            <Grid item xs={12} sm={6} md={4} key={blog.id || Math.random()}>
              <BlogCard blog={blog} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>No blogs available at the moment. Check back later!</Typography>
      )}
    </Container>
  );
}

export const revalidate = 60;