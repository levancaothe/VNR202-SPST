import React from 'react';
import { useGameStore } from '../store/useGameStore';
import { CAMPAIGN_STAGES } from '../data/stageData';
import { GAME_LEVELS } from '../data/gameData';
import { soundManager } from '../utils/audio';
import {
  Award,
  ArrowRight,
  Sparkles,
  Target,
} from 'lucide-react';
import { motion } from 'framer-motion';

export const StageCompleteModal: React.FC = () => {
  const {
    completedStageNotification,
    closeStageCompleteModal,
    currentLevelIndex,
    currentStageIndex,
    enlightenment,
    alertLevel,
  } = useGameStore();

  if (!completedStageNotification) return null;

  const currentLevel = GAME_LEVELS[currentLevelIndex];
  const stages = CAMPAIGN_STAGES[currentLevel.id] || [];
  const nextStage = stages[currentStageIndex];

  const handleContinue = () => {
    soundManager.playStamp();
    closeStageCompleteModal();
  };

  return (
    <div className="fixed inset-0 z-[65] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="parchment-bg max-w-xl w-full p-6 sm:p-8 rounded-2xl border-4 border-[#b45309] shadow-2xl relative text-[#261b13] my-6"
      >
        {/* Rubber Stamp: THẮNG LỢI VƯỢT ẢI */}
        <div className="absolute top-4 right-4 pointer-events-none transform rotate-6">
          <span className="rubber-stamp stamp-green text-xs font-black tracking-widest">
            ★ THẮNG LỢI VƯỢT ẢI ★
          </span>
        </div>

        {/* Top Icon */}
        <div className="w-16 h-16 rounded-full bg-[#92400e] border-4 border-[#fcd34d] flex items-center justify-center mx-auto mb-3 shadow-xl">
          <Award className="w-8 h-8 text-[#fef08a]" />
        </div>

        {/* Header */}
        <div className="text-center pb-3 border-b-2 border-[#543b27]/30 mb-4">
          <span className="text-xs font-mono-code font-bold uppercase text-[#92400e]">
            MÀN {currentLevel.id} • HOÀN THÀNH XUẤT SẮC
          </span>
          <h2 className="font-vintage-title text-2xl font-black text-[#1c120a] uppercase mt-1">
            {completedStageNotification.title}
          </h2>
        </div>

        {/* Historical Context Card */}
        <div className="bg-[#ede1ce] p-4 rounded-xl border border-[#baa48b] mb-4 space-y-2 shadow-inner">
          <div className="flex items-center space-x-1.5 font-bold text-xs uppercase text-[#8b2616] font-mono-code">
            <Sparkles className="w-4 h-4 text-[#d97706]" />
            <span>Thành Quả Lịch Sử Đã Đạt Được:</span>
          </div>
          <p className="font-serif text-xs sm:text-sm text-[#2b1f16] leading-relaxed italic">
            "{completedStageNotification.historicalContext}"
          </p>
          <div className="text-xs font-serif text-[#543b27] pt-1">
            <strong>Nhiệm vụ vừa qua:</strong> {completedStageNotification.mission}
          </div>
        </div>

        {/* Next Stage Preview Card */}
        {nextStage && (
          <div className="bg-[#f5ebd7] p-4 rounded-xl border-2 border-[#b45309]/50 mb-6 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono-code font-bold uppercase text-[#b45309] flex items-center space-x-1.5">
                <Target className="w-4 h-4 text-[#b45309]" />
                <span>Nhiệm Vụ Ải Tiếp Theo:</span>
              </span>
              <span className="text-xs font-mono-code font-bold px-2 py-0.5 rounded bg-[#fef3c7] text-[#92400e] border border-[#f59e0b]">
                Mục tiêu: {nextStage.targetEnlightenmentThreshold}% Lòng dân
              </span>
            </div>

            <div className="font-vintage-title text-base sm:text-lg font-bold text-[#1c120a]">
              {nextStage.title}
            </div>

            <p className="font-serif text-xs sm:text-sm text-[#4a3424]">
              {nextStage.mission}
            </p>
          </div>
        )}

        {/* Status Snapshot */}
        <div className="grid grid-cols-2 gap-3 text-center mb-6 font-mono-code text-xs">
          <div className="p-2.5 rounded-lg bg-[#efe3d0] border border-[#baa48b]">
            <span className="text-[#69482d] block text-[10px] font-bold uppercase">
              Lòng Dân Hiện Tại
            </span>
            <span className="text-sm font-bold text-[#b45309]">
              {enlightenment}%
            </span>
          </div>
          <div className="p-2.5 rounded-lg bg-[#efe3d0] border border-[#baa48b]">
            <span className="text-[#69482d] block text-[10px] font-bold uppercase">
              Mức Bị Theo Dõi
            </span>
            <span className={`text-sm font-bold ${alertLevel > 60 ? 'text-red-700' : 'text-emerald-700'}`}>
              {alertLevel}%
            </span>
          </div>
        </div>

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleContinue}
          className="w-full py-3.5 rounded-xl font-vintage-title text-base font-black uppercase tracking-wider bg-gradient-to-b from-[#b45309] to-[#78350f] hover:from-[#d97706] hover:to-[#92400e] text-[#fffefb] flex items-center justify-center space-x-2 shadow-xl border-2 border-[#451a03] cursor-pointer"
        >
          <span>{nextStage ? `Bước Vào Ải ${nextStage.stageId}` : 'Tiếp Tục'}</span>
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </motion.div>
    </div>
  );
};
