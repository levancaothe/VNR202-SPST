export interface MapHotspot {
  id: string;
  pointId: string;
  title: string;
  tag: string;
  tagColor: string; // Tailwind class
  description: string;
  historicalContext?: string;
  bonus: {
    enlightenment: number;
    funds: number;
    alertRisk: number;
    cellChance: number;
  };
  isUrgentMission?: boolean;
}

export const POSSIBLE_HOTSPOTS: Omit<MapHotspot, 'id' | 'pointId'>[] = [
  {
    title: 'Cao trào bãi công thợ thuyền bùng nổ',
    tag: '🔥 ĐIỂM NÓNG BÃI CÔNG',
    tagColor: 'border-amber-500 bg-amber-950/90 text-amber-300',
    description: 'Hàng ngàn công nhân đang đình công đòi quyền sống. Họ đang ngóng đợi từng trang báo cách mạng để nắm vững đường lối!',
    historicalContext: 'Phong trào công nhân là lực lượng tiên phong mở đường cho cách mạng giải phóng dân tộc.',
    bonus: {
      enlightenment: 12,
      funds: 10,
      alertRisk: 4,
      cellChance: 25,
    },
    isUrgentMission: true,
  },
  {
    title: 'Mật thám Pháp lập trạm kiểm soát gắt gao',
    tag: '🚨 MẬT THÁM BỦA VÂY',
    tagColor: 'border-red-500 bg-red-950/90 text-red-300',
    description: 'Cảnh sát thuộc địa và tay sai chỉ điểm lập trạm khám xét dày đặc. Giao liên phải cải trang cực kỳ khéo léo!',
    historicalContext: 'Mạng lưới mật thám Sở Liêm Phóng giăng bẫy tại các cửa ngõ giao thông trọng điểm.',
    bonus: {
      enlightenment: 16,
      funds: 4,
      alertRisk: 9,
      cellChance: 30,
    },
    isUrgentMission: false,
  },
  {
    title: 'Nhân sĩ & Giới công thương quyên góp tài chính',
    tag: '💰 HẬU PHƯƠNG TÀI TRỢ',
    tagColor: 'border-emerald-500 bg-emerald-950/90 text-emerald-300',
    description: 'Các tầng lớp đồng bào yêu nước bí mật lập quỹ ủng hộ tòa soạn. Mỗi chuyến báo đưa tới đều thu về tiền vàng chi viện dồi dào!',
    historicalContext: 'Mặt trận dân tộc thống nhất rộng rãi thu hút các nhân sĩ, trí thức và tiểu tư sản tiến bộ.',
    bonus: {
      enlightenment: 8,
      funds: 24,
      alertRisk: -2,
      cellChance: 15,
    },
    isUrgentMission: false,
  },
  {
    title: 'Chi bộ bí mật cần tài liệu lý luận khẩn cấp',
    tag: '🎯 NHIỆM VỤ ĐẶC BIỆT',
    tagColor: 'border-purple-500 bg-purple-950/90 text-purple-300',
    description: 'Đồng chí Bí thư gửi thư khẩn: Các tổ đảng cơ sở đang tổ chức kết nạp đảng viên mới và rất cần tài liệu huấn luyện!',
    historicalContext: 'Công tác phát triển đảng viên và củng cố chi bộ bí mật đòi hỏi tài liệu lý luận thường xuyên.',
    bonus: {
      enlightenment: 18,
      funds: 12,
      alertRisk: 5,
      cellChance: 40,
    },
    isUrgentMission: true,
  },
  {
    title: 'Học sinh - Sinh viên rải truyền đơn trường học',
    tag: '🎓 TUỔI TRẺ DẬY THÌ',
    tagColor: 'border-blue-500 bg-blue-950/90 text-blue-300',
    description: 'Thanh niên học sinh sôi sục chuyền tay nhau những bản in thạch, tổ chức các nhóm đọc báo bí mật trong ký túc xá.',
    historicalContext: 'Phong trào bãi khóa của học sinh sinh viên là ngòi châm thổi bùng tinh thần yêu nước nơi đô thị.',
    bonus: {
      enlightenment: 14,
      funds: 15,
      alertRisk: 3,
      cellChance: 25,
    },
    isUrgentMission: false,
  },
  {
    title: 'Đêm tối & Sương mù: Giao liên đường sông thuận lợi',
    tag: '🌙 VỎ BỌC HOÀN HẢO',
    tagColor: 'border-teal-500 bg-teal-950/90 text-teal-300',
    description: 'Thời tiết sương mù dày đặc và mạng lưới thuyền chài đồng lòng che giấu giúp các chuyến vận chuyển báo tuyệt đối an toàn.',
    historicalContext: 'Giao liên bí mật dựa vào sự đùm bọc của nhân dân làng chài để vượt sông vượt biển.',
    bonus: {
      enlightenment: 10,
      funds: 8,
      alertRisk: -8,
      cellChance: 20,
    },
    isUrgentMission: false,
  },
];

/**
 * Tự động random 2-3 điểm nóng trên bản đồ cho mỗi màn chơi
 * Không trùng với căn cứ in hiện tại
 */
export function generateRandomHotspots(
  excludeBaseId: string
): Record<string, MapHotspot> {
  const eligiblePointIds = [
    'point-guangzhou',
    'point-pac-bo',
    'point-hanoi',
    'point-hai-phong',
    'point-nghe-an',
    'point-saigon',
    'point-con-dao',
  ].filter((id) => id !== excludeBaseId);

  // Xáo trộn ngẫu nhiên danh sách điểm
  const shuffledPoints = [...eligiblePointIds].sort(() => Math.random() - 0.5);
  // Chọn 2 hoặc 3 điểm nóng ngẫu nhiên
  const count = Math.random() > 0.4 ? 3 : 2;
  const pickedPoints = shuffledPoints.slice(0, count);

  // Xáo trộn mẫu điểm nóng
  const shuffledHotspots = [...POSSIBLE_HOTSPOTS].sort(() => Math.random() - 0.5);

  const result: Record<string, MapHotspot> = {};
  pickedPoints.forEach((pointId, idx) => {
    const template = shuffledHotspots[idx % shuffledHotspots.length];
    result[pointId] = {
      ...template,
      id: `hotspot-${pointId}-${Date.now()}-${idx}`,
      pointId,
    };
  });

  return result;
}

