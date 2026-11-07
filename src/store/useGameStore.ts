import { create } from 'zustand';
import {
  GAME_LEVELS,
  GAME_BASES,
  DISTRIBUTION_TARGETS,
  DISTRIBUTION_METHODS,
  GAME_ACHIEVEMENTS,
  HISTORICAL_QUIZZES,
  MAP_POINTS,
  CODEX_DATABASE,
  type GameEvent,
  type ScenarioOption,
  type ArticleOption,
  type DistributionTarget,
  type DistributionMethod,
} from '../data/gameData';
import { soundManager } from '../utils/audio';
import {
  generateRandomDifficulty,
  type LevelDifficultyModifier,
} from '../utils/difficulty';
import { getRandomArticlesForLevel } from '../data/articlePool';
import { generateRandomHotspots, type MapHotspot } from '../data/hotspotPool';
import { getRandomGameEvent } from '../data/eventPool';
import {
  generateRandomTargets,
  generateRandomMethods,
} from '../data/distributionPool';
import { CAMPAIGN_STAGES, type StageData } from '../data/stageData';

export interface HistoryItem {
  id: string;
  year: string;
  text: string;
  type: 'info' | 'success' | 'warning' | 'danger';
}

export type GameStatus =
  | 'intro'
  | 'playing'
  | 'event'
  | 'level_complete'
  | 'victory'
  | 'game_over';

const SAVE_KEY = 'secret_press_save_v1';

interface GameState {
  // Stats
  paper: number;
  ink: number;
  funds: number;
  enlightenment: number;
  alertLevel: number;
  secretCells: number;
  printedCopies: number;
  totalDistributed: number;
  totalPrints: number;
  stealthUsedCount: number;

  // Progression
  currentLevelIndex: number;
  currentStageIndex: number;
  gameStatus: GameStatus;
  gameOverReason: string;
  currentModifier: LevelDifficultyModifier | null;
  completedStageNotification: StageData | null;

  // Dynamic Random Systems
  currentArticles: ArticleOption[];
  currentTargets: DistributionTarget[];
  currentMethods: DistributionMethod[];
  mapHotspots: Record<string, MapHotspot>;
  seenEventIds: string[];

  // Selections
  activeTab: 'editorial' | 'printing' | 'distribution';
  selectedArticleId: string;
  selectedBaseId: string;
  selectedTargetId: string;
  selectedMethodId: string;
  selectedDestinationId: string;

  // Modal states
  activeEvent: GameEvent | null;
  unlockedCodexIds: string[];
  isCodexOpen: boolean;
  isLogOpen: boolean;
  isHelpOpen: boolean;
  isSaveSyncOpen: boolean;
  soundEnabled: boolean;
  ambienceEnabled: boolean;

  // Phase 1: Achievements
  unlockedAchievementIds: string[];
  recentAchievementToast: string | null;
  isAchievementsOpen: boolean;

  // Phase 2: Map & Checkpoint Mini-game
  isMapOpen: boolean;
  isInspectionOpen: boolean;

  // Phase 3: Quiz & Print Certificate
  isQuizOpen: boolean;
  isPrintCertificateOpen: boolean;
  answeredQuizIds: string[];

  // History Log
  historyLog: HistoryItem[];

  // Actions
  selectArticle: (id: string) => void;
  selectBase: (id: string) => void;
  selectTarget: (id: string) => void;
  selectMethod: (id: string) => void;
  selectDestination: (id: string) => void;
  setActiveTab: (tab: 'editorial' | 'printing' | 'distribution') => void;

  printNewspaper: (batches: number) => { success: boolean; message: string };
  distributeNewspaper: () => { success: boolean; message: string };
  buySupplies: (type: 'paper' | 'ink', cost: number, amount: number) => boolean;
  layLow: () => boolean;

  resolveEventOption: (option: ScenarioOption) => void;
  closeIntroModal: () => void;
  closeStageCompleteModal: () => void;
  proceedToNextLevel: () => void;
  restartGame: () => void;
  regenerateDifficulty: () => void;
  rerollArticles: () => void;
  refreshHotspots: () => void;
  refreshDistributionPool: () => void;

  toggleSound: () => void;
  toggleAmbience: () => void;
  setIsCodexOpen: (open: boolean) => void;
  setIsLogOpen: (open: boolean) => void;
  setIsHelpOpen: (open: boolean) => void;
  setIsSaveSyncOpen: (open: boolean) => void;
  setIsAchievementsOpen: (open: boolean) => void;
  setIsMapOpen: (open: boolean) => void;
  setIsInspectionOpen: (open: boolean) => void;
  setIsQuizOpen: (open: boolean) => void;
  setIsPrintCertificateOpen: (open: boolean) => void;

  resolveInspectionMiniGame: (success: boolean) => void;
  answerQuiz: (quizId: string, answerIndex: number) => { isCorrect: boolean; feedback: string };
  unlockAchievement: (id: string) => void;
  clearAchievementToast: () => void;
  saveProgress: () => void;
  exportSaveData: () => string;
  importSaveData: (code: string) => { success: boolean; message: string };
  clearSavedData: () => void;
}

// Load saved data if present
const getSavedData = () => {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Failed to parse saved game data', e);
  }
  return null;
};

