'use client';

import { useState } from 'react';
import { Search, History, TrendingUp, X } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function SearchPage() {
  const [query, setQuery] = useState('');

  const recentSearches = ['조니워커 블랙', '산토리 가쿠빈', '발베니 12년', '테라'];
  const trendingDrinks = ['짐빔 화이트', '야마자키 12년', '새로', '기네스 드래프트'];

  return (
    <div className="px-4 py-8 animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-6">
          어떤 술을 찾으시나요?
        </h1>
        
        {/* Search Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-orange-500" />
          </div>
          <Input
            type="text"
            placeholder="술 이름, 종류, 브랜드를 검색해보세요"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-12 h-14 bg-white dark:bg-zinc-900/50 border-0 shadow-lg shadow-slate-200/50 dark:shadow-none rounded-2xl text-base focus-visible:ring-orange-500 transition-all"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="absolute inset-y-0 right-4 flex items-center text-slate-400 hover:text-slate-600"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      {!query ? (
        <div className="space-y-8">
          {/* 최근 검색어 */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <History className="w-5 h-5 text-slate-400" />
              <h2 className="text-lg font-bold text-slate-700 dark:text-slate-200">최근 검색어</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((item, idx) => (
                <span 
                  key={idx} 
                  className="px-4 py-2 bg-white dark:bg-zinc-800 rounded-full text-sm font-medium text-slate-600 dark:text-slate-300 shadow-sm border border-slate-100 dark:border-zinc-700 cursor-pointer hover:bg-orange-50 dark:hover:bg-zinc-700 hover:text-orange-600 transition-colors"
                >
                  {item}
                </span>
              ))}
            </div>
          </section>

          {/* 인기 주류 */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-orange-500" />
              <h2 className="text-lg font-bold text-slate-700 dark:text-slate-200">요즘 뜨는 술</h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {trendingDrinks.map((item, idx) => (
                <div 
                  key={idx}
                  className="flex items-center gap-3 p-3 bg-white dark:bg-zinc-800 rounded-2xl shadow-sm border border-slate-100 dark:border-zinc-700 cursor-pointer hover:border-orange-200 transition-all active:scale-95"
                >
                  <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-zinc-700 flex items-center justify-center font-bold text-orange-500">
                    {idx + 1}
                  </div>
                  <span className="font-semibold text-slate-700 dark:text-slate-200 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-slate-500 dark:text-slate-400">"{query}" 검색 결과를 찾는 중...</p>
          <p className="text-xs text-slate-400 mt-2">(추후 Supabase DB 연동 예정)</p>
        </div>
      )}
    </div>
  );
}
