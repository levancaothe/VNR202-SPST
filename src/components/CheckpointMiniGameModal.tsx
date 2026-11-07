import React, { useState, useEffect, useRef } from 'react';
import { useGameStore } from '../store/useGameStore';
import { soundManager } from '../utils/audio';
import {
  ShieldAlert,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  generateCheckpointSpots,
  type CheckpointSpot,
} from '../data/distributionPool';

export const CheckpointMiniGameModal: React.FC = () => {
  const { isInspectionOpen, resolveInspectionMiniGame } = useGameStore();

  const [timeLeft, setTimeLeft] = useState<number>(8);
  const [failedSpotIds, setFailedSpotIds] = useState<string[]>([]);
  const [successSpotId, setSuccessSpotId] = useState<string | null>(null);
  const [resultState, setResultState] = useState<'success' | 'failure' | null>(null);
  const [spots, setSpots] = useState<CheckpointSpot[]>(() => generateCheckpointSpots());
  const [warningFeedback, setWarningFeedback] = useState<string | null>(null);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const heartbeatRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Initialize and run countdown when modal opens
  useEffect(() => {
    if (isInspectionOpen) {
      const freshSpots = generateCheckpointSpots();
      setSpots(freshSpots);
      setTimeLeft(8);
      setFailedSpotIds([]);
      setSuccessSpotId(null);
      setResultState(null);
      setWarningFeedback(null);

      soundManager.playPoliceWhistle();

      heartbeatRef.current = setInterval(() => {
        soundManager.playHeartbeat();
      }, 700);

      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => Math.max(0, prev - 1));
      }, 1000);

      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
        if (heartbeatRef.current) clearInterval(heartbeatRef.current);
      };
    }
  }, [isInspectionOpen]);

  // Safely trigger timeout when counter reaches 0
  useEffect(() => {
    if (isInspectionOpen && timeLeft === 0 && resultState === null) {
      if (timerRef.current) clearInterval(timerRef.current);
      if (heartbeatRef.current) clearInterval(heartbeatRef.current);
      handleTimeExpired();
    }
  }, [timeLeft, isInspectionOpen, resultState]);

  if (!isInspectionOpen) return null;

  // Called when time expires without finding a safe spot
  const handleTimeExpired = () => {
    setResultState('failure');
    setWarningFeedback('Hết thời gian! Lính mật thám Pháp ập vào khám xét và phát hiện tài liệu mật!');
    soundManager.playPoliceWhistle();

    setTimeout(() => {
      resolveInspectionMiniGame(false);
    }, 1500);
  };

  const handleSelectSpot = (spot: CheckpointSpot) => {
    // If already resolved or this spot was already tried and failed, do nothing
    if (resultState !== null || failedSpotIds.includes(spot.id)) return;

    // Roll against the spot's safety percentage
    const roll = Math.random() * 100;
    const isSafe = roll < spot.safety;

    if (isSafe) {
      // 1. CHỌN ĐÚNG: PASS ngay lập tức!
      if (timerRef.current) clearInterval(timerRef.current);
      if (heartbeatRef.current) clearInterval(heartbeatRef.current);

      setSuccessSpotId(spot.id);
      setResultState('success');
      setWarningFeedback(null);
      soundManager.playVictory();

      setTimeout(() => {
        resolveInspectionMiniGame(true);
      }, 1400);
    } else {
      // 2. CHỌN SAI: Không thua ngay, vị trí này bị lính soi, được chọn phương án khác trong thời gian còn lại
      soundManager.playHeartbeat();
      const updatedFailed = [...failedSpotIds, spot.id];
      setFailedSpotIds(updatedFailed);

      // Nếu đã bấm thử hết tất cả các phương án mà đều sai -> Thất bại, bị bắt và thua!
      if (updatedFailed.length >= spots.length) {
        if (timerRef.current) clearInterval(timerRef.current);
        if (heartbeatRef.current) clearInterval(heartbeatRef.current);

        setResultState('failure');
        setWarningFeedback('Tất cả nơi ẩn nấp đều bị lính mật thám sờ trúng! Bạn đã bị bắt giữ!');
        soundManager.playPoliceWhistle();

        setTimeout(() => {
          resolveInspectionMiniGame(false);
        }, 1500);
      } else {
        // Vẫn còn phương án khác và thời gian vẫn còn -> Báo động để người chơi nhanh tay chọn tiếp!
        setWarningFeedback(`⚠️ Lính Pháp đang soi kỹ "${spot.name}"! Nhanh tay đổi sang nơi giấu khác trước khi hết giờ!`);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="parchment-bg max-w-xl w-full p-6 sm:p-8 rounded-2xl border-4 border-red-700 shadow-2xl relative text-[#2b1f16] my-6 animate-screen-shake"
      >
        {/* Spotlight scanner beam */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-yellow-400 to-transparent animate-pulse" />

        {/* Header */}
        <div className="text-center pb-3 border-b-2 border-[#543b27]/30 mb-4">
          <div className="flex items-center justify-center space-x-2 text-xs font-mono-code font-bold uppercase text-red-700">
            <ShieldAlert className="w-4 h-4 animate-bounce" />
            <span>KHẨN CẤP: ĐỤNG ĐỘ TRẠM GÁC MẬT THÁM!</span>
          </div>

          <h2 className="font-vintage-title text-xl sm:text-2xl font-black text-[#1e130a] uppercase mt-1">
            Vượt Trạm Kiểm Soát
          </h2>

          <div
            className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full font-mono-code font-bold text-xs mt-2 border transition-colors ${
              timeLeft <= 3
                ? 'bg-red-200 text-red-900 border-red-500 animate-pulse'
                : 'bg-red-100 text-red-900 border-red-400'
            }`}
          >
            <Clock className="w-4 h-4 animate-spin text-red-600" />
            <span>Còn {timeLeft} giây trước khi lính soi đèn tới!</span>
          </div>
        </div>

        {/* Detective instruction banner */}
        <div className="flex items-center gap-3.5 bg-[#1b120c] text-[#f2e6d5] p-3 rounded-xl border border-red-800/80 mb-3 shadow-inner">
          <div className="relative w-14 h-14 rounded-lg overflow-hidden border border-red-500/60 shrink-0 shadow-lg bg-black">
            <img
              src="/detective.png"
              alt="Mật thám Pháp"
              className="w-full h-full object-cover filter contrast-125 brightness-90 grayscale-[25%]"
            />
            <div className="absolute inset-0 bg-red-950/20 mix-blend-color pointer-events-none" />
          </div>
          <div className="flex-1">
            <div className="text-[11px] font-mono-code text-red-400 font-bold uppercase tracking-wider flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5 animate-pulse" />
              <span>Toán Mật Thám Sở Liêm Phóng Khám Xét</span>
            </div>
            <p className="text-xs font-serif text-[#e5d5be] italic mt-0.5 leading-snug">
              "Đứng lại! Mở hết quang gánh ra kiểm tra! Ai cất giấu truyền đơn phản nghịch lập tức bắt giam!"
            </p>
          </div>
        </div>

        {/* Warning feedback banner when picking wrong spot */}
        <AnimatePresence>
          {warningFeedback && resultState === null && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-3 px-3 py-2 rounded-lg bg-amber-900/90 text-amber-100 border border-amber-500 text-xs font-mono-code font-bold flex items-center space-x-2 animate-pulse"
            >
              <AlertTriangle className="w-4 h-4 text-amber-300 shrink-0 animate-bounce" />
              <span>{warningFeedback}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Choice Grid: All percentage indicators and badges use the EXACT SAME uniform color styling */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          {spots.map((spot) => {
            const isFailed = failedSpotIds.includes(spot.id);
            const isSuccess = successSpotId === spot.id;

            return (
              <motion.button
                key={spot.id}
                whileHover={!isFailed && resultState === null ? { scale: 1.02 } : {}}
                whileTap={!isFailed && resultState === null ? { scale: 0.98 } : {}}
                onClick={() => handleSelectSpot(spot)}
                disabled={isFailed || resultState !== null}
                className={`p-3.5 rounded-xl border-2 text-left transition-all relative ${
                  isSuccess
                    ? 'bg-emerald-100 border-emerald-600 ring-2 ring-emerald-500 shadow-lg'
                    : isFailed
                    ? 'bg-red-950/20 border-red-500/70 border-dashed opacity-65 cursor-not-allowed'
                    : 'bg-[#faf3e7] border-[#bca891] hover:bg-[#ede0ce] hover:border-[#8b2616] cursor-pointer'
                }`}
              >
                {/* Status indicator badge when failed or safe */}
                {isFailed && (
                  <div className="absolute top-2 right-2 flex items-center space-x-1 px-1.5 py-0.5 rounded bg-red-900 text-red-100 text-[10px] font-mono-code font-bold">
                    <XCircle className="w-3 h-3 text-red-200" />
                    <span>LÍNH ĐÃ SOI!</span>
                  </div>
                )}

                {isSuccess && (
                  <div className="absolute top-2 right-2 flex items-center space-x-1 px-2 py-0.5 rounded bg-emerald-800 text-emerald-100 text-[10px] font-mono-code font-bold animate-bounce">
                    <CheckCircle2 className="w-3 h-3 text-emerald-300" />
                    <span>AN TOÀN!</span>
                  </div>
                )}

                {/* Header row: Name and Condition Tag (All tags use the SAME uniform color) */}
                <div className="flex items-center justify-between gap-1 mb-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{spot.icon}</span>
                    <h4
                      className={`font-vintage-title text-xs font-bold ${
                        isFailed ? 'line-through text-red-900' : 'text-[#1f140e]'
                      }`}
                    >
                      {spot.name}
                    </h4>
                  </div>

                  {!isFailed && !isSuccess && spot.conditionBadge && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono-code font-bold bg-[#2d1b10] text-[#e6b97d] border border-[#6b472e]">
                      {spot.conditionBadge}
                    </span>
                  )}
                </div>

                <p className="text-[11px] font-serif text-[#543b27] leading-relaxed mb-1.5">
                  {spot.desc}
                </p>

                {spot.conditionNote && !isFailed && (
                  <p className="text-[10px] font-serif italic text-[#6e462c] mb-1">
                    💡 {spot.conditionNote}
                  </p>
                )}

                {/* Safety Rate: All cards display in the EXACT SAME consistent color */}
                <div className="text-[10px] font-mono-code font-bold text-[#8b2616] mt-1 pt-1.5 border-t border-[#baaa93] flex items-center justify-between">
                  <span>Độ ngụy trang: ~{Math.min(100, spot.safety)}% an toàn</span>
                  {isFailed && (
                    <span className="text-red-700 font-bold uppercase">Chỗ này bị lộ!</span>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Final Result Overlay */}
        {resultState && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`p-3.5 rounded-xl text-center font-mono-code text-xs font-bold flex items-center justify-center space-x-2 border shadow-lg ${
              resultState === 'success'
                ? 'bg-emerald-100 text-emerald-900 border-emerald-500'
                : 'bg-red-100 text-red-900 border-red-500'
            }`}
          >
            {resultState === 'success' ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>VƯỢT TRẠM AN TOÀN! Mật thám không tìm thấy gì, cho qua trạm trót lọt!</span>
              </>
            ) : (
              <>
                <XCircle className="w-5 h-5 text-red-600 shrink-0" />
                <span>BỊ BẮT GIỮ! Toán mật thám đã bắt giữ bạn tại trạm kiểm soát! Thất bại!</span>
              </>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
