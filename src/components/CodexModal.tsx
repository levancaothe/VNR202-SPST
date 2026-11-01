import React, { useState } from 'react';
import { useGameStore } from '../store/useGameStore';
import { CODEX_DATABASE } from '../data/gameData';
import {
  BookOpen,
  X,
  Lock,
  Calendar,
  UserCheck,
  Bookmark,
  ScrollText,
  FileCheck2,
} from 'lucide-react';
import { motion } from 'framer-motion';

export const CodexModal: React.FC = () => {
  const { isCodexOpen, setIsCodexOpen, unlockedCodexIds } = useGameStore();
  const [selectedId, setSelectedId] = useState<string>(CODEX_DATABASE[0].id);

  if (!isCodexOpen) return null;

  const activeItem =
    CODEX_DATABASE.find((c) => c.id === selectedId) || CODEX_DATABASE[0];
  const isUnlocked =
    activeItem.unlockedByDefault || unlockedCodexIds.includes(activeItem.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        className="parchment-bg max-w-4xl w-full rounded-2xl border-4 border-[#523b2b] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] my-auto"
      >
        {/* Modal Top Header */}
        <div className="bg-[#1f1611] px-6 py-4 flex items-center justify-between border-b-2 border-[#453123] text-[#f7eedc]">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded bg-[#3b271a] border border-[#6b472e] text-[#f59e0b]">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-vintage-title text-lg sm:text-xl font-bold tracking-wide">
                Kho Tư Liệu Báo Chí Cách Mạng Việt Nam
              </h2>
              <p className="text-xs text-[#a89582] font-mono-code">
                Trích lục tư liệu lịch sử Đảng Cộng sản Việt Nam (1925 - 1945)
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsCodexOpen(false)}
            className="p-1.5 rounded-lg bg-[#2e2017] hover:bg-[#473224] text-[#d4c1ad] border border-[#523927] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Left sidebar list & Right details view */}
        <div className="grid grid-cols-1 md:grid-cols-12 flex-1 overflow-hidden">
          {/* Left Column: Index of Newspapers */}
          <div className="md:col-span-4 bg-[#f0e4cf] border-r-2 border-[#b89e7e] p-3 sm:p-4 overflow-y-auto space-y-2 max-h-[220px] md:max-h-[600px]">
            <div className="text-[11px] font-mono-code font-bold uppercase text-[#63452c] px-2 mb-1">
              Ấn Phẩm Lịch Sử:
            </div>
            {CODEX_DATABASE.map((item) => {
              const itemUnlocked =
                item.unlockedByDefault || unlockedCodexIds.includes(item.id);
              const isSelected = item.id === selectedId;

              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedId(item.id)}
                  className={`p-3 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-[#e0cfb3] border-[#8b2616] shadow-sm font-bold'
                      : 'bg-[#faf3e6] border-[#cfbea6] hover:bg-[#eadeca]'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <span className="text-xl">{item.mastheadImage}</span>
                    <div>
                      <h4 className="text-xs font-vintage-title font-bold text-[#1f150e]">
                        {item.title}
                      </h4>
                      <span className="text-[10px] text-[#6d4d33] font-mono-code">
                        {item.year}
                      </span>
                    </div>
                  </div>

                  {!itemUnlocked && (
                    <Lock className="w-3.5 h-3.5 text-[#8c6b4f]" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Detailed Document Exhibit */}
          <div className="md:col-span-8 p-6 sm:p-8 overflow-y-auto max-h-[500px] md:max-h-[600px] text-[#241a14] bg-[#f7f0e3]">
            {isUnlocked ? (
              <div className="space-y-6">
                {/* Title Banner */}
                <div className="border-b-2 border-[#4a3424] pb-4">
                  <div className="flex items-center space-x-2 text-xs font-mono-code text-[#8b2616] font-bold mb-1">
                    <Bookmark className="w-4 h-4" />
                    <span>HỒ SƠ TƯ LIỆU SỐ {activeItem.levelId}</span>
                  </div>
                  <h3 className="font-vintage-title text-2xl sm:text-3xl font-black text-[#1a110a]">
                    {activeItem.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-serif italic text-[#593c25] mt-1 font-medium">
                    {activeItem.subtitle}
                  </p>
                </div>

                {/* Metadata grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono-code">
                  <div className="p-2.5 bg-[#eae0cb] rounded border border-[#b89e7e]">
                    <span className="text-[#63452c] font-bold block mb-0.5 flex items-center space-x-1">
                      <Calendar className="w-3.5 h-3.5 text-[#8b2616]" />
                      <span>THỜI KỲ XUẤT BẢN:</span>
                    </span>
                    <span className="font-bold text-[#1e130a]">{activeItem.year}</span>
                  </div>
                  <div className="p-2.5 bg-[#eae0cb] rounded border border-[#b89e7e]">
                    <span className="text-[#63452c] font-bold block mb-0.5 flex items-center space-x-1">
                      <UserCheck className="w-3.5 h-3.5 text-[#8b2616]" />
                      <span>CHỦ TRƯƠNG / SÁNG LẬP:</span>
                    </span>
                    <span className="font-bold text-[#1e130a]">{activeItem.editorInChief}</span>
                  </div>
                </div>

                {/* Historical Significance */}
                <div>
                  <h4 className="font-vintage-title text-sm font-bold uppercase text-[#8b2616] mb-2 flex items-center space-x-1.5">
                    <ScrollText className="w-4 h-4" />
                    <span>Ý Nghĩa Lịch Sử & Đóng Góp Cách Mạng</span>
                  </h4>
                  <p className="font-serif text-xs sm:text-sm text-[#2b1f17] leading-relaxed bg-[#f2e7d3] p-4 rounded-lg border border-[#c4ae95]">
                    {activeItem.historicalSignificance}
                  </p>
                </div>

                {/* Authentic Historical Excerpt */}
                <div className="p-4 bg-[#ede0ca] border-l-4 border-[#8b2616] rounded-r-lg">
                  <span className="text-[10px] font-mono-code uppercase font-bold text-[#63452c] block mb-1">
                    Trích đoạn nguyên văn đanh thép:
                  </span>
                  <p className="font-serif text-sm italic font-bold text-[#1f140e] leading-relaxed">
                    {activeItem.excerpt}
                  </p>
                </div>

                {/* Source attribution */}
                <div className="text-[11px] font-mono-code text-[#6b4c33] pt-2 border-t border-[#bfa88c] flex items-center space-x-1.5">
                  <FileCheck2 className="w-4 h-4 text-[#8b2616]" />
                  <span>Nguồn: {activeItem.documentSource}</span>
                </div>
              </div>
            ) : (
              <div className="text-center py-16 px-4 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#e3d3bc] border-2 border-[#9c8266] flex items-center justify-center mx-auto text-[#6b4c33]">
                  <Lock className="w-8 h-8" />
                </div>
                <h3 className="font-vintage-title text-xl font-bold text-[#1e140d]">
                  Tư Liệu Chưa Được Mở Khóa
                </h3>
                <p className="text-xs font-serif text-[#543b27] max-w-sm mx-auto">
                  Hãy hoàn thành các nhiệm vụ giác ngộ của <strong>Màn {activeItem.levelId}</strong> để giải mã toàn bộ hồ sơ lưu chiểu của ấn phẩm này!
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
