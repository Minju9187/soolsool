import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabaseClient';

// 타입 정의 (차후 types/ 폴더로 분리 가능)
export interface Profile {
  id: string;
  nickname: string;
  avatar_url: string | null;
}

export interface Review {
  id: string;
  user_id: string;
  drink_name: string;
  drink_category: string;
  rating: number;
  content: string;
  consumed_date: string;
  image_url: string | null;
  created_at: string;
  profiles: Profile; // JOIN 데이터
}

// 1. 리뷰 목록 가져오기 (피드용)
export const useGetReviews = () => {
  return useQuery({
    queryKey: ['reviews'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('reviews')
        .select(`
          *,
          profiles (id, nickname, avatar_url)
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching reviews:', error);
        throw new Error(error.message);
      }
      return data as Review[];
    },
  });
};

// 2. 새로운 리뷰(테이스팅 노트) 등록하기
export const useAddReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newReview: {
      drink_name: string;
      drink_category: string;
      rating: number;
      content: string;
      consumed_date: string;
    }) => {
      // 현재 로그인된 유저 세션 가져오기
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('로그인이 필요합니다.');

      const { data, error } = await supabase
        .from('reviews')
        .insert([
          {
            ...newReview,
            user_id: session.user.id,
          },
        ])
        .select();

      if (error) {
        console.error('Error inserting review:', error);
        throw new Error(error.message);
      }
      return data;
    },
    onSuccess: () => {
      // 데이터가 추가되면 피드를 리프레시하기 위해 'reviews' 쿼리를 무효화
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
    },
  });
};

// 3. 단일 리뷰 상세 가져오기
export const useGetReviewById = (id: string) => {
  return useQuery({
    queryKey: ['reviews', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('reviews')
        .select(`
          *,
          profiles (id, nickname, avatar_url)
        `)
        .eq('id', id)
        .single();

      if (error) throw new Error(error.message);
      return data as Review;
    },
    enabled: !!id, // id가 있을 때만 실행
  });
};

// 4. 내 리뷰만 가져오기 (달력, 마이페이지용)
export const useGetMyReviews = () => {
  return useQuery({
    queryKey: ['my_reviews'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('로그인이 필요합니다.');

      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('user_id', session.user.id)
        .order('consumed_date', { ascending: false });

      if (error) throw new Error(error.message);
      return data as Review[];
    },
  });
};
