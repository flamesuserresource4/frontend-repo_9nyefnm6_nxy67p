import React from 'react';
import { Music, User, Clock, Play } from 'lucide-react';

function Stat({ icon: Icon, label, value, hint, accent = 'from-violet-500 to-fuchsia-500' }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 ring-1 ring-white/5">
      <div className={`pointer-events-none absolute -inset-1 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-br ${accent} blur-2xl`} />
      <div className="relative z-10 flex items-center gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-white">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm text-white/60">{label}</p>
          <p className="text-xl font-semibold text-white">{value}</p>
          {hint && <p className="text-xs text-white/50">{hint}</p>}
        </div>
      </div>
    </div>
  );
}

export default function StatsGrid({ summary }) {
  const { totalPlays = 0, uniqueArtists = 0, minutesListened = 0, avgDailyMinutes = 0 } = summary || {};
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Stat icon={Play} label="Total Plays" value={totalPlays.toLocaleString()} hint="Lifetime" />
      <Stat icon={User} label="Unique Artists" value={uniqueArtists.toLocaleString()} accent="from-blue-500 to-cyan-400" />
      <Stat icon={Clock} label="Minutes Listened" value={Math.round(minutesListened).toLocaleString()} accent="from-fuchsia-500 to-pink-500" />
      <Stat icon={Music} label="Avg Daily Minutes" value={Math.round(avgDailyMinutes).toLocaleString()} accent="from-emerald-500 to-lime-400" />
    </div>
  );
}
