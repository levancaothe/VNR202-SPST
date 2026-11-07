export interface LevelDifficultyModifier {
  id: string;
  name: string;
  icon: string;
  badge: string;
  badgeColor: string; // e.g. red, amber, emerald, purple
  description: string;
  historicalContext: string;
  // Multipliers & Adjustments
  alertStartDelta: number;         // e.g. +15 (mức nguy hiểm ban đầu)
  alertGrowthMultiplier: number;   // e.g. 1.25 (mật thám nhạy bén hơn)
  paperCostModifier: number;       // e.g. 1.2 (giá giấy in)
  inkCostModifier: number;         // e.g. 1.2 (giá mực in)
  fundsDeliveryCostDelta: number;  // e.g. +2 (lộ phí giao liên)
  targetEnlightenmentDelta: number;// e.g. +6 (mục tiêu lòng dân cần đạt)
  enlightenmentGainMultiplier: number; // e.g. 1.25 (quần chúng tiếp thu nhanh)
  fundsYieldMultiplier: number;    // e.g. 1.3 (quần chúng ủng hộ tiền)
  inspectionChanceMultiplier: number; // e.g. 1.5 (nguy cơ gặp trạm gác)
}

export const DIFFICULTY_MODIFIERS: LevelDifficultyModifier[] = [
  {
    id: 'diff-tight-patrol',
    name: 'Mật Thám Pháp Siết Chặt Vòng Vây',
    icon: '🕵️‍♂️',
    badge: 'Khủng Bố Trắng',
    badgeColor: 'border-red-500 bg-red-950/80 text-red-200',
    description: 'Thực dân Pháp huy động mật thám bủa vây các ngõ ngách, lập nhiều trạm gác bất ngờ.',
    historicalContext: 'Thời kỳ thực dân ráo riết truy lùng các tài liệu cách mạng và hội đồng hương bí mật.',
    alertStartDelta: 15,
    alertGrowthMultiplier: 1.35,
    paperCostModifier: 1.0,
    inkCostModifier: 1.0,
    fundsDeliveryCostDelta: 2,
    targetEnlightenmentDelta: 0,
    enlightenmentGainMultiplier: 1.0,
    fundsYieldMultiplier: 1.0,
    inspectionChanceMultiplier: 1.6,
  },
  {
    id: 'diff-mass-wave',
    name: 'Phong Trào Quần Chúng Sục Sôi',
    icon: '🔥',
    badge: 'Cao Trào Cách Mạng',
    badgeColor: 'border-amber-500 bg-amber-950/80 text-amber-200',
    description: 'Thợ thuyền và bà con nông dân hưởng ứng truyền đơn nồng nhiệt, phong trào quyên góp dâng cao.',
    historicalContext: 'Dưới sự thức tỉnh của báo chí cách mạng, quần chúng bãi công đòi quyền lợi khắp nơi.',
    alertStartDelta: 5,
    alertGrowthMultiplier: 1.15,
    paperCostModifier: 1.0,
    inkCostModifier: 1.0,
    fundsDeliveryCostDelta: 0,
    targetEnlightenmentDelta: 8,
    enlightenmentGainMultiplier: 1.3,
    fundsYieldMultiplier: 1.4,
    inspectionChanceMultiplier: 1.1,
  },
  {
    id: 'diff-supply-embargo',
    name: 'Khan Hiếm Giấy Mực Ngoại Nhập',
    icon: '📦',
    badge: 'Phong Tỏa Hàng Hóa',
    badgeColor: 'border-yellow-600 bg-yellow-950/80 text-yellow-200',
    description: 'Chính quyền thuộc địa kiểm soát nghiêm ngặt các hiệu buôn giấy và đại lý mực in.',
    historicalContext: 'Các chiến sĩ phải tiết kiệm từng mẩu giấy xén thừa và tự chế mực từ tro than và dầu lạc.',
    alertStartDelta: 0,
    alertGrowthMultiplier: 1.0,
    paperCostModifier: 1.35,
    inkCostModifier: 1.35,
    fundsDeliveryCostDelta: 1,
    targetEnlightenmentDelta: -4,
    enlightenmentGainMultiplier: 1.0,
    fundsYieldMultiplier: 0.9,
    inspectionChanceMultiplier: 1.0,
  },
  {
    id: 'diff-foggy-night',
    name: 'Đêm Sương Mù & Thời Cơ Bí Mật',
    icon: '🌙',
    badge: 'Giao Liên Thuận Lợi',
    badgeColor: 'border-emerald-500 bg-emerald-950/80 text-emerald-200',
    description: 'Thời tiết sương mù và đêm tối tạo vỏ bọc hoàn hảo cho các chuyến giao báo vượt sông.',
    historicalContext: 'Giao liên lợi dụng mưa gió, chợ phiên đông đúc để luồn lách qua mắt tuần binh.',
    alertStartDelta: -8,
    alertGrowthMultiplier: 0.75,
    paperCostModifier: 0.9,
    inkCostModifier: 0.9,
    fundsDeliveryCostDelta: 1,
    targetEnlightenmentDelta: 0,
    enlightenmentGainMultiplier: 1.15,
    fundsYieldMultiplier: 1.0,
    inspectionChanceMultiplier: 0.6,
  },
  {
    id: 'diff-informer-threat',
    name: 'Nghi Vấn Mật Vụ Chỉ Điểm',
    icon: '⚠️',
    badge: 'Cơ Sở Bị Nghi Vấn',
    badgeColor: 'border-purple-500 bg-purple-950/80 text-purple-200',
    description: 'Có tin báo tay sai mật thám đang rình rập quanh tòa soạn. Mỗi lần dập in đều cực kỳ căng thẳng.',
    historicalContext: 'Bài toán bảo vệ an toàn cho cơ quan đầu não trước mạng lưới tay sai và chỉ điểm thực dân.',
    alertStartDelta: 20,
    alertGrowthMultiplier: 1.45,
    paperCostModifier: 1.1,
    inkCostModifier: 1.1,
    fundsDeliveryCostDelta: 3,
    targetEnlightenmentDelta: 5,
    enlightenmentGainMultiplier: 1.1,
    fundsYieldMultiplier: 1.1,
    inspectionChanceMultiplier: 1.8,
  },
  {
    id: 'diff-intellectual-aid',
    name: 'Trí Thức Yêu Nước Chi Viện Quỹ',
    icon: '💰',
    badge: 'Hậu Phương Hùng Hậu',
    badgeColor: 'border-blue-500 bg-blue-950/80 text-blue-200',
    description: 'Các thân hào nhân sĩ và trí thức tiến bộ bí mật gửi tiền vàng ủng hộ quỹ in báo cách mạng.',
    historicalContext: 'Mặt trận dân tộc thống nhất rộng rãi đoàn kết mọi tầng lớp đồng bào yêu nước.',
    alertStartDelta: 5,
    alertGrowthMultiplier: 1.0,
    paperCostModifier: 1.0,
    inkCostModifier: 1.0,
    fundsDeliveryCostDelta: 0,
    targetEnlightenmentDelta: 4,
    enlightenmentGainMultiplier: 1.1,
    fundsYieldMultiplier: 1.6,
    inspectionChanceMultiplier: 1.0,
  },
];

/**
 * Hàm random độ khó ngẫu nhiên cho màn chơi
 * Giúp mỗi màn chơi và mỗi lượt chơi có trải nghiệm kịch tính và biến động thời cuộc khác nhau!
 */
export function generateRandomDifficulty(levelIndex: number): LevelDifficultyModifier {
  // Lấy ngẫu nhiên 1 trong các tình huống thời cuộc
  const randomIndex = Math.floor(Math.random() * DIFFICULTY_MODIFIERS.length);
  const baseModifier = DIFFICULTY_MODIFIERS[randomIndex];

  // Thêm độ co giãn ngẫu nhiên nhỏ (±5% để không ván nào giống hệt ván nào)
  const randomJitter = (Math.random() * 0.1 - 0.05); // -0.05 đến +0.05
  const levelScaling = levelIndex * 0.05; // Các màn sau mật thám dần gắt gao hơn

  return {
    ...baseModifier,
    alertStartDelta: Math.round(baseModifier.alertStartDelta + (Math.random() * 6 - 3)),
    alertGrowthMultiplier: Number((baseModifier.alertGrowthMultiplier + randomJitter + levelScaling).toFixed(2)),
    paperCostModifier: Number((baseModifier.paperCostModifier + randomJitter).toFixed(2)),
    inkCostModifier: Number((baseModifier.inkCostModifier + randomJitter).toFixed(2)),
    targetEnlightenmentDelta: Math.round(baseModifier.targetEnlightenmentDelta + (Math.random() * 4 - 2)),
    enlightenmentGainMultiplier: Number((baseModifier.enlightenmentGainMultiplier + randomJitter).toFixed(2)),
    inspectionChanceMultiplier: Number((baseModifier.inspectionChanceMultiplier + levelScaling).toFixed(2)),
  };
}
