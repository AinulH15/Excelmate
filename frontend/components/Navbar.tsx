'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Sparkles, Menu, X } from 'lucide-react'; // Tambah Menu & X
import Button from './ui/Button';

const links = [
  { href: '/', label: 'Home' },
  { href: '/materi', label: 'Materi' },
  { href: '/kamus', label: 'Kamus Rumus' },
  { href: '/tips', label: 'Tips Trik' },
  { href: '/dukung', label: 'Dukung' }, // Pindahkan Dukung ke sini agar masuk ke menu mobile
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false); // State untuk buka/tutup menu mobile

  return (
    <nav className="sticky top-0 z-40 bg-cream border-b-2 border-ink">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3 relative">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-black text-xl" onClick={() => setIsOpen(false)}>
          <div className="w-10 h-10 bg-white border-2 border-ink rounded-lg shadow-neo-sm flex items-center justify-center overflow-hidden">
            <Image 
              src="/logo.png" 
              alt="ExcelMate Logo" 
              width={40} 
              height={40} 
              className="object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
            <Sparkles size={20} className="absolute" />
          </div>
          ExcelMate
        </Link>

        {/* Menu Links (Desktop / Laptop) */}
        <div className="hidden md:flex gap-6 font-bold text-sm">
          {links.map((l) => {
            const isActive = pathname === l.href || (l.href !== '/' && pathname.startsWith(l.href));
            return (
              <Link 
                key={l.href} 
                href={l.href} 
                className={`relative py-2 transition-colors ${
                  isActive ? 'text-ink' : 'text-ink/70 hover:text-ink'
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

        {/* Tombol Kanan */}
        <div className="flex items-center gap-3 sm:gap-4">
          
          {/* TOMBOL MULAI BELAJAR (Hanya muncul di Desktop/Laptop) */}
          <div className="hidden md:block">
            <Link href="/materi">
              <Button variant="pink">Mulai Belajar</Button>
            </Link>
          </div>

          {/* TOMBOL HAMBURGER ☰ (Hanya muncul di Mobile/HP) */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex items-center justify-center w-10 h-10 bg-yellow border-2 border-ink rounded-lg shadow-neo-sm hover:bg-yellow-300 transition-colors"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={24} className="text-ink" /> : <Menu size={24} className="text-ink" />}
          </button>
        </div>
        
      </div>

      {/* MENU DROPDOWN UNTUK MOBILE */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-cream border-b-2 border-ink shadow-neo flex flex-col p-4 gap-4 animate-in slide-in-from-top-2">
          {links.map((l) => {
            const isActive = pathname === l.href || (l.href !== '/' && pathname.startsWith(l.href));
            return (
              <Link 
                key={l.href} 
                href={l.href} 
                onClick={() => setIsOpen(false)} // Tutup menu saat diklik
                className={`font-bold text-lg p-2 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-yellow border-2 border-ink shadow-neo-sm' 
                    : 'text-ink/70 hover:bg-gray-100'
                }`}
              >
                {l.label}
              </Link>
            );
          })}
          
          {/* Tombol Mulai Belajar di dalam Menu Mobile */}
          <Link href="/materi" onClick={() => setIsOpen(false)} className="mt-2">
            <Button variant="pink" className="w-full">Mulai Belajar</Button>
          </Link>
        </div>
      )}
    </nav>
  );
}