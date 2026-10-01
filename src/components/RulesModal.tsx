import React, { useState } from 'react';
import { RULES_STEPS } from '../data/rulesContent';
import {
  X,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Trophy,
  Swords,
  RefreshCw,
  Grid,
  Shield,
  Lightbulb,
} from 'lucide-react';

interface RulesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPlayNow?: () => void;
}

export const RulesModal: React.FC<RulesModalProps> = ({
  isOpen,
  onClose,
  onPlayNow,
}) => {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const totalSteps = RULES_STEPS.length;
  const step = RULES_STEPS[currentStep];

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
    } else if (onPlayNow) {
      onClose();
      onPlayNow();
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="w-full max-w-lg bg-[#271b16] border border-[#443027] rounded-2xl shadow-2xl overflow-hidden flex flex-col my-auto max-h-[92vh]">
        {/* Header with Step Tracker */}
        <div className="p-4 bg-[#31221b] border-b border-[#443027] flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#ffad47]">
            <BookOpen className="w-5 h-5" />
            <span className="font-display font-bold text-base text-[#fff8f3]">
              Regras do Ntxuva
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-[#a8928c] font-medium">
              Passo <strong className="text-[#ffad47]">{currentStep + 1}</strong> de {totalSteps}
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar"
              className="w-8 h-8 rounded-full bg-[#3d2a23] hover:bg-[#4d352c] text-[#d8c2bb] flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Progress Bar & Interactive Step Pills */}
        <div className="px-4 pt-3 pb-1 flex flex-col gap-2 bg-[#2a1c17]">
          <div className="w-full bg-[#3d2a23] h-1.5 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#ffad47] transition-all duration-300 rounded-full"
              style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
            />
          </div>

          <div className="grid grid-cols-6 gap-1.5 pt-1">
            {RULES_STEPS.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentStep(idx)}
                aria-label={`Ir para passo ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  idx <= currentStep ? 'bg-[#ffad47]' : 'bg-[#3d2a23]'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Body Content */}
        <div className="p-4 sm:p-5 flex-1 overflow-y-auto space-y-4 text-[#fff8f3]">
          {/* Badge & Title */}
          <div className="space-y-1">
            <span className="px-2.5 py-0.5 rounded-full bg-[#885200] text-[#ffddbb] text-[11px] font-bold uppercase tracking-wider">
              {step.badge}
            </span>
            <h3 className="font-display text-lg sm:text-xl font-bold text-[#ffcf99]">
              {step.title}
            </h3>
            <p className="text-sm text-[#d8c2bb] leading-relaxed font-medium">
              {step.summary}
            </p>
          </div>

          {/* Interactive Step Illustration Box */}
          <div className="bg-[#1e1411] border border-[#3b2720] rounded-xl p-3 sm:p-4 shadow-inner space-y-3">
            {step.illustrationType === 'intro' && (
              <div className="grid grid-cols-2 gap-2 text-center text-xs">
                <div className="p-3 bg-[#2a1c17] rounded-lg border border-[#443027]">
                  <span className="text-[10px] text-[#ffb867] uppercase font-bold tracking-wider">
                    Origem
                  </span>
                  <p className="font-display font-bold text-sm text-[#fff8f3] mt-1">
                    Moçambique
                  </p>
                </div>
                <div className="p-3 bg-[#2a1c17] rounded-lg border border-[#443027]">
                  <span className="text-[10px] text-[#ffb867] uppercase font-bold tracking-wider">
                    Sementes Inicial
                  </span>
                  <p className="font-display font-bold text-sm text-[#ffad47] mt-1">
                    64 Tinsongo
                  </p>
                </div>
              </div>
            )}

            {step.illustrationType === 'board' && (
              <div className="space-y-2 text-center text-xs">
                <div className="flex items-center justify-between text-[11px] text-[#a8928c] px-1">
                  <span>Campo do Adversário (16 cavas)</span>
                  <span className="text-[#89726c]">Fileira Exterior + Interior</span>
                </div>
                {/* Visual miniature board */}
                <div className="grid grid-cols-8 gap-1 p-2 bg-[#2a1c17] rounded-lg border border-[#443027]">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-6 rounded bg-[#3d2a23] flex items-center justify-center text-[10px] font-bold text-[#d8c2bb] shadow-inner"
                    >
                      2
                    </div>
                  ))}
                  <div className="col-span-8 h-1 bg-[#1e1411] rounded my-0.5" />
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div
                      key={i + 16}
                      className="h-6 rounded bg-[#8a3319]/40 border border-[#ffad47]/30 flex items-center justify-center text-[10px] font-bold text-[#ffcf99] shadow-inner"
                    >
                      2
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#ffad47] px-1 font-semibold">
                  <span>O Teu Campo (16 cavas)</span>
                  <span>Fileira Interior + Exterior</span>
                </div>
              </div>
            )}

            {step.illustrationType === 'sow' && (
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between text-[#ffb867] font-semibold">
                  <span>Sentido do Circuito Fechado</span>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                </div>
                <div className="p-3 bg-[#2a1c17] rounded-lg border border-[#443027] flex flex-col gap-2">
                  <div className="flex items-center justify-between text-[11px] text-[#c4aca4]">
                    <span>← Fileira Interior (Avança à esquerda)</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-[#ffad47]">
                    <span>Fileira Exterior (Regressa à direita) →</span>
                  </div>
                  <div className="mt-1 p-2 bg-[#33221b] rounded text-[11px] text-[#e6d8c6] border border-[#52392f]">
                    * Pegue todas as sementes de uma cava válida e solte 1 semente em cada cava subsequente.
                  </div>
                </div>
              </div>
            )}

            {step.illustrationType === 'resow' && (
              <div className="space-y-2 text-xs">
                <div className="p-3 bg-[#2a1c17] rounded-lg border border-[#443027] space-y-2">
                  <div className="flex items-center gap-2 text-[#ffad47] font-bold">
                    <RefreshCw className="w-4 h-4" />
                    <span>Relançamento Sequencial</span>
                  </div>
                  <p className="text-[11px] text-[#c4aca4]">
                    A última semente caiu numa cava que já tinha sementes? Recolha todas elas e continue a distribuir no mesmo sentido!
                  </p>
                  <div className="grid grid-cols-3 gap-1.5 text-center pt-1 text-[10px]">
                    <div className="p-1.5 bg-[#3a251e] rounded font-medium">1. Cai na cava</div>
                    <div className="p-1.5 bg-[#4a3026] rounded text-[#ffad47] font-bold">2. Recolhe tudo</div>
                    <div className="p-1.5 bg-[#3a251e] rounded font-medium">3. Continua o lance</div>
                  </div>
                </div>
              </div>
            )}

            {step.illustrationType === 'capture' && (
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between text-red-400 font-bold">
                  <span className="flex items-center gap-1">
                    <Swords className="w-4 h-4" />
                    Captura Dupla Frontal
                  </span>
                  <span className="text-[10px] bg-red-950/80 px-2 py-0.5 rounded border border-red-800">
                    Ataque!
                  </span>
                </div>
                <div className="p-2.5 bg-[#2a1c17] rounded-lg border border-red-900/40 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] text-[#a8928c]">
                    <span>Fila Exterior Rival:</span>
                    <span className="text-red-400 font-bold">+ Bónus capturado!</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-[#a8928c]">
                    <span>Fila Interior Rival:</span>
                    <span className="text-red-400 font-bold">Alvo principal capturado!</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-[#ffad47] font-bold border-t border-[#443027] pt-1">
                    <span>A tua cava interior:</span>
                    <span>Última semente caiu aqui</span>
                  </div>
                </div>
              </div>
            )}

            {step.illustrationType === 'win' && (
              <div className="space-y-2 text-xs">
                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-3 bg-[#2a1c17] rounded-lg border border-[#443027] space-y-1">
                    <Trophy className="w-5 h-5 text-[#ffad47] mx-auto" />
                    <span className="font-bold text-xs text-[#fff8f3]">Imobilização</span>
                    <p className="text-[10px] text-[#a8928c]">Rival fica apenas com cavas de 1 ou 0 sementes.</p>
                  </div>
                  <div className="p-3 bg-[#2a1c17] rounded-lg border border-[#443027] space-y-1">
                    <Shield className="w-5 h-5 text-[#ffb5a0] mx-auto" />
                    <span className="font-bold text-xs text-[#fff8f3]">Limpeza</span>
                    <p className="text-[10px] text-[#a8928c]">Todas as sementes do rival foram capturadas.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Step Details description */}
            <p className="text-xs sm:text-sm text-[#c4aca4] leading-relaxed">
              {step.details}
            </p>
          </div>

          {/* Master Tip Box */}
          {step.tips && (
            <div className="p-3 bg-[#33221b] border border-[#4d352c] rounded-xl flex items-start gap-2.5 text-xs text-[#ffcf99]">
              <Lightbulb className="w-4 h-4 text-[#ffad47] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#fff8f3]">Dica do Mestre:</strong> {step.tips}
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="p-4 bg-[#31221b] border-t border-[#443027] flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="h-10 sm:h-11 px-4 rounded-xl bg-[#3d2a23] hover:bg-[#4d352c] text-[#fff8f3] font-semibold text-xs sm:text-sm flex items-center gap-1.5 transition-all disabled:opacity-40 disabled:pointer-events-none active:scale-95"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Anterior</span>
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="flex-1 h-10 sm:h-11 rounded-xl bg-[#8a3319] hover:bg-[#a33d1f] text-[#fff8f3] font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-98"
          >
            <span>
              {currentStep === totalSteps - 1 ? 'Jogar Agora!' : 'Próximo Passo'}
            </span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
