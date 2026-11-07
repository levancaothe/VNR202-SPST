import React, { useEffect } from 'react';
import { useGameStore } from '../store/useGameStore';
import confetti from 'canvas-confetti';
import {
  Trophy,
  RotateCcw,
  BookOpen,
} from 'lucide-react';
import { motion } from 'framer-motion';

export const VictoryModal: React.FC = () => {
  const {
    gameStatus,
    restartGame,
    setIsCodexOpen,
    secretCells,
    totalDistributed,
  } = useGameStore();

  useEffect(() => {
    if (gameStatus === 'victory') {
      // Fire confetti bursts
      const count = 200;
      const defaults = {
        origin: { y: 0.7 },
      };

      function fire(particleRatio: number, opts: confetti.Options) {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio),
        });
      }

      fire(0.25, {
        spread: 26,
        startVelocity: 55,
        colors: ['#dc2626', '#f59e0b', '#fbbf24'],
      });
      fire(0.2, {
        spread: 60,
        colors: ['#dc2626', '#f59e0b', '#fbbf24'],
      });
      fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8,
        colors: ['#dc2626', '#f59e0b', '#fbbf24'],
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2,
        colors: ['#dc2626', '#f59e0b', '#fbbf24'],
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 45,
        colors: ['#dc2626', '#f59e0b', '#fbbf24'],
      });
    }
  }, [gameStatus]);

  if (gameStatus !== 'victory') return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ scale: 0.85, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="parchment-bg max-w-2xl w-full p-6 sm:p-8 rounded-2xl border-4 border-[#d97706] shadow-2xl relative text-[#291c13] my-6"
      >
        {/* Rubber Stamp: CÁCH MẠNG THÀNH CÔNG */}
        <div className="absolute top-4 right-4 pointer-events-none transform rotate-6">
          <span className="rubber-stamp stamp-red text-xs sm:text-sm font-black tracking-widest">
            ★ CÁCH MẠNG THÁNG TÁM TOÀN THẮNG ★
          </span>
        </div>

        {/* Flag Graphic Banner */}
        <div className="text-center pb-4 mb-4 border-b-2 border-[#543b27]/30">
          <div className="w-16 h-16 rounded-full bg-[#8b2616] border-4 border-[#fcd34d] flex items-center justify-center mx-auto mb-2 shadow-2xl">
            <Trophy className="w-8 h-8 text-[#fef08a]" />
          </div>

          <div className="text-xs font-mono-code font-bold uppercase text-[#8b2616] tracking-widest">
            2 THÁNG 9 NĂM 1945 • QUẢNG TRƯỜNG BA ĐÌNH LỊCH SỬ
          </div>
          <h2 className="font-vintage-title text-2xl sm:text-3xl font-black text-[#1e130a] uppercase mt-1">
            Nước Việt Nam Dân Chủ Cộng Hòa Ra Đời!
          </h2>
        </div>

        {/* Declaration Excerpt */}
        <div className="bg-[#ede2ce] p-4 rounded-xl border border-[#baa48b] mb-5 space-y-2">
          <p className="font-serif text-xs sm:text-sm text-[#1f140e] leading-relaxed italic text-center font-bold">
            "Nước Việt Nam có quyền hưởng tự do và độc lập, và sự thật đã thành một nước tự do, độc lập. Toàn thể dân tộc Việt Nam quyết đem tất cả tinh thần và lực lượng, tính mạng và của cải để giữ vững quyền tự do, độc lập ấy!"
          </p>
          <div className="text-right text-[11px] font-mono-code text-[#734c2c] font-semibold">
            — Trích Tuyên ngôn Độc lập (Chủ tịch Hồ Chí Minh)
          </div>
        </div>

        {/* Achievement Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center mb-6 font-mono-code text-xs">
          <div className="p-3.5 rounded-lg bg-[#efe4d2] border border-[#baa48b]">
            <span className="text-[#69482d] block text-[10px] font-bold uppercase">
              Tổng số Báo đã lưu hành
            </span>
            <span className="text-lg font-bold text-[#8b2616]">
              {totalDistributed} bản
            </span>
          </div>

          <div className="p-3.5 rounded-lg bg-[#efe4d2] border border-[#baa48b]">
            <span className="text-[#69482d] block text-[10px] font-bold uppercase">
              Chi bộ bí mật gây dựng
            </span>
            <span className="text-lg font-bold text-[#1b5e20]">
              {secretCells} Chi bộ
            </span>
          </div>

          <div className="p-3.5 rounded-lg bg-[#efe4d2] border border-[#baa48b]">
            <span className="text-[#69482d] block text-[10px] font-bold uppercase">
              Danh hiệu đạt được
            </span>
            <span className="text-sm font-bold text-[#b45309]">
              Cây Bút Tiền Phong
            </span>
          </div>
        </div>

        {/* Party History Contribution Tribute */}
        <div className="p-4 bg-[#f8f1e5] rounded-lg border border-[#c4ae95] mb-6 text-xs text-[#3a2718] leading-relaxed font-serif space-y-2">
          <span className="font-bold text-[#8b2616] font-mono-code block uppercase">
            Đóng góp vĩ đại của Báo chí Cách mạng Việt Nam (1925 - 1945):
          </span>
          <p>
            Từ tờ báo <em>Thanh Niên</em> đầu tiên do Bác Hồ sáng lập năm 1925, qua các tờ báo trong ngục tù đế quốc, phong trào báo chí công khai thời Mặt trận Dân chủ, cho đến báo <em>Việt Nam Độc Lập</em> và <em>Cờ Giải Phóng</em> ở chiến khu Việt Bắc — báo chí cách mạng đã trở thành vũ khí sắc bén nhất của Đảng, thức tỉnh hàng chục triệu người dân đứng lên giành độc lập!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2.5">
          <button
            onClick={() => useGameStore.getState().setIsPrintCertificateOpen(true)}
            className="flex-1 py-3.5 rounded-xl bg-[#d97706] hover:bg-[#b45309] text-[#1f130a] font-vintage-title text-xs uppercase font-black flex items-center justify-center space-x-2 border border-[#78350f] cursor-pointer shadow-lg transition-transform hover:scale-102"
          >
            <span>📥 Tải Báo Kỷ Niệm (PDF)</span>
          </button>

          <button
            onClick={() => setIsCodexOpen(true)}
            className="flex-1 py-3.5 rounded-xl bg-[#2e1f16] hover:bg-[#422c1f] text-[#fef3c7] font-vintage-title text-xs uppercase font-bold flex items-center justify-center space-x-2 border border-[#6b472e] cursor-pointer transition-colors shadow-lg"
          >
            <BookOpen className="w-4 h-4 text-[#f59e0b]" />
            <span>Kho Tư Liệu Lịch Sử</span>
          </button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={restartGame}
            className="flex-1 py-3.5 rounded-xl bg-gradient-to-b from-[#8b2616] to-[#61160a] hover:from-[#a12e1c] hover:to-[#781c0e] text-[#fffefb] font-vintage-title text-xs uppercase font-black flex items-center justify-center space-x-2 shadow-xl border-2 border-[#450e05] cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Chơi Lại</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};
