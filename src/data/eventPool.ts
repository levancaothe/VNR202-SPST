import type { GameEvent } from './gameData';

export interface PoolGameEvent extends GameEvent {
  eraId?: number; // 1, 2, 3, 4 hoặc undefined cho sự kiện chung
  minAlert?: number; // Yêu cầu mức alert tối thiểu để xuất hiện
}

export const COMPREHENSIVE_EVENT_POOL: PoolGameEvent[] = [
  // ==========================================
  // ERA 1: 1925 - 1930
  // ==========================================
  {
    id: 'evt-pool-1-1',
    eraId: 1,
    title: 'Mật thám Pháp rà soát cảng Hải Phòng',
    description: 'Chuyến tàu chở 200 bản báo Thanh Niên đóng gói dưới thùng cá khô vừa cập cảng. Một toán cảnh binh và mật thám Paul Doumer đang đi tuần tra với chó săn!',
    historicalContext: 'Mật thám Pháp thời kỳ này kiểm soát gắt gao mọi tàu bè từ Hồng Kông và Quảng Châu về Hải Phòng.',
    options: [
      {
        text: 'Dùng tiền hối lộ viên hoa tiêu để chuyển hàng sang thuyền nan cập bến sông phụ',
        effect: { funds: -18, alertLevel: -6, enlightenment: 6 },
        feedback: 'Thuyền nan đã bí mật đưa toàn bộ kiện báo an toàn lên bờ trong sương sớm!',
      },
      {
        text: 'Tung hỏa mù: Tổ chức nhóm phu xe biểu tình gây náo loạn cổng cảng để nghi binh',
        effect: { alertLevel: 14, enlightenment: 12, secretCells: 1 },
        feedback: 'Cảnh binh bị hút về cổng cảng, kiện báo qua trót lọt và chi bộ phu cảng được củng cố!',
      },
      {
        text: 'Chấp nhận vứt bỏ một nửa số hàng xuống biển để tránh bị khám xét tận nơi',
        effect: { paper: -15, alertLevel: -12 },
        feedback: 'Mật thám không tìm thấy gì, lực lượng bảo toàn an toàn dù mất một số báo.',
      },
    ],
  },
  {
    id: 'evt-pool-1-2',
    eraId: 1,
    title: 'Học sinh trường Bưởi quyên góp giấy pơ-luya',
    description: 'Một nhóm học sinh yêu nước sau khi đọc báo Thanh Niên đã lập quỹ bí mật mua được 30 ram giấy bãi bằng pơ-luya gửi tặng tòa soạn.',
    historicalContext: 'Phong trào yêu nước của thanh niên trí thức những năm 1925-1926 diễn ra rất sôi nổi.',
    options: [
      {
        text: 'Tiếp nhận số giấy và kết nạp nhóm trưởng học sinh vào Hội',
        effect: { paper: 32, secretCells: 1, alertLevel: 8 },
        feedback: 'Một chi bộ thanh niên học sinh mới đã được ươm mầm ngay giữa lòng Hà Nội!',
      },
      {
        text: 'Nhận giấy nhưng yêu cầu các em giữ nguyên vỏ bọc hợp pháp, chỉ hỗ trợ kinh phí',
        effect: { paper: 30, funds: 16, alertLevel: 2 },
        feedback: 'Cơ sở tài chính của ta được bảo toàn và mở rộng trong an toàn tuyệt đối.',
      },
    ],
  },
  {
    id: 'evt-pool-1-3',
    eraId: 1,
    title: 'Đề nghị mở rộng đường dây Nam Kỳ',
    description: 'Đồng chí Tôn Đức Thắng từ Sài Gòn gửi thư đề nghị gửi báo vào hỗ trợ phong trào công nhân xưởng Ba Son bãi công.',
    historicalContext: 'Cuộc bãi công Ba Son (8/1925) đánh dấu bước tiến vượt bậc của phong trào công nhân Việt Nam.',
    options: [
      {
        text: 'Dốc toàn bộ 40 ram giấy in số báo đặc biệt chi viện phong trào Ba Son',
        effect: { paper: -20, ink: -15, enlightenment: 20, secretCells: 1, alertLevel: 10 },
        feedback: 'Báo đã kịp thời thổi bùng ngọn lửa bãi công của hơn 1.000 công nhân Ba Son!',
      },
      {
        text: 'Gửi điện tín chỉ đạo giữ vững nhịp độ đấu tranh hợp pháp, bảo tồn lực lượng',
        effect: { enlightenment: 8, alertLevel: -5, funds: 12 },
        feedback: 'Chi bộ Ba Son hoạt động vững vàng, tránh được đợt đàn áp khốc liệt của Thống đốc Nam Kỳ.',
      },
    ],
  },
  {
    id: 'evt-pool-1-4',
    eraId: 1,
    title: 'Việt kiều yêu nước tại Quảng Châu chi viện máy in',
    description: 'Một gia đình tiểu thương người Việt tại Quảng Châu cảm phục chí lớn của Nguyễn Ái Quốc, tình nguyện tặng 50 đồng Đông Dương mua đá in thạch mới.',
    historicalContext: 'Kiều bào tại miền Nam Trung Quốc là chỗ dựa vật chất vô giá cho tổ chức cách mạng đầu tiên.',
    options: [
      {
        text: 'Dùng toàn bộ số tiền mua mực tốt và phôi thạch chất lượng cao',
        effect: { ink: 35, funds: 20, enlightenment: 6 },
        feedback: 'Xưởng in Thanh Niên dập chữ sắc nét, tốc độ in ấn tăng vượt bậc!',
      },
      {
        text: 'Trích một phần mở lớp huấn luyện chính trị ngắn hạn cho 5 thanh niên mới sang',
        effect: { secretCells: 2, enlightenment: 14, funds: -10, alertLevel: 4 },
        feedback: 'Đào tạo thêm được 2 cán bộ nòng cốt chuẩn bị cử về nước gây dựng cơ sở.',
      },
    ],
  },

  // ==========================================
  // ERA 2: 1930 - 1935
  // ==========================================
  {
    id: 'evt-pool-2-1',
    eraId: 2,
    title: 'Giám thị thực dân khám xét đột xuất buồng giam số 3',
    description: 'Tên giám thị Pháp khét tiếng cùng cai tù ập vào xà lim khi đồng chí thư ký đang cặm cụi chép số báo mới trên mảnh giấy xi măng!',
    historicalContext: 'Trong các nhà tù đế quốc, việc chép báo là hành vi bị xử phạt cùm chân và biệt giam.',
    options: [
      {
        text: 'Đồng chí buồng bên giả vờ ngất xỉu và la hét đòi cấp cứu để đánh lạc hướng',
        effect: { alertLevel: 8, enlightenment: 10 },
        feedback: 'Tên giám thị chạy sang buồng bên, bản thảo đã kịp nhét vào kẽ gạch dưới bệ nằm!',
      },
      {
        text: 'Nuốt ngay bản thảo vào bụng chấp nhận đau đớn để bảo vệ tuyệt đối bí mật',
        effect: { paper: -10, alertLevel: -12, enlightenment: 15 },
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
    id: 'evt-pool-2-2',
    eraId: 2,
    title: 'Sáng chế mực in từ than củi và nhựa sung',
    description: 'Mực in hóa chất cạn kiệt, các đồng chí thảo luận dùng tro bếp đốt từ rơm trộn với nhựa sung để tạo thành mực đen đặc sánh.',
    historicalContext: 'Chi bộ nhà tù Côn Đảo và Hỏa Lò nổi tiếng với tinh thần tự lực cánh sinh sáng chế đồ dùng.',
    options: [
      {
        text: 'Tổ chức cho anh em lao động ngoài trời bí mật thu gom nhựa cây và tro bếp',
        effect: { ink: 28, alertLevel: 4 },
        feedback: 'Công thức mực mới viết rất sắc nét trên giấy báo cũ, không hề phai mờ!',
      },
      {
        text: 'Móc nối với y tá bệnh xá nhà tù xin cồn sát trùng và thuốc đỏ pha mực',
        effect: { ink: 38, funds: -10, alertLevel: 7 },
        feedback: 'Báo có thêm mực đỏ để vẽ tiêu đề ngôi sao và búa liềm vô cùng rực rỡ!',
      },
    ],
  },
  {
    id: 'evt-pool-2-3',
    eraId: 2,
    title: 'Đồng chí cán bộ vượt ngục Côn Đảo mang theo tài liệu',
    description: 'Một chuyến vượt ngục bằng bè gỗ tại Côn Đảo đã đưa tài liệu và báo cáo chính trị của chi bộ nhà tù cập bến đất liền an toàn.',
    historicalContext: 'Các cuộc vượt biển quả cảm của tù chính trị Côn Đảo đã đưa nhiều cán bộ trung kiên về phục hồi phong trào.',
    options: [
      {
        text: 'Tập trung in ấn ngay báo cáo này để gửi đi toàn quốc phục hồi cơ sở',
        effect: { enlightenment: 22, secretCells: 2, alertLevel: 14 },
        feedback: 'Các chi bộ toàn quốc như được tiếp thêm luồng sinh khí mới, niềm tin được thắp sáng!',
      },
      {
        text: 'Ưu tiên đưa đồng chí sang căn cứ an toàn để chữa bệnh dưỡng thương',
        effect: { funds: -15, enlightenment: 12, alertLevel: -6 },
        feedback: 'Bảo toàn được cán bộ lãnh đạo trung kiên cho các chặng đường quyết định sau này.',
      },
    ],
  },
  {
    id: 'evt-pool-2-4',
    eraId: 2,
    title: 'Quần chúng nông thôn Nghệ An che giấu hầm in bí mật',
    description: 'Một bà mẹ nông dân phát hiện lính khố xanh đang sục sạo vào làng, bà lập tức lùa đàn bò ra đường làng gây bụi mù mịt làm chậm bước giặc.',
    historicalContext: 'Nhân dân Nghệ Tĩnh một lòng theo Đảng, bảo bọc cán bộ trong giai đoạn khủng bố trắng khốc liệt nhất.',
    options: [
      {
        text: 'Tranh thủ cơ hội sơ tán hầm in sang miếu thờ hoang bên bờ sông',
        effect: { alertLevel: -10, funds: -8, enlightenment: 8 },
        feedback: 'Toàn bộ phôi in và máy ép thủ công đã được di chuyển an toàn trong đêm!',
      },
      {
        text: 'Ở lại bám trụ, tổ chức kết nạp người con trai của bà mẹ vào đội tự vệ bí mật',
        effect: { secretCells: 2, enlightenment: 15, alertLevel: 6 },
        feedback: 'Thế trận lòng dân thêm vững chắc, gia đình cơ sở cách mạng son sắt thủy chung.',
      },
    ],
  },

  // ==========================================
  // ERA 3: 1936 - 1939
  // ==========================================
  {
    id: 'evt-pool-3-1',
    eraId: 3,
    title: 'Phủ Thống sứ ra lệnh tịch thu toàn bộ số báo 15',
    description: 'Mật thám phát hiện bài xã luận của đồng chí Tổng Bí thư quá sắc bén, điều xe cảnh sát tới phong tỏa nhà in công khai!',
    historicalContext: 'Thời kỳ Mặt trận Dân chủ, thực dân Pháp thường xuyên ra lệnh tịch thu báo và phạt tiền các chủ nhiệm.',
    options: [
      {
        text: 'Dùng nghiệp vụ pháp lý: Luật sư tiến bộ gửi đơn kiện ngay lên Tòa Thượng thẩm',
        effect: { funds: -22, alertLevel: -12, enlightenment: 12 },
        feedback: 'Vụ kiện gây xôn xao dư luận Hà Nội, cảnh sát phải nới lỏng kiểm soát nhà in.',
      },
      {
        text: 'Bí mật chuyển một nửa số báo ra cửa sau phân phối trước khi cảnh sát kịp ập tới',
        effect: { alertLevel: 10, enlightenment: 16, funds: 22 },
        feedback: 'Hơn 5.000 tờ báo đã đến tay người đọc trước giờ khám xét, tạo làn sóng bàn tán sôi nổi.',
      },
      {
        text: 'Tuyên bố đình bản số 15 để ra mắt ngay một tờ báo mang tên mới thay thế',
        effect: { paper: -15, ink: -10, enlightenment: 10, alertLevel: -6 },
        feedback: 'Đúng như kế hoạch "thay tên đổi họ", báo Tiếng Vang ra đời tiếp tục dòng mạch chiến đấu.',
      },
    ],
  },
  {
    id: 'evt-pool-3-2',
    eraId: 3,
    title: 'Đại hội đón tiếp phái đoàn Godart từ Paris sang',
    description: 'Toàn quyền Pháp cố tình ngăn chặn dân chúng tiếp cận phái viên Quốc hội Pháp. Bạn có cơ hội tổ chức phát hàng vạn tờ truyền đơn tại ga Hàng Cỏ.',
    historicalContext: 'Cuộc đón tiếp Justin Godart (1/1937) biến thành cuộc biểu dương lực lượng chính trị khổng lồ của quần chúng.',
    options: [
      {
        text: 'Huy động mạng lưới giao liên rải 10.000 truyền đơn tiếng Pháp trước mũi phái đoàn',
        effect: { paper: -20, ink: -15, enlightenment: 26, alertLevel: 16 },
        feedback: 'Phái viên Godart tận mắt chứng kiến hàng vạn người hô vang khẩu hiệu đòi tự do cơm áo!',
      },
      {
        text: 'Cử đại diện nghiệp đoàn công khai gửi tập thỉnh nguyện thư có chữ ký của vạn dân',
        effect: { funds: -14, enlightenment: 18, secretCells: 2, alertLevel: 4 },
        feedback: 'Một bước đi chính trị đĩnh đạc, khiến chính quyền thuộc địa không thể bắt bẻ.',
      },
    ],
  },
  {
    id: 'evt-pool-3-3',
    eraId: 3,
    title: 'Nhà tư sản dân tộc yêu nước tài trợ máy in typo hiện đại',
    description: 'Cảm phục trước ngọn cờ dân tộc của báo chí cách mạng, một chủ xưởng in tại Chợ Lớn bí mật tặng Đảng một máy in typo bán tự động.',
    historicalContext: 'Mặt trận Dân chủ Đông Dương đã lôi cuốn được cả tầng lớp tư sản dân tộc tiến bộ tham gia ủng hộ.',
    options: [
      {
        text: 'Tiếp nhận máy in và ngụy trang dưới danh nghĩa in sách kinh Phật',
        effect: { funds: 32, ink: 30, alertLevel: 4 },
        feedback: 'Năng suất in ấn tăng gấp đôi, chất lượng chữ in sắc nét vượt bậc!',
      },
      {
        text: 'Mời nhà tư sản tham gia Hội đồng tài chính bảo trợ bí mật cho tờ báo',
        effect: { funds: 55, secretCells: 1, alertLevel: 9 },
        feedback: 'Mặt trận dân tộc thống nhất được mở rộng sang tầng lớp công thương gia yêu nước.',
      },
    ],
  },
  {
    id: 'evt-pool-3-4',
    eraId: 3,
    title: 'Đêm văn nghệ ủng hộ tờ báo Dân Chúng tại Nhà hát Lớn',
    description: 'Giới nghệ sĩ và trí thức tiến bộ tổ chức đêm diễn kịch yêu nước, trích toàn bộ tiền vé ủng hộ quỹ mua giấy in báo.',
    historicalContext: 'Văn nghệ sĩ thời kỳ này tham gia đông đảo vào phong trào văn hóa tiến bộ đòi tự do sáng tác.',
    options: [
      {
        text: 'Bán số báo đặc biệt ngay tại sảnh Nhà hát Lớn kèm chữ ký của các nhà văn',
        effect: { funds: 45, enlightenment: 16, alertLevel: 10 },
        feedback: 'Toàn bộ 3.000 bản báo bán sạch veo chỉ trong một giờ nghỉ giải lao!',
      },
      {
        text: 'Giữ kín danh tính người bảo trợ để bảo vệ anh chị em nghệ sĩ khỏi bị thu hồi thẻ hành nghề',
        effect: { funds: 30, alertLevel: -5, enlightenment: 10 },
        feedback: 'Mối liên hệ giữa Đảng và giới văn nghệ trí thức ngày càng gắn bó bền chặt.',
      },
    ],
  },

  // ==========================================
  // ERA 4: 1941 - 1945
  // ==========================================
  {
    id: 'evt-pool-4-1',
    eraId: 4,
    title: 'Phát xít Nhật gom lúa gây ra nạn đói thảm khốc 1945',
    description: 'Nạn đói kinh hoàng lan khắp Bắc Kỳ và Trung Kỳ. Hàng vạn đồng bào chết đói bên gốc cây ngọn cỏ vì giặc Nhật bắt nhổ lúa trồng đay.',
    historicalContext: 'Nạn đói năm 1945 cướp đi sinh mạng của hơn 2 triệu đồng bào do chính sách vơ vét tàn bạo của Nhật - Pháp.',
    options: [
      {
        text: 'Ra số báo đặc biệt kêu gọi "Phá kho thóc Nhật cứu đói", dẫn đầu quần chúng xung phong',
        effect: { enlightenment: 32, secretCells: 3, alertLevel: 20, funds: 40 },
        feedback: 'Hàng trăm kho thóc Nhật bị phá tan, cứu sống hàng vạn dân nghèo. Uy tín Việt Minh vang dội khắp thôn xóm!',
      },
      {
        text: 'Dùng quỹ bí mật mua gạo tiếp tế khẩn cấp cho các gia đình cơ sở cách mạng nòng cốt',
        effect: { funds: -30, enlightenment: 16, alertLevel: -6 },
        feedback: 'Bảo vệ được đội ngũ cán bộ, giữ vững liên lạc thông suốt giữa Chiến khu và Hà Nội.',
      },
    ],
  },
  {
    id: 'evt-pool-4-2',
    eraId: 4,
    title: 'Đội Việt Nam Tuyên truyền Giải phóng quân thành lập',
    description: 'Đồng chí Võ Nguyên Giáp chỉ huy 34 chiến sĩ đầu tiên tại rừng Trần Hưng Đạo. Đội cần hàng ngàn bản tin in nhanh để tuyên truyền sau trận Phai Khắt, Nà Ngần.',
    historicalContext: 'Ngày 22/12/1944, Đội VN Tuyên truyền Giải phóng quân thành lập, tiền thân của Quân đội nhân dân Việt Nam.',
    options: [
      {
        text: 'Huy động máy in đá Pác Bó in thâu đêm 3.000 bản tin chiến thắng chuyển về xuôi',
        effect: { paper: -25, ink: -20, enlightenment: 28, alertLevel: 10 },
        feedback: 'Tiếng vang hai trận đầu đánh thắng lan nhanh như bão lốc, thúc đẩy thanh niên tòng quân!',
      },
      {
        text: 'Cử hai phóng viên chiến trường tháp tùng đội quân giải phóng để kịp thời đưa tin',
        effect: { funds: -18, secretCells: 2, enlightenment: 18, alertLevel: 6 },
        feedback: 'Báo chí gắn liền với thực tiễn mặt trận, đào tạo nên những ngòi bút thép huyền thoại.',
      },
    ],
  },
  {
    id: 'evt-pool-4-3',
    eraId: 4,
    title: 'Quân lệnh số 1: Giờ Tổng khởi nghĩa đã điểm!',
    description: 'Phát xít Nhật đầu hàng Đồng minh vô điều kiện. Ủy ban Khởi nghĩa toàn quốc họp tại Tân Trào ra lệnh Tổng khởi nghĩa giành chính quyền!',
    historicalContext: 'Đêm 13/8/1945, lệnh Tổng khởi nghĩa phát đi, mở đầu cho thắng lợi thần tốc của Cách mạng Tháng Tám.',
    options: [
      {
        text: 'Dốc toàn bộ giấy mực in bản "Quân lệnh số 1" và Lời hiệu triệu của Hồ Chủ tịch',
        effect: { paper: -30, ink: -25, enlightenment: 38, alertLevel: 12 },
        feedback: 'Hàng vạn tờ báo và truyền đơn đỏ rực bay khắp phố phường Hà Nội, Huế, Sài Gòn thúc giục khởi nghĩa!',
      },
      {
        text: 'Tổ chức đội tuyên truyền xung phong chiếm đài phát thanh Bạch Mai để đọc hiệu triệu',
        effect: { alertLevel: 18, enlightenment: 42, secretCells: 4 },
        feedback: 'Tiếng nói của Việt Minh vang lên khắp bầu trời Đông Dương, chính quyền bù nhìn tan rã!',
      },
    ],
  },
  {
    id: 'evt-pool-4-4',
    eraId: 4,
    title: 'Đêm sương mù Tân Trào: Vận chuyển máy in về tiếp quản Thủ đô',
    description: 'Sau khi Nhật đầu hàng, một chuyến xe thồ chở máy in từ chiến khu Việt Bắc vượt đèo tiến về ngoại thành chuẩn bị cho ngày Độc Lập.',
    historicalContext: 'Các cơ quan báo chí của Đảng từ căn cứ địa thần tốc tiến về Hà Nội phục vụ ngày Tuyên ngôn Độc lập.',
    options: [
      {
        text: 'Bố trí tự vệ võ trang hộ tống máy in đi đường vòng tránh tàn quân Nhật',
        effect: { funds: -15, alertLevel: -8, enlightenment: 15 },
        feedback: 'Máy in cập bến nhà in tư nhân tiến bộ tại phố Hàng Bông hoàn toàn nguyên vẹn!',
      },
      {
        text: 'Vừa đi vừa in truyền đơn rải dọc đường kêu gọi đồng bào nổi dậy giành chính quyền huyện lỵ',
        effect: { paper: -15, enlightenment: 28, secretCells: 3, alertLevel: 12 },
        feedback: 'Các phủ huyện dọc đường hành quân liên tiếp đứng lên khởi nghĩa cướp chính quyền!',
      },
    ],
  },

  // ==========================================
  // UNIVERSAL UNDERGROUND SITUATIONS (Có thể xuất hiện ở mọi màn)
  // ==========================================
  {
    id: 'evt-pool-univ-1',
    title: 'Thùng mực in bị vỡ trên đường chuyển về căn cứ',
    description: 'Giao liên đạp xe qua đoạn đường gập ghềnh, chiếc hũ sành đựng mực đen bị rạn nứt rỉ mực ra sàn xe.',
    options: [
      {
        text: 'Dùng tro than và xà phòng trám lại kẽ nứt, cứu vãn được phần lớn lượng mực',
        effect: { ink: -8, alertLevel: -3 },
        feedback: 'Sự nhanh trí đã cứu được hơn 70% số mực, xe tiếp tục lăn bánh an toàn.',
      },
      {
        text: 'Ghé vào tiệm thuốc của một cơ sở cảm tình mua cồn và phẩm màu pha chế thêm',
        effect: { funds: -12, ink: 15, alertLevel: 4 },
        feedback: 'Không những bù đắp được lượng mực mất mà còn có thêm mực đỏ vẽ tiêu đề!',
      },
    ],
  },
  {
    id: 'evt-pool-univ-2',
    title: 'Đồng chí giao liên phát hiện có bóng đen bám đuôi',
    description: 'Khi đi qua ngã tư đèn dầu, đồng chí nhận thấy một kẻ mặc áo dài đen, nón cối luôn bám cách 50 bước chân.',
    options: [
      {
        text: 'Cắt đuôi: Rẽ ngoắt vào khu chợ sầm uất rồi luồn lách qua ngõ cụt thông sau',
        effect: { alertLevel: -15, funds: -5 },
        feedback: 'Kẻ theo dõi mất dấu hoàn toàn giữa đám đông, đồng chí về căn cứ an toàn!',
      },
      {
        text: 'Dẫn dụ kẻ theo dõi vào bẫy phục kích của đội tự vệ để tước vũ khí và thẩm vấn',
        effect: { alertLevel: 8, enlightenment: 10, secretCells: 1 },
        feedback: 'Bắt sống một tên chỉ điểm, thu giữ sổ ghi chép mật và bẻ gãy một mắt xích gián điệp!',
      },
    ],
  },
  {
    id: 'evt-pool-univ-3',
    title: 'Hội phụ nữ bí mật may cờ và giấu báo trong quẩy gánh rau',
    description: 'Các chị em trong tổ phụ nữ cứu tế tình nguyện nhận 200 bản báo giấu dưới lớp rau muống để phân phối vào chợ sớm.',
    options: [
      {
        text: 'Bàn giao báo cho chị em và hướng dẫn các tín hiệu nhận diện liên lạc',
        effect: { secretCells: 2, enlightenment: 14, alertLevel: 4 },
        feedback: 'Từng tờ báo được chuyển khéo léo vào tay các tiểu thương và bà con đi chợ!',
      },
      {
        text: 'Trích quỹ bồi dưỡng tiền xăng xe và bữa sáng cho các chị em',
        effect: { funds: -10, enlightenment: 12, secretCells: 1 },
        feedback: 'Tình cảm đồng chí cách mạng ấm áp, mạng lưới giao liên nữ hoạt động nhiệt tình.',
      },
    ],
  },
  {
    id: 'evt-pool-univ-4',
    title: 'Cơ sở in bị sự cố chập điện / cạn dầu thắp ban đêm',
    description: 'Vào đúng nửa đêm khi xưởng in đang dập dở mẻ báo thì đèn cạn dầu, bóng tối bao trùm căn hầm bí mật.',
    options: [
      {
        text: 'Vận động anh em đốt sáp ong và mỡ lợn tiếp tục dập in thâu đêm',
        effect: { paper: 5, alertLevel: 5, enlightenment: 6 },
        feedback: 'Mùi khói hơi nồng nhưng mẻ báo vẫn hoàn thành đúng tiến độ trước bình minh!',
      },
      {
        text: 'Tạm dừng máy in, tổ chức cho các đồng chí nghe báo cáo thời sự quốc tế',
        effect: { enlightenment: 10, alertLevel: -5 },
        feedback: 'Anh em thợ in được nâng cao nhận thức lý luận chính trị, tinh thần rất phấn chấn.',
      },
    ],
  },
];

/**
 * Hàm random tình huống / sự kiện bất ngờ
 * Lọc sự kiện phù hợp với màn chơi hiện tại hoặc sự kiện chung
 * Tránh trùng lặp các sự kiện vừa diễn ra
 */
export function getRandomGameEvent(
  levelId: number,
  alertLevel: number,
  seenEventIds: string[] = []
): GameEvent {
  // Lọc sự kiện hợp lệ:
  // 1. Phù hợp eraId hoặc sự kiện universal
  // 2. Phù hợp với mức độ động (minAlert nếu có)
  let eligible = COMPREHENSIVE_EVENT_POOL.filter((e) => {
    const eraMatch = e.eraId === levelId || e.eraId === undefined;
    const alertMatch = e.minAlert !== undefined ? alertLevel >= e.minAlert : true;
    return eraMatch && alertMatch;
  });

  // Lọc bỏ sự kiện đã thấy gần đây
  const unseedEligible = eligible.filter((e) => !seenEventIds.includes(e.id));
  if (unseedEligible.length > 0) {
    eligible = unseedEligible;
  }

  // Chọn ngẫu nhiên 1 sự kiện
  const randomIndex = Math.floor(Math.random() * eligible.length);
  const selectedEvent = eligible[randomIndex];

  // Thêm độ co giãn chỉ số ngẫu nhiên nhẹ cho các lựa chọn (jitter)
  const modifiedOptions = selectedEvent.options.map((opt) => {
    const jitter = Math.floor(Math.random() * 3) - 1; // -1, 0, hoặc +1
    const eff = { ...opt.effect };
    if (eff.enlightenment) eff.enlightenment = Math.max(2, eff.enlightenment + jitter);
    if (eff.alertLevel) eff.alertLevel = Math.max(-20, eff.alertLevel + jitter);
    if (eff.funds) eff.funds = eff.funds + jitter;

    return {
      text: opt.text,
      effect: eff,
      feedback: opt.feedback,
    };
  });

  return {
    ...selectedEvent,
    options: modifiedOptions,
  };
}
