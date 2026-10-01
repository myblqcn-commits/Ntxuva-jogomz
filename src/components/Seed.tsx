import React from 'react';

interface SeedProps {
  count: number;
}

export const Seed: React.FC<SeedProps> = ({ count }) => {
  if (count <= 0) return null;

  // Natural warm stone / seed colors
  const pebbleStyles = [
    'bg-gradient-to-br from-[#d4a373] to-[#8d5b2c] border-[#faedcd]/40',
    'bg-gradient-to-br from-[#e0a96d] to-[#6f4518] border-[#ffe8d6]/40',
    'bg-gradient-to-br from-[#cca47e] to-[#7f4f24] border-[#faedcd]/40',
    'bg-gradient-to-br from-[#ddb892] to-[#936639] border-[#faedcd]/40',
  ];

  if (count === 1) {
    return (
      <div
        className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border shadow-md ${pebbleStyles[0]} seed-stone`}
      />
    );
  }

  if (count === 2) {
    return (
      <div className="flex gap-1 items-center justify-center">
        <div
          className={`w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full border shadow-md ${pebbleStyles[0]} seed-stone`}
        />
        <div
          className={`w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full border shadow-md ${pebbleStyles[1]} seed-stone`}
        />
      </div>
    );
  }

  if (count === 3) {
    return (
      <div className="flex flex-col items-center justify-center -space-y-1">
        <div className="flex gap-1">
          <div
            className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full border shadow-md ${pebbleStyles[0]} seed-stone`}
          />
          <div
            className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full border shadow-md ${pebbleStyles[1]} seed-stone`}
          />
        </div>
        <div
          className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full border shadow-md ${pebbleStyles[2]} seed-stone`}
        />
      </div>
    );
  }

  if (count === 4) {
    return (
      <div className="grid grid-cols-2 gap-0.5 sm:gap-1 items-center justify-center">
        <div className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full border shadow-md ${pebbleStyles[0]} seed-stone`} />
        <div className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full border shadow-md ${pebbleStyles[1]} seed-stone`} />
        <div className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full border shadow-md ${pebbleStyles[2]} seed-stone`} />
        <div className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full border shadow-md ${pebbleStyles[3]} seed-stone`} />
      </div>
    );
  }

  // 5 or more seeds: structured organic cluster with numerical focal badge
  return (
    <div className="relative flex items-center justify-center">
      <div className="absolute -top-1 -left-1 w-2.5 h-2.5 rounded-full bg-[#8d5b2c] opacity-60 pointer-events-none" />
      <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#6f4518] opacity-60 pointer-events-none" />
      <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-br from-[#c67c3b] to-[#783e15] border border-[#ffcf99]/40 flex items-center justify-center text-[10px] sm:text-xs font-bold text-[#fff8f3] shadow-md z-10">
        {count}
      </div>
    </div>
  );
};
