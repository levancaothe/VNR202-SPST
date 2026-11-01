import React from 'react';
import { useGameStore } from '../store/useGameStore';
import { History, X, CheckCircle, AlertTriangle, Info, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

export const HistoryLogModal: React.FC = () => {
  const { isLogOpen, setIsLogOpen, historyLog } = useGameStore();

  if (!isLogOpen) return null;

  const getLogIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />;
      case 'danger':
        return <ShieldAlert className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />;
      default:
        return <Info className="w-4 h-4 text-[#8b5a2b] shrink-0 mt-0.5" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        className="parchment-bg max-w-2xl w-full rounded-2xl border-4 border-[#523b2b] shadow-2xl overflow-hidden flex flex-col max-h-[85vh] my-auto text-[#2b1f16]"
      >
        {/* Header */}
        <div className="bg-[#1f1611] px-6 py-4 flex items-center justify-between border-b-2 border-[#453123] text-[#f7eedc]">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded bg-[#3b271a] border border-[#6b472e] text-[#f59e0b]">
              <History className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-vintage-title text-lg font-bold tracking-wide">
                Nhật Ký Hoạt Động Cách Mạng
              </h2>
              <p className="text-xs text-[#a89582] font-mono-code">
                Biên niên sự kiện xuất bản và phân phối bí mật
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsLogOpen(false)}
            className="p-1.5 rounded-lg bg-[#2e2017] hover:bg-[#473224] text-[#d4c1ad] border border-[#523927] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="p-6 overflow-y-auto flex-1 space-y-3 bg-[#f7efe0]">
          {historyLog.length === 0 ? (
            <p className="text-center py-10 text-xs font-mono-code text-[#735133]">
              Chưa có sự kiện nào được ghi nhận.
            </p>
          ) : (
            historyLog.map((item) => (
              <div
                key={item.id}
                className="p-3 bg-[#ede2cf] rounded-lg border border-[#baa48b] flex items-start space-x-3 text-xs leading-relaxed"
              >
                {getLogIcon(item.type)}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono-code font-bold text-[10px] text-[#8b2616] uppercase">
                      NĂM {item.year}
                    </span>
                  </div>
                  <p className="font-serif text-[#291c14] font-medium">
                    {item.text}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
};
