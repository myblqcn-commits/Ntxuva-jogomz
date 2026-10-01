import React from 'react';
import { Pit as PitType } from '../game/types';
import { Seed } from './Seed';

interface PitProps {
  pit: PitType;
  isCurrentPlayer: boolean;
  isSelectable: boolean;
  isHighlighted?: boolean;
  isCapturedTarget?: boolean;
  isHinted?: boolean;
  isNextManualTarget?: boolean;
  isInvalidTouched?: boolean;
  isClickableForWarning?: boolean;
  onSelect: (pitId: number) => void;
  disabled: boolean;
  // Deprecated props kept optional for backward compatibility
  stepType?: unknown;
  isReceivingSeed?: boolean;
  isPickupOrigin?: boolean;
  isResowOrigin?: boolean;
  onManualAdvanceTarget?: (pitId: number) => void;
}

export const Pit: React.FC<PitProps> = ({
  pit,
  isSelectable,
  isHighlighted = false,
  isCapturedTarget = false,
  isHinted = false,
  isNextManualTarget = false,
  isInvalidTouched = false,
  isClickableForWarning = false,
  onSelect,
  disabled,
}) => {
  const isP1 = pit.owner === 'player1';

  let borderEffect = 'border-[#3a2720]';
  let animationClass = '';
  let shadowClass = 'pit-wood-shadow bg-[#231713]';
  let statusBadge: React.ReactNode = null;

  if (isCapturedTarget) {
    borderEffect = 'border-red-500 ring-2 ring-red-500/70 shadow-[0_0_12px_rgba(239,68,68,0.7)]';
    shadowClass = 'bg-[#3b1212]';
  } else if (isNextManualTarget) {
    borderEffect = 'border-emerald-400 ring-4 ring-emerald-400/90 shadow-[0_0_24px_rgba(52,211,153,0.95)]';
    shadowClass = 'bg-gradient-to-b from-[#18462b] to-[#0e2c1a]';
    animationClass = 'scale-110 z-30 cursor-pointer animate-pulse';
    statusBadge = (
      <span className="absolute -top-4 z-40 px-2 py-0.5 rounded-full bg-emerald-400 text-emerald-950 text-[10px] font-black shadow-lg flex items-center gap-0.5 whitespace-nowrap animate-bounce">
        👇 Depositar
      </span>
    );
  } else if (isInvalidTouched) {
    borderEffect = 'border-rose-500 ring-2 ring-rose-500/90 shadow-[0_0_14px_rgba(244,63,94,0.8)]';
    shadowClass = 'bg-[#401318]';
    animationClass = 'scale-95 transition-transform duration-150';
    statusBadge = (
      <span className="absolute -top-4 z-40 px-2 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-bold shadow-lg flex items-center gap-0.5 whitespace-nowrap">
        ⚠️ Inválida
      </span>
    );
  } else if (isHinted) {
    borderEffect = 'border-amber-400 ring-2 ring-amber-400/80 shadow-[0_0_15px_rgba(251,191,36,0.6)]';
    shadowClass = 'bg-gradient-to-b from-[#3d2915] to-[#25180c]';
    statusBadge = (
      <span className="absolute -top-3.5 z-40 px-2 py-0.2 rounded-full bg-amber-400 text-amber-950 text-[10px] font-bold shadow-md flex items-center gap-0.5">
        💡 Dica
      </span>
    );
  } else if (isHighlighted) {
    borderEffect = 'border-[#ffad47] ring-2 ring-[#ffad47]/90 shadow-[0_0_14px_rgba(255,173,71,0.7)]';
    shadowClass = 'bg-[#3b241b]';
    animationClass = 'scale-105 z-20 transition-transform duration-150';
  } else if (isSelectable) {
    borderEffect = 'border-[#ffad47] shadow-[0_0_6px_rgba(255,173,71,0.5)] hover:border-[#ffd6a5]';
    animationClass = 'cursor-pointer hover:scale-[1.03] active:scale-[0.97]';
    shadowClass = 'bg-[#2a1c17] hover:bg-[#34231c]';
  }

  const rowName = pit.isInner ? 'Interior' : 'Exterior';
  const playerName = isP1 ? 'Jogador 1' : 'Jogador 2';
  const ariaDescription = `Cava ${pit.id}, ${playerName}, fila ${rowName}, coluna ${pit.col + 1}, ${pit.seeds} ${pit.seeds === 1 ? 'semente' : 'sementes'}${isSelectable || isNextManualTarget ? ', jogável' : ''}`;

  const isClickable = !disabled && (isSelectable || isNextManualTarget || isClickableForWarning);

  const handleClick = () => {
    if (isClickable) {
      onSelect(pit.id);
    }
  };

  return (
    <button
      type="button"
      id={`pit-${pit.id}`}
      aria-label={ariaDescription}
      disabled={!isClickable}
      onClick={handleClick}
      className={`relative w-full aspect-square rounded-full flex flex-col items-center justify-center p-0.5 sm:p-1 border-2 transition-transform duration-100 select-none ${shadowClass} ${borderEffect} ${animationClass}`}
    >
      {/* Optional Hint badge */}
      {statusBadge}

      {/* Badge with seed count */}
      <span
        className={`absolute -top-1 -right-1 sm:-top-1.5 sm:-right-1.5 min-w-[16px] h-4 sm:min-w-[18px] sm:h-4.5 px-1 rounded-full text-[9px] sm:text-[10px] font-bold flex items-center justify-center shadow-md transition-colors ${
          pit.seeds > 0
            ? isP1
              ? 'bg-[#8a3319] text-[#fff8f3] border border-[#ffb5a0]/40'
              : 'bg-[#5c4c47] text-[#fff8f3] border border-[#d8c2bb]/40'
            : 'bg-[#372f23] text-[#89726c] opacity-50'
        }`}
      >
        {pit.seeds}
      </span>

      {/* Seeds rendering */}
      <div className="w-full h-full flex items-center justify-center pointer-events-none">
        <Seed count={pit.seeds} />
      </div>

      {/* Selectable subtle indicator (sem piscar) */}
      {isSelectable && (
        <span className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-[#ffad47]" />
      )}
    </button>
  );
};
