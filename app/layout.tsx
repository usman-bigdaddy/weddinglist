import type { Metadata } from 'next';
import './globals.css';


export const metadata: Metadata = {
  title: 'Wedding RSVP System',
  description: 'Manage wedding guest RSVPs and verifications',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}