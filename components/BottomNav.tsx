'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Calendar, PlusCircle, Search, User } from 'lucide-react';

export default function BottomNav() {
  const pathname = usePathname();

  // 로그인 페이지 등 네비게이션이 필요 없는 곳에서는 숨김 처리
  if (pathname === '/login') return null;

  const navItems = [
    { name: '홈', href: '/', icon: Home },
    { name: '검색', href: '/search', icon: Search },
    { name: '기록', href: '/add', icon: PlusCircle, isPrimary: true },
    { name: '달력', href: '/calendar', icon: Calendar },
    { name: '마이', href: '/mypage', icon: User },
  ];

  return (
    <nav className="sticky bottom-0 w-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-lg border-t border-slate-200 dark:border-zinc-800 pb-safe">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          if (item.isPrimary) {
            return (
              <Link key={item.name} href={item.href} className="flex flex-col items-center justify-center -mt-6">
                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center text-white shadow-lg shadow-orange-500/30 transition-transform active:scale-95">
                  <Icon size={28} strokeWidth={2.5} />
                </div>
                <span className="text-[10px] font-medium mt-1 text-slate-600 dark:text-slate-400">{item.name}</span>
              </Link>
            );
          }

          return (
            <Link key={item.name} href={item.href} className="flex flex-col items-center justify-center w-16 h-full transition-all active:scale-95">
              <Icon 
                size={24} 
                className={`mb-1 transition-colors ${isActive ? 'text-orange-600 dark:text-orange-400' : 'text-slate-400 dark:text-slate-500'}`} 
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span className={`text-[10px] font-medium transition-colors ${isActive ? 'text-orange-600 dark:text-orange-400' : 'text-slate-400 dark:text-slate-500'}`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
