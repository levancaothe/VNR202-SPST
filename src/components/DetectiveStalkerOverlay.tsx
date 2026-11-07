import React from 'react';
import { useGameStore } from '../store/useGameStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, ArrowRight, ShieldCheck } from 'lucide-react';

export const DetectiveStalkerOverlay: React.FC = () => {
  const { alertLevel, layLow, funds, gameStatus } = useGameStore();

  // Hiển thị mật thám khi mức báo động từ 65% trở lên trong lúc đang chơi
  const isStalked = alertLevel >= 65 && (gameStatus === 'playing' || gameStatus === 'event');
  const isExtreme = alertLevel >= 85;

  if (!isStalked) return null;

  return (
    <AnimatePresence>
      <div className="fixed bottom-0 right-0 z-35 pointer-events-none select-none flex flex-col items-end p-2 sm:p-4">
        {/* Dramatic Silhouette Character Container */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.9 }}
          animate={{
            opacity: [0.9, 1, 0.9],
            y: isExtreme ? [0, -6, 0] : [0, -3, 0],
            scale: 1,
          }}
          exit={{ opacity: 0, y: 60, scale: 0.9 }}
          transition={{
            y: { repeat: Infinity, duration: isExtreme ? 1.2 : 2.5, ease: 'easeInOut' },
            opacity: { repeat: Infinity, duration: 1.8, ease: 'easeInOut' },
          }}
          className="relative group pointer-events-auto flex flex-col items-end"
        >
          {/* Noir Shadow & Blood-Red Glow Backdrop */}
          <div
            className={`absolute -inset-4 rounded-full filter blur-xl opacity-60 pointer-events-none transition-colors duration-500 ${
              isExtreme ? 'bg-red-600/70 animate-pulse' : 'bg-red-900/50'
            }`}
          />

          {/* Stalker Warning Speech / Status Tag */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`mb-2 px-3 py-1.5 rounded-lg border-2 shadow-2xl backdrop-blur-md font-mono-code text-xs max-w-xs text-right transition-all ${
              isExtreme
                ? 'bg-red-950/95 border-red-500 text-red-100 animate-bounce'
                : 'bg-[#1a0f0a]/95 border-red-700/80 text-red-200'
            }`}
          >
            <div className="flex items-center justify-end space-x-1.5 text-red-400 font-bold uppercase tracking-wider text-[11px]">
              <Eye className="w-3.5 h-3.5 animate-pulse text-red-500" />
              <span>MẬT THÁM ĐANG RÌNH RẬP</span>
              <span className="px-1.5 py-0.2 bg-red-600 text-white rounded font-black text-[10px]">
                {Math.min(100, alertLevel)}%
              </span>
            </div>
            <p className="text-[11px] font-serif text-[#e5cfba] italic mt-0.5 leading-snug">
              {isExtreme
                ? 'Lính khố xanh và mật vụ chỉ điểm đã lần tới chân tường rào xưởng in!'
                : 'Bóng dáng người mặc áo măng-tô đen, đội mũ fedora đang theo dõi ngõ nhỏ...'}
            </p>

            {/* Quick Action: Lay Low Button */}
            <div className="mt-2 pt-1.5 border-t border-red-800/60 flex items-center justify-end gap-1.5">
              <button
                onClick={() => layLow()}
                disabled={funds < 12}
                className={`px-2.5 py-1 rounded text-[11px] font-bold uppercase tracking-wider flex items-center space-x-1 shadow transition-transform cursor-pointer ${
                  funds >= 12
                    ? 'bg-amber-500 hover:bg-amber-400 text-black hover:scale-105 active:scale-95'
                    : 'bg-stone-700 text-stone-400 cursor-not-allowed'
                }`}
                title={funds >= 12 ? 'Chi 12đ quỹ để tạm rút vào hoạt động bí mật, giảm 20% nguy hiểm' : 'Cần 12đ quỹ để ẩn nấp'}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Ẩn Nấp Ngay (-20% Nguy Hiểm)</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </motion.div>

          {/* Detective Noir Silhouette Figure */}
          <div className="relative w-36 h-48 sm:w-44 sm:h-56 rounded-2xl overflow-hidden border-2 border-red-700/70 shadow-2xl bg-black">
            {/* Dark vignette blending overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60 z-10" />
            {isExtreme && (
              <div className="absolute inset-0 bg-red-950/30 mix-blend-color z-10 animate-pulse pointer-events-none" />
            )}

            {/* The Detective Image */}
            <img
              src="/detective.png"
              alt="Mật thám Pháp theo dõi"
              className={`w-full h-full object-cover filter contrast-125 brightness-90 transition-transform duration-700 ${
                isExtreme ? 'scale-105 saturate-150' : 'grayscale-[40%]'
              }`}
            />

            {/* Glowing red surveillance eye / rim pulse */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-1 bg-red-600/60 rounded-full blur-sm animate-pulse z-20 pointer-events-none" />

            {/* Bottom Caption Overlay */}
            <div className="absolute bottom-1.5 inset-x-1.5 z-20 text-center">
              <span className="inline-block px-2 py-0.5 rounded bg-black/80 text-[10px] font-mono-code font-bold text-red-300 border border-red-800/80 backdrop-blur-sm">
                MẬT VỤ PHÁP • SỞ LIÊM PHÓNG
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
export default DetectiveStalkerOverlay;
