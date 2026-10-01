import React from 'react';
import { AnimationStepType, GameConfig, Pit as PitType, Player } from '../game/types';
import { Pit } from './Pit';
import { Sparkles } from 'lucide-react';

interface BoardProps {
  board: PitType[];
  config: GameConfig;
  currentPlayer: Player;
  legalMoves: number[];
  activeHighlightPitId: number | null;
  currentStepType?: AnimationStepType | null;
  nextTargetPitId?: number | null;
  invalidTouchedPitId?: number | null;
  hintPitId?: number | null;
  handSeedCount: number | null;
  lastCapturePits?: number[];
  isAnimating: boolean;
  isAIThinking: boolean;
  onSelectPit: (pitId: number) => void;
  onManualAdvanceTarget?: (pitId: number) => void;
  onAutoCompleteManual?: () => void;
}

export const Board: React.FC<BoardProps> = ({
  board,
  config,
  currentPlayer,
  legalMoves,
  activeHighlightPitId,
  currentStepType = null,
  nextTargetPitId = null,
  invalidTouchedPitId = null,
  hintPitId = null,
  handSeedCount,
  lastCapturePits = [],
  isAnimating,
  isAIThinking,
  onSelectPit,
  onManualAdvanceTarget,
  onAutoCompleteManual,
}) => {
  const { rows, columns } = config;

  const isTwoRows = rows === 2;

  // Slices for each row
  const row0 = board.slice(0, columns);
  const row1 = board.slice(columns, 2 * columns);
  const row2 = isTwoRows ? [] : board.slice(2 * columns, 3 * columns);
  const row3 = isTwoRows ? [] : board.slice(3 * columns, 4 * columns);

  const gridColsClass =
    columns === 12
      ? 'grid-cols-12'
      : columns === 10
      ? 'grid-cols-10'
      : columns === 6
      ? 'grid-cols-6'
      : 'grid-cols-8';

  const isManualActive = nextTargetPitId !== null;

  const renderPit = (pit: PitType, rowPlayer: Player) => {
    const isTarget = isManualActive && nextTargetPitId === pit.id;
    const isNormalSelectable =
      !isManualActive &&
      !isAnimating &&
      !isAIThinking &&
      currentPlayer === rowPlayer &&
      legalMoves.includes(pit.id);

    return (
      <Pit
        key={pit.id}
        pit={pit}
        isCurrentPlayer={currentPlayer === rowPlayer}
        isSelectable={isNormalSelectable}
        isNextManualTarget={isTarget}
        isInvalidTouched={invalidTouchedPitId === pit.id}
        isClickableForWarning={isManualActive}
        isHighlighted={activeHighlightPitId === pit.id}
        isHinted={hintPitId === pit.id}
        isCapturedTarget={lastCapturePits.includes(pit.id)}
        onSelect={onSelectPit}
        disabled={isAnimating || isAIThinking}
      />
    );
  };

  return (
    <div className="w-full relative select-none">
      {/* Board Wooden Frame */}
      <div className="w-full bg-[#2a1c17] border-4 border-[#3f2b24] rounded-2xl sm:rounded-3xl p-2 sm:p-4 wood-board-bevel relative overflow-hidden">
        {/* Subtle wood grain organic gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#3b241b]/30 via-transparent to-[#1a0f0b]/40 pointer-events-none rounded-2xl" />

        {/* Floating hand seed count during progressive sowing */}
        {handSeedCount !== null && (
          <div className="absolute top-2 right-3 z-30 flex items-center gap-1.5">
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-[#ffad47] text-zinc-950 text-[11px] sm:text-xs font-bold shadow-[0_0_12px_rgba(255,173,71,0.5)] border border-amber-300 pointer-events-none">
              <span>Sementes na mão: {handSeedCount}</span>
            </div>
            {isManualActive && onAutoCompleteManual && (
              <button
                type="button"
                onClick={onAutoCompleteManual}
                className="flex items-center gap-1 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-[#34221a] hover:bg-[#462d22] text-[#ffad47] border border-[#ffad47]/50 text-[11px] sm:text-xs font-semibold shadow-md transition-all hover:scale-105 active:scale-95"
              >
                <Sparkles className="w-3 h-3 text-[#ffad47]" />
                <span>Auto-concluir</span>
              </button>
            )}
          </div>
        )}

        {/* Player 2 Territory Header */}
        <div className="flex items-center justify-between px-1 mb-1.5 text-xs text-[#d8c2bb]">
          <span className="font-semibold tracking-wider uppercase text-[10px] sm:text-xs flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#ffb867]/60" />
            Adversário (Campo Superior)
          </span>
          <span className="text-[10px] sm:text-xs text-[#a8928c] flex items-center gap-1">
            Sentido Horário
          </span>
        </div>

        {/* Board Rows Container */}
        <div className="flex flex-col gap-1.5 sm:gap-2 relative z-10">
          {/* Row 0: Player 2 Outer (or Player 2 single row if 2-row) */}
          <div className="relative">
            <div className={`grid ${gridColsClass} gap-1 sm:gap-2`}>
              {row0.map((pit) => renderPit(pit, 'player2'))}
            </div>
          </div>

          {/* Row 1: Player 2 Inner (or Player 1 single row if 2-row) */}
          <div className="relative">
            <div className={`grid ${gridColsClass} gap-1 sm:gap-2`}>
              {row1.map((pit) => renderPit(pit, isTwoRows ? 'player1' : 'player2'))}
            </div>
          </div>

          {/* Central Carved Traditional Divider */}
          <div className="w-full flex items-center justify-between py-1 px-2 border-y border-[#3d271f]/80 my-0.5 bg-[#201410]/70 rounded-md">
            <span className="text-[9px] uppercase tracking-widest text-[#a8928c]/60 font-semibold">
              MAKOKO ADVERSÁRIO
            </span>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ffad47]/50" />
              <span className="text-[10px] tracking-widest font-black text-[#ffad47]/90 font-display">
                NTXUVA
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#ffad47]/50" />
            </div>
            <span className="text-[9px] uppercase tracking-widest text-[#a8928c]/60 font-semibold">
              O TEU TERRITÓRIO
            </span>
          </div>

          {/* Row 2: Player 1 Inner (if 4 rows) */}
          {!isTwoRows && (
            <div className="relative">
              <div className={`grid ${gridColsClass} gap-1 sm:gap-2`}>
                {row2.map((pit) => renderPit(pit, 'player1'))}
              </div>
            </div>
          )}

          {/* Row 3: Player 1 Outer (if 4 rows) */}
          {!isTwoRows && (
            <div className="relative">
              <div className={`grid ${gridColsClass} gap-1 sm:gap-2`}>
                {row3.map((pit) => renderPit(pit, 'player1'))}
              </div>
            </div>
          )}
        </div>

        {/* Player 1 Territory Footer */}
        <div className="flex items-center justify-between px-1 mt-1.5 text-xs text-[#d8c2bb]">
          <span className="font-semibold tracking-wider uppercase text-[10px] sm:text-xs flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#ffad47]" />
            O Teu Território (Campo Inferior)
          </span>
          <span className="text-[10px] sm:text-xs text-[#ffad47] flex items-center gap-1">
            Sentido Anti-horário
          </span>
        </div>
      </div>
    </div>
  );
};
