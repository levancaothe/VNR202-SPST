import React, { useEffect } from 'react';
import { useGameStore } from '../store/useGameStore';
import { GAME_LEVELS } from '../data/gameData';
import { soundManager } from '../utils/audio';
import {
  FileText,
  Feather,
  Coins,
  Radio,
  AlertTriangle,
  Users,
  BookOpen,
  History,
  HelpCircle,
  Volume2,
  VolumeX,
  Flame,
  ShieldAlert,
  ArrowRight,
  Award,
  Map,
  GraduationCap,
  Sparkles,
  HardDrive,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Header: React.FC = () => {
  const {
    paper,
    ink,
    funds,
    enlightenment,
    alertLevel,
    secretCells,
    currentLevelIndex,
    soundEnabled,
    ambienceEnabled,
    toggleSound,
    toggleAmbience,
    setIsCodexOpen,
    setIsLogOpen,
    setIsHelpOpen,
    setIsAchievementsOpen,
    setIsMapOpen,
    setIsQuizOpen,
    setIsSaveSyncOpen,
    setActiveTab,
    recentAchievementToast,
    unlockedAchievementIds,
  } = useGameStore();

  const currentLevel = GAME_LEVELS[currentLevelIndex];
  const isHighAlert = alertLevel >= 70;

  // Play urgent warning sound once when entering high alert zone
  useEffect(() => {
    if (isHighAlert) {
      soundManager.playPoliceWhistle();
      setTimeout(() => soundManager.playHeartbeat(), 300);
    }
  }, [isHighAlert]);

  return (
    <header className="w-full bg-[#1e1713] border-b-2 border-[#543d2b] shadow-2xl relative z-30 select-none">
      {/* Top Banner: Vintage Header Strip */}
      <div className="bg-[#120e0c] px-4 py-1.5 flex flex-wrap items-center justify-between text-xs border-b border-[#3d2b1f] text-[#c9b79c]">
        <div className="flex items-center space-x-2 font-mono-code">
          <span className="inline-block w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
          <span className="text-[#e6c280] font-semibold tracking-wider uppercase">
            Hồ sơ Lưu chiểu Cách mạng
          </span>
          <span className="text-[#8c745f]">|</span>
          <span className="text-[#d8c2aa]">Kỳ {currentLevelIndex + 1}/4: {currentLevel.period}</span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-1 sm:mt-0">
          {/* Map Button */}
          <button
            onClick={() => setIsMapOpen(true)}
            className="flex items-center space-x-1 px-2.5 py-0.5 rounded bg-[#2e2219] hover:bg-[#473426] text-[#f2e6d0] border border-[#5a4231] transition-all cursor-pointer font-medium"
            title="Xem bản đồ các tuyến giao liên và xưởng in"
          >
            <Map className="w-3.5 h-3.5 text-[#38bdf8]" />
            <span className="hidden sm:inline">Bản Đồ</span>
          </button>

          {/* Quiz Button */}
          <button
            onClick={() => setIsQuizOpen(true)}
            className="flex items-center space-x-1 px-2.5 py-0.5 rounded bg-[#2e2219] hover:bg-[#473426] text-[#f2e6d0] border border-[#5a4231] transition-all cursor-pointer font-medium"
            title="Thử thách kiến thức lịch sử Đảng nhận thưởng giấy mực"
          >
            <GraduationCap className="w-3.5 h-3.5 text-[#facc15]" />
            <span className="hidden sm:inline">Đố Vui</span>
          </button>

          {/* Achievements Button */}
          <button
            onClick={() => setIsAchievementsOpen(true)}
            className="flex items-center space-x-1 px-2.5 py-0.5 rounded bg-[#2e2219] hover:bg-[#473426] text-[#f2e6d0] border border-[#5a4231] transition-all cursor-pointer font-medium"
            title="Xem danh hiệu và huân chương cách mạng"
          >
            <Award className="w-3.5 h-3.5 text-[#f97316]" />
            <span>Huân Chương ({unlockedAchievementIds.length})</span>
          </button>

          {/* Codex Button */}
          <button
            onClick={() => setIsCodexOpen(true)}
            className="flex items-center space-x-1 px-2.5 py-0.5 rounded bg-[#2e2219] hover:bg-[#473426] text-[#f2e6d0] border border-[#5a4231] transition-all cursor-pointer font-medium"
            title="Mở Thư viện Tư liệu Lịch sử"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#e5b358]" />
            <span>Kho Tư Liệu</span>
          </button>

          {/* History Log Button */}
          <button
            onClick={() => setIsLogOpen(true)}
            className="flex items-center space-x-1 px-2.5 py-0.5 rounded bg-[#2e2219] hover:bg-[#473426] text-[#f2e6d0] border border-[#5a4231] transition-all cursor-pointer font-medium"
            title="Xem Nhật ký Hoạt động Cách mạng"
          >
            <History className="w-3.5 h-3.5 text-[#e5b358]" />
            <span>Nhật Ký</span>
          </button>

          {/* Help Button */}
          <button
            onClick={() => setIsHelpOpen(true)}
            className="flex items-center space-x-1 px-2 py-0.5 rounded bg-[#2e2219] hover:bg-[#473426] text-[#f2e6d0] border border-[#5a4231] transition-all cursor-pointer"
            title="Hướng dẫn luật chơi đơn giản"
          >
            <HelpCircle className="w-3.5 h-3.5 text-[#a89582]" />
            <span className="hidden sm:inline">Cách Chơi</span>
          </button>

          {/* Save / Cross-machine Sync Button */}
          <button
            onClick={() => setIsSaveSyncOpen(true)}
            className="flex items-center space-x-1 px-2.5 py-0.5 rounded bg-[#2e2219] hover:bg-[#473426] text-[#f2e6d0] border border-[#5a4231] transition-all cursor-pointer font-medium"
            title="Lưu tiến trình hoặc chuyển sang máy tính khác chơi tiếp"
          >
            <HardDrive className="w-3.5 h-3.5 text-[#34d399]" />
            <span className="hidden sm:inline">Chuyển Máy</span>
          </button>

          {/* Ambience Toggle Button */}
          <button
            onClick={toggleAmbience}
            className={`p-1 rounded border transition-all cursor-pointer flex items-center space-x-1 px-1.5 ${
              ambienceEnabled
                ? 'bg-[#3b2a1a] text-[#fcd34d] border-[#d97706]'
                : 'bg-[#2e2219] hover:bg-[#473426] text-[#8c745f] border-[#5a4231]'
            }`}
            title={ambienceEnabled ? 'Tắt tiếng đài radio cổ' : 'Bật tiếng đài radio cổ'}
          >
            <Radio className="w-3.5 h-3.5" />
            <span className="text-[10px] hidden md:inline">Đài Cổ</span>
          </button>

          {/* Sound FX Toggle Button */}
          <button
            onClick={toggleSound}
            className="p-1 rounded bg-[#2e2219] hover:bg-[#473426] text-[#f2e6d0] border border-[#5a4231] transition-all cursor-pointer"
            title={soundEnabled ? 'Tắt âm thanh hiệu ứng' : 'Bật âm thanh hiệu ứng'}
          >
            {soundEnabled ? (
              <Volume2 className="w-3.5 h-3.5 text-[#73c991]" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-[#c97373]" />
            )}
          </button>
        </div>
      </div>

      {/* Main Title & Campaign Info */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Game Title & Stage */}
        <div className="flex items-center space-x-3 text-center md:text-left">
          <div className="w-12 h-12 rounded-full bg-[#8b2616] border-2 border-[#e6c280] flex items-center justify-center shadow-lg shadow-black/60 shrink-0">
            <Flame className="w-6 h-6 text-[#fed7aa]" />
          </div>
          <div>
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <h1 className="font-vintage-title text-xl sm:text-2xl font-black tracking-wide text-[#f5ebd7] uppercase drop-shadow-md">
                Tờ Báo Bí Mật
              </h1>
              <span className="text-xs font-mono-code px-2 py-0.5 bg-[#42150e] text-[#fca5a5] rounded border border-[#8b2616] font-bold">
                1925 - 1945
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#c8ad93] font-medium flex items-center justify-center md:justify-start space-x-2 mt-0.5">
              <span className="text-[#f59e0b] font-bold">Màn {currentLevel.id}:</span>
              <span className="font-vintage-title font-semibold text-[#fdf6e7]">{currentLevel.title}</span>
              <span className="text-[#78614e]">({currentLevel.year})</span>
            </p>
          </div>
        </div>

        {/* Core Game Stats Cards with Friendly Labels */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 w-full md:w-auto">
          {/* Paper */}
          <div className="bg-[#2a1f18] px-2.5 py-1.5 rounded border border-[#4a3628] flex items-center space-x-2 shadow-inner" title="Giấy dùng để dập in báo">
            <div className="p-1 rounded bg-[#3d2b1f] text-[#fcd34d]">
              <FileText className="w-4 h-4" />
            </div>
            <div className="text-left">
              <div className="text-[10px] text-[#a89582] uppercase tracking-wider font-semibold">Giấy in</div>
              <div className="text-sm font-bold text-[#fef3c7] font-mono-code">{paper} tờ</div>
            </div>
          </div>

          {/* Ink */}
          <div className="bg-[#2a1f18] px-2.5 py-1.5 rounded border border-[#4a3628] flex items-center space-x-2 shadow-inner" title="Mực in dùng để dập phôi thạch">
            <div className="p-1 rounded bg-[#3d2b1f] text-[#93c5fd]">
              <Feather className="w-4 h-4" />
            </div>
            <div className="text-left">
              <div className="text-[10px] text-[#a89582] uppercase tracking-wider font-semibold">Mực in</div>
              <div className="text-sm font-bold text-[#dbeafe] font-mono-code">{ink} lọ</div>
            </div>
          </div>

          {/* Funds */}
          <div className="bg-[#2a1f18] px-2.5 py-1.5 rounded border border-[#4a3628] flex items-center space-x-2 shadow-inner" title="Tiền quỹ hoạt động (Đồng Đông Dương)">
            <div className="p-1 rounded bg-[#3d2b1f] text-[#34d399]">
              <Coins className="w-4 h-4" />
            </div>
            <div className="text-left">
              <div className="text-[10px] text-[#a89582] uppercase tracking-wider font-semibold">Tiền quỹ</div>
              <div className="text-sm font-bold text-[#a7f3d0] font-mono-code">{funds} đ</div>
            </div>
          </div>

          {/* Secret Cells */}
          <div className="bg-[#2a1f18] px-2.5 py-1.5 rounded border border-[#4a3628] flex items-center space-x-2 shadow-inner" title="Mạng lưới cơ sở quần chúng và chi bộ cách mạng đã lập ra">
            <div className="p-1 rounded bg-[#3d2b1f] text-[#f472b6]">
              <Users className="w-4 h-4" />
            </div>
            <div className="text-left">
              <div className="text-[10px] text-[#a89582] uppercase tracking-wider font-semibold">Cơ sở lập</div>
              <div className="text-sm font-bold text-[#fbcfe8] font-mono-code">{secretCells} điểm</div>
            </div>
          </div>

          {/* Enlightenment Progress Bar */}
          <div className="col-span-1 sm:col-span-1 bg-[#2a1f18] px-2.5 py-1.5 rounded border border-[#4a3628] shadow-inner" title="Độ giác ngộ của quần chúng. Cần đạt mục tiêu để thắng màn chơi!">
            <div className="flex items-center justify-between text-[10px] text-[#a89582] mb-1">
              <span className="flex items-center space-x-1 font-semibold text-[#fbbf24]">
                <Radio className="w-3 h-3" />
                <span>Lòng Dân</span>
              </span>
              <span className="font-mono-code font-bold text-[#fed7aa]">
                {enlightenment}% <span className="text-[#8c745f]">/ {currentLevel.targetEnlightenment}%</span>
              </span>
            </div>
            <div className="w-full bg-[#18110d] rounded-full h-2 overflow-hidden p-0.5 border border-[#3d2b1f]">
              <motion.div
                className="bg-gradient-to-r from-[#d97706] to-[#f59e0b] h-full rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, (enlightenment / currentLevel.targetEnlightenment) * 100)}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Alert Level Bar (Warning Pulse when > 70%) */}
          <div
            className={`col-span-2 sm:col-span-1 px-2.5 py-1.5 rounded border shadow-inner transition-colors ${
              isHighAlert
                ? 'bg-[#3b1210] border-red-500 animate-alert-glow'
                : 'bg-[#2a1f18] border-[#4a3628]'
            }`}
            title="Mức độ theo dõi của mật thám Pháp. Đạt 100% là bị bắt giữ!"
          >
            <div className="flex items-center justify-between text-[10px] mb-1">
              <span
                className={`flex items-center space-x-1 font-semibold ${
                  isHighAlert ? 'text-red-400 font-bold' : 'text-[#a89582]'
                }`}
              >
                <AlertTriangle className={`w-3 h-3 ${isHighAlert ? 'animate-bounce text-red-400' : ''}`} />
                <span>Nguy Hiểm</span>
              </span>
              <span
                className={`font-mono-code font-bold ${
                  isHighAlert ? 'text-red-300' : 'text-[#e5e7eb]'
                }`}
              >
                {alertLevel}%
              </span>
            </div>
            <div className="w-full bg-[#18110d] rounded-full h-2 overflow-hidden p-0.5 border border-[#3d2b1f]">
              <motion.div
                className={`h-full rounded-full transition-all ${
                  alertLevel > 80
                    ? 'bg-red-600'
                    : alertLevel > 60
                    ? 'bg-orange-500'
                    : 'bg-yellow-500'
                }`}
                initial={{ width: 0 }}
                animate={{ width: `${alertLevel}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Critical Alert Bar if > 70% with Dramatic Visual & Quick Action */}
      {isHighAlert && (
        <div className="bg-red-900/95 text-red-100 px-4 py-2 text-center text-xs font-mono-code flex flex-col sm:flex-row items-center justify-center gap-2 border-t border-red-600 animate-pulse shadow-lg">
          <div className="flex items-center space-x-2">
            <ShieldAlert className="w-5 h-5 text-yellow-300 animate-bounce" />
            <span className="font-bold uppercase tracking-wider text-yellow-200">
              CẢNH BÁO KHẨN: Mật thám Pháp và chỉ điểm đang lùng sục ráo riết ({alertLevel}%)!
            </span>
          </div>
          <button
            onClick={() => setActiveTab('printing')}
            className="px-3 py-1 bg-yellow-400 hover:bg-yellow-300 text-black font-black uppercase text-[11px] rounded flex items-center space-x-1 shadow cursor-pointer transition-transform hover:scale-105"
          >
            <span>Ẩn Nấp Ngay Để Hạ Nhiệt (-20%)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Toast Notification when Achievement Unlocks */}
      <AnimatePresence>
        {recentAchievementToast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="absolute top-14 left-1/2 -translate-x-1/2 z-50 bg-[#8b2616] text-[#fff] border-2 border-[#fcd34d] px-4 py-2 rounded-xl shadow-2xl flex items-center space-x-2 font-mono-code text-xs font-bold pointer-events-none"
          >
            <Sparkles className="w-4 h-4 text-[#fef08a] animate-spin" />
            <span>{recentAchievementToast}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
