export interface StageData {
  stageId: number; // 1, 2, 3
  title: string;
  mission: string;
  targetEnlightenmentThreshold: number; // Điểm lòng dân cần đạt để qua ải này (tính trên thang 0 - 100 của màn)
  historicalContext: string;
}

export interface LevelStages {
  levelId: number;
  stages: StageData[];
}

export const CAMPAIGN_STAGES: Record<number, StageData[]> = {
  1: [
    {
      stageId: 1,
      title: 'Ải 1: Ra Mắt Báo Thanh Niên Số 1 (6/1925)',
      mission: 'Thiết lập xưởng in bí mật tại Quảng Châu, dập in và phát hành số báo đầu tiên cho lớp huấn luyện cán bộ.',
      targetEnlightenmentThreshold: 18,
      historicalContext: 'Ngày 21/6/1925, Báo Thanh Niên ra số 1 do Nguyễn Ái Quốc sáng lập, đặt nền móng cho báo chí cách mạng Việt Nam.',
    },
    {
      stageId: 2,
      title: 'Ải 2: Đường Dây Thủy Thủ Chuyển Báo Về Nước',
      mission: 'Bắt mối với thủy thủ tàu biển và hỏa xa để chuyển báo về Hải Phòng, Sài Gòn, gieo mầm cách mạng vào thợ thuyền.',
      targetEnlightenmentThreshold: 28,
      historicalContext: 'Báo được giấu trong đòn gánh tre, thùng hàng hỏa xa, bí mật thâm nhập vào các nhà máy, hầm mỏ.',
    },
    {
      stageId: 3,
      title: 'Ải 3: Phong Trào Vô Sản Hóa & Thành Lập Đảng (1930)',
      mission: 'Đưa lý luận Mác - Lênin thức tỉnh giai cấp công nhân, chuẩn bị chín muồi cho sự ra đời của Đảng Cộng sản Việt Nam.',
      targetEnlightenmentThreshold: 35,
      historicalContext: 'Đầu năm 1930, Nguyễn Ái Quốc chủ trì hội nghị hợp nhất các tổ chức cộng sản tại Cửu Long (Hương Cảng).',
    },
  ],
  2: [
    {
      stageId: 1,
      title: 'Ải 1: Ngọn Lửa Xô Viết Nghệ Tĩnh & Báo Búa Liềm',
      mission: 'Xuất bản truyền đơn và báo Búa Liềm cổ vũ cao trào đấu tranh công nông 1930-1931.',
      targetEnlightenmentThreshold: 42,
      historicalContext: 'Phong trào Xô viết Nghệ Tĩnh bùng lên mạnh mẽ, báo chí cách mạng là ngọn cờ dẫn đường cho quần chúng khởi nghĩa.',
    },
    {
      stageId: 2,
      title: 'Ải 2: Trụ Vững Trước Bão Táp Khủng Bố Trắng',
      mission: 'Mật thám Pháp lùng sục gắt gao, phải phân tán cơ sở in ấn, giữ vững các đường dây giao liên sống còn.',
      targetEnlightenmentThreshold: 49,
      historicalContext: 'Thực dân Pháp giăng lưới mật thám, bắt bớ cán bộ; các đồng chí trung kiên kiên cường bám dân bảo vệ máy in.',
    },
    {
      stageId: 3,
      title: 'Ải 3: Báo Chép Tay Sau Chấn Song Nhà Tù Đế Quốc',
      mission: 'Tự chế mực từ than củi, chép báo tay trong xà lim Hỏa Lò, Côn Đảo để biến ngục tù thành trường học cách mạng.',
      targetEnlightenmentThreshold: 55,
      historicalContext: 'Lời trăn trối của Tổng Bí thư Trần Phú: "Hãy giữ vững chí khí chiến đấu!" thôi thúc các chiến sĩ trong tù.',
    },
  ],
  3: [
    {
      stageId: 1,
      title: 'Ải 1: Làn Sóng Báo Chí Công Khai Đòi Dân Sinh',
      mission: 'Tận dụng thời cơ Mặt trận Nhân dân Pháp, xuất bản báo Dân Chúng công khai đòi tự do báo chí, cơm áo hòa bình.',
      targetEnlightenmentThreshold: 62,
      historicalContext: 'Phong trào Đông Dương Đại hội nổ ra rầm rộ, báo Dân Chúng phát hành hàng vạn bản công khai tại các đô thị.',
    },
    {
      stageId: 2,
      title: 'Ải 2: Đông Dương Đại Hội & Mở Rộng Địa Bàn Phát Hành',
      mission: 'Đưa báo đến tận tay giới thợ thuyền, học sinh, lập các Ủy ban Hành động ở nhà máy, bến cảng.',
      targetEnlightenmentThreshold: 69,
      historicalContext: 'Hàng ngàn Ủy ban Hành động được thành lập; tác phẩm "Tự chỉ trích" của Tổng Bí thư Nguyễn Văn Cừ củng cố sự đoàn kết của Đảng.',
    },
    {
      stageId: 3,
      title: 'Ải 3: Rút Vào Bí Mật Bảo Toàn Cơ Quan Báo Chí',
      mission: 'Chiến tranh thế giới thứ hai cận kề, thực dân quay lại đàn áp; phải kịp thời chuyển máy in về vùng an toàn.',
      targetEnlightenmentThreshold: 75,
      historicalContext: 'Tháng 9/1939, Đảng kịp thời rút vào hoạt động bí mật, bảo toàn nguyên vẹn đội ngũ cán bộ báo chí nòng cốt.',
    },
  ],
  4: [
    {
      stageId: 1,
      title: 'Ải 1: Bác Hồ Về Nước & Xưởng In Hang Pác Bó (1941)',
      mission: 'Lập xưởng in đá trong hang Pác Bó, xuất bản báo Việt Nam Độc Lập ("Việt Lập") kêu gọi toàn dân đoàn kết cứu quốc.',
      targetEnlightenmentThreshold: 83,
      historicalContext: 'Hội nghị Trung ương 8 (5/1941) do lãnh tụ Nguyễn Ái Quốc chủ trì xác định nhiệm vụ giải phóng dân tộc là trên hết.',
    },
    {
      stageId: 2,
      title: 'Ải 2: Báo Cờ Giải Phóng & Tiếng Kèn Kháng Nhật Cứu Nước',
      mission: 'Phát hành báo Cờ Giải Phóng truyền đi chỉ thị "Nhật - Pháp bắn nhau và hành động của chúng ta", sắm vũ khí sẵn sàng.',
      targetEnlightenmentThreshold: 92,
      historicalContext: 'Đêm 9/3/1945, Nhật đảo chính Pháp. Chỉ thị lịch sử của Ban Thường vụ Trung ương Đảng mở đường cho cao trào kháng Nhật.',
    },
    {
      stageId: 3,
      title: 'Ải 3: Tổng Khởi Nghĩa Tháng Tám & Tuyên Ngôn Độc Lập',
      mission: 'Truyền đi Quân lệnh số 1 và Lời kêu gọi Tổng khởi nghĩa của Bác Hồ, tiến tới ngày 2/9 tại Ba Đình lịch sử!',
      targetEnlightenmentThreshold: 100,
      historicalContext: 'Cách mạng Tháng Tám toàn thắng. Ngày 2/9/1945, Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập khai sinh nước Việt Nam Dân chủ Cộng hòa.',
    },
  ],
};

