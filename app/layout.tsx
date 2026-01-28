'use client';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from '@/components/Providers';
import Navbar from '@/components/Navbar';
import { usePathname } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    // Hide navbar on login and register pages
    const hideNavbar = pathname === '/login' || pathname === '/register';

    return (
        <html lang="en">
            <body className={inter.className}>
                <Providers>
                    {!hideNavbar && <Navbar />}
                    {children}
                </Providers>
            </body>
        </html>
    );
}