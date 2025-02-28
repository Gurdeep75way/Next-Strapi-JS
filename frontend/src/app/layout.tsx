// src/app/layout.tsx
import { ReactNode } from 'react';
import { Metadata } from 'next';
import { AuthProvider } from '@/context/AuthContext';
import ClientThemeWrapper from '@/components/ClientThemeWrapper'; // New Client Component

export const metadata: Metadata = {
  title: 'Blog Platform',
  description: 'A blog platform built with Next.js and Strapi',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ClientThemeWrapper>{children}</ClientThemeWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}