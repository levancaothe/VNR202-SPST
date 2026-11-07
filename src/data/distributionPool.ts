import type { DistributionTarget, DistributionMethod } from './gameData';

export interface TargetTrait {
  name: string;
  enlightenmentDelta: number;
  alertDelta: number;
  cellChanceDelta: number;
  fundsDelta: number;
  color: string;
}

export interface MethodTrait {
  name: string;
  costDelta: number;
  riskReductionDelta: number;
  reachDelta: number;
  color: string;
}

export interface CheckpointSpot {
  id: string;
  name: string;
  icon: string;
  desc: string;
  safety: number; // 0 - 100
  conditionNote: string;
  conditionBadge: string;
  badgeColor: string;
}

// Pools of dynamic historical traits for Reader Target Audiences
const WORKER_TRAITS: TargetTrait[] = [
  {
    name: '🔥 Phong trào bãi công lên cao',
    enlightenmentDelta: 3,
    alertDelta: 2,
    cellChanceDelta: 8,
    fundsDelta: 1,
    color: 'text-amber-400',
  },
  {
    name: '⚠️ Cai xưởng tăng cường giám sát',
    enlightenmentDelta: 0,
    alertDelta: 4,
    cellChanceDelta: -4,
    fundsDelta: 0,
    color: 'text-red-400',
  },
  {
    name: '🤝 Công đoàn bí mật mở rộng',
    enlightenmentDelta: 2,
    alertDelta: -1,
    cellChanceDelta: 10,
    fundsDelta: 2,
    color: 'text-emerald-400',
  },
  {
    name: '📢 Sôi nổi đòi giảm giờ làm',
    enlightenmentDelta: 2,
    alertDelta: 1,
    cellChanceDelta: 5,
    fundsDelta: 1,
    color: 'text-amber-300',
  },
  {
    name: '⏳ Tạm thời trầm lắng sau kiểm tra',
    enlightenmentDelta: -1,
    alertDelta: -3,
    cellChanceDelta: -2,
    fundsDelta: 0,
    color: 'text-stone-400',
  },
];

const PEASANT_TRAITS: TargetTrait[] = [
  {
    name: '🌾 Vừa gặt xong mùa chiêm, sẵn lòng quyên góp',
    enlightenmentDelta: 1,
    alertDelta: 0,
    cellChanceDelta: 5,
    fundsDelta: 4,
    color: 'text-emerald-400',
  },
  {
    name: '⚡ Địa chủ bức thuế gay gắt, lòng dân phẫn uất',
    enlightenmentDelta: 3,
    alertDelta: 2,
    cellChanceDelta: 7,
    fundsDelta: 0,
    color: 'text-amber-400',
  },
  {
    name: '🛡️ Tuần đinh lùng sục cổng làng',
    enlightenmentDelta: -1,
    alertDelta: 3,
    cellChanceDelta: -5,
    fundsDelta: -1,
    color: 'text-red-400',
  },
  {
    name: '📖 Thơ vè truyền khẩu được ưa chuộng',
    enlightenmentDelta: 3,
    alertDelta: -1,
    cellChanceDelta: 6,
    fundsDelta: 1,
    color: 'text-yellow-300',
  },
  {
    name: '🤝 Hội Tương tế tương trợ bí mật',
    enlightenmentDelta: 2,
    alertDelta: -2,
    cellChanceDelta: 8,
    fundsDelta: 2,
    color: 'text-teal-400',
  },
];

const STUDENT_TRAITS: TargetTrait[] = [
  {
    name: '📚 Phong trào bãi khóa yêu nước dâng cao',
    enlightenmentDelta: 3,
    alertDelta: 2,
    cellChanceDelta: 6,
    fundsDelta: 3,
    color: 'text-amber-400',
  },
  {
    name: '💰 Giới tiểu thương nhiệt tình ủng hộ ngân quỹ',
    enlightenmentDelta: 1,
    alertDelta: 0,
    cellChanceDelta: 2,
    fundsDelta: 7,
    color: 'text-emerald-400',
  },
  {
    name: '👁️ Mật thám theo dõi các quán cà phê',
    enlightenmentDelta: 0,
    alertDelta: 4,
    cellChanceDelta: -3,
    fundsDelta: 0,
    color: 'text-red-400',
  },
  {
    name: '✍️ Hào hứng chép tay tài liệu truyền đơn',
    enlightenmentDelta: 2,
    alertDelta: 1,
    cellChanceDelta: 5,
    fundsDelta: 2,
    color: 'text-sky-300',
  },
  {
    name: '🕊️ Kết nối qua các hội ái hữu học sinh',
    enlightenmentDelta: 2,
    alertDelta: -1,
    cellChanceDelta: 7,
    fundsDelta: 3,
    color: 'text-teal-300',
  },
];

const SOLDIER_TRAITS: TargetTrait[] = [
  {
    name: '🎖️ Tinh thần phản chiến dâng cao',
    enlightenmentDelta: 4,
    alertDelta: -3,
    cellChanceDelta: 8,
    fundsDelta: 2,
    color: 'text-emerald-400',
  },
  {
    name: '🚨 Quan Pháp thanh tra đột xuất doanh trại',
    enlightenmentDelta: -1,
    alertDelta: 5,
    cellChanceDelta: -6,
    fundsDelta: 0,
    color: 'text-red-400',
  },
  {
    name: '⭐ Giác ngộ hàng ngũ cai đội người Việt',
    enlightenmentDelta: 3,
    alertDelta: 1,
    cellChanceDelta: 12,
    fundsDelta: 3,
    color: 'text-yellow-400',
  },
  {
    name: '🗣️ Lén chuyền tay nhau đọc báo trong ca gác',
    enlightenmentDelta: 3,
    alertDelta: 0,
    cellChanceDelta: 5,
    fundsDelta: 1,
    color: 'text-amber-300',
  },
  {
    name: '⚠️ Quân cảnh xiết chặt giờ giới nghiêm',
    enlightenmentDelta: 0,
    alertDelta: 4,
    cellChanceDelta: -3,
    fundsDelta: 0,
    color: 'text-rose-400',
  },
];

export function generateRandomTargets(): DistributionTarget[] {
  // Helper to pick 1 trait randomly
  const pickTrait = (traits: TargetTrait[]) =>
    traits[Math.floor(Math.random() * traits.length)];

  const workerTrait = pickTrait(WORKER_TRAITS);
  const peasantTrait = pickTrait(PEASANT_TRAITS);
  const studentTrait = pickTrait(STUDENT_TRAITS);
  const soldierTrait = pickTrait(SOLDIER_TRAITS);

  // Fluctuations: base ± random jitter (-2 to +2)
  const jitter = () => Math.floor(Math.random() * 5) - 2;

  return [
    {
      id: 'target-workers',
      name: 'Công nhân Nhà máy & Hầm mỏ',
      icon: '🏭',
      description:
        'Lực lượng tiên phong của giai cấp vô sản. Tiếp thu lý luận rất nhanh, sẵn sàng bãi công đòi tăng lương, giảm giờ làm.',
      enlightenmentGain: Math.min(
        100,
        Math.max(6, 12 + jitter() + workerTrait.enlightenmentDelta)
      ),
      cellChance: Math.min(
        100,
        Math.max(10, 35 + jitter() * 2 + workerTrait.cellChanceDelta)
      ),
      alertRisk: Math.min(
        100,
        Math.max(4, 14 + jitter() + workerTrait.alertDelta)
      ),
      fundsYield: Math.max(3, 8 + jitter() + workerTrait.fundsDelta),
      trait: workerTrait.name,
      traitColor: workerTrait.color,
    },
    {
      id: 'target-peasants',
      name: 'Bà con Nông dân cày cấy',
      icon: '🌾',
      description:
        'Lực lượng đông đảo nhất, chịu cảnh thuế khóa nặng nề và địa chủ bóc lột. Cần truyền tải bằng thơ vè mộc mạc, dễ nhớ.',
      enlightenmentGain: Math.min(
        100,
        Math.max(5, 10 + jitter() + peasantTrait.enlightenmentDelta)
      ),
      cellChance: Math.min(
        100,
        Math.max(15, 40 + jitter() * 2 + peasantTrait.cellChanceDelta)
      ),
      alertRisk: Math.min(
        100,
        Math.max(3, 8 + jitter() + peasantTrait.alertDelta)
      ),
      fundsYield: Math.max(2, 5 + jitter() + peasantTrait.fundsDelta),
      trait: peasantTrait.name,
      traitColor: peasantTrait.color,
    },
    {
      id: 'target-students',
      name: 'Trí thức, Học sinh & Tiểu tư sản',
      icon: '📚',
      description:
        'Giàu lòng yêu nước, khao khát độc lập, sẵn sàng quyên góp tài chính và làm nòng cốt biên tập, dịch thuật tài liệu.',
      enlightenmentGain: Math.min(
        100,
        Math.max(4, 9 + jitter() + studentTrait.enlightenmentDelta)
      ),
      cellChance: Math.min(
        100,
        Math.max(10, 25 + jitter() * 2 + studentTrait.cellChanceDelta)
      ),
      alertRisk: Math.min(
        100,
        Math.max(4, 10 + jitter() + studentTrait.alertDelta)
      ),
      fundsYield: Math.max(8, 18 + jitter() * 2 + studentTrait.fundsDelta),
      trait: studentTrait.name,
      traitColor: studentTrait.color,
    },
    {
      id: 'target-soldiers',
      name: 'Binh lính Khố đỏ & Cảnh binh',
      icon: '🎖️',
      description:
        'Vận động binh biến và thức tỉnh tinh thần dân tộc của con em người Việt bị thực dân ép cầm súng.',
      enlightenmentGain: Math.min(
        100,
        Math.max(8, 15 + jitter() + soldierTrait.enlightenmentDelta)
      ),
      cellChance: Math.min(
        100,
        Math.max(8, 20 + jitter() * 2 + soldierTrait.cellChanceDelta)
      ),
      alertRisk: Math.min(
        100,
        Math.max(8, 22 + jitter() + soldierTrait.alertDelta)
      ),
      fundsYield: Math.max(3, 6 + jitter() + soldierTrait.fundsDelta),
      trait: soldierTrait.name,
      traitColor: soldierTrait.color,
    },
  ];
}

// Pools of dynamic traits for Delivery Methods
const VENDOR_METHOD_TRAITS: MethodTrait[] = [
  {
    name: '🛒 Chợ phiên tấp nập, hòa lẫn dòng người',
    costDelta: 0,
    riskReductionDelta: 2,
    reachDelta: 0.1,
    color: 'text-emerald-400',
  },
  {
    name: '👮 Cảnh sát trừng phạt buôn gánh',
    costDelta: 1,
    riskReductionDelta: -2,
    reachDelta: 0,
    color: 'text-amber-400',
  },
  {
    name: '🎋 Người gánh quen mặt với bà con',
    costDelta: -1,
    riskReductionDelta: 3,
    reachDelta: 0,
    color: 'text-teal-300',
  },
];

const TRAIN_METHOD_TRAITS: MethodTrait[] = [
  {
    name: '🚂 Thủy thủ & nhân viên hỏa xa hỗ trợ che giấu',
    costDelta: -2,
    riskReductionDelta: 2,
    reachDelta: 0.2,
    color: 'text-emerald-400',
  },
  {
    name: '🔍 Trạm ga tăng cường soát vé và hành lý',
    costDelta: 2,
    riskReductionDelta: -3,
    reachDelta: -0.1,
    color: 'text-red-400',
  },
  {
    name: '📦 Tuyến tàu đêm hàng hóa thông suốt',
    costDelta: 0,
    riskReductionDelta: 1,
    reachDelta: 0.15,
    color: 'text-amber-300',
  },
];

const NIGHT_METHOD_TRAITS: MethodTrait[] = [
  {
    name: '🌙 Đêm mưa trăng khuất, đường phố vắng ngắt',
    costDelta: 0,
    riskReductionDelta: 4,
    reachDelta: 0.1,
    color: 'text-emerald-400',
  },
  {
    name: '🔦 Lính tuần cơ động tuần tra dày đặc',
    costDelta: 1,
    riskReductionDelta: -5,
    reachDelta: -0.1,
    color: 'text-red-400',
  },
  {
    name: '⚡ Quần chúng dậy sớm đọc truyền đơn trước cửa chợ',
    costDelta: 0,
    riskReductionDelta: 1,
    reachDelta: 0.2,
    color: 'text-yellow-300',
  },
];

const STUDY_METHOD_TRAITS: MethodTrait[] = [
  {
    name: '👥 Quần chúng cắt cử người cảnh giới từ đầu ngõ',
    costDelta: -1,
    riskReductionDelta: 3,
    reachDelta: 0.05,
    color: 'text-emerald-400',
  },
  {
    name: '👂 Lớp học đổi địa điểm liên tục tránh mật thám',
    costDelta: 1,
    riskReductionDelta: 2,
    reachDelta: -0.05,
    color: 'text-amber-300',
  },
  {
    name: '🕯️ Học đêm dưới ánh đèn dầu',
    costDelta: 0,
    riskReductionDelta: 0,
    reachDelta: 0,
    color: 'text-stone-300',
  },
];

export function generateRandomMethods(): DistributionMethod[] {
  const pick = (arr: MethodTrait[]) => arr[Math.floor(Math.random() * arr.length)];
  const vendorT = pick(VENDOR_METHOD_TRAITS);
  const trainT = pick(TRAIN_METHOD_TRAITS);
  const nightT = pick(NIGHT_METHOD_TRAITS);
  const studyT = pick(STUDY_METHOD_TRAITS);

  return [
    {
      id: 'method-vendor',
      name: 'Giao liên giả người gánh hàng xén & buôn cá',
      icon: '🧺',
      description:
        'Giấu tờ báo dưới lớp rau dưa, cá tươi hoặc trong đáy đòn gánh tre rỗng. Rất khéo léo qua các trạm kiểm soát.',
      cost: Math.max(2, 4 + vendorT.costDelta),
      riskReduction: 6 + vendorT.riskReductionDelta,
      reachMultiplier: Number((1.0 + vendorT.reachDelta).toFixed(2)),
      trait: vendorT.name,
      traitColor: vendorT.color,
    },
    {
      id: 'method-train-boat',
      name: 'Đường dây thủy thủ & Hỏa xa Bắc - Nam',
      icon: '🚂',
      description:
        'Tận dụng các chuyến tàu hỏa Hải Phòng - Hà Nội và thuyền buôn duyên hải để vận chuyển số lượng lớn liên tỉnh.',
      cost: Math.max(5, 10 + trainT.costDelta),
      riskReduction: 3 + trainT.riskReductionDelta,
      reachMultiplier: Number((1.6 + trainT.reachDelta).toFixed(2)),
      trait: trainT.name,
      traitColor: trainT.color,
    },
    {
      id: 'method-night-drop',
      name: 'Rải truyền đơn & Dán báo bí mật ban đêm',
      icon: '🌙',
      description:
        'Lợi dụng đêm tối dán báo tại cổng chợ, trường học, rạp hát. Gây tiếng vang chấn động nhưng dễ kích động lính tuần tra.',
      cost: Math.max(1, 2 + nightT.costDelta),
      riskReduction: -8 + nightT.riskReductionDelta,
      reachMultiplier: Number((1.4 + nightT.reachDelta).toFixed(2)),
      trait: nightT.name,
      traitColor: nightT.color,
    },
    {
      id: 'method-study-group',
      name: 'Lớp học đọc báo & Tổ chức truyền khẩu',
      icon: '👥',
      description:
        'Một đồng chí biết chữ đọc to cho quần chúng cùng nghe tại chòi canh hoặc lò gạch bí mật, hạn chế giữ giấy tờ tùy thân.',
      cost: Math.max(3, 6 + studyT.costDelta),
      riskReduction: 12 + studyT.riskReductionDelta,
      reachMultiplier: Number((0.9 + studyT.reachDelta).toFixed(2)),
      trait: studyT.name,
      traitColor: studyT.color,
    },
  ];
}

// Dynamic Checkpoint Hiding Spots Generator for Mini-game
interface SpotCondition {
  note: string;
  badge: string;
  delta: number;
  badgeColor: string;
}

const UNIFIED_BADGE_STYLE = 'bg-[#2d1b10] text-[#e6b97d] border-[#6b472e]';

const BAMBOO_CONDITIONS: SpotCondition[] = [
  {
    note: 'Ống tre chốt chặt, mắt tre tự nhiên không tì vết.',
    badge: '+5% An toàn',
    delta: 5,
    badgeColor: UNIFIED_BADGE_STYLE,
  },
  {
    note: 'Lính gác gõ thử báng súng vào đòn gánh kiểm tra độ rỗng.',
    badge: '-8% Nguy cơ',
    delta: -8,
    badgeColor: UNIFIED_BADGE_STYLE,
  },
  {
    note: 'Gọt phẳng tinh vi, lính Pháp chỉ nhìn qua rồi cho đi.',
    badge: '+7% An toàn',
    delta: 7,
    badgeColor: UNIFIED_BADGE_STYLE,
  },
  {
    note: 'Đòn gánh dính bùn đất đồng ruộng, lính không buồn sờ.',
    badge: '+4% An toàn',
    delta: 4,
    badgeColor: UNIFIED_BADGE_STYLE,
  },
];

const FISH_CONDITIONS: SpotCondition[] = [
  {
    note: 'Mùi cá nồng nặc làm lính Pháp bịt mũi xua tay cho qua.',
    badge: '+6% An toàn',
    delta: 6,
    badgeColor: UNIFIED_BADGE_STYLE,
  },
  {
    note: 'Có chó săn béc-giê đánh hơi sục sạo gần thùng cá!',
    badge: '-14% Nguy cơ',
    delta: -14,
    badgeColor: UNIFIED_BADGE_STYLE,
  },
  {
    note: 'Bọc 3 lớp giấy dầu kín mít, không hề rò rỉ mực.',
    badge: '+4% An toàn',
    delta: 4,
    badgeColor: UNIFIED_BADGE_STYLE,
  },
  {
    note: 'Trời nắng gắt, ruồi bâu làm lính vội vàng kiểm tra loa qua.',
    badge: '+5% An toàn',
    delta: 5,
    badgeColor: UNIFIED_BADGE_STYLE,
  },
];

const GRAIN_CONDITIONS: SpotCondition[] = [
  {
    note: 'Bồ thóc đầy ắp nặng nề, lính lười bới sâu xuống đáy.',
    badge: '+8% An toàn',
    delta: 8,
    badgeColor: UNIFIED_BADGE_STYLE,
  },
  {
    note: 'Lính gác dùng xiên sắt dài đâm thọc kiểm tra bồ ngũ cốc!',
    badge: '-12% Nguy cơ',
    delta: -12,
    badgeColor: UNIFIED_BADGE_STYLE,
  },
  {
    note: 'Ngô khô trút ngập che lấp hoàn toàn tiếng sột soạt.',
    badge: '+5% An toàn',
    delta: 5,
    badgeColor: UNIFIED_BADGE_STYLE,
  },
  {
    note: 'Lót thêm manh chiếu rách dưới đáy để ngụy trang.',
    badge: '+3% An toàn',
    delta: 3,
    badgeColor: UNIFIED_BADGE_STYLE,
  },
];

const BASKET_CONDITIONS: SpotCondition[] = [
  {
    note: 'Trời chập choạng tối mưa phùn, lính chỉ soi đèn lướt qua.',
    badge: '+18% An toàn',
    delta: 18,
    badgeColor: UNIFIED_BADGE_STYLE,
  },
  {
    note: 'Lính gác giật phăng manh áo tơi bắt bới từng gói đồ!',
    badge: '-15% Nguy cơ',
    delta: -15,
    badgeColor: UNIFIED_BADGE_STYLE,
  },
  {
    note: 'Giao liên giả làm học sinh lễ phép, lính bớt săm soi.',
    badge: '+12% An toàn',
    delta: 12,
    badgeColor: UNIFIED_BADGE_STYLE,
  },
  {
    note: 'Chiếc xe đạp cũ kỹ lấm bùn không gây chú ý.',
    badge: '+8% An toàn',
    delta: 8,
    badgeColor: UNIFIED_BADGE_STYLE,
  },
];

export function generateCheckpointSpots(): CheckpointSpot[] {
  const pick = (arr: SpotCondition[]) => arr[Math.floor(Math.random() * arr.length)];
  const bambooC = pick(BAMBOO_CONDITIONS);
  const fishC = pick(FISH_CONDITIONS);
  const grainC = pick(GRAIN_CONDITIONS);
  const basketC = pick(BASKET_CONDITIONS);

  // Fluctuations: base ± random jitter
  const randomJitter = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const bambooSafety = Math.min(
    100,
    Math.max(25, 82 + randomJitter(-4, 5) + bambooC.delta)
  );
  const fishSafety = Math.min(
    100,
    Math.max(25, 86 + randomJitter(-5, 5) + fishC.delta)
  );
  const grainSafety = Math.min(
    100,
    Math.max(25, 68 + randomJitter(-5, 6) + grainC.delta)
  );
  const basketSafety = Math.min(
    100,
    Math.max(20, 36 + randomJitter(-4, 8) + basketC.delta)
  );

  return [
    {
      id: 'spot-bamboo',
      name: 'Đáy Đòn Gánh Tre Rỗng',
      icon: '🎋',
      desc: 'Cuộn tròn tài liệu nhét sâu vào ống tre đòn gánh đã gọt khéo léo.',
      safety: bambooSafety,
      conditionNote: bambooC.note,
      conditionBadge: bambooC.badge,
      badgeColor: bambooC.badgeColor,
    },
    {
      id: 'spot-fish',
      name: 'Giữa Thùng Cá Ươn',
      icon: '🐟',
      desc: 'Bọc giấy dầu chống nước rồi giấu dưới lớp cá tanh, lính Pháp rất ngại thò tay bới.',
      safety: fishSafety,
      conditionNote: fishC.note,
      conditionBadge: fishC.badge,
      badgeColor: fishC.badgeColor,
    },
    {
      id: 'spot-grain',
      name: 'Đáy Bồ Thóc Ngô',
      icon: '🌾',
      desc: 'Lót dưới đáy bồ thóc dày, cần cào sâu mới thấy.',
      safety: grainSafety,
      conditionNote: grainC.note,
      conditionBadge: grainC.badge,
      badgeColor: grainC.badgeColor,
    },
    {
      id: 'spot-basket',
      name: 'Đáy Túi Vải Gác Xe Đạp',
      icon: '🚲',
      desc: 'Chỉ che bằng manh áo tơi, nếu lính sờ nắn kỹ là phát hiện ngay.',
      safety: basketSafety,
      conditionNote: basketC.note,
      conditionBadge: basketC.badge,
      badgeColor: basketC.badgeColor,
    },
  ];
}

