import React, { useState } from 'react';
import { useGameStore } from '../store/useGameStore';
import { MAP_POINTS, type MapPoint } from '../data/gameData';
import {
  Map,
  X,
  Navigation,
  Sparkles,
  Send,
  Building2,
  CheckCircle2,
  ShieldAlert,
  Coins,
  Radio,
  Users,
  Flame,
} from 'lucide-react';
import { motion } from 'framer-motion';

export const SecretMapModal: React.FC = () => {
  const {
    isMapOpen,
    setIsMapOpen,
    currentLevelIndex,
    selectedDestinationId,
    selectDestination,
    setActiveTab,
    mapHotspots,
    refreshHotspots,
  } = useGameStore();

  const baseIdByLevel = [
    'point-guangzhou',
    'point-nghe-an',
    'point-saigon',
    'point-pac-bo',
  ];
  const currentBaseId = baseIdByLevel[currentLevelIndex] || 'point-guangzhou';
  const currentBase = MAP_POINTS.find((p) => p.id === currentBaseId) || MAP_POINTS[0];
  const currentDestination =
    MAP_POINTS.find((p) => p.id === selectedDestinationId) || MAP_POINTS[2];

  const [selectedPoint, setSelectedPoint] = useState<MapPoint>(currentDestination);

  if (!isMapOpen) return null;

  const isCurrentBasePoint = selectedPoint.id === currentBaseId;
  const isSelectedDestPoint = selectedPoint.id === selectedDestinationId;

  const handleSelectRoute = (pointId: string) => {
    selectDestination(pointId);
    setIsMapOpen(false);
    setActiveTab('distribution');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="parchment-bg max-w-4xl w-full rounded-2xl border-4 border-[#523b2b] shadow-2xl overflow-hidden flex flex-col max-h-[92vh] my-auto text-[#2b1f16]"
      >
        {/* Header */}
        <div className="bg-[#1f1611] px-6 py-4 flex items-center justify-between border-b-2 border-[#453123] text-[#f7eedc]">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded bg-[#3b271a] border border-[#6b472e] text-[#fcd34d]">
              <Map className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-vintage-title text-lg font-bold tracking-wide">
                Bản Đồ Tuyến Đường Giao Liên & Xưởng In Bí Mật
              </h2>
              <p className="text-xs text-[#a89582] font-mono-code">
                Chọn địa bàn tiếp nhận báo từ xưởng in cách mạng toàn quốc (1925 - 1945)
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsMapOpen(false)}
            className="p-1.5 rounded-lg bg-[#2e2017] hover:bg-[#473224] text-[#d4c1ad] border border-[#523927] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Active Route Bar */}
        <div className="bg-[#2a1e16] px-6 py-2.5 border-b border-[#4d3626] flex flex-wrap items-center justify-between text-xs font-mono-code text-[#eedec8] gap-2">
          <div className="flex items-center space-x-2 flex-wrap">
            <span className="text-emerald-400 font-bold flex items-center space-x-1">
              <Building2 className="w-3.5 h-3.5" />
              <span>XƯỞNG IN (MÀN {currentLevelIndex + 1}):</span>
            </span>
            <span className="font-bold text-white bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-700/60">
              {currentBase.shortName}
            </span>
            <span className="text-[#a89582]">➔</span>
            <span className="text-amber-400 font-bold flex items-center space-x-1">
              <Send className="w-3.5 h-3.5" />
              <span>ĐỊA BÀN TIẾP NHẬN BÁO:</span>
            </span>
            <span className="font-bold text-white bg-amber-950/80 px-2 py-0.5 rounded border border-amber-700/60">
              {currentDestination.name}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={refreshHotspots}
              title="Phái giao liên thám thính và đổi các điểm nóng phong trào ngẫu nhiên"
              className="px-3 py-1 rounded bg-[#3d2719] hover:bg-[#523724] text-amber-300 text-[11px] font-mono-code border border-[#6b472e] flex items-center space-x-1.5 transition-colors cursor-pointer"
            >
              <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>Thám Thính Điểm Nóng Mới 🔥</span>
            </button>
          </div>
        </div>

        {/* Body: Left Graphic Map & Right Details */}
        <div className="grid grid-cols-1 md:grid-cols-12 flex-1 overflow-hidden">
          {/* Map Canvas */}
          <div className="md:col-span-7 bg-[#231b15] p-5 relative flex items-center justify-center min-h-[350px] md:min-h-[480px] border-r-2 border-[#4a3628] select-none">
            {/* Vintage Grid & Compass Rose */}
            <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#e5c07b_1px,transparent_1px)] [background-size:16px_16px]"></div>

            {/* Stylized Vietnam S-Shape Silhouette Outline */}
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full max-h-[440px] filter drop-shadow-[0_0_15px_rgba(217,119,6,0.2)]"
            >
              {/* Historical overall courier route dotted trail */}
              <path
                d="M 82 12 Q 72 20 62 27 L 42 24 Q 44 32 46 40 Q 45 57 45 74 Q 48 82 52 90"
                fill="none"
                stroke="#63452c"
                strokeWidth="0.8"
                strokeDasharray="2,2"
              />
              <path
                d="M 44 13 L 42 24"
                fill="none"
                stroke="#473121"
                strokeWidth="0.8"
                strokeDasharray="2,2"
              />

              {/* Active Delivery Route Arc from Current Base to Destination */}
              {currentBase.id !== currentDestination.id && (
                <path
                  d={`M ${currentBase.x} ${currentBase.y} Q ${(currentBase.x + currentDestination.x) / 2 + 3} ${(currentBase.y + currentDestination.y) / 2} ${currentDestination.x} ${currentDestination.y}`}
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="1.2"
                  strokeDasharray="2,2"
                  className="animate-pulse"
                />
              )}

              {/* Interactive Point Nodes (Zero Jitter - Solid SVG without CSS scale) */}
              {MAP_POINTS.map((pt) => {
                const isSelected = pt.id === selectedPoint.id;
                const isBase = pt.id === currentBaseId;
                const isDest = pt.id === selectedDestinationId;
                const hotspot = mapHotspots ? mapHotspots[pt.id] : undefined;

                return (
                  <g
                    key={pt.id}
                    className="cursor-pointer group"
                    onClick={() => setSelectedPoint(pt)}
                  >
                    {/* Invisible generous hit target so cursor hover NEVER jitters or loses contact */}
                    <circle cx={pt.x} cy={pt.y} r={7} fill="transparent" />

                    {/* Dynamic Hotspot Pulsing Outer Ring */}
                    {hotspot && (
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r={5.8}
                        fill="none"
                        stroke="#f59e0b"
                        strokeWidth="1.1"
                        strokeDasharray="2,2"
                        className="animate-pulse pointer-events-none"
                      />
                    )}

                    {/* Outer gentle pulsating halo for Active Destination (Fixed: NO animate-ping to prevent streak bug) */}
                    {isDest && (
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r={5.2}
                        fill="none"
                        stroke="#ef4444"
                        strokeWidth="0.9"
                        strokeDasharray="1.5,1.5"
                        className="animate-pulse pointer-events-none"
                      />
                    )}

                    {/* Outer animated halo for Current Base */}
                    {isBase && (
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r={5.5}
                        fill="none"
                        stroke="#22c55e"
                        strokeWidth="0.9"
                        strokeDasharray="2,2"
                        className="animate-pulse pointer-events-none"
                      />
                    )}

                    {/* Selection ring if clicked */}
                    {isSelected && !isBase && !isDest && (
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r={4.5}
                        fill="none"
                        stroke="#fef08a"
                        strokeWidth="0.8"
                        strokeDasharray="1,1"
                        className="pointer-events-none"
                      />
                    )}

                    {/* Main node circle with smooth color & radius transition */}
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={isBase ? 3.4 : isDest ? 3.2 : isSelected ? 3.0 : hotspot ? 2.8 : 2.2}
                      fill={isBase ? '#15803d' : isDest ? '#dc2626' : isSelected ? '#d97706' : hotspot ? '#b45309' : '#92400e'}
                      stroke={isSelected ? '#fef08a' : hotspot ? '#fde047' : '#fdf6ec'}
                      strokeWidth={isSelected || hotspot ? 1.0 : 0.6}
                      className="transition-colors duration-150 group-hover:fill-amber-400"
                    />

                    {/* Point text label with dedicated anchor & offset to prevent overlapping */}
                    <text
                      x={pt.x + (pt.textOffsetX ?? 4.5)}
                      y={pt.y + (pt.textOffsetY ?? 1.2)}
                      textAnchor={pt.textAnchor || 'start'}
                      fontSize="3.2"
                      fill={isBase ? '#86efac' : isDest ? '#fca5a5' : isSelected ? '#fef08a' : hotspot ? '#fde047' : '#d4c1ad'}
                      fontFamily="'Times New Roman', Times, serif"
                      fontWeight={isSelected || isBase || isDest || hotspot ? 'bold' : 'normal'}
                      className="transition-colors duration-150 group-hover:fill-white select-none pointer-events-none"
                    >
                      {pt.shortName}{hotspot ? ' 🔥' : ''}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Bottom Legend */}
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[10px] font-mono-code text-[#baa48b]">
              <div className="flex items-center space-x-3 flex-wrap">
                <span className="flex items-center space-x-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block border border-white"></span>
                  <span>Xưởng In</span>
                </span>
                <span className="flex items-center space-x-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-600 inline-block border border-white"></span>
                  <span>Địa Bàn Giao</span>
                </span>
                <span className="flex items-center space-x-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-600 inline-block border border-amber-300"></span>
                  <span>🔥 Điểm Nóng Thưởng Cao</span>
                </span>
              </div>
            </div>
          </div>

          {/* Point Information Panel */}
          <div className="md:col-span-5 p-5 bg-[#f7efe0] overflow-y-auto space-y-3.5 text-xs font-serif leading-relaxed flex flex-col justify-between">
            <div className="space-y-3">
              {/* Header of Point */}
              <div className="border-b-2 border-[#523b2b]/30 pb-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono-code uppercase font-bold text-[#8b2616] flex items-center space-x-1">
                    <Navigation className="w-3.5 h-3.5 text-[#d97706]" />
                    <span>KHU VỰC: {selectedPoint.region}</span>
                  </span>

                  {isCurrentBasePoint && (
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 border border-emerald-500 font-mono-code text-[10px] font-bold">
                      XƯỞNG IN HIỆN TẠI
                    </span>
                  )}
                  {isSelectedDestPoint && !isCurrentBasePoint && (
                    <span className="px-2 py-0.5 rounded bg-red-100 text-red-900 border border-red-500 font-mono-code text-[10px] font-bold">
                      ĐANG CHỌN GIAO BÁO
                    </span>
                  )}
                </div>

                <h3 className="font-vintage-title text-xl font-black text-[#1e130c] mt-1">
                  {selectedPoint.name}
                </h3>
                <p className="text-xs text-[#6e4e33] font-semibold mt-0.5">
                  {selectedPoint.role}
                </p>
              </div>

              {/* Dynamic Hotspot Operational Bulletin */}
              {mapHotspots && mapHotspots[selectedPoint.id] && (
                <div className="p-3 bg-gradient-to-br from-[#382215] via-[#26160d] to-[#382215] text-amber-100 rounded-xl border-2 border-amber-500 shadow-md space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono-code font-bold uppercase bg-amber-500/30 text-amber-300 border border-amber-400">
                      {mapHotspots[selectedPoint.id].tag}
                    </span>
                    <span className="text-[10px] text-amber-300 font-mono-code font-bold flex items-center space-x-1">
                      <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                      <span>ĐIỂM NÓNG PHONG TRÀO</span>
                    </span>
                  </div>
                  <h4 className="font-vintage-title text-sm font-bold text-amber-200">
                    {mapHotspots[selectedPoint.id].title}
                  </h4>
                  <p className="text-[11.5px] text-[#f7eee3] font-serif leading-relaxed">
                    {mapHotspots[selectedPoint.id].description}
                  </p>
                  {mapHotspots[selectedPoint.id].historicalContext && (
                    <p className="text-[10.5px] text-amber-300/80 italic font-serif">
                      💡 {mapHotspots[selectedPoint.id].historicalContext}
                    </p>
                  )}
                  <div className="pt-1.5 border-t border-amber-600/40 grid grid-cols-2 gap-1 text-[10.5px] font-mono-code">
                    <span className="text-emerald-300 font-bold">
                      Thưởng Dân: +{mapHotspots[selectedPoint.id].bonus.enlightenment}%
                    </span>
                    <span className="text-amber-300 font-bold">
                      Thưởng Quỹ: +{mapHotspots[selectedPoint.id].bonus.funds}đ
                    </span>
                    <span className="text-pink-300 font-bold">
                      Thưởng Cơ Sở: +{mapHotspots[selectedPoint.id].bonus.cellChance}%
                    </span>
                    <span
                      className={
                        mapHotspots[selectedPoint.id].bonus.alertRisk >= 0
                          ? 'text-red-300 font-bold'
                          : 'text-emerald-300 font-bold'
                      }
                    >
                      Nguy cơ: {mapHotspots[selectedPoint.id].bonus.alertRisk >= 0 ? '+' : ''}
                      {mapHotspots[selectedPoint.id].bonus.alertRisk}%
                    </span>
                  </div>
                </div>
              )}

              {/* Danger Level & Strategic Bonuses */}
              <div className="p-3 bg-[#ede1ce] rounded-xl border border-[#baa48b] space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono-code">
                  <span className="font-bold text-[#3d2717] flex items-center space-x-1">
                    <ShieldAlert className="w-3.5 h-3.5 text-red-700" />
                    <span>Mức độ kiểm soát:</span>
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded font-bold ${
                      selectedPoint.dangerLevel === 'Cực cao'
                        ? 'bg-red-200 text-red-900 border border-red-400'
                        : selectedPoint.dangerLevel === 'Trung bình'
                        ? 'bg-amber-200 text-amber-900 border border-amber-400'
                        : 'bg-emerald-200 text-emerald-900 border border-emerald-400'
                    }`}
                  >
                    {selectedPoint.dangerLevel}
                  </span>
                </div>

                {/* Tactical Bonuses Grid */}
                <div className="grid grid-cols-2 gap-1.5 pt-1 border-t border-[#baa48b]/50 text-[11px] font-mono-code">
                  <div className="flex items-center space-x-1 text-emerald-900">
                    <Radio className="w-3 h-3 text-[#15803d]" />
                    <span>Lòng Dân: +{selectedPoint.bonus.enlightenment}%</span>
                  </div>
                  <div className="flex items-center space-x-1 text-amber-900">
                    <Coins className="w-3 h-3 text-[#b45309]" />
                    <span>Quỹ: +{selectedPoint.bonus.funds}đ</span>
                  </div>
                  <div className="flex items-center space-x-1 text-pink-900">
                    <Users className="w-3 h-3 text-[#be185d]" />
                    <span>Cơ sở: +{selectedPoint.bonus.cellChance}%</span>
                  </div>
                  <div className="flex items-center space-x-1 text-red-900">
                    <ShieldAlert className="w-3 h-3 text-[#b91c1c]" />
                    <span>
                      Rủi ro: {selectedPoint.bonus.alertRisk >= 0 ? '+' : ''}
                      {selectedPoint.bonus.alertRisk}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Historical Context */}
              <div>
                <h4 className="font-vintage-title text-xs font-bold uppercase text-[#8b2616] mb-1">
                  Đặc điểm hoạt động:
                </h4>
                <p className="text-[#3b2a1c] bg-[#faf4ea] p-2.5 rounded-lg border border-[#d6c5af] text-[11.5px]">
                  {selectedPoint.description}
                </p>
              </div>

              <div>
                <h4 className="font-vintage-title text-xs font-bold uppercase text-[#8b2616] mb-1 flex items-center space-x-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#d97706]" />
                  <span>Ý nghĩa Lịch sử Đảng:</span>
                </h4>
                <p className="text-[#3b2a1c] bg-[#faf4ea] p-2.5 rounded-lg border border-[#d6c5af] italic text-[11px]">
                  {selectedPoint.historicalNote}
                </p>
              </div>
            </div>

            {/* Bottom Strategic Action Button */}
            <div className="pt-2">
              {isCurrentBasePoint ? (
                <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-950 border border-emerald-400 text-center font-mono-code text-xs font-bold flex items-center justify-center space-x-1.5">
                  <Building2 className="w-4 h-4 text-emerald-700" />
                  <span>Đây là nơi đặt xưởng in của bạn ở Màn {currentLevelIndex + 1}</span>
                </div>
              ) : isSelectedDestPoint ? (
                <button
                  onClick={() => {
                    setIsMapOpen(false);
                    setActiveTab('distribution');
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-mono-code font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow cursor-pointer transition-all"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Đang chọn địa bàn này ➔ Đến Tab Giao Báo</span>
                </button>
              ) : (
                <button
                  onClick={() => handleSelectRoute(selectedPoint.id)}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#8b2616] hover:bg-[#a62f1c] text-white font-mono-code font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow cursor-pointer transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Thiết Lập Giao Báo Về {selectedPoint.shortName}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
