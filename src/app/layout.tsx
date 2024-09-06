import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const geistSans = localFont({
  src: '../fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: '../fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Movie Watchlist Application',
  description:
    'Keep track of your favorite movies with our Movie Watchlist Application. Easily add, organize, and manage the films you want to watch',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex justify-center antialiased`}
      >
        <main className="w-full max-w-[600px] sm:p-0 sm:py-8">{children}</main>
      </body>
    </html>
  );
}
