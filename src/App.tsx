import React from 'react';
import { Header } from './components/Header';
import { Workspace } from './components/Workspace';
import { EventModal } from './components/EventModal';
import { CodexModal } from './components/CodexModal';
import { LevelIntroModal } from './components/LevelIntroModal';
import { LevelCompleteModal } from './components/LevelCompleteModal';
import { GameOverModal } from './components/GameOverModal';
import { VictoryModal } from './components/VictoryModal';
import { HistoryLogModal } from './components/HistoryLogModal';
import { HelpModal } from './components/HelpModal';
import { AchievementModal } from './components/AchievementModal';
import { SecretMapModal } from './components/SecretMapModal';
import { CheckpointMiniGameModal } from './components/CheckpointMiniGameModal';
import { QuizModal } from './components/QuizModal';
import { NewspaperPrintModal } from './components/NewspaperPrintModal';
import { SaveSyncModal } from './components/SaveSyncModal';

import { useGameStore } from './store/useGameStore';

export const App: React.FC = () => {
  const { alertLevel } = useGameStore();
  const isHighAlert = alertLevel >= 70;

  return (
    <div className="min-h-screen bg-[#140f0c] text-[#f2e6d5] flex flex-col justify-between selection:bg-[#8b2616] selection:text-[#fff] relative">
      {/* Fullscreen pulsing danger vignette when police alert is high */}
      {isHighAlert && <div className="danger-vignette" />}

      {/* Navigation & Status Header */}
      <Header />

      {/* Main Revolutionary Journalist Desk Workspace */}
      <div className="flex-1">
        <Workspace />
      </div>

      {/* Modals & Dialogs */}
      <EventModal />
      <CodexModal />
      <LevelIntroModal />
      <LevelCompleteModal />
      <GameOverModal />
      <VictoryModal />
      <HistoryLogModal />
      <HelpModal />
      <AchievementModal />
      <SecretMapModal />
      <CheckpointMiniGameModal />
      <QuizModal />
      <NewspaperPrintModal />
      <SaveSyncModal />

      {/* Atmospheric Footer */}
      <footer className="w-full bg-[#0d0907] border-t border-[#2d1e15] py-3 text-center text-xs text-[#78614e] font-mono-code px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            ★ Dự án Web Game Giáo dục Lịch sử: <strong>"Tờ Báo Bí Mật" (1925 - 1945)</strong>
          </span>
          <span className="text-[#a88f78]">
            Dựa trên tư liệu Giáo trình Lịch sử Đảng Cộng sản Việt Nam (NXB Chính trị Quốc gia Sự thật)
          </span>
        </div>
      </footer>
    </div>
  );
};

export default App;
