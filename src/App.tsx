import React, { useState, useCallback } from 'react';
import { useGame } from './hooks/useGame';
import { Board } from './components/Board';
import { PlayerPanel } from './components/PlayerPanel';
import { ScoreBoard } from './components/ScoreBoard';
import { GameControls } from './components/GameControls';
import { MoveHistory } from './components/MoveHistory';
import { RulesModal } from './components/RulesModal';
import { GameOverModal } from './components/GameOverModal';
import { SettingsModal } from './components/SettingsModal';
import { AchievementsModal } from './components/AchievementsModal';
import { AchievementNotification } from './components/AchievementNotification';
import { MainMenu } from './components/MainMenu';
import { LeaderboardModal } from './components/LeaderboardModal';
import { PlayerProfileModal } from './components/PlayerProfileModal';
import { useAuth } from './firebase/useAuth';
import { RULE_PRESETS } from './game/rules';
import { AIDifficulty, GameMode, GameState } from './game/types';
import {
  Gamepad2,
  BookOpen,
  Settings as SettingsIcon,
  Menu as MenuIcon,
  Volume2,
  VolumeX,
  Grid,
  Trophy,
  Award,
  Zap,
  Lightbulb,
  User as UserIcon,
} from 'lucide-react';

type ActiveView = 'game' | 'rules' | 'settings' | 'achievements' | 'main-menu';

const NYAMI_AVATAR =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCwPLXden8FsJbXLKnwqmEuemx3sVmoUdkpJPUHncpL5j1ZvcI7gD_p3PhQDiBl60rw_GhQYQ_3vth0F68hMVR1VbzV1kNh6wMTopzc6NiDY4GKk_rjxQtb7CebtnfjaP-Pzm6mciuaIdnHGwcvA3CbOE70wM881gsCpFY16oU3F7e-cvOP5opS2p0IqwEXcuGfWLYKDzo7zMWZEh7k0UgjzqVi1AY_xBNSGP1G8f3LeXHsJGexizkTfA';

export default function App() {
  const [activeView, setActiveView] = useState<ActiveView>('main-menu');
  const [isRulesModalOpen, setIsRulesModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isAchievementsModalOpen, setIsAchievementsModalOpen] = useState(false);
  const [isLeaderboardModalOpen, setIsLeaderboardModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [lastXpEarned, setLastXpEarned] = useState<number | null>(null);

  // Firebase Auth & Player Profile
  const {
    user: currentUser,
    playerProfile,
    loading: isAuthLoading,
    authWarning,
    clearAuthWarning,
    loginWithGoogle,
    signOut,
    updateName,
    recordGameResult,
  } = useAuth();

  // Registo automático de partida no Firestore quando o jogo termina
  const handleGameOver = useCallback(
    async (finalState: GameState) => {
      try {
        const result = await recordGameResult({
          gameMode: finalState.gameMode,
          difficulty: finalState.difficulty,
          winner: finalState.winner,
          seedsCaptured: finalState.capturedSeeds.player1,
          totalTurns: finalState.turnCount - 1,
          winReason: finalState.winReason,
        });

        if (result?.gainedXp) {
          setLastXpEarned(result.gainedXp);
        }
      } catch (err) {
        console.warn('Estatísticas guardadas localmente (sincronização na nuvem pendente):', err);
      }
    },
    [recordGameResult]
  );

  const {
    gameState,
    displayBoard,
    activeHighlightPitId,
    currentStepType,
    nextTargetPitId,
    manualInvalidPitId,
    manualWarningMessage,
    handSeedCount,
    lastCaptureInfo,
    legalMoves,
    hintPitId,
    requestHint,
    clearHint,
    sound,
    handleSelectPit,
    handleManualAdvanceTarget,
    isManualMode,
    toggleManualMode,
    manualMoveState,
    advanceManualStep,
    completeManualMoveAuto,
    restart,
    setGameMode,
    setDifficulty,
    aiSpeed,
    setAiSpeed,
    config,
    updateConfig,
    applyPreset,
    achievements,
    playerStats,
    newlyUnlockedAchievement,
    dismissAchievementNotification,
  } = useGame('ai', 'medium', { onGameOver: handleGameOver });

  const handleStartGame = (mode: GameMode, difficulty?: AIDifficulty) => {
    setLastXpEarned(null);
    setGameMode(mode);
    if (difficulty) {
      setDifficulty(difficulty);
    }
    setActiveView('game');
  };

  const unlockedAchievementsCount = achievements.filter((a) => a.unlocked).length;
  const currentPreset =
    RULE_PRESETS.find((p) => p.id === config.presetId) || null;
  const activePresetName = currentPreset ? currentPreset.shortName : 'Personalizado';

  const toggleAiSpeed = () => {
    setAiSpeed(aiSpeed === 'fast' ? 'normal' : 'fast');
  };

  const currentViewLabel =
    activeView === 'game'
      ? 'Partida'
      : activeView === 'rules'
      ? 'Regras'
      : activeView === 'settings'
      ? 'Definições'
      : activeView === 'achievements'
      ? 'Conquistas'
      : 'Menu';

  return (
    <div className="flex flex-col min-h-screen bg-[#1a120f] text-[#fff8f3]">
      {/* Toast Notification when achievement is unlocked */}
      <AchievementNotification
        achievement={newlyUnlockedAchievement}
        onDismiss={dismissAchievementNotification}
      />

      {/* Fixed Header */}
      <header className="fixed top-0 inset-x-0 z-40 bg-[#1e1411]/90 backdrop-blur-xl border-b border-[#362520] shadow-sm">
        <div className="h-16 max-w-xl mx-auto px-4 flex items-center justify-between">
          {/* Logo & Subtitle */}
          <button
            type="button"
            onClick={() => setActiveView('main-menu')}
            className="flex items-center gap-2.5 text-left active:scale-95 transition-transform"
          >
            <div className="w-9 h-9 rounded-xl bg-[#8a3319] text-[#fff8f3] flex items-center justify-center shadow-inner border border-[#ffb5a0]/30">
              <Grid className="w-5 h-5 text-[#ffcf99]" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-black text-lg tracking-tight text-[#fff8f3] leading-none">
                NTXUVA
              </span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ffad47] animate-pulse" />
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#d8c2bb] leading-none">
                  {currentViewLabel} · {activePresetName}
                </span>
              </div>
            </div>
          </button>

          {/* Quick Actions */}
          <div className="flex items-center gap-1 sm:gap-1.5">
            {/* Quick Dica Button (Ativa dica durante o seu turno) */}
            {activeView === 'game' && (
              <button
                type="button"
                onClick={requestHint}
                disabled={
                  gameState.currentPlayer !== 'player1' ||
                  gameState.gameStatus !== 'in_progress'
                }
                aria-label={hintPitId !== null ? 'Desativar Dica' : 'Pedir Dica'}
                title={
                  hintPitId !== null
                    ? 'Dica ativada! Cava recomendada destacada'
                    : 'Pedir Dica da Jogada (Melhor lance IA Fácil)'
                }
                className={`h-9 px-2 sm:px-2.5 rounded-xl flex items-center justify-center gap-1 sm:gap-1.5 transition-all text-xs font-bold border cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed ${
                  hintPitId !== null
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-amber-950 border-amber-300 shadow-[0_0_12px_rgba(251,191,36,0.6)]'
                    : 'text-[#ffddbb] hover:text-[#ffad47] border-[#443027] hover:bg-[#2b1c17]'
                }`}
              >
                <Lightbulb
                  className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                    hintPitId !== null ? 'fill-amber-950 text-amber-950' : 'text-amber-400'
                  }`}
                />
                <span className="hidden sm:inline">Dica</span>
                {hintPitId !== null && (
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-950" />
                )}
              </button>
            )}

            {/* Quick Fast AI Toggle Button */}
            <button
              type="button"
              onClick={toggleAiSpeed}
              aria-label={aiSpeed === 'fast' ? 'IA Rápida Ativada' : 'IA Normal'}
              title={aiSpeed === 'fast' ? 'IA com Resposta Rápida (~120ms)' : 'IA Normal (~750ms)'}
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                aiSpeed === 'fast'
                  ? 'bg-[#3b2016] text-[#ffad47] border border-[#8a3319]'
                  : 'text-[#89726c] hover:text-[#d8c2bb]'
              }`}
            >
              <Zap className={`w-4 h-4 ${aiSpeed === 'fast' ? 'fill-current' : ''}`} />
            </button>

            {/* Leaderboard Button */}
            <button
              type="button"
              onClick={() => setIsLeaderboardModalOpen(true)}
              aria-label="Abrir Classificação"
              title="Tabela de Classificação Global"
              className="w-9 h-9 rounded-xl flex items-center justify-center bg-gradient-to-br from-[#3b2016] to-[#2a160f] text-[#ffad47] border border-[#ffad47]/30 hover:border-[#ffad47] transition-all cursor-pointer shadow-sm"
            >
              <Trophy className="w-4 h-4 text-[#ffad47] fill-[#ffad47]/30" />
            </button>

            {/* Player Profile / Avatar Button */}
            {playerProfile && (
              <button
                type="button"
                onClick={() => setIsProfileModalOpen(true)}
                aria-label="Perfil do Jogador"
                title={`${playerProfile.displayName} (Nv. ${playerProfile.level || 1})`}
                className="relative flex items-center justify-center h-9 pl-1 pr-2 rounded-xl bg-[#2b1c17] hover:bg-[#38241e] border border-[#ffad47]/30 transition-all cursor-pointer"
              >
                {playerProfile.photoURL ? (
                  <img
                    src={playerProfile.photoURL}
                    alt={playerProfile.displayName}
                    className="w-6 h-6 rounded-full object-cover border border-[#ffad47]"
                  />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-[#3d2419] border border-[#ffad47] flex items-center justify-center text-[11px] font-bold text-[#ffad47]">
                    {playerProfile.displayName?.charAt(0).toUpperCase() || 'J'}
                  </div>
                )}
                <span className="ml-1 text-[11px] font-bold text-amber-300 hidden sm:inline">
                  Nv.{playerProfile.level || 1}
                </span>
              </button>
            )}

            {/* Sound Toggle */}
            <button
              type="button"
              onClick={sound.toggleSound}
              aria-label={sound.soundEnabled ? 'Silenciar Áudio' : 'Ativar Áudio'}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-[#d8c2bb] hover:text-[#ffad47] hover:bg-[#2b1c17] transition-colors"
            >
              {sound.soundEnabled ? (
                <Volume2 className="w-4 h-4 text-[#ffad47]" />
              ) : (
                <VolumeX className="w-4 h-4 text-[#89726c]" />
              )}
            </button>

            {/* Settings Button */}
            <button
              type="button"
              onClick={() => setIsSettingsModalOpen(true)}
              aria-label="Definições"
              className="w-9 h-9 rounded-xl flex items-center justify-center text-[#d8c2bb] hover:text-[#ffad47] hover:bg-[#2b1c17] transition-colors"
            >
              <SettingsIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-xl mx-auto pt-20 pb-24 px-3 sm:px-4 flex flex-col">
        {activeView === 'main-menu' && (
          <MainMenu
            onStartGame={handleStartGame}
            onOpenRules={() => setIsRulesModalOpen(true)}
            onOpenSettings={() => setIsSettingsModalOpen(true)}
            onOpenAchievements={() => setIsAchievementsModalOpen(true)}
            onOpenLeaderboard={() => setIsLeaderboardModalOpen(true)}
            onOpenProfile={() => setIsProfileModalOpen(true)}
            playerProfile={playerProfile}
            unlockedAchievementsCount={unlockedAchievementsCount}
            totalAchievementsCount={achievements.length}
            activePresetName={activePresetName}
            aiSpeed={aiSpeed}
            onToggleAiSpeed={toggleAiSpeed}
            isManualMode={isManualMode}
            onToggleManualMode={toggleManualMode}
            soundEnabled={sound.soundEnabled}
            onToggleSound={sound.toggleSound}
          />
        )}

        {activeView === 'rules' && (
          <div className="w-full py-2">
            <RulesModal
              isOpen={true}
              onClose={() => setActiveView('game')}
              onPlayNow={() => setActiveView('game')}
            />
          </div>
        )}

        {activeView === 'settings' && (
          <div className="w-full py-2">
            <SettingsModal
              isOpen={true}
              onClose={() => setActiveView('game')}
              soundEnabled={sound.soundEnabled}
              onToggleSound={sound.toggleSound}
              difficulty={gameState.difficulty}
              onChangeDifficulty={setDifficulty}
              aiSpeed={aiSpeed}
              onChangeAiSpeed={setAiSpeed}
              isManualMode={isManualMode}
              onToggleManualMode={toggleManualMode}
              config={config}
              onUpdateConfig={updateConfig}
              onApplyPreset={applyPreset}
              gameMode={gameState.gameMode}
            />
          </div>
        )}

        {activeView === 'achievements' && (
          <div className="w-full py-2">
            <AchievementsModal
              isOpen={true}
              onClose={() => setActiveView('game')}
              achievements={achievements}
              playerStats={playerStats}
            />
          </div>
        )}

        {activeView === 'game' && (
          <div className="flex flex-col gap-3 w-full">
            {/* Player 2 / AI Status Bar */}
            <PlayerPanel
              player="player2"
              isCurrentTurn={gameState.currentPlayer === 'player2'}
              gameMode={gameState.gameMode}
              difficulty={gameState.difficulty}
              totalSeedsOnBoard={gameState.scores.player2}
              capturedCount={gameState.capturedSeeds.player2}
              isAIThinking={gameState.isAIThinking}
              isAnimating={gameState.isAnimating && gameState.currentPlayer === 'player2'}
              avatarUrl={gameState.gameMode === 'ai' ? NYAMI_AVATAR : undefined}
            />

            {/* Live Game Turn & Capture Announcement Banner */}
            <ScoreBoard
              currentPlayer={gameState.currentPlayer}
              gameMode={gameState.gameMode}
              isAIThinking={gameState.isAIThinking}
              isAnimating={gameState.isAnimating}
              isManualMode={isManualMode}
              isManualMoveActive={manualMoveState.isActive}
              manualWarningMessage={manualWarningMessage}
              hintPitId={hintPitId}
              legalMovesCount={legalMoves.length}
              lastCaptureInfo={lastCaptureInfo}
            />

            {/* Board */}
            <Board
              board={displayBoard}
              config={gameState.config}
              currentPlayer={gameState.currentPlayer}
              legalMoves={legalMoves}
              activeHighlightPitId={activeHighlightPitId}
              currentStepType={currentStepType}
              nextTargetPitId={nextTargetPitId}
              invalidTouchedPitId={manualInvalidPitId}
              hintPitId={hintPitId}
              handSeedCount={handSeedCount}
              lastCapturePits={lastCaptureInfo?.pits}
              isAnimating={gameState.isAnimating}
              isAIThinking={gameState.isAIThinking}
              onSelectPit={handleSelectPit}
              onManualAdvanceTarget={handleManualAdvanceTarget}
              onAutoCompleteManual={completeManualMoveAuto}
            />

            {/* Player 1 Status Bar */}
            <PlayerPanel
              player="player1"
              isCurrentTurn={gameState.currentPlayer === 'player1'}
              gameMode={gameState.gameMode}
              difficulty={gameState.difficulty}
              totalSeedsOnBoard={gameState.scores.player1}
              capturedCount={gameState.capturedSeeds.player1}
              isAIThinking={false}
              isAnimating={gameState.isAnimating && gameState.currentPlayer === 'player1'}
            />

            {/* Controls */}
            <GameControls
              soundEnabled={sound.soundEnabled}
              onToggleSound={sound.toggleSound}
              onRestart={restart}
              onOpenRules={() => setIsRulesModalOpen(true)}
              onOpenSettings={() => setIsSettingsModalOpen(true)}
              onGoHome={() => setActiveView('main-menu')}
              aiSpeed={aiSpeed}
              onToggleAiSpeed={toggleAiSpeed}
              onRequestHint={requestHint}
              hasHintActive={hintPitId !== null}
              canRequestHint={
                gameState.currentPlayer === 'player1' &&
                gameState.gameStatus === 'in_progress'
              }
              gameMode={gameState.gameMode}
              disabled={false}
            />

            {/* Move History */}
            <MoveHistory
              history={gameState.moveHistory}
              currentTurnCount={gameState.turnCount}
            />
          </div>
        )}
      </main>

      {/* Global Overlaid Modals */}
      <RulesModal
        isOpen={isRulesModalOpen && activeView !== 'rules'}
        onClose={() => setIsRulesModalOpen(false)}
        onPlayNow={() => {
          setIsRulesModalOpen(false);
          setActiveView('game');
        }}
      />

      <SettingsModal
        isOpen={isSettingsModalOpen && activeView !== 'settings'}
        onClose={() => setIsSettingsModalOpen(false)}
        soundEnabled={sound.soundEnabled}
        onToggleSound={sound.toggleSound}
        difficulty={gameState.difficulty}
        onChangeDifficulty={setDifficulty}
        aiSpeed={aiSpeed}
        onChangeAiSpeed={setAiSpeed}
        isManualMode={isManualMode}
        onToggleManualMode={toggleManualMode}
        config={config}
        onUpdateConfig={updateConfig}
        onApplyPreset={applyPreset}
        gameMode={gameState.gameMode}
      />

      <AchievementsModal
        isOpen={isAchievementsModalOpen && activeView !== 'achievements'}
        onClose={() => setIsAchievementsModalOpen(false)}
        achievements={achievements}
        playerStats={playerStats}
      />

      <GameOverModal
        isOpen={gameState.gameStatus === 'game_over'}
        winner={gameState.winner}
        reason={gameState.winReason}
        p1Captures={gameState.capturedSeeds.player1}
        p2Captures={gameState.capturedSeeds.player2}
        totalTurns={gameState.turnCount - 1}
        gameMode={gameState.gameMode}
        xpEarned={lastXpEarned}
        playerProfile={playerProfile}
        onOpenLeaderboard={() => setIsLeaderboardModalOpen(true)}
        onPlayAgain={restart}
        onGoHome={() => {
          restart();
          setActiveView('main-menu');
        }}
      />

      {/* Tabela de Classificação (Leaderboard) Modal */}
      <LeaderboardModal
        isOpen={isLeaderboardModalOpen}
        onClose={() => setIsLeaderboardModalOpen(false)}
        currentUser={currentUser}
        currentProfile={playerProfile}
        onLoginWithGoogle={loginWithGoogle}
        onSignOut={signOut}
        authWarning={authWarning}
        clearAuthWarning={clearAuthWarning}
        onOpenProfile={() => {
          setIsLeaderboardModalOpen(false);
          setIsProfileModalOpen(true);
        }}
      />

      {/* Perfil do Jogador Modal */}
      <PlayerProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        currentUser={currentUser}
        profile={playerProfile}
        onUpdateName={updateName}
        onLoginWithGoogle={loginWithGoogle}
        onSignOut={signOut}
        authWarning={authWarning}
        clearAuthWarning={clearAuthWarning}
      />

      {/* Fixed Bottom Navigation */}
      <nav className="fixed bottom-0 inset-x-0 z-40 bg-[#1e1411]/95 backdrop-blur-xl border-t border-[#362520] shadow-lg">
        <div className="flex justify-around items-center h-16 max-w-xl mx-auto px-2 sm:px-4">
          <button
            type="button"
            onClick={() => setActiveView('game')}
            className={`flex flex-col items-center justify-center gap-1 min-w-[52px] h-12 transition-all ${
              activeView === 'game'
                ? 'text-[#ffad47] font-bold scale-105'
                : 'text-[#89726c] hover:text-[#d8c2bb]'
            }`}
          >
            <Gamepad2 className="w-5 h-5" />
            <span className="text-[10px] sm:text-[11px] leading-none">Jogar</span>
          </button>

          <button
            type="button"
            onClick={() => setIsLeaderboardModalOpen(true)}
            className={`flex flex-col items-center justify-center gap-1 min-w-[52px] h-12 transition-all ${
              isLeaderboardModalOpen
                ? 'text-[#ffad47] font-bold scale-105'
                : 'text-[#89726c] hover:text-[#d8c2bb]'
            }`}
          >
            <Trophy className="w-5 h-5 text-amber-400" />
            <span className="text-[10px] sm:text-[11px] leading-none">Ranking</span>
          </button>

          <button
            type="button"
            onClick={() => setIsAchievementsModalOpen(true)}
            className={`flex flex-col items-center justify-center gap-1 min-w-[52px] h-12 transition-all relative ${
              activeView === 'achievements' || isAchievementsModalOpen
                ? 'text-[#ffad47] font-bold scale-105'
                : 'text-[#89726c] hover:text-[#d8c2bb]'
            }`}
          >
            <Award className="w-5 h-5" />
            <span className="text-[10px] sm:text-[11px] leading-none">Conquistas</span>
            {unlockedAchievementsCount > 0 && (
              <span className="absolute top-1 right-2 w-2 h-2 rounded-full bg-[#ffad47]" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveView('rules')}
            className={`flex flex-col items-center justify-center gap-1 min-w-[52px] h-12 transition-all ${
              activeView === 'rules'
                ? 'text-[#ffad47] font-bold scale-105'
                : 'text-[#89726c] hover:text-[#d8c2bb]'
            }`}
          >
            <BookOpen className="w-5 h-5" />
            <span className="text-[10px] sm:text-[11px] leading-none">Regras</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveView('main-menu')}
            className={`flex flex-col items-center justify-center gap-1 min-w-[52px] h-12 transition-all ${
              activeView === 'main-menu'
                ? 'text-[#ffad47] font-bold scale-105'
                : 'text-[#89726c] hover:text-[#d8c2bb]'
            }`}
          >
            <MenuIcon className="w-5 h-5" />
            <span className="text-[10px] sm:text-[11px] leading-none">Menu</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
