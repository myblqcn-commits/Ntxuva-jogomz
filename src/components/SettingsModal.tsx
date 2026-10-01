import React, { useState } from 'react';
import { AIDifficulty, AISpeed, GameConfig, GameMode } from '../game/types';
import { RULE_PRESETS } from '../game/rules';
import {
  X,
  Volume2,
  VolumeX,
  Grid,
  Cpu,
  Check,
  Zap,
  Sliders,
  Sparkles,
  BookOpen,
  Layers,
  Hand,
} from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  difficulty: AIDifficulty;
  onChangeDifficulty: (diff: AIDifficulty) => void;
  aiSpeed: AISpeed;
  onChangeAiSpeed: (speed: AISpeed) => void;
  isManualMode?: boolean;
  onToggleManualMode?: () => void;
  config: GameConfig;
  onUpdateConfig: (newConfig: GameConfig) => void;
  onApplyPreset: (presetId: string) => void;
  gameMode: GameMode;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  soundEnabled,
  onToggleSound,
  difficulty,
  onChangeDifficulty,
  aiSpeed,
  onChangeAiSpeed,
  isManualMode = false,
  onToggleManualMode,
  config,
  onUpdateConfig,
  onApplyPreset,
  gameMode,
}) => {
  const [activeTab, setActiveTab] = useState<'rules' | 'gameplay'>('rules');
  const [isCustomExpanded, setIsCustomExpanded] = useState<boolean>(
    config.presetId === 'custom'
  );

  if (!isOpen) return null;

  const currentPreset =
    RULE_PRESETS.find((p) => p.id === config.presetId) || null;

  const handleSelectPreset = (presetId: string) => {
    if (presetId === 'custom') {
      setIsCustomExpanded(true);
      onUpdateConfig({
        ...config,
        presetId: 'custom',
      });
    } else {
      setIsCustomExpanded(false);
      onApplyPreset(presetId);
    }
  };

  const handleCustomTweak = (partial: Partial<GameConfig>) => {
    onUpdateConfig({
      ...config,
      ...partial,
      presetId: 'custom',
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="w-full max-w-lg bg-[#271b16] border border-[#443027] rounded-3xl shadow-2xl overflow-hidden flex flex-col my-auto max-h-[92vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#31221b] border-b border-[#443027] flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#ffad47]">
            <Sliders className="w-5 h-5" />
            <h2 className="font-display font-bold text-lg text-[#fff8f3]">
              Definições & Regras do Jogo
            </h2>
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

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 p-1.5 bg-[#201512] border-b border-[#3b2720]">
          <button
            type="button"
            onClick={() => setActiveTab('rules')}
            className={`py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'rules'
                ? 'bg-[#8a3319] text-[#fff8f3] shadow-md'
                : 'text-[#a8928c] hover:text-[#fff8f3]'
            }`}
          >
            <Grid className="w-4 h-4 text-[#ffad47]" />
            <span>Conjunto de Regras</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('gameplay')}
            className={`py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'gameplay'
                ? 'bg-[#8a3319] text-[#fff8f3] shadow-md'
                : 'text-[#a8928c] hover:text-[#fff8f3]'
            }`}
          >
            <Zap className="w-4 h-4 text-[#ffad47]" />
            <span>IA & Preferências</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="p-4 sm:p-5 flex-1 overflow-y-auto space-y-4">
          {activeTab === 'rules' && (
            <div className="space-y-4">
              {/* Presets List */}
              <div className="space-y-2">
                <span className="text-xs uppercase font-bold tracking-wider text-[#d8c2bb] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#ffad47]" />
                  Variantes e Conjuntos Pré-definidos
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {RULE_PRESETS.map((preset) => {
                    const isSelected = config.presetId === preset.id;

                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => handleSelectPreset(preset.id)}
                        className={`text-left p-3 rounded-2xl border transition-all flex flex-col justify-between gap-1.5 ${
                          isSelected
                            ? 'bg-[#3b231b] border-[#ffad47] shadow-md text-[#fff8f3]'
                            : 'bg-[#211612] border-[#3d2a23] text-[#d8c2bb] hover:bg-[#2b1c17]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-display font-bold text-xs sm:text-sm text-[#fff8f3]">
                            {preset.shortName}
                          </span>
                          {preset.badge && (
                            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#885200] text-[#ffddbb]">
                              {preset.badge}
                            </span>
                          )}
                        </div>

                        <p className="text-[11px] text-[#c4aca4] leading-relaxed line-clamp-2">
                          {preset.description}
                        </p>

                        <div className="text-[10px] text-[#ffad47] font-semibold flex items-center gap-1 pt-1 border-t border-[#443027]/50">
                          {isSelected && <Check className="w-3 h-3 text-[#ffad47]" />}
                          <span>
                            {preset.config.rows}×{preset.config.columns} cavas ·{' '}
                            {preset.config.initialSeedsPerPit} sementes
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Custom Rule Toggle & Configurator */}
              <div className="p-3.5 bg-[#211612] rounded-2xl border border-[#3b2720] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-[#ffad47]" />
                    <span className="font-bold text-xs sm:text-sm text-[#fff8f3]">
                      Personalização Avançada
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsCustomExpanded((prev) => !prev)}
                    className="text-xs text-[#ffad47] hover:underline font-semibold"
                  >
                    {isCustomExpanded ? 'Ocultar' : 'Ajustar Detalhes'}
                  </button>
                </div>

                {isCustomExpanded && (
                  <div className="pt-2 border-t border-[#3a2720] space-y-3">
                    {/* Columns Selector */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs text-[#d8c2bb]">
                        <span>Número de Colunas:</span>
                        <strong className="text-[#ffad47]">{config.columns} colunas ({config.rows * config.columns} cavas)</strong>
                      </div>
                      <div className="grid grid-cols-4 gap-1.5">
                        {[6, 8, 10, 12].map((cols) => (
                          <button
                            key={cols}
                            type="button"
                            onClick={() => handleCustomTweak({ columns: cols })}
                            className={`py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                              config.columns === cols
                                ? 'bg-[#8a3319] border-[#ffb5a0] text-white'
                                : 'bg-[#2a1c17] border-[#443027] text-[#a8928c]'
                            }`}
                          >
                            {cols} cols
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Initial Seeds per Pit */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs text-[#d8c2bb]">
                        <span>Sementes Iniciais por Cava:</span>
                        <strong className="text-[#ffad47]">{config.initialSeedsPerPit} tinsongo</strong>
                      </div>
                      <div className="grid grid-cols-3 gap-1.5">
                        {[1, 2, 3].map((seeds) => (
                          <button
                            key={seeds}
                            type="button"
                            onClick={() => handleCustomTweak({ initialSeedsPerPit: seeds })}
                            className={`py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                              config.initialSeedsPerPit === seeds
                                ? 'bg-[#8a3319] border-[#ffb5a0] text-white'
                                : 'bg-[#2a1c17] border-[#443027] text-[#a8928c]'
                            }`}
                          >
                            {seeds} {seeds === 1 ? 'semente' : 'sementes'}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Multiple Sowing Toggle */}
                    <div className="flex items-center justify-between p-2.5 bg-[#2a1c17] rounded-xl border border-[#443027]">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-[#fff8f3]">
                          Semeadura Múltipla (Relançamento)
                        </span>
                        <span className="text-[10px] text-[#a8928c]">
                          Recolhe e continua se a última semente cair em cava ocupada
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          handleCustomTweak({ multipleSowing: !config.multipleSowing })
                        }
                        className={`w-12 h-6 rounded-full p-0.5 transition-colors relative ${
                          config.multipleSowing ? 'bg-[#8a3319]' : 'bg-[#3d2a23]'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
                            config.multipleSowing ? 'translate-x-6' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>

                    {/* Double Capture Toggle */}
                    <div className="flex items-center justify-between p-2.5 bg-[#2a1c17] rounded-xl border border-[#443027]">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-[#fff8f3]">
                          Captura Dupla (Interior + Exterior)
                        </span>
                        <span className="text-[10px] text-[#a8928c]">
                          Colhe a fileira interior e a exterior rival simultaneamente
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          handleCustomTweak({ doubleCapture: !config.doubleCapture })
                        }
                        className={`w-12 h-6 rounded-full p-0.5 transition-colors relative ${
                          config.doubleCapture ? 'bg-[#8a3319]' : 'bg-[#3d2a23]'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
                            config.doubleCapture ? 'translate-x-6' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'gameplay' && (
            <div className="space-y-4">
              {/* Distribuição Manual (Semeadura por Toque) */}
              <div className="p-3.5 bg-[#211612] rounded-2xl border border-[#3b2720] space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[#ffad47]">
                    <Hand className="w-4 h-4" />
                    <span className="font-bold text-xs sm:text-sm text-[#fff8f3]">
                      Distribuição Manual
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={onToggleManualMode}
                    aria-label="Ativar distribuição manual"
                    className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                      isManualMode ? 'bg-[#ffad47]' : 'bg-[#3b2720]'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-zinc-950 shadow-md transform transition-transform ${
                        isManualMode ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
                <p className="text-xs text-[#a8928c]">
                  Quando ativo, as sementes da cava colhida ficam na sua mão e você toca manualmente na próxima cava válida do circuito para depositar 1 semente de cada vez. A próxima cava é destacada a verde; tocar noutra cava exibe um aviso suave de jogada inválida.
                </p>
                {isManualMode && (
                  <div className="text-[11px] bg-[#143322] border border-emerald-500/30 text-emerald-300 p-2 rounded-xl flex items-center gap-1.5 font-medium">
                    <span>✨ Distribuição manual ativa: Deposite as sementes toque a toque!</span>
                  </div>
                )}
              </div>

              {/* AI Response Speed Setting (Fast vs Normal) */}
              <div className="p-3.5 bg-[#211612] rounded-2xl border border-[#3b2720] space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[#ffad47]">
                    <Zap className="w-4 h-4" />
                    <span className="font-bold text-xs sm:text-sm text-[#fff8f3]">
                      Velocidade de Resposta da IA / Robô
                    </span>
                  </div>
                  <span className="text-[10px] bg-[#885200] text-[#ffddbb] font-bold px-2 py-0.5 rounded-full">
                    Resposta Rápida
                  </span>
                </div>
                <p className="text-xs text-[#a8928c]">
                  Controle a agilidade do robô para jogadas dinâmicas ou ritmo contemplativo tradicional.
                </p>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => onChangeAiSpeed('fast')}
                    className={`p-2.5 rounded-xl text-xs font-semibold flex flex-col items-center gap-1 border transition-all ${
                      aiSpeed === 'fast'
                        ? 'bg-[#8a3319] border-[#ffb5a0] text-white shadow-md'
                        : 'bg-[#2a1c17] border-[#443027] text-[#a8928c] hover:text-[#fff8f3]'
                    }`}
                  >
                    <span className="flex items-center gap-1 font-bold">
                      <Zap className="w-3.5 h-3.5 text-[#ffad47]" /> Rápida (~120ms)
                    </span>
                    <span className="text-[10px] text-[#ffddbb]/80 font-normal">
                      Instantânea & Sem Demora
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onChangeAiSpeed('normal')}
                    className={`p-2.5 rounded-xl text-xs font-semibold flex flex-col items-center gap-1 border transition-all ${
                      aiSpeed === 'normal'
                        ? 'bg-[#8a3319] border-[#ffb5a0] text-white shadow-md'
                        : 'bg-[#2a1c17] border-[#443027] text-[#a8928c] hover:text-[#fff8f3]'
                    }`}
                  >
                    <span className="font-bold">Normal (~750ms)</span>
                    <span className="text-[10px] text-[#ffddbb]/80 font-normal">
                      Pausa Reflexiva
                    </span>
                  </button>
                </div>
              </div>

              {/* AI Difficulty Setting */}
              {gameMode === 'ai' && (
                <div className="p-3.5 bg-[#211612] rounded-2xl border border-[#3b2720] space-y-2">
                  <div className="flex items-center gap-2 text-[#ffad47]">
                    <Cpu className="w-4 h-4" />
                    <span className="font-bold text-xs sm:text-sm text-[#fff8f3]">
                      Nível Estratégico do Mestre Nyami
                    </span>
                  </div>
                  <span className="text-xs text-[#a8928c]">
                    Grau de profundidade e antecipação nos lances
                  </span>

                  <div className="grid grid-cols-3 gap-2 pt-1">
                    {(['easy', 'medium', 'hard'] as AIDifficulty[]).map((level) => {
                      const isSelected = difficulty === level;
                      const label =
                        level === 'easy'
                          ? 'Fácil'
                          : level === 'medium'
                          ? 'Médio'
                          : 'Difícil';

                      return (
                        <button
                          key={level}
                          type="button"
                          onClick={() => onChangeDifficulty(level)}
                          className={`py-2 px-1 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 border transition-all ${
                            isSelected
                              ? 'bg-[#8a3319] border-[#ffb5a0] text-white shadow-md'
                              : 'bg-[#2a1c17] border-[#443027] text-[#a8928c] hover:text-[#fff8f3]'
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5" />}
                          <span>{label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Sound Setting */}
              <div className="flex items-center justify-between p-3.5 bg-[#211612] rounded-2xl border border-[#3b2720]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#34231c] flex items-center justify-center text-[#ffad47]">
                    {soundEnabled ? (
                      <Volume2 className="w-5 h-5" />
                    ) : (
                      <VolumeX className="w-5 h-5" />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-xs sm:text-sm text-[#fff8f3]">
                      Efeitos Sonoros
                    </span>
                    <span className="text-xs text-[#a8928c]">
                      Marimba, sementes e campainhas de vitória
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onToggleSound}
                  className={`w-14 h-8 rounded-full p-1 transition-colors relative ${
                    soundEnabled ? 'bg-[#8a3319]' : 'bg-[#3d2a23]'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full bg-white shadow-md transition-transform ${
                      soundEnabled ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#31221b] border-t border-[#443027] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-6 h-11 rounded-xl bg-[#8a3319] hover:bg-[#a33d1f] active:scale-95 text-[#fff8f3] font-bold text-sm shadow-md transition-all flex items-center justify-center"
          >
            Aplicar & Continuar
          </button>
        </div>
      </div>
    </div>
  );
};
