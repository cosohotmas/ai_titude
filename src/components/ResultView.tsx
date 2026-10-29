import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { DimensionScores, ResultType } from '../data/testData';
import { CharacterAvatar } from './CharacterAvatar';
import { RadarChart } from './RadarChart';
import {
  RotateCcw,
  Share2,
  Copy,
  Check,
  Sparkles,
  ShieldAlert,
  Zap,
  CheckCircle,
  HeartHandshake,
  HeartCrack,
} from 'lucide-react';

interface ResultViewProps {
  result: ResultType;
  scores: DimensionScores;
  onRestart: () => void;
}

export const ResultView: React.FC<ResultViewProps> = ({
  result,
  scores,
  onRestart,
}) => {
  const [copied, setCopied] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Trigger celebration confetti on mount
  useEffect(() => {
    try {
      confetti({
        particleCount: 75,
        spread: 65,
        origin: { y: 0.6 },
        colors: ['#6366f1', '#ec4899', '#38bdf8', '#fbbf24', '#10b981'],
      });
    } catch {
      // safe fallback if confetti context restricted
    }
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      showToast('🔗 테스트 링크가 클립보드에 복사되었습니다!');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      showToast('링크를 복사하지 못했습니다. URL을 직접 복사해주세요.');
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: 'AI 활용 레벨 테스트 결과',
      text: `나의 AI 활용 유형은 [${result.name}]! 내 AI 점수와 유형을 확인해보세요.`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          handleCopyLink();
        }
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto pb-12 animate-fadeIn">
      {/* Toast Notification */}
      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900/95 text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-full shadow-xl flex items-center gap-2 backdrop-blur border border-slate-700"
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{toastMessage}</span>
        </motion.div>
      )}

      {/* Result Hero Header */}
      <div className="text-center space-y-4 mb-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: 'spring' }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs sm:text-sm font-bold shadow-xs"
        >
          <Sparkles className="w-4 h-4 text-indigo-600" />
          <span>{result.badgeTitle}</span>
        </motion.div>

        {/* Character Avatar with Persona Props */}
        <div className="py-2">
          <CharacterAvatar
            mood={result.avatarType}
            size="xl"
            showSpeech="당신의 AI 활용 페르소나 분석이 완료되었어요!"
          />
        </div>

        {/* Type Title */}
        <div className="space-y-2">
          <span className="text-3xl sm:text-4xl">{result.emoji}</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug px-2">
            {result.name}
          </h1>
          <p className="text-base sm:text-lg font-medium text-slate-600 max-w-xl mx-auto px-4">
            “{result.tagline}”
          </p>
        </div>

        {/* Summary Quote */}
        <div className="max-w-lg mx-auto bg-gradient-to-r from-indigo-50/60 via-purple-50/60 to-pink-50/60 p-4 rounded-2xl border border-indigo-100/80 text-xs sm:text-sm text-slate-700 font-medium italic">
          {result.summaryQuote}
        </div>
      </div>

      {/* Section 1: 4 Dimensions Radar & Bar Breakdown */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-sm border border-slate-200/80 mb-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
            <Zap className="w-5 h-5 text-indigo-600" />
            <span>4대 역량 진단 레이더 & 점수</span>
          </h2>
          <span className="text-xs text-indigo-600 font-semibold bg-indigo-50 px-2 py-0.5 rounded-md">
            종합 분석
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 mb-6">
          8개 질문에 대한 답변 패턴을 기반으로 측정한 4대 핵심 축 역량입니다.
        </p>

        <RadarChart scores={scores} />
      </div>

      {/* Section 2: 3 Core Traits */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-sm border border-slate-200/80 mb-6">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-emerald-600" />
          <span>나를 설명하는 대표 특징 3가지</span>
        </h2>
        <div className="space-y-3">
          {result.traits.map((trait, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-100 text-sm font-medium text-slate-800"
            >
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <p className="leading-relaxed">{trait}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Section 3: Strengths & Cautions (2 Columns on Desktop) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {/* Strengths */}
        <div className="bg-indigo-50/50 rounded-3xl p-5 sm:p-6 border border-indigo-100/90 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-indigo-700 font-bold text-sm sm:text-base mb-2">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>핵심 강점</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              {result.strengths}
            </p>
          </div>
        </div>

        {/* Caution */}
        <div className="bg-amber-50/50 rounded-3xl p-5 sm:p-6 border border-amber-100/90 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-amber-700 font-bold text-sm sm:text-base mb-2">
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              <span>주의할 점</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              {result.caution}
            </p>
          </div>
        </div>
      </div>

      {/* Section 4: 3 Recommended Action Steps */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-sm border border-slate-200/80 mb-6">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-600" />
          <span>내 레벨을 2배 끌어올릴 추천 행동 3개</span>
        </h2>
        <div className="space-y-3">
          {result.recommendations.map((rec, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-purple-50/40 border border-purple-100/70 text-xs sm:text-sm text-slate-800 font-medium"
            >
              <span className="w-5 h-5 rounded-full bg-purple-600 text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <p className="leading-relaxed">{rec}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Section 5: Chemistry (환상의 케미 & 최악의 케미) */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-sm border border-slate-200/80 mb-8">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <span>🤝 동료 유형 궁합 케미</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs sm:text-sm mb-1.5">
              <HeartHandshake className="w-4 h-4 text-emerald-600" />
              <span>환상의 듀오 (최고의 파트너)</span>
            </div>
            <p className="font-semibold text-slate-900 text-xs sm:text-sm mb-1">
              {result.bestMatch.name}
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              {result.bestMatch.reason}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-100">
            <div className="flex items-center gap-2 text-rose-800 font-bold text-xs sm:text-sm mb-1.5">
              <HeartCrack className="w-4 h-4 text-rose-600" />
              <span>환장의 콤비 (주의할 파트너)</span>
            </div>
            <p className="font-semibold text-slate-900 text-xs sm:text-sm mb-1">
              {result.worstMatch.name}
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              {result.worstMatch.reason}
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons as requested */}
      <div className="space-y-3 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Share Button */}
          <button
            onClick={handleShare}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-lg shadow-indigo-200 transition-all active:scale-[0.98] cursor-pointer"
          >
            <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>친구에게 공유하기</span>
          </button>

          {/* Copy Link Button */}
          <button
            onClick={handleCopyLink}
            className="w-full py-4 px-6 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 border-2 border-slate-200 font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 transition-all active:scale-[0.98] cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-600">링크 복사 완료!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-slate-600" />
                <span>링크 복사하기</span>
              </>
            )}
          </button>
        </div>

        {/* Restart Button */}
        <button
          onClick={onRestart}
          className="w-full py-3.5 px-6 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.99] cursor-pointer"
        >
          <RotateCcw className="w-4 h-4 text-slate-600" />
          <span>다시 테스트하기</span>
        </button>
      </div>

      {/* Disclaimer as required */}
      <p className="text-center text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
        * 본 테스트는 실제 심리·역량 진단이 아니며, 직장인 및 대학생의 재미와 자기이해, AI 업무 생산성 향상을 위해 고안된 테스트입니다.
      </p>
    </div>
  );
};
