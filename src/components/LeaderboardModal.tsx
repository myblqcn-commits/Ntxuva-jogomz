import React, { useEffect, useState } from 'react';
import {
  Trophy,
  Medal,
  Award,
  Crown,
  Flame,
  RefreshCw,
  X,
  User as UserIcon,
  LogIn,
  LogOut,
  Sparkles,
  ShieldCheck,
  CircleDot,
  AlertTriangle,
  ExternalLink,
  Copy,
  Check,
} from 'lucide-react';
import { LeaderboardPlayer, FirebasePlayerProfile } from '../firebase/types';
import { getLeaderboard } from '../firebase/playerService';
import { User } from 'firebase/auth';
import { AuthWarning } from '../firebase/useAuth';

interface LeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User | null;
  currentProfile: FirebasePlayerProfile | null;
  onLoginWithGoogle: () => void;
  onSignOut: () => void;
  onOpenProfile?: () => void;
  authWarning?: AuthWarning | null;
  clearAuthWarning?: () => void;
}

type SortCategory = 'wins' | 'experiencePoints' | 'seedsCaptured';

export const LeaderboardModal: React.FC<LeaderboardModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  currentProfile,
  onLoginWithGoogle,
  onSignOut,
  onOpenProfile,
  authWarning,
  clearAuthWarning,
}) => {
  const [players, setPlayers] = useState<LeaderboardPlayer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeCategory, setActiveCategory] = useState<SortCategory>('wins');
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [domainCopied, setDomainCopied] = useState<boolean>(false);

  const fetchScores = async (category: SortCategory, isManualRefresh = false) => {
    if (isManualRefresh) setRefreshing(true);
    else setLoading(true);

    try {
      const data = await getLeaderboard(30, category);
      setPlayers(data);
    } catch (err) {
      console.warn('Aviso ao carregar classificação remota:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchScores(activeCategory);
    }
  }, [isOpen, activeCategory]);

  if (!isOpen) return null;

  const getRankBadge = (rank: number) => {
    if (rank === 1) {
      return (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-300 via-amber-400 to-yellow-600 flex items-center justify-center text-zinc-950 font-black shadow-[0_0_12px_rgba(251,191,36,0.6)]">
          <Crown className="w-4 h-4 text-zinc-950 fill-zinc-950" />
        </div>
      );
    }
    if (rank === 2) {
      return (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-200 via-gray-300 to-slate-400 flex items-center justify-center text-zinc-900 font-bold shadow-md">
          <Medal className="w-4 h-4 text-zinc-900 fill-zinc-900" />
        </div>
      );
    }
    if (rank === 3) {
      return (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-700 via-amber-800 to-amber-950 flex items-center justify-center text-amber-200 font-bold shadow-md">
          <Award className="w-4 h-4 text-amber-200 fill-amber-200" />
        </div>
      );
    }
    return (
      <div className="w-8 h-8 rounded-full bg-[#34221a] border border-[#52372c] flex items-center justify-center text-zinc-400 font-semibold text-xs">
        #{rank}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-3 sm:p-4 overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#1c1410] border border-[#ffad47]/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header decorado */}
        <div className="relative px-5 py-4 bg-gradient-to-r from-[#2c1a12] via-[#3a2217] to-[#2c1a12] border-b border-[#ffad47]/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ffad47] to-[#b36814] flex items-center justify-center shadow-lg text-zinc-950">
              <Trophy className="w-5 h-5 text-zinc-950" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-[#ffad47] tracking-wide flex items-center gap-2">
                Classificação dos Jogadores
                <Sparkles className="w-4 h-4 text-amber-400" />
              </h2>
              <p className="text-xs text-[#c0a297]">
                Os maiores estrategistas de Ntxuva no Firestore
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => fetchScores(activeCategory, true)}
              disabled={refreshing || loading}
              title="Atualizar lista"
              className="p-2 rounded-lg bg-[#271811] hover:bg-[#3d251a] text-[#ffad47] border border-[#ffad47]/20 transition-all active:scale-95 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-[#271811] hover:bg-[#3d251a] text-zinc-400 hover:text-white transition-all active:scale-95"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Banner do Utilizador Atual */}
        <div className="px-4 py-3 bg-[#241711] border-b border-[#ffad47]/10 flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex items-center gap-3">
            <div className="relative">
              {currentProfile?.photoURL ? (
                <img
                  src={currentProfile.photoURL}
                  alt={currentProfile.displayName}
                  className="w-10 h-10 rounded-full border-2 border-[#ffad47] object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-[#3d251a] border-2 border-[#ffad47]/40 flex items-center justify-center text-[#ffad47] font-bold">
                  {currentProfile?.displayName?.charAt(0).toUpperCase() || 'J'}
                </div>
              )}
              <span className="absolute -bottom-1 -right-1 px-1.5 py-0.2 bg-[#ffad47] text-zinc-950 font-black text-[9px] rounded-full">
                Nv.{currentProfile?.level || 1}
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-zinc-100">
                  {currentProfile?.displayName || 'O Meu Perfil'}
                </span>
                {currentUser && (
                  <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-semibold bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-700/40">
                    <ShieldCheck className="w-3 h-3" />
                    Google
                  </span>
                )}
              </div>
              <p className="text-[11px] text-[#b89b90]">
                {currentProfile?.levelTitle || 'Iniciante das Cavas'} •{' '}
                <span className="text-[#ffad47] font-semibold">{currentProfile?.wins || 0}</span> vitórias •{' '}
                <span className="text-amber-300 font-semibold">{currentProfile?.experiencePoints || 0}</span> XP
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!currentUser ? (
              <button
                onClick={onLoginWithGoogle}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#ffad47] to-[#e68d22] text-zinc-950 text-xs font-bold shadow hover:brightness-110 active:scale-95 transition-all"
              >
                <LogIn className="w-3.5 h-3.5 text-zinc-950" />
                <span>Entrar com Google</span>
              </button>
            ) : (
              <div className="flex items-center gap-1.5">
                {onOpenProfile && (
                  <button
                    onClick={onOpenProfile}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#34221a] hover:bg-[#462d22] text-zinc-200 text-xs font-medium border border-[#ffad47]/20 transition-all"
                  >
                    <UserIcon className="w-3.5 h-3.5 text-[#ffad47]" />
                    <span>Perfil</span>
                  </button>
                )}
                <button
                  onClick={onSignOut}
                  title="Terminar sessão"
                  className="p-1.5 rounded-lg bg-[#34221a] hover:bg-[#462d22] text-zinc-400 hover:text-rose-300 border border-[#ffad47]/10 transition-all"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Alerta de Domínio Não Autorizado / Firebase Auth */}
        {authWarning && (
          <div className="mx-4 mt-3 p-3 rounded-xl bg-gradient-to-br from-amber-950/60 to-[#2e1910] border border-amber-500/40 text-amber-200 shadow-md">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-amber-300">
                    {authWarning.title}
                  </h4>
                  <p className="text-[11px] text-amber-200/90 mt-0.5 leading-relaxed">
                    Para sincronizar com o Google, adicione o domínio da aplicação na Consola do Firebase.
                  </p>

                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/50 border border-amber-500/30 text-[10px] font-mono text-amber-100">
                      <span className="truncate max-w-[180px] sm:max-w-xs">{authWarning.currentDomain}</span>
                      <button
                        type="button"
                        onClick={() => {
                          if (typeof navigator !== 'undefined' && navigator.clipboard) {
                            navigator.clipboard.writeText(authWarning.currentDomain);
                            setDomainCopied(true);
                            setTimeout(() => setDomainCopied(false), 2000);
                          }
                        }}
                        className="text-amber-400 hover:text-white p-0.5 transition-colors"
                        title="Copiar domínio"
                      >
                        {domainCopied ? (
                          <Check className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    </div>

                    {authWarning.consoleUrl && (
                      <a
                        href={authWarning.consoleUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 hover:text-amber-100 text-[10px] font-medium border border-amber-500/30 transition-all"
                      >
                        <span>Consola Firebase</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {clearAuthWarning && (
                <button
                  type="button"
                  onClick={clearAuthWarning}
                  className="text-amber-400/60 hover:text-amber-200 p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Tabs de Ordenação */}
        <div className="px-4 pt-3 pb-2 flex items-center gap-2 border-b border-[#ffad47]/10 bg-[#170f0b]">
          <span className="text-xs text-[#a88a7e] font-medium mr-1 hidden sm:inline">
            Ordenar por:
          </span>
          <button
            onClick={() => setActiveCategory('wins')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeCategory === 'wins'
                ? 'bg-[#ffad47] text-zinc-950 shadow-md'
                : 'bg-[#271811] text-[#c0a297] hover:bg-[#34221a] border border-[#52372c]/40'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>Mais Vitoriosos</span>
          </button>

          <button
            onClick={() => setActiveCategory('experiencePoints')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeCategory === 'experiencePoints'
                ? 'bg-[#ffad47] text-zinc-950 shadow-md'
                : 'bg-[#271811] text-[#c0a297] hover:bg-[#34221a] border border-[#52372c]/40'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-orange-400" />
            <span>Nível & XP</span>
          </button>

          <button
            onClick={() => setActiveCategory('seedsCaptured')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeCategory === 'seedsCaptured'
                ? 'bg-[#ffad47] text-zinc-950 shadow-md'
                : 'bg-[#271811] text-[#c0a297] hover:bg-[#34221a] border border-[#52372c]/40'
            }`}
          >
            <CircleDot className="w-3.5 h-3.5 text-amber-300" />
            <span>Sementes Capturadas</span>
          </button>
        </div>

        {/* Lista da Tabela */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {loading ? (
            <div className="py-16 flex flex-col items-center justify-center gap-3 text-[#ffad47]">
              <RefreshCw className="w-8 h-8 animate-spin text-[#ffad47]" />
              <p className="text-sm font-medium text-[#c0a297]">
                A carregar os melhores jogadores do Ntxuva...
              </p>
            </div>
          ) : players.length === 0 ? (
            <div className="py-14 text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full bg-[#2c1b14] border border-[#ffad47]/30 flex items-center justify-center text-[#ffad47]">
                <Trophy className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-zinc-200">
                Ainda não há partidas registadas
              </h3>
              <p className="text-xs text-[#a88a7e] max-w-sm mx-auto">
                Termina uma partida para seres o primeiro mestre a entrar na Tabela de Classificação do Ntxuva!
              </p>
            </div>
          ) : (
            players.map((player) => {
              const isCurrent = player.id === currentProfile?.id;

              return (
                <div
                  key={player.id}
                  className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                    isCurrent
                      ? 'bg-[#3b2418] border-[#ffad47] shadow-[0_0_15px_rgba(255,173,71,0.2)]'
                      : 'bg-[#241711] border-[#3f271c] hover:border-[#5a3828]'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Badge de Posição */}
                    <div className="flex-shrink-0">{getRankBadge(player.rank)}</div>

                    {/* Foto ou Avatar */}
                    <div className="flex-shrink-0">
                      {player.photoURL ? (
                        <img
                          src={player.photoURL}
                          alt={player.displayName}
                          className="w-9 h-9 rounded-full object-cover border border-[#ffad47]/40"
                        />
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-[#34221a] border border-[#ffad47]/30 flex items-center justify-center text-xs font-bold text-[#ffad47]">
                          {player.displayName?.charAt(0).toUpperCase() || 'J'}
                        </div>
                      )}
                    </div>

                    {/* Nome e Título */}
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`font-bold text-xs sm:text-sm truncate ${
                            isCurrent ? 'text-[#ffad47]' : 'text-zinc-100'
                          }`}
                        >
                          {player.displayName}
                        </span>
                        {isCurrent && (
                          <span className="text-[10px] bg-[#ffad47] text-zinc-950 font-black px-1.5 py-0.2 rounded-full flex-shrink-0">
                            TU
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-[#a88a7e] truncate flex items-center gap-1.5">
                        <span className="text-amber-400/90 font-medium">
                          Nv. {player.level || 1}
                        </span>
                        <span>•</span>
                        <span className="truncate">{player.levelTitle || 'Iniciante'}</span>
                      </p>
                    </div>
                  </div>

                  {/* Estatísticas da Linha */}
                  <div className="flex items-center gap-3 sm:gap-6 flex-shrink-0 text-right">
                    {/* Vitórias */}
                    <div className="flex flex-col items-end">
                      <span className="text-xs sm:text-sm font-bold text-amber-400">
                        {player.wins || 0}{' '}
                        <span className="text-[10px] text-zinc-400 font-normal">vit.</span>
                      </span>
                      <span className="text-[10px] text-[#8e7469]">
                        {player.winRate}% taxa
                      </span>
                    </div>

                    {/* Sementes */}
                    <div className="hidden sm:flex flex-col items-end">
                      <span className="text-xs sm:text-sm font-semibold text-zinc-200">
                        {player.seedsCaptured || 0}
                      </span>
                      <span className="text-[10px] text-[#8e7469]">capturadas</span>
                    </div>

                    {/* XP */}
                    <div className="flex flex-col items-end min-w-[50px]">
                      <span className="text-xs sm:text-sm font-bold text-[#ffad47]">
                        {player.experiencePoints || 0}
                      </span>
                      <span className="text-[10px] text-[#8e7469]">XP</span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Rodapé Informativo */}
        <div className="p-3 bg-[#170f0b] border-t border-[#ffad47]/10 flex items-center justify-between text-[11px] text-[#a88a7e]">
          <span>Estatísticas sincronizadas na nuvem com o Firebase Firestore</span>
          <button
            onClick={onClose}
            className="px-3 py-1 bg-[#2c1a12] hover:bg-[#3d2419] text-[#ffad47] font-semibold rounded-lg border border-[#ffad47]/20 transition-all"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
