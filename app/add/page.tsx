'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Camera, Star } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAddReview } from '@/features/reviews/api/useReviews';

const CATEGORIES = ['Whiskey', 'Wine', 'Beer', 'Soju', 'Sake', 'Cocktail', 'Other'];

export default function AddRecordPage() {
  const router = useRouter();
  const { mutateAsync: addReview, isPending } = useAddReview();

  const [drinkName, setDrinkName] = useState('');
  const [category, setCategory] = useState('');
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState('');
  const [consumedDate, setConsumedDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!drinkName || !category || rating === 0) {
      alert('술 이름, 주종, 그리고 별점을 모두 입력해주세요.');
      return;
    }

    try {
      await addReview({
        drink_name: drinkName,
        drink_category: category,
        rating,
        content,
        consumed_date: consumedDate,
      });
      alert('기록이 성공적으로 저장되었습니다!');
      router.push('/');
    } catch (error: any) {
      alert(`저장 실패: ${error.message}`);
    }
  };

  return (
    <div className="px-4 py-8 animate-in slide-in-from-bottom-8 duration-500">
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          테이스팅 노트 작성
        </h1>
        <p className="text-sm text-slate-500 mt-2">오늘 마신 술을 영원히 기억해보세요.</p>
      </div>

      <form className="space-y-8 pb-10" onSubmit={handleSubmit}>
        
        {/* 사진 업로드 */}
        <section className="flex flex-col items-center justify-center w-full h-40 bg-slate-100 dark:bg-zinc-800/50 rounded-3xl border-2 border-dashed border-slate-300 dark:border-zinc-700 cursor-pointer hover:bg-slate-200 dark:hover:bg-zinc-800 transition-colors">
          <Camera size={36} className="text-slate-400 mb-2" />
          <span className="text-sm font-medium text-slate-500">사진 추가하기 (준비 중)</span>
        </section>

        {/* 기본 정보 */}
        <section className="space-y-5 bg-white dark:bg-zinc-900/50 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-zinc-800">
          <div className="space-y-2">
            <Label className="text-slate-500 font-bold uppercase text-xs tracking-widest">어떤 술인가요?</Label>
            <Input 
              value={drinkName}
              onChange={(e) => setDrinkName(e.target.value)}
              placeholder="술 이름을 입력하세요" 
              className="h-12 border-0 bg-slate-50 dark:bg-zinc-800 font-semibold text-lg px-4 rounded-xl" 
            />
          </div>

          <div className="space-y-3">
            <Label className="text-slate-500 font-bold uppercase text-xs tracking-widest">주종</Label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  className={`px-4 py-2 rounded-full text-sm font-bold transition-all active:scale-95 ${
                    category === c 
                    ? 'bg-orange-500 text-white shadow-md shadow-orange-500/30' 
                    : 'bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-slate-500 font-bold uppercase text-xs tracking-widest">마신 날짜</Label>
            <Input 
              type="date" 
              value={consumedDate}
              onChange={(e) => setConsumedDate(e.target.value)}
              className="h-12 border-0 bg-slate-50 dark:bg-zinc-800 px-4 rounded-xl text-slate-700 dark:text-slate-200 font-medium" 
            />
          </div>
        </section>

        {/* 평점 및 노트 */}
        <section className="space-y-6 bg-white dark:bg-zinc-900/50 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-zinc-800">
          <div className="space-y-3 flex flex-col items-center">
            <Label className="text-slate-500 font-bold uppercase text-xs tracking-widest">총평 (별점)</Label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button 
                  key={star} 
                  type="button"
                  onClick={() => setRating(star)}
                  className="transition-transform active:scale-75"
                >
                  <Star 
                    size={36} 
                    className={`${star <= rating ? 'fill-amber-400 text-amber-400' : 'fill-slate-100 text-slate-200 dark:fill-zinc-800 dark:text-zinc-700'}`} 
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-slate-500 font-bold uppercase text-xs tracking-widest">테이스팅 노트</Label>
            <Textarea 
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="향, 맛, 바디감, 그리고 누구와 함께 마셨는지 자유롭게 기록해보세요." 
              className="min-h-[120px] border-0 bg-slate-50 dark:bg-zinc-800 rounded-xl resize-none text-base p-4"
            />
          </div>
        </section>

        <Button 
          type="submit"
          disabled={isPending}
          className="w-full h-14 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-lg shadow-xl shadow-orange-600/20 active:scale-[0.98] transition-all"
        >
          {isPending ? '저장 중...' : '저장하기'}
        </Button>
      </form>
    </div>
  );
}
