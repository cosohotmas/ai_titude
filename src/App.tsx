/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  QUESTIONS,
  RESULT_TYPES,
  DimensionScores,
  Option,
  ResultType,
} from './data/testData';
import { CharacterAvatar } from './components/CharacterAvatar';
import { QuestionCard } from './components/QuestionCard';
import { ResultView } from './components/ResultView';
import {
  Sparkles,
  Clock,
  HelpCircle,
  Briefcase,
  GraduationCap,
  ChevronRight,
  Zap,
} from 'lucide-react';

type ScreenState = 'start' | 'quiz' | 'analyzing' | 'result';

export default function App() {
  const [screen, setScreen] = useState<ScreenState>('start');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, Option>>({});
  const [calculatedScores, setCalculatedScores] = useState<DimensionScores>({
    prompting: 50,
    productivity: 50,
    critical: 50,
    toolStack: 50,
  });
  const [matchedResult, setMatchedResult] = useState<ResultType>(RESULT_TYPES.director);
  const [analyzingStep, setAnalyzingStep] = useState(0);

  // Keyboard shortcut listener for quiz
  useEffect(() => {
    if (screen !== 'quiz') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;
      const num = parseInt(key, 10);
      if (num >= 1 && num <= 4) {
        const option = QUESTIONS[currentQuestionIndex].options[num - 1];
        if (option) {
          handleSelectOption(option);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [screen, currentQuestionIndex, answers]);

  // Handle option selection
  const handleSelectOption = (option: Option) => {
    const updatedAnswers = {
      ...answers,
      [currentQuestionIndex]: option,
    };
    setAnswers(updatedAnswers);

    // If there are more questions, advance smoothly
    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex((prev) => prev + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 180);
    } else {
      // Completed all questions -> Trigger analysis
      processResults(updatedAnswers);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Compute final scores and best matching result type
  const processResults = (completedAnswers: Record<number, Option>) => {
    setScreen('analyzing');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Sum raw scores
    const rawScores = {
      prompting: 0,
      productivity: 0,
      critical: 0,
      toolStack: 0,
    };

    Object.values(completedAnswers).forEach((opt) => {
      rawScores.prompting += opt.scores.prompting;
      rawScores.productivity += opt.scores.productivity;
      rawScores.critical += opt.scores.critical;
      rawScores.toolStack += opt.scores.toolStack;
    });

    // Normalize: 8 questions * max 25 = 200 max raw.
    // We map to 0-100 range with realistic baseline curves.
    const normalizedScores: DimensionScores = {
      prompting: Math.min(100, Math.max(25, Math.round((rawScores.prompting / 180) * 100))),
      productivity: Math.min(100, Math.max(25, Math.round((rawScores.productivity / 180) * 100))),
      critical: Math.min(100, Math.max(25, Math.round((rawScores.critical / 180) * 100))),
      toolStack: Math.min(100, Math.max(25, Math.round((rawScores.toolStack / 180) * 100))),
    };

    setCalculatedScores(normalizedScores);

    // Find closest archetype using weighted euclidean distance
    const candidateTypes = Object.values(RESULT_TYPES);
    let bestType = candidateTypes[0];
    let minDistance = Infinity;

    candidateTypes.forEach((candidate) => {
      const dPrompting = normalizedScores.prompting - candidate.idealScores.prompting;
      const dProductivity = normalizedScores.productivity - candidate.idealScores.productivity;
      const dCritical = normalizedScores.critical - candidate.idealScores.critical;
      const dTool = normalizedScores.toolStack - candidate.idealScores.toolStack;

      const distance = Math.sqrt(
        dPrompting * dPrompting +
        dProductivity * dProductivity +
        dCritical * dCritical +
        dTool * dTool
      );

      if (distance < minDistance) {
        minDistance = distance;
        bestType = candidate;
      }
    });

    setMatchedResult(bestType);

    // Dynamic analyzing animation steps
    setAnalyzingStep(0);
    const step1 = setTimeout(() => setAnalyzingStep(1), 500);
    const step2 = setTimeout(() => setAnalyzingStep(2), 1000);
    const step3 = setTimeout(() => setAnalyzingStep(3), 1500);
    const finalTimer = setTimeout(() => {
      setScreen('result');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 2000);

    return () => {
      clearTimeout(step1);
      clearTimeout(step2);
      clearTimeout(step3);
      clearTimeout(finalTimer);
    };
  };

  const handleStartQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setScreen('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setScreen('start');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-indigo-50/20 to-white text-slate-800 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Global Header Bar */}
      <header className="w-full border-b border-slate-200/60 bg-white/80 backdrop-blur sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <div
            onClick={handleRestart}
            className="flex items-center gap-2 cursor-pointer font-extrabold text-base sm:text-lg text-slate-900 tracking-tight"
          >
            <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-xs shadow-xs">
              AI
            </span>
            <span>AI 활용 레벨 테스트</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>2026 직장인·대학생 리서치</span>
          </div>
        </div>
      </header>

      {/* Main App Content Viewport */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-6 sm:py-10 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {/* ================= 1. START SCREEN ================= */}
          {screen === 'start' && (
            <motion.div
              key="start-screen"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="w-full max-w-xl mx-auto text-center flex flex-col items-center"
            >
              {/* Category Badges */}
              <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
                <span className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200/70">
                  <Briefcase className="w-3.5 h-3.5" /> 직장인 (기획·보고서·칼퇴)
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200/70">
                  <GraduationCap className="w-3.5 h-3.5" /> 대학생 (과제·팀플·취준)
                </span>
              </div>

              {/* Animated Avatar with Welcoming Speech */}
              <div className="my-2">
                <CharacterAvatar
                  mood="welcome"
                  size="xl"
                  showSpeech="안녕! 너의 평소 AI 활용 스타일을 딱 맞게 진단해줄게 🚀"
                />
              </div>

              {/* Title & Hook */}
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight mt-4 mb-3">
                AI 활용 레벨 테스트
              </h1>

              {/* Curiosity Hook Box */}
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-indigo-100 shadow-md shadow-indigo-100/50 mb-6 max-w-md w-full">
                <p className="text-sm sm:text-base font-bold text-indigo-900 leading-snug">
                  “내 AI 활용법은 <span className="text-indigo-600 underline decoration-indigo-300 decoration-2 underline-offset-4">'능숙한 비서 부리기'</span>일까,
                  아니면 그냥 <span className="text-purple-600 underline decoration-purple-300 decoration-2 underline-offset-4">'고급 검색창'</span> 수준일까?”
                </p>
                <p className="text-xs text-slate-500 mt-2">
                  ChatGPT, Claude, 캔바, 노션 AI... 진짜 내 실전 무기력은 몇 점일까?
                </p>
              </div>

              {/* Test Meta Info (Questions & Time) */}
              <div className="grid grid-cols-2 gap-3 w-full max-w-md mb-8">
                <div className="flex items-center justify-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                  <HelpCircle className="w-4 h-4 text-indigo-600" />
                  <div className="text-left">
                    <div className="text-[11px] text-slate-400 font-medium">질문 수</div>
                    <div className="text-xs sm:text-sm font-bold text-slate-800">총 8개 문항</div>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                  <Clock className="w-4 h-4 text-purple-600" />
                  <div className="text-left">
                    <div className="text-[11px] text-slate-400 font-medium">예상 시간</div>
                    <div className="text-xs sm:text-sm font-bold text-slate-800">약 2~3분 소요</div>
                  </div>
                </div>
              </div>

              {/* Start Button */}
              <motion.button
                onClick={handleStartQuiz}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full max-w-md py-4 px-8 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 text-white font-extrabold text-base sm:text-lg shadow-lg shadow-indigo-300 flex items-center justify-center gap-2.5 transition-all cursor-pointer"
              >
                <span>테스트 시작하기</span>
                <ChevronRight className="w-5 h-5" />
              </motion.button>

              {/* Preview 6 Archetypes Sneak Peek */}
              <div className="mt-10 pt-6 border-t border-slate-200/80 w-full max-w-md">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                  등장 가능한 6대 AI 페르소나
                </p>
                <div className="flex flex-wrap items-center justify-center gap-1.5">
                  {Object.values(RESULT_TYPES).map((r) => (
                    <span
                      key={r.id}
                      className="text-xs bg-slate-100 hover:bg-indigo-50 text-slate-600 hover:text-indigo-700 px-2.5 py-1 rounded-full font-medium transition-colors"
                    >
                      {r.emoji} {r.name.split('‘')[1]?.replace('’', '') || r.badgeTitle}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* ================= 2. QUIZ SCREEN ================= */}
          {screen === 'quiz' && (
            <motion.div
              key="quiz-screen"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <QuestionCard
                question={QUESTIONS[currentQuestionIndex]}
                currentIndex={currentQuestionIndex}
                totalQuestions={QUESTIONS.length}
                selectedOptionId={answers[currentQuestionIndex]?.id}
                onSelectOption={handleSelectOption}
                onPrevious={handlePreviousQuestion}
              />
            </motion.div>
          )}

          {/* ================= 3. ANALYZING SCREEN ================= */}
          {screen === 'analyzing' && (
            <motion.div
              key="analyzing-screen"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="w-full max-w-md mx-auto text-center py-12 flex flex-col items-center"
            >
              <CharacterAvatar
                mood="analyzing"
                size="xl"
                showSpeech="너의 답변 데이터를 정밀 분석하고 있어!"
              />

              <div className="mt-8 space-y-3 w-full">
                <h3 className="text-xl font-black text-slate-900">
                  AI 활용 유형 계산 중...
                </h3>

                {/* Dynamic Status Progress Messages */}
                <div className="h-8 flex items-center justify-center">
                  <motion.p
                    key={analyzingStep}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm font-semibold text-indigo-600 flex items-center gap-2"
                  >
                    <Zap className="w-4 h-4 animate-bounce" />
                    {analyzingStep === 0 && '프롬프트 지시 패턴 스캔 중...'}
                    {analyzingStep === 1 && '칼퇴 및 워크플로우 생산성 수치화 중...'}
                    {analyzingStep === 2 && '할루시네이션(거짓 정보) 방어율 측정 중...'}
                    {analyzingStep >= 3 && '최종 AI 활용 페르소나 매칭 완료!'}
                  </motion.p>
                </div>

                {/* Analyzing Loading Bar */}
                <div className="w-48 mx-auto h-2 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-indigo-600 rounded-full"
                    initial={{ width: '10%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1.8, ease: 'easeInOut' }}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* ================= 4. RESULT SCREEN ================= */}
          {screen === 'result' && (
            <motion.div
              key="result-screen"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              <ResultView
                result={matchedResult}
                scores={calculatedScores}
                onRestart={handleRestart}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Global Footer */}
      <footer className="w-full py-6 border-t border-slate-200/60 bg-white/50 text-center text-xs text-slate-400">
        <p>© 2026 AI 활용 레벨 테스트 • 일상과 업무의 똑똑한 AI 활용 가이드</p>
      </footer>
    </div>
  );
}
