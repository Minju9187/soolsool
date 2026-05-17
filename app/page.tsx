'use client';

import { Heart, MessageCircle, MoreHorizontal } from 'lucide-react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useGetReviews } from '@/features/reviews/api/useReviews';
import { format } from 'date-fns';

export default function HomeFeedPage() {
  const { data: reviews, isLoading, isError } = useGetReviews();

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

      {/* 로딩 및 에러 처리 */}
      {isLoading && <div className="text-center py-20 text-slate-500">피드를 불러오는 중...</div>}
      {isError && <div className="text-center py-20 text-red-500">데이터를 불러오지 못했습니다.</div>}
      {reviews?.length === 0 && (
        <div className="text-center py-20 text-slate-500">
          아직 작성된 리뷰가 없어요. 첫 번째 리뷰를 남겨보세요!
        </div>
      )}

      {/* 피드 리스트 */}
      <div className="space-y-6">
        {reviews?.map((post) => (
          <Card key={post.id} className="border-0 shadow-lg bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md rounded-3xl overflow-hidden">
            
            {/* 작성자 정보 */}
            <div className="flex items-center justify-between p-4 pb-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-100 dark:bg-zinc-800 rounded-full flex items-center justify-center text-lg">
                  {post.profiles?.avatar_url || '🥃'}
                </div>
                <div>
                  <p className="font-bold text-sm text-slate-900 dark:text-white">{post.profiles?.nickname || '알 수 없음'}</p>
                  <p className="text-[10px] text-slate-400">{format(new Date(post.created_at), 'yyyy.MM.dd')}</p>
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
                  <h3 className="font-extrabold text-slate-800 dark:text-slate-100">{post.drink_name}</h3>
                  <span className="flex items-center text-orange-500 font-bold text-sm">
                    ★ {post.rating}
                  </span>
                </div>
                <span className="inline-block px-2 py-1 bg-white dark:bg-zinc-700 text-[10px] font-bold text-slate-500 dark:text-slate-300 rounded-md shadow-sm mb-2">
                  {post.drink_category}
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
                <span className="text-xs font-semibold">0</span>
              </button>
              <button className="flex items-center gap-1.5 text-slate-500 hover:text-blue-500 transition-colors group">
                <MessageCircle size={18} className="group-active:scale-75 transition-transform" />
                <span className="text-xs font-semibold">0</span>
              </button>
            </div>
          </Card>
        ))}
      </div>
      
    </div>
  );
}
