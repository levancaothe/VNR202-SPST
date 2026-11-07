import React from 'react';
import { useGameStore } from '../store/useGameStore';
import { GAME_LEVELS } from '../data/gameData';
import { CAMPAIGN_STAGES } from '../data/stageData';
import {
  Flame,
  Calendar,
  Target,
  ArrowRight,
  Newspaper,
  Sparkles,
} from 'lucide-react';
import { motion } from 'framer-motion';

export const LevelIntroModal: React.FC = () => {
  const { gameStatus, currentLevelIndex, closeIntroModal, currentModifier } =
    useGameStore();

  if (gameStatus !== 'intro') return null;

  const currentLevel = GAME_LEVELS[currentLevelIndex];
  const stages = CAMPAIGN_STAGES[currentLevel.id] || [];
  const targetNeeded = Math.min(
    100,
    Math.max(
      20,
      currentLevel.targetEnlightenment + (currentModifier?.targetEnlightenmentDelta ?? 0)
    )
  );

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

        {/* Dynamic Randomized Difficulty Modifier Card */}
        {currentModifier && (
          <div className="bg-[#edd8be] p-3.5 rounded-xl border-2 border-[#8b2616]/60 mb-4 shadow-sm">
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <div className="flex items-center space-x-2">
                <span className="text-xl">{currentModifier.icon}</span>
                <div>
                  <div className="text-[10px] font-mono-code uppercase font-bold text-[#7a2e1d] flex items-center space-x-1">
                    <span>TÌNH THẾ THỜI CUỘC (NGẪU NHIÊN):</span>
                  </div>
                  <div className="font-vintage-title text-sm sm:text-base font-bold text-[#1e130a]">
                    {currentModifier.name}
                  </div>
                </div>
              </div>

              <div className="flex items-center shrink-0">
                <span className={`px-2.5 py-1 rounded text-[10px] font-mono-code font-bold border ${currentModifier.badgeColor} shadow-sm`}>
                  {currentModifier.badge}
                </span>
              </div>
            </div>

            <p className="text-xs font-serif text-[#4a3424] italic mb-2">
              "{currentModifier.description}"
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-[10px] font-mono-code bg-[#f7ede0] p-2 rounded-lg border border-[#c4ae95]">
              <div>
                <span className="text-[#8c745f]">Mật thám:</span>{' '}
                <strong className={currentModifier.alertGrowthMultiplier > 1 ? 'text-red-700' : 'text-emerald-700'}>
                  x{currentModifier.alertGrowthMultiplier}
                </strong>
              </div>
              <div>
                <span className="text-[#8c745f]">Lộ phí giao:</span>{' '}
                <strong className={currentModifier.fundsDeliveryCostDelta > 0 ? 'text-amber-800' : 'text-stone-700'}>
                  {currentModifier.fundsDeliveryCostDelta >= 0 ? `+${currentModifier.fundsDeliveryCostDelta}đ` : `${currentModifier.fundsDeliveryCostDelta}đ`}
                </strong>
              </div>
              <div>
                <span className="text-[#8c745f]">Nguy cơ trạm gác:</span>{' '}
                <strong className={currentModifier.inspectionChanceMultiplier > 1 ? 'text-red-700' : 'text-emerald-700'}>
                  x{currentModifier.inspectionChanceMultiplier}
                </strong>
              </div>
            </div>
          </div>
        )}

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
        <div className="font-serif text-xs sm:text-sm text-[#2b1e17] leading-relaxed mb-4 bg-[#f7efe0]/70 p-3.5 rounded-lg border border-[#c7b29a] space-y-1.5">
          <p>{currentLevel.description}</p>
        </div>

        {/* Mission Objectives */}
        <div className="bg-[#f0e3ce] p-3 rounded-lg border-2 border-[#b59b7b] mb-4 space-y-1.5 text-xs font-mono-code">
          <div className="font-bold text-[#1f150e] flex items-center space-x-1.5 uppercase tracking-wide">
            <Target className="w-4 h-4 text-[#8b2616]" />
            <span>NHIỆM VỤ LỊCH SỬ CẦN ĐẠT:</span>
          </div>
          <div className="flex items-center justify-between text-[#382619] pt-1">
            <span>● Điểm Giác ngộ Quần chúng mục tiêu:</span>
            <span className="font-bold text-base text-[#1b5e20]">
              {targetNeeded}%
            </span>
          </div>
          <div className="flex items-center justify-between text-[#382619]">
            <span>● Giữ Mức Bị Theo Dõi dưới:</span>
            <span className="font-bold text-base text-red-700">
              &lt; 100%
            </span>
          </div>
        </div>

        {/* Roadmap of 3 Campaign Stages */}
        <div className="bg-[#ede1ce] p-3.5 rounded-xl border border-[#c4ae95] mb-5 space-y-2 text-xs">
          <div className="font-bold text-[#8b2616] flex items-center justify-between uppercase tracking-wide font-mono-code">
            <span className="flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#d97706]" />
              <span>Lộ Trình 3 Ải Cách Mạng Của Màn Này:</span>
            </span>
            <span className="text-[10px] text-[#63452b] lowercase font-normal">(tuần tự vượt ải)</span>
          </div>

          <div className="space-y-1.5">
            {stages.map((stg) => (
              <div
                key={stg.stageId}
                className="flex items-start justify-between p-2 rounded bg-[#f7efe0] border border-[#d9c7b0] gap-2"
              >
                <div>
                  <div className="font-vintage-title font-bold text-[#1e130a] text-xs">
                    {stg.title}
                  </div>
                  <div className="font-serif text-[11px] text-[#5c4028] mt-0.5 leading-snug">
                    {stg.mission}
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <span className="inline-block px-1.5 py-0.5 rounded bg-[#fef3c7] text-[#92400e] border border-[#f59e0b] font-mono-code text-[10px] font-bold">
                    Cần {stg.targetEnlightenmentThreshold}%
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-[11px] font-serif text-[#785133] italic pt-1 border-t border-[#d9c7b0]/60">
            * <strong>Quy luật nhịp độ:</strong> Chọn tỷ lệ bị phát hiện thấp (an toàn) phải tích lũy bền bỉ qua từng Ải; chọn tỷ lệ bị phát hiện cao (liều lĩnh) có thể tạo đột phá vượt ải thần tốc nhưng dễ bị mật thám bủa vây!
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
