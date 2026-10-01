import React from 'react';
import { AIDifficulty, GameMode, Player } from '../game/types';
import { User, Cpu, Sparkles } from 'lucide-react';

interface PlayerPanelProps {
  player: Player;
  isCurrentTurn: boolean;
  gameMode: GameMode;
  difficulty: AIDifficulty;
  totalSeedsOnBoard: number;
  capturedCount: number;
  isAIThinking: boolean;
  isAnimating?: boolean;
  avatarUrl?: string;
}

export const PlayerPanel: React.FC<PlayerPanelProps> = ({
  player,
  isCurrentTurn,
  gameMode,
  difficulty,
  totalSeedsOnBoard,
  capturedCount,
  isAIThinking,
  isAnimating = false,
  avatarUrl,
}) => {
  const isP1 = player === 'player1';
  const isAI = !isP1 && gameMode === 'ai';

  const playerName = isP1
    ? 'Jogador 1 (Você)'
    : isAI
    ? 'Mestre Nyami'
    : 'Jogador 2';

  const roleLabel = isP1
    ? 'Você'
    : isAI
    ? `IA · ${difficulty === 'hard' ? 'Difícil' : difficulty === 'medium' ? 'Médio' : 'Fácil'}`
    : 'P2';

  let statusText = 'Aguardando jogada';
  if (isCurrentTurn) {
    if (isAnimating) {
      statusText = 'A semear sementes...';
    } else if (isAI) {
      statusText = 'A sua vez';
    } else {
      statusText = 'A sua vez de jogar';
    }
  }

  return (
    <div
      className={`w-full bg-[#271b16] rounded-xl p-3 sm:p-4 border transition-all duration-200 shadow-sm ${
        isCurrentTurn
          ? 'border-[#ffad47] shadow-[0_0_10px_rgba(255,173,71,0.2)] bg-[#30211b]'
          : 'border-[#3d2a23] opacity-85'
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        {/* Left: Avatar & Info */}
        <div className="flex items-center gap-3">
          {/* Avatar container */}
          <div className="relative">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-[#3f2a22] border-2 border-[#573d32] flex items-center justify-center text-[#ffad47] shadow-inner">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={playerName}
                  className="w-full h-full object-cover"
                />
              ) : isAI ? (
                <Cpu className="w-6 h-6 text-[#ffb867]" />
              ) : (
                <User className="w-6 h-6 text-[#ffad47]" />
              )}
            </div>

            {/* Turn border indicator without blinking */}
            {isCurrentTurn && (
              <span className="absolute -inset-1 rounded-full border-2 border-[#ffad47] pointer-events-none" />
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-sm sm:text-base text-[#fff8f3] tracking-tight">
                {playerName}
              </span>
              <span className="bg-[#3e2b24] text-[#ffad47] text-[10px] font-semibold px-1.5 py-0.5 rounded border border-[#52392f] uppercase tracking-wider">
                {roleLabel}
              </span>
            </div>

            <div className="flex items-center gap-1.5 mt-0.5 text-xs text-[#c4aca4]">
              <span
                className={`w-2 h-2 rounded-full ${
                  isCurrentTurn ? 'bg-[#ffad47]' : 'bg-[#5c473f]'
                }`}
              />
              <span className={isCurrentTurn ? 'text-[#ffcf99] font-medium' : ''}>
                {statusText}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Scores & Captures */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Remaining on Board */}
          <div className="flex flex-col items-end">
            <span className="text-[10px] uppercase tracking-wider text-[#a8928c]">
              No Campo
            </span>
            <span className="text-sm sm:text-base font-bold text-[#e6d8c6]">
              {totalSeedsOnBoard}
            </span>
          </div>

          <div className="w-px h-7 bg-[#443129]" />

          {/* Captured stash */}
          <div className="flex items-center gap-2 bg-[#33221b] px-2.5 py-1.5 rounded-lg border border-[#48332a]">
            <div className="flex flex-col items-end">
              <span className="text-[9px] uppercase tracking-wider text-[#ffb867] font-semibold">
                Capturadas
              </span>
              <span className="text-sm sm:text-base font-bold text-[#ffad47] leading-none">
                {capturedCount}
              </span>
            </div>
            <div className="w-7 h-7 rounded-full bg-[#8a3319] text-[#fff8f3] flex items-center justify-center shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#ffb5a0]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
