import { HomeFeedList } from '@/features/reviews/components/HomeFeedList';

export default function HomeFeedPage() {
  return (
    <div className="px-4 py-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-24">
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

      {/* 클라이언트 컴포넌트 호출 */}
      <HomeFeedList />
      
    </div>
  );
}
