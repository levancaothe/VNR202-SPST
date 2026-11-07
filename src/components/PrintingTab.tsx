import React, { useState } from 'react';
import { useGameStore } from '../store/useGameStore';
import { GAME_BASES, GAME_LEVELS } from '../data/gameData';
import { soundManager } from '../utils/audio';
import {
  Printer,
  MapPin,
  ShieldAlert,
  Zap,
  Plus,
  Minus,
  ShoppingCart,
  EyeOff,
  PackageCheck,
  ArrowRight,
  AlertCircle,
  AlertTriangle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const PrintingTab: React.FC = () => {
  const {
    paper,
    ink,
    funds,
    alertLevel,
    printedCopies,
    selectedBaseId,
    selectBase,
    printNewspaper,
    buySupplies,
    layLow,
    setActiveTab,
    currentLevelIndex,
  } = useGameStore();

  const currentLevel = GAME_LEVELS[currentLevelIndex];
  const [batches, setBatches] = useState<number>(1);
  const [isPressing, setIsPressing] = useState<boolean>(false);
  const [feedbackMsg, setFeedbackMsg] = useState<{ text: string; isError: boolean } | null>(null);

  const selectedBase =
    GAME_BASES.find((b) => b.id === selectedBaseId) || GAME_BASES[0];

  const availableBases = GAME_BASES.filter(
    (b) => b.unlockedAtLevel <= currentLevel.id
  );

  const paperNeeded = Math.round(batches * 10 * selectedBase.paperCostModifier);
  const inkNeeded = Math.round(batches * 8 * selectedBase.inkCostModifier);
  const estimatedCopies = Math.round(batches * 100 * selectedBase.efficiency);
  const estimatedAlertRisk = Math.round(batches * 7 * selectedBase.riskMultiplier);
  const projectedAlert = Math.min(100, alertLevel + estimatedAlertRisk);

  const canAffordPrint = paper >= paperNeeded && ink >= inkNeeded;

  const handlePrint = () => {
    setIsPressing(true);
    setFeedbackMsg(null);

    // Audio effects: heavy press
    soundManager.playPrintingPress();
    if (projectedAlert >= 75) {
      setTimeout(() => soundManager.playHeartbeat(), 200);
    }

    setTimeout(() => {
      setIsPressing(false);
      const res = printNewspaper(batches);
      setFeedbackMsg({
        text: res.message,
        isError: !res.success,
      });
    }, 450);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left Column: Select Printing Base */}
      <div className="lg:col-span-5 space-y-4">
        <div className="bg-[#241c16] p-4 rounded-lg border border-[#4a3628] shadow-md">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-vintage-title text-base font-bold text-[#f5ebd7] flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-[#e5b358]" />
              <span>1. Chọn Nơi Đặt Xưởng In Bí Mật</span>
            </h3>
          </div>

          <p className="text-xs text-[#b8a28e] leading-relaxed mb-3">
            Nơi đặt xưởng in ảnh hưởng trực tiếp đến sự an toàn. Nơi hẻo lánh như hang đá Pác Bó rất an toàn nhưng cần nhiều công sức; in trong thành phố thì nhanh nhưng tiếng máy in dễ bị mật thám để ý.
          </p>

          <div className="space-y-2.5">
            {availableBases.map((base) => {
              const isSelected = base.id === selectedBase.id;
              return (
                <div
                  key={base.id}
                  onClick={() => selectBase(base.id)}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-[#3b2a1e] border-[#f59e0b] shadow-md ring-1 ring-[#f59e0b]'
                      : 'bg-[#1b1410] border-[#38281d] hover:bg-[#281c15]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-vintage-title text-sm font-bold text-[#f5ebd7]">
                      {base.name}
                    </h4>
                    <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-[#2a1e16] text-[#c9b79c] border border-[#4a3628]">
                      {base.location}
                    </span>
                  </div>

                  <p className="text-xs text-[#a89582] mt-1 line-clamp-2 leading-relaxed">
                    {base.description}
                  </p>

                  <div className="flex items-center justify-between text-[11px] font-mono-code mt-2 pt-1.5 border-t border-[#35251a]">
                    <span className="text-[#34d399] flex items-center space-x-1 font-semibold">
                      <Zap className="w-3 h-3" />
                      <span>Năng suất: x{base.efficiency}</span>
                    </span>
                    <span className="text-red-400 flex items-center space-x-1 font-semibold">
                      <ShieldAlert className="w-3 h-3" />
                      <span>Nguy cơ mật thám: x{base.riskMultiplier}</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Secret Logistics: Buy paper/ink or Lay Low */}
        <div className="bg-[#241c16] p-4 rounded-lg border border-[#4a3628] shadow-md space-y-3">
          <h4 className="font-vintage-title text-sm font-bold text-[#f5ebd7] flex items-center space-x-2">
            <ShoppingCart className="w-4 h-4 text-[#34d399]" />
            <span>Tiếp Tế & Cắt Đuôi Kẻ Thù</span>
          </h4>

          <div className="grid grid-cols-2 gap-2 text-xs">
            {/* Buy Paper */}
            <button
              onClick={() => buySupplies('paper', 15, 25)}
              disabled={funds < 15}
              className="p-2.5 rounded bg-[#1e1713] hover:bg-[#33241a] disabled:opacity-50 text-left border border-[#4a3628] cursor-pointer transition-colors"
            >
              <div className="font-bold text-[#fef3c7]">Mua Giấy in báo</div>
              <div className="text-[11px] text-[#a89582]">+25 Giấy (15 đồng)</div>
            </button>

            {/* Buy Ink */}
            <button
              onClick={() => buySupplies('ink', 15, 20)}
              disabled={funds < 15}
              className="p-2.5 rounded bg-[#1e1713] hover:bg-[#33241a] disabled:opacity-50 text-left border border-[#4a3628] cursor-pointer transition-colors"
            >
              <div className="font-bold text-[#dbeafe]">Mua Mực in thạch</div>
              <div className="text-[11px] text-[#a89582]">+20 Mực (15 đồng)</div>
            </button>
          </div>

          {/* Lay Low Button */}
          <button
            onClick={() => layLow()}
            disabled={funds < 12 || alertLevel === 0}
            className="w-full p-3 rounded-lg bg-[#3b1c14] hover:bg-[#4d2319] disabled:opacity-40 text-left border border-[#8b2616] cursor-pointer transition-all flex items-center justify-between shadow"
          >
            <div>
              <div className="font-bold text-[#fed7aa] flex items-center space-x-1.5">
                <EyeOff className="w-4 h-4 text-[#f59e0b]" />
                <span>Ẩn Nấp & Cắt Đuôi Mật Thám</span>
              </div>
              <div className="text-[11px] text-[#d4b096] mt-0.5">
                Chi 12 đồng quỹ để di chuyển máy in, làm mật thám mất dấu vết!
              </div>
            </div>
            <span className="font-mono-code text-xs text-[#34d399] font-black shrink-0 ml-2">
              -20% Nguy Hiểm
            </span>
          </button>
        </div>
      </div>

      {/* Right Column: Printing Station (Bàn dập in thạch) */}
      <div className="lg:col-span-7 space-y-4">
        <div
          className={`parchment-card p-6 rounded-lg border-2 border-[#5a4231] shadow-xl relative transition-transform ${
            isPressing ? 'animate-press animate-screen-shake' : ''
          }`}
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#5a4231]/40 gap-2 mb-4">
            <div>
              <div className="text-[11px] font-mono-code uppercase tracking-wider text-[#6b4728] font-bold">
                XƯỞNG IN BÁO CÁCH MẠNG
              </div>
              <h3 className="font-vintage-title text-xl font-bold text-[#1f150e]">
                Bàn In Đá Thủ Công ({currentLevel.year})
              </h3>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-xs text-[#523720] font-mono-code block">Đang đặt tại:</span>
              <span className="text-xs font-bold text-[#8b2616] font-vintage-title">
                {selectedBase.name}
              </span>
            </div>
          </div>

          {/* Batch Selector with Friendly Advice */}
          <div className="bg-[#ede4d3] p-4 rounded-lg border border-[#c4b39b] mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase text-[#382516] tracking-wider">
                Số lượt dập in:
              </span>
              <span className="font-mono-code font-bold text-sm text-[#8b2616]">
                {batches} Lượt (In được khoảng ≈ {estimatedCopies} tờ báo)
              </span>
            </div>

            <div className="flex items-center space-x-3 mb-2">
              <button
                onClick={() => setBatches(Math.max(1, batches - 1))}
                className="w-10 h-10 rounded-lg bg-[#d8c8af] hover:bg-[#c9b79b] text-[#24170f] font-bold flex items-center justify-center border border-[#9c8266] cursor-pointer text-lg"
              >
                <Minus className="w-4 h-4" />
              </button>

              <div className="flex-1 bg-[#f5efe3] h-10 rounded-lg border border-[#9c8266] flex items-center justify-center font-mono-code font-bold text-sm text-[#382516]">
                {batches} lượt in liên tiếp
              </div>

              <button
                onClick={() => setBatches(Math.min(5, batches + 1))}
                className="w-10 h-10 rounded-lg bg-[#d8c8af] hover:bg-[#c9b79b] text-[#24170f] font-bold flex items-center justify-center border border-[#9c8266] cursor-pointer text-lg"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <p className="text-[11px] text-[#694b30] italic font-serif">
              💡 Mẹo nhỏ: In càng nhiều lượt thì ra nhiều báo, nhưng tiếng dập đá cùm cụp sẽ làm tăng nhanh mức độ nguy hiểm!
            </p>
          </div>

          {/* Cost & Risk Estimation Box */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center mb-5 font-mono-code">
            <div className="p-2.5 rounded bg-[#f2e9db] border border-[#c7b7a1]">
              <div className="text-[10px] text-[#6b4728] uppercase font-bold">Cần Giấy</div>
              <div className={`text-sm font-bold ${paper < paperNeeded ? 'text-red-600' : 'text-[#2a1c14]'}`}>
                {paperNeeded} <span className="text-[10px] text-[#6b4728]">({paper} có)</span>
              </div>
            </div>

            <div className="p-2.5 rounded bg-[#f2e9db] border border-[#c7b7a1]">
              <div className="text-[10px] text-[#6b4728] uppercase font-bold">Cần Mực</div>
              <div className={`text-sm font-bold ${ink < inkNeeded ? 'text-red-600' : 'text-[#2a1c14]'}`}>
                {inkNeeded} <span className="text-[10px] text-[#6b4728]">({ink} có)</span>
              </div>
            </div>

            <div className="p-2.5 rounded bg-[#f2e9db] border border-[#c7b7a1]">
              <div className="text-[10px] text-[#6b4728] uppercase font-bold">Thu về</div>
              <div className="text-sm font-bold text-[#1e5c2b]">
                +{estimatedCopies} tờ
              </div>
            </div>

            <div className="p-2.5 rounded bg-[#f2e9db] border border-[#c7b7a1]">
              <div className="text-[10px] text-[#6b4728] uppercase font-bold">Tăng nguy hiểm</div>
              <div className={`text-sm font-bold ${projectedAlert >= 75 ? 'text-red-700 animate-pulse' : 'text-[#8b2616]'}`}>
                +{estimatedAlertRisk}%
              </div>
            </div>
          </div>

          {/* Warning banner if high risk */}
          {projectedAlert >= 75 && (
            <div className="mb-4 p-2 bg-red-100 border border-red-400 rounded text-red-900 text-xs font-mono-code flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 animate-bounce" />
              <span>
                CẢNH BÁO: In đợt này sẽ đẩy mức nguy hiểm lên <strong>{projectedAlert}%</strong>! Cân nhắc giảm số lượt hoặc ẩn nấp trước.
              </span>
            </div>
          )}

          {/* Action Button: PRESS PRINTING */}
          <div className="space-y-3">
            <motion.button
              whileHover={{ scale: canAffordPrint ? 1.02 : 1 }}
              whileTap={{ scale: canAffordPrint ? 0.98 : 1 }}
              onClick={handlePrint}
              disabled={!canAffordPrint || isPressing}
              className={`w-full py-4 rounded-xl font-vintage-title text-base sm:text-lg font-black uppercase tracking-wider flex items-center justify-center space-x-3 shadow-2xl border-2 transition-all cursor-pointer ${
                canAffordPrint
                  ? 'bg-gradient-to-b from-[#8b2616] to-[#69180c] hover:from-[#9c2c1a] hover:to-[#781c0e] text-[#fbf5ea] border-[#420f07] shadow-red-950/40'
                  : 'bg-[#826a57] text-[#4a3a2e] border-[#5e4b3c] cursor-not-allowed opacity-60'
              }`}
            >
              <Printer className={`w-6 h-6 ${isPressing ? 'animate-spin' : ''}`} />
              <span>
                {isPressing
                  ? 'Đang lăn mực & dập bàn in thạch...'
                  : canAffordPrint
                  ? 'Bắt Đầu Dập In Báo'
                  : 'Hết Giấy Hoặc Mực In! Hãy Mua Thêm'}
              </span>
            </motion.button>

            {/* Notification message */}
            <AnimatePresence>
              {feedbackMsg && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`p-3 rounded-lg text-xs font-mono-code flex items-start space-x-2 border ${
                    feedbackMsg.isError
                      ? 'bg-red-950/20 text-red-700 border-red-400'
                      : 'bg-emerald-950/20 text-emerald-800 border-emerald-400'
                  }`}
                >
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{feedbackMsg.text}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Current Stockpile / Printed Copies Overview */}
        <div className="bg-[#241c16] p-4 rounded-lg border border-[#4a3628] shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-lg bg-[#3b2a1e] border border-[#5a4231] flex items-center justify-center text-[#f59e0b]">
              <PackageCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-mono-code uppercase text-[#a89582] font-semibold">
                Báo Đang Trữ Trong Kho Bí Mật:
              </span>
              <div className="text-xl font-vintage-title font-bold text-[#fef3c7]">
                {printedCopies} <span className="text-xs font-serif font-normal text-[#c4b09c]">tờ sẵn sàng đi giao</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('distribution')}
            disabled={printedCopies <= 0}
            className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-[#d97706] hover:bg-[#b45309] disabled:opacity-40 text-[#1f140e] font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 cursor-pointer transition-all shadow"
          >
            <span>Sang Bước Đi Giao Báo</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
