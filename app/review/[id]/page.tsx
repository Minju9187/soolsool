'use client';

import { ArrowLeft, Heart, MessageCircle, Share2, Star } from 'lucide-react';
import Link from 'next/link';

export default function ReviewDetailPage() {
  return (
    <div className="bg-slate-50 dark:bg-zinc-950 min-h-screen animate-in fade-in duration-300">
      
      {/* 이미지 헤더 영역 */}
      <div className="relative h-72 bg-gradient-to-br from-amber-200 to-orange-400 dark:from-zinc-800 dark:to-orange-950 flex items-center justify-center">
        {/* 뒤로가기 버튼 */}
        <Link href="/" className="absolute top-6 left-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors">
          <ArrowLeft size={20} />
        </Link>
        
        {/* 가상 주류 이미지 대신 텍스트/이모지 플레이스홀더 */}
        <div className="text-6xl drop-shadow-xl">🥃</div>
        
        {/* 하단 그라데이션 오버레이 */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-slate-50 dark:from-zinc-950 to-transparent"></div>
      </div>

      {/* 본문 영역 */}
      <div className="px-6 pb-24 -mt-10 relative z-10">
        
        {/* 주류 정보 카드 */}
        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 shadow-xl shadow-slate-200/50 dark:shadow-none mb-6">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs font-bold text-orange-500 tracking-wider uppercase mb-1 block">Whiskey</span>
              <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white leading-tight mb-2">발베니 더블우드 12년</h1>
              <p className="text-xs text-slate-400 font-medium">2026. 05. 17 마심</p>
            </div>
            <div className="flex flex-col items-center justify-center w-14 h-14 bg-amber-50 dark:bg-zinc-800 rounded-2xl">
              <span className="text-lg font-black text-amber-500">4.8</span>
              <div className="flex mt-0.5">
                <Star size={8} className="fill-amber-400 text-amber-400" />
                <Star size={8} className="fill-amber-400 text-amber-400" />
                <Star size={8} className="fill-amber-400 text-amber-400" />
              </div>
            </div>
          </div>
        </div>

        {/* 작성자 정보 */}
        <div className="flex items-center gap-3 mb-6 px-2">
          <div className="w-10 h-10 bg-slate-200 dark:bg-zinc-800 rounded-full flex items-center justify-center text-lg shadow-sm">
            😎
          </div>
          <div>
            <p className="font-bold text-sm text-slate-800 dark:text-slate-200">위스키러버</p>
            <p className="text-[10px] text-slate-400">나와 취향이 80% 일치해요</p>
          </div>
        </div>

        {/* 테이스팅 노트 내용 */}
        <div className="px-2 mb-8">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">Tasting Notes</h3>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg font-medium">
            달콤한 꿀 향과 바닐라의 부드러움이 완벽하게 어우러집니다. 알코올 튀는 느낌이 거의 없어서 위스키 입문용으로 이만한 게 없네요! 얼음 없이 니트(Neat)로 마실 때 가장 향이 좋았습니다. 
          </p>
        </div>

        {/* 하단 인터랙션 바 */}
        <div className="flex justify-around items-center bg-white dark:bg-zinc-900 py-3 rounded-2xl shadow-sm border border-slate-100 dark:border-zinc-800">
          <button className="flex flex-col items-center gap-1 text-slate-400 hover:text-red-500 transition-colors">
            <Heart size={22} />
            <span className="text-[10px] font-bold">12</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-slate-400 hover:text-blue-500 transition-colors">
            <MessageCircle size={22} />
            <span className="text-[10px] font-bold">3</span>
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
