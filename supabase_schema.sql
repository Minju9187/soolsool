-- 1. Profiles (유저 프로필) 테이블 생성
-- Supabase Auth의 users 테이블과 1:1로 연결됩니다.
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  nickname TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Reviews (음주 기록 및 테이스팅 노트) 테이블 생성
CREATE TABLE public.reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  drink_name TEXT NOT NULL,
  drink_category TEXT, -- 예: 위스키, 와인, 맥주, 전통주 등
  rating NUMERIC(2,1) CHECK (rating >= 0 AND rating <= 5), -- 0.0 ~ 5.0 별점
  content TEXT, -- 한줄 평 및 상세 노트
  consumed_date DATE DEFAULT CURRENT_DATE NOT NULL, -- 달력 매핑용 마신 날짜
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Row Level Security (RLS) 활성화
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- 4. RLS 보안 정책 (Policies) 설정

-- [Profiles 정책]
-- 누구나 다른 사람의 프로필을 볼 수 있음 (소셜 기능)
CREATE POLICY "Profiles are viewable by everyone." ON public.profiles FOR SELECT USING (true);
-- 자신의 프로필만 수정 가능
CREATE POLICY "Users can update own profile." ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- [Reviews 정책]
-- 누구나 다른 사람의 리뷰를 볼 수 있음 (피드 기능)
CREATE POLICY "Reviews are viewable by everyone." ON public.reviews FOR SELECT USING (true);
-- 로그인한 사용자 본인만 자신의 리뷰를 등록/수정/삭제 가능
CREATE POLICY "Users can insert their own reviews." ON public.reviews FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own reviews." ON public.reviews FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own reviews." ON public.reviews FOR DELETE USING (auth.uid() = user_id);

-- 5. Trigger (회원가입 시 자동으로 Profiles 테이블에 데이터 생성)
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, nickname)
  VALUES (new.id, new.email, split_part(new.email, '@', 1));
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
