import type { Metadata } from 'next'
import Providers from '@/components/Providers'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://alirezapourgholam.dev'),
  title: 'Alireza Pourgholam | Frontend Developer & React Specialist',
  description:
    'Alireza Pourgholam is a Frontend Developer specializing in React.js, Next.js, TypeScript, and modern web technologies. Building fast, beautiful, and scalable web experiences.',
  keywords: [
    'Alireza Pourgholam',
    'Frontend Developer',
    'React.js',
    'Next.js',
    'TypeScript',
    'Tailwind CSS',
    'JavaScript',
    'Web Developer Iran',
    'UI Developer',
    'Kish Island',
    'Framer Motion',
    'Three.js',
    'Open Source',
  ],
  authors: [{ name: 'Alireza Pourgholam' }],
  creator: 'Alireza Pourgholam',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://alirezapourgholam.dev',
    title: 'Alireza Pourgholam | Frontend Developer',
    description:
      'Frontend Developer crafting fast, modern, and scalable web experiences with React.js, Next.js, and TypeScript.',
    siteName: 'Alireza Pourgholam Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Alireza Pourgholam - Frontend Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alireza Pourgholam | Frontend Developer',
    description: 'Frontend Developer crafting fast, modern, and scalable web experiences.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="noise">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
