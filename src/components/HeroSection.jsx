import React from 'react';
import Spline from '@splinetool/react-spline';
import { Sparkles, Link } from 'lucide-react';

export default function HeroSection({ onConnect }) {
  return (
    <section className="relative h-[60vh] w-full overflow-hidden rounded-2xl bg-[#0b0b12]">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/wwTRdG1D9CkNs368/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Subtle gradients and grain overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(155,135,245,0.35),rgba(28,20,53,0)_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(40%_50%_at_60%_100%,rgba(91,233,255,0.18),transparent)]" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs text-white/70 ring-1 ring-white/10 backdrop-blur">
          <Sparkles className="h-3.5 w-3.5 text-violet-300" />
          Interactive 3D • Futuristic • Purple Blue Vibes
        </div>
        <h1 className="text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-5xl">
          Your Spotify, Reimagined
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-white/70 sm:text-base">
          Upload your Spotify listening history and explore an interactive dashboard with modern, Spotify-inspired visuals in a purple tone.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onConnect}
            className="inline-flex items-center gap-2 rounded-full bg-violet-500 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-violet-500/30 transition hover:bg-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-300"
          >
            <Link className="h-4 w-4" />
            Connect Spotify (demo)
          </button>
          <a
            href="#upload"
            className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2.5 text-sm font-medium text-white ring-1 ring-white/15 backdrop-blur transition hover:bg-white/20"
          >
            Or upload JSON
          </a>
        </div>
      </div>
    </section>
  );
}
