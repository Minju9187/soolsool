'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleAuth = async (type: 'login' | 'signup') => {
    setLoading(true);
    setError(null);

    try {
      if (type === 'signup') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        alert('회원가입 성공! (이메일 인증이 필요할 수 있습니다)');
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        router.push('/');
      }
    } catch (err: any) {
      setError(err.message || '인증 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-center px-6 py-12 bg-gradient-to-br from-orange-50 to-amber-100 dark:from-zinc-900 dark:to-zinc-950 animate-in fade-in duration-700">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white dark:bg-zinc-800 shadow-md mb-6 animate-in zoom-in duration-500 delay-150">
          <span className="text-3xl">🍶</span>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          술술
        </h1>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 font-medium">
          당신의 특별한 한 잔을 기록하세요
        </p>
      </div>

      <Card className="border-0 shadow-2xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl sm:mx-auto sm:w-full sm:max-w-sm rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-orange-500/10">
        <CardHeader className="space-y-1 pb-6 pt-8 px-8">
          <CardTitle className="text-2xl font-bold text-center">환영합니다</CardTitle>
          <CardDescription className="text-center text-sm">
            이메일 계정으로 간편하게 시작해보세요
          </CardDescription>
        </CardHeader>
        <CardContent className="px-8 pb-8">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAuth('login');
            }}
            className="space-y-5"
          >
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 bg-white/50 dark:bg-zinc-800/50 border-slate-200 dark:border-zinc-700 focus-visible:ring-orange-500 transition-all rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-12 bg-white/50 dark:bg-zinc-800/50 border-slate-200 dark:border-zinc-700 focus-visible:ring-orange-500 transition-all rounded-xl"
              />
            </div>
            
            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800/30">
                <p className="text-xs text-red-600 dark:text-red-400 font-medium text-center">{error}</p>
              </div>
            )}
            
            <div className="pt-4 flex flex-col gap-3">
              <Button 
                type="submit" 
                disabled={loading} 
                className="w-full h-12 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold shadow-lg shadow-orange-600/30 transition-all active:scale-[0.98]"
              >
                {loading ? '인증 중...' : '로그인'}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                disabled={loading} 
                onClick={() => handleAuth('signup')}
                className="w-full h-12 rounded-xl border-orange-200 text-orange-700 hover:bg-orange-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800 transition-all active:scale-[0.98]"
              >
                새로 오셨나요? 회원가입
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
