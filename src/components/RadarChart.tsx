import React from 'react';
import { motion } from 'motion/react';
import { DimensionScores, DIMENSIONS } from '../data/testData';

interface RadarChartProps {
  scores: DimensionScores;
}

export const RadarChart: React.FC<RadarChartProps> = ({ scores }) => {
  // Center of 280x280 SVG
  const size = 280;
  const center = size / 2;
  const radius = 95;

  // 4 axes: Top, Right, Bottom, Left
  // 0: Prompting (Top: -90 deg)
  // 1: Productivity (Right: 0 deg)
  // 2: Critical (Bottom: 90 deg)
  // 3: ToolStack (Left: 180 deg)
  const angles = [-Math.PI / 2, 0, Math.PI / 2, Math.PI];

  const getCoordinates = (value: number, angleIndex: number) => {
    const r = (Math.max(10, Math.min(100, value)) / 100) * radius;
    const angle = angles[angleIndex];
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y };
  };

  const scoreValues = [
    scores.prompting,
    scores.productivity,
    scores.critical,
    scores.toolStack,
  ];

  // Radar polygon points
  const points = scoreValues.map((val, idx) => getCoordinates(val, idx));
  const polygonPointsStr = points.map((p) => `${p.x},${p.y}`).join(' ');

  // Grid concentric rings at 25%, 50%, 75%, 100%
  const gridLevels = [0.25, 0.5, 0.75, 1.0];

  return (
    <div className="w-full flex flex-col items-center">
      {/* SVG Radar Chart */}
      <div className="relative w-full max-w-[320px] aspect-square flex items-center justify-center">
        <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full overflow-visible">
          <defs>
            <linearGradient id="radarFillGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.55" />
              <stop offset="50%" stopColor="#ec4899" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.5" />
            </linearGradient>
            <filter id="radarGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#6366f1" floodOpacity="0.4" />
            </filter>
          </defs>

          {/* Background Concentric Grid Diamonds */}
          {gridLevels.map((lvl, index) => {
            const gridPts = angles.map((angle) => {
              const r = lvl * radius;
              return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
            }).join(' ');

            return (
              <polygon
                key={index}
                points={gridPts}
                fill={index === 3 ? '#f8fafc' : 'none'}
                stroke="#e2e8f0"
                strokeWidth={index === 3 ? 1.5 : 1}
                strokeDasharray={index < 3 ? '3 3' : undefined}
              />
            );
          })}

          {/* Axis Spoke Lines */}
          {angles.map((angle, idx) => {
            const x2 = center + radius * Math.cos(angle);
            const y2 = center + radius * Math.sin(angle);
            return (
              <line
                key={idx}
                x1={center}
                y1={center}
                x2={x2}
                y2={y2}
                stroke="#cbd5e1"
                strokeWidth="1.5"
              />
            );
          })}

          {/* Animated Area Polygon */}
          <motion.polygon
            initial={{ opacity: 0, scale: 0.2 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: 'spring', bounce: 0.3 }}
            style={{ originX: `${center}px`, originY: `${center}px` }}
            points={polygonPointsStr}
            fill="url(#radarFillGrad)"
            stroke="#6366f1"
            strokeWidth="3"
            filter="url(#radarGlow)"
          />

          {/* Data Points on vertices */}
          {points.map((pt, idx) => (
            <motion.circle
              key={idx}
              cx={pt.x}
              cy={pt.y}
              r={5}
              fill="#ffffff"
              stroke="#6366f1"
              strokeWidth="2.5"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 + idx * 0.1, type: 'spring' }}
            />
          ))}

          {/* Label Badges positioned outside */}
          {/* Top: Prompting */}
          <foreignObject x={center - 70} y={center - radius - 44} width="140" height="38">
            <div className="flex flex-col items-center justify-center">
              <span className="text-xs font-bold text-slate-700 bg-white/90 backdrop-blur px-2 py-0.5 rounded-full shadow-xs border border-slate-200">
                🎯 {DIMENSIONS[0].shortName} <strong className="text-indigo-600 font-extrabold">{scores.prompting}점</strong>
              </span>
            </div>
          </foreignObject>

          {/* Right: Productivity */}
          <foreignObject x={center + radius + 8} y={center - 18} width="115" height="38">
            <div className="flex flex-col items-start justify-center">
              <span className="text-xs font-bold text-slate-700 bg-white/90 backdrop-blur px-2 py-0.5 rounded-full shadow-xs border border-slate-200 whitespace-nowrap">
                ⚡ {DIMENSIONS[1].shortName} <strong className="text-pink-600 font-extrabold">{scores.productivity}점</strong>
              </span>
            </div>
          </foreignObject>

          {/* Bottom: Critical */}
          <foreignObject x={center - 70} y={center + radius + 10} width="140" height="38">
            <div className="flex flex-col items-center justify-center">
              <span className="text-xs font-bold text-slate-700 bg-white/90 backdrop-blur px-2 py-0.5 rounded-full shadow-xs border border-slate-200">
                🛡️ {DIMENSIONS[2].shortName} <strong className="text-sky-600 font-extrabold">{scores.critical}점</strong>
              </span>
            </div>
          </foreignObject>

          {/* Left: ToolStack */}
          <foreignObject x={center - radius - 120} y={center - 18} width="115" height="38">
            <div className="flex flex-col items-end justify-center">
              <span className="text-xs font-bold text-slate-700 bg-white/90 backdrop-blur px-2 py-0.5 rounded-full shadow-xs border border-slate-200 whitespace-nowrap">
                🚀 {DIMENSIONS[3].shortName} <strong className="text-emerald-600 font-extrabold">{scores.toolStack}점</strong>
              </span>
            </div>
          </foreignObject>
        </svg>
      </div>

      {/* Accompanying 4 Progress Bars for Detailed Clarity */}
      <div className="w-full mt-6 space-y-3.5 bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200/80">
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
          4대 세부 역량 점수표 (0~100점)
        </div>
        {DIMENSIONS.map((dim) => {
          const val = scores[dim.key];
          return (
            <div key={dim.key} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                  <span>{dim.icon}</span>
                  <span>{dim.name}</span>
                </span>
                <span className="font-bold text-slate-900 tabular-nums">{val}점</span>
              </div>
              <div className="w-full bg-slate-200/90 h-2.5 rounded-full overflow-hidden p-0.5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(100, Math.max(8, val))}%` }}
                  transition={{ duration: 0.9, ease: 'easeOut' }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: dim.color }}
                />
              </div>
              <p className="text-[11px] text-slate-500 line-clamp-1">{dim.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
