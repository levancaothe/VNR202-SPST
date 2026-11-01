import React, { useEffect } from 'react';
import { useGameStore } from '../store/useGameStore';
import { GAME_LEVELS } from '../data/gameData';
import { soundManager } from '../utils/audio';
import {
  AlertOctagon,
  RotateCcw,
  ShieldX,
  History,
  Sparkles,
} from 'lucide-react';
import { motion } from 'framer-motion';

export const GameOverModal: React.FC = () => {
  const {
    gameStatus,
    gameOverReason,
    restartGame,
    currentLevelIndex,
    setIsLogOpen,
  } = useGameStore();

  useEffect(() => {
    if (gameStatus === 'game_over') {
      soundManager.playPoliceWhistle();
      setTimeout(() => soundManager.playDramaticBoom(), 250);
    }
  }, [gameStatus]);

  if (gameStatus !== 'game_over') return null;

  const currentLevel = GAME_LEVELS[currentLevelIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ scale: 0.88, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.88, opacity: 0, y: 30 }}
        className="parchment-bg max-w-lg w-full p-6 sm:p-8 rounded-2xl border-4 border-[#8b2616] shadow-2xl relative text-[#2b1f17] my-6 animate-screen-shake"
      >
        {/* Rubber Stamp: CƠ SỞ BỊ LỘ */}
        <div className="absolute top-4 right-4 pointer-events-none transform -rotate-12 animate-stamp-slam">
          <span className="rubber-stamp stamp-red text-xs font-black tracking-widest">
            ★ CƠ SỞ BỊ ĐỘT KÍCH ★
          </span>
        </div>

        {/* Top Warning Icon */}
        <div className="w-16 h-16 rounded-full bg-[#8b2616] border-4 border-[#3b1210] flex items-center justify-center mx-auto mb-3 shadow-2xl animate-pulse">
          <ShieldX className="w-8 h-8 text-[#fecaca]" />
        </div>

        {/* Title */}
        <div className="text-center pb-3 border-b-2 border-[#543b27]/30 mb-4">
          <span className="text-xs font-mono-code font-bold uppercase text-[#8b2616]">
            HOẠT ĐỘNG XUẤT BẢN BỊ ĐÌNH TRỆ
          </span>
          <h2 className="font-vintage-title text-2xl font-black text-[#1c120a] uppercase mt-1">
            Mật Thám Pháp Phong Tỏa
          </h2>
          <span className="text-xs text-[#69482d] font-mono-code">
            Thời kỳ: {currentLevel.title} ({currentLevel.year})
          </span>
        </div>

        {/* Failure Report Narrative */}
        <div className="bg-[#ebd9c5] p-4 rounded-lg border border-[#baa48b] mb-4 space-y-2">
          <div className="flex items-center space-x-1.5 font-bold text-xs uppercase text-red-800 font-mono-code">
            <AlertOctagon className="w-4 h-4 text-red-700" />
            <span>Chuyện gì đã xảy ra?</span>
          </div>
          <p className="font-serif text-xs sm:text-sm text-[#2b1f16] leading-relaxed">
            {gameOverReason || 'Mức độ nguy hiểm chạm mốc 100%! Tiếng máy in và đường dây giao liên bị lộ, mật thám ập vào phong tỏa cơ sở. Rất may các đồng chí đã kịp thời tiêu hủy tài liệu mật trước khi rút lui.'}
          </p>
        </div>

        {/* Friendly Advice for next run */}
        <div className="p-3.5 bg-[#f5ede1] rounded-lg border border-[#c4ae95] mb-6 text-xs text-[#4d3521] leading-relaxed font-serif space-y-1.5">
          <div className="flex items-center space-x-1.5 font-bold text-[#8b2616] font-mono-code uppercase">
            <Sparkles className="w-4 h-4 text-[#d97706]" />
            <span>Lời khuyên hữu ích cho ván chơi sau:</span>
          </div>
          <p>
            Đừng nản lòng nhé! Trong lịch sử, phong trào cách mạng cũng từng trải qua nhiều lần bị khủng bố trắng rồi kiên cường gây dựng lại. Lần tới, hãy chú ý thanh <strong>"Nguy Hiểm"</strong> ở góc trên: nếu thấy vượt quá <strong>60%</strong>, hãy sang Tab In Ấn và bấm nút <em>"Ẩn nấp & Cắt đuôi mật thám"</em> để hạ nhiệt độ động kịp thời!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={restartGame}
            className="w-full py-4 rounded-xl font-vintage-title text-base font-black uppercase tracking-wider bg-gradient-to-b from-[#8b2616] to-[#61160a] hover:from-[#a12e1c] hover:to-[#781c0e] text-[#fffefb] flex items-center justify-center space-x-3 shadow-2xl border-2 border-[#450e05] cursor-pointer"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Tái Lập Cơ Sở & Thử Lại Ngay</span>
          </motion.button>

          <button
            onClick={() => setIsLogOpen(true)}
            className="w-full py-2.5 rounded-lg bg-[#ddcfb9] hover:bg-[#cfbfab] text-[#3d2919] font-mono-code text-xs font-bold flex items-center justify-center space-x-2 border border-[#8a6a4e] cursor-pointer transition-colors"
          >
            <History className="w-4 h-4" />
            <span>Xem Lại Nhật Ký Các Bước Đã Đi</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
