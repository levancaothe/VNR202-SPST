import React from 'react';
import { useGameStore } from '../store/useGameStore';
import { GAME_LEVELS } from '../data/gameData';
import {
  FileText,
  Flame,
  Scale,
  Megaphone,
  CheckCircle,
  ArrowRight,
  User,
  Target,
  Sparkles,
  RefreshCw,
  Coins,
} from 'lucide-react';
import { motion } from 'framer-motion';

export const EditorialTab: React.FC = () => {
  const {
    currentLevelIndex,
    currentArticles,
    selectedArticleId,
    selectArticle,
    rerollArticles,
    setActiveTab,
  } = useGameStore();

  const currentLevel = GAME_LEVELS[currentLevelIndex];
  const activeArticle =
    currentArticles.find((a) => a.id === selectedArticleId) ||
    currentArticles[0];

  const getTypeBadge = (type: 'radical' | 'moderate' | 'mass') => {
    switch (type) {
      case 'radical':
        return (
          <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[11px] font-bold bg-red-950/80 text-red-300 border border-red-700">
            <Flame className="w-3 h-3 text-red-400" />
            <span>Đanh Thép (Thức tỉnh mạnh • Nguy cơ cao)</span>
          </span>
        );
      case 'moderate':
        return (
          <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[11px] font-bold bg-amber-950/80 text-amber-300 border border-amber-700">
            <Scale className="w-3 h-3 text-amber-400" />
            <span>Dân Sinh (Đòi cơm áo • Cân bằng an toàn)</span>
          </span>
        );
      case 'mass':
        return (
          <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-700">
            <Megaphone className="w-3 h-3 text-emerald-400" />
            <span>Thơ Vè (Bình dân • Dễ nhớ, quyên góp tốt)</span>
          </span>
        );
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left Column: Select Article / Headline */}
      <div className="lg:col-span-5 space-y-4">
        <div className="bg-[#241c16] p-4 rounded-lg border border-[#4a3628] shadow-md">
          <div className="flex items-center justify-between mb-3 gap-2 flex-wrap">
            <h3 className="font-vintage-title text-base font-bold text-[#f5ebd7] flex items-center space-x-2">
              <FileText className="w-4 h-4 text-[#e5b358]" />
              <span>1. Chọn Bài Viết & Chủ Đề Cho Số Báo</span>
            </h3>

            <button
              onClick={rerollArticles}
              className="px-2.5 py-1 rounded bg-[#35251a] hover:bg-[#4d3625] text-[#fcd34d] border border-[#6b4c34] text-[11px] font-mono-code font-bold flex items-center space-x-1.5 cursor-pointer shadow-sm transition-transform hover:scale-105 active:scale-95"
              title="Hệ thống tự động chọn ngẫu nhiên các bài viết lịch sử khác từ kho tư liệu cách mạng"
            >
              <RefreshCw className="w-3 h-3 text-[#f59e0b]" />
              <span>Đổi Đề Tài Mới</span>
            </button>
          </div>

          <p className="text-xs text-[#b8a28e] leading-relaxed mb-4">
            Mỗi bài viết có tác động khác nhau đến người đọc: bài càng quyết liệt thì lòng dân càng sục sôi nhưng mật thám cũng sẽ lùng sục gắt gao hơn!
          </p>

          {/* List of articles */}
          <div className="space-y-3">
            {currentArticles.map((article) => {
              const isSelected = article.id === activeArticle.id;
              return (
                <motion.div
                  key={article.id}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => selectArticle(article.id)}
                  className={`p-3.5 rounded-lg border cursor-pointer transition-all relative ${
                    isSelected
                      ? 'bg-[#3d2c20] border-[#d97706] shadow-lg ring-1 ring-[#f59e0b]'
                      : 'bg-[#1e1713] border-[#3f2e21] hover:bg-[#2c2017]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div className="flex-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {getTypeBadge(article.type)}
                        {article.trait && (
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono-code font-bold bg-[#120d09] text-amber-300 border border-amber-600/50">
                            {article.trait}
                          </span>
                        )}
                      </div>
                      <h4 className="font-vintage-title text-sm font-bold text-[#faede1] mt-1.5 leading-snug">
                        {article.title}
                      </h4>
                    </div>
                    {isSelected && (
                      <CheckCircle className="w-5 h-5 text-[#f59e0b] shrink-0 mt-1" />
                    )}
                  </div>

                  <p className="text-xs text-[#a89582] line-clamp-2 italic mb-2">
                    "{article.subtitle}"
                  </p>

                  <div className="flex flex-wrap items-center justify-between text-[11px] font-mono-code pt-2 border-t border-[#3a291d] text-[#c4b09c] gap-1">
                    <span className="flex items-center space-x-1">
                      <User className="w-3 h-3 text-[#d97706]" />
                      <span>{article.authorPseudonym}</span>
                    </span>
                    <div className="flex items-center space-x-2">
                      <span className="text-[#34d399] font-semibold">
                        +{article.statBonus.enlightenment}% Giác ngộ
                      </span>
                      <span className="text-red-400 font-semibold">
                        +{article.statBonus.alertLevel}% Nguy cơ
                      </span>
                      {Boolean(article.statBonus.funds) && (
                        <span className="text-emerald-400 font-semibold flex items-center space-x-0.5">
                          <Coins className="w-3 h-3 text-emerald-400" />
                          <span>+{article.statBonus.funds}đ</span>
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Tip / Historical Context box */}
        <div className="bg-[#1f1712] p-3.5 rounded-lg border border-[#3d2b1f] text-xs text-[#a89582] space-y-1.5">
          <div className="font-semibold text-[#e6c280] flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#f59e0b]" />
            <span>Kinh nghiệm biên tập báo chí bí mật</span>
          </div>
          <p className="leading-relaxed">
            Trong điều kiện hiểm nghèo, các tờ báo cách mạng thường kết hợp văn phong ngắn gọn, châm biếm sâu cay và thơ ca bình dị để người không biết chữ cũng có thể nghe đọc và ghi nhớ trong lòng.
          </p>
        </div>
      </div>

      {/* Right Column: Interactive Newspaper Mock Preview (Bản thảo báo in thạch) */}
      <div className="lg:col-span-7">
        <div className="parchment-bg text-[#241a14] rounded-lg p-6 sm:p-8 border-4 border-[#4a3424] shadow-2xl relative overflow-hidden">
          {/* Subtle paper crease / vintage line decoration */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#8b5a2b]/30 to-transparent"></div>

          {/* Rubber Stamp: "ĐÃ DUYỆT BẢN THẢO" */}
          <div className="absolute top-6 right-6 pointer-events-none transform rotate-12 z-10">
            <span className="rubber-stamp stamp-red text-xs sm:text-sm font-black tracking-widest">
              ★ ĐÃ DUYỆT IN ★
            </span>
          </div>

          {/* Newspaper Masthead */}
          <div className="text-center border-b-2 border-[#3d2b1f] pb-4 mb-4">
            <div className="text-[10px] tracking-widest uppercase font-mono-code font-bold text-[#6d4c33] mb-1">
              {currentLevel.newspaperSlogan}
            </div>
            <h2 className="font-vintage-title text-2xl sm:text-4xl font-black tracking-wider text-[#1e140e] uppercase">
              {currentLevel.newspaperName}
            </h2>
            <div className="flex items-center justify-between text-[11px] font-mono-code text-[#4a3628] mt-2 pt-1 border-t border-[#6d4c33]/40 px-2">
              <span>XUẤT BẢN BÍ MẬT</span>
              <span>GIAI ĐOẠN: {currentLevel.year}</span>
              <span>SỐ ĐẶC BIỆT</span>
            </div>
          </div>

          {/* Headline & Subtitle */}
          <div className="mb-4">
            <div className="text-xs uppercase tracking-wider font-bold text-[#8b2616] mb-1 flex items-center space-x-1">
              <span>● BÀI XÃ LUẬN CHỦ ĐẠO</span>
            </div>
            <h3 className="font-vintage-title text-lg sm:text-2xl font-black text-[#1c120c] leading-tight">
              {activeArticle.title}
            </h3>
            <p className="text-xs sm:text-sm italic font-serif text-[#4a3424] mt-1 font-medium">
              "{activeArticle.subtitle}"
            </p>
          </div>

          {/* Article Columns Preview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-serif text-[#2a1c14] leading-relaxed border-t border-b border-[#5c402c]/30 py-3 mb-4">
            <div className="space-y-2 border-r border-[#5c402c]/20 pr-3">
              <p className="first-letter:text-3xl first-letter:font-bold first-letter:font-vintage-title first-letter:float-left first-letter:mr-2 first-letter:text-[#8b2616]">
                {activeArticle.excerpt}
              </p>
              <p className="text-[11px] text-[#4a3628] italic">
                Lời hiệu triệu đã được ban biên tập cân nhắc kỹ lưỡng, truyền bá lý luận cách mạng vào mọi tầng lớp cần lao.
              </p>
            </div>
            <div className="space-y-2.5 text-[11px]">
              <div className="p-2 bg-[#eadfc9]/60 rounded border border-[#8b5a2b]/20">
                <span className="font-bold text-[#1e140e] block font-mono-code mb-1">
                  BÚT DANH BIÊN TẬP:
                </span>
                <span className="font-serif italic text-sm text-[#8b2616] font-bold">
                  {activeArticle.authorPseudonym}
                </span>
              </div>
              <div className="p-2 bg-[#eadfc9]/60 rounded border border-[#8b5a2b]/20">
                <span className="font-bold text-[#1e140e] block font-mono-code mb-0.5">
                  ĐỐI TƯỢNG HƯỚNG ĐẾN:
                </span>
                <span className="text-[#3d2b1f] flex items-center space-x-1">
                  <Target className="w-3 h-3 text-[#d97706]" />
                  <span>{activeArticle.targetClass}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Action: Proceed to Printing Tab */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <div className="text-xs text-[#4a3628] font-mono-code">
              Bản thảo đã hoàn chỉnh. Hãy mang xuống xưởng in để chuẩn bị phôi thạch và giấy in.
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActiveTab('printing')}
              className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-[#8b2616] hover:bg-[#a6301d] text-[#fff] font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg border-2 border-[#54150b] cursor-pointer"
            >
              <span>Chuyển Sang Xưởng In</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};
