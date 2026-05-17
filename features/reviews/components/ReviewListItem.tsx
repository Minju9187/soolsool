import Link from 'next/link';
import { Star, Wine } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface ReviewListItemProps {
  id: string;
  drinkName: string;
  drinkCategory: string;
  rating: number;
  subtitle?: string; // e.g. consumed_date, author name
  showIcon?: boolean;
}

export function ReviewListItem({ id, drinkName, drinkCategory, rating, subtitle, showIcon = false }: ReviewListItemProps) {
  return (
    <Link href={`/review/${id}`} className="block">
      <Card className="border-0 shadow-sm bg-white dark:bg-zinc-900 rounded-2xl p-4 flex items-center justify-between hover:border-orange-200 transition-colors cursor-pointer active:scale-[0.98]">
        <div className="flex items-center gap-4">
          {showIcon && (
            <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-950 flex items-center justify-center text-orange-600">
              <Wine size={24} />
            </div>
          )}
          <div>
            <h3 className="font-bold text-slate-800 dark:text-slate-200">{drinkName}</h3>
            <span className="text-xs text-slate-400 mt-1 block">
              {drinkCategory} {subtitle ? `• ${subtitle}` : ''}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-950/30 px-3 py-1.5 rounded-lg shrink-0">
          <Star size={14} className="fill-amber-400 text-amber-400" />
          <span className="font-bold text-amber-600 dark:text-amber-400 text-sm">{rating}</span>
        </div>
      </Card>
    </Link>
  );
}
