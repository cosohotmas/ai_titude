import React from 'react';
import { motion } from 'motion/react';

export type AvatarMood =
  | 'welcome'
  | 'curious'
  | 'thinking'
  | 'surprised'
  | 'encouraging'
  | 'analyzing'
  | 'celebrating'
  | 'director'
  | 'speedMaster'
  | 'inspector'
  | 'toolNomad'
  | 'conversationalist'
  | 'minimalist';

interface CharacterAvatarProps {
  mood?: AvatarMood;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showSpeech?: string;
}

export const CharacterAvatar: React.FC<CharacterAvatarProps> = ({
  mood = 'welcome',
  size = 'md',
  className = '',
  showSpeech,
}) => {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
    xl: 'w-44 h-44',
  }[size];

  // Colors & accessories based on mood/persona
  const isPersona = ['director', 'speedMaster', 'inspector', 'toolNomad', 'conversationalist', 'minimalist'].includes(mood);

  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`}>
      {/* Optional Speech Bubble */}
      {showSpeech && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          className="relative mb-3 max-w-xs sm:max-w-md px-4 py-2.5 bg-white text-slate-800 rounded-2xl shadow-lg border border-slate-100 text-sm sm:text-base font-medium text-center z-10"
        >
          <span>{showSpeech}</span>
          {/* Bubble tail */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-r border-b border-slate-100" />
        </motion.div>
      )}

      {/* Main Character Body Container */}
      <motion.div
        animate={
          mood === 'celebrating'
            ? { y: [0, -10, 0, -8, 0], rotate: [0, -3, 3, -2, 0] }
            : mood === 'thinking'
            ? { y: [0, -4, 0], rotate: [-2, 2, -2] }
            : mood === 'analyzing'
            ? { scale: [1, 1.04, 1], filter: ['drop-shadow(0 0 10px #6366f1)', 'drop-shadow(0 0 20px #8b5cf6)', 'drop-shadow(0 0 10px #6366f1)'] }
            : { y: [0, -6, 0] }
        }
        transition={{
          duration: mood === 'analyzing' ? 1.2 : 2.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className={`relative ${sizeClasses} select-none`}
      >
        {/* Glow backdrop */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-500/20 via-purple-500/20 to-pink-500/20 blur-xl scale-125" />

        <svg viewBox="0 0 200 200" className="w-full h-full relative drop-shadow-md">
          <defs>
            <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#e0e7ff" />
            </linearGradient>
            <linearGradient id="faceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e1b4b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
            <linearGradient id="glowEar" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#818cf8" />
              <stop offset="100%" stopColor="#c084fc" />
            </linearGradient>
            <linearGradient id="blushGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#fda4af" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Ears / Headphone Accents */}
          <g>
            <rect x="24" y="80" width="16" height="40" rx="8" fill="url(#glowEar)" />
            <rect x="160" y="80" width="16" height="40" rx="8" fill="url(#glowEar)" />
            {/* Headband arch */}
            <path
              d="M 32 90 Q 100 20 168 90"
              stroke="#6366f1"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
            />
            {/* Top antenna */}
            <motion.line
              x1="100"
              y1="55"
              x2="100"
              y2="30"
              stroke="#818cf8"
              strokeWidth="4"
              strokeLinecap="round"
              animate={mood === 'thinking' ? { rotate: [-10, 10, -10] } : {}}
              style={{ originX: '100px', originY: '55px' }}
            />
            <motion.circle
              cx="100"
              cy="25"
              r="7"
              fill={mood === 'analyzing' ? '#ec4899' : '#38bdf8'}
              animate={{
                scale: [1, 1.3, 1],
                filter: ['drop-shadow(0 0 4px #38bdf8)', 'drop-shadow(0 0 10px #38bdf8)', 'drop-shadow(0 0 4px #38bdf8)'],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </g>

          {/* Main Head Base */}
          <rect
            x="36"
            y="55"
            width="128"
            height="105"
            rx="46"
            fill="url(#bodyGrad)"
            stroke="#cbd5e1"
            strokeWidth="3"
          />

          {/* Inner Visor / Face Screen */}
          <rect
            x="48"
            y="68"
            width="104"
            height="78"
            rx="32"
            fill="url(#faceGrad)"
          />

          {/* Face Screen Subtle Scanlines */}
          <rect
            x="50"
            y="70"
            width="100"
            height="74"
            rx="30"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="0.8"
            opacity="0.3"
          />

          {/* Eyes & Expressions */}
          {mood === 'welcome' && (
            <g>
              {/* Happy Arched Eyes */}
              <motion.path
                d="M 68 106 Q 78 92 88 106"
                stroke="#38bdf8"
                strokeWidth="5"
                strokeLinecap="round"
                fill="none"
              />
              <motion.path
                d="M 112 106 Q 122 92 132 106"
                stroke="#38bdf8"
                strokeWidth="5"
                strokeLinecap="round"
                fill="none"
              />
              {/* Blushes */}
              <circle cx="68" cy="116" r="8" fill="url(#blushGrad)" />
              <circle cx="132" cy="116" r="8" fill="url(#blushGrad)" />
              {/* Cute smile */}
              <path d="M 94 116 Q 100 123 106 116" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" fill="none" />
            </g>
          )}

          {mood === 'curious' && (
            <g>
              {/* One Big Eye, One Winking */}
              <circle cx="76" cy="102" r="9" fill="#38bdf8" />
              <circle cx="79" cy="99" r="3" fill="#ffffff" />
              <path d="M 114 102 Q 123 94 132 102" stroke="#38bdf8" strokeWidth="4.5" strokeLinecap="round" fill="none" />
              {/* Curious small open mouth */}
              <circle cx="100" cy="120" r="4" fill="#38bdf8" />
            </g>
          )}

          {mood === 'thinking' && (
            <g>
              {/* Eyes looking up */}
              <circle cx="76" cy="95" r="8" fill="#a78bfa" />
              <circle cx="78" cy="92" r="3" fill="#ffffff" />
              <circle cx="124" cy="95" r="8" fill="#a78bfa" />
              <circle cx="126" cy="92" r="3" fill="#ffffff" />
              {/* Pondering mouth */}
              <path d="M 94 120 Q 100 117 106 120" stroke="#a78bfa" strokeWidth="3" strokeLinecap="round" fill="none" />
            </g>
          )}

          {mood === 'surprised' && (
            <g>
              {/* Wide Glowing Eyes */}
              <circle cx="76" cy="100" r="11" fill="#f43f5e" />
              <circle cx="79" cy="97" r="4" fill="#ffffff" />
              <circle cx="124" cy="100" r="11" fill="#f43f5e" />
              <circle cx="127" cy="97" r="4" fill="#ffffff" />
              {/* O shaped mouth */}
              <ellipse cx="100" cy="122" rx="6" ry="8" fill="#f43f5e" />
            </g>
          )}

          {mood === 'encouraging' && (
            <g>
              {/* Star Eyes! */}
              <motion.path
                d="M 76 92 L 78 98 L 84 100 L 78 102 L 76 108 L 74 102 L 68 100 L 74 98 Z"
                fill="#fbbf24"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
              <motion.path
                d="M 124 92 L 126 98 L 132 100 L 126 102 L 124 108 L 122 102 L 116 100 L 122 98 Z"
                fill="#fbbf24"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }}
              />
              {/* Big happy open smile */}
              <path d="M 92 115 Q 100 128 108 115" stroke="#fbbf24" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            </g>
          )}

          {mood === 'analyzing' && (
            <g>
              {/* Digital HUD Eyes */}
              <motion.line
                x1="65"
                y1="102"
                x2="88"
                y2="102"
                stroke="#22d3ee"
                strokeWidth="4"
                strokeLinecap="round"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 0.6, repeat: Infinity }}
              />
              <motion.line
                x1="112"
                y1="102"
                x2="135"
                y2="102"
                stroke="#22d3ee"
                strokeWidth="4"
                strokeLinecap="round"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 0.6, repeat: Infinity }}
              />
              {/* Scanning light wave */}
              <motion.rect
                x="52"
                y="80"
                width="96"
                height="4"
                fill="#38bdf8"
                opacity="0.7"
                animate={{ y: [72, 130, 72] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
              />
            </g>
          )}

          {mood === 'celebrating' && (
            <g>
              {/* Party Hat */}
              <polygon points="100,10 75,55 125,55" fill="#f43f5e" />
              <polygon points="100,10 88,55 112,55" fill="#fbbf24" />
              <circle cx="100" cy="10" r="5" fill="#38bdf8" />
              {/* Happy Closed Winking Eyes */}
              <path d="M 66 104 Q 76 94 86 104" stroke="#fbbf24" strokeWidth="4.5" strokeLinecap="round" fill="none" />
              <path d="M 114 104 Q 124 94 134 104" stroke="#fbbf24" strokeWidth="4.5" strokeLinecap="round" fill="none" />
              <circle cx="68" cy="116" r="7" fill="url(#blushGrad)" />
              <circle cx="132" cy="116" r="7" fill="url(#blushGrad)" />
              <path d="M 90 115 Q 100 128 110 115 Z" fill="#f43f5e" stroke="#fbbf24" strokeWidth="2" />
            </g>
          )}

          {/* Persona Specific Custom Accessories */}
          {mood === 'director' && (
            <g>
              {/* Monocle & Director Bowtie */}
              <circle cx="76" cy="100" r="14" stroke="#eab308" strokeWidth="3" fill="none" />
              <line x1="88" y1="108" x2="98" y2="128" stroke="#eab308" strokeWidth="2" />
              <path d="M 114 102 Q 124 96 134 102" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" fill="none" />
              <polygon points="90,165 100,173 90,181" fill="#6366f1" />
              <polygon points="110,165 100,173 110,181" fill="#6366f1" />
              <circle cx="100" cy="173" r="4" fill="#fbbf24" />
              {/* Confident smirk */}
              <path d="M 94 116 Q 102 122 108 115" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" fill="none" />
            </g>
          )}

          {mood === 'speedMaster' && (
            <g>
              {/* Speed Visor / Lightning Shades */}
              <polygon points="56,92 144,92 136,112 64,112" fill="#f97316" opacity="0.9" />
              <motion.path
                d="M 96 82 L 92 98 L 100 98 L 94 116"
                stroke="#facc15"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              />
              <path d="M 92 120 Q 100 125 108 120" stroke="#facc15" strokeWidth="3" strokeLinecap="round" fill="none" />
            </g>
          )}

          {mood === 'inspector' && (
            <g>
              {/* Magnifying Glass */}
              <circle cx="68" cy="98" r="10" fill="#38bdf8" />
              <circle cx="124" cy="98" r="8" fill="#38bdf8" />
              {/* Big Magnifying Glass in front */}
              <circle cx="68" cy="98" r="18" stroke="#f59e0b" strokeWidth="4" fill="rgba(255,255,255,0.15)" />
              <line x1="55" y1="112" x2="38" y2="135" stroke="#b45309" strokeWidth="6" strokeLinecap="round" />
              <path d="M 94 122 Q 100 118 106 122" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" fill="none" />
            </g>
          )}

          {mood === 'toolNomad' && (
            <g>
              {/* Cyber Goggles + Tech Halo */}
              <rect x="58" y="92" width="34" height="20" rx="6" fill="#10b981" opacity="0.85" />
              <rect x="108" y="92" width="34" height="20" rx="6" fill="#10b981" opacity="0.85" />
              <line x1="92" y1="102" x2="108" y2="102" stroke="#059669" strokeWidth="3" />
              {/* Smile */}
              <path d="M 94 122 Q 100 128 106 122" stroke="#10b981" strokeWidth="3" strokeLinecap="round" fill="none" />
            </g>
          )}

          {mood === 'conversationalist' && (
            <g>
              {/* Heart Warming Blushes and Mug */}
              <circle cx="76" cy="102" r="8" fill="#f43f5e" />
              <circle cx="124" cy="102" r="8" fill="#f43f5e" />
              <circle cx="68" cy="116" r="9" fill="url(#blushGrad)" />
              <circle cx="132" cy="116" r="9" fill="url(#blushGrad)" />
              {/* Heart in face */}
              <path
                d="M 100 114 C 98 110, 94 110, 94 113 C 94 116, 100 120, 100 120 C 100 120, 106 116, 106 113 C 106 110, 102 110, 100 114 Z"
                fill="#fb7185"
              />
            </g>
          )}

          {mood === 'minimalist' && (
            <g>
              {/* Minimalist Slim Sunglasses */}
              <rect x="58" y="96" width="36" height="12" rx="3" fill="#64748b" />
              <rect x="106" y="96" width="36" height="12" rx="3" fill="#64748b" />
              <line x1="94" y1="102" x2="106" y2="102" stroke="#475569" strokeWidth="2" />
              {/* Straight cool mouth */}
              <line x1="92" y1="120" x2="108" y2="120" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
            </g>
          )}

          {/* Little Floating Hands */}
          <motion.circle
            cx="25"
            cy="130"
            r="10"
            fill="#ffffff"
            stroke="#cbd5e1"
            strokeWidth="2"
            animate={
              mood === 'welcome'
                ? { y: [0, -12, 0, -12, 0], x: [0, -4, 0] }
                : mood === 'celebrating'
                ? { y: [0, -16, 0] }
                : { y: [0, -4, 0] }
            }
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.circle
            cx="175"
            cy="130"
            r="10"
            fill="#ffffff"
            stroke="#cbd5e1"
            strokeWidth="2"
            animate={
              mood === 'welcome'
                ? { y: [0, -4, 0] }
                : mood === 'celebrating'
                ? { y: [0, -16, 0] }
                : { y: [0, -4, 0] }
            }
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
          />
        </svg>
      </motion.div>
    </div>
  );
};
