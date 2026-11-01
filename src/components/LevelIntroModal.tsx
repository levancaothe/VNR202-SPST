import React from 'react';
import { useGameStore } from '../store/useGameStore';
import { GAME_LEVELS } from '../data/gameData';
import {
  Flame,
  Calendar,
  Target,
  ArrowRight,
  Newspaper,
} from 'lucide-react';
import { motion } from 'framer-motion';

export const LevelIntroModal: React.FC = () => {
  const { gameStatus, currentLevelIndex, closeIntroModal } = useGameStore();

  if (gameStatus !== 'intro') return null;

  const currentLevel = GAME_LEVELS[currentLevelIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="parchment-bg max-w-xl w-full p-6 sm:p-8 rounded-2xl border-4 border-[#8b2616] shadow-2xl relative text-[#2b1e16] my-6"
      >
        {/* Top Header Badge */}
        <div className="text-center pb-4 mb-4 border-b-2 border-[#543b27]/30">
          <div className="flex items-center justify-center space-x-2 text-xs font-mono-code text-[#8b2616] font-black uppercase tracking-widest mb-1">
            <Flame className="w-4 h-4 text-[#8b2616]" />
            <span>MÀN {currentLevel.id} / 4 • {currentLevel.period}</span>
          </div>

          <h2 className="font-vintage-title text-2xl sm:text-3xl font-black text-[#1e130a] uppercase tracking-wide">
            {currentLevel.title}
          </h2>

          <div className="inline-flex items-center space-x-1.5 px-3 py-0.5 rounded-full bg-[#e3d0b8] text-xs font-mono-code font-bold text-[#4d321d] mt-2 border border-[#9c8266]">
            <Calendar className="w-3.5 h-3.5 text-[#8b2616]" />
            <span>Thời gian lịch sử: {currentLevel.year}</span>
          </div>
        </div>

        {/* Newspaper Info Banner */}
        <div className="bg-[#ede1ce] p-3.5 rounded-lg border border-[#c4ae95] mb-4 flex items-center space-x-3">
          <div className="w-12 h-12 rounded bg-[#3b271a] border border-[#785133] flex items-center justify-center text-[#fcd34d] shrink-0">
            <Newspaper className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[10px] font-mono-code uppercase font-bold text-[#734c2c]">
              ẤN PHẨM TIÊU BIỂU CỦA THỜI KỲ:
            </div>
            <div className="font-vintage-title text-base font-bold text-[#8b2616]">
              {currentLevel.newspaperName}
            </div>
            <div className="text-[11px] font-serif italic text-[#593d27]">
              "{currentLevel.newspaperSlogan}"
            </div>
          </div>
        </div>

        {/* Narrative Description */}
        <div className="font-serif text-xs sm:text-sm text-[#2b1e17] leading-relaxed mb-6 bg-[#f7efe0]/70 p-4 rounded-lg border border-[#c7b29a] space-y-2">
          <p>{currentLevel.description}</p>
        </div>

        {/* Mission Objectives */}
        <div className="bg-[#f0e3ce] p-4 rounded-lg border-2 border-[#b59b7b] mb-6 space-y-2 text-xs font-mono-code">
          <div className="font-bold text-[#1f150e] flex items-center space-x-1.5 uppercase tracking-wide">
            <Target className="w-4 h-4 text-[#8b2616]" />
            <span>NHIỆM VỤ LỊCH SỬ CẦN ĐẠT:</span>
          </div>
          <div className="flex items-center justify-between text-[#382619] pt-1">
            <span>● Điểm Giác ngộ Quần chúng mục tiêu:</span>
            <span className="font-bold text-base text-[#1b5e20]">
              {currentLevel.targetEnlightenment}%
            </span>
          </div>
          <div className="flex items-center justify-between text-[#382619]">
            <span>● Giữ Độ Động Mật thám dưới:</span>
            <span className="font-bold text-base text-red-700">
              &lt; 100%
            </span>
          </div>
        </div>

        {/* CTA Start Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={closeIntroModal}
          className="w-full py-4 rounded-xl font-vintage-title text-base font-black uppercase tracking-wider bg-gradient-to-b from-[#8b2616] to-[#61160a] hover:from-[#a12e1c] hover:to-[#781c0e] text-[#fffefb] flex items-center justify-center space-x-3 shadow-2xl border-2 border-[#450e05] cursor-pointer"
        >
          <span>Bắt Đầu Hoạt Động Xuất Bản</span>
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </motion.div>
    </div>
  );
};
