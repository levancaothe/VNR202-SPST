import { create } from 'zustand';
import {
  GAME_LEVELS,
  GAME_BASES,
  DISTRIBUTION_TARGETS,
  DISTRIBUTION_METHODS,
  GAME_ACHIEVEMENTS,
  HISTORICAL_QUIZZES,
  MAP_POINTS,
  type GameEvent,
  type ScenarioOption,
} from '../data/gameData';
import { soundManager } from '../utils/audio';

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
  gameStatus: GameStatus;
  gameOverReason: string;

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
  proceedToNextLevel: () => void;
  restartGame: () => void;

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
    gameStatus: 'intro',
    gameOverReason: '',

    activeTab: 'editorial',
    selectedArticleId: initialLevel.articles[0].id,
    selectedBaseId: GAME_BASES[0].id,
    selectedTargetId: DISTRIBUTION_TARGETS[0].id,
    selectedMethodId: DISTRIBUTION_METHODS[0].id,
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

      const paperCost = Math.round(batches * 10 * base.paperCostModifier);
      const inkCost = Math.round(batches * 8 * base.inkCostModifier);

      if (state.paper < paperCost || state.ink < inkCost) {
        return {
          success: false,
          message: `Không đủ nguyên liệu! Cần ${paperCost} Giấy và ${inkCost} Mực.`,
        };
      }

      soundManager.playPrintingPress();

      const newCopies = Math.round(batches * 100 * base.efficiency);
      const addedAlert = Math.round((batches * 7 + Math.random() * 5) * base.riskMultiplier);
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

      // Check random event trigger
      const triggerEvent = Math.random() < 0.38 + newAlertLevel / 200;
      let eventToTrigger: GameEvent | null = null;
      if (triggerEvent && currentLevel.events.length > 0) {
        const randIndex = Math.floor(Math.random() * currentLevel.events.length);
        eventToTrigger = currentLevel.events[randIndex];
      }

      set({
        paper: state.paper - paperCost,
        ink: state.ink - inkCost,
        printedCopies: state.printedCopies + newCopies,
        alertLevel: newAlertLevel,
        totalPrints: newTotalPrints,
        activeEvent: eventToTrigger,
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
      const target =
        DISTRIBUTION_TARGETS.find((t) => t.id === state.selectedTargetId) ||
        DISTRIBUTION_TARGETS[0];
      const method =
        DISTRIBUTION_METHODS.find((m) => m.id === state.selectedMethodId) ||
        DISTRIBUTION_METHODS[0];
      const article =
        currentLevel.articles.find((a) => a.id === state.selectedArticleId) ||
        currentLevel.articles[0];
      const dest =
        MAP_POINTS.find((p) => p.id === state.selectedDestinationId) ||
        MAP_POINTS[2]; // Mặc định Cảng Hải Phòng

      if (state.funds < method.cost) {
        return {
          success: false,
          message: `Không đủ kinh phí giao liên! Cần ${method.cost} đồng quỹ.`,
        };
      }

      soundManager.playPaperRustle();

      // Check if trigger Checkpoint Inspection mini-game (chance ~25% if alert > 40)
      const triggerCheckpoint = state.alertLevel > 40 && Math.random() < 0.3;
      if (triggerCheckpoint) {
        set({ isInspectionOpen: true });
        return {
          success: true,
          message: 'Gặp trạm kiểm soát của mật thám! Chuẩn bị giấu tài liệu ngay!',
        };
      }

      // Calculations with Destination bonus
      const volumeFactor = Math.min(2.5, 0.8 + state.printedCopies / 150);
      const rawGain =
        (target.enlightenmentGain + article.statBonus.enlightenment + dest.bonus.enlightenment) *
        method.reachMultiplier *
        volumeFactor *
        0.5;
      const gainEnlightenment = Math.round(rawGain);

      // Alert change
      const rawAlert =
        (target.alertRisk + article.statBonus.alertLevel + dest.bonus.alertRisk - method.riskReduction) *
        0.6;
      const alertChange = Math.round(Math.max(-5, rawAlert));
      const newAlertLevel = Math.max(0, Math.min(100, state.alertLevel + alertChange));

      // Secret cell chance
      const totalCellChance = Math.min(95, target.cellChance + dest.bonus.cellChance);
      const gainedCell = Math.random() * 100 < totalCellChance;
      const newSecretCells = state.secretCells + (gainedCell ? 1 : 0);

      // Funds yield from masses
      const fundsYield = Math.max(
        0,
        Math.round(
          target.fundsYield * volumeFactor + (article.statBonus.funds || 0) + dest.bonus.funds
        )
      );
      const newFunds = state.funds - method.cost + fundsYield;

      const newEnlightenment = Math.min(100, state.enlightenment + gainEnlightenment);
      const distributedCount = state.printedCopies;
      const newTotalDistributed = state.totalDistributed + distributedCount;

      const updatedHistory: HistoryItem[] = [
        {
          id: String(Date.now()),
          year: currentLevel.year,
          text: `[Tuyến: ${dest.name}] Phát hành ${distributedCount} tờ báo đến "${target.name}" qua cách "${method.name}". Lòng dân +${gainEnlightenment}%, thu về +${fundsYield}đ quyên góp.${gainedCell ? ' Đã phát triển thêm 1 Cơ sở bí mật mới!' : ''}`,
          type: 'success',
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

      // Check Alert level failure
      if (newAlertLevel >= 100) {
        soundManager.playAlert();
        set({
          funds: newFunds,
          enlightenment: newEnlightenment,
          alertLevel: 100,
          secretCells: newSecretCells,
          printedCopies: 0,
          totalDistributed: newTotalDistributed,
          gameStatus: 'game_over',
          gameOverReason: `Tuyến giao liên của "${method.name}" bị mật thám bám đuôi khi phân phối tài liệu đến "${target.name}". Cảnh binh ập tới thu giữ tài liệu và giăng lưới phong tỏa!`,
          historyLog: updatedHistory,
        });
        get().saveProgress();
        return { success: true, message: 'Đường dây giao liên bị lộ!' };
      }

      // Check Level completion
      const isLevelTargetMet = newEnlightenment >= currentLevel.targetEnlightenment;
      let nextStatus: GameStatus = state.gameStatus;

      if (isLevelTargetMet) {
        soundManager.playVictory();
        if (state.currentLevelIndex === GAME_LEVELS.length - 1) {
          nextStatus = 'victory';
          get().unlockAchievement('ach-revolution-hero');
        } else {
          nextStatus = 'level_complete';
        }
      } else {
        // Trigger potential event
        const triggerEvent = Math.random() < 0.42;
        if (triggerEvent && currentLevel.events.length > 0) {
          const randIndex = Math.floor(Math.random() * currentLevel.events.length);
          nextStatus = 'event';
          set({ activeEvent: currentLevel.events[randIndex] });
        }
      }

      // Unlock codex for current level if target met
      const updatedCodex = [...state.unlockedCodexIds];
      if (isLevelTargetMet && !updatedCodex.includes(currentLevel.codexUnlockId)) {
        updatedCodex.push(currentLevel.codexUnlockId);
      }

      set({
        funds: newFunds,
        enlightenment: newEnlightenment,
        alertLevel: newAlertLevel,
        secretCells: newSecretCells,
        printedCopies: 0,
        totalDistributed: newTotalDistributed,
        gameStatus: nextStatus,
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
        const newAlert = Math.min(100, state.alertLevel + 25);
        const lostCopies = Math.round(state.printedCopies * 0.4);
        const newCopies = Math.max(0, state.printedCopies - lostCopies);

        set({
          alertLevel: newAlert,
          printedCopies: newCopies,
          isInspectionOpen: false,
          historyLog: [
            {
              id: String(Date.now()),
              year: currentLevel.year,
              text: `Trạm kiểm soát phát giác nghi vấn! Giao liên phải vứt bỏ ${lostCopies} tờ báo để thoát thân. Mức nguy hiểm tăng +25%!`,
              type: 'danger',
            },
            ...state.historyLog,
          ],
        });

        if (newAlert >= 100) {
          set({
            gameStatus: 'game_over',
            gameOverReason: 'Giao liên bị bắt tại trạm gác kiểm soát của mật thám Pháp. Tuyến đường phân phối bị đứt gãy!',
          });
        }
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

      // Check level win
      const isLevelTargetMet = newEnlightenment >= currentLevel.targetEnlightenment;
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

    proceedToNextLevel: () => {
      const state = get();
      const nextIndex = state.currentLevelIndex + 1;
      if (nextIndex < GAME_LEVELS.length) {
        const nextLevel = GAME_LEVELS[nextIndex];
        soundManager.playVictory();

        const availableBase = GAME_BASES.find((b) => b.unlockedAtLevel <= nextLevel.id);

        set({
          currentLevelIndex: nextIndex,
          paper: Math.max(state.paper, nextLevel.startingStats.paper),
          ink: Math.max(state.ink, nextLevel.startingStats.ink),
          funds: Math.max(state.funds, nextLevel.startingStats.funds),
          enlightenment: nextLevel.startingStats.enlightenment,
          alertLevel: nextLevel.startingStats.alertLevel,
          secretCells: Math.max(state.secretCells, nextLevel.startingStats.secretCells),
          printedCopies: 0,
          selectedArticleId: nextLevel.articles[0].id,
          selectedBaseId: availableBase ? availableBase.id : state.selectedBaseId,
          activeTab: 'editorial',
          gameStatus: 'intro',
          historyLog: [
            {
              id: String(Date.now()),
              year: nextLevel.year,
              text: `Bước sang giai đoạn mới: "${nextLevel.title}" (${nextLevel.year}). Nhiệm vụ: Đạt ${nextLevel.targetEnlightenment}% Lòng Dân Giác Ngộ!`,
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
      set({
        paper: firstLevel.startingStats.paper,
        ink: firstLevel.startingStats.ink,
        funds: firstLevel.startingStats.funds,
        enlightenment: firstLevel.startingStats.enlightenment,
        alertLevel: firstLevel.startingStats.alertLevel,
        secretCells: firstLevel.startingStats.secretCells,
        printedCopies: 0,
        totalDistributed: 0,
        currentLevelIndex: 0,
        gameStatus: 'intro',
        gameOverReason: '',
        activeTab: 'editorial',
        selectedArticleId: firstLevel.articles[0].id,
        selectedBaseId: GAME_BASES[0].id,
        activeEvent: null,
        historyLog: [
          {
            id: String(Date.now()),
            year: firstLevel.year,
            text: 'Tái lập cơ quan xuất bản bí mật. Tiếng chuông báo chí cách mạng lại vang lên!',
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
