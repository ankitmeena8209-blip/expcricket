import React from "react";
import { BowlerMatchup } from "@/types/player";

interface BowlerMatchupTableProps {
  matchups: BowlerMatchup[];
}

export default function BowlerMatchupTable({ matchups }: BowlerMatchupTableProps) {
  return (
    <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/30">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-mono-data font-bold text-on-surface uppercase tracking-wider flex items-center gap-1.5">
          <span className="material-symbols-outlined text-primary text-base">sports_cricket</span>
          BOWLER MATCHUP TELEMETRY
        </h3>
        <span className="text-[10px] font-mono-data text-outline">CAREER HEAD-TO-HEAD</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-mono-data">
          <thead>
            <tr className="border-b border-outline-variant/30 text-outline uppercase text-[10px]">
              <th className="pb-2 font-semibold">Bowler</th>
              <th className="pb-2 font-semibold">Type</th>
              <th className="pb-2 font-semibold text-right">Runs</th>
              <th className="pb-2 font-semibold text-right">Balls</th>
              <th className="pb-2 font-semibold text-right">Outs</th>
              <th className="pb-2 font-semibold text-right">SR</th>
              <th className="pb-2 font-semibold text-right">Dot %</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/15 text-on-surface">
            {matchups.map((m, idx) => (
              <tr key={idx} className="hover:bg-surface-container-high/40 transition-colors">
                <td className="py-2.5 font-bold text-on-surface">{m.bowlerName}</td>
                <td className="py-2.5 text-on-surface-variant text-[11px]">{m.bowlerType}</td>
                <td className="py-2.5 text-right font-bold text-primary">{m.runsScored}</td>
                <td className="py-2.5 text-right text-outline">{m.ballsFaced}</td>
                <td className="py-2.5 text-right text-error font-semibold">{m.dismissals}</td>
                <td className="py-2.5 text-right font-bold text-on-surface">{m.strikeRate}</td>
                <td className="py-2.5 text-right text-tertiary">{m.dotBallPercentage}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
