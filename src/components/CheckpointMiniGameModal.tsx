import React, { useState, useEffect } from 'react';
import { useGameStore } from '../store/useGameStore';
import { soundManager } from '../utils/audio';
import {
  ShieldAlert,
  Clock,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import { motion } from 'framer-motion';

interface HidingSpot {
  id: string;
  name: string;
  icon: string;
  safety: number; // percentage
  desc: string;
}

const HIDING_SPOTS: HidingSpot[] = [
  {
    id: 'spot-bamboo',
    name: 'Đáy Đòn Gánh Tre Rỗng',
    icon: '🎋',
    safety: 85,
    desc: 'Cuộn tròn tài liệu nhét sâu vào ống tre đòn gánh đã gọt khéo léo.',
  },
  {
    id: 'spot-fish',
    name: 'Giữa Thùng Cá Ươn',
    icon: '🐟',
    safety: 90,
    desc: 'Bọc giấy dầu chống nước rồi giấu dưới lớp cá tanh, lính Pháp rất ngại thò tay bới.',
  },
  {
    id: 'spot-grain',
    name: 'Đáy Bồ Thóc Ngô',
    icon: '🌾',
    safety: 70,
    desc: 'Lót dưới đáy bồ thóc dày, cần cào sâu mới thấy.',
  },
  {
    id: 'spot-basket',
    name: 'Đáy Túi Vải Gác Xe Đạp',
    icon: '🚲',
    safety: 35,
    desc: 'Chỉ che bằng manh áo tơi, nếu lính sờ nắn kỹ là phát hiện ngay.',
  },
];

export const CheckpointMiniGameModal: React.FC = () => {
  const { isInspectionOpen, resolveInspectionMiniGame } = useGameStore();
  const [timeLeft, setTimeLeft] = useState<number>(8);
  const [chosenSpot, setChosenSpot] = useState<string | null>(null);
  const [resultState, setResultState] = useState<'success' | 'failure' | null>(null);

  useEffect(() => {
    if (isInspectionOpen) {
      setTimeLeft(8);
      setChosenSpot(null);
      setResultState(null);

      soundManager.playPoliceWhistle();
      const heartbeatInterval = setInterval(() => {
        soundManager.playHeartbeat();
      }, 700);

      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            clearInterval(heartbeatInterval);
            // Time out = failure
            handleResolve(null);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        clearInterval(timer);
        clearInterval(heartbeatInterval);
      };
    }
  }, [isInspectionOpen]);

  if (!isInspectionOpen) return null;

  const handleResolve = (spotId: string | null) => {
    let success = false;
    if (spotId) {
      const spot = HIDING_SPOTS.find((s) => s.id === spotId);
      const roll = Math.random() * 100;
      success = roll < (spot ? spot.safety : 30);
    }

    setResultState(success ? 'success' : 'failure');
    setTimeout(() => {
      resolveInspectionMiniGame(success);
    }, 1200);
  };

  const handleSelectSpot = (spot: HidingSpot) => {
    if (chosenSpot || resultState) return;
    setChosenSpot(spot.id);
    handleResolve(spot.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="parchment-bg max-w-xl w-full p-6 sm:p-8 rounded-2xl border-4 border-red-700 shadow-2xl relative text-[#2b1f16] my-6 animate-screen-shake"
      >
        {/* Spotlight scanner effect */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-yellow-400 to-transparent animate-pulse"></div>

        {/* Header */}
        <div className="text-center pb-3 border-b-2 border-[#543b27]/30 mb-4">
          <div className="flex items-center justify-center space-x-2 text-xs font-mono-code font-bold uppercase text-red-700">
            <ShieldAlert className="w-4 h-4 animate-bounce" />
            <span>KHẨN CẤP: ĐỤNG ĐỘ TRẠM GÁC MẬT THÁM!</span>
          </div>

          <h2 className="font-vintage-title text-xl sm:text-2xl font-black text-[#1e130a] uppercase mt-1">
            Vượt Trạm Kiểm Soát
          </h2>

          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-100 text-red-900 border border-red-400 font-mono-code font-bold text-xs mt-2">
            <Clock className="w-4 h-4 animate-spin text-red-600" />
            <span>Còn {timeLeft} giây trước khi lính soi đèn tới!</span>
          </div>
        </div>

        {/* Narrative instruction */}
        <p className="font-serif text-xs sm:text-sm text-[#3b2718] leading-relaxed mb-4 text-center bg-[#f5ede1] p-3 rounded-lg border border-[#c4ae95]">
          Toán lính khố xanh đang chặn đường soát giỏ của từng người. Bạn phải nhanh tay giấu xấp tài liệu vào một nơi kín đáo nhất!
        </p>

        {/* Choice Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          {HIDING_SPOTS.map((spot) => {
            const isSelected = chosenSpot === spot.id;
            return (
              <motion.button
                key={spot.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelectSpot(spot)}
                disabled={Boolean(chosenSpot || resultState)}
                className={`p-3.5 rounded-xl border-2 text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#edd8bf] border-[#8b2616] ring-2 ring-[#8b2616] shadow-md'
                    : 'bg-[#faf3e7] border-[#bca891] hover:bg-[#ede0ce]'
                }`}
              >
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-2xl">{spot.icon}</span>
                  <h4 className="font-vintage-title text-xs font-bold text-[#1f140e]">
                    {spot.name}
                  </h4>
                </div>
                <p className="text-[11px] font-serif text-[#543b27] leading-relaxed line-clamp-2">
                  {spot.desc}
                </p>
                <div className="text-[10px] font-mono-code font-bold text-emerald-800 mt-2 pt-1 border-t border-[#baaa93]">
                  Độ ngụy trang: ~{spot.safety}% an toàn
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Result Overlay */}
        {resultState && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`p-3.5 rounded-xl text-center font-mono-code text-xs font-bold flex items-center justify-center space-x-2 border ${
              resultState === 'success'
                ? 'bg-emerald-100 text-emerald-900 border-emerald-500'
                : 'bg-red-100 text-red-900 border-red-500'
            }`}
          >
            {resultState === 'success' ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Trót lọt! Mật thám không tìm thấy gì, cho qua trạm an toàn!</span>
              </>
            ) : (
              <>
                <XCircle className="w-5 h-5 text-red-600" />
                <span>Bị nghi ngờ! Phải vứt bỏ một số báo để tháo chạy thoát thân!</span>
              </>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
