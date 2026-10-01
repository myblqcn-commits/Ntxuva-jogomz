import React, { useState } from 'react';
import {
  User as UserIcon,
  X,
  Trophy,
  Flame,
  CircleDot,
  Check,
  Edit2,
  ShieldCheck,
  Award,
  Sparkles,
  LogIn,
  LogOut,
  AlertTriangle,
  ExternalLink,
  Copy,
} from 'lucide-react';
import { FirebasePlayerProfile } from '../firebase/types';
import { calculateLevelInfo } from '../firebase/playerService';
import { User } from 'firebase/auth';
import { AuthWarning } from '../firebase/useAuth';

interface PlayerProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User | null;
  profile: FirebasePlayerProfile | null;
  onUpdateName: (newName: string) => Promise<void>;
  onLoginWithGoogle: () => void;
  onSignOut: () => void;
  authWarning?: AuthWarning | null;
  clearAuthWarning?: () => void;
}

export const PlayerProfileModal: React.FC<PlayerProfileModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  profile,
  onUpdateName,
  onLoginWithGoogle,
  onSignOut,
  authWarning,
  clearAuthWarning,
}) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const [saving, setSaving] = useState(false);
  const [domainCopied, setDomainCopied] = useState(false);

  if (!isOpen || !profile) return null;

  const { level, title, nextLevelXp, currentLevelBaseXp } = calculateLevelInfo(
    profile.experiencePoints || 0
  );

  const xpProgressInLevel = Math.max(0, profile.experiencePoints - currentLevelBaseXp);
  const xpNeededInLevel = Math.max(1, nextLevelXp - currentLevelBaseXp);
  const progressPercent = Math.min(100, Math.round((xpProgressInLevel / xpNeededInLevel) * 100));

  const totalGames = (profile.wins || 0) + (profile.losses || 0) + (profile.draws || 0);
  const winRate = totalGames > 0 ? Math.round(((profile.wins || 0) / totalGames) * 100) : 0;

  const handleStartEdit = () => {
    setNameInput(profile.displayName || '');
    setIsEditingName(true);
  };

  const handleSaveName = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim()) return;

    setSaving(true);
    try {
      await onUpdateName(nameInput.trim());
      setIsEditingName(false);
    } catch (err) {
      console.warn('Aviso ao guardar nome:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleCopyDomain = (domain: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(domain);
      setDomainCopied(true);
      setTimeout(() => setDomainCopied(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-3 sm:p-4 overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-md bg-[#1c1410] border border-[#ffad47]/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="relative px-5 py-4 bg-gradient-to-r from-[#2c1a12] via-[#3a2217] to-[#2c1a12] border-b border-[#ffad47]/20 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <UserIcon className="w-5 h-5 text-[#ffad47]" />
            <h2 className="text-base sm:text-lg font-bold text-[#ffad47]">
              Perfil do Jogador
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#271811] hover:bg-[#3d251a] text-zinc-400 hover:text-white transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Conteúdo */}
        <div className="p-5 space-y-5">
          {/* Cartão de Identidade */}
          <div className="flex items-center gap-4 p-4 rounded-xl bg-[#241711] border border-[#ffad47]/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#ffad47]/5 rounded-full blur-2xl pointer-events-none" />

            <div className="relative flex-shrink-0">
              {profile.photoURL ? (
                <img
                  src={profile.photoURL}
                  alt={profile.displayName}
                  className="w-16 h-16 rounded-full border-2 border-[#ffad47] object-cover shadow-lg"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-[#3b2419] border-2 border-[#ffad47] flex items-center justify-center text-xl font-black text-[#ffad47] shadow-lg">
                  {profile.displayName?.charAt(0).toUpperCase() || 'J'}
                </div>
              )}
              <div className="absolute -bottom-1 -right-1 px-2 py-0.5 bg-[#ffad47] text-zinc-950 font-black text-[10px] rounded-full shadow">
                Nv. {level}
              </div>
            </div>

            <div className="flex-1 min-w-0">
              {isEditingName ? (
                <form onSubmit={handleSaveName} className="flex items-center gap-1.5">
                  <input
                    type="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    maxLength={30}
                    autoFocus
                    className="w-full px-2.5 py-1 bg-[#150d0a] border border-[#ffad47]/50 rounded-lg text-xs text-white focus:outline-none focus:border-[#ffad47]"
                  />
                  <button
                    type="submit"
                    disabled={saving || !nameInput.trim()}
                    className="p-1.5 rounded-lg bg-[#ffad47] text-zinc-950 hover:brightness-110 disabled:opacity-50"
                  >
                    <Check className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditingName(false)}
                    className="p-1.5 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </form>
              ) : (
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-base text-zinc-100 truncate">
                    {profile.displayName}
                  </h3>
                  <button
                    onClick={handleStartEdit}
                    title="Editar nome"
                    className="p-1 text-[#ffad47] hover:text-amber-300 transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              <p className="text-xs text-[#ffad47] font-semibold flex items-center gap-1 mt-0.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                {title}
              </p>

              {currentUser ? (
                <div className="flex items-center gap-1 text-[10px] text-emerald-400 mt-1">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Conta Google vinculada</span>
                </div>
              ) : (
                <p className="text-[10px] text-zinc-400 mt-1">
                  Jogador Local (Guest)
                </p>
              )}
            </div>
          </div>

          {/* Barra de Progresso de Nível & XP */}
          <div className="p-3.5 rounded-xl bg-[#241711] border border-[#ffad47]/15 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-zinc-200 flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-orange-400" />
                Progresso para Nível {level + 1}
              </span>
              <span className="text-[#ffad47] font-bold">
                {xpProgressInLevel} / {xpNeededInLevel} XP
              </span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-[#150d0a] overflow-hidden border border-[#52372c]/40">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-[#ffad47] rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-[#a88a7e]">
              <span>XP Total Acumulado: {profile.experiencePoints || 0}</span>
              <span>{progressPercent}% completo</span>
            </div>
          </div>

          {/* Grelha de Estatísticas do Firestore */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="p-3 rounded-xl bg-[#241711] border border-[#ffad47]/10 flex flex-col">
              <span className="text-[11px] text-[#a88a7e] flex items-center gap-1">
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                Vitórias
              </span>
              <span className="text-lg font-black text-[#ffad47] mt-0.5">
                {profile.wins || 0}
              </span>
              <span className="text-[10px] text-zinc-400 mt-auto">
                Taxa de sucesso: {winRate}%
              </span>
            </div>

            <div className="p-3 rounded-xl bg-[#241711] border border-[#ffad47]/10 flex flex-col">
              <span className="text-[11px] text-[#a88a7e] flex items-center gap-1">
                <CircleDot className="w-3.5 h-3.5 text-orange-400" />
                Sementes Colhidas
              </span>
              <span className="text-lg font-black text-amber-300 mt-0.5">
                {profile.seedsCaptured || 0}
              </span>
              <span className="text-[10px] text-zinc-400 mt-auto">
                Total de capturas
              </span>
            </div>

            <div className="p-3 rounded-xl bg-[#241711] border border-[#ffad47]/10 flex flex-col">
              <span className="text-[11px] text-[#a88a7e] flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-zinc-400" />
                Partidas Jogadas
              </span>
              <span className="text-lg font-black text-zinc-200 mt-0.5">
                {totalGames}
              </span>
              <span className="text-[10px] text-zinc-400 mt-auto">
                {profile.losses || 0} derrotas • {profile.draws || 0} empates
              </span>
            </div>

            <div className="p-3 rounded-xl bg-[#241711] border border-[#ffad47]/10 flex flex-col">
              <span className="text-[11px] text-[#a88a7e] flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                Nível Atual
              </span>
              <span className="text-lg font-black text-[#ffad47] mt-0.5">
                Nvl. {level}
              </span>
              <span className="text-[10px] text-[#ffad47] mt-auto truncate">
                {title}
              </span>
            </div>
          </div>

          {/* Alerta de Domínio Não Autorizado / Firebase Auth */}
          {authWarning && (
            <div className="mb-3 p-3.5 rounded-xl bg-gradient-to-br from-amber-950/60 to-[#2e1910] border border-amber-500/40 text-amber-200 shadow-lg animate-fade-in">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-2.5">
                  <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-amber-300">
                      {authWarning.title}
                    </h4>
                    <p className="text-[11px] text-amber-200/90 mt-1 leading-relaxed">
                      Para iniciar sessão com o Google neste ambiente, o domínio precisa de estar registado na Consola do Firebase.
                    </p>

                    <div className="mt-2.5 flex flex-wrap items-center gap-2">
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/50 border border-amber-500/30 text-[11px] font-mono text-amber-100">
                        <span className="truncate max-w-[200px] sm:max-w-xs">{authWarning.currentDomain}</span>
                        <button
                          type="button"
                          onClick={() => handleCopyDomain(authWarning.currentDomain)}
                          className="text-amber-400 hover:text-white p-0.5 rounded transition-colors"
                          title="Copiar domínio"
                        >
                          {domainCopied ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>

                      {authWarning.consoleUrl && (
                        <a
                          href={authWarning.consoleUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 hover:text-amber-100 text-[11px] font-medium border border-amber-500/30 transition-all"
                        >
                          <span>Abrir Consola Firebase</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>

                    <p className="text-[10px] text-amber-300/70 mt-2">
                      💡 <strong>Tudo funciona offline:</strong> O seu progresso, cavas, nível e XP continuam salvos no navegador.
                    </p>
                  </div>
                </div>

                {clearAuthWarning && (
                  <button
                    type="button"
                    onClick={clearAuthWarning}
                    className="text-amber-400/60 hover:text-amber-200 p-1 rounded transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Autenticação Google */}
          <div className="pt-2 border-t border-[#ffad47]/15">
            {!currentUser ? (
              <button
                onClick={onLoginWithGoogle}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#ffad47] to-[#d97c14] text-zinc-950 font-bold text-xs shadow-lg hover:brightness-110 active:scale-98 transition-all"
              >
                <LogIn className="w-4 h-4 text-zinc-950" />
                <span>Iniciar Sessão com Google para Guardar na Nuvem</span>
              </button>
            ) : (
              <button
                onClick={onSignOut}
                className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-[#2c1b14] hover:bg-[#3d2419] text-rose-300 font-semibold text-xs border border-rose-900/30 transition-all"
              >
                <LogOut className="w-4 h-4" />
                <span>Terminar Sessão ({currentUser.email})</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
