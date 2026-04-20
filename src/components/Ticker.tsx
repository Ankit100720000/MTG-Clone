import { TICKER_ITEMS } from '../data';

const Ticker = () => {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="ticker-wrap bg-[#1E1E2E] text-white py-2">
      <div className="ticker-content animate-ticker">
        {doubled.map((item, i) => {
          const Icon = item.icon;
          return (
            <span key={i} className="inline-flex items-center gap-2 px-8 text-xs font-medium text-white/80">
              <Icon size={12} className="text-indigo-400 flex-shrink-0" />
              {item.text}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default Ticker;
