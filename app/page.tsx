'use client';

import { Heart, MessageCircle, MoreHorizontal } from 'lucide-react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// 더미 피드 데이터
const FEED_DATA = [
  {
    id: 1,
    user: { name: '위스키러버', avatar: '🥃' },
    drink: { name: '발베니 더블우드 12년', category: 'Whiskey', rating: 4.8 },
    content: '달콤한 꿀 향과 바닐라의 부드러움이 완벽하게 어우러집니다. 입문용으로 이만한 게 없네요!',
    time: '2시간 전',
    likes: 12,
    comments: 3,
  },
  {
    id: 2,
    user: { name: '와인한잔', avatar: '🍷' },
    drink: { name: '1865 까베르네 소비뇽', category: 'Wine', rating: 4.0 },
    content: '무난하게 마시기 좋은 레드 와인. 스테이크랑 같이 먹으니 찰떡이네요. 바디감이 묵직합니다.',
    time: '5시간 전',
    likes: 8,
    comments: 1,
  },
];

export default function HomeFeedPage() {
  return (
    <div className="px-4 py-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* 헤더 섹션 */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            술술 피드
          </h1>
          <p className="text-xs text-slate-500 mt-1">친구들은 오늘 어떤 술을 마셨을까요?</p>
        </div>
        <div className="w-10 h-10 bg-orange-100 dark:bg-zinc-800 rounded-full flex items-center justify-center text-xl shadow-sm">
          🍶
        </div>
      </div>

      {/* 피드 리스트 */}
      <div className="space-y-6">
        {FEED_DATA.map((post) => (
          <Card key={post.id} className="border-0 shadow-lg bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md rounded-3xl overflow-hidden">
            
            {/* 작성자 정보 */}
            <div className="flex items-center justify-between p-4 pb-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-100 dark:bg-zinc-800 rounded-full flex items-center justify-center text-lg">
                  {post.user.avatar}
                </div>
                <div>
                  <p className="font-bold text-sm text-slate-900 dark:text-white">{post.user.name}</p>
                  <p className="text-[10px] text-slate-400">{post.time}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="text-slate-400">
                <MoreHorizontal size={18} />
              </Button>
            </div>

            {/* 본문 콘텐츠 (술 정보 & 노트) */}
            <Link href={`/review/${post.id}`} className="block px-4 py-2 cursor-pointer transition-opacity hover:opacity-80">
              <div className="bg-slate-50 dark:bg-zinc-800/50 rounded-2xl p-4 mb-3 border border-slate-100 dark:border-zinc-800/50 hover:border-orange-200 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-extrabold text-slate-800 dark:text-slate-100">{post.drink.name}</h3>
                  <span className="flex items-center text-orange-500 font-bold text-sm">
                    ★ {post.drink.rating}
                  </span>
                </div>
                <span className="inline-block px-2 py-1 bg-white dark:bg-zinc-700 text-[10px] font-bold text-slate-500 dark:text-slate-300 rounded-md shadow-sm mb-2">
                  {post.drink.category}
                </span>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                  {post.content}
                </p>
              </div>
            </Link>

            {/* 인터랙션 버튼 (좋아요/댓글) */}
            <div className="px-4 py-3 border-t border-slate-50 dark:border-zinc-800/50 flex gap-4">
              <button className="flex items-center gap-1.5 text-slate-500 hover:text-red-500 transition-colors group">
                <Heart size={18} className="group-active:scale-75 transition-transform" />
                <span className="text-xs font-semibold">{post.likes}</span>
              </button>
              <button className="flex items-center gap-1.5 text-slate-500 hover:text-blue-500 transition-colors group">
                <MessageCircle size={18} className="group-active:scale-75 transition-transform" />
                <span className="text-xs font-semibold">{post.comments}</span>
              </button>
            </div>
          </Card>
        ))}
      </div>
      
    </div>
  );
}
