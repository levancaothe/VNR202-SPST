import React, { useState } from 'react';
import { useGameStore } from '../store/useGameStore';
import {
  X,
  Copy,
  Check,
  Download,
  Upload,
  RefreshCw,
  HardDrive,
  Laptop,
  AlertTriangle,
} from 'lucide-react';
import { motion } from 'framer-motion';

export const SaveSyncModal: React.FC = () => {
  const {
    isSaveSyncOpen,
    setIsSaveSyncOpen,
    exportSaveData,
    importSaveData,
    clearSavedData,
    currentLevelIndex,
    funds,
    enlightenment,
    secretCells,
  } = useGameStore();

  const [activeTab, setActiveTab] = useState<'export' | 'import' | 'reset'>('export');
  const [importCode, setImportCode] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<{ isError: boolean; text: string } | null>(null);

  if (!isSaveSyncOpen) return null;

  const saveCode = exportSaveData();

  const handleCopy = () => {
    navigator.clipboard.writeText(saveCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadFile = () => {
    const blob = new Blob([saveCode], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `to_bao_bi_mat_tien_trinh_man_${currentLevelIndex + 1}.save`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        setImportCode(content.trim());
      }
    };
    reader.readAsText(file);
  };

  const handleImport = () => {
    if (!importCode.trim()) {
      setFeedback({ isError: true, text: 'Vui lòng dán mã lưu hoặc tải file lên trước!' });
      return;
    }
    const res = importSaveData(importCode);
    setFeedback({
      isError: !res.success,
      text: res.message,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="parchment-bg max-w-xl w-full rounded-2xl border-4 border-[#523b2b] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] my-auto text-[#2b1f16]"
      >
        {/* Header */}
        <div className="bg-[#1f1611] px-6 py-4 flex items-center justify-between border-b-2 border-[#453123] text-[#f7eedc]">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded bg-[#3b271a] border border-[#6b472e] text-[#fcd34d]">
              <HardDrive className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-vintage-title text-lg font-bold tracking-wide">
                Lưu Trữ & Chuyển Máy Chơi (Sync Save)
              </h2>
              <p className="text-xs text-[#a89582] font-mono-code">
                Bảo toàn dữ liệu & Tiếp tục công tác cách mạng trên máy tính khác
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsSaveSyncOpen(false)}
            className="p-1.5 rounded-lg bg-[#2e2017] hover:bg-[#473224] text-[#d4c1ad] border border-[#523927] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Local Storage Status Alert */}
        <div className="bg-[#ede2ce] px-6 py-3 border-b border-[#baa48b] text-xs font-serif leading-relaxed text-[#422e1e]">
          <div className="flex items-start space-x-2">
            <Laptop className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-emerald-950">
                Đã tự động lưu trữ trên máy tính này (localStorage):
              </span>{' '}
              Tiến trình Màn {currentLevelIndex + 1} ({Math.min(100, enlightenment)}% Lòng Dân, {funds}đ Quỹ, {secretCells} Cơ sở) được lưu vĩnh viễn trên trình duyệt này.
            </div>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-[#baa48b] bg-[#e6d8c3] text-xs font-mono-code font-bold">
          <button
            onClick={() => {
              setActiveTab('export');
              setFeedback(null);
            }}
            className={`flex-1 py-3 text-center cursor-pointer transition-colors ${
              activeTab === 'export'
                ? 'bg-[#f7efe0] text-[#8b2616] border-b-2 border-[#8b2616]'
                : 'text-[#6e533d] hover:bg-[#ded0bb]'
            }`}
          >
            1. Xuất Mã Chuyển Máy (Export)
          </button>
          <button
            onClick={() => {
              setActiveTab('import');
              setFeedback(null);
            }}
            className={`flex-1 py-3 text-center cursor-pointer transition-colors ${
              activeTab === 'import'
                ? 'bg-[#f7efe0] text-[#8b2616] border-b-2 border-[#8b2616]'
                : 'text-[#6e533d] hover:bg-[#ded0bb]'
            }`}
          >
            2. Nhập Mã Từ Máy Khác (Import)
          </button>
          <button
            onClick={() => {
              setActiveTab('reset');
              setFeedback(null);
            }}
            className={`py-3 px-4 text-center cursor-pointer transition-colors ${
              activeTab === 'reset'
                ? 'bg-[#f7efe0] text-red-700 border-b-2 border-red-700'
                : 'text-[#6e533d] hover:bg-[#ded0bb]'
            }`}
          >
            Làm Mới
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 bg-[#f7efe0] flex-1 overflow-y-auto space-y-4 text-xs font-serif leading-relaxed">
          {activeTab === 'export' && (
            <div className="space-y-4">
              <p className="text-[#3b2818]">
                Khi bạn muốn sang <strong>máy tính khác</strong> (hoặc laptop khác ở nhà/trường), hãy sao chép chuỗi mã bí mật dưới đây hoặc tải file về. Sang máy mới chỉ cần mở game và chọn tab <strong>"Nhập Mã"</strong> để tiếp tục:
              </p>

              <div className="relative">
                <textarea
                  readOnly
                  value={saveCode}
                  className="w-full h-24 p-3 bg-[#ede1ce] rounded-xl border border-[#baaa93] font-mono-code text-[11px] text-[#2e1d13] select-all resize-none outline-none focus:ring-1 focus:ring-[#8b2616]"
                />
              </div>

              <div className="flex flex-wrap gap-2.5">
                <button
                  onClick={handleCopy}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-[#8b2616] hover:bg-[#a62f1c] text-white font-mono-code font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow cursor-pointer transition-all"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-300" />
                      <span>Đã Sao Chép Vào Bộ Nhớ Đệm!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Sao Chép Mã Bí Mật</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleDownloadFile}
                  className="py-2.5 px-4 rounded-xl bg-[#3d2719] hover:bg-[#523522] text-[#f7eedc] font-mono-code font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 border border-[#6b472e] shadow cursor-pointer transition-all"
                >
                  <Download className="w-4 h-4 text-amber-400" />
                  <span>Tải Tệp Lưu (.save)</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'import' && (
            <div className="space-y-4">
              <p className="text-[#3b2818]">
                Dán mã bí mật bạn đã sao chép từ máy tính cũ, hoặc tải tệp <code>.save</code> lên để tiếp tục chơi ngay:
              </p>

              <div>
                <textarea
                  placeholder="Dán chuỗi mã bí mật vào đây..."
                  value={importCode}
                  onChange={(e) => setImportCode(e.target.value)}
                  className="w-full h-24 p-3 bg-[#ede1ce] rounded-xl border border-[#baaa93] font-mono-code text-[11px] text-[#2e1d13] resize-none outline-none focus:ring-1 focus:ring-[#8b2616]"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  onClick={handleImport}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-mono-code font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow cursor-pointer transition-all"
                >
                  <Upload className="w-4 h-4" />
                  <span>Nạp Tiến Trình Từ Mã Này</span>
                </button>

                <label className="py-2.5 px-4 rounded-xl bg-[#3d2719] hover:bg-[#523522] text-[#f7eedc] font-mono-code font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 border border-[#6b472e] shadow cursor-pointer transition-all">
                  <Upload className="w-4 h-4 text-amber-400" />
                  <span>Chọn Tệp .save</span>
                  <input
                    type="file"
                    accept=".save,.txt,.json"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {feedback && (
                <div
                  className={`p-3 rounded-lg text-xs font-mono-code flex items-start space-x-2 border ${
                    feedback.isError
                      ? 'bg-red-950/20 text-red-800 border-red-400'
                      : 'bg-emerald-950/20 text-emerald-900 border-emerald-400'
                  }`}
                >
                  {feedback.isError ? (
                    <AlertTriangle className="w-4 h-4 shrink-0 text-red-700 mt-0.5" />
                  ) : (
                    <Check className="w-4 h-4 shrink-0 text-emerald-700 mt-0.5" />
                  )}
                  <span>{feedback.text}</span>
                </div>
              )}
            </div>
          )}

          {activeTab === 'reset' && (
            <div className="space-y-4 bg-red-950/10 p-4 rounded-xl border border-red-300">
              <div className="flex items-center space-x-2 text-red-900 font-bold font-mono-code text-xs">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                <span>CẢNH BÁO: XÓA TIẾN TRÌNH VÀ CHƠI LẠI TỪ ĐẦU</span>
              </div>
              <p className="text-red-950 text-xs leading-relaxed">
                Hành động này sẽ xóa toàn bộ số báo in, tiền quỹ, huân chương và các màn chơi đã lưu trên máy tính này. Game sẽ được khởi tạo lại từ Màn 1 (1925 - Quảng Châu).
              </p>
              <button
                onClick={clearSavedData}
                className="w-full py-2.5 px-4 rounded-xl bg-red-800 hover:bg-red-900 text-white font-mono-code font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow cursor-pointer transition-all"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Xác Nhận Xóa Dữ Liệu & Khởi Động Lại</span>
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
