'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Sparkles } from 'lucide-react';
import Button from './ui/Button';


const links = [
  { href: '/', label: 'Home' },
  { href: '/materi', label: 'Materi' },
  { href: '/kamus', label: 'Kamus Rumus' },
  { href: '/tips', label: 'Tips Trik' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-40 bg-cream border-b-2 border-ink">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-black text-xl">
          <div className="w-10 h-10 bg-white border-2 border-ink rounded-lg shadow-neo-sm flex items-center justify-center overflow-hidden">
            <Image 
              src="/logo.png" 
              alt="ExcelMate Logo" 
              width={40} 
              height={40} 
              className="object-contain"
              onError={(e) => {
                // Fallback jika logo tidak ada
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
            <Sparkles size={20} className="absolute" />
          </div>
          ExcelMate
        </Link>

        {/* Menu Links */}
        <div className="hidden md:flex gap-6 font-bold text-sm">
          {links.map((l) => {
            const isActive = pathname === l.href || (l.href !== '/' && pathname.startsWith(l.href));
            return (
              <Link 
                key={l.href} 
                href={l.href} 
                className={`relative py-2 transition-colors ${
                  isActive 
                    ? 'text-ink' 
                    : 'text-ink/70 hover:text-ink'
                }`}
              >
                {l.label}
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-yellow border-2 border-ink rounded-full" />
                )}
              </Link>
            );
          })}
        </div>

        <Link href="/materi"><Button variant="pink">Mulai Belajar</Button></Link>
      </div>
    </nav>
  );
}