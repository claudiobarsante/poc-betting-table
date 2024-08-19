import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import './globals.css';

import { cn } from '@/lib/utils';
import QueryClientProvider from './providers/query-client-provider';

const fontSans = FontSans({
    subsets: ['latin'],
    variable: '--font-sans'
});

export const metadata: Metadata = {
    title: 'Betting table',
    description: 'Betting table poc'
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={cn(
                    'min-h-screen bg-background font-sans antialiased',
                    fontSans.variable
                )}
            >
                <QueryClientProvider>
                    <div className="grid-cols-appXl grid">
                        <main className="col-start-2 pt-4">{children}</main>
                    </div>
                </QueryClientProvider>
            </body>
        </html>
    );
}
