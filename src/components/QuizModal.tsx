import React, { useState } from 'react';
import { useGameStore } from '../store/useGameStore';
import { HISTORICAL_QUIZZES } from '../data/gameData';
import {
  GraduationCap,
  X,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { motion } from 'framer-motion';

export const QuizModal: React.FC = () => {
  const { isQuizOpen, setIsQuizOpen, answerQuiz, answeredQuizIds } = useGameStore();
  const [selectedQuizIndex, setSelectedQuizIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);

  if (!isQuizOpen) return null;

  const currentQuiz = HISTORICAL_QUIZZES[selectedQuizIndex] || HISTORICAL_QUIZZES[0];
  const isAlreadyAnswered = answeredQuizIds.includes(currentQuiz.id);

  const handleAnswer = (optionIdx: number) => {
    if (isAlreadyAnswered || feedback) return;
    setSelectedOption(optionIdx);
    const res = answerQuiz(currentQuiz.id, optionIdx);
    setFeedback({
      isCorrect: res.isCorrect,
      text: res.feedback,
    });
  };

  const handleNextQuiz = () => {
    setSelectedOption(null);
    setFeedback(null);
    setSelectedQuizIndex((prev) => (prev + 1) % HISTORICAL_QUIZZES.length);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="parchment-bg max-w-xl w-full rounded-2xl border-4 border-[#523b2b] shadow-2xl overflow-hidden flex flex-col max-h-[88vh] my-auto text-[#2b1f16]"
      >
        {/* Header */}
        <div className="bg-[#1f1611] px-6 py-4 flex items-center justify-between border-b-2 border-[#453123] text-[#f7eedc]">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded bg-[#3b271a] border border-[#6b472e] text-[#fcd34d]">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-vintage-title text-lg font-bold tracking-wide">
                Thử Thách Kiến Thức Lịch Sử Đảng
              </h2>
              <p className="text-xs text-[#a89582] font-mono-code">
                Trả lời đúng để nhận chi viện Giấy, Mực & Tiền quỹ bí mật
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsQuizOpen(false)}
            className="p-1.5 rounded-lg bg-[#2e2017] hover:bg-[#473224] text-[#d4c1ad] border border-[#523927] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Question Selector Tabs */}
        <div className="bg-[#ede2ce] px-6 py-2 border-b border-[#baa48b] flex items-center justify-between text-xs font-mono-code">
          <div className="flex space-x-1.5">
            {HISTORICAL_QUIZZES.map((q, idx) => {
              const answered = answeredQuizIds.includes(q.id);
              const isActive = idx === selectedQuizIndex;
              return (
                <button
                  key={q.id}
                  onClick={() => {
                    setSelectedQuizIndex(idx);
                    setSelectedOption(null);
                    setFeedback(null);
                  }}
                  className={`w-7 h-7 rounded-full font-bold flex items-center justify-center cursor-pointer transition-colors ${
                    isActive
                      ? 'bg-[#8b2616] text-white shadow'
                      : answered
                      ? 'bg-emerald-700 text-white'
                      : 'bg-[#d8c7ad] text-[#4d331e] hover:bg-[#c9b79b]'
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
          <span className="text-[#69482d] font-bold">
            Câu {selectedQuizIndex + 1} / {HISTORICAL_QUIZZES.length}
          </span>
        </div>

        {/* Question Canvas */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4 bg-[#f7efe0]">
          {/* Question Text */}
          <div className="bg-[#ede1ce] p-4 rounded-xl border border-[#c4ae95]">
            <h3 className="font-vintage-title text-base sm:text-lg font-black text-[#1e140e] leading-snug">
              {currentQuiz.question}
            </h3>
          </div>

          {/* Rewards preview */}
          <div className="flex items-center space-x-3 text-xs font-mono-code text-[#593d25] px-1">
            <span className="font-bold flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5 text-[#d97706]" />
              <span>Phần thưởng chi viện:</span>
            </span>
            {currentQuiz.reward.paper && (
              <span className="text-amber-800 font-bold">+{currentQuiz.reward.paper} Giấy</span>
            )}
            {currentQuiz.reward.ink && (
              <span className="text-blue-800 font-bold">+{currentQuiz.reward.ink} Mực</span>
            )}
            {currentQuiz.reward.funds && (
              <span className="text-emerald-800 font-bold">+{currentQuiz.reward.funds}đ Quỹ</span>
            )}
          </div>

          {/* Options */}
          <div className="space-y-2.5">
            {currentQuiz.options.map((opt, optIdx) => {
              const isSelected = selectedOption === optIdx;
              const isCorrectAnswer = optIdx === currentQuiz.correctIndex;
              const showResult = feedback !== null || isAlreadyAnswered;

              let btnStyle = 'bg-[#f0e4cf] border-[#baaa93] hover:bg-[#e4d4bd] text-[#291b12]';
              if (showResult) {
                if (isCorrectAnswer) {
                  btnStyle = 'bg-emerald-100 border-emerald-600 text-emerald-950 font-bold';
                } else if (isSelected) {
                  btnStyle = 'bg-red-100 border-red-500 text-red-950';
                }
              }

              return (
                <button
                  key={optIdx}
                  onClick={() => handleAnswer(optIdx)}
                  disabled={showResult}
                  className={`w-full p-3.5 rounded-xl border-2 text-left font-serif text-xs sm:text-sm transition-all flex items-start space-x-2.5 cursor-pointer ${btnStyle}`}
                >
                  <span className="w-5 h-5 rounded-full bg-[#3d2719] text-white text-xs font-mono-code font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {String.fromCharCode(65 + optIdx)}
                  </span>
                  <span className="flex-1 leading-snug">{opt}</span>
                </button>
              );
            })}
          </div>

          {/* Feedback & Explanation Box */}
          {(feedback || isAlreadyAnswered) && (
            <div className="p-4 bg-[#ebdcc4] rounded-xl border border-[#baaa93] text-xs font-serif leading-relaxed text-[#3b2718] space-y-2">
              <div className="flex items-center space-x-1.5 font-bold font-mono-code text-xs uppercase text-[#8b2616]">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>Giải thích từ Giáo trình Lịch sử Đảng:</span>
              </div>
              <p>{feedback ? feedback.text : currentQuiz.explanation}</p>

              <button
                onClick={handleNextQuiz}
                className="mt-2 px-4 py-2 rounded-lg bg-[#8b2616] hover:bg-[#a32e1c] text-white font-mono-code font-bold text-xs uppercase tracking-wider cursor-pointer shadow"
              >
                Sang Câu Tiếp Theo →
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
