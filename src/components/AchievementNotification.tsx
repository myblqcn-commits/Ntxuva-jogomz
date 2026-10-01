import React, { useEffect } from 'react';
import { Achievement } from '../game/types';
import { Trophy, Swords, Sparkles, Wind, Flame, Shield, Lock, Compass, Zap, Sprout, X } from 'lucide-react';

interface AchievementNotificationProps {
  achievement: Achievement | null;
  onDismiss: () => void;
}

export const AchievementNotification: React.FC<AchievementNotificationProps> = ({
  achievement,
  onDismiss,
}) => {
  useEffect(() => {
    if (!achievement) return;
    const timer = setTimeout(() => {
      onDismiss();
    }, 4500);
    return () => clearTimeout(timer);
  }, [achievement, onDismiss]);

  if (!achievement) return null;

  const renderIcon = () => {
    const iconClass = 'w-6 h-6 text-[#ffcf99]';
    switch (achievement.icon) {
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
    <div className="fixed top-18 inset-x-0 z-50 flex justify-center px-4 pointer-events-none animate-in fade-in slide-in-from-top-4 duration-300">
      <div className="w-full max-w-md bg-[#2d1b15] border-2 border-[#ffad47] text-[#fff8f3] rounded-2xl p-3.5 sm:p-4 shadow-2xl flex items-center justify-between gap-3 pointer-events-auto backdrop-blur-md relative overflow-hidden">
        {/* Glow corner */}
        <div className="absolute -top-10 -right-10 w-28 h-28 bg-[#ffad47]/20 rounded-full blur-xl pointer-events-none" />

        <div className="flex items-center gap-3.5 min-w-0">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#8a3319] to-[#5a200f] border border-[#ffad47]/50 flex items-center justify-center shrink-0 shadow-md">
            {renderIcon()}
          </div>

          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-black tracking-widest uppercase text-[#ffad47]">
                ★ Conquista Desbloqueada!
              </span>
              <span className="bg-[#885200] text-[#ffddbb] text-[9px] font-bold px-1.5 py-0.2 rounded-full">
                +{achievement.rewardPoints} pts
              </span>
            </div>
            <h4 className="font-display font-bold text-sm sm:text-base text-[#fff8f3] truncate">
              {achievement.title}
            </h4>
            <p className="text-xs text-[#d8c2bb] truncate">
              {achievement.description}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onDismiss}
          aria-label="Fechar Notificação"
          className="w-8 h-8 rounded-full bg-[#3d271f] hover:bg-[#4d3228] text-[#d8c2bb] flex items-center justify-center shrink-0 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
