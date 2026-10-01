import React, { useState } from 'react';
import { Achievement, PlayerStats } from '../game/types';
import {
  X,
  Trophy,
  Award,
  Sparkles,
  Swords,
  Wind,
  Flame,
  Shield,
  Lock,
  Compass,
  Zap,
  Sprout,
  CheckCircle2,
  Medal,
  Layers,
} from 'lucide-react';

interface AchievementsModalProps {
  isOpen: boolean;
  onClose: () => void;
  achievements: Achievement[];
  playerStats: PlayerStats;
}

export const AchievementsModal: React.FC<AchievementsModalProps> = ({
  isOpen,
  onClose,
  achievements,
  playerStats,
}) => {
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked'>('all');

  if (!isOpen) return null;

  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  const totalCount = achievements.length;
  const totalPoints = achievements
    .filter((a) => a.unlocked)
    .reduce((sum, a) => sum + a.rewardPoints, 0);

  const filteredAchievements = achievements.filter((a) => {
    if (filter === 'unlocked') return a.unlocked;
    if (filter === 'locked') return !a.unlocked;
    return true;
  });

  const getIcon = (iconName: string, isUnlocked: boolean) => {
    const iconClass = `w-5 h-5 ${isUnlocked ? 'text-[#ffad47]' : 'text-[#89726c]'}`;
    switch (iconName) {
      case 'trophy':
        return <Trophy className={iconClass} />;
      case 'swords':
        return <Swords className={iconClass} />;
      case 'sparkles':
        return <Sparkles className={iconClass} />;
      case 'wind':
        return <Wind className={iconClass} />;
      case 'flame':
        return <Flame className={iconClass} />;
      case 'shield':
        return <Shield className={iconClass} />;
      case 'lock':
        return <Lock className={iconClass} />;
      case 'compass':
        return <Compass className={iconClass} />;
      case 'zap':
        return <Zap className={iconClass} />;
      case 'sprout':
      default:
        return <Sprout className={iconClass} />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="w-full max-w-lg bg-[#271b16] border border-[#443027] rounded-3xl shadow-2xl overflow-hidden flex flex-col my-auto max-h-[92vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#31221b] border-b border-[#443027] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#8a3319] text-[#ffddbb] flex items-center justify-center shadow-md">
              <Trophy className="w-5 h-5 text-[#ffad47]" />
            </div>
            <div className="flex flex-col">
              <h2 className="font-display font-bold text-lg text-[#fff8f3]">
                Conquistas & Recompensas
              </h2>
              <span className="text-xs text-[#a8928c]">
                Galardões ancestrais do Ntxuva
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="w-8 h-8 rounded-full bg-[#3d2a23] hover:bg-[#4d352c] text-[#d8c2bb] flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Global Progress & Stats Banner */}
        <div className="p-4 sm:p-5 bg-[#211612] border-b border-[#3b2720] flex flex-col gap-3">
          {/* Main Progress Bar */}
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#d8c2bb] font-medium flex items-center gap-1.5">
              <Medal className="w-4 h-4 text-[#ffad47]" />
              Progresso Geral:{' '}
              <strong className="text-[#fff8f3]">
                {unlockedCount} / {totalCount}
              </strong>
            </span>
            <span className="text-[#ffad47] font-bold">
              {totalPoints} Pontos de Honra
            </span>
          </div>

          <div className="w-full bg-[#34221b] h-2.5 rounded-full overflow-hidden border border-[#4a3227]">
            <div
              className="h-full bg-gradient-to-r from-[#ba4a1a] to-[#ffad47] transition-all duration-500 rounded-full"
              style={{ width: `${(unlockedCount / totalCount) * 100}%` }}
            />
          </div>

          {/* Quick Statistics Strip */}
          <div className="grid grid-cols-4 gap-1.5 pt-1 text-center">
            <div className="bg-[#291b16] p-2 rounded-xl border border-[#3e2a22]">
              <span className="text-[10px] text-[#a8928c] uppercase font-bold block">
                Partidas
              </span>
              <span className="font-display text-sm font-bold text-[#fff8f3]">
                {playerStats.gamesPlayed}
              </span>
            </div>
            <div className="bg-[#291b16] p-2 rounded-xl border border-[#3e2a22]">
              <span className="text-[10px] text-[#a8928c] uppercase font-bold block">
                Vitórias
              </span>
              <span className="font-display text-sm font-bold text-[#ffad47]">
                {playerStats.gamesWon}
              </span>
            </div>
            <div className="bg-[#291b16] p-2 rounded-xl border border-[#3e2a22]">
              <span className="text-[10px] text-[#a8928c] uppercase font-bold block">
                Sequência
              </span>
              <span className="font-display text-sm font-bold text-[#e6d8c6]">
                {playerStats.highestWinStreak}★
              </span>
            </div>
            <div className="bg-[#291b16] p-2 rounded-xl border border-[#3e2a22]">
              <span className="text-[10px] text-[#a8928c] uppercase font-bold block">
                Capturadas
              </span>
              <span className="font-display text-sm font-bold text-[#ffb5a0]">
                {playerStats.totalSeedsCaptured}
              </span>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="px-4 py-2.5 bg-[#271b16] flex items-center gap-1.5 border-b border-[#3b2720]">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
              filter === 'all'
                ? 'bg-[#8a3319] text-[#fff8f3]'
                : 'bg-[#34221b] text-[#a8928c] hover:text-[#fff8f3]'
            }`}
          >
            Todas ({totalCount})
          </button>
          <button
            type="button"
            onClick={() => setFilter('unlocked')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
              filter === 'unlocked'
                ? 'bg-[#8a3319] text-[#fff8f3]'
                : 'bg-[#34221b] text-[#a8928c] hover:text-[#fff8f3]'
            }`}
          >
            Desbloqueadas ({unlockedCount})
          </button>
          <button
            type="button"
            onClick={() => setFilter('locked')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
              filter === 'locked'
                ? 'bg-[#8a3319] text-[#fff8f3]'
                : 'bg-[#34221b] text-[#a8928c] hover:text-[#fff8f3]'
            }`}
          >
            Bloqueadas ({totalCount - unlockedCount})
          </button>
        </div>

        {/* List of Badges */}
        <div className="p-4 sm:p-5 flex-1 overflow-y-auto space-y-2.5">
          {filteredAchievements.map((ach) => {
            const isUnlocked = ach.unlocked;

            return (
              <div
                key={ach.id}
                className={`p-3 sm:p-3.5 rounded-2xl border transition-all flex items-start gap-3.5 relative overflow-hidden ${
                  isUnlocked
                    ? 'bg-[#2f1f1a] border-[#6b3524] shadow-sm'
                    : 'bg-[#201512]/60 border-[#382620] opacity-75'
                }`}
              >
                {/* Badge Icon */}
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border ${
                    isUnlocked
                      ? 'bg-[#8a3319] border-[#ffb5a0]/40 shadow-md'
                      : 'bg-[#291b16] border-[#3e2a22]'
                  }`}
                >
                  {getIcon(ach.icon, isUnlocked)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 flex flex-col gap-1">
                  <div className="flex items-center justify-between gap-2">
                    <h4
                      className={`font-display font-bold text-sm truncate ${
                        isUnlocked ? 'text-[#fff8f3]' : 'text-[#a8928c]'
                      }`}
                    >
                      {ach.title}
                    </h4>

                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                        isUnlocked
                          ? 'bg-[#885200] text-[#ffddbb]'
                          : 'bg-[#33221b] text-[#89726c]'
                      }`}
                    >
                      +{ach.rewardPoints} pts
                    </span>
                  </div>

                  <p className="text-xs text-[#c4aca4] leading-relaxed">
                    {ach.description}
                  </p>

                  {/* Progress bar if not unlocked or multi-step */}
                  {ach.maxProgress > 1 && (
                    <div className="mt-1 flex flex-col gap-1">
                      <div className="flex items-center justify-between text-[10px] text-[#a8928c]">
                        <span>Progresso</span>
                        <span>
                          {ach.progress} / {ach.maxProgress}
                        </span>
                      </div>
                      <div className="w-full bg-[#1e1310] h-1.5 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${
                            isUnlocked ? 'bg-[#ffad47]' : 'bg-[#6b3524]'
                          }`}
                          style={{
                            width: `${(ach.progress / ach.maxProgress) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Unlock timestamp if unlocked */}
                  {isUnlocked && ach.unlockedAt && (
                    <div className="flex items-center gap-1 text-[10px] text-[#ffad47] mt-0.5">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Conquistado com honra</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#31221b] border-t border-[#443027] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-6 h-11 rounded-xl bg-[#8a3319] hover:bg-[#a33d1f] active:scale-95 text-[#fff8f3] font-bold text-sm shadow-md transition-all flex items-center justify-center"
          >
            Fechar Galeria
          </button>
        </div>
      </div>
    </div>
  );
};
