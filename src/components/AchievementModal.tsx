import React from 'react';
import { useGameStore } from '../store/useGameStore';
import { GAME_ACHIEVEMENTS } from '../data/gameData';
import { Award, X, CheckCircle2, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

export const AchievementModal: React.FC = () => {
  const { isAchievementsOpen, setIsAchievementsOpen, unlockedAchievementIds } = useGameStore();

  if (!isAchievementsOpen) return null;

  const totalAchievements = GAME_ACHIEVEMENTS.length;
  const unlockedCount = unlockedAchievementIds.length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="parchment-bg max-w-2xl w-full rounded-2xl border-4 border-[#8b2616] shadow-2xl overflow-hidden flex flex-col max-h-[85vh] my-auto text-[#2b1f16]"
      >
        {/* Header */}
        <div className="bg-[#1f1611] px-6 py-4 flex items-center justify-between border-b-2 border-[#453123] text-[#f7eedc]">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded bg-[#3b271a] border border-[#6b472e] text-[#fcd34d]">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-vintage-title text-lg font-bold tracking-wide">
                Huân Chương & Danh Hiệu Cách Mạng
              </h2>
              <p className="text-xs text-[#a89582] font-mono-code">
                Ghi nhận chiến công của người làm báo vô sản ({unlockedCount}/{totalAchievements} Đã đạt)
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAchievementsOpen(false)}
            className="p-1.5 rounded-lg bg-[#2e2017] hover:bg-[#473224] text-[#d4c1ad] border border-[#523927] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="bg-[#ede2ce] px-6 py-3 border-b border-[#baa48b] flex items-center space-x-3">
          <span className="text-xs font-mono-code font-bold text-[#593d27]">
            Tiến độ hoàn thành:
          </span>
          <div className="flex-1 bg-[#d8c7ad] h-3 rounded-full overflow-hidden border border-[#9c8266]">
            <motion.div
              className="bg-gradient-to-r from-[#d97706] to-[#15803d] h-full"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(100, (unlockedCount / totalAchievements) * 100)}%` }}
              transition={{ duration: 0.6 }}
            />
          </div>
          <span className="text-xs font-mono-code font-bold text-[#8b2616]">
            {Math.min(100, Math.round((unlockedCount / totalAchievements) * 100))}%
          </span>
        </div>

        {/* Grid of Achievements */}
        <div className="p-6 overflow-y-auto flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3.5 bg-[#f7efe0]">
          {GAME_ACHIEVEMENTS.map((ach) => {
            const isUnlocked = unlockedAchievementIds.includes(ach.id);
            return (
              <div
                key={ach.id}
                className={`p-3.5 rounded-xl border transition-all flex items-start space-x-3 ${
                  isUnlocked
                    ? 'bg-[#f4ebd9] border-[#b45309] shadow-md ring-1 ring-[#f59e0b]/40'
                    : 'bg-[#e5d8c3]/60 border-[#baaa93] opacity-60'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl shrink-0 shadow-inner border ${
                    isUnlocked
                      ? 'bg-[#edd9be] border-[#d97706]'
                      : 'bg-[#d6c7b0] border-[#9c8266] grayscale'
                  }`}
                >
                  {isUnlocked ? ach.icon : <Lock className="w-5 h-5 text-[#735134]" />}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-vintage-title text-sm font-bold text-[#1f140e] truncate">
                      {ach.title}
                    </h4>
                    {isUnlocked && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    )}
                  </div>
                  <p className="text-xs font-serif text-[#543b27] leading-relaxed mt-1">
                    {ach.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};
