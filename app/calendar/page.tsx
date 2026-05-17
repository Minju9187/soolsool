import SoolCalendar from '@/features/calendar/components/SoolCalendar';

export default function CalendarPage() {
  return (
    <div className="px-4 py-8">
      <div className="mb-6 px-2">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          나의 <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">술 달력</span>
        </h1>
        <p className="text-sm text-slate-500 mt-2">이번 달은 얼마나 달렸을까요?</p>
      </div>
      
      <SoolCalendar />
    </div>
  );
}
