import React from 'react';
import { useGameStore } from '../store/useGameStore';
import { EditorialTab } from './EditorialTab';
import { PrintingTab } from './PrintingTab';
import { DistributionTab } from './DistributionTab';
import {
  FileEdit,
  Printer,
  Send,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Workspace: React.FC = () => {
  const { activeTab, setActiveTab, printedCopies } = useGameStore();

  const tabs = [
    {
      id: 'editorial' as const,
      name: '1. Soạn Bài Báo',
      icon: FileEdit,
      badge: null,
    },
    {
      id: 'printing' as const,
      name: '2. Dập In Báo',
      icon: Printer,
      badge: null,
    },
    {
      id: 'distribution' as const,
      name: '3. Đi Giao Báo',
      icon: Send,
      badge: printedCopies > 0 ? `${printedCopies} tờ` : null,
    },
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 py-6">
      {/* Desk Surface Container */}
      <div className="bg-[#1b1410] border-2 border-[#473426] rounded-xl shadow-2xl overflow-hidden relative">
        {/* Subtle decorative grain overlay */}
        <div className="absolute inset-0 bg-radial from-transparent via-[#0d0907]/40 to-[#0d0907]/90 pointer-events-none"></div>

        {/* Top Folder Tab Navigation */}
        <div className="flex border-b-2 border-[#473426] bg-[#140e0b] px-3 pt-3 overflow-x-auto gap-2 relative z-10 scrollbar-none">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-t-lg font-vintage-title text-xs sm:text-sm font-bold tracking-wide transition-all cursor-pointer whitespace-nowrap border-t-2 border-x-2 ${
                  isActive
                    ? 'bg-[#241c16] text-[#fed7aa] border-[#d97706] shadow-lg -mb-[2px] pb-[14px]'
                    : 'bg-[#18110d] text-[#8c745f] border-[#38281d] hover:bg-[#1f1612] hover:text-[#c4b09c]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#f59e0b]' : 'text-[#6e5645]'}`} />
                <span>{tab.name}</span>
                {tab.badge && (
                  <span className="ml-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono-code font-bold bg-[#8b2616] text-[#fff] border border-[#fca5a5]">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Content Canvas */}
        <div className="p-4 sm:p-6 relative z-10 min-h-[580px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'editorial' && <EditorialTab />}
              {activeTab === 'printing' && <PrintingTab />}
              {activeTab === 'distribution' && <DistributionTab />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
};
