import React, { useMemo } from 'react';

function generatePath(data, width, height, padding) {
  if (!data || data.length === 0) return '';
  const xs = data.map((d) => d.x);
  const ys = data.map((d) => d.y);
  const xMin = Math.min(...xs);
  const xMax = Math.max(...xs);
  const yMin = 0; // floor at zero for charts
  const yMax = Math.max(...ys) || 1;

  const scaleX = (x) => padding + ((x - xMin) / (xMax - xMin || 1)) * (width - padding * 2);
  const scaleY = (y) => height - padding - ((y - yMin) / (yMax - yMin || 1)) * (height - padding * 2);

  const d = data
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${scaleX(p.x)} ${scaleY(p.y)}`)
    .join(' ');
  return d;
}

export default function TrendsChart({ title = 'Listening trend', series = [] }) {
  const width = 920;
  const height = 260;
  const padding = 28;

  const path = useMemo(() => generatePath(series, width, height, padding), [series]);
  const maxY = series.length ? Math.max(...series.map((d) => d.y)) : 0;

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="mb-3 flex items-end justify-between">
        <div>
          <h3 className="text-base font-semibold text-white">{title}</h3>
          <p className="text-xs text-white/60">Last {series.length} days</p>
        </div>
        <div className="text-xs text-white/50">Peak: {maxY}</div>
      </div>

      <div className="relative">
        <svg viewBox={`0 0 ${width} ${height}`} className="h-64 w-full">
          <defs>
            <linearGradient id="grad" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.05" />
            </linearGradient>
          </defs>

          {/* grid */}
          {[...Array(4)].map((_, i) => (
            <line
              key={i}
              x1={padding}
              x2={width - padding}
              y1={((i + 1) / 5) * (height - padding) + padding / 2}
              y2={((i + 1) / 5) * (height - padding) + padding / 2}
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="1"
            />
          ))}

          {/* area fill */}
          {path && (
            <path
              d={`${path} L ${width - padding} ${height - padding} L ${padding} ${height - padding} Z`}
              fill="url(#grad)"
            />
          )}
          {/* line */}
          {path && <path d={path} fill="none" stroke="#c4b5fd" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />}
        </svg>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />
      </div>
    </div>
  );
}
