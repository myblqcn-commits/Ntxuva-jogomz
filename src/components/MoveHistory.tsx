import React from 'react';
import { MoveHistoryEntry } from '../game/types';
import { History, Swords, RefreshCw } from 'lucide-react';

interface MoveHistoryProps {
  history: MoveHistoryEntry[];
  currentTurnCount: number;
}

export const MoveHistory: React.FC<MoveHistoryProps> = ({
  history,
  currentTurnCount,
}) => {
  return (
    <div className="w-full bg-[#271b16] rounded-xl p-3 sm:p-4 border border-[#3d2a23] shadow-sm flex flex-col gap-2">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase font-bold tracking-wider text-[#d8c2bb] flex items-center gap-1.5">
          <History className="w-3.5 h-3.5 text-[#ffad47]" />
          Histórico da Partida
        </span>
        <span className="text-xs text-[#a8928c] font-medium">
          Jogada #{currentTurnCount}
        </span>
      </div>

      {/* History List */}
      <div className="flex flex-col gap-1.5 max-h-32 sm:max-h-36 overflow-y-auto pr-1">
        {history.length === 0 ? (
          <div className="bg-[#201512] p-2.5 rounded-lg text-xs text-[#a8928c] flex items-center gap-2 border border-[#36241e]">
            <span className="w-2 h-2 rounded-full bg-[#ffad47]" />
            <span>A partida iniciou. Cada cava possui 2 sementes. Boa sorte!</span>
          </div>
        ) : (
          history.map((entry) => {
            const isP1 = entry.player === 'player1';
            const playerName = isP1 ? 'Jogador 1' : 'Jogador 2';

            return (
              <div
                key={entry.id}
                className={`p-2 rounded-lg text-xs flex items-center justify-between gap-2 border transition-colors ${
                  entry.captured > 0
                    ? 'bg-[#3b1c18] border-[#6b251a] text-[#fff8f3]'
                    : 'bg-[#211713] border-[#362520] text-[#d8c2bb]'
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className={`w-2 h-2 rounded-full shrink-0 ${
                      isP1 ? 'bg-[#ffad47]' : 'bg-[#89726c]'
                    }`}
                  />
                  <div className="flex flex-col min-w-0">
                    <span className="font-semibold text-[11px] sm:text-xs truncate">
                      {playerName} · Cava #{entry.startPitId} ({entry.startRow},{' '}
                      {entry.startCol + 1})
                    </span>
                    <span className="text-[10px] text-[#a8928c] truncate">
                      {entry.seedsDistributed} sementes distribuídas · {entry.laps}{' '}
                      {entry.laps === 1 ? 'volta' : 'voltas'}
                    </span>
                  </div>
                </div>

                {/* Right Badge */}
                {entry.captured > 0 ? (
                  <span className="shrink-0 flex items-center gap-1 bg-[#ba1a1a] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                    <Swords className="w-3 h-3" />
                    +{entry.captured}
                  </span>
                ) : (
                  <span className="shrink-0 flex items-center gap-1 text-[#89726c] text-[10px]">
                    <RefreshCw className="w-2.5 h-2.5" />
                    Semeadura
                  </span>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
