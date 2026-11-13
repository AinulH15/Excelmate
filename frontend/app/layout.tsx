import { Nunito } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';

const nunito = Nunito({ 
  subsets: ['latin'], 
  weight: ['400', '600', '700', '800', '900'] 
});

export const metadata = {
  title: 'ExcelMate - Belajar Excel Seru!',
  description: 'Platform belajar Microsoft Excel interaktif dari nol sampai mahir.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className={`${nunito.className} bg-cream text-ink min-h-screen text-black`}>
        <Navbar />
        <main className="max-w-6xl mx-auto px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}