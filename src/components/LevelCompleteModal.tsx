import React from 'react';
import { useGameStore } from '../store/useGameStore';
import { GAME_LEVELS } from '../data/gameData';
import {
  Award,
  BookOpen,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { motion } from 'framer-motion';

export const LevelCompleteModal: React.FC = () => {
  const {
    gameStatus,
    currentLevelIndex,
    proceedToNextLevel,
    setIsCodexOpen,
    secretCells,
    totalDistributed,
  } = useGameStore();

  if (gameStatus !== 'level_complete') return null;

  const currentLevel = GAME_LEVELS[currentLevelIndex];
  const nextLevel = GAME_LEVELS[currentLevelIndex + 1];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="parchment-bg max-w-xl w-full p-6 sm:p-8 rounded-2xl border-4 border-[#2b8a3e] shadow-2xl relative text-[#261b13] my-6"
      >
        {/* Rubber Stamp: THẮNG LỢI VANG DỘI */}
        <div className="absolute top-4 right-4 pointer-events-none transform rotate-6">
          <span className="rubber-stamp stamp-green text-xs font-black tracking-widest">
            ★ HOÀN THÀNH MỤC TIÊU ★
          </span>
        </div>

        {/* Top Icon */}
        <div className="w-16 h-16 rounded-full bg-[#1b5e20] border-4 border-[#fcd34d] flex items-center justify-center mx-auto mb-3 shadow-xl">
          <Award className="w-8 h-8 text-[#fef08a]" />
        </div>

        {/* Title */}
        <div className="text-center pb-3 border-b-2 border-[#543b27]/30 mb-4">
          <span className="text-xs font-mono-code font-bold uppercase text-[#1b5e20]">
            KẾT THÚC THẮNG LỢI MÀN {currentLevel.id} • VƯỢT QUA CẢ 3 ẢI
          </span>
          <h2 className="font-vintage-title text-2xl font-black text-[#1c120a] uppercase mt-1">
            {currentLevel.title} ({currentLevel.year})
          </h2>
        </div>

        {/* Historical Fact / Summary from Party History Curriculum */}
        <div className="bg-[#e8decb] p-4 rounded-lg border border-[#baa48b] mb-4 space-y-2">
          <div className="flex items-center space-x-1.5 font-bold text-xs uppercase text-[#8b2616] font-mono-code">
            <Sparkles className="w-4 h-4 text-[#d97706]" />
            <span>Ý Nghĩa Lịch Sử Thời Kỳ:</span>
          </div>
          <p className="font-serif text-xs sm:text-sm text-[#2b1f16] leading-relaxed italic">
            "{currentLevel.historicalFact}"
          </p>
        </div>

        {/* Statistics Accomplished */}
        <div className="grid grid-cols-2 gap-3 text-center mb-6 font-mono-code text-xs">
          <div className="p-3 rounded-lg bg-[#efe3d0] border border-[#baa48b]">
            <span className="text-[#69482d] block text-[10px] font-bold uppercase">
              Cơ sở Chi bộ gây dựng
            </span>
            <span className="text-base font-bold text-[#8b2616]">
              {secretCells} Chi bộ
            </span>
          </div>
          <div className="p-3 rounded-lg bg-[#efe3d0] border border-[#baa48b]">
            <span className="text-[#69482d] block text-[10px] font-bold uppercase">
              Tổng số báo đã lưu hành
            </span>
            <span className="text-base font-bold text-[#1b5e20]">
              {totalDistributed} bản
            </span>
          </div>
        </div>

        {/* Codex Unlock Notice */}
        <div className="p-3 bg-[#e2d5c1] rounded-lg border border-[#baa48b] mb-6 flex items-center justify-between text-xs font-mono-code">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-4 h-4 text-[#8b2616]" />
            <span className="text-[#382618]">Đã mở khóa hồ sơ trong Kho Tư Liệu</span>
          </div>
          <button
            onClick={() => setIsCodexOpen(true)}
            className="text-[#8b2616] font-bold underline hover:text-[#661609] cursor-pointer"
          >
            Xem ngay
          </button>
        </div>

        {/* CTA Next Level */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={proceedToNextLevel}
          className="w-full py-4 rounded-xl font-vintage-title text-base font-black uppercase tracking-wider bg-gradient-to-b from-[#1b5e20] to-[#144218] hover:from-[#23772a] hover:to-[#1a551e] text-[#f4fbf5] flex items-center justify-center space-x-3 shadow-2xl border-2 border-[#0d2e10] cursor-pointer"
        >
          <span>Tiến Vào Màn {nextLevel?.id}: {nextLevel?.title}</span>
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </motion.div>
    </div>
  );
};
