'use client';

import { ArrowLeft, Heart, MessageCircle, Share2, Star } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useGetReviewById } from '@/features/reviews/api/useReviews';
import { format } from 'date-fns';

export default function ReviewDetailPage() {
  const params = useParams();
  const reviewId = params.id as string;
  const { data: review, isLoading, isError } = useGetReviewById(reviewId);

  if (isLoading) return <div className="min-h-screen flex items-center justify-center text-slate-500">리뷰를 불러오는 중...</div>;
  if (isError || !review) return <div className="min-h-screen flex items-center justify-center text-red-500">리뷰를 찾을 수 없습니다.</div>;

  return (
    <div className="bg-slate-50 dark:bg-zinc-950 min-h-screen animate-in fade-in duration-300">
      
      {/* 이미지 헤더 영역 */}
      <div className="relative h-72 bg-gradient-to-br from-amber-200 to-orange-400 dark:from-zinc-800 dark:to-orange-950 flex items-center justify-center">
        {/* 뒤로가기 버튼 */}
        <Link href="/" className="absolute top-6 left-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors">
          <ArrowLeft size={20} />
        </Link>
        
        {/* 가상 주류 이미지 대신 텍스트/이모지 플레이스홀더 */}
        <div className="text-6xl drop-shadow-xl">{review.image_url ? <img src={review.image_url} alt="주류 사진" className="w-full h-full object-cover" /> : '🥃'}</div>
        
        {/* 하단 그라데이션 오버레이 */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-slate-50 dark:from-zinc-950 to-transparent"></div>
      </div>

      {/* 본문 영역 */}
      <div className="px-6 pb-24 -mt-10 relative z-10">
        
        {/* 주류 정보 카드 */}
        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 shadow-xl shadow-slate-200/50 dark:shadow-none mb-6">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs font-bold text-orange-500 tracking-wider uppercase mb-1 block">{review.drink_category}</span>
              <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white leading-tight mb-2">{review.drink_name}</h1>
              <p className="text-xs text-slate-400 font-medium">{format(new Date(review.consumed_date), 'yyyy. MM. dd')} 마심</p>
            </div>
            <div className="flex flex-col items-center justify-center w-14 h-14 bg-amber-50 dark:bg-zinc-800 rounded-2xl">
              <span className="text-lg font-black text-amber-500">{review.rating}</span>
              <div className="flex mt-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={8} className={i < Math.floor(review.rating) ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200"} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 작성자 정보 */}
        <div className="flex items-center gap-3 mb-6 px-2">
          <div className="w-10 h-10 bg-slate-200 dark:bg-zinc-800 rounded-full flex items-center justify-center text-lg shadow-sm">
            {review.profiles?.avatar_url || '😎'}
          </div>
          <div>
            <p className="font-bold text-sm text-slate-800 dark:text-slate-200">{review.profiles?.nickname || '알 수 없음'}</p>
            <p className="text-[10px] text-slate-400">{format(new Date(review.created_at), 'yyyy.MM.dd')} 작성</p>
          </div>
        </div>

        {/* 테이스팅 노트 내용 */}
        <div className="px-2 mb-8">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">Tasting Notes</h3>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg font-medium whitespace-pre-wrap">
            {review.content}
          </p>
        </div>

        {/* 하단 인터랙션 바 */}
        <div className="flex justify-around items-center bg-white dark:bg-zinc-900 py-3 rounded-2xl shadow-sm border border-slate-100 dark:border-zinc-800">
          <button className="flex flex-col items-center gap-1 text-slate-400 hover:text-red-500 transition-colors">
            <Heart size={22} />
            <span className="text-[10px] font-bold">0</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-slate-400 hover:text-blue-500 transition-colors">
            <MessageCircle size={22} />
            <span className="text-[10px] font-bold">0</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-slate-400 hover:text-green-500 transition-colors">
            <Share2 size={22} />
            <span className="text-[10px] font-bold">공유</span>
          </button>
        </div>

      </div>
    </div>
  );
}
