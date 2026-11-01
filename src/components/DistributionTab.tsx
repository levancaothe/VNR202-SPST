import React, { useState } from 'react';
import { useGameStore } from '../store/useGameStore';
import {
  DISTRIBUTION_TARGETS,
  DISTRIBUTION_METHODS,
  MAP_POINTS,
} from '../data/gameData';
import { soundManager } from '../utils/audio';
import {
  Send,
  Target,
  Truck,
  Users,
  Radio,
  Coins,
  ShieldAlert,
  AlertCircle,
  PackageOpen,
  Sparkles,
  Map,
  Building2,
  Navigation,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const DistributionTab: React.FC = () => {
  const {
    printedCopies,
    funds,
    selectedTargetId,
    selectedMethodId,
    selectedDestinationId,
    currentLevelIndex,
    selectTarget,
    selectMethod,
    distributeNewspaper,
    setActiveTab,
    setIsMapOpen,
  } = useGameStore();

  const [isDistributing, setIsDistributing] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<{ text: string; isError: boolean } | null>(null);

  const baseIdByLevel = [
    'point-guangzhou',
    'point-nghe-an',
    'point-saigon',
    'point-pac-bo',
  ];
  const currentBaseId = baseIdByLevel[currentLevelIndex] || 'point-guangzhou';
  const currentBase = MAP_POINTS.find((p) => p.id === currentBaseId) || MAP_POINTS[0];
  const selectedDest =
    MAP_POINTS.find((p) => p.id === selectedDestinationId) || MAP_POINTS[2];

  const selectedTarget =
    DISTRIBUTION_TARGETS.find((t) => t.id === selectedTargetId) ||
    DISTRIBUTION_TARGETS[0];
  const selectedMethod =
    DISTRIBUTION_METHODS.find((m) => m.id === selectedMethodId) ||
    DISTRIBUTION_METHODS[0];

  const canDistribute = printedCopies > 0 && funds >= selectedMethod.cost;

  // Approximate calculations taking destination bonus into account
  const volumeFactor = Math.min(2.5, 0.8 + printedCopies / 150);
  const estEnlightenment = Math.round(
    (selectedTarget.enlightenmentGain + selectedDest.bonus.enlightenment) *
      selectedMethod.reachMultiplier *
      volumeFactor *
      0.5
  );
  const estFunds = Math.round(
    selectedTarget.fundsYield * volumeFactor + selectedDest.bonus.funds
  );
  const estRisk = Math.round(
    Math.max(
      -5,
      (selectedTarget.alertRisk +
        selectedDest.bonus.alertRisk -
        selectedMethod.riskReduction) *
        0.6
    )
  );

  const handleDistribute = () => {
    setIsDistributing(true);
    setFeedback(null);

    soundManager.playPaperRustle();
    if (estRisk > 10) {
      setTimeout(() => soundManager.playHeartbeat(), 200);
    }

    setTimeout(() => {
      setIsDistributing(false);
      const res = distributeNewspaper();
      setFeedback({
        text: res.message,
        isError: !res.success,
      });
    }, 450);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Strategic Courier Route Banner */}
      <div className="lg:col-span-12 bg-[#2a1e16] p-4 rounded-xl border-2 border-[#5a4231] shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-lg bg-[#3d2719] border border-[#6b472e] text-[#fcd34d] shrink-0">
            <Navigation className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <div className="text-[10px] font-mono-code uppercase font-bold text-[#f59e0b] tracking-wider">
              TUYẾN ĐƯỜNG GIAO LIÊN CHIẾN LƯỢC
            </div>
            <div className="flex items-center space-x-2 text-sm sm:text-base font-vintage-title font-bold text-[#fdf7ee] mt-0.5 flex-wrap">
              <span className="text-emerald-400 flex items-center space-x-1">
                <Building2 className="w-4 h-4" />
                <span>{currentBase.shortName} (Xưởng In Màn {currentLevelIndex + 1})</span>
              </span>
              <span className="text-[#a89582]">➔</span>
              <span className="text-amber-400 flex items-center space-x-1">
                <Send className="w-4 h-4" />
                <span>{selectedDest.name} (Địa Bàn Tiếp Nhận)</span>
              </span>
            </div>
            <div className="text-xs text-[#c4b09c] mt-0.5 flex items-center space-x-2.5 flex-wrap">
              <span>Vùng: {selectedDest.region}</span>
              <span>•</span>
              <span>Kiểm soát: {selectedDest.dangerLevel}</span>
              <span>•</span>
              <span className="text-emerald-400 font-mono-code font-bold">
                +{selectedDest.bonus.enlightenment}% Lòng Dân
              </span>
              <span>•</span>
              <span className="text-amber-400 font-mono-code font-bold">
                +{selectedDest.bonus.funds}đ Quỹ
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsMapOpen(true)}
          className="px-4 py-2 rounded-lg bg-[#8b2616] hover:bg-[#a62f1c] text-white font-mono-code font-bold text-xs uppercase tracking-wider flex items-center space-x-2 shadow cursor-pointer transition-colors shrink-0"
        >
          <Map className="w-4 h-4 text-amber-300" />
          <span>Đổi Điểm Nhận Trên Bản Đồ</span>
        </button>
      </div>

      {/* Left Column: Select Target & Delivery Method */}
      <div className="lg:col-span-6 space-y-4">
        {/* Step 1: Select Target Reader Audience */}
        <div className="bg-[#241c16] p-4 rounded-lg border border-[#4a3628] shadow-md">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-vintage-title text-base font-bold text-[#f5ebd7] flex items-center space-x-2">
              <Target className="w-4 h-4 text-[#e5b358]" />
              <span>1. Bạn Muốn Gửi Báo Đến Độc Giả Nào?</span>
            </h3>
          </div>

          <p className="text-xs text-[#b8a28e] leading-relaxed mb-3">
            Mỗi tầng lớp nhân dân có một thế mạnh riêng. Hãy chọn đối tượng phù hợp với bài viết đã soạn để đạt hiệu quả cao nhất!
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {DISTRIBUTION_TARGETS.map((target) => {
              const isSelected = target.id === selectedTarget.id;
              return (
                <div
                  key={target.id}
                  onClick={() => selectTarget(target.id)}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-[#3b2a1e] border-[#f59e0b] shadow ring-1 ring-[#f59e0b]'
                      : 'bg-[#1b1410] border-[#38281d] hover:bg-[#281c15]'
                  }`}
                >
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-xl">{target.icon}</span>
                    <h4 className="font-vintage-title text-xs font-bold text-[#faede1]">
                      {target.name}
                    </h4>
                  </div>

                  <p className="text-[11px] text-[#b8a28e] leading-snug line-clamp-2 mb-2 font-serif">
                    {target.description}
                  </p>

                  <div className="flex items-center justify-between text-[10px] font-mono-code pt-1.5 border-t border-[#38281d]">
                    <span className="text-[#a7f3d0] font-bold">
                      +{target.enlightenmentGain}% Lòng Dân
                    </span>
                    <span className="text-[#fca5a5]">
                      +{target.alertRisk}% Cảnh giới
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 2: Select Delivery Method */}
        <div className="bg-[#241c16] p-4 rounded-lg border border-[#4a3628] shadow-md">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-vintage-title text-base font-bold text-[#f5ebd7] flex items-center space-x-2">
              <Truck className="w-4 h-4 text-[#e5b358]" />
              <span>2. Cách Thức Giao Báo & Vận Chuyển Bí Mật</span>
            </h3>
          </div>

          <p className="text-xs text-[#b8a28e] leading-relaxed mb-3">
            Ngụy trang khéo léo giúp báo đến được nhiều nơi mà không làm mật thám nghi ngờ.
          </p>

          <div className="space-y-2">
            {DISTRIBUTION_METHODS.map((method) => {
              const isSelected = method.id === selectedMethod.id;
              return (
                <div
                  key={method.id}
                  onClick={() => selectMethod(method.id)}
                  className={`p-3 rounded-lg border cursor-pointer transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-[#3b2a1e] border-[#f59e0b] shadow ring-1 ring-[#f59e0b]'
                      : 'bg-[#1b1410] border-[#38281d] hover:bg-[#281c15]'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{method.icon}</span>
                    <div>
                      <h4 className="font-vintage-title text-xs font-bold text-[#faede1]">
                        {method.name}
                      </h4>
                      <p className="text-[11px] text-[#b8a28e] leading-snug font-serif">
                        {method.description}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0 font-mono-code text-[11px]">
                    <div className="text-[#a7f3d0] font-bold">
                      {method.cost > 0 ? `Chi: ${method.cost}đ quỹ` : 'Miễn phí'}
                    </div>
                    <div className="text-[#fcd34d] font-semibold">
                      x{method.reachMultiplier} Lan tỏa
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right Column: Tactical Distribution Dispatch (Hồ sơ xuất xưởng) */}
      <div className="lg:col-span-6 space-y-4">
        <div className="parchment-bg p-6 rounded-lg border-2 border-[#5a4231] shadow-2xl relative text-[#2b1f17]">
          {/* Top Label */}
          <div className="border-b-2 border-[#4a3424] pb-3 mb-4 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono-code uppercase font-bold tracking-widest text-[#734928]">
                LỆNH ĐIỀU ĐỘNG GIAO LIÊN
              </span>
              <h3 className="font-vintage-title text-xl font-black text-[#1e140d]">
                Kế Hoạch Đưa Báo Đến Quần Chúng
              </h3>
            </div>
            <div className="text-right">
              <span className="rubber-stamp stamp-green text-[10px] font-black">
                BẢO MẬT TUYỆT ĐỐI
              </span>
            </div>
          </div>

          {/* Current Stockpile Status */}
          <div className="p-3 bg-[#ede2cf] rounded-lg border border-[#ba9e7d] mb-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <PackageOpen className="w-5 h-5 text-[#8b2616]" />
              <span className="text-xs font-bold font-mono-code text-[#3a2517]">
                Số báo đang có sẵn trong kho:
              </span>
            </div>
            <span className="text-xl font-vintage-title font-black text-[#8b2616]">
              {printedCopies} tờ
            </span>
          </div>

          {/* Plan Summary Matrix */}
          <div className="space-y-2.5 text-xs mb-5 font-serif">
            <div className="flex justify-between py-1.5 border-b border-[#ba9e7d]/60">
              <span className="text-[#593d25] font-semibold">Tuyến chuyển báo:</span>
              <span className="font-bold text-[#8b2616] flex items-center space-x-1">
                <span>{currentBase.shortName}</span>
                <span className="text-[#734928]">➔</span>
                <span>{selectedDest.name}</span>
              </span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-[#ba9e7d]/60">
              <span className="text-[#593d25] font-semibold">Gửi báo cho:</span>
              <span className="font-bold text-[#1f150e]">
                {selectedTarget.name}
              </span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-[#ba9e7d]/60">
              <span className="text-[#593d25] font-semibold">Cách ngụy trang di chuyển:</span>
              <span className="font-bold text-[#1f150e]">
                {selectedMethod.name}
              </span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-[#ba9e7d]/60">
              <span className="text-[#593d25] font-semibold">Tiền lộ phí giao liên:</span>
              <span className={`font-mono-code font-bold ${funds < selectedMethod.cost ? 'text-red-700' : 'text-[#1e150e]'}`}>
                {selectedMethod.cost} đồng quỹ (Bạn hiện có: {funds}đ)
              </span>
            </div>
          </div>

          {/* Expected Outcome Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center mb-6 font-mono-code">
            <div className="p-2 rounded bg-[#e8dac1] border border-[#b89e7e]">
              <div className="text-[10px] text-[#63452c] font-bold flex items-center justify-center space-x-0.5">
                <Radio className="w-3 h-3 text-[#d97706]" />
                <span>Lòng Dân</span>
              </div>
              <div className="text-sm font-bold text-[#1e5c2b]">
                +{estEnlightenment}%
              </div>
            </div>

            <div className="p-2 rounded bg-[#e8dac1] border border-[#b89e7e]">
              <div className="text-[10px] text-[#63452c] font-bold flex items-center justify-center space-x-0.5">
                <Users className="w-3 h-3 text-[#db2777]" />
                <span>Cơ Sở Mới</span>
              </div>
              <div className="text-sm font-bold text-[#3d2516]">
                ~{selectedTarget.cellChance + selectedDest.bonus.cellChance}%
              </div>
            </div>

            <div className="p-2 rounded bg-[#e8dac1] border border-[#b89e7e]">
              <div className="text-[10px] text-[#63452c] font-bold flex items-center justify-center space-x-0.5">
                <Coins className="w-3 h-3 text-[#059669]" />
                <span>Quyên Góp</span>
              </div>
              <div className="text-sm font-bold text-[#047857]">
                +{estFunds} đ
              </div>
            </div>

            <div className="p-2 rounded bg-[#e8dac1] border border-[#b89e7e]">
              <div className="text-[10px] text-[#63452c] font-bold flex items-center justify-center space-x-0.5">
                <ShieldAlert className="w-3 h-3 text-red-600" />
                <span>Nguy Cơ</span>
              </div>
              <div className={`text-sm font-bold ${estRisk > 0 ? 'text-red-700' : 'text-emerald-700'}`}>
                {estRisk > 0 ? `+${estRisk}%` : `${estRisk}%`}
              </div>
            </div>
          </div>

          {/* Execution Button with Dramatic Pulse */}
          <div className="space-y-3">
            <motion.button
              whileHover={{ scale: canDistribute ? 1.02 : 1 }}
              whileTap={{ scale: canDistribute ? 0.98 : 1 }}
              onClick={handleDistribute}
              disabled={!canDistribute || isDistributing}
              className={`w-full py-4 rounded-xl font-vintage-title text-base sm:text-lg font-black uppercase tracking-wider flex items-center justify-center space-x-3 shadow-2xl border-2 transition-all cursor-pointer ${
                canDistribute
                  ? 'bg-gradient-to-b from-[#b45309] to-[#78350f] hover:from-[#c25e12] hover:to-[#8c3f12] text-[#fffdfa] border-[#451e06] shadow-amber-950/40'
                  : 'bg-[#826a57] text-[#4a3a2e] border-[#5e4b3c] cursor-not-allowed opacity-60'
              }`}
            >
              <Send className={`w-5 h-5 ${isDistributing ? 'animate-bounce' : ''}`} />
              <span>
                {isDistributing
                  ? 'Giao liên đang vượt trạm kiểm soát...'
                  : printedCopies <= 0
                  ? 'Kho Trống! Hãy In Báo Trước'
                  : funds < selectedMethod.cost
                  ? 'Thiếu Tiền Lộ Phí Giao Liên'
                  : `Phát Hành Về ${selectedDest.shortName}`}
              </span>
            </motion.button>

            {/* If zero copies, quick link to printing tab */}
            {printedCopies <= 0 && (
              <p className="text-xs text-center font-mono-code text-[#734c2b]">
                Kho đang trống. Hãy quay lại{' '}
                <button
                  onClick={() => setActiveTab('printing')}
                  className="text-[#8b2616] font-bold underline cursor-pointer"
                >
                  Bước 2: Xưởng In
                </button>{' '}
                để dập thêm báo trước khi đi giao.
              </p>
            )}

            {/* Notification message */}
            <AnimatePresence>
              {feedback && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`p-3 rounded-lg text-xs font-mono-code flex items-start space-x-2 border ${
                    feedback.isError
                      ? 'bg-red-950/20 text-red-800 border-red-400'
                      : 'bg-emerald-950/20 text-emerald-900 border-emerald-400'
                  }`}
                >
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{feedback.text}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Small Historical Note */}
        <div className="bg-[#1f1712] p-3.5 rounded-lg border border-[#3d2b1f] text-xs text-[#a89582] space-y-1.5">
          <div className="font-semibold text-[#e6c280] flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#f59e0b]" />
            <span>Mưu trí của người giao liên cách mạng</span>
          </div>
          <p className="leading-relaxed">
            Nhiều giao liên tài tình đã biến đòn gánh tre rỗng ruột thành hộp bí mật, hay dán tài liệu vào bụng cá, giấu trong bồ thóc để vượt qua hàng chục đồn bốt của giặc một cách êm thấm.
          </p>
        </div>
      </div>
    </div>
  );
};
