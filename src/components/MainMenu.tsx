import React from 'react';
import { AIDifficulty, AISpeed, GameMode } from '../game/types';
import {
  Play,
  Users,
  BookOpen,
  Settings,
  Volume2,
  VolumeX,
  Award,
  Sparkles,
  ChevronRight,
  Globe,
  Flame,
  Trophy,
  Zap,
  Sliders,
  Hand,
  User as UserIcon,
} from 'lucide-react';
import { FirebasePlayerProfile } from '../firebase/types';

interface MainMenuProps {
  onStartGame: (mode: GameMode, difficulty?: AIDifficulty) => void;
  onOpenRules: () => void;
  onOpenSettings: () => void;
  onOpenAchievements: () => void;
  onOpenLeaderboard: () => void;
  onOpenProfile?: () => void;
  playerProfile?: FirebasePlayerProfile | null;
  unlockedAchievementsCount: number;
  totalAchievementsCount: number;
  activePresetName?: string;
  aiSpeed: AISpeed;
  onToggleAiSpeed: () => void;
  isManualMode?: boolean;
  onToggleManualMode?: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const MainMenu: React.FC<MainMenuProps> = ({
  onStartGame,
  onOpenRules,
  onOpenSettings,
  onOpenAchievements,
  onOpenLeaderboard,
  onOpenProfile,
  playerProfile,
  unlockedAchievementsCount,
  totalAchievementsCount,
  activePresetName,
  aiSpeed,
  onToggleAiSpeed,
  isManualMode = false,
  onToggleManualMode,
  soundEnabled,
  onToggleSound,
}) => {
  return (
    <div className="w-full flex flex-col gap-4 sm:gap-5 pb-8">
      {/* Player Profile Quick Header */}
      {playerProfile && (
        <button
          type="button"
          onClick={onOpenProfile || onOpenLeaderboard}
          className="w-full text-left bg-gradient-to-r from-[#2c1912] via-[#352017] to-[#25150f] border border-[#ffad47]/30 rounded-2xl p-3 sm:p-3.5 shadow-md flex items-center justify-between transition-all hover:border-[#ffad47]/60 active:scale-98 group cursor-pointer"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative flex-shrink-0">
              {playerProfile.photoURL ? (
                <img
                  src={playerProfile.photoURL}
                  alt={playerProfile.displayName}
                  className="w-10 h-10 rounded-full border-2 border-[#ffad47] object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-[#3b2419] border-2 border-[#ffad47] flex items-center justify-center font-bold text-[#ffad47] text-sm shadow">
                  {playerProfile.displayName?.charAt(0).toUpperCase() || 'J'}
                </div>
              )}
              <span className="absolute -bottom-1 -right-1 px-1.5 py-0.2 bg-[#ffad47] text-zinc-950 font-black text-[9px] rounded-full">
                Nv.{playerProfile.level || 1}
              </span>
            </div>

            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-xs sm:text-sm text-zinc-100 group-hover:text-[#ffad47] transition-colors truncate">
                  {playerProfile.displayName || 'Jogador Ntxuva'}
                </span>
                <span className="text-[10px] text-amber-300/80 bg-amber-950/60 px-1.5 py-0.2 rounded border border-amber-800/40">
                  {playerProfile.levelTitle || 'Iniciante'}
                </span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-[#b89b90]">
                <span>
                  <strong className="text-[#ffad47]">{playerProfile.wins || 0}</strong> vitórias
                </span>
                <span>•</span>
                <span>
                  <strong className="text-amber-300">{playerProfile.experiencePoints || 0}</strong> XP
                </span>
                <span>•</span>
                <span>
                  <strong className="text-orange-300">{playerProfile.seedsCaptured || 0}</strong> sementes
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 text-xs font-semibold text-[#ffad47] shrink-0 pl-2">
            <span className="hidden sm:inline">Ver Perfil</span>
            <ChevronRight className="w-4 h-4 text-[#ffad47] group-hover:translate-x-0.5 transition-transform" />
          </div>
        </button>
      )}

      {/* Cultural Hero Banner */}
      <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl bg-[#231510] border border-[#3f2a22]">
        <div
          className="w-full h-52 sm:h-60 bg-cover bg-center relative"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDEzjmrk8D6fmPj8RsRQrC1fSMy_4LNcXcpt2MBByOkBth63d_9bzwlersV6SlwxpBo683ZlgPZy3ZWFY5zLWlksOIrxLXX8Fu25ibg8k0fVKX29oNVzip6JlSOCY_KajVjjU7Ah4nYragm1uMrzqjmJLV9mwxVEajuvtBJi6PgmFb2YFHX37kJdaW-lI2oQ2ZHRAHnge2Old4J2MpmrjDmAY5VYAkVX5nY_-4mTRSITT_H9ZXISjJ09A')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#231510] via-[#231510]/60 to-transparent" />

          {/* Top Country Tag */}
          <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-[#1a100c]/85 text-[#ffcf99] backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold border border-[#3e271f] shadow-md">
            <Globe className="w-3.5 h-3.5 text-[#ffad47]" />
            <span>Moçambique</span>
          </div>

          {/* Active Rule Set Tag */}
          {activePresetName && (
            <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-[#1a100c]/85 text-[#d8c2bb] backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-semibold border border-[#3e271f] shadow-md">
              <Sliders className="w-3 h-3 text-[#ffad47]" />
              <span className="truncate max-w-[150px]">{activePresetName}</span>
            </div>
          )}
        </div>

        {/* Hero Title & Subtitle */}
        <div className="relative px-5 pb-5 -mt-12 flex flex-col gap-1.5">
          <span className="text-[11px] uppercase tracking-widest text-[#ffad47] font-bold">
            Tradição Ancestral
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-[#fff8f3] tracking-tight drop-shadow-md">
            NTXUVA
          </h1>
          <p className="text-sm sm:text-base text-[#d8c2bb] italic font-medium">
            O Jogo dos Reis — Sabedoria e Estratégia Moçambicana
          </p>
        </div>
      </div>

      {/* Leaderboard, Achievements & Fast AI strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {/* Leaderboard Button */}
        <button
          type="button"
          onClick={onOpenLeaderboard}
          className="text-left bg-gradient-to-br from-[#382015] to-[#271711] hover:from-[#45281b] hover:to-[#311c14] active:scale-98 border border-[#ffad47]/40 rounded-2xl p-3 sm:p-3.5 shadow-md flex items-center justify-between transition-all group cursor-pointer"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#ffad47] to-[#b36814] text-zinc-950 flex items-center justify-center shrink-0 shadow-md">
              <Trophy className="w-4 h-4 text-zinc-950 fill-zinc-950" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-bold text-xs sm:text-sm text-[#ffad47] truncate flex items-center gap-1">
                Classificação
                <Sparkles className="w-3 h-3 text-amber-300" />
              </span>
              <span className="text-[11px] text-[#ffddbb] font-medium">
                Melhores Jogadores
              </span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-[#ffad47] group-hover:translate-x-0.5 shrink-0" />
        </button>

        {/* Achievements Card */}
        <button
          type="button"
          onClick={onOpenAchievements}
          className="text-left bg-[#271b16] hover:bg-[#32231c] active:scale-98 border border-[#443027] rounded-2xl p-3 sm:p-3.5 shadow-sm flex items-center justify-between transition-all group cursor-pointer"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-[#885200] text-[#ffddbb] flex items-center justify-center shrink-0 shadow-sm border border-[#ffad47]/30">
              <Award className="w-4 h-4 text-[#ffcf99]" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-bold text-xs sm:text-sm text-[#fff8f3] truncate">
                Conquistas
              </span>
              <span className="text-[11px] text-[#ffad47] font-semibold">
                {unlockedAchievementsCount} / {totalAchievementsCount} Ganhas
              </span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-[#89726c] group-hover:text-[#ffad47] shrink-0" />
        </button>

        {/* Fast AI Toggle Card */}
        <button
          type="button"
          onClick={onToggleAiSpeed}
          className={`text-left border rounded-2xl p-3 sm:p-3.5 shadow-sm flex items-center justify-between transition-all active:scale-98 cursor-pointer ${
            aiSpeed === 'fast'
              ? 'bg-[#312019] border-[#ffad47]/60'
              : 'bg-[#271b16] border-[#443027]'
          }`}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-sm border ${
                aiSpeed === 'fast'
                  ? 'bg-[#8a3319] text-[#fff8f3] border-[#ffb5a0]/40'
                  : 'bg-[#3d2a23] text-[#a8928c] border-[#4d362e]'
              }`}
            >
              <Zap className="w-4 h-4 text-[#ffcf99]" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-bold text-xs sm:text-sm text-[#fff8f3] truncate">
                Resposta IA
              </span>
              <span
                className={`text-[11px] font-semibold ${
                  aiSpeed === 'fast' ? 'text-[#ffad47]' : 'text-[#a8928c]'
                }`}
              >
                {aiSpeed === 'fast' ? '⚡ Rápida (~120ms)' : '⏳ Normal (~750ms)'}
              </span>
            </div>
          </div>
        </button>
      </div>

      {/* Mode Selection Options */}
      <div className="flex flex-col gap-2.5">
        <span className="text-xs uppercase tracking-wider text-[#a8928c] font-bold px-1">
          Modos de Jogo
        </span>

        {/* Single Player: vs AI */}
        <div className="bg-[#271b16] border border-[#443027] rounded-2xl p-4 shadow-md flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-[#8a3319] text-[#fff8f3] flex items-center justify-center shrink-0 shadow-md">
                <Play className="w-5 h-5 text-[#ffb5a0] fill-current" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-base text-[#fff8f3]">
                    Jogar contra IA
                  </span>
                  <span className="bg-[#885200] text-[#ffddbb] text-[10px] font-bold px-1.5 py-0.5 rounded">
                    Mestre Nyami
                  </span>
                </div>
                <span className="text-xs text-[#a8928c]">
                  Escolha o nível de estratégia do adversário
                </span>
              </div>
            </div>
          </div>

          {/* Difficulty quick buttons */}
          <div className="grid grid-cols-3 gap-2 pt-1 border-t border-[#3a2720]">
            <button
              type="button"
              onClick={() => onStartGame('ai', 'easy')}
              className="py-2.5 px-2 rounded-xl bg-[#34221b] hover:bg-[#442c23] active:scale-95 text-xs font-semibold text-[#d8c2bb] hover:text-[#fff8f3] border border-[#4a3227] flex flex-col items-center gap-0.5 transition-all"
            >
              <span>Fácil</span>
              <span className="text-[10px] text-[#a8928c]">Iniciante</span>
            </button>

            <button
              type="button"
              onClick={() => onStartGame('ai', 'medium')}
              className="py-2.5 px-2 rounded-xl bg-[#8a3319] hover:bg-[#a13b1d] active:scale-95 text-xs font-semibold text-[#fff8f3] border border-[#b84523] flex flex-col items-center gap-0.5 transition-all shadow-sm"
            >
              <span>Médio</span>
              <span className="text-[10px] text-[#ffcf99]">Estrategista</span>
            </button>

            <button
              type="button"
              onClick={() => onStartGame('ai', 'hard')}
              className="py-2.5 px-2 rounded-xl bg-[#34221b] hover:bg-[#442c23] active:scale-95 text-xs font-semibold text-[#d8c2bb] hover:text-[#fff8f3] border border-[#4a3227] flex flex-col items-center gap-0.5 transition-all"
            >
              <span className="flex items-center gap-1">
                Difícil <Flame className="w-3 h-3 text-[#ffad47]" />
              </span>
              <span className="text-[10px] text-[#a8928c]">Grão-Mestre</span>
            </button>
          </div>
        </div>

        {/* 2 Players: Pass and Play */}
        <button
          type="button"
          onClick={() => onStartGame('pass_and_play')}
          className="w-full text-left bg-[#271b16] hover:bg-[#30211b] active:scale-98 border border-[#443027] rounded-2xl p-4 shadow-sm flex items-center justify-between transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#3d2a23] group-hover:bg-[#4e362d] text-[#ffad47] flex items-center justify-center shrink-0 transition-colors shadow-sm">
              <Users className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base text-[#fff8f3]">
                2 Jogadores
              </span>
              <span className="text-xs text-[#a8928c]">
                Duelo no mesmo ecrã presencial (Pass & Play)
              </span>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-[#89726c] group-hover:text-[#ffad47] transition-colors" />
        </button>

        {/* Rules & Tutorial Button */}
        <button
          type="button"
          onClick={onOpenRules}
          className="w-full text-left bg-[#271b16] hover:bg-[#30211b] active:scale-98 border border-[#443027] rounded-2xl p-4 shadow-sm flex items-center justify-between transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#3d2a23] group-hover:bg-[#4e362d] text-[#ffad47] flex items-center justify-center shrink-0 transition-colors shadow-sm">
              <BookOpen className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base text-[#fff8f3]">
                Como Jogar & Regras
              </span>
              <span className="text-xs text-[#a8928c]">
                Tutorial ilustrado passo a passo das cavas
              </span>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-[#89726c] group-hover:text-[#ffad47] transition-colors" />
        </button>

        {/* Settings & Rules Button */}
        <button
          type="button"
          onClick={onOpenSettings}
          className="w-full text-left bg-[#271b16] hover:bg-[#30211b] active:scale-98 border border-[#443027] rounded-2xl p-4 shadow-sm flex items-center justify-between transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#3d2a23] group-hover:bg-[#4e362d] text-[#ffad47] flex items-center justify-center shrink-0 transition-colors shadow-sm">
              <Settings className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base text-[#fff8f3]">
                Definições & Variantes
              </span>
              <span className="text-xs text-[#a8928c]">
                Configurar 4×8, 4×10, sementes, IA e áudio
              </span>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-[#89726c] group-hover:text-[#ffad47] transition-colors" />
        </button>
      </div>

      {/* Modo manual quick toggle */}
      {onToggleManualMode && (
        <div className="w-full bg-[#201512] rounded-xl p-3 border border-[#382620] flex items-center justify-between">
          <div className="flex items-center gap-2.5 text-xs text-[#d8c2bb]">
            <Hand className={`w-4 h-4 ${isManualMode ? 'text-emerald-400' : 'text-[#ffad47]'}`} />
            <div>
              <span className="font-bold text-[#fff8f3] block">Modo Manual (Passo a Passo)</span>
              <span className="text-[10px] text-[#a8928c]">
                {isManualMode
                  ? 'Ativo: deposita 1 semente de cada vez para aprender as regras'
                  : 'Desativado: animação automática a 700ms por cova'}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onToggleManualMode}
            aria-label={isManualMode ? 'Desativar Modo manual' : 'Ativar Modo manual'}
            className={`w-12 h-6 rounded-full p-0.5 transition-colors relative cursor-pointer ${
              isManualMode ? 'bg-emerald-500 shadow-[0_0_10px_rgba(52,211,153,0.5)]' : 'bg-[#3d2a23]'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
                isManualMode ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      )}

      {/* Sound quick toggle bar */}
      <div className="w-full bg-[#201512] rounded-xl p-3 border border-[#382620] flex items-center justify-between">
        <div className="flex items-center gap-2.5 text-xs text-[#d8c2bb]">
          <Award className="w-4 h-4 text-[#ffad47]" />
          <span>Efeitos Sonoros de Marimba e Sementes</span>
        </div>
        <button
          type="button"
          onClick={onToggleSound}
          aria-label={soundEnabled ? 'Desativar Som' : 'Ativar Som'}
          className="w-8 h-8 rounded-lg bg-[#33221b] text-[#ffad47] hover:bg-[#422c23] flex items-center justify-center transition-colors"
        >
          {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-[#89726c]" />}
        </button>
      </div>
    </div>
  );
};
