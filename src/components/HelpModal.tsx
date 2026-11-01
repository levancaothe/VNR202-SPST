import React from 'react';
import { useGameStore } from '../store/useGameStore';
import {
  X,
  FileText,
  Coins,
  Radio,
  AlertTriangle,
  Users,
  Compass,
  CheckCircle,
  Sparkles,
} from 'lucide-react';
import { motion } from 'framer-motion';

export const HelpModal: React.FC = () => {
  const { isHelpOpen, setIsHelpOpen } = useGameStore();

  if (!isHelpOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        className="parchment-bg max-w-2xl w-full rounded-2xl border-4 border-[#523b2b] shadow-2xl overflow-hidden flex flex-col max-h-[88vh] my-auto text-[#2b1f16]"
      >
        {/* Top Header */}
        <div className="bg-[#1f1611] px-6 py-4 flex items-center justify-between border-b-2 border-[#453123] text-[#f7eedc]">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded bg-[#3b271a] border border-[#6b472e] text-[#f59e0b]">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-vintage-title text-lg font-bold tracking-wide">
                Hướng Dẫn Chơi Dành Cho Bạn
              </h2>
              <p className="text-xs text-[#a89582] font-mono-code">
                Mẹo sinh tồn và cách chiến thắng game cực kỳ đơn giản
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsHelpOpen(false)}
            className="p-1.5 rounded-lg bg-[#2e2017] hover:bg-[#473224] text-[#d4c1ad] border border-[#523927] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 bg-[#f7efe0] text-xs sm:text-sm font-serif leading-relaxed">
          {/* Welcome Note */}
          <div className="p-3 bg-[#e8dbc5] rounded-lg border border-[#baa48b] text-[#382618]">
            <p className="font-bold flex items-center space-x-1.5 mb-1 text-[#8b2616]">
              <Sparkles className="w-4 h-4 text-[#d97706]" />
              <span>Chào mừng bạn đến với chiến khu cách mạng!</span>
            </p>
            <p className="text-xs leading-relaxed">
              Bạn vào vai người phụ trách tờ báo bí mật của Đảng từ năm 1925 đến Cách mạng Tháng Tám năm 1945. Mục tiêu của bạn là <strong>lan tỏa lòng yêu nước</strong> đến nhân dân mà <strong>không để mật thám Pháp tóm được</strong>!
            </p>
          </div>

          {/* Loop Summary */}
          <div>
            <h3 className="font-vintage-title text-sm font-bold uppercase text-[#8b2616] mb-2 flex items-center space-x-1.5">
              <CheckCircle className="w-4 h-4 text-[#8b2616]" />
              <span>Vòng chơi 3 bước rất dễ nhớ:</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 font-mono-code text-xs">
              <div className="p-3 bg-[#ede1ce] rounded-lg border border-[#baa48b]">
                <span className="font-bold text-[#8b2616] block mb-1">Bước 1: Chọn Bài</span>
                Chọn chủ đề bài viết. Bài càng đanh thép thì dân càng thức tỉnh nhanh, nhưng mật thám cũng sẽ lùng gắt hơn.
              </div>
              <div className="p-3 bg-[#ede1ce] rounded-lg border border-[#baa48b]">
                <span className="font-bold text-[#8b2616] block mb-1">Bước 2: Dập In Báo</span>
                Chọn số lượng muốn in. Cần chuẩn bị đủ Giấy và Mực. Tiếng dập máy in sẽ làm tăng nhẹ mức độ nguy hiểm!
              </div>
              <div className="p-3 bg-[#ede1ce] rounded-lg border border-[#baa48b]">
                <span className="font-bold text-[#8b2616] block mb-1">Bước 3: Đi Giao Báo</span>
                Chọn đối tượng nhận báo (công nhân, nông dân...) và cách ngụy trang. Bạn sẽ thu về điểm Giác Ngộ và Tiền quỹ!
              </div>
            </div>
          </div>

          {/* Stats Breakdown */}
          <div>
            <h3 className="font-vintage-title text-sm font-bold uppercase text-[#8b2616] mb-2">
              Các chỉ số bạn cần lưu ý:
            </h3>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 bg-[#efe5d4] rounded border border-[#baa48b] flex items-center space-x-3">
                <Radio className="w-5 h-5 text-[#d97706] shrink-0" />
                <div>
                  <strong>📢 Lòng Dân Giác Ngộ (%):</strong> Đây là mục tiêu chiến thắng của mỗi màn! Đạt đủ % yêu cầu thì bạn sẽ bước sang thời kỳ lịch sử tiếp theo.
                </div>
              </div>

              <div className="p-2.5 bg-[#fee2e2] rounded border border-red-300 flex items-center space-x-3">
                <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 animate-bounce" />
                <div>
                  <strong className="text-red-900">🚨 Mức Độ Nguy Hiểm (0 - 100%):</strong> Mật thám Pháp theo dõi bạn. Nếu chạm <strong>100%</strong>, bạn sẽ bị bắt và Thua cuộc! Nếu thấy mức này lên quá <strong>60%</strong>, hãy vào Tab In Ấn và bấm nút <em>"Ẩn nấp & Cắt đuôi"</em> ngay nhé!
                </div>
              </div>

              <div className="p-2.5 bg-[#efe5d4] rounded border border-[#baa48b] flex items-center space-x-3">
                <FileText className="w-5 h-5 text-[#d97706] shrink-0" />
                <div>
                  <strong>📜 Giấy in & ✒️ Mực in:</strong> Nguyên liệu cần để dập báo. Nếu hết, hãy dùng tiền quỹ để mua thêm ở Tab In Ấn.
                </div>
              </div>

              <div className="p-2.5 bg-[#efe5d4] rounded border border-[#baa48b] flex items-center space-x-3">
                <Coins className="w-5 h-5 text-[#059669] shrink-0" />
                <div>
                  <strong>💰 Tiền Quỹ:</strong> Thu được từ bà con nhân dân quyên góp ủng hộ khi bạn phát hành báo. Dùng để trả tiền giao liên hoặc mua sắm nguyên liệu.
                </div>
              </div>

              <div className="p-2.5 bg-[#efe5d4] rounded border border-[#baa48b] flex items-center space-x-3">
                <Users className="w-5 h-5 text-[#db2777] shrink-0" />
                <div>
                  <strong>🏛️ Cơ Sở Bí Mật:</strong> Số lượng chi bộ được thành lập sau khi nhân dân được giác ngộ. Càng nhiều chi bộ, lực lượng cách mạng càng hùng hậu!
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
