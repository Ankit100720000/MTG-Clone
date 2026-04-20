import { Star } from 'lucide-react';

const Stars = ({ rating }: { rating: number }) => (
  <span className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map(s => (
      <Star key={s} size={11} className={s <= Math.round(rating) ? 'star-filled fill-amber-400' : 'star-empty fill-slate-200'} />
    ))}
  </span>
);

export default Stars;
