import React from 'react';
import { GameMode, Player } from '../game/types';
import { Trophy, RotateCcw, Home, Sparkles, Swords, Award, Flame } from 'lucide-react';
import { FirebasePlayerProfile } from '../firebase/types';

interface GameOverModalProps {
  isOpen: boolean;
  winner: Player | 'draw' | null;
  reason: string | null;
  p1Captures: number;
  p2Captures: number;
  totalTurns: number;
  gameMode: GameMode;
  xpEarned?: number | null;
  playerProfile?: FirebasePlayerProfile | null;
  onOpenLeaderboard?: () => void;
  onPlayAgain: () => void;
  onGoHome: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  isOpen,
  winner,
  reason,
  p1Captures,
  p2Captures,
  totalTurns,
  gameMode,
  xpEarned,
  playerProfile,
  onOpenLeaderboard,
  onPlayAgain,
  onGoHome,
}) => {
  if (!isOpen) return null;

  const isP1Winner = winner === 'player1';
  const isP2Winner = winner === 'player2';

  let title = 'Fim da Partida';
  let subtitle = '';

  if (isP1Winner) {
    title = 'Vitória Estratégica!';
    subtitle =
      gameMode === 'ai'
        ? 'Parabéns! Superou a sabedoria e o cálculo de Mestre Nyami.'
        : 'Jogador 1 venceu a partida com brilhantismo!';
  } else if (isP2Winner) {
    title = gameMode === 'ai' ? 'Mestre Nyami Venceu' : 'Jogador 2 Venceu';
    subtitle =
      gameMode === 'ai'
        ? 'Desta vez as sementes foram favoráveis ao Mestre. Deseja a desforra?'
        : 'Jogador 2 dominou o tabuleiro!';
  } else {
    title = 'Empate Honorável!';
    subtitle = 'Nenhum dos jogadores conseguiu quebrar a linha de defesa.';
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-[#271b16] border border-[#443027] rounded-3xl p-6 sm:p-7 shadow-2xl flex flex-col items-center text-center gap-4 relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Glow backdrop */}
        <div
          className={`absolute -top-12 -left-12 w-40 h-40 rounded-full blur-3xl opacity-30 pointer-events-none ${
            isP1Winner ? 'bg-[#ffad47]' : 'bg-[#8a3319]'
          }`}
        />

        {/* Icon Trophy Box */}
        <div
          className={`w-20 h-20 rounded-full flex items-center justify-center shadow-xl border-2 ${
            isP1Winner
              ? 'bg-[#885200] border-[#ffb867] text-[#ffddbb]'
              : 'bg-[#3d2a23] border-[#573d32] text-[#ffad47]'
          }`}
        >
          {isP1Winner ? (
            <Trophy className="w-10 h-10 animate-bounce" />
          ) : (
            <Award className="w-10 h-10" />
          )}
        </div>

        {/* Title & Subtitle */}
        <div className="flex flex-col gap-1">
          <h2 className="font-display text-2xl font-bold text-[#fff8f3] tracking-tight">
            {title}
          </h2>
          <p className="text-xs text-[#d8c2bb] leading-relaxed">{subtitle}</p>
        </div>

        {/* XP Gained & Firebase Progress Tag */}
        {xpEarned !== undefined && xpEarned !== null && (
          <div className="w-full py-2 px-3 bg-gradient-to-r from-[#382015] to-[#2b170e] border border-[#ffad47]/30 rounded-xl flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#ffad47]/20 flex items-center justify-center text-[#ffad47]">
                <Flame className="w-4 h-4 text-orange-400" />
              </div>
              <div className="text-left">
                <span className="text-[10px] text-[#a88a7e] block">
                  {playerProfile?.displayName || 'Jogador'} • Nv.{playerProfile?.level || 1}
                </span>
                <span className="text-xs font-bold text-amber-300">
                  Progresso guardado no Firestore
                </span>
              </div>
            </div>
            <span className="px-2.5 py-1 bg-[#ffad47] text-zinc-950 font-black text-xs rounded-lg shadow">
              +{xpEarned} XP
            </span>
          </div>
        )}

        {/* Reason Box */}
        {reason && (
          <div className="w-full p-2.5 bg-[#1e1411] border border-[#3d2a23] rounded-xl text-xs text-[#ffcf99]">
            <span className="font-semibold block mb-0.5 text-[#fff8f3]">
              Motivo do Triunfo:
            </span>
            {reason}
          </div>
        )}

        {/* Match Statistics */}
        <div className="w-full grid grid-cols-3 gap-2 bg-[#201512] p-3 rounded-xl border border-[#3b2720]">
          <div className="flex flex-col items-center">
            <span className="text-[10px] text-[#a88a7e] uppercase font-bold">
              Capturas P1
            </span>
            <span className="font-display text-base font-bold text-[#ffad47] mt-0.5">
              {p1Captures}
            </span>
          </div>

          <div className="flex flex-col items-center border-x border-[#3b2720]">
            <span className="text-[10px] text-[#a88a7e] uppercase font-bold">
              Jogadas
            </span>
            <span className="font-display text-base font-bold text-[#e6d8c6] mt-0.5">
              {totalTurns}
            </span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-[10px] text-[#a88a7e] uppercase font-bold">
              Capturas P2
            </span>
            <span className="font-display text-base font-bold text-[#ffb5a0] mt-0.5">
              {p2Captures}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full flex flex-col gap-2 pt-1">
          <button
            type="button"
            onClick={onPlayAgain}
            className="w-full h-11 rounded-xl bg-[#8a3319] hover:bg-[#a33d1f] active:scale-95 text-[#fff8f3] font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-[#ffad47]" />
            <span>Jogar Novamente</span>
          </button>

          {onOpenLeaderboard && (
            <button
              type="button"
              onClick={onOpenLeaderboard}
              className="w-full h-10 rounded-xl bg-gradient-to-r from-[#ffad47] to-[#e68d22] text-zinc-950 font-bold text-xs flex items-center justify-center gap-2 shadow transition-all hover:brightness-110 active:scale-95 cursor-pointer"
            >
              <Trophy className="w-3.5 h-3.5 text-zinc-950" />
              <span>Ver Tabela de Classificação</span>
            </button>
          )}

          <button
            type="button"
            onClick={onGoHome}
            className="w-full h-10 rounded-xl bg-[#34231c] hover:bg-[#442e25] active:scale-95 text-[#d8c2bb] font-semibold text-xs flex items-center justify-center gap-2 transition-all border border-[#4a3227] cursor-pointer"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Voltar ao Menu Principal</span>
          </button>
        </div>
      </div>
    </div>
  );
};
