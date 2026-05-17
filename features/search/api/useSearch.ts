import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabaseClient';
import { Review } from '@/features/reviews/api/useReviews';

export const useSearchReviews = (query: string) => {
  return useQuery({
    queryKey: ['search', query],
    queryFn: async () => {
      if (!query.trim()) return [];

      const { data, error } = await supabase
        .from('reviews')
        .select(`
          *,
          profiles (id, nickname, avatar_url)
        `)
        // 술 이름이나 테이스팅 노트 본문에 검색어가 포함되어 있는지 ilike 로 검사
        .or(`drink_name.ilike.%${query}%,content.ilike.%${query}%`)
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw new Error(error.message);
      return data as Review[];
    },
    enabled: !!query.trim(), // 검색어가 있을 때만 실행
  });
};
