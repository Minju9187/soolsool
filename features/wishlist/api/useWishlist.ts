import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabaseClient';

export interface Wishlist {
  id: string;
  user_id: string;
  drink_name: string;
  drink_category: string;
  reason: string;
  created_at: string;
}

export const useGetMyWishlists = () => {
  return useQuery({
    queryKey: ['my_wishlists'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('로그인이 필요합니다.');

      const { data, error } = await supabase
        .from('wishlists')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });

      if (error) throw new Error(error.message);
      return data as Wishlist[];
    },
  });
};

export const useAddWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newWishlist: {
      drink_name: string;
      drink_category: string;
      reason: string;
    }) => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('로그인이 필요합니다.');

      const { data, error } = await supabase
        .from('wishlists')
        .insert([
          {
            ...newWishlist,
            user_id: session.user.id,
          },
        ])
        .select();

      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my_wishlists'] });
    },
  });
};
