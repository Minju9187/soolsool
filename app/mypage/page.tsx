'use client';

import { useState } from 'react';
import { Settings, Bookmark, Star, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

const MY_REVIEWS = [
  { id: 1, name: '글렌피딕 15년', category: 'Whiskey', rating: 5.0, date: '2026.05.10' },
  { id: 2, name: '테라', category: 'Beer', rating: 3.5, date: '2026.05.15' },
];

const WISHLIST = [
  { id: 1, name: '맥캘란 12년 셰리오크', category: 'Whiskey', reason: '친구가 극찬함' },
  { id: 2, name: '모엣 샹동 임페리얼', category: 'Wine', reason: '기념일에 마실 예정' },
];

export default function MyPage() {
  const [activeTab, setActiveTab] = useState<'reviews' | 'wishlist'>('reviews');
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <div className="px-4 py-8 animate-in fade-in duration-500 min-h-screen bg-slate-50 dark:bg-zinc-950">
      
      {/* 상단 프로필 영역 */}
      <div className="flex items-center justify-between mb-8 px-2">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">마이페이지</h1>
        <Button variant="ghost" size="icon" className="text-slate-500">
          <Settings size={24} />
        </Button>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-zinc-800 mb-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-orange-100 dark:bg-zinc-800 rounded-full flex items-center justify-center text-3xl shadow-inner">
            😎
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">위스키러버</h2>
            <p className="text-sm text-slate-500">soolsool@example.com</p>
          </div>
        </div>
        
        <div className="flex gap-4">
          <div className="flex-1 bg-slate-50 dark:bg-zinc-800/50 rounded-2xl p-4 text-center">
            <span className="block text-xs font-bold text-slate-400 uppercase mb-1">내 기록</span>
            <span className="text-2xl font-black text-orange-500">24<span className="text-sm font-medium text-slate-500 ml-1">잔</span></span>
          </div>
          <div className="flex-1 bg-slate-50 dark:bg-zinc-800/50 rounded-2xl p-4 text-center">
            <span className="block text-xs font-bold text-slate-400 uppercase mb-1">위시리스트</span>
            <span className="text-2xl font-black text-blue-500">12<span className="text-sm font-medium text-slate-500 ml-1">개</span></span>
          </div>
        </div>
      </div>

      {/* 탭 네비게이션 */}
      <div className="flex p-1 bg-slate-200/50 dark:bg-zinc-800/50 rounded-2xl mb-6">
        <button
          onClick={() => setActiveTab('reviews')}
          className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${
            activeTab === 'reviews' 
            ? 'bg-white dark:bg-zinc-700 text-slate-900 dark:text-white shadow-sm' 
            : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
        >
          내가 남긴 평가
        </button>
        <button
          onClick={() => setActiveTab('wishlist')}
          className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${
            activeTab === 'wishlist' 
            ? 'bg-white dark:bg-zinc-700 text-slate-900 dark:text-white shadow-sm' 
            : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
        >
          위시리스트
        </button>
      </div>

      {/* 탭 콘텐츠 */}
      <div className="space-y-4 mb-8">
        {activeTab === 'reviews' ? (
          MY_REVIEWS.map((review) => (
            <div key={review.id} className="bg-white dark:bg-zinc-900 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-zinc-800 flex justify-between items-center transition-transform active:scale-[0.98] cursor-pointer">
              <div>
                <h3 className="font-bold text-slate-800 dark:text-slate-200">{review.name}</h3>
                <span className="text-xs text-slate-400">{review.date} • {review.category}</span>
              </div>
              <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-950/30 px-3 py-1.5 rounded-lg">
                <Star size={14} className="fill-amber-400 text-amber-400" />
                <span className="font-bold text-amber-600 dark:text-amber-400 text-sm">{review.rating}</span>
              </div>
            </div>
          ))
        ) : (
          WISHLIST.map((item) => (
            <div key={item.id} className="bg-white dark:bg-zinc-900 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-zinc-800 flex justify-between items-center transition-transform active:scale-[0.98] cursor-pointer">
              <div>
                <h3 className="font-bold text-slate-800 dark:text-slate-200">{item.name}</h3>
                <p className="text-xs text-slate-400 mt-1">{item.reason}</p>
              </div>
              <Bookmark size={20} className="text-blue-500 fill-blue-50 dark:fill-blue-900/30" />
            </div>
          ))
        )}
      </div>

      {/* 하단 로그아웃 버튼 */}
      <Button 
        variant="ghost" 
        onClick={handleLogout}
        className="w-full text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
      >
        <LogOut size={16} className="mr-2" />
        로그아웃
      </Button>
      
    </div>
  );
}
