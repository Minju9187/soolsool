'use client';

import { useGetReviews } from '@/features/reviews/api/useReviews';
import { FeedCard } from './FeedCard';

export function HomeFeedList() {
  const { data: reviews, isLoading, isError } = useGetReviews();

  if (isLoading) {
    return <div className="text-center py-20 text-slate-500">피드를 불러오는 중...</div>;
  }

  if (isError) {
    return <div className="text-center py-20 text-red-500">데이터를 불러오지 못했습니다.</div>;
  }

  if (!reviews || reviews.length === 0) {
    return (
      <div className="text-center py-20 text-slate-500">
        아직 작성된 리뷰가 없어요. 첫 번째 리뷰를 남겨보세요!
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {reviews.map((post) => (
        <FeedCard key={post.id} post={post} />
      ))}
    </div>
  );
}
