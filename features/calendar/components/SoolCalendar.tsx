'use client';

import { useState } from 'react';
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  isSameMonth, 
  isSameDay, 
  addDays 
} from 'date-fns';
import { ChevronLeft, ChevronRight, Wine } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useGetMyReviews } from '@/features/reviews/api/useReviews';
import Link from 'next/link';

export default function SoolCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const { data: myReviews = [], isLoading } = useGetMyReviews();

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const onDateClick = (day: Date) => setSelectedDate(day);

  // 달력 렌더링 로직
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const dateFormat = 'd';
  const rows = [];
  let days = [];
  let day = startDate;
  let formattedDate = '';

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, dateFormat);
      const cloneDay = day;
      
      // 해당 날짜에 기록이 있는지 확인
      const hasRecord = myReviews.find(record => isSameDay(new Date(record.consumed_date), cloneDay));
      const isSelected = isSameDay(day, selectedDate);
      const isCurrentMonth = isSameMonth(day, monthStart);
      const isToday = isSameDay(day, new Date());

      days.push(
        <div
          key={day.toString()}
          onClick={() => onDateClick(cloneDay)}
          className={`
            relative flex flex-col items-center justify-center p-2 h-16 w-full cursor-pointer transition-all duration-300 rounded-xl
            ${!isCurrentMonth ? 'text-slate-300 dark:text-slate-600 opacity-50' : 'text-slate-700 dark:text-slate-200'}
            ${isSelected ? 'bg-orange-50 dark:bg-orange-950/30' : 'hover:bg-slate-100 dark:hover:bg-zinc-800'}
          `}
        >
          {/* 오늘 날짜 표시기 */}
          {isToday && (
            <span className="absolute top-1 w-1 h-1 rounded-full bg-orange-500"></span>
          )}

          <span className={`text-sm font-medium ${isSelected ? 'text-orange-600 dark:text-orange-400 font-bold' : ''}`}>
            {formattedDate}
          </span>
          
          {/* 술 기록 아이콘 */}
          {hasRecord && (
            <div className={`mt-1 rounded-full p-1 ${isSelected ? 'bg-orange-500 text-white' : 'bg-orange-100 text-orange-600 dark:bg-orange-900/50 dark:text-orange-400'} shadow-sm transition-transform active:scale-90`}>
              <Wine size={14} />
            </div>
          )}
        </div>
      );
      day = addDays(day, 1);
    }
    rows.push(
      <div className="grid grid-cols-7 gap-1 w-full mb-1" key={day.toString()}>
        {days}
      </div>
    );
    days = [];
  }

  // 선택된 날짜의 리뷰 필터링
  const selectedDateReviews = myReviews.filter(record => isSameDay(new Date(record.consumed_date), selectedDate));

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <Card className="border-0 shadow-xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl rounded-3xl overflow-hidden p-6">
        
        {/* 달력 헤더 (월 이동) */}
        <div className="flex justify-between items-center mb-6">
          <Button variant="ghost" size="icon" onClick={prevMonth} className="rounded-full hover:bg-orange-50 dark:hover:bg-zinc-800 text-slate-500">
            <ChevronLeft size={20} />
          </Button>
          <div className="flex flex-col items-center">
            <span className="text-xs font-semibold text-orange-500 uppercase tracking-widest">{format(currentDate, 'yyyy')}</span>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">{format(currentDate, 'MMMM')}</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={nextMonth} className="rounded-full hover:bg-orange-50 dark:hover:bg-zinc-800 text-slate-500">
            <ChevronRight size={20} />
          </Button>
        </div>

        {/* 요일 헤더 */}
        <div className="grid grid-cols-7 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d, i) => (
            <div key={d} className={`text-center text-xs font-bold ${i === 0 ? 'text-red-400' : i === 6 ? 'text-blue-400' : 'text-slate-400'}`}>
              {d}
            </div>
          ))}
        </div>

        {/* 날짜 그리드 */}
        <div className="w-full">
          {isLoading ? (
            <div className="text-center py-10 text-slate-400">기록을 불러오는 중...</div>
          ) : rows}
        </div>
      </Card>
      
      {/* 선택된 날짜 상세 내역 뷰어 */}
      <div className="mt-6 px-2">
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4">
          {format(selectedDate, 'M월 d일')}의 기록
        </h3>
        
        {selectedDateReviews.length > 0 ? (
          <div className="space-y-3">
            {selectedDateReviews.map(record => (
              <Link key={record.id} href={`/review/${record.id}`}>
                <Card className="border-0 shadow-md bg-white dark:bg-zinc-800 rounded-2xl p-4 flex items-center gap-4 hover:border-orange-200 transition-colors cursor-pointer">
                  <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-950 flex items-center justify-center text-orange-600">
                    <Wine size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">{record.drink_name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs px-2 py-0.5 bg-slate-100 dark:bg-zinc-700 rounded-md font-medium">{record.drink_category}</span>
                      <span className="text-xs text-orange-500 font-bold">★ {record.rating}</span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 bg-slate-50 dark:bg-zinc-900/50 rounded-2xl border border-dashed border-slate-200 dark:border-zinc-800">
            <p className="text-slate-400 text-sm">이 날은 간이 쉬어가는 날이었네요! 🌿</p>
            <Link href="/add">
              <Button variant="outline" className="mt-4 rounded-xl border-orange-200 text-orange-600 hover:bg-orange-50">
                새로운 기록 추가하기
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
