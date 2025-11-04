import React, { useMemo, useState } from 'react';
import HeroSection from './components/HeroSection.jsx';
import UploadPanel from './components/UploadPanel.jsx';
import StatsGrid from './components/StatsGrid.jsx';
import TrendsChart from './components/TrendsChart.jsx';

function normalizePlays(raw) {
  if (!Array.isArray(raw)) return [];
  return raw.map((it) => {
    const playedAt = it.played_at || it.endTime || it.ts || it.time || it.playedAt;
    const ms =
      typeof it.msPlayed === 'number'
        ? it.msPlayed
        : typeof it.ms === 'number'
        ? it.ms
        : typeof it.duration_ms === 'number'
        ? it.duration_ms
        : 0;
    const artist = it.artistName || it.artist || it.ar || it.artist_name || (it.track && it.track.artist) || 'Unknown';
    const track = it.trackName || it.track || it.song || it.title || 'Unknown';
    const genre = it.genre || it.primary_genre || 'Unknown';
    return { playedAt: new Date(playedAt), ms, artist, track, genre };
  }).filter((r) => r.playedAt instanceof Date && !isNaN(r.playedAt));
}

function summarize(plays) {
  const totalPlays = plays.length;
  const minutesListened = plays.reduce((acc, p) => acc + p.ms / 60000, 0);
  const uniqueArtists = new Set(plays.map((p) => p.artist)).size;

  // group by date
  const dayKey = (d) => d.toISOString().slice(0, 10);
  const byDay = plays.reduce((acc, p) => {
    const k = dayKey(p.playedAt);
    acc[k] = (acc[k] || 0) + p.ms / 60000;
    return acc;
  }, {});
  const days = Object.keys(byDay).sort();
  const avgDailyMinutes = days.length ? days.reduce((a, d) => a + byDay[d], 0) / days.length : 0;

  // series for chart: use last 30 days
  const lastNDays = 30;
  const now = new Date();
  const series = Array.from({ length: lastNDays }, (_, i) => {
    const d = new Date(now);
    d.setDate(now.getDate() - (lastNDays - 1 - i));
    const k = dayKey(d);
    return { x: d.getTime(), y: Math.round((byDay[k] || 0) * 1) };
  });

  return { totalPlays, minutesListened, uniqueArtists, avgDailyMinutes, series };
}

export default function App() {
  const [rawData, setRawData] = useState([]);

  const plays = useMemo(() => normalizePlays(rawData), [rawData]);
  const summary = useMemo(() => summarize(plays), [plays]);

  const onData = (items) => setRawData(items || []);

  const onConnect = () => {
    alert('This is a demo UI. For privacy, we use local JSON upload rather than live auth.');
  };

  return (
    <div className="min-h-screen w-full bg-[#0a0a0f] bg-[radial-gradient(60%_60%_at_50%_0%,#1b1440_0%,rgba(10,10,15,0)_60%)] text-white">
      <div className="mx-auto max-w-7xl space-y-8 px-4 py-6 sm:py-8 md:space-y-10 md:py-12">
        <HeroSection onConnect={onConnect} />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="md:col-span-2 space-y-4">
            <UploadPanel onData={onData} />
            <StatsGrid summary={summary} />
            <TrendsChart title="Daily listening minutes" series={summary.series} />
          </div>
          <aside className="space-y-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h3 className="text-base font-semibold">How to get your data</h3>
              <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-white/70">
                <li>Export a JSON listening history from Spotify or Last.fm</li>
                <li>Click "Choose JSON file" and select your export</li>
                <li>Explore stats and trends in this dashboard</li>
              </ol>
            </div>

            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-violet-600/30 to-fuchsia-500/20 p-5">
              <h3 className="text-base font-semibold">Purple, modern Spotify vibe</h3>
              <p className="mt-1 text-sm text-white/70">
                A sleek, futuristic look inspired by Spotify — with a bold purple glow and interactive 3D hero.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
