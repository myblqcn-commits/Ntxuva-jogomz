import React from 'react';
import { AISpeed, GameMode } from '../game/types';
import { RotateCcw, BookOpen, Volume2, VolumeX, Settings, Home, Zap, Hand, Lightbulb } from 'lucide-react';

interface GameControlsProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
  onRestart: () => void;
  onOpenRules: () => void;
  onOpenSettings: () => void;
  onGoHome: () => void;
  aiSpeed?: AISpeed;
  onToggleAiSpeed?: () => void;
  isManualMode?: boolean;
  onToggleManualMode?: () => void;
  onRequestHint?: () => void;
  hasHintActive?: boolean;
  canRequestHint?: boolean;
  gameMode?: GameMode;
  disabled?: boolean;
}

export const GameControls: React.FC<GameControlsProps> = ({
  soundEnabled,
  onToggleSound,
  onRestart,
  onOpenRules,
  onOpenSettings,
  onGoHome,
  aiSpeed,
  onToggleAiSpeed,
  isManualMode = false,
  onToggleManualMode,
  onRequestHint,
  hasHintActive = false,
  canRequestHint = true,
  gameMode,
  disabled = false,
}) => {
  return (
    <div className="w-full flex items-center justify-between gap-1.5 sm:gap-2 flex-wrap sm:flex-nowrap">
      {/* Return to Menu */}
      <button
        type="button"
        onClick={onGoHome}
        aria-label="Voltar ao Menu"
        title="Menu Inicial"
        className="w-10 h-10 sm:w-11 sm:h-11 bg-[#2b1c17] hover:bg-[#38251f] active:scale-95 text-[#d8c2bb] hover:text-[#ffad47] rounded-xl flex items-center justify-center border border-[#443027] transition-all shadow-sm shrink-0"
      >
        <Home className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

      {/* Restart */}
      <button
        type="button"
        onClick={onRestart}
        disabled={disabled}
        aria-label="Reiniciar Partida"
        className="flex-1 h-10 sm:h-11 bg-[#2b1c17] hover:bg-[#38251f] active:scale-95 text-[#fff8f3] rounded-xl flex items-center justify-center gap-1.5 px-2 border border-[#443027] font-semibold text-xs sm:text-sm transition-all shadow-sm disabled:opacity-50"
      >
        <RotateCcw className="w-4 h-4 text-[#ffad47]" />
        <span className="truncate">Reiniciar</span>
      </button>

      {/* Botão de Dica (Calcula o melhor movimento com a IA Fácil) */}
      {onRequestHint && (
        <button
          type="button"
          onClick={onRequestHint}
          disabled={disabled || !canRequestHint}
          aria-label={hasHintActive ? 'Desativar Dica' : 'Pedir Dica da Jogada'}
          title={
            hasHintActive
              ? 'Dica ativada! Cava recomendada a pulsar no tabuleiro'
              : 'Ver movimento recomendado (Dica)'
          }
          className={`h-10 sm:h-11 px-2.5 sm:px-3 rounded-xl flex items-center justify-center gap-1.5 border transition-all shadow-sm shrink-0 active:scale-95 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
            hasHintActive
              ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-amber-950 border-amber-300 font-bold text-xs shadow-[0_0_12px_rgba(251,191,36,0.6)]'
              : 'bg-[#2b1c17] hover:bg-[#38251f] text-[#ffddbb] hover:text-[#ffad47] border-[#443027] text-xs'
          }`}
        >
          <Lightbulb
            className={`w-4 h-4 ${
              hasHintActive ? 'text-amber-950 fill-current' : 'text-amber-400'
            }`}
          />
          <span className="font-bold text-xs">Dica</span>
          {hasHintActive && (
            <span className="w-1.5 h-1.5 rounded-full bg-amber-950" />
          )}
        </button>
      )}

      {/* Fast AI toggle (if in AI mode) */}
      {gameMode === 'ai' && onToggleAiSpeed && (
        <button
          type="button"
          onClick={onToggleAiSpeed}
          aria-label={aiSpeed === 'fast' ? 'IA Rápida Ativada' : 'IA Normal'}
          title={aiSpeed === 'fast' ? 'IA Rápida' : 'IA Normal'}
          className={`h-10 sm:h-11 px-2.5 rounded-xl flex items-center justify-center gap-1 border transition-all shadow-sm shrink-0 active:scale-95 ${
            aiSpeed === 'fast'
              ? 'bg-[#3b2016] text-[#ffad47] border-[#8a3319] font-bold text-xs'
              : 'bg-[#211714] text-[#89726c] border-[#362520] hover:text-[#fff8f3] text-xs'
          }`}
        >
          <Zap className={`w-3.5 h-3.5 ${aiSpeed === 'fast' ? 'fill-current' : ''}`} />
          <span className="hidden sm:inline">{aiSpeed === 'fast' ? 'Rápida' : 'Normal'}</span>
        </button>
      )}

      {/* Rules */}
      <button
        type="button"
        onClick={onOpenRules}
        aria-label="Como Jogar & Regras"
        className="flex-1 h-10 sm:h-11 bg-[#2b1c17] hover:bg-[#38251f] active:scale-95 text-[#fff8f3] rounded-xl flex items-center justify-center gap-1.5 px-2 border border-[#443027] font-semibold text-xs sm:text-sm transition-all shadow-sm"
      >
        <BookOpen className="w-4 h-4 text-[#ffad47]" />
        <span className="truncate">Regras</span>
      </button>

      {/* Sound */}
      <button
        type="button"
        onClick={onToggleSound}
        aria-label={soundEnabled ? 'Silenciar Áudio' : 'Ativar Áudio'}
        title={soundEnabled ? 'Silenciar Áudio' : 'Ativar Áudio'}
        className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center border transition-all shadow-sm shrink-0 active:scale-95 ${
          soundEnabled
            ? 'bg-[#2b1c17] text-[#ffad47] border-[#443027] hover:bg-[#38251f]'
            : 'bg-[#211714] text-[#89726c] border-[#362520] hover:text-[#fff8f3]'
        }`}
      >
        {soundEnabled ? (
          <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
        ) : (
          <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" />
        )}
      </button>

      {/* Settings */}
      <button
        type="button"
        onClick={onOpenSettings}
        aria-label="Definições e Tabuleiro"
        title="Definições"
        className="w-10 h-10 sm:w-11 sm:h-11 bg-[#2b1c17] hover:bg-[#38251f] active:scale-95 text-[#d8c2bb] hover:text-[#ffad47] rounded-xl flex items-center justify-center border border-[#443027] transition-all shadow-sm shrink-0"
      >
        <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>
    </div>
  );
};
