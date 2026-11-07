import React, { useState } from 'react';
import { useGameStore } from '../store/useGameStore';
import { Download, X, Award, Loader2, CheckCircle2, Image as ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import jsPDF from 'jspdf';
import { soundManager } from '../utils/audio';
import { drawNewspaperCertificate } from '../utils/newspaperCanvas';

export const NewspaperPrintModal: React.FC = () => {
  const {
    isPrintCertificateOpen,
    setIsPrintCertificateOpen,
    totalDistributed,
    secretCells,
  } = useGameStore();

  const [comradeName, setComradeName] = useState<string>('Nguyễn Văn Yêu Nước');
  const [comradeRole, setComradeRole] = useState<string>('Tổng Biên Tập Báo Cách Mạng');
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  if (!isPrintCertificateOpen) return null;

  // Direct, rock-solid PDF generation using Canvas 2D API & jsPDF
  const handleExportPDF = async () => {
    if (isExporting) return;

    try {
      setIsExporting(true);
      setDownloadSuccess(null);

      // Brief pause for smooth UI reaction
      await new Promise((resolve) => setTimeout(resolve, 100));

      // 1. Draw high-resolution vintage newspaper directly on Canvas (no html2canvas oklch crash!)
      const canvas = drawNewspaperCertificate({
        comradeName: comradeName.trim() || 'Nguyễn Văn Yêu Nước',
        comradeRole: comradeRole || 'Tổng Biên Tập Báo Cách Mạng',
        totalDistributed,
        secretCells,
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.96);

      // 2. Embed into standard A4 PDF (210 x 297 mm)
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297);

      const sanitizedName = (comradeName.trim() || 'Cach_Mang').replace(/[^a-zA-Z0-9_\u00C0-\u1EF9]/g, '_');
      const fileName = `To_Bao_Ky_Niem_Viet_Nam_Doc_Lap_${sanitizedName}.pdf`;

      // 3. Trigger download via jsPDF and fallback anchor
      try {
        pdf.save(fileName);
      } catch (saveErr) {
        // Fallback for sandboxed webviews
        const blob = pdf.output('blob');
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }

      soundManager.playStamp();
      setDownloadSuccess('Đã xuất và tải file PDF báo lưu niệm về máy thành công!');
      setTimeout(() => setDownloadSuccess(null), 4000);
    } catch (err) {
      console.error('Lỗi xuất PDF:', err);
      alert('Không thể tạo file PDF. Xin vui lòng thử lại!');
    } finally {
      setIsExporting(false);
    }
  };

  // Optional direct High-Res PNG download for social sharing
  const handleDownloadPNG = () => {
    try {
      const canvas = drawNewspaperCertificate({
        comradeName: comradeName.trim() || 'Nguyễn Văn Yêu Nước',
        comradeRole: comradeRole || 'Tổng Biên Tập Báo Cách Mạng',
        totalDistributed,
        secretCells,
      });

      const dataUrl = canvas.toDataURL('image/png');
      const sanitizedName = (comradeName.trim() || 'Cach_Mang').replace(/[^a-zA-Z0-9_\u00C0-\u1EF9]/g, '_');
      const fileName = `To_Bao_Ky_Niem_Viet_Nam_Doc_Lap_${sanitizedName}.png`;

      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      soundManager.playStamp();
      setDownloadSuccess('Đã tải ảnh báo lưu niệm (PNG chất lượng cao) thành công!');
      setTimeout(() => setDownloadSuccess(null), 4000);
    } catch (err) {
      console.error('Lỗi tải ảnh PNG:', err);
    }
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="parchment-bg max-w-2xl w-full rounded-2xl border-4 border-[#8b2616] shadow-2xl overflow-hidden flex flex-col max-h-[92vh] my-auto text-[#241a14]"
      >
        {/* Top Control Bar */}
        <div className="bg-[#1f1611] px-6 py-3.5 flex items-center justify-between border-b-2 border-[#453123] text-[#f7eedc]">
          <div className="flex items-center space-x-2 text-xs font-mono-code text-[#e5c07b] font-bold">
            <Award className="w-4 h-4 text-[#f59e0b]" />
            <span>XUẤT BẢN BÁO LƯU NIỆM CÁ NHÂN (XUẤT PDF)</span>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              onClick={handleExportPDF}
              disabled={isExporting}
              className="px-3.5 py-1.5 rounded-lg bg-[#8b2616] hover:bg-[#a62f1c] text-white font-mono-code font-bold text-xs uppercase flex items-center space-x-1.5 cursor-pointer shadow-lg transition-transform hover:scale-102 disabled:opacity-50"
              title="Xuất trực tiếp file PDF chuẩn in ấn A4"
            >
              {isExporting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-yellow-300" />
                  <span>Đang xuất PDF...</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5 text-yellow-300" />
                  <span>Tải Xuất File PDF</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownloadPNG}
              disabled={isExporting}
              className="px-2.5 py-1.5 rounded-lg bg-[#2e2017] hover:bg-[#473224] text-[#fed7aa] border border-[#523927] font-mono-code font-bold text-xs flex items-center space-x-1 cursor-pointer transition-colors"
              title="Tải ảnh PNG độ nét cao"
            >
              <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Ảnh PNG</span>
            </button>

            <button
              onClick={() => setIsPrintCertificateOpen(false)}
              className="p-1.5 rounded-lg bg-[#2e2017] hover:bg-[#473224] text-[#d4c1ad] border border-[#523927] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Success feedback toast */}
        {downloadSuccess && (
          <div className="bg-emerald-900/90 text-emerald-100 px-6 py-2 border-b border-emerald-600 flex items-center space-x-2 text-xs font-mono-code font-bold animate-pulse">
            <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
            <span>{downloadSuccess}</span>
          </div>
        )}

        {/* Input Customization Bar */}
        <div className="bg-[#ede2ce] px-6 py-3 border-b border-[#baa48b] grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div>
            <label className="font-mono-code font-bold text-[#543821] block mb-1">
              Tên đồng chí hiển thị trên báo:
            </label>
            <input
              type="text"
              value={comradeName}
              onChange={(e) => setComradeName(e.target.value)}
              className="w-full px-3 py-1.5 bg-[#f7efe0] border border-[#9c8266] rounded font-vintage-title font-bold text-[#1f140e] focus:outline-none focus:ring-1 focus:ring-[#8b2616]"
            />
          </div>

          <div>
            <label className="font-mono-code font-bold text-[#543821] block mb-1">
              Chức danh đảm nhận:
            </label>
            <select
              value={comradeRole}
              onChange={(e) => setComradeRole(e.target.value)}
              className="w-full px-3 py-1.5 bg-[#f7efe0] border border-[#9c8266] rounded font-vintage-title font-bold text-[#1f140e] focus:outline-none focus:ring-1 focus:ring-[#8b2616]"
            >
              <option value="Tổng Biên Tập Báo Cách Mạng">Tổng Biên Tập Báo Cách Mạng</option>
              <option value="Chiến Sĩ Giao Liên Dũng Cảm">Chiến Sĩ Giao Liên Dũng Cảm</option>
              <option value="Kỹ Thuật Viên Xưởng In Thạch">Kỹ Thuật Viên Xưởng In Thạch</option>
            </select>
          </div>
        </div>

        {/* Interactive Preview Canvas */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 bg-[#f5eddb] text-[#1c120a] font-serif leading-relaxed relative">
          <div className="p-6 bg-[#f5eddb] relative rounded-lg border-2 border-[#1a110a]/30 shadow-inner">
            {/* Masthead */}
            <div className="text-center border-b-4 border-[#1a110a] pb-4 mb-4">
              <div className="text-[10px] uppercase font-mono-code font-bold tracking-widest text-[#69472d] mb-1">
                CƠ QUAN PHÁT ĐỘNG TỔNG KHỞI NGHĨA GIÀNH CHÍNH QUYỀN
              </div>
              <h1 className="font-vintage-title text-3xl sm:text-5xl font-black uppercase tracking-wider text-[#140b06]">
                VIỆT NAM ĐỘC LẬP
              </h1>
              <div className="flex items-center justify-between text-xs font-mono-code text-[#4a3424] mt-2 pt-1 border-t-2 border-[#1a110a] px-2 font-bold">
                <span>SỐ ĐẶC BIỆT MÙA THU 1945</span>
                <span>HÀ NỘI NGÀY 2 THÁNG 9 NĂM 1945</span>
                <span>GIÁ: TRUYỀN TAY ĐỌC KỸ</span>
              </div>
            </div>

            {/* Rubber Stamp: CHỨNG NHẬN CÔNG LAO */}
            <div className="absolute top-10 right-8 pointer-events-none transform rotate-12">
              <span className="rubber-stamp stamp-red text-xs sm:text-sm font-black tracking-widest">
                ★ HUÂN CHƯƠNG BÁO CHÍ ★
              </span>
            </div>

            {/* Headline */}
            <div className="mb-4">
              <h2 className="font-vintage-title text-xl sm:text-2xl font-black text-[#8b2616] uppercase leading-tight mb-1">
                TUYÊN DƯƠNG CHIẾN CÔNG CỦA ĐỒNG CHÍ: {comradeName}
              </h2>
              <div className="text-xs font-mono-code font-bold text-[#5c3e26] uppercase">
                Chức trách: {comradeRole}
              </div>
            </div>

            {/* Two-column layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-[#2b1f16] leading-relaxed border-t border-b border-[#523b2b]/40 py-4 mb-4">
              <div className="space-y-2 border-r border-[#523b2b]/30 pr-4">
                <p className="first-letter:text-4xl first-letter:font-bold first-letter:font-vintage-title first-letter:float-left first-letter:mr-2 first-letter:text-[#8b2616]">
                  Trải qua chặng đường hai mươi năm từ tiếng chuông báo <em>Thanh Niên</em> (1925) tại Quảng Châu cho đến ngọn cờ giải phóng tung bay giữa Quảng trường Ba Đình (1945), đồng chí đã kiên cường vượt qua mạng lưới mật thám bủa vây, giữ vững ngòi bút và bánh đà xưởng in thạch.
                </p>
                <p>
                  Dù trong gác xép chật hẹp, xà lim nhà tù đế quốc hay hang đá mù sương Pác Bó, từng dòng chữ in bằng mực than củi của đồng chí đã gieo niềm tin tất thắng vào trái tim hàng triệu người cùng khổ, góp phần làm nên thắng lợi của Cách mạng Tháng Tám năm 1945!
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-3 bg-[#ebe0ca] rounded border border-[#baa48b] font-mono-code">
                  <span className="font-bold text-[#8b2616] block uppercase mb-1">
                    THÀNH TÍCH GHI NHẬN:
                  </span>
                  <ul className="space-y-1 text-[11px] text-[#3d2919]">
                    <li>● Đã phát hành: <strong>{totalDistributed}</strong> tờ báo cách mạng</li>
                    <li>● Đã gây dựng: <strong>{secretCells}</strong> chi bộ nòng cốt</li>
                    <li>● Danh hiệu: <strong>Chiến sĩ Tiên phong Báo chí Vô sản</strong></li>
                  </ul>
                </div>

                <div className="text-center pt-2">
                  <div className="text-[10px] font-mono-code uppercase font-bold text-[#735133]">
                    THAY MẶT ỦY BAN DÂN TỘC GIẢI PHÓNG VIỆT NAM (CHÍNH PHỦ LÂM THỜI)
                  </div>
                  <div className="font-vintage-title text-base font-bold italic text-[#8b2616] mt-2">
                    Chủ tịch Hồ Chí Minh
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center text-[10px] font-mono-code text-[#735133]">
              Trích lưu chiểu Bảo tàng Báo chí Cách mạng Việt Nam • Dự án "Tờ Báo Bí Mật (1925 - 1945)"
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
