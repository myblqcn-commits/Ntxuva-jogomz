import React from 'react';
import { GameMode, Player } from '../game/types';
import { Swords, Info, Sparkles, Lightbulb } from 'lucide-react';

interface ScoreBoardProps {
  currentPlayer: Player;
  gameMode: GameMode;
  isAIThinking: boolean;
  isAnimating: boolean;
  isManualMode?: boolean;
  isManualMoveActive?: boolean;
  manualWarningMessage?: string | null;
  hintPitId?: number | null;
  legalMovesCount: number;
  lastCaptureInfo: { count: number; player: Player; pits: number[] } | null;
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({
  currentPlayer,
  gameMode,
  isAIThinking,
  isAnimating,
  isManualMode = false,
  isManualMoveActive = false,
  manualWarningMessage = null,
  hintPitId = null,
  legalMovesCount,
  lastCaptureInfo,
}) => {
  const isP1 = currentPlayer === 'player1';
  const isAI = !isP1 && gameMode === 'ai';

  let bannerText = '';
  if (manualWarningMessage) {
    bannerText = manualWarningMessage;
  } else if (lastCaptureInfo) {
    const capturerName =
      lastCaptureInfo.player === 'player1'
        ? 'Jogador 1'
        : gameMode === 'ai'
        ? 'Mestre Nyami'
        : 'Jogador 2';
    bannerText = `⚔️ ${capturerName} capturou ${lastCaptureInfo.count} sementes do adversário!`;
  } else if (isManualMoveActive) {
    bannerText = '👉 Toque na cava destacada a verde para depositar 1 semente';
  } else if (isAnimating) {
    const moverName =
      currentPlayer === 'player1'
        ? 'Jogador 1'
        : gameMode === 'ai'
        ? 'Mestre Nyami'
        : 'Jogador 2';
    bannerText = `${moverName} a semear sementes no circuito...`;
  } else if (hintPitId !== null) {
    bannerText = `💡 Dica: Cava ${hintPitId} recomendada pela IA. Clica nela para jogar.`;
  } else if (isP1) {
    bannerText =
      legalMovesCount > 0
        ? isManualMode
          ? 'Distribuição Manual: selecione uma cava com sementes para colher'
          : 'A sua vez: selecione uma cava com 2 ou mais sementes'
        : 'Sem jogadas disponíveis!';
  } else {
    bannerText = isAI
      ? 'Vez do Mestre Nyami (IA)...'
      : legalMovesCount > 0
      ? isManualMode
        ? 'Vez do Jogador 2 (Manual): selecione uma cava para colher'
        : 'Vez do Jogador 2: selecione uma cava com 2 ou mais sementes'
      : 'Sem jogadas disponíveis!';
  }

  const isHintActive = hintPitId !== null;

  return (
    <div className="w-full">
      <div
        className={`w-full py-2 px-3 sm:px-4 rounded-xl text-center text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors duration-200 shadow-sm ${
          manualWarningMessage
            ? 'bg-rose-950/90 text-rose-200 border border-rose-500/80 shadow-[0_0_12px_rgba(244,63,94,0.4)] animate-pulse'
            : isManualMoveActive
            ? 'bg-emerald-950/90 text-emerald-200 border border-emerald-400/80 shadow-[0_0_12px_rgba(52,211,153,0.3)]'
            : lastCaptureInfo
            ? 'bg-[#ba1a1a] text-[#ffffff] shadow-[0_0_10px_rgba(186,26,26,0.4)]'
            : isHintActive
            ? 'bg-gradient-to-r from-[#442c11] via-[#523310] to-[#38220a] text-amber-200 border border-amber-400/80 shadow-[0_0_12px_rgba(251,191,36,0.3)]'
            : isP1
            ? 'bg-[#885200] text-[#ffddbb] border border-[#a86500]'
            : 'bg-[#5c4c47] text-[#f5ddd7] border border-[#73605a]'
        }`}
      >
        {lastCaptureInfo ? (
          <Swords className="w-4 h-4 text-white shrink-0" />
        ) : isHintActive ? (
          <Lightbulb className="w-4 h-4 text-amber-300 fill-amber-400 shrink-0" />
        ) : (
          <Info className="w-4 h-4 shrink-0 text-[#ffad47]" />
        )}
        <span className="truncate">{bannerText}</span>
      </div>
    </div>
  );
};
