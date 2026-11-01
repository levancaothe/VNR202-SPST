import React, { useEffect } from 'react';
import { useGameStore } from '../store/useGameStore';
import { type ScenarioOption } from '../data/gameData';
import { soundManager } from '../utils/audio';
import {
  AlertTriangle,
  Mail,
  CheckCircle2,
  XCircle,
  Sparkles,
} from 'lucide-react';
import { motion } from 'framer-motion';

export const EventModal: React.FC = () => {
  const { activeEvent, resolveEventOption } = useGameStore();

  useEffect(() => {
    if (activeEvent) {
      const isDangerous =
        activeEvent.title.toLowerCase().includes('mật thám') ||
        activeEvent.title.toLowerCase().includes('khám xét') ||
        activeEvent.title.toLowerCase().includes('tịch thu') ||
        activeEvent.title.toLowerCase().includes('đột xuất');

      if (isDangerous) {
        soundManager.playPoliceWhistle();
        setTimeout(() => soundManager.playDramaticBoom(), 250);
      } else {
        soundManager.playDramaticBoom();
      }
    }
  }, [activeEvent]);

  if (!activeEvent) return null;

  const renderEffectSummary = (eff: ScenarioOption['effect']) => {
    const positives: string[] = [];
    const negatives: string[] = [];

    if (eff.enlightenment && eff.enlightenment > 0) positives.push(`+${eff.enlightenment}% Lòng dân giác ngộ`);
    if (eff.funds && eff.funds > 0) positives.push(`+${eff.funds}đ Tiền quỹ`);
    if (eff.paper && eff.paper > 0) positives.push(`+${eff.paper} Giấy in`);
    if (eff.ink && eff.ink > 0) positives.push(`+${eff.ink} Mực in`);
    if (eff.secretCells && eff.secretCells > 0) positives.push(`+${eff.secretCells} Cơ sở mới`);
    if (eff.alertLevel && eff.alertLevel < 0) positives.push(`${eff.alertLevel}% Nguy cơ (Mật thám mất dấu)`);

    if (eff.alertLevel && eff.alertLevel > 0) negatives.push(`+${eff.alertLevel}% Nguy cơ mật thám theo dõi`);
    if (eff.funds && eff.funds < 0) negatives.push(`${eff.funds}đ Tiền quỹ`);
    if (eff.paper && eff.paper < 0) negatives.push(`${eff.paper} Giấy in`);
    if (eff.ink && eff.ink < 0) negatives.push(`${eff.ink} Mực in`);
    if (eff.enlightenment && eff.enlightenment < 0) negatives.push(`${eff.enlightenment}% Lòng dân`);

    return (
      <div className="space-y-1 mt-2 text-xs font-mono-code">
        {positives.length > 0 && (
          <div className="flex items-center space-x-1.5 text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded border border-emerald-300">
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-600" />
            <span className="font-semibold">{positives.join(' • ')}</span>
          </div>
        )}
        {negatives.length > 0 && (
          <div className="flex items-center space-x-1.5 text-red-800 bg-red-100/80 px-2 py-0.5 rounded border border-red-300">
            <XCircle className="w-3.5 h-3.5 shrink-0 text-red-600" />
            <span className="font-semibold">{negatives.join(' • ')}</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={{ scale: 0.88, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.88, opacity: 0, y: 30 }}
        className="parchment-bg max-w-xl w-full p-6 sm:p-8 rounded-2xl border-4 border-[#8b2616] shadow-2xl relative text-[#291c14] my-8 animate-screen-shake"
      >
        {/* Red Wax Seal Graphic with Stamp slam */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-[#8b2616] border-4 border-[#e5c07b] flex items-center justify-center shadow-xl animate-stamp-slam">
          <Mail className="w-6 h-6 text-[#fed7aa]" />
        </div>

        {/* Top Header */}
        <div className="text-center pt-4 mb-4 border-b-2 border-[#5c402c]/40 pb-3">
          <span className="rubber-stamp stamp-red text-xs font-black tracking-widest mb-1.5 inline-block">
            🚨 MẬT THƯ KHẨN CẤP 🚨
          </span>
          <h2 className="font-vintage-title text-xl sm:text-2xl font-black text-[#1e130c] mt-1 leading-snug">
            {activeEvent.title}
          </h2>
        </div>

        {/* Historical Context if available */}
        {activeEvent.historicalContext && (
          <div className="mb-3 p-2.5 bg-[#ebdcc4] rounded-lg border border-[#b89e7e] text-xs font-serif italic text-[#523924] flex items-start space-x-1.5">
            <Sparkles className="w-4 h-4 text-[#8b2616] shrink-0 mt-0.5" />
            <span><strong>Bối cảnh thực tế:</strong> {activeEvent.historicalContext}</span>
          </div>
        )}

        {/* Narrative Description */}
        <p className="font-serif text-xs sm:text-sm text-[#2b1e16] leading-relaxed mb-5 bg-[#f7efe0]/80 p-4 rounded-lg border border-[#c4ae95] shadow-inner font-medium">
          {activeEvent.description}
        </p>

        {/* Decision Options */}
        <div className="space-y-3">
          <div className="text-xs font-mono-code font-bold uppercase tracking-wider text-[#6e4626] flex items-center space-x-1">
            <AlertTriangle className="w-3.5 h-3.5 text-[#d97706]" />
            <span>BẠN SẼ CHỌN CÁCH XỬ TRÍ NÀO?</span>
          </div>

          {activeEvent.options.map((option, idx) => (
            <motion.button
              key={idx}
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
              onClick={() => resolveEventOption(option)}
              className="w-full text-left p-3.5 rounded-xl bg-[#f0e4cf] hover:bg-[#e6d6be] border-2 border-[#8a684b] hover:border-[#8b2616] transition-all cursor-pointer shadow-md group"
            >
              <div className="flex items-start space-x-2.5">
                <span className="w-6 h-6 rounded-full bg-[#3d291b] text-[#fef3c7] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#8b2616] transition-colors shadow">
                  {idx + 1}
                </span>
                <div className="flex-1">
                  <p className="font-serif text-xs sm:text-sm font-bold text-[#1f140e] group-hover:text-[#8b2616] leading-snug">
                    {option.text}
                  </p>
                  {renderEffectSummary(option.effect)}
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
