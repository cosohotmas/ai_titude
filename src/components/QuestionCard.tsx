import React from 'react';
import { motion } from 'motion/react';
import { Question, Option } from '../data/testData';
import { CharacterAvatar } from './CharacterAvatar';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  selectedOptionId?: string;
  onSelectOption: (option: Option) => void;
  onPrevious: () => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  currentIndex,
  totalQuestions,
  selectedOptionId,
  onSelectOption,
  onPrevious,
}) => {
  const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col">
      {/* Top Navigation & Progress Bar */}
      <div className="mb-6 space-y-3">
        <div className="flex items-center justify-between">
          <button
            onClick={onPrevious}
            disabled={currentIndex === 0}
            className={`flex items-center gap-1.5 text-xs sm:text-sm font-medium transition-colors ${
              currentIndex === 0
                ? 'opacity-0 pointer-events-none'
                : 'text-slate-500 hover:text-slate-900 cursor-pointer'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>이전 질문</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100">
              Q{currentIndex + 1}
            </span>
            <span className="text-xs text-slate-400 font-medium">/ {totalQuestions}</span>
          </div>
        </div>

        {/* Animated Progress Bar */}
        <div className="relative w-full bg-slate-100 h-2 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Interactive Avatar Guide with Speech */}
      <div className="mb-6 flex flex-col items-center">
        <CharacterAvatar
          mood={question.avatarMood}
          size="md"
          showSpeech={question.avatarSpeech}
        />
      </div>

      {/* Question Header & Scenario Card */}
      <motion.div
        key={question.id}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-center mb-6 space-y-2"
      >
        <span className="inline-block text-xs font-bold text-indigo-600 bg-indigo-50/80 px-3 py-1 rounded-full border border-indigo-100">
          {question.category}
        </span>
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
          {question.hookTitle}
        </h2>
        <p className="text-sm sm:text-base text-slate-600 font-medium max-w-lg mx-auto bg-slate-50/90 py-2 px-4 rounded-xl border border-slate-200/70">
          📍 {question.situation}
        </p>
      </motion.div>

      {/* 4 Large Choice Buttons */}
      <div className="space-y-3 sm:space-y-3.5">
        {question.options.map((option, idx) => {
          const isSelected = selectedOptionId === option.id;
          return (
            <motion.button
              key={option.id}
              onClick={() => onSelectOption(option)}
              whileHover={{ scale: 1.012 }}
              whileTap={{ scale: 0.985 }}
              className={`w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all flex items-start gap-3.5 sm:gap-4 group cursor-pointer ${
                isSelected
                  ? 'border-indigo-600 bg-indigo-50/70 text-indigo-950 shadow-md ring-2 ring-indigo-200'
                  : 'border-slate-200 bg-white hover:border-indigo-300 hover:bg-indigo-50/30 text-slate-800 shadow-xs'
              }`}
            >
              {/* Option Alphabet Badge */}
              <div
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center font-bold text-xs sm:text-sm shrink-0 transition-colors ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 group-hover:bg-indigo-100 group-hover:text-indigo-700'
                }`}
              >
                {isSelected ? <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" /> : option.label}
              </div>

              {/* Option Text */}
              <div className="flex-1 pt-0.5">
                <p className="text-sm sm:text-base font-semibold leading-relaxed">
                  {option.text}
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Tip for desktop keyboard users */}
      <p className="mt-4 text-center text-xs text-slate-400">
        답변을 클릭하면 다음 질문으로 부드럽게 이어집니다
      </p>
    </div>
  );
};