export const useGameStore = create<GameState>((set, get) => {
  const initialLevel = GAME_LEVELS[0];
  const saved = getSavedData();
  const initialModifier: LevelDifficultyModifier =
    saved?.currentModifier ?? generateRandomDifficulty(saved?.currentLevelIndex ?? 0);
  const initialArticles: ArticleOption[] =
    saved?.currentArticles && saved.currentArticles.length > 0
      ? saved.currentArticles
      : getRandomArticlesForLevel(initialLevel.id);
  const initialHotspots: Record<string, MapHotspot> =
    saved?.mapHotspots && Object.keys(saved.mapHotspots).length > 0
      ? saved.mapHotspots
      : generateRandomHotspots(GAME_BASES[0].id);
  const initialTargets: DistributionTarget[] =
    saved?.currentTargets && saved.currentTargets.length > 0
      ? saved.currentTargets
      : generateRandomTargets();
  const initialMethods: DistributionMethod[] =
    saved?.currentMethods && saved.currentMethods.length > 0
      ? saved.currentMethods
      : generateRandomMethods();

  return {
    paper: saved?.paper ?? initialLevel.startingStats.paper,
    ink: saved?.ink ?? initialLevel.startingStats.ink,
    funds: saved?.funds ?? initialLevel.startingStats.funds,
    enlightenment: saved?.enlightenment ?? initialLevel.startingStats.enlightenment,
    alertLevel: saved?.alertLevel ?? initialLevel.startingStats.alertLevel,
    secretCells: saved?.secretCells ?? initialLevel.startingStats.secretCells,
    printedCopies: saved?.printedCopies ?? 0,
    totalDistributed: saved?.totalDistributed ?? 0,
    totalPrints: saved?.totalPrints ?? 0,
    stealthUsedCount: saved?.stealthUsedCount ?? 0,

    currentLevelIndex: saved?.currentLevelIndex ?? 0,
    currentStageIndex: saved?.currentStageIndex ?? 0,
    gameStatus: 'intro',
    gameOverReason: '',
    currentModifier: initialModifier,
    completedStageNotification: null,

    currentArticles: initialArticles,
    currentTargets: initialTargets,
    currentMethods: initialMethods,
    mapHotspots: initialHotspots,
    seenEventIds: saved?.seenEventIds ?? [],

    activeTab: 'editorial',
    selectedArticleId: saved?.selectedArticleId ?? initialArticles[0].id,
    selectedBaseId: GAME_BASES[0].id,
    selectedTargetId: initialTargets[0].id,
    selectedMethodId: initialMethods[0].id,
    selectedDestinationId: saved?.selectedDestinationId ?? 'point-hai-phong',

    activeEvent: null,
    unlockedCodexIds: saved?.unlockedCodexIds ?? ['codex-thanh-nien'],
    isCodexOpen: false,
    isLogOpen: false,
    isHelpOpen: false,
    isSaveSyncOpen: false,
    soundEnabled: true,
    ambienceEnabled: false,

    unlockedAchievementIds: saved?.unlockedAchievementIds ?? [],
    recentAchievementToast: null,
    isAchievementsOpen: false,

    isMapOpen: false,
    isInspectionOpen: false,

    isQuizOpen: false,
    isPrintCertificateOpen: false,
    answeredQuizIds: saved?.answeredQuizIds ?? [],

    historyLog: saved?.historyLog ?? [
      {
        id: 'init-1',
        year: '1925',
        text: 'Đồng chí Nguyễn Ái Quốc sáng lập Báo Thanh Niên tại Quảng Châu. Ngọn lửa báo chí cách mạng bắt đầu bùng cháy!',
        type: 'info',
      },
    ],

    rerollArticles: () => {
      soundManager.playPaperRustle();
      const state = get();
      const currentLevel = GAME_LEVELS[state.currentLevelIndex];
      const newArticles = getRandomArticlesForLevel(currentLevel.id);
      set({
        currentArticles: newArticles,
        selectedArticleId: newArticles[0].id,
      });
      get().saveProgress();
    },

    refreshHotspots: () => {
      const state = get();
      const newHotspots = generateRandomHotspots(state.selectedBaseId);
      set({ mapHotspots: newHotspots });
      get().saveProgress();
    },

    refreshDistributionPool: () => {
      const newTargets = generateRandomTargets();
      const newMethods = generateRandomMethods();
      set({
        currentTargets: newTargets,
        currentMethods: newMethods,
      });
      get().saveProgress();
    },

    regenerateDifficulty: () => {
      const state = get();
      const newMod = generateRandomDifficulty(state.currentLevelIndex);
      set({ currentModifier: newMod });
      get().saveProgress();
    },

    saveProgress: () => {
      const state = get();
      try {
        const toSave = {
          paper: state.paper,
          ink: state.ink,
          funds: state.funds,
          enlightenment: state.enlightenment,
          alertLevel: state.alertLevel,
          secretCells: state.secretCells,
          printedCopies: state.printedCopies,
          totalDistributed: state.totalDistributed,
          totalPrints: state.totalPrints,
          stealthUsedCount: state.stealthUsedCount,
          currentLevelIndex: state.currentLevelIndex,
          currentStageIndex: state.currentStageIndex,
          currentModifier: state.currentModifier,
          currentArticles: state.currentArticles,
          currentTargets: state.currentTargets,
          currentMethods: state.currentMethods,
          mapHotspots: state.mapHotspots,
          seenEventIds: state.seenEventIds,
          selectedArticleId: state.selectedArticleId,
          selectedDestinationId: state.selectedDestinationId,
          unlockedCodexIds: state.unlockedCodexIds,
          unlockedAchievementIds: state.unlockedAchievementIds,
          answeredQuizIds: state.answeredQuizIds,
          historyLog: state.historyLog.slice(0, 30),
          savedAt: new Date().toISOString(),
        };
        localStorage.setItem(SAVE_KEY, JSON.stringify(toSave));
      } catch (e) {
        console.error('Failed to save to localStorage', e);
      }
    },

    unlockAchievement: (id: string) => {
      const state = get();
      if (!state.unlockedAchievementIds.includes(id)) {
        const ach = GAME_ACHIEVEMENTS.find((a) => a.id === id);
        soundManager.playVictory();
        const updated = [...state.unlockedAchievementIds, id];
        set({
          unlockedAchievementIds: updated,
          recentAchievementToast: ach ? `${ach.icon} Mở khóa danh hiệu: ${ach.title}!` : null,
        });
        setTimeout(() => get().clearAchievementToast(), 4000);
        get().saveProgress();
      }
    },

    clearAchievementToast: () => {
      set({ recentAchievementToast: null });
    },

    selectArticle: (id: string) => {
      soundManager.playTypewriter();
      set({ selectedArticleId: id });
    },

    selectBase: (id: string) => {
      soundManager.playStamp();
      set({ selectedBaseId: id });
    },

    selectTarget: (id: string) => {
      soundManager.playTypewriter();
      set({ selectedTargetId: id });
    },

    selectMethod: (id: string) => {
      soundManager.playTypewriter();
      set({ selectedMethodId: id });
    },

    selectDestination: (id: string) => {
      soundManager.playStamp();
      set({ selectedDestinationId: id });
      get().saveProgress();
    },

    setActiveTab: (tab) => {
      soundManager.playPaperRustle();
      set({ activeTab: tab });
    },

    buySupplies: (type, cost, amount) => {
      const state = get();
      if (state.funds < cost) return false;

      soundManager.playCoin();
      const currentLevel = GAME_LEVELS[state.currentLevelIndex];

      const newFunds = state.funds - cost;
      const newAmount = (state[type] as number) + amount;

      set({
        funds: newFunds,
        [type]: newAmount,
        historyLog: [
          {
            id: String(Date.now()),
            year: currentLevel.year,
            text: `Vận động quỹ bí mật: Chi tiêu ${cost} đồng để thu mua thêm ${amount} ${type === 'paper' ? 'tờ Giấy in' : 'lọ Mực in'}.`,
            type: 'info',
          },
          ...state.historyLog,
        ],
      });
      get().saveProgress();
      return true;
    },

    layLow: () => {
      const state = get();
      if (state.funds < 12) return false;

      soundManager.playPaperRustle();
      const currentLevel = GAME_LEVELS[state.currentLevelIndex];
      const newAlert = Math.max(0, state.alertLevel - 20);
      const newStealthCount = state.stealthUsedCount + 1;

      set({
        funds: state.funds - 12,
        alertLevel: newAlert,
        stealthUsedCount: newStealthCount,
        historyLog: [
          {
            id: String(Date.now()),
            year: currentLevel.year,
            text: 'Phân tán cơ sở, tạm thời rút vào hoạt động bí mật sâu hơn. Mật thám mất dấu, mức nguy hiểm giảm -20%!',
            type: 'success',
          },
          ...state.historyLog,
        ],
      });

      // Achievement: Master of Stealth
      if (newStealthCount >= 3) {
        get().unlockAchievement('ach-master-stealth');
      }

      get().saveProgress();
      return true;
    },

    printNewspaper: (batches: number) => {
      const state = get();
      const currentLevel = GAME_LEVELS[state.currentLevelIndex];
      const base = GAME_BASES.find((b) => b.id === state.selectedBaseId) || GAME_BASES[0];

      const modPaper = state.currentModifier?.paperCostModifier ?? 1.0;
      const modInk = state.currentModifier?.inkCostModifier ?? 1.0;
      const paperCost = Math.round(batches * 10 * base.paperCostModifier * modPaper);
      const inkCost = Math.round(batches * 8 * base.inkCostModifier * modInk);

      if (state.paper < paperCost || state.ink < inkCost) {
        return {
          success: false,
          message: `Không đủ nguyên liệu! Cần ${paperCost} Giấy và ${inkCost} Mực${
            state.currentModifier && (modPaper !== 1 || modInk !== 1)
              ? ` (ảnh hưởng bởi [${state.currentModifier.name}])`
              : ''
          }.`,
        };
      }

      soundManager.playPrintingPress();

      const newCopies = Math.round(batches * 100 * base.efficiency);
      const modAlertGrowth = state.currentModifier?.alertGrowthMultiplier ?? 1.0;
      const addedAlert = Math.round((batches * 7 + Math.random() * 5) * base.riskMultiplier * modAlertGrowth);
      const newAlertLevel = Math.min(100, state.alertLevel + addedAlert);
      const newTotalPrints = state.totalPrints + 1;

      const updatedHistory: HistoryItem[] = [
        {
          id: String(Date.now()),
          year: currentLevel.year,
          text: `In thành công đợt báo (${newCopies} tờ) tại "${base.name}". Tiêu tốn ${paperCost} Giấy, ${inkCost} Mực. Nguy hiểm tăng +${addedAlert}%.`,
          type: 'info',
        },
        ...state.historyLog,
      ];

      // Check Achievement: First Print
      get().unlockAchievement('ach-first-print');

      // Check alert level threshold
      if (newAlertLevel >= 100) {
        soundManager.playAlert();
        set({
          paper: state.paper - paperCost,
          ink: state.ink - inkCost,
          printedCopies: state.printedCopies + newCopies,
          alertLevel: 100,
          totalPrints: newTotalPrints,
          gameStatus: 'game_over',
          gameOverReason: `Mật thám thực dân Pháp và chỉ điểm phát hiện xưởng in tại "${base.name}" do hoạt động dập in quá công suất! Toàn bộ cơ sở bị bao vây.`,
          historyLog: updatedHistory,
        });
        get().saveProgress();
        return {
          success: true,
          message: 'Xưởng in đã bị lộ!',
        };
      }

      // Check random event trigger from dynamic situation pool
      const triggerEvent = Math.random() < 0.38 + newAlertLevel / 200;
      let eventToTrigger: GameEvent | null = null;
      let updatedSeenEvents = state.seenEventIds;
      if (triggerEvent) {
        eventToTrigger = getRandomGameEvent(currentLevel.id, newAlertLevel, state.seenEventIds);
        updatedSeenEvents = [...state.seenEventIds, eventToTrigger.id].slice(-15);
      }

      set({
        paper: state.paper - paperCost,
        ink: state.ink - inkCost,
        printedCopies: state.printedCopies + newCopies,
        alertLevel: newAlertLevel,
        totalPrints: newTotalPrints,
        activeEvent: eventToTrigger,
        seenEventIds: updatedSeenEvents,
        gameStatus: eventToTrigger ? 'event' : state.gameStatus,
        historyLog: updatedHistory,
      });

      get().saveProgress();

      return {
        success: true,
        message: `Đã dập in thành công ${newCopies} tờ báo! Hãy chuyển sang Tab 'Đi Giao Báo' để phát hành.`,
      };
    },

    distributeNewspaper: () => {
      const state = get();
      if (state.printedCopies <= 0) {
        return {
          success: false,
          message: 'Chưa có tờ báo nào được in! Hãy dập in báo trước khi đi giao.',
        };
      }

      const currentLevel = GAME_LEVELS[state.currentLevelIndex];
      const activeTargets =
        state.currentTargets && state.currentTargets.length > 0
          ? state.currentTargets
          : DISTRIBUTION_TARGETS;
      const activeMethods =
        state.currentMethods && state.currentMethods.length > 0
          ? state.currentMethods
          : DISTRIBUTION_METHODS;
      const target =
        activeTargets.find((t) => t.id === state.selectedTargetId) ||
        activeTargets[0];
      const method =
        activeMethods.find((m) => m.id === state.selectedMethodId) ||
        activeMethods[0];
      const article =
        state.currentArticles.find((a) => a.id === state.selectedArticleId) ||
        state.currentArticles[0];
      const dest =
        MAP_POINTS.find((p) => p.id === state.selectedDestinationId) ||
        MAP_POINTS[2]; // Mặc định Cảng Hải Phòng
      const hotspot = state.mapHotspots[dest.id];
      const hotspotEnlightenment = hotspot?.bonus.enlightenment ?? 0;
      const hotspotFunds = hotspot?.bonus.funds ?? 0;
      const hotspotAlert = hotspot?.bonus.alertRisk ?? 0;
      const hotspotCell = hotspot?.bonus.cellChance ?? 0;

      const effectiveMethodCost = Math.max(
        1,
        method.cost + (state.currentModifier?.fundsDeliveryCostDelta ?? 0)
      );

      if (state.funds < effectiveMethodCost) {
        return {
          success: false,
          message: `Không đủ kinh phí giao liên! Cần ${effectiveMethodCost} đồng quỹ${
            state.currentModifier?.fundsDeliveryCostDelta
              ? ` (lộ phí tăng do [${state.currentModifier.name}])`
              : ''
          }.`,
        };
      }

      soundManager.playPaperRustle();

      // Check if trigger Checkpoint Inspection mini-game (affected by difficulty modifier)
      const inspectionChance = 0.28 * (state.currentModifier?.inspectionChanceMultiplier ?? 1.0);
      const triggerCheckpoint = state.alertLevel > 35 && Math.random() < inspectionChance;
      if (triggerCheckpoint) {
        set({ isInspectionOpen: true });
        return {
          success: true,
          message: 'Gặp trạm kiểm soát của mật thám! Chuẩn bị giấu tài liệu ngay!',
        };
      }

      // Combined raw detection risk for this distribution dispatch
      const combinedRisk =
        target.alertRisk +
        article.statBonus.alertLevel +
        dest.bonus.alertRisk +
        hotspotAlert -
        method.riskReduction;

      // Pacing & Risk-to-Enlightenment scaling:
      // - Với tỉ lệ bị phát hiện thấp (combinedRisk <= 10): tác động thầm lặng, an toàn, tích lũy từng bước
      //   (mỗi lượt +4% đến +6% Lòng dân). Bắt buộc người chơi phải hoàn thành tuần tự cả 3 Ải của Màn (kéo dài 5-7 lượt in và giao).
      // - Với tỉ lệ bị phát hiện trung bình (11 <= combinedRisk <= 17): mỗi lượt +7% đến +10% Lòng dân (3-4 lượt).
      // - Với tỉ lệ bị phát hiện cao (combinedRisk >= 18): Đột phá thần tốc (+14% đến +22% Lòng dân),
      //   có khả năng vượt ải cấp tốc hoặc hoàn thành màn trong 1-2 lượt thần tốc, nhưng mức nguy hiểm tăng vọt và trạm gác bủa vây!
      const volumeFactor = Math.min(2.2, 0.7 + state.printedCopies / 180);
      const modEnlightenment = state.currentModifier?.enlightenmentGainMultiplier ?? 1.0;

      let gainEnlightenment = 0;
      if (combinedRisk <= 10) {
        // Safe / Low risk: controlled small gains so each stage takes multiple actions
        const rawLow =
          (target.enlightenmentGain * 0.4 +
            article.statBonus.enlightenment * 0.35 +
            dest.bonus.enlightenment * 0.5) *
          method.reachMultiplier *
          volumeFactor *
          0.38 *
          modEnlightenment;
        gainEnlightenment = Math.max(4, Math.min(6, Math.round(rawLow)));
      } else if (combinedRisk >= 18) {
        // High risk / Breakthrough: massive explosion of mass support
        const rawHigh =
          (target.enlightenmentGain +
            article.statBonus.enlightenment +
            dest.bonus.enlightenment +
            hotspotEnlightenment) *
          method.reachMultiplier *
          volumeFactor *
          0.52 *
          modEnlightenment;
        gainEnlightenment = Math.max(14, Math.min(24, Math.round(rawHigh)));
      } else {
        // Balanced / Moderate risk
        const rawMed =
          (target.enlightenmentGain * 0.65 +
            article.statBonus.enlightenment * 0.6 +
            dest.bonus.enlightenment) *
          method.reachMultiplier *
          volumeFactor *
          0.45 *
          modEnlightenment;
        gainEnlightenment = Math.max(7, Math.min(11, Math.round(rawMed)));
      }

      // Alert change based on risk tier
      let alertChange = 0;
      if (combinedRisk <= 8) {
        alertChange = Math.round(Math.max(-4, combinedRisk * 0.35));
      } else if (combinedRisk >= 18) {
        alertChange = Math.round(combinedRisk * 0.95);
      } else {
        alertChange = Math.round(combinedRisk * 0.6);
      }
      const newAlertLevel = Math.max(0, Math.min(100, state.alertLevel + alertChange));

      // Secret cell chance
      const totalCellChance = Math.min(
        100,
        Math.max(0, target.cellChance + dest.bonus.cellChance + hotspotCell)
      );
      const gainedCell = Math.random() * 100 < totalCellChance;
      const newSecretCells = state.secretCells + (gainedCell ? 1 : 0);

      // Funds yield from masses
      const modFunds = state.currentModifier?.fundsYieldMultiplier ?? 1.0;
      const fundsYield = Math.max(
        0,
        Math.round(
          (target.fundsYield * volumeFactor +
            (article.statBonus.funds || 0) +
            dest.bonus.funds +
            hotspotFunds) *
            modFunds
        )
      );
      const newFunds = state.funds - effectiveMethodCost + fundsYield;

      const newEnlightenment = Math.min(100, state.enlightenment + gainEnlightenment);
      const distributedCount = state.printedCopies;
      const newTotalDistributed = state.totalDistributed + distributedCount;

      // Check Alert level failure
      if (newAlertLevel >= 100) {
        soundManager.playAlert();
        const failureHistory: HistoryItem[] = [
          {
            id: String(Date.now()),
            year: currentLevel.year,
            text: `Tuyến giao liên của "${method.name}" bị mật thám bám đuôi khi phân phối tài liệu đến "${target.name}". Cảnh binh ập tới thu giữ tài liệu và giăng lưới phong tỏa!`,
            type: 'danger',
          },
          ...state.historyLog,
        ];
        set({
          funds: newFunds,
          enlightenment: newEnlightenment,
          alertLevel: 100,
          secretCells: newSecretCells,
          printedCopies: 0,
          totalDistributed: newTotalDistributed,
          gameStatus: 'game_over',
          gameOverReason: `Tuyến giao liên của "${method.name}" bị mật thám bám đuôi khi phân phối tài liệu đến "${target.name}". Cảnh binh ập tới thu giữ tài liệu và giăng lưới phong tỏa!`,
          historyLog: failureHistory,
        });
        get().saveProgress();
        return { success: true, message: 'Đường dây giao liên bị lộ!' };
      }

      // Check Stage Progression & Breakthrough Mechanics
      const stages = CAMPAIGN_STAGES[currentLevel.id] || [];
      const currentStage = stages[state.currentStageIndex] || stages[0];
      const isLastStage = state.currentStageIndex >= stages.length - 1;
      const isHighRiskBreakthrough = combinedRisk >= 18;

      const targetEnlightenmentNeeded = Math.min(
        100,
        Math.max(
          20,
          currentLevel.targetEnlightenment + (state.currentModifier?.targetEnlightenmentDelta ?? 0)
        )
      );
      const effectiveCurrentThreshold = isLastStage
        ? targetEnlightenmentNeeded
        : currentStage.targetEnlightenmentThreshold;

      let nextStageIndex = state.currentStageIndex;
      let completedStageObj: StageData | null = null;
      let nextStatus: GameStatus = state.gameStatus;
      let breakthroughText = '';

      if (newEnlightenment >= effectiveCurrentThreshold) {
        if (isLastStage) {
          // Final stage reached -> Level complete or overall victory
          soundManager.playVictory();
          if (state.currentLevelIndex === GAME_LEVELS.length - 1) {
            nextStatus = 'victory';
            get().unlockAchievement('ach-revolution-hero');
          } else {
            nextStatus = 'level_complete';
          }
        } else {
          // Cleared current stage (Ải)
          soundManager.playVictory();
          if (isHighRiskBreakthrough) {
            // Breakthrough: check if player reached or exceeded the NEXT stage threshold too!
            const nextStageCandidate = stages[state.currentStageIndex + 1];
            const nextStageThreshold =
              state.currentStageIndex + 1 === stages.length - 1
                ? targetEnlightenmentNeeded
                : (nextStageCandidate?.targetEnlightenmentThreshold ?? 100);

            if (nextStageCandidate && newEnlightenment >= nextStageThreshold) {
              if (state.currentStageIndex + 1 === stages.length - 1) {
                // Double breakthrough cleared all stages of this level!
                if (state.currentLevelIndex === GAME_LEVELS.length - 1) {
                  nextStatus = 'victory';
                  get().unlockAchievement('ach-revolution-hero');
                } else {
                  nextStatus = 'level_complete';
                }
                breakthroughText = ' [★ ĐỘT PHÁ THẦN TỐC QUÉT SẠCH CÁC ẢI!]';
              } else {
                nextStageIndex = state.currentStageIndex + 2;
                completedStageObj = nextStageCandidate;
                breakthroughText = ` [★ ĐỘT PHÁ THẦN TỐC VƯỢT QUA CẢ ${currentStage.title} VÀ ${nextStageCandidate.title}!]`;
              }
            } else {
              nextStageIndex = state.currentStageIndex + 1;
              completedStageObj = currentStage;
              breakthroughText = ' [★ ĐỘT PHÁ THẦN TỐC HOÀN THÀNH ẢI!]';
            }
          } else {
            // Safe progression: strictly advance 1 stage at a time
            nextStageIndex = state.currentStageIndex + 1;
            completedStageObj = currentStage;
          }
        }
      }

      const updatedHistory: HistoryItem[] = [
        {
          id: String(Date.now()),
          year: currentLevel.year,
          text: `[Tuyến: ${dest.name}${hotspot ? ` • ${hotspot.tag}` : ''}] Phát hành ${distributedCount} tờ báo đến "${target.name}" qua cách "${method.name}". Lòng dân +${gainEnlightenment}%, thu về +${fundsYield}đ quyên góp.${completedStageObj ? ` ★ Hoàn thành ${completedStageObj.title}!` : ''}${breakthroughText}${hotspot ? ` (${hotspot.title})` : ''}${gainedCell ? ' Đã phát triển thêm 1 Cơ sở bí mật mới!' : ''}`,
          type: completedStageObj ? 'success' : 'info',
        },
        ...state.historyLog,
      ];

      // Achievements check
      if (newSecretCells > 1) {
        get().unlockAchievement('ach-first-cell');
      }
      if (newTotalDistributed >= 500) {
        get().unlockAchievement('ach-volume-press');
      }

      // Check potential dynamic event from event pool (if level not complete)
      let eventToTrigger: GameEvent | null = null;
      let updatedSeenEvents = state.seenEventIds;
      if (nextStatus === 'playing') {
        const triggerEvent = Math.random() < 0.4;
        if (triggerEvent) {
          eventToTrigger = getRandomGameEvent(currentLevel.id, newAlertLevel, state.seenEventIds);
          updatedSeenEvents = [...state.seenEventIds, eventToTrigger.id].slice(-15);
          nextStatus = 'event';
        }
      }

      // Unlock all corresponding historical codex items for this level and earlier
      const updatedCodex = [...state.unlockedCodexIds];
      if (nextStatus === 'level_complete' || nextStatus === 'victory') {
        const codexToUnlock = CODEX_DATABASE.filter((c) => c.levelId <= currentLevel.id);
        for (const item of codexToUnlock) {
          if (!updatedCodex.includes(item.id)) {
            updatedCodex.push(item.id);
          }
        }
      }

      // Occasionally rotate hotspots after delivery to simulate evolving revolutionary conditions
      let updatedHotspots = state.mapHotspots;
      if (Math.random() < 0.35) {
        updatedHotspots = generateRandomHotspots(state.selectedBaseId);
      }

      // Rotate reader targets and delivery methods to reflect shifting revolutionary conditions on the streets
      const freshTargets = generateRandomTargets();
      const freshMethods = generateRandomMethods();

      set({
        funds: newFunds,
        enlightenment: newEnlightenment,
        alertLevel: newAlertLevel,
        secretCells: newSecretCells,
        printedCopies: 0,
        totalDistributed: newTotalDistributed,
        currentStageIndex: nextStageIndex,
        completedStageNotification: completedStageObj,
        gameStatus: nextStatus,
        activeEvent: eventToTrigger,
        seenEventIds: updatedSeenEvents,
        mapHotspots: updatedHotspots,
        currentTargets: freshTargets,
        currentMethods: freshMethods,
        unlockedCodexIds: updatedCodex,
        historyLog: updatedHistory,
      });

      get().saveProgress();

      return {
        success: true,
        message: `Đã đưa ${distributedCount} tờ báo đến tận tay quần chúng an toàn!`,
      };
    },

    resolveInspectionMiniGame: (success: boolean) => {
      const state = get();
      const currentLevel = GAME_LEVELS[state.currentLevelIndex];

      if (success) {
        soundManager.playVictory();
        const newAlert = Math.max(0, state.alertLevel - 15);
        set({
          alertLevel: newAlert,
          isInspectionOpen: false,
          historyLog: [
            {
              id: String(Date.now()),
              year: currentLevel.year,
              text: 'Vượt trạm kiểm soát thành công! Giao liên giấu tài liệu cực kỳ tinh vi, mật thám không phát hiện được gì. Mức nguy hiểm giảm -15%.',
              type: 'success',
            },
            ...state.historyLog,
          ],
        });
      } else {
        soundManager.playPoliceWhistle();
        set({
          alertLevel: 100,
          isInspectionOpen: false,
          gameStatus: 'game_over',
          gameOverReason:
            'Giao liên bị toán mật thám Pháp bắt giữ tại trạm kiểm soát khi đang vận chuyển tài liệu bí mật! Phong trào bị đứt gãy đường dây liên lạc.',
          historyLog: [
            {
              id: String(Date.now()),
              year: currentLevel.year,
              text: 'Bị toán mật thám bắt giữ tại trạm kiểm soát! Nhiệm vụ chuyển báo thất bại.',
              type: 'danger',
            },
            ...state.historyLog,
          ],
        });
      }
      get().saveProgress();
    },

    answerQuiz: (quizId: string, answerIndex: number) => {
      const state = get();
      const quiz = HISTORICAL_QUIZZES.find((q) => q.id === quizId);
      if (!quiz) return { isCorrect: false, feedback: 'Không tìm thấy câu hỏi.' };

      const isCorrect = answerIndex === quiz.correctIndex;
      if (isCorrect) {
        soundManager.playVictory();
        const reward = quiz.reward;
        const newPaper = state.paper + (reward.paper || 0);
        const newInk = state.ink + (reward.ink || 0);
        const newFunds = state.funds + (reward.funds || 0);
        const updatedAnswered = [...state.answeredQuizIds, quizId];

        set({
          paper: newPaper,
          ink: newInk,
          funds: newFunds,
          answeredQuizIds: updatedAnswered,
          historyLog: [
            {
              id: String(Date.now()),
              year: GAME_LEVELS[state.currentLevelIndex].year,
              text: `Trả lời chính xác Thử thách Lịch sử Đảng! Nhận phần thưởng chi viện: +${reward.paper || 0} Giấy, +${reward.ink || 0} Mực, +${reward.funds || 0}đ Quỹ.`,
              type: 'success',
            },
            ...state.historyLog,
          ],
        });

        get().unlockAchievement('ach-quiz-champion');
        get().saveProgress();

        return {
          isCorrect: true,
          feedback: `Chính xác! ${quiz.explanation}`,
        };
      } else {
        soundManager.playAlert();
        return {
          isCorrect: false,
          feedback: `Chưa chính xác. Đáp án đúng là: "${quiz.options[quiz.correctIndex]}". Hãy ôn lại tư liệu nhé!`,
        };
      }
    },

    resolveEventOption: (option: ScenarioOption) => {
      const state = get();
      soundManager.playStamp();
      const currentLevel = GAME_LEVELS[state.currentLevelIndex];

      const eff = option.effect;
      const newPaper = Math.max(0, state.paper + (eff.paper || 0));
      const newInk = Math.max(0, state.ink + (eff.ink || 0));
      const newFunds = Math.max(0, state.funds + (eff.funds || 0));
      const newEnlightenment = Math.max(
        0,
        Math.min(100, state.enlightenment + (eff.enlightenment || 0))
      );
      const newAlert = Math.max(
        0,
        Math.min(100, state.alertLevel + (eff.alertLevel || 0))
      );
      const newCells = Math.max(0, state.secretCells + (eff.secretCells || 0));
      const newPrinted = Math.max(0, state.printedCopies + (eff.printedCopies || 0));

      const updatedHistory: HistoryItem[] = [
        {
          id: String(Date.now()),
          year: currentLevel.year,
          text: `Quyết sách trước "${state.activeEvent?.title}": ${option.feedback}`,
          type: (eff.alertLevel || 0) > 10 ? 'warning' : 'info',
        },
        ...state.historyLog,
      ];

      // Check alert level
      if (newAlert >= 100) {
        soundManager.playAlert();
        set({
          paper: newPaper,
          ink: newInk,
          funds: newFunds,
          enlightenment: newEnlightenment,
          alertLevel: 100,
          secretCells: newCells,
          printedCopies: newPrinted,
          activeEvent: null,
          gameStatus: 'game_over',
          gameOverReason:
            'Quyết định ứng phó đã tạo sơ hở cho mật thám và lính khố xanh lần theo đường dây. Cơ quan đầu não bị bao vây!',
          historyLog: updatedHistory,
        });
        get().saveProgress();
        return;
      }

      // Check level win with dynamic modifier
      const targetEnlightenmentNeeded = Math.min(
        100,
        Math.max(
          20,
          currentLevel.targetEnlightenment + (state.currentModifier?.targetEnlightenmentDelta ?? 0)
        )
      );
      const isLevelTargetMet = newEnlightenment >= targetEnlightenmentNeeded;
      let nextStatus: GameStatus = 'playing';

      if (isLevelTargetMet) {
        soundManager.playVictory();
        nextStatus =
          state.currentLevelIndex === GAME_LEVELS.length - 1
            ? 'victory'
            : 'level_complete';
      }

      set({
        paper: newPaper,
        ink: newInk,
        funds: newFunds,
        enlightenment: newEnlightenment,
        alertLevel: newAlert,
        secretCells: newCells,
        printedCopies: newPrinted,
        activeEvent: null,
        gameStatus: nextStatus,
        historyLog: updatedHistory,
      });

      get().saveProgress();
    },

    closeIntroModal: () => {
      soundManager.playStamp();
      set({ gameStatus: 'playing' });
    },

    closeStageCompleteModal: () => {
      soundManager.playStamp();
      set({ completedStageNotification: null });
    },

    proceedToNextLevel: () => {
      const state = get();
      const nextIndex = state.currentLevelIndex + 1;
      if (nextIndex < GAME_LEVELS.length) {
        const nextLevel = GAME_LEVELS[nextIndex];
        soundManager.playVictory();

        const availableBase = GAME_BASES.find((b) => b.unlockedAtLevel <= nextLevel.id);
        const newModifier = generateRandomDifficulty(nextIndex);
        const newArticles = getRandomArticlesForLevel(nextLevel.id);
        const newTargets = generateRandomTargets();
        const newMethods = generateRandomMethods();
        const newBaseId = availableBase ? availableBase.id : state.selectedBaseId;
        const newHotspots = generateRandomHotspots(newBaseId);
        const baseAlert = nextLevel.startingStats.alertLevel;
        const newAlert = Math.max(5, Math.min(80, baseAlert + newModifier.alertStartDelta));

        set({
          currentLevelIndex: nextIndex,
          currentStageIndex: 0,
          completedStageNotification: null,
          currentModifier: newModifier,
          currentArticles: newArticles,
          selectedArticleId: newArticles[0].id,
          currentTargets: newTargets,
          currentMethods: newMethods,
          selectedTargetId: newTargets[0].id,
          selectedMethodId: newMethods[0].id,
          mapHotspots: newHotspots,
          seenEventIds: [],
          paper: Math.max(state.paper, nextLevel.startingStats.paper),
          ink: Math.max(state.ink, nextLevel.startingStats.ink),
          funds: Math.max(state.funds, nextLevel.startingStats.funds),
          enlightenment: nextLevel.startingStats.enlightenment,
          alertLevel: newAlert,
          secretCells: Math.max(state.secretCells, nextLevel.startingStats.secretCells),
          printedCopies: 0,
          selectedBaseId: newBaseId,
          activeTab: 'editorial',
          gameStatus: 'intro',
          historyLog: [
            {
              id: String(Date.now()),
              year: nextLevel.year,
              text: `Bước sang giai đoạn mới: "${nextLevel.title}" (${nextLevel.year}). Tình thế: [${newModifier.name}]. Hệ thống đã tự động mở ra các đề tài bài viết và điểm nóng thời cuộc mới!`,
              type: 'info',
            },
            ...state.historyLog,
          ],
        });
        get().saveProgress();
      }
    },

    restartGame: () => {
      soundManager.playStamp();
      const firstLevel = GAME_LEVELS[0];
      const resetModifier = generateRandomDifficulty(0);
      const resetArticles = getRandomArticlesForLevel(firstLevel.id);
      const resetTargets = generateRandomTargets();
      const resetMethods = generateRandomMethods();
      const resetHotspots = generateRandomHotspots(GAME_BASES[0].id);
      const resetAlert = Math.max(
        5,
        Math.min(80, firstLevel.startingStats.alertLevel + resetModifier.alertStartDelta)
      );

      set({
        paper: firstLevel.startingStats.paper,
        ink: firstLevel.startingStats.ink,
        funds: firstLevel.startingStats.funds,
        enlightenment: firstLevel.startingStats.enlightenment,
        alertLevel: resetAlert,
        currentModifier: resetModifier,
        currentArticles: resetArticles,
        selectedArticleId: resetArticles[0].id,
        currentTargets: resetTargets,
        currentMethods: resetMethods,
        selectedTargetId: resetTargets[0].id,
        selectedMethodId: resetMethods[0].id,
        mapHotspots: resetHotspots,
        seenEventIds: [],
        secretCells: firstLevel.startingStats.secretCells,
        printedCopies: 0,
        totalDistributed: 0,
        currentLevelIndex: 0,
        currentStageIndex: 0,
        completedStageNotification: null,
        gameStatus: 'intro',
        gameOverReason: '',
        activeTab: 'editorial',
        selectedBaseId: GAME_BASES[0].id,
        activeEvent: null,
        historyLog: [
          {
            id: String(Date.now()),
            year: firstLevel.year,
            text: `Tái lập cơ quan xuất bản bí mật. Tình thế thời cuộc: [${resetModifier.name}] - ${resetModifier.description}`,
            type: 'info',
          },
        ],
      });
      get().saveProgress();
    },

    toggleSound: () => {
      const state = get();
      const nextVal = !state.soundEnabled;
      soundManager.enabled = nextVal;
      set({ soundEnabled: nextVal });
    },

    toggleAmbience: () => {
      const res = soundManager.toggleAmbience();
      set({ ambienceEnabled: res });
    },

    setIsCodexOpen: (open) => {
      soundManager.playPaperRustle();
      set({ isCodexOpen: open });
    },

    setIsLogOpen: (open) => {
      soundManager.playPaperRustle();
      set({ isLogOpen: open });
    },

    setIsHelpOpen: (open) => {
      soundManager.playPaperRustle();
      set({ isHelpOpen: open });
    },

    setIsAchievementsOpen: (open) => {
      soundManager.playPaperRustle();
      set({ isAchievementsOpen: open });
    },

    setIsMapOpen: (open) => {
      soundManager.playPaperRustle();
      set({ isMapOpen: open });
    },

    setIsInspectionOpen: (open) => {
      set({ isInspectionOpen: open });
    },

    setIsQuizOpen: (open) => {
      soundManager.playPaperRustle();
      set({ isQuizOpen: open });
    },

    setIsPrintCertificateOpen: (open) => {
      soundManager.playPaperRustle();
      set({ isPrintCertificateOpen: open });
    },

    setIsSaveSyncOpen: (open) => {
      soundManager.playPaperRustle();
      set({ isSaveSyncOpen: open });
    },

    exportSaveData: () => {
      const state = get();
      const payload = {
        paper: state.paper,
        ink: state.ink,
        funds: state.funds,
        enlightenment: state.enlightenment,
        alertLevel: state.alertLevel,
        secretCells: state.secretCells,
        printedCopies: state.printedCopies,
        totalDistributed: state.totalDistributed,
        totalPrints: state.totalPrints,
        stealthUsedCount: state.stealthUsedCount,
        currentLevelIndex: state.currentLevelIndex,
        currentStageIndex: state.currentStageIndex,
        currentModifier: state.currentModifier,
        currentArticles: state.currentArticles,
        selectedArticleId: state.selectedArticleId,
        mapHotspots: state.mapHotspots,
        seenEventIds: state.seenEventIds,
        selectedDestinationId: state.selectedDestinationId,
        unlockedCodexIds: state.unlockedCodexIds,
        unlockedAchievementIds: state.unlockedAchievementIds,
        answeredQuizIds: state.answeredQuizIds,
        historyLog: state.historyLog.slice(0, 30),
        savedAt: new Date().toISOString(),
      };
      return btoa(unescape(encodeURIComponent(JSON.stringify(payload))));
    },

    importSaveData: (code: string) => {
      try {
        const json = decodeURIComponent(escape(atob(code.trim())));
        const parsed = JSON.parse(json);
        if (typeof parsed.currentLevelIndex !== 'number') {
          return { success: false, message: 'Mã lưu không hợp lệ hoặc thiếu dữ liệu!' };
        }
        localStorage.setItem(SAVE_KEY, JSON.stringify(parsed));
        const lvl = GAME_LEVELS[parsed.currentLevelIndex] || GAME_LEVELS[0];
        set({
          paper: parsed.paper ?? 60,
          ink: parsed.ink ?? 50,
          funds: parsed.funds ?? 40,
          enlightenment: parsed.enlightenment ?? 0,
          alertLevel: parsed.alertLevel ?? 10,
          secretCells: parsed.secretCells ?? 1,
          printedCopies: parsed.printedCopies ?? 0,
          totalDistributed: parsed.totalDistributed ?? 0,
          totalPrints: parsed.totalPrints ?? 0,
          stealthUsedCount: parsed.stealthUsedCount ?? 0,
          currentLevelIndex: parsed.currentLevelIndex ?? 0,
          currentStageIndex: parsed.currentStageIndex ?? 0,
          completedStageNotification: null,
          currentModifier: parsed.currentModifier ?? null,
          currentArticles:
            parsed.currentArticles && parsed.currentArticles.length > 0
              ? parsed.currentArticles
              : getRandomArticlesForLevel(lvl.id),
          currentTargets:
            parsed.currentTargets && parsed.currentTargets.length > 0
              ? parsed.currentTargets
              : generateRandomTargets(),
          currentMethods:
            parsed.currentMethods && parsed.currentMethods.length > 0
              ? parsed.currentMethods
              : generateRandomMethods(),
          selectedArticleId: parsed.selectedArticleId ?? lvl.articles[0].id,
          mapHotspots: parsed.mapHotspots ?? generateRandomHotspots(GAME_BASES[0].id),
          seenEventIds: parsed.seenEventIds ?? [],
          selectedDestinationId: parsed.selectedDestinationId ?? 'point-hai-phong',
          unlockedCodexIds: parsed.unlockedCodexIds ?? ['codex-thanh-nien'],
          unlockedAchievementIds: parsed.unlockedAchievementIds ?? [],
          answeredQuizIds: parsed.answeredQuizIds ?? [],
          historyLog: parsed.historyLog ?? [],
          gameStatus: 'playing',
          isSaveSyncOpen: false,
        });
        soundManager.playVictory();
        return { success: true, message: 'Đã nạp thành công tiến trình từ máy khác!' };
      } catch (e) {
        return { success: false, message: 'Mã tiến trình không đúng định dạng. Hãy kiểm tra lại!' };
      }
    },

    clearSavedData: () => {
      try {
        localStorage.removeItem(SAVE_KEY);
      } catch {}
      get().restartGame();
      set({
        unlockedAchievementIds: [],
        answeredQuizIds: [],
        unlockedCodexIds: ['codex-thanh-nien'],
        isSaveSyncOpen: false,
      });
    },
  };
});
