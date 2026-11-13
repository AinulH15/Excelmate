'use client';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import Button from './ui/Button';

const links = [
  { href: '/', label: 'Home' },
  { href: '/materi', label: 'Materi' },
  { href: '/kamus', label: 'Kamus Rumus' },
  { href: '/progress', label: 'Progress' },
];

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-40 bg-cream border-b-2 border-ink">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-black text-xl">
          <span className="bg-mint border-2 border-ink rounded-lg p-1.5 shadow-neo-sm">
            <Sparkles size={18} />
          </span>
          ExcelMate
        </Link>
        <div className="hidden md:flex gap-6 font-bold text-sm">
          {links.map(l => (
            <Link key={l.href} href={l.href} className="hover:underline decoration-2 underline-offset-4">
              {l.label}
            </Link>
          ))}
        </div>
        <Link href="/materi"><Button variant="pink">Mulai Belajar</Button></Link>
      </div>
    </nav>
  );
}