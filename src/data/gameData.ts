export interface ScenarioOption {
  text: string;
  effect: {
    paper?: number;
    ink?: number;
    funds?: number;
    enlightenment?: number;
    alertLevel?: number;
    secretCells?: number;
    printedCopies?: number;
  };
  feedback: string;
}

export interface GameEvent {
  id: string;
  title: string;
  description: string;
  historicalContext?: string;
  options: ScenarioOption[];
}

export interface ArticleOption {
  id: string;
  title: string;
  subtitle: string;
  type: 'radical' | 'moderate' | 'mass';
  excerpt: string;
  authorPseudonym: string;
  targetClass: string;
  statBonus: {
    enlightenment: number;
    alertLevel: number;
    funds?: number;
  };
}

export interface PrintingBase {
  id: string;
  name: string;
  location: string;
  description: string;
  riskMultiplier: number; // Tỉ lệ tăng độ động khi in
  efficiency: number;     // Tỉ lệ sản lượng báo tạo ra
  paperCostModifier: number;
  inkCostModifier: number;
  costToRelocate: number;
  unlockedAtLevel: number;
}

export interface DistributionTarget {
  id: string;
  name: string;
  icon: string;
  description: string;
  enlightenmentGain: number;
  cellChance: number; // Xác suất gây dựng thêm chi bộ (0 - 100)
  alertRisk: number;
  fundsYield: number; // Tiền quyên góp thu về từ quần chúng
}

export interface DistributionMethod {
  id: string;
  name: string;
  icon: string;
  description: string;
  cost: number;
  riskReduction: number;
  reachMultiplier: number;
}

export interface CodexItem {
  id: string;
  levelId: number;
  title: string;
  subtitle: string;
  year: string;
  editorInChief: string;
  mastheadImage: string; // Tên huy hiệu hoặc mô tả minh họa
  historicalSignificance: string;
  excerpt: string;
  documentSource: string;
  unlockedByDefault?: boolean;
}

export interface LevelData {
  id: number;
  year: string;
  title: string;
  period: string;
  newspaperName: string;
  newspaperSlogan: string;
  description: string;
  targetEnlightenment: number;
  startingStats: {
    paper: number;
    ink: number;
    funds: number;
    enlightenment: number;
    alertLevel: number;
    secretCells: number;
  };
  articles: ArticleOption[];
  events: GameEvent[];
  historicalFact: string; // Trích đoạn lịch sử sau khi thắng level
  codexUnlockId: string;
}

export interface MapPoint {
  id: string;
  name: string;
  shortName: string;
  region: string;
  role: string;
  x: number; // percentage
  y: number; // percentage
  dangerLevel: 'Thấp' | 'Trung bình' | 'Cực cao';
  description: string;
  historicalNote: string;
  bonus: {
    enlightenment: number;
    funds: number;
    alertRisk: number;
    cellChance: number;
  };
}

export const MAP_POINTS: MapPoint[] = [
  {
    id: 'point-guangzhou',
    name: 'Quảng Châu (Trung Quốc)',
    shortName: 'Quảng Châu',
    region: 'Hải Ngoại',
    role: 'Nơi khai sinh Báo Thanh Niên (1925)',
    x: 82,
    y: 12,
    dangerLevel: 'Thấp',
    description: 'Trụ sở Tổng bộ Hội Việt Nam Cách mạng Thanh niên tại đường Văn Minh. Xưởng in hải ngoại an toàn trước mật thám Pháp.',
    historicalNote: 'Nguyễn Ái Quốc tổ chức huấn luyện cán bộ và in báo Thanh Niên gửi về nước.',
    bonus: {
      enlightenment: 6,
      funds: 5,
      alertRisk: -4,
      cellChance: 10,
    },
  },
  {
    id: 'point-pac-bo',
    name: 'Hang Pác Bó (Cao Bằng)',
    shortName: 'Pác Bó',
    region: 'Chiến khu Việt Bắc',
    role: 'Căn cứ in báo "Việt Nam Độc Lập" (1941)',
    x: 48,
    y: 15,
    dangerLevel: 'Thấp',
    description: 'Căn cứ địa đầu nguồn của cách mạng, có máy in đá tự đục và suối Lê-nin chở che.',
    historicalNote: 'Bác Hồ tự tay khắc tranh gỗ minh họa và làm thơ lục bát tuyên truyền cứu quốc.',
    bonus: {
      enlightenment: 8,
      funds: 2,
      alertRisk: -5,
      cellChance: 15,
    },
  },
  {
    id: 'point-hai-phong',
    name: 'Cảng Hải Phòng',
    shortName: 'Hải Phòng',
    region: 'Bắc Kỳ',
    role: 'Cửa ngõ tiếp nhận báo từ đường biển',
    x: 58,
    y: 25,
    dangerLevel: 'Cực cao',
    description: 'Nơi các thủy thủ và phu bến cảng bí mật chuyển thùng báo từ tàu buôn lên bờ.',
    historicalNote: 'Mật thám Pháp lập trạm kiểm soát gắt gao ngay tại các kho hàng và cảng cá.',
    bonus: {
      enlightenment: 10,
      funds: 12,
      alertRisk: 6,
      cellChance: 15,
    },
  },
  {
    id: 'point-hanoi',
    name: 'Hà Nội (Hỏa Lò & Phố Cổ)',
    shortName: 'Hà Nội',
    region: 'Bắc Kỳ',
    role: 'Trung tâm báo chí bí mật & công khai',
    x: 52,
    y: 24,
    dangerLevel: 'Cực cao',
    description: 'Nơi ra đời báo Búa Liềm (1929), báo Dân Chúng (1938) và báo chí trong lao tù Hỏa Lò.',
    historicalNote: 'Các chi bộ bí mật ẩn mình trong các ngõ phố nhỏ và trường học để tiếp tế truyền đơn.',
    bonus: {
      enlightenment: 14,
      funds: 8,
      alertRisk: 5,
      cellChance: 20,
    },
  },
  {
    id: 'point-nghe-an',
    name: 'Nghệ An - Hà Tĩnh',
    shortName: 'Nghệ Tĩnh',
    region: 'Trung Kỳ',
    role: 'Ngọn lửa Xô viết Nghệ Tĩnh (1930 - 1931)',
    x: 48,
    y: 38,
    dangerLevel: 'Cực cao',
    description: 'Vùng đất kiên trung, nơi các tờ báo Xô viết đầu tiên được in trên đá thô sơ.',
    historicalNote: 'Quần chúng công nông đứng lên lập chính quyền Xô viết dưới sự hướng dẫn của báo Đảng.',
    bonus: {
      enlightenment: 16,
      funds: 4,
      alertRisk: 4,
      cellChance: 25,
    },
  },
  {
    id: 'point-saigon',
    name: 'Sài Gòn - Chợ Lớn',
    shortName: 'Sài Gòn',
    region: 'Nam Kỳ',
    role: 'Tòa soạn công khai & Phong trào thợ thuyền Ba Son',
    x: 45,
    y: 75,
    dangerLevel: 'Trung bình',
    description: 'Nơi phân phối mạnh mẽ các tờ báo tiến bộ và tổ chức phong trào Đông Dương Đại hội.',
    historicalNote: 'Tầng lớp công nhân xưởng Ba Son và trí thức Sài Gòn quyên góp tài chính rất mạnh.',
    bonus: {
      enlightenment: 12,
      funds: 15,
      alertRisk: 3,
      cellChance: 15,
    },
  },
  {
    id: 'point-con-dao',
    name: 'Nhà tù Côn Đảo',
    shortName: 'Côn Đảo',
    region: 'Nam Kỳ (Biển Đông)',
    role: 'Ngọn lửa trong ngục tối đế quốc',
    x: 52,
    y: 89,
    dangerLevel: 'Cực cao',
    description: 'Các chiến sĩ cộng sản dùng tro than chép báo truyền tay giữa các hầm xà lim.',
    historicalNote: 'Biến ngục tù thực dân thành trường học cách mạng và tổ chức vượt ngục mang tài liệu về đất liền.',
    bonus: {
      enlightenment: 18,
      funds: 0,
      alertRisk: 9,
      cellChance: 20,
    },
  },
];

export const GAME_BASES: PrintingBase[] = [
  {
    id: 'base-secret-room',
    name: 'Gác xép nhà cơ sở bí mật (Hà Nội)',
    location: 'Khu phố cổ / Ngoại ô Hà Nội',
    description: 'Ẩn mình trong khu dân cư đông đúc. Tiện phân phối nhưng dễ bị hàng xóm nghi ngờ nếu máy in thạch gây tiếng động.',
    riskMultiplier: 1.2,
    efficiency: 1.0,
    paperCostModifier: 1.0,
    inkCostModifier: 1.0,
    costToRelocate: 15,
    unlockedAtLevel: 1,
  },
  {
    id: 'base-guangzhou',
    name: 'Trụ sở Việt Nam Thanh niên Cách mạng Đồng chí Hội',
    location: 'Đường Văn Minh, Quảng Châu (Trung Quốc)',
    description: 'An toàn hơn trước mật thám Pháp, song việc chuyển báo và tài liệu vượt biên giới về nước đòi hỏi đường dây giao liên tinh nhuệ.',
    riskMultiplier: 0.7,
    efficiency: 1.3,
    paperCostModifier: 0.9,
    inkCostModifier: 0.9,
    costToRelocate: 25,
    unlockedAtLevel: 1,
  },
  {
    id: 'base-prison-cell',
    name: 'Buồng giam xà lim Hỏa Lò / Côn Đảo',
    location: 'Ngục tù đế quốc',
    description: 'Không có máy in, các đồng chí phải chép tay trên giấy mỏng, giấu trong ống tre hoặc bánh xà phòng. Độ động cực cao nếu bị giám thị lục soát.',
    riskMultiplier: 1.6,
    efficiency: 0.7,
    paperCostModifier: 1.5,
    inkCostModifier: 1.5,
    costToRelocate: 10,
    unlockedAtLevel: 2,
  },
  {
    id: 'base-legal-office',
    name: 'Tòa soạn báo công khai thời Mặt trận Dân chủ',
    location: 'Phố Chợ Hôm / Sài Gòn',
    description: 'Tận dụng thời kỳ Mặt trận Bình dân Pháp lên nắm quyền, báo chí xuất bản hợp pháp nhưng luôn bị mật thám kiểm duyệt rình rập tịch thu.',
    riskMultiplier: 0.9,
    efficiency: 1.6,
    paperCostModifier: 0.8,
    inkCostModifier: 0.8,
    costToRelocate: 30,
    unlockedAtLevel: 3,
  },
  {
    id: 'base-pac-bo-cave',
    name: 'Hang đá Pác Bó / Căn cứ địa Việt Bắc',
    location: 'Hà Quảng (Cao Bằng) - Rừng núi Việt Bắc',
    description: 'Được đồng bào chở che, tự đục bản gỗ khắc chữ và tranh vẽ minh họa. Căn cứ cách mạng vững chắc chuẩn bị cho Tổng khởi nghĩa.',
    riskMultiplier: 0.5,
    efficiency: 1.5,
    paperCostModifier: 1.1,
    inkCostModifier: 1.0,
    costToRelocate: 35,
    unlockedAtLevel: 4,
  },
];

export const DISTRIBUTION_TARGETS: DistributionTarget[] = [
  {
    id: 'target-workers',
    name: 'Công nhân Nhà máy & Hầm mỏ',
    icon: '🏭',
    description: 'Lực lượng tiên phong của giai cấp vô sản. Tiếp thu lý luận rất nhanh, sẵn sàng bãi công đòi tăng lương, giảm giờ làm.',
    enlightenmentGain: 12,
    cellChance: 35,
    alertRisk: 14,
    fundsYield: 8,
  },
  {
    id: 'target-peasants',
    name: 'Bà con Nông dân cày cấy',
    icon: '🌾',
    description: 'Lực lượng đông đảo nhất, chịu cảnh thuế khóa nặng nề và địa chủ bóc lột. Cần truyền tải bằng thơ vè mộc mạc, dễ nhớ.',
    enlightenmentGain: 10,
    cellChance: 40,
    alertRisk: 8,
    fundsYield: 5,
  },
  {
    id: 'target-students',
    name: 'Trí thức, Học sinh & Tiểu tư sản',
    icon: '📚',
    description: 'Giàu lòng yêu nước, khao khát độc lập, sẵn sàng quyên góp tài chính và làm nòng cốt biên tập, dịch thuật tài liệu.',
    enlightenmentGain: 9,
    cellChance: 25,
    alertRisk: 10,
    fundsYield: 18,
  },
  {
    id: 'target-soldiers',
    name: 'Binh lính Khố đỏ & Cảnh binh',
    icon: '🎖️',
    description: 'Vận động binh biến và thức tỉnh tinh thần dân tộc của con em người Việt bị thực dân ép cầm súng.',
    enlightenmentGain: 15,
    cellChance: 20,
    alertRisk: 22,
    fundsYield: 6,
  },
];

export const DISTRIBUTION_METHODS: DistributionMethod[] = [
  {
    id: 'method-vendor',
    name: 'Giao liên giả người gánh hàng xén & buôn cá',
    icon: '🧺',
    description: 'Giấu tờ báo dưới lớp rau dưa, cá tươi hoặc trong đáy đòn gánh tre rỗng. Rất khéo léo qua các trạm kiểm soát.',
    cost: 4,
    riskReduction: 6,
    reachMultiplier: 1.0,
  },
  {
    id: 'method-train-boat',
    name: 'Đường dây thủy thủ & Hỏa xa Bắc - Nam',
    icon: '🚂',
    description: 'Tận dụng các chuyến tàu hỏa Hải Phòng - Hà Nội và thuyền buôn duyên hải để vận chuyển số lượng lớn liên tỉnh.',
    cost: 10,
    riskReduction: 3,
    reachMultiplier: 1.6,
  },
  {
    id: 'method-night-drop',
    name: 'Rải truyền đơn & Dán báo bí mật ban đêm',
    icon: '🌙',
    description: 'Lợi dụng đêm tối dán báo tại cổng chợ, trường học, rạp hát. Gây tiếng vang chấn động nhưng dễ kích động lính tuần tra.',
    cost: 2,
    riskReduction: -8, // Tăng rủi ro
    reachMultiplier: 1.4,
  },
  {
    id: 'method-study-group',
    name: 'Lớp học đọc báo & Tổ chức truyền khẩu',
    icon: '👥',
    description: 'Một đồng chí biết chữ đọc to cho quần chúng cùng nghe tại chòi canh hoặc lò gạch bí mật, hạn chế giữ giấy tờ tùy thân.',
    cost: 6,
    riskReduction: 12,
    reachMultiplier: 0.9,
  },
];

export const CODEX_DATABASE: CodexItem[] = [
  {
    id: 'codex-thanh-nien',
    levelId: 1,
    title: 'Báo Thanh Niên',
    subtitle: 'Cơ quan của Tổng bộ Việt Nam Thanh niên Cách mạng Đồng chí Hội',
    year: '1925 - 1930',
    editorInChief: 'Nguyễn Ái Quốc',
    mastheadImage: '📜',
    historicalSignificance: 'Số đầu tiên xuất bản ngày 21/6/1925 tại Quảng Châu (Trung Quốc). Đây là tờ báo mở đầu cho nền báo chí cách mạng Việt Nam, truyền bá chủ nghĩa Mác - Lênin vào trong nước, chuẩn bị về mặt chính trị và tư tưởng cho sự ra đời của Đảng Cộng sản Việt Nam.',
    excerpt: '"Không có gì quý hơn độc lập tự do. Cách mệnh trước hết phải có Đảng cách mệnh, để trong thì vận động và tổ chức dân chúng, ngoài thì liên lạc với dân tộc bị áp bức và vô sản giai cấp mọi nơi."',
    documentSource: 'Trích Đường Kách Mệnh & Giáo trình Lịch sử Đảng Cộng sản Việt Nam (NXB Chính trị Quốc gia Sự thật).',
    unlockedByDefault: true,
  },
  {
    id: 'codex-bua-liem',
    levelId: 1,
    title: 'Báo Búa Liềm',
    subtitle: 'Cơ quan ngôn luận Trung ương của Đông Dương Cộng sản Đảng',
    year: '1929 - 1930',
    editorInChief: 'Ban Chấp hành Trung ương lâm thời',
    mastheadImage: '⚒️',
    historicalSignificance: 'Ra đời tháng 6/1929 tại Hà Nội. Báo in bằng kỹ thuật in thạch thô sơ, kiên quyết vạch trần tội ác thực dân, kêu gọi thành lập Đảng tiền phong của giai cấp công nhân Việt Nam.',
    excerpt: '"Công nông liên hiệp lại! Muốn giải phóng bản thân, giai cấp thợ thuyền và dân cày phải tự mình đứng lên đánh đổ đế quốc thực dân và phong kiến tay sai."',
    documentSource: 'Văn kiện Đảng Toàn tập, Tập 1.',
  },
  {
    id: 'codex-lao-tu',
    levelId: 2,
    title: 'Báo chí trong Nhà tù Thực dân (Lao Tù, Tiếng Bom)',
    subtitle: 'Biến ngục tù đế quốc thành trường học cách mạng',
    year: '1930 - 1935',
    editorInChief: 'Chi bộ Nhà tù Hỏa Lò, Côn Đảo, Buôn Ma Thuột',
    mastheadImage: '⛓️',
    historicalSignificance: 'Trong giai đoạn khủng bố trắng sau Xô viết Nghệ Tĩnh (1930-1931), các chiến sĩ cộng sản bị đày ải trong xà lim vẫn bí mật ra các tờ báo viết tay trên giấy pơ-luya giấu trong đáy guốc, xà phòng để củng cố lập trường vô sản và tôi luyện ý chí gang thép.',
    excerpt: '"Thân thể ở trong lao / Tinh thần ở ngoài lao / Muốn nên sự nghiệp lớn / Tinh thần càng phải cao!"',
    documentSource: 'Hồi ký Cách mạng & Lịch sử Chi bộ Nhà tù Côn Đảo.',
  },
  {
    id: 'codex-dan-chung',
    levelId: 3,
    title: 'Báo Dân Chúng & Báo Tin Tức',
    subtitle: 'Đỉnh cao báo chí công khai thời kỳ Mặt trận Dân chủ',
    year: '1936 - 1939',
    editorInChief: 'Hà Huy Tập, Phan Đăng Lưu, Trường Chinh',
    mastheadImage: '📢',
    historicalSignificance: 'Lợi dụng tình hình cánh tả nắm quyền tại Pháp, Đảng tổ chức xuất bản công khai báo tiếng Việt và tiếng Pháp. Báo Dân Chúng phát hành mỗi kỳ tới 15.000 bản, kỷ lục chưa từng có thời bấy giờ, trực tiếp dẫn dắt phong trào Đông Dương Đại hội đòi tự do dân chủ, cơm áo hòa bình.',
    excerpt: '"Chúng tôi đòi tự do hội họp, tự do nghiệp đoàn, tự do xuất bản, ân xá chính trị phạm, giảm thuế khóa và thực hiện ngày làm việc 8 giờ cho thợ thuyền."',
    documentSource: 'Báo Dân Chúng số 1 (30/8/1938), Thư viện Quốc gia Việt Nam.',
  },
  {
    id: 'codex-viet-nam-doc-lap',
    levelId: 4,
    title: 'Báo Việt Nam Độc Lập ("Việt Lập")',
    subtitle: 'Cơ quan của Tỉnh bộ Việt Minh Cao Bằng',
    year: '1941 - 1945',
    editorInChief: 'Nguyễn Ái Quốc (Bác Hồ) trực tiếp sáng lập và viết bài',
    mastheadImage: '⛰️',
    historicalSignificance: 'Số 1 ra ngày 1/8/1941 tại hang Cốc Bó (Pác Bó, Cao Bằng). Báo in bằng bàn in đá thô sơ, do Bác Hồ tự khắc gỗ minh họa và viết bài bằng thể thơ, vè lục bát bình dị để bà con dân tộc Tày, Nùng, Dao đều đọc hiểu và nô nức tham gia Mặt trận Việt Minh.',
    excerpt: '"Dân ta xin nhớ chữ đồng / Đồng tình, đồng sức, đồng lòng, đồng minh / Gươm cày chung một mối tình / Cứu non cứu nước quang vinh đời đời."',
    documentSource: 'Bảo tàng Lịch sử Quốc gia & Khu Di tích Pác Bó.',
  },
  {
    id: 'codex-co-giai-phong',
    levelId: 4,
    title: 'Báo Cờ Giải Phóng & Báo Cứu Quốc',
    subtitle: 'Tiếng kèn chuẩn bị Tổng khởi nghĩa Tháng Tám 1945',
    year: '1942 - 1945',
    editorInChief: 'Tổng Bí thư Trường Chinh (Cờ Giải Phóng)',
    mastheadImage: '🚩',
    historicalSignificance: 'Tuyên truyền đường lối cứu nước, vạch trần bản chất phát xít Nhật - Pháp. Đến đêm ngày 9/3/1945 khi Nhật đảo chính Pháp, báo kịp thời ra số đặc biệt phổ biến bản Chỉ thị lịch sử "Nhật - Pháp bắn nhau và hành động của chúng ta", mở đường cho thắng lợi thần tốc của Cách mạng Tháng Tám.',
    excerpt: '"Giờ quyết định cho vận mệnh dân tộc ta đã đến! Toàn quốc đồng bào hãy đứng dậy đem sức ta mà tự giải phóng cho ta!"',
    documentSource: 'Chỉ thị Ban Thường vụ Trung ương Đảng (12/3/1945).',
  },
];

export const GAME_LEVELS: LevelData[] = [
  // LEVEL 1: 1925 - 1930
  {
    id: 1,
    year: '1925 - 1930',
    title: 'Tiếng Chuông Quảng Châu',
    period: 'Thời kỳ chuẩn bị thành lập Đảng',
    newspaperName: 'BÁO THANH NIÊN',
    newspaperSlogan: 'CƠ QUAN CỦA HỘI VIỆT NAM CÁCH MẠNG THANH NIÊN',
    description: 'Năm 1925, đồng chí Nguyễn Ái Quốc sáng lập Hội Việt Nam Cách mạng Thanh niên tại Quảng Châu. Nhiệm vụ của bạn là mở xưởng in báo Thanh Niên, đào tạo thanh niên yêu nước và chuyển báo bí mật về nước để gieo mầm cách mạng!',
    targetEnlightenment: 35,
    startingStats: {
      paper: 60,
      ink: 50,
      funds: 60,
      enlightenment: 5,
      alertLevel: 10,
      secretCells: 1,
    },
    historicalFact: 'Ngày 21/6/1925, số đầu tiên của báo Thanh Niên xuất bản. Báo đã phát hành được 208 số đến năm 1930, là ngọn đuốc soi đường chuẩn bị sự ra đời của Đảng Cộng sản Việt Nam vào ngày 3/2/1930!',
    codexUnlockId: 'codex-thanh-nien',
    articles: [
      {
        id: 'art-1-1',
        title: 'Đường Kách Mệnh & Sứ mệnh Người Thanh niên',
        subtitle: 'Bàn về tư tưởng vô sản và đạo đức người chiến sĩ cách mạng',
        type: 'radical',
        excerpt: 'Cách mệnh là việc chung của cả dân chúng chứ không phải việc một hai người. Người cách mệnh phải giữ chủ nghĩa cho vững, hy sinh vì dân tộc...',
        authorPseudonym: 'Nguyễn Ái Quốc',
        targetClass: 'Thanh niên, Học sinh, Trí thức',
        statBonus: { enlightenment: 14, alertLevel: 12, funds: 5 },
      },
      {
        id: 'art-1-2',
        title: 'Thực trạng lầm than của phu xe & thợ bến cảng Hải Phòng',
        subtitle: 'Tiếng kêu cứu trước ách sưu cao thuế nặng và bóc lột dã man',
        type: 'moderate',
        excerpt: 'Mỗi ngày làm việc mười bốn giờ, roi vọt trên lưng, đồng lương còm cõi không đủ nuôi vợ dại con thơ. Phải liên hiệp lại để đòi quyền sống!',
        authorPseudonym: 'Thanh Dân',
        targetClass: 'Công nhân bến cảng & thợ mỏ',
        statBonus: { enlightenment: 10, alertLevel: 6, funds: 8 },
      },
      {
        id: 'art-1-3',
        title: 'Vè Đánh đuổi Thực dân - Đòi lại non sông',
        subtitle: 'Thơ ca yêu nước bình dân dễ ngâm, dễ truyền khẩu',
        type: 'mass',
        excerpt: 'Hỡi ai con Lạc cháu Hồng / Nhìn non nhìn nước mà lòng chẳng đau? / Rủ nhau đánh đuổi Tây tàu / Đem về độc lập dài lâu muôn đời!',
        authorPseudonym: 'Ái Dân',
        targetClass: 'Bà con nông dân & dân nghèo thành thị',
        statBonus: { enlightenment: 8, alertLevel: 4, funds: 12 },
      },
    ],
    events: [
      {
        id: 'evt-1-1',
        title: 'Mật thám Pháp rà soát cảng Hải Phòng',
        description: 'Chuyến tàu chở 200 bản báo Thanh Niên đóng gói dưới thùng cá khô vừa cập cảng. Một toán cảnh binh và mật thám Paul Doumer đang đi tuần tra với chó săn!',
        historicalContext: 'Mật thám Pháp thời kỳ này kiểm soát gắt gao mọi tàu bè từ Hồng Kông và Quảng Châu về Hải Phòng.',
        options: [
          {
            text: 'Dùng tiền hối lộ viên hoa tiêu để chuyển hàng sang thuyền nan cập bến sông phụ',
            effect: { funds: -20, alertLevel: -5, enlightenment: 5 },
            feedback: 'Thuyền nan đã bí mật đưa toàn bộ kiện báo an toàn lên bờ trong sương sớm!',
          },
          {
            text: 'Tung hỏa mù: Tổ chức nhóm phu xe biểu tình gây náo loạn cổng cảng để nghi binh',
            effect: { alertLevel: 15, enlightenment: 10, secretCells: 1 },
            feedback: 'Cảnh binh bị hút về cổng cảng, kiện báo qua trót lọt và chi bộ phu cảng được củng cố!',
          },
          {
            text: 'Chấp nhận vứt bỏ một nửa số hàng xuống biển để tránh bị khám xét tận nơi',
            effect: { paper: -15, alertLevel: -10 },
            feedback: 'Mật thám không tìm thấy gì, lực lượng bảo toàn an toàn dù mất một số báo.',
          },
        ],
      },
      {
        id: 'evt-1-2',
        title: 'Học sinh trường Bưởi quyên góp giấy pơ-luya',
        description: 'Một nhóm học sinh yêu nước sau khi đọc báo Thanh Niên đã lập quỹ bí mật mua được 30 ram giấy bãi bằng pơ-luya gửi tặng tòa soạn.',
        options: [
          {
            text: 'Tiếp nhận số giấy và kết nạp nhóm trưởng nhóm học sinh vào Hội',
            effect: { paper: 30, secretCells: 1, alertLevel: 8 },
            feedback: 'Một chi bộ thanh niên học sinh mới đã được ươm mầm ngay giữa lòng Hà Nội!',
          },
          {
            text: 'Nhận giấy nhưng yêu cầu các em giữ nguyên vỏ bọc hợp pháp, chỉ hỗ trợ kinh phí',
            effect: { paper: 30, funds: 15, alertLevel: 2 },
            feedback: 'Cơ sở tài chính của ta được bảo toàn và mở rộng trong an toàn tuyệt đối.',
          },
        ],
      },
      {
        id: 'evt-1-3',
        title: 'Đề nghị mở rộng đường dây Nam Kỳ',
        description: 'Đồng chí Tôn Đức Thắng từ Sài Gòn gửi thư đề nghị gửi báo vào hỗ trợ phong trào công nhân xưởng Ba Son bãi công.',
        options: [
          {
            text: 'Dốc toàn bộ 40 ram giấy in số báo đặc biệt chi viện phong trào Ba Son',
            effect: { paper: -20, ink: -15, enlightenment: 18, secretCells: 1, alertLevel: 10 },
            feedback: 'Báo đã kịp thời thổi bùng ngọn lửa bãi công của hơn 1.000 công nhân Ba Son!',
          },
          {
            text: 'Gửi điện tín chỉ đạo giữ vững nhịp độ đấu tranh hợp pháp, bảo tồn lực lượng',
            effect: { enlightenment: 6, alertLevel: -5, funds: 10 },
            feedback: 'Chi bộ Ba Son hoạt động vững vàng, tránh được đợt đàn áp khốc liệt của Thống đốc Nam Kỳ.',
          },
        ],
      },
    ],
  },

  // LEVEL 2: 1930 - 1935
  {
    id: 2,
    year: '1930 - 1935',
    title: 'Ngọn Lửa Ngục Tối',
    period: 'Cao trào Xô viết Nghệ Tĩnh & Chống khủng bố trắng',
    newspaperName: 'TIẾNG BOM TRONG LAO',
    newspaperSlogan: 'BIẾN NGỤC TÙ THỰC DÂN THÀNH TRƯỜNG HỌC CÁCH MẠNG',
    description: 'Sau phong trào Xô viết Nghệ Tĩnh (1930-1931), thực dân Pháp tiến hành "khủng bố trắng", giam cầm hàng vạn chiến sĩ tại Hỏa Lò, Côn Đảo. Trong ngục tối, các đồng chí phải tự chế mực, chép báo tay để giữ vững niềm tin sắt đá!',
    targetEnlightenment: 55,
    startingStats: {
      paper: 45,
      ink: 35,
      funds: 45,
      enlightenment: 35,
      alertLevel: 25,
      secretCells: 2,
    },
    historicalFact: 'Dù trong ngục tù tàn bạo, các chiến sĩ cộng sản như Lê Hồng Phong, Hà Huy Tập, Nguyễn Văn Cừ vẫn kiên cường bảo vệ Đảng, biến nhà tù thành trường học lý luận, chuẩn bị phục hồi phong trào cách mạng!',
    codexUnlockId: 'codex-lao-tu',
    articles: [
      {
        id: 'art-2-1',
        title: 'Giữ vững khí tiết người Cộng sản trước máy chém',
        subtitle: 'Kêu gọi biến phiên tòa thực dân thành diễn đàn luận tội kẻ thù',
        type: 'radical',
        excerpt: 'Chết cho Tổ quốc là cái chết vinh quang nhất! Dù gông cùm có siết chặt thân thể, lý tưởng của chúng ta mãi mãi là bất diệt!',
        authorPseudonym: 'Chi bộ Nhà tù',
        targetClass: 'Tù chính trị & Công nhân bị bắt bớ',
        statBonus: { enlightenment: 16, alertLevel: 16, funds: 0 },
      },
      {
        id: 'art-2-2',
        title: 'Bài học xương máu từ Xô viết Nghệ Tĩnh',
        subtitle: 'Đúc rút kinh nghiệm về công tác vũ trang tự vệ và giữ bí mật tổ chức',
        type: 'moderate',
        excerpt: 'Chính quyền Xô viết đã chứng minh sức mạnh của khối liên minh công nông. Cần tạm thời rút vào hoạt động bí mật, bảo tồn cán bộ cốt cán.',
        authorPseudonym: 'Người Quan Sát',
        targetClass: 'Cán bộ đảng viên còn hoạt động ngoài vùng tự do',
        statBonus: { enlightenment: 12, alertLevel: 8, funds: 10 },
      },
      {
        id: 'art-2-3',
        title: 'Lời kêu gọi đồng bào tiếp tế cơm rau cho tù nhân',
        subtitle: 'Tranh thủ tình thương và lòng yêu nước của thân nhân, nhân dân ngoại ô',
        type: 'mass',
        excerpt: 'Mỗi nắm cơm, cọng rau của bà con gửi vào xà lim là một viên đạn tiếp thêm sinh lực cho các chiến sĩ kiên gan chống lại bạo tàn.',
        authorPseudonym: 'Mẹ Chiến Sĩ',
        targetClass: 'Gia đình thân nhân & Phật tử, tiểu thương',
        statBonus: { enlightenment: 9, alertLevel: 5, funds: 20 },
      },
    ],
    events: [
      {
        id: 'evt-2-1',
        title: 'Giám thị thực dân khám xét đột xuất buồng giam số 3',
        description: 'Tên giám thị Pháp khét tiếng cùng cai tù ập vào xà lim khi đồng chí thư ký đang cặm cụi chép số báo mới trên mảnh giấy xi măng!',
        options: [
          {
            text: 'Đồng chí buồng bên lập tức giả vờ ngất xỉu và la hét đòi cấp cứu để đánh lạc hướng',
            effect: { alertLevel: 10, enlightenment: 8 },
            feedback: 'Tên giám thị chạy sang buồng bên, bản thảo đã kịp nhét vào kẽ gạch dưới bệ nằm!',
          },
          {
            text: 'Nuốt ngay bản thảo vào bụng chấp nhận đau đớn để tuyệt đối không để lọt tài liệu',
            effect: { paper: -10, alertLevel: -10, enlightenment: 12 },
            feedback: 'Bí mật được giữ kín như bưng. Khí phách của đồng chí làm cả buồng giam rơi lệ cảm phục!',
          },
          {
            text: 'Dùng tiền quyên góp nhờ viên cai ngục người Việt có cảm tình giấu giùm',
            effect: { funds: -20, alertLevel: -15, secretCells: 1 },
            feedback: 'Viên cai ngục đã nhận lời và thậm chí đồng ý chuyển thư ra ngoài cho thân nhân.',
          },
        ],
      },
      {
        id: 'evt-2-2',
        title: 'Sáng chế mực in từ than củi và lá cây',
        description: 'Mực in hóa chất cạn kiệt, các đồng chí thảo luận dùng tro bếp đốt từ rơm trộn với nhựa sung để tạo thành mực đen đặc sánh.',
        options: [
          {
            text: 'Tổ chức cho anh em lao động ngoài trời bí mật thu gom nhựa cây và tro bếp',
            effect: { ink: 25, alertLevel: 5 },
            feedback: 'Công thức mực mới viết rất sắc nét trên giấy báo cũ, không hề phai mờ!',
          },
          {
            text: 'Móc nối với y tá bệnh xá nhà tù xin cồn sát trùng và thuốc đỏ pha mực',
            effect: { ink: 35, funds: -10, alertLevel: 8 },
            feedback: 'Báo có thêm mực đỏ để vẽ tiêu đề ngôi sao và búa liềm vô cùng rực rỡ!',
          },
        ],
      },
      {
        id: 'evt-2-3',
        title: 'Đồng chí cán bộ vượt ngục thành công mang theo bản thảo',
        description: 'Một chuyến vượt ngục bằng bè gỗ tại Côn Đảo đã đưa tài liệu và báo cáo chính trị của chi bộ nhà tù cập bến đất liền an toàn.',
        options: [
          {
            text: 'Tập trung in ấn ngay báo cáo này để gửi đi toàn quốc phục hồi cơ sở',
            effect: { enlightenment: 20, secretCells: 2, alertLevel: 15 },
            feedback: 'Các chi bộ toàn quốc như được tiếp thêm luồng sinh khí mới, niềm tin được thắp sáng!',
          },
          {
            text: 'Ưu tiên đưa đồng chí sang căn cứ an toàn để chữa bệnh dưỡng thương',
            effect: { funds: -15, enlightenment: 10, alertLevel: -5 },
            feedback: 'Bảo toàn được cán bộ lãnh đạo trung kiên cho các chặng đường quyết định sau này.',
          },
        ],
      },
    ],
  },

  // LEVEL 3: 1936 - 1939
  {
    id: 3,
    year: '1936 - 1939',
    title: 'Làn Sóng Dân Chủ',
    period: 'Thời kỳ Mặt trận Dân chủ Đông Dương',
    newspaperName: 'BÁO DÂN CHÚNG',
    newspaperSlogan: 'CƠ QUAN BẢO VỆ DÂN SINH DÂN CHỦ CỦA TOÀN DÂN',
    description: 'Chính phủ Mặt trận Nhân dân Pháp lên nắm quyền tại mẫu quốc. Đảng chủ trương triệt để lợi dụng khả năng công khai, hợp pháp để xuất bản báo chí quy mô lớn, khơi dậy phong trào Đông Dương Đại hội đòi tự do dân chủ!',
    targetEnlightenment: 75,
    startingStats: {
      paper: 80,
      ink: 70,
      funds: 90,
      enlightenment: 55,
      alertLevel: 20,
      secretCells: 3,
    },
    historicalFact: 'Báo Dân Chúng xuất bản công khai không thèm xin phép chính quyền thực dân, phát hành tới 15.000 bản/kỳ. Đảng đã lãnh đạo hàng triệu quần chúng ký đơn thỉnh nguyện đòi cơm áo hòa bình!',
    codexUnlockId: 'codex-dan-chung',
    articles: [
      {
        id: 'art-3-1',
        title: 'Đòi thực thi ngay Ngày làm việc 8 giờ & Tự do Nghiệp đoàn',
        subtitle: 'Vạch trần chủ nghĩa thực dân bóc lột sức lao động của công nhân bản xứ',
        type: 'radical',
        excerpt: 'Luật lao động tiến bộ của nước Pháp đã ban hành tại sao không được áp dụng tại Đông Dương? Chúng tôi đòi quyền lập hội, quyền đình công và giảm giờ làm việc!',
        authorPseudonym: 'Hải Khách (Trường Chinh)',
        targetClass: 'Công nhân thành thị & Thợ thuyền',
        statBonus: { enlightenment: 15, alertLevel: 14, funds: 15 },
      },
      {
        id: 'art-3-2',
        title: 'Lời kêu gọi toàn dân tham gia Đông Dương Đại hội',
        subtitle: 'Vận động thành lập các Ủy ban hành động tại khắp làng xã, xí nghiệp',
        type: 'moderate',
        excerpt: 'Mỗi làng, mỗi phố hãy lập ra một Ủy ban hành động để thu thập nguyện vọng của dân chúng gửi cho phái đoàn điều tra của Quốc hội Pháp.',
        authorPseudonym: 'Phan Đăng Lưu',
        targetClass: 'Dân nghèo thành thị & Trí thức cấp tiến',
        statBonus: { enlightenment: 18, alertLevel: 8, funds: 25 },
      },
      {
        id: 'art-3-3',
        title: 'Bãi bỏ thuế thân - Giảm thuế chợ - Mở mang trường học',
        subtitle: 'Những nguyện vọng thiết thực nhất cho đời sống người nông dân nghèo',
        type: 'mass',
        excerpt: 'Thuế thân đè nặng lên vai người sống lẫn người chết! Phải bãi bỏ ngay thứ thuế vô nhân đạo này để con em có sách đến trường, người cày có ruộng.',
        authorPseudonym: 'Nông Dân Hà Đông',
        targetClass: 'Nông dân nghèo & Tiểu thương chợ',
        statBonus: { enlightenment: 12, alertLevel: 5, funds: 30 },
      },
    ],
    events: [
      {
        id: 'evt-3-1',
        title: 'Phủ Thống sứ ra lệnh tịch thu toàn bộ số báo 15',
        description: 'Mật thám phát hiện bài xã luận của đồng chí Tổng Bí thư quá sắc bén, điều xe cảnh sát tới phong tỏa nhà in công khai!',
        options: [
          {
            text: 'Dùng nghiệp vụ pháp lý: Luật sư tiến bộ gửi đơn kiện ngay lên Tòa Thượng thẩm',
            effect: { funds: -25, alertLevel: -10, enlightenment: 10 },
            feedback: 'Vụ kiện gây xôn xao dư luận Hà Nội, cảnh sát phải nới lỏng kiểm soát nhà in.',
          },
          {
            text: 'Bí mật chuyển một nửa số báo ra cửa sau phân phối trước khi cảnh sát kịp ập tới',
            effect: { alertLevel: 12, enlightenment: 15, funds: 20 },
            feedback: 'Hơn 5.000 tờ báo đã đến tay người đọc trước giờ khám xét, tạo làn sóng bàn tán sôi nổi.',
          },
          {
            text: 'Tuyên bố đình bản số 15 để ra mắt ngay một tờ báo mang tên mới thay thế',
            effect: { paper: -15, ink: -10, enlightenment: 8, alertLevel: -5 },
            feedback: 'Đúng như kế hoạch "thay tên đổi họ", báo Tiếng Vang ra đời tiếp tục dòng mạch chiến đấu.',
          },
        ],
      },
      {
        id: 'evt-3-2',
        title: 'Đại hội đón tiếp phái đoàn Godart từ Paris sang',
        description: 'Toàn quyền Pháp cố tình ngăn chặn dân chúng tiếp cận phái viên Quốc hội Pháp. Bạn có cơ hội tổ chức phát hàng vạn tờ truyền đơn tại ga Hàng Cỏ.',
        options: [
          {
            text: 'Huy động mạng lưới giao liên rải 10.000 truyền đơn tiếng Pháp ngay trước mũi phái đoàn',
            effect: { paper: -20, ink: -15, enlightenment: 25, alertLevel: 18 },
            feedback: 'Phái viên Godart tận mắt chứng kiến hàng vạn người hô vang khẩu hiệu đòi tự do cơm áo!',
          },
          {
            text: 'Cử đại diện nghiệp đoàn công khai gửi tập thỉnh nguyện thư có chữ ký của vạn dân',
            effect: { funds: -15, enlightenment: 16, secretCells: 2, alertLevel: 5 },
            feedback: 'Một bước đi chính trị đĩnh đạc, khiến chính quyền thuộc địa không thể bắt bẻ.',
          },
        ],
      },
      {
        id: 'evt-3-3',
        title: 'Nhà tư sản dân tộc yêu nước tài trợ máy in hiện đại',
        description: 'Cảm phục trước ngọn cờ dân tộc của báo chí cách mạng, một chủ xưởng in tại Chợ Lớn bí mật tặng Đảng một máy in typo bán tự động.',
        options: [
          {
            text: 'Tiếp nhận máy in và ngụy trang dưới danh nghĩa in sách kinh Phật',
            effect: { funds: 30, ink: 30, alertLevel: 5 },
            feedback: 'Năng suất in ấn tăng gấp đôi, chất lượng chữ in sắc nét vượt bậc!',
          },
          {
            text: 'Mời nhà tư sản tham gia Hội đồng tài chính bảo trợ bí mật cho tờ báo',
            effect: { funds: 50, secretCells: 1, alertLevel: 10 },
            feedback: 'Mặt trận dân tộc thống nhất được mở rộng sang tầng lớp công thương gia yêu nước.',
          },
        ],
      },
    ],
  },

  // LEVEL 4: 1941 - 1945
  {
    id: 4,
    year: '1941 - 1945',
    title: 'Tiếng Kèn Giải Phóng',
    period: 'Cao trào Kháng Nhật cứu nước & Tổng khởi nghĩa',
    newspaperName: 'VIỆT NAM ĐỘC LẬP & CỜ GIẢI PHÓNG',
    newspaperSlogan: 'ĐEM SỨC TA MÀ TỰ GIẢI PHÓNG CHO TA!',
    description: 'Năm 1941, Bác Hồ về nước lập căn cứ địa Pác Bó và Mặt trận Việt Minh. Báo Việt Nam Độc Lập ("Việt Lập") và Cờ Giải Phóng đóng vai trò kèn xung trận, kêu gọi toàn dân sắm vũ khí, chuẩn bị Tổng khởi nghĩa Tháng Tám 1945!',
    targetEnlightenment: 100,
    startingStats: {
      paper: 90,
      ink: 80,
      funds: 100,
      enlightenment: 75,
      alertLevel: 25,
      secretCells: 5,
    },
    historicalFact: 'Đêm 13/8/1945, Ủy ban Khởi nghĩa ra Quân lệnh số 1 phát lệnh Tổng khởi nghĩa. Ngày 2/9/1945, tại Quảng trường Ba Đình, Chủ tịch Hồ Chí Minh đọc bản Tuyên ngôn Độc lập khai sinh nước Việt Nam Dân chủ Cộng hòa!',
    codexUnlockId: 'codex-viet-nam-doc-lap',
    articles: [
      {
        id: 'art-4-1',
        title: 'Chỉ thị: Nhật - Pháp bắn nhau và hành động của chúng ta',
        subtitle: 'Nhận định thời cơ chín muồi: Phát động cao trào kháng Nhật cứu nước!',
        type: 'radical',
        excerpt: 'Kẻ thù đang hoang mang đến cực điểm. Phải lập tức phát động chiến tranh du kích, phá kho thóc của giặc để cứu đói cho dân nghèo!',
        authorPseudonym: 'Trung ương Đảng',
        targetClass: 'Việt Minh, Tự vệ cứu quốc & Binh lính',
        statBonus: { enlightenment: 20, alertLevel: 20, funds: 20 },
      },
      {
        id: 'art-4-2',
        title: 'Mười chính sách của Mặt trận Việt Minh',
        subtitle: 'Đoàn kết toàn dân tộc: Sĩ, Nông, Công, Thương đánh đuổi giặc ngoại xâm',
        type: 'moderate',
        excerpt: 'Không phân biệt tôn giáo, đảng phái, giàu nghèo. Hễ là người Việt Nam có lòng yêu nước đều đứng dưới cờ đỏ sao vàng giải phóng non sông.',
        authorPseudonym: 'Nguyễn Ái Quốc',
        targetClass: 'Toàn thể các tầng lớp nhân dân',
        statBonus: { enlightenment: 22, alertLevel: 10, funds: 25 },
      },
      {
        id: 'art-4-3',
        title: 'Vè Việt Lập: Đồng bào sắm gươm giáo cứu nước',
        subtitle: 'Thơ ca bình dị do Bác Hồ sáng tác, có hình minh họa do Người tự vẽ',
        type: 'mass',
        excerpt: 'Dân ta xin nhớ chữ đồng / Đồng tình, đồng sức, đồng lòng, đồng minh / Gươm cày chung một mối tình / Cứu non cứu nước quang vinh đời đời.',
        authorPseudonym: 'Già Thu',
        targetClass: 'Đồng bào các dân tộc thiểu số Việt Bắc',
        statBonus: { enlightenment: 18, alertLevel: 6, funds: 30 },
      },
    ],
    events: [
      {
        id: 'evt-4-1',
        title: 'Phát xít Nhật gom lúa gây ra nạn đói thảm khốc 1945',
        description: 'Nạn đói kinh hoàng lan khắp Bắc Kỳ và Trung Kỳ. Hàng vạn đồng bào chết đói bên gốc cây ngọn cỏ vì giặc Nhật bắt nhổ lúa trồng đay.',
        options: [
          {
            text: 'Ra số báo đặc biệt kêu gọi "Phá kho thóc Nhật cứu đói", dẫn đầu quần chúng xung phong',
            effect: { enlightenment: 30, secretCells: 3, alertLevel: 22, funds: 40 },
            feedback: 'Hàng trăm kho thóc Nhật bị phá tan, cứu sống hàng vạn dân nghèo. Uy tín Việt Minh vang dội khắp thôn xóm!',
          },
          {
            text: 'Dùng quỹ bí mật mua gạo tiếp tế khẩn cấp cho các gia đình cơ sở cách mạng nòng cốt',
            effect: { funds: -35, enlightenment: 15, alertLevel: -5 },
            feedback: 'Bảo vệ được đội ngũ cán bộ, giữ vững liên lạc thông suốt giữa Chiến khu và Hà Nội.',
          },
        ],
      },
      {
        id: 'evt-4-2',
        title: 'Đội Việt Nam Tuyên truyền Giải phóng quân thành lập',
        description: 'Đồng chí Võ Nguyên Giáp chỉ huy 34 chiến sĩ đầu tiên tại rừng Trần Hưng Đạo. Đội cần hàng ngàn bản tin in nhanh để tuyên truyền sau trận Phai Khắt, Nà Ngần.',
        options: [
          {
            text: 'Huy động máy in đá Pác Bó in thâu đêm 3.000 bản tin chiến thắng chuyển về xuôi',
            effect: { paper: -25, ink: -20, enlightenment: 25, alertLevel: 12 },
            feedback: 'Tiếng vang hai trận đầu đánh thắng lan nhanh như bão lốc, thúc đẩy thanh niên tòng quân!',
          },
          {
            text: 'Cử hai phóng viên chiến trường tháp tùng đội quân giải phóng để kịp thời đưa tin',
            effect: { funds: -20, secretCells: 2, enlightenment: 15, alertLevel: 8 },
            feedback: 'Báo chí gắn liền với thực tiễn mặt trận, đào tạo nên những ngòi bút thép huyền thoại.',
          },
        ],
      },
      {
        id: 'evt-4-3',
        title: 'Quân lệnh số 1: Giờ Tổng khởi nghĩa đã điểm!',
        description: 'Phát xít Nhật đầu hàng Đồng minh vô điều kiện. Ủy ban Khởi nghĩa toàn quốc họp tại Tân Trào ra lệnh Tổng khởi nghĩa giành chính quyền!',
        options: [
          {
            text: 'Dốc toàn bộ giấy mực in bản "Quân lệnh số 1" và Lời hiệu triệu của Hồ Chủ tịch',
            effect: { paper: -30, ink: -25, enlightenment: 35, alertLevel: 15 },
            feedback: 'Hàng vạn tờ báo và truyền đơn đỏ rực bay khắp phố phường Hà Nội, Huế, Sài Gòn thúc giục khởi nghĩa!',
          },
          {
            text: 'Tổ chức đội tuyên truyền xung phong chiếm đài phát thanh Bạch Mai để đọc hiệu triệu',
            effect: { alertLevel: 20, enlightenment: 40, secretCells: 4 },
            feedback: 'Tiếng nói của Việt Minh vang lên khắp bầu trời Đông Dương, chính quyền bù nhìn tan rã!',
          },
        ],
      },
    ],
  },
];

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'printing' | 'distribution' | 'stealth' | 'history';
}

export const GAME_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach-first-print',
    title: 'Bản In Đầu Tiên',
    description: 'Dập in thành công đợt báo truyền đơn cách mạng đầu tiên.',
    icon: '📜',
    category: 'printing',
  },
  {
    id: 'ach-first-cell',
    title: 'Gieo Mầm Hạt Giống',
    description: 'Thức tỉnh quần chúng và gây dựng thành công chi bộ cách mạng đầu tiên.',
    icon: '🌱',
    category: 'distribution',
  },
  {
    id: 'ach-master-stealth',
    title: 'Bậc Thầy Ngụy Trang',
    description: 'Sử dụng chiến thuật ẩn nấp cắt đuôi mật thám giúp cơ sở an toàn.',
    icon: '🕵️',
    category: 'stealth',
  },
  {
    id: 'ach-volume-press',
    title: 'Xưởng In Thần Tốc',
    description: 'Phát hành thành công tích lũy trên 500 tờ báo đến tay nhân dân.',
    icon: '⚡',
    category: 'printing',
  },
  {
    id: 'ach-quiz-champion',
    title: 'Trí Tuệ Vô Sản',
    description: 'Trả lời chính xác câu hỏi thử thách Giáo trình Lịch sử Đảng.',
    icon: '🎓',
    category: 'history',
  },
  {
    id: 'ach-revolution-hero',
    title: 'Ngọn Đuốc Ba Đình',
    description: 'Hoàn thành toàn bộ 4 giai đoạn, tiến tới thắng lợi Cách mạng Tháng Tám 1945!',
    icon: '⭐',
    category: 'history',
  },
];

export interface QuizQuestion {
  id: string;
  levelId: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  reward: {
    paper?: number;
    ink?: number;
    funds?: number;
  };
}

export const HISTORICAL_QUIZZES: QuizQuestion[] = [
  {
    id: 'quiz-1',
    levelId: 1,
    question: 'Số báo đầu tiên của báo Thanh Niên ra ngày 21/6/1925 tại Quảng Châu đã mở đầu cho sự kiện lịch sử nào?',
    options: [
      'Ngày Báo chí Cách mạng Việt Nam',
      'Ngày thành lập Đảng Cộng sản Việt Nam',
      'Ngày Quốc khánh nước Việt Nam',
      'Ngày Toàn quốc kháng chiến',
    ],
    correctIndex: 0,
    explanation: 'Ngày 21/6/1925, báo Thanh Niên do lãnh tụ Nguyễn Ái Quốc sáng lập xuất bản số đầu tiên, được lấy làm Ngày Báo chí Cách mạng Việt Nam.',
    reward: { paper: 25, ink: 20 },
  },
  {
    id: 'quiz-2',
    levelId: 2,
    question: 'Trong nhà tù thực dân (1930 - 1935), các chiến sĩ cộng sản đã dùng nguyên liệu gì để viết báo chép tay?',
    options: [
      'Máy in typo bí mật gửi từ Pháp',
      'Mực pha từ than củi, gạch non, lá cây và giấy pơ-luya giấu kín',
      'Bút máy nhập khẩu từ Nhật Bản',
      'Máy đánh chữ ngụy trang trong vali',
    ],
    correctIndex: 1,
    explanation: 'Dưới ách kìm kẹp khắc nghiệt, các đồng chí kiên cường lấy than củi, gạch non và nhựa sung để chép báo trên các mảnh giấy gói hàng mỏng.',
    reward: { paper: 20, ink: 25 },
  },
  {
    id: 'quiz-3',
    levelId: 3,
    question: 'Tờ báo công khai nào thời kỳ Mặt trận Dân chủ (1936 - 1939) đã lập kỷ lục phát hành tới 15.000 bản/kỳ?',
    options: [
      'Báo Nam Phong',
      'Báo Dân Chúng',
      'Báo Đông Dương tạp chí',
      'Báo Thực nghiệp dân báo',
    ],
    correctIndex: 1,
    explanation: 'Báo Dân Chúng do các đồng chí Hà Huy Tập, Phan Đăng Lưu chỉ đạo xuất bản công khai không xin phép, lập kỷ lục phát hành 15.000 bản mỗi kỳ.',
    reward: { funds: 25, paper: 20 },
  },
  {
    id: 'quiz-4',
    levelId: 4,
    question: 'Tại căn cứ Pác Bó (Cao Bằng) năm 1941, Bác Hồ trực tiếp sáng lập và tự khắc gỗ minh họa cho tờ báo nào?',
    options: [
      'Báo Người Cùng Khổ (Le Paria)',
      'Báo Việt Nam Độc Lập ("Việt Lập")',
      'Báo Cờ Giải Phóng',
      'Báo Lao Động',
    ],
    correctIndex: 1,
    explanation: 'Báo Việt Nam Độc Lập ra số 1 ngày 1/8/1941 tại hang Pác Bó, có tranh vẽ gỗ và các bài ca vè lục bát do Bác Hồ trực tiếp biên soạn.',
    reward: { paper: 30, ink: 25, funds: 20 },
  },
];

