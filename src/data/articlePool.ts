import type { ArticleOption } from './gameData';

export interface ExtendedArticleOption extends ArticleOption {
  eraId: number; // 1, 2, 3, 4
  trait?: string; // Nhãn thời cuộc ngẫu nhiên
  traitColor?: string;
  historicalSource?: string;
}

export const HISTORICAL_ARTICLE_POOL: ExtendedArticleOption[] = [
  // ==========================================
  // ERA 1: 1925 - 1930 (Thời kỳ chuẩn bị lập Đảng)
  // Báo Thanh Niên, Búa Liềm, Công Nông...
  // ==========================================
  {
    id: 'pool-art-1-1',
    eraId: 1,
    title: 'Đường Kách Mệnh & Sứ mệnh Người Thanh niên',
    subtitle: 'Bàn về tư tưởng vô sản và đạo đức người chiến sĩ cách mạng',
    type: 'radical',
    excerpt: 'Cách mệnh trước hết phải có cái gì? Trước hết phải có đảng cách mệnh, để trong thì vận động và tổ chức dân chúng, ngoài thì liên lạc với dân tộc bị áp bức và vô sản giai cấp mọi nơi. Đảng có vững cách mệnh mới thành công, cũng như người cầm lái có vững thuyền mới chạy.',
    authorPseudonym: 'Nguyễn Ái Quốc',
    targetClass: 'Thanh niên, Học sinh, Trí thức',
    statBonus: { enlightenment: 15, alertLevel: 12, funds: 5 },
    trait: '🔥 Tư tưởng cốt lõi',
    traitColor: 'border-red-500 bg-red-950/80 text-red-200',
    historicalSource: 'Hồ Chí Minh: Toàn tập, t. 2, tr. 289; Tác phẩm Đường Kách Mệnh (1927)',
  },
  {
    id: 'pool-art-1-2',
    eraId: 1,
    title: 'Thực trạng lầm than của phu xe & thợ bến cảng Hải Phòng',
    subtitle: 'Tiếng kêu cứu trước ách sưu cao thuế nặng và bóc lột dã man',
    type: 'moderate',
    excerpt: 'Mỗi ngày làm việc mười bốn giờ, roi vọt trên lưng, đồng lương còm cõi không đủ nuôi vợ dại con thơ. Phải liên hiệp lại để đòi quyền sống!',
    authorPseudonym: 'Thanh Dân',
    targetClass: 'Công nhân bến cảng & thợ mỏ',
    statBonus: { enlightenment: 11, alertLevel: 6, funds: 10 },
    trait: '⚖️ Đòi cơm áo',
    traitColor: 'border-amber-500 bg-amber-950/80 text-amber-200',
    historicalSource: 'Báo Thanh Niên số 12 (1925)',
  },
  {
    id: 'pool-art-1-3',
    eraId: 1,
    title: 'Vè Đánh đuổi Thực dân - Đòi lại non sông',
    subtitle: 'Thơ ca yêu nước bình dân dễ ngâm, dễ truyền khẩu',
    type: 'mass',
    excerpt: 'Hỡi ai con Lạc cháu Hồng / Nhìn non nhìn nước mà lòng chẳng đau? / Rủ nhau đánh đuổi Tây tàu / Đem về độc lập dài lâu muôn đời!',
    authorPseudonym: 'Ái Dân',
    targetClass: 'Bà con nông dân & dân nghèo thành thị',
    statBonus: { enlightenment: 9, alertLevel: 4, funds: 14 },
    trait: '🌾 Dễ truyền khẩu',
    traitColor: 'border-emerald-500 bg-emerald-950/80 text-emerald-200',
    historicalSource: 'Ca dao cách mạng truyền khẩu Quảng Châu',
  },
  {
    id: 'pool-art-1-4',
    eraId: 1,
    title: 'Tiếng chuông thức tỉnh thợ thuyền mỏ than Hòn Gai',
    subtitle: 'Vạch trần chế độ cai ký tàn ác và đòi quyền bãi công',
    type: 'radical',
    excerpt: 'Dưới hầm than sâu hàng trăm thước, mạng người rẻ hơn hòn than đá. Hỡi anh em phu mỏ, chỉ có đoàn kết đấu tranh mới phá vỡ xiềng xích nô lệ!',
    authorPseudonym: 'Nguyễn Đức Cảnh',
    targetClass: 'Thợ mỏ & Công nhân cơ khí',
    statBonus: { enlightenment: 16, alertLevel: 14, funds: 6 },
    trait: '⚡ Ngòi nổ bãi công',
    traitColor: 'border-red-500 bg-red-950/80 text-red-200',
    historicalSource: 'Báo Búa Liềm (1929)',
  },
  {
    id: 'pool-art-1-5',
    eraId: 1,
    title: 'Nỗi khổ sưu thuế của bà con nông dân Bắc Kỳ',
    subtitle: 'Tố cáo chính sách độc quyền muối, rượu và bắt nộp thuế thân',
    type: 'moderate',
    excerpt: 'Đến mùa thu thuế, nhà nghèo phải bán trâu, bán cả con thơ vẫn chưa đủ nộp cho quan phụ mẫu. Cần tương trợ nhau trong các hội ái hữu nông dân.',
    authorPseudonym: 'Dân Nghèo',
    targetClass: 'Nông dân cày cấy',
    statBonus: { enlightenment: 10, alertLevel: 5, funds: 12 },
    trait: '📢 Thấm thía lòng dân',
    traitColor: 'border-amber-500 bg-amber-950/80 text-amber-200',
    historicalSource: 'Báo Công Nông số 3 (1928)',
  },
  {
    id: 'pool-art-1-6',
    eraId: 1,
    title: 'Lời hiệu triệu gửi học sinh trường Bưởi & trường Đồng Khánh',
    subtitle: 'Kêu gọi tuổi trẻ trí thức đứng lên vì tương lai giống nòi',
    type: 'radical',
    excerpt: 'Học để làm gì nếu đất nước chìm trong bóng tối lầm than? Tuổi trẻ hãy đem trí tuệ và nhiệt huyết phụng sự đại nghĩa cứu quốc!',
    authorPseudonym: 'Thanh Niên Yêu Nước',
    targetClass: 'Trí thức, Học sinh & Sinh viên',
    statBonus: { enlightenment: 14, alertLevel: 9, funds: 16 },
    trait: '🎓 Hút sinh viên',
    traitColor: 'border-blue-500 bg-blue-950/80 text-blue-200',
    historicalSource: 'Phong trào bãi khóa yêu nước Hà Nội (1926)',
  },
  {
    id: 'pool-art-1-7',
    eraId: 1,
    title: 'Vè Ba Son: Ngọn cờ bãi công xưởng thủy Ba Son',
    subtitle: 'Ca ngợi cuộc đấu tranh anh dũng của công nhân đóng tàu Sài Gòn',
    type: 'mass',
    excerpt: 'Ba Son bãi thợ vang lừng / Tàu Tây nằm chết nửa chừng bến sông / Đồng lòng công bãi thợ ngưng / Thực dân kinh sợ giật mình hãi kinh!',
    authorPseudonym: 'Tôn Thắng',
    targetClass: 'Công nhân Ba Son & Dân nghèo Chợ Lớn',
    statBonus: { enlightenment: 12, alertLevel: 7, funds: 15 },
    trait: '🚢 Tiếng vang Nam Kỳ',
    traitColor: 'border-emerald-500 bg-emerald-950/80 text-emerald-200',
    historicalSource: 'Phong trào bãi công Ba Son do Tôn Đức Thắng lãnh đạo (1925)',
  },
  {
    id: 'pool-art-1-8',
    eraId: 1,
    title: 'Chánh cương vắn tắt & Luận cương lập Đảng (1930)',
    subtitle: 'Cương lĩnh chính trị đầu tiên xác định con đường giải phóng dân tộc',
    type: 'radical',
    excerpt: 'Chủ trương làm tư sản dân quyền cách mạng và thổ địa cách mạng để đi tới xã hội cộng sản... Đánh đổ đế quốc chủ nghĩa Pháp và bọn phong kiến, làm cho nước Nam được hoàn toàn độc lập.',
    authorPseudonym: 'Nguyễn Ái Quốc',
    targetClass: 'Hạt giống đỏ & Cán bộ cốt cán',
    statBonus: { enlightenment: 18, alertLevel: 15, funds: 4 },
    trait: '⭐ Cương lĩnh lập Đảng',
    traitColor: 'border-purple-500 bg-purple-950/80 text-purple-200',
    historicalSource: 'Văn kiện Đảng Toàn tập, t. 2, tr. 2; Chánh cương vắn tắt của Đảng (3/2/1930)',
  },

  // ==========================================
  // ERA 2: 1930 - 1935 (Ngọn Lửa Ngục Tối)
  // Xô viết Nghệ Tĩnh, Nhà tù Hỏa Lò, Côn Đảo...
  // ==========================================
  {
    id: 'pool-art-2-1',
    eraId: 2,
    title: 'Chí khí người Cộng sản trước máy chém thực dân',
    subtitle: 'Lời trăn trối bất hủ của Tổng Bí thư Trần Phú soi sáng ngục tù',
    type: 'radical',
    excerpt: 'Hãy giữ vững chí khí chiến đấu! Dù gông cùm quân thù có đày ải thân thể, tinh thần người chiến sĩ cách mạng mãi mãi bất diệt, bảo vệ sự thống nhất và trong sạch của Đảng!',
    authorPseudonym: 'Trần Phú',
    targetClass: 'Tù chính trị & Công nhân bị bắt bớ',
    statBonus: { enlightenment: 17, alertLevel: 16, funds: 2 },
    trait: '⛓️ Khí phách gang thép',
    traitColor: 'border-red-500 bg-red-950/80 text-red-200',
    historicalSource: 'Lời nhắn nhủ của Tổng Bí thư Trần Phú (6/9/1931); Văn kiện Đảng Toàn tập, t. 3',
  },
  {
    id: 'pool-art-2-2',
    eraId: 2,
    title: 'Bài học xương máu từ phong trào Xô viết Nghệ Tĩnh',
    subtitle: 'Đúc rút kinh nghiệm về khối liên minh công nông và bảo toàn lực lượng',
    type: 'moderate',
    excerpt: 'Khối liên minh công nông được củng cố dưới sự lãnh đạo của giai cấp vô sản là nhân tố quyết định mọi thắng lợi. Cần triệt để giữ vững nguyên tắc tổ chức bí mật, bảo toàn lực lượng cán bộ cốt cán.',
    authorPseudonym: 'Lê Hồng Phong',
    targetClass: 'Cán bộ đảng viên vùng tự do',
    statBonus: { enlightenment: 13, alertLevel: 8, funds: 12 },
    trait: '📚 Kinh nghiệm đấu tranh',
    traitColor: 'border-amber-500 bg-amber-950/80 text-amber-200',
    historicalSource: 'Văn kiện Đảng Toàn tập, t. 3; Phong trào cách mạng 1930 - 1931',
  },
  {
    id: 'pool-art-2-3',
    eraId: 2,
    title: 'Lời kêu gọi đồng bào tiếp tế cơm rau cho tù nhân',
    subtitle: 'Tranh thủ tình thương và lòng yêu nước của thân nhân, nhân dân ngoại ô',
    type: 'mass',
    excerpt: 'Mỗi nắm cơm, cọng rau của bà con gửi vào xà lim là một viên đạn tiếp thêm sinh lực cho các chiến sĩ kiên gan chống lại bạo tàn.',
    authorPseudonym: 'Mẹ Chiến Sĩ',
    targetClass: 'Gia đình thân nhân & Phật tử, tiểu thương',
    statBonus: { enlightenment: 10, alertLevel: 5, funds: 22 },
    trait: '🍲 Nghĩa tình đồng bào',
    traitColor: 'border-emerald-500 bg-emerald-950/80 text-emerald-200',
    historicalSource: 'Phong trào cứu tế đỏ Côn Đảo (1932)',
  },
  {
    id: 'pool-art-2-4',
    eraId: 2,
    title: 'Biến ngục tù thực dân thành trường học Mác - Lênin',
    subtitle: 'Tổ chức các lớp học văn hóa và lý luận cách mạng trong xà lim tối',
    type: 'radical',
    excerpt: 'Biến ngục tù đế quốc thành trường học cách mạng, rèn đúc ý chí vô sản, nâng cao trình độ lý luận Mác - Lênin cho toàn thể đồng chí để tiếp tục sự nghiệp đấu tranh giải phóng dân tộc.',
    authorPseudonym: 'Chi bộ Côn Đảo - Hỏa Lò',
    targetClass: 'Chiến sĩ trẻ & Học viên bí mật',
    statBonus: { enlightenment: 18, alertLevel: 13, funds: 6 },
    trait: '📖 Trường học ngục tù',
    traitColor: 'border-purple-500 bg-purple-950/80 text-purple-200',
    historicalSource: 'Lịch sử Chi bộ Nhà tù Hỏa Lò & Côn Đảo (1930 - 1935)',
  },
  {
    id: 'pool-art-2-5',
    eraId: 2,
    title: 'Thơ trong xà lim: Dù thân ở ngục tinh thần ở ngoài',
    subtitle: 'Thơ chép tay trên giấy bao thuốc lá truyền qua kẽ thông gió',
    type: 'mass',
    excerpt: 'Thân thể ở trong lao / Tinh thần ở ngoài lao / Muốn nên sự nghiệp lớn / Tinh thần càng phải cao!',
    authorPseudonym: 'Chiến Sĩ Áo Vải',
    targetClass: 'Toàn thể đồng bào & Tù nhân chính trị',
    statBonus: { enlightenment: 12, alertLevel: 4, funds: 15 },
    trait: '✨ Thơ truyền cảm hứng',
    traitColor: 'border-emerald-500 bg-emerald-950/80 text-emerald-200',
    historicalSource: 'Thơ tù cách mạng (1930 - 1934)',
  },
  {
    id: 'pool-art-2-6',
    eraId: 2,
    title: 'Tác phẩm "Tự chỉ trích" của Tổng Bí thư Nguyễn Văn Cừ',
    subtitle: 'Vũ khí sắc bén củng cố sự thống nhất ý chí và hành động của Đảng',
    type: 'moderate',
    excerpt: 'Công khai, mạnh dạn, thành thực vạch những lỗi lầm và tìm phương kế sửa đổi, chống xu hướng cô độc, hẹp hòi... để cho Đảng càng thống nhất, càng mạnh mẽ.',
    authorPseudonym: 'Trí Cường (Nguyễn Văn Cừ)',
    targetClass: 'Cơ sở nông thôn & Đội tự vệ',
    statBonus: { enlightenment: 14, alertLevel: 7, funds: 14 },
    trait: '🛡️ Tự chỉ trích',
    traitColor: 'border-amber-500 bg-amber-950/80 text-amber-200',
    historicalSource: 'Tác phẩm "Tự chỉ trích" của Tổng Bí thư Nguyễn Văn Cừ (7/1939)',
  },
  {
    id: 'pool-art-2-7',
    eraId: 2,
    title: 'Vạch mặt mật thám chỉ điểm và tay sai phản bội',
    subtitle: 'Cảnh giác cao độ trước các thủ đoạn cài cắm người của Sở Liêm Phóng',
    type: 'radical',
    excerpt: 'Kẻ chỉ điểm là mũi tên độc nguy hiểm nhất. Mọi hội đồng hương, tổ chức bí mật phải thẩm tra lý lịch nghiêm ngặt, giữ kỷ luật sắt.',
    authorPseudonym: 'Phản Gián Đỏ',
    targetClass: 'Cán bộ giao liên & Trưởng chi bộ',
    statBonus: { enlightenment: 15, alertLevel: 15, funds: 8 },
    trait: '🕵️ Cảnh giác phản gián',
    traitColor: 'border-red-500 bg-red-950/80 text-red-200',
    historicalSource: 'Tạp chí Đỏ - Ban Chỉ huy ở ngoài của Đảng (1934)',
  },

  // ==========================================
  // ERA 3: 1936 - 1939 (Làn Sóng Dân Chủ)
  // Báo Dân Chúng, Tin Tức, Đông Dương Đại Hội...
  // ==========================================
  {
    id: 'pool-art-3-1',
    eraId: 3,
    title: 'Yêu sách của Báo Dân Chúng: Ngày làm việc 8 giờ & Tự do Nghiệp đoàn',
    subtitle: 'Tiếng nói của cơ quan ngôn luận Trung ương Đảng thời kỳ Mặt trận Dân chủ',
    type: 'radical',
    excerpt: 'Chúng tôi đòi tự do hội họp, tự do lập nghiệp đoàn, tự do xuất bản, ngày làm việc 8 giờ và thi hành triệt để luật lao động tiến bộ cho thợ thuyền Đông Dương.',
    authorPseudonym: 'Hải Khách (Trường Chinh)',
    targetClass: 'Công nhân thành thị & Thợ thuyền',
    statBonus: { enlightenment: 16, alertLevel: 13, funds: 16 },
    trait: '⚖️ Đấu tranh công khai',
    traitColor: 'border-red-500 bg-red-950/80 text-red-200',
    historicalSource: 'Báo Dân Chúng số 1 (30/8/1938) & Văn kiện Đảng Toàn tập, t. 6',
  },
  {
    id: 'pool-art-3-2',
    eraId: 3,
    title: 'Lời kêu gọi toàn dân tham gia Đông Dương Đại hội',
    subtitle: 'Vận động thành lập các Ủy ban hành động tại khắp làng xã, xí nghiệp',
    type: 'moderate',
    excerpt: 'Mỗi làng, mỗi phố hãy lập ra một Ủy ban hành động để thu thập nguyện vọng của dân chúng gửi cho phái đoàn điều tra của Quốc hội Pháp.',
    authorPseudonym: 'Phan Đăng Lưu',
    targetClass: 'Dân nghèo thành thị & Trí thức cấp tiến',
    statBonus: { enlightenment: 19, alertLevel: 8, funds: 26 },
    trait: '📢 Đông Dương Đại hội',
    traitColor: 'border-amber-500 bg-amber-950/80 text-amber-200',
    historicalSource: 'Phong trào Đông Dương Đại hội (1936)',
  },
  {
    id: 'pool-art-3-3',
    eraId: 3,
    title: 'Bãi bỏ thuế thân - Giảm thuế chợ - Mở mang trường học',
    subtitle: 'Những nguyện vọng thiết thực nhất cho đời sống người nông dân nghèo',
    type: 'mass',
    excerpt: 'Thuế thân đè nặng lên vai người sống lẫn người chết! Phải bãi bỏ ngay thứ thuế vô nhân đạo này để con em có sách đến trường, người cày có ruộng.',
    authorPseudonym: 'Nông Dân Hà Đông',
    targetClass: 'Nông dân nghèo & Tiểu thương chợ',
    statBonus: { enlightenment: 13, alertLevel: 5, funds: 32 },
    trait: '🌾 Dân sinh cơm áo',
    traitColor: 'border-emerald-500 bg-emerald-950/80 text-emerald-200',
    historicalSource: 'Báo Tin Tức Hà Nội (1937)',
  },
  {
    id: 'pool-art-3-4',
    eraId: 3,
    title: 'Phóng sự: Một ngày dưới đáy địa ngục mỏ than Vàng Danh',
    subtitle: 'Bút ký điều tra chấn động về điều kiện lao động kinh hoàng của thợ than',
    type: 'moderate',
    excerpt: 'Bụi than bám vào buồng phổi, sập lò chôn sống công nhân mỗi tuần mà chủ Tây không thèm bồi thường lấy một đồng xu. Đây là bằng chứng không thể chối cãi!',
    authorPseudonym: 'Ký Giả Dân Chúng',
    targetClass: 'Độc giả thành thị & Trí thức tiến bộ',
    statBonus: { enlightenment: 15, alertLevel: 9, funds: 20 },
    trait: '📰 Phóng sự điều tra',
    traitColor: 'border-blue-500 bg-blue-950/80 text-blue-200',
    historicalSource: 'Báo Bạn Dân (1937)',
  },
  {
    id: 'pool-art-3-5',
    eraId: 3,
    title: 'Tiếng nói của phụ nữ đòi quyền bình đẳng và chống bạo hành',
    subtitle: 'Kêu gọi chị em tham gia các hội cứu tế và nghiệp đoàn thợ dệt',
    type: 'mass',
    excerpt: 'Chị em phụ nữ chịu hai tầng áp bức: phong kiến gia đình và thực dân xã hội. Muốn tự giải phóng, chị em phải đứng chung hàng ngũ đấu tranh!',
    authorPseudonym: 'Nữ Ký Giả Sài Gòn',
    targetClass: 'Phụ nữ lao động & Nữ sinh',
    statBonus: { enlightenment: 14, alertLevel: 4, funds: 28 },
    trait: '🌸 Phụ nữ thức tỉnh',
    traitColor: 'border-pink-500 bg-pink-950/80 text-pink-200',
    historicalSource: 'Báo Dân Chúng chuyên mục Phụ Nữ (1938)',
  },
  {
    id: 'pool-art-3-6',
    eraId: 3,
    title: 'Cảnh giác trước nguy cơ Chủ nghĩa Phát xít đe dọa thế giới',
    subtitle: 'Phân tích tình hình Đức - Ý - Nhật và nhiệm vụ bảo vệ hòa bình',
    type: 'radical',
    excerpt: 'Phát xít là chiến tranh, là dã man tàn bạo. Nhân dân Đông Dương phải cùng mặt trận dân chủ toàn cầu chống phát xít đến cùng!',
    authorPseudonym: 'Vô Sản Trẻ',
    targetClass: 'Trí thức & Cán bộ chính trị',
    statBonus: { enlightenment: 17, alertLevel: 14, funds: 15 },
    trait: '🌍 Tầm nhìn quốc tế',
    traitColor: 'border-purple-500 bg-purple-950/80 text-purple-200',
    historicalSource: 'Nghị quyết Trung ương Đảng (1937)',
  },
  {
    id: 'pool-art-3-7',
    eraId: 3,
    title: 'Vè Đòi Báo: Báo của dân ta phải để dân đọc',
    subtitle: 'Châm biếm sắc bén các lệnh tịch thu và kiểm duyệt của phủ Thống sứ',
    type: 'mass',
    excerpt: 'Càng cấm dân đọc báo / Lòng dân càng sôi sục / Báo xé một thành mười / Truyền tay nhau khắp chốn!',
    authorPseudonym: 'Bình Dân Hải Phòng',
    targetClass: 'Bình dân thành thị & Bến bãi',
    statBonus: { enlightenment: 12, alertLevel: 6, funds: 24 },
    trait: '😄 Châm biếm hóm hỉnh',
    traitColor: 'border-emerald-500 bg-emerald-950/80 text-emerald-200',
    historicalSource: 'Thơ trào phúng Báo Tiếng Vang (1938)',
  },

  // ==========================================
  // ERA 4: 1941 - 1945 (Tiếng Kèn Giải Phóng)
  // Pác Bó, Việt Nam Độc Lập, Cờ Giải Phóng, Khởi Nghĩa...
  // ==========================================
  {
    id: 'pool-art-4-1',
    eraId: 4,
    title: 'Chỉ thị lịch sử: Nhật - Pháp bắn nhau và hành động của chúng ta',
    subtitle: 'Ban Thường vụ Trung ương Đảng chỉ đạo phát động cao trào kháng Nhật cứu nước',
    type: 'radical',
    excerpt: 'Phát động một cao trào kháng Nhật cứu nước mạnh mẽ để làm tiền đề cho cuộc Tổng khởi nghĩa. Mọi hình thức tuyên truyền, cổ động, tổ chức và đấu tranh lúc này phải mang tính chất chuẩn bị khởi nghĩa và trực tiếp phục vụ khởi nghĩa.',
    authorPseudonym: 'Ban Thường vụ Trung ương',
    targetClass: 'Việt Minh, Tự vệ cứu quốc & Binh lính',
    statBonus: { enlightenment: 22, alertLevel: 20, funds: 22 },
    trait: '🚩 Lệnh xung trận',
    traitColor: 'border-red-500 bg-red-950/80 text-red-200',
    historicalSource: 'Văn kiện Đảng Toàn tập, t. 7, tr. 364; Chỉ thị Ban Thường vụ Trung ương Đảng (12/3/1945)',
  },
  {
    id: 'pool-art-4-2',
    eraId: 4,
    title: 'Nghị quyết Trung ương 8: Giải phóng dân tộc là nhiệm vụ tối cao',
    subtitle: 'Nguyễn Ái Quốc chủ trì Hội nghị Trung ương 8 tại lán Khuổi Nặm (Pác Bó)',
    type: 'moderate',
    excerpt: 'Trong lúc này nếu không giải quyết được vấn đề dân tộc giải phóng, không đòi được độc lập, tự do cho toàn thể dân tộc, thì chẳng những toàn thể quốc gia dân tộc còn phải chịu mãi kiếp ngựa trâu, mà quyền lợi của bộ phận, giai cấp đến vạn năm cũng không đòi lại được.',
    authorPseudonym: 'Nguyễn Ái Quốc',
    targetClass: 'Toàn thể các tầng lớp nhân dân',
    statBonus: { enlightenment: 24, alertLevel: 11, funds: 28 },
    trait: '⭐ Đại đoàn kết dân tộc',
    traitColor: 'border-amber-500 bg-amber-950/80 text-amber-200',
    historicalSource: 'Văn kiện Đảng Toàn tập, t. 7, tr. 113; Nghị quyết Hội nghị BCH Trung ương Đảng lần thứ 8 (tháng 5/1941)',
  },
  {
    id: 'pool-art-4-3',
    eraId: 4,
    title: 'Vè Việt Lập: Đồng bào sắm gươm giáo cứu nước',
    subtitle: 'Thơ ca bình dị do Bác Hồ sáng tác, có hình minh họa Người tự vẽ',
    type: 'mass',
    excerpt: 'Dân ta xin nhớ chữ đồng / Đồng tình, đồng sức, đồng lòng, đồng minh / Gươm cày chung một mối tình / Cứu non cứu nước quang vinh đời đời.',
    authorPseudonym: 'Già Thu',
    targetClass: 'Đồng bào các dân tộc thiểu số Việt Bắc',
    statBonus: { enlightenment: 19, alertLevel: 6, funds: 32 },
    trait: '⛰️ Bình dị Pác Bó',
    traitColor: 'border-emerald-500 bg-emerald-950/80 text-emerald-200',
    historicalSource: 'Báo Việt Nam Độc Lập số 1 (1/8/1941)',
  },
  {
    id: 'pool-art-4-4',
    eraId: 4,
    title: 'Kêu gọi toàn dân: Phá kho thóc Nhật cứu đói!',
    subtitle: 'Khẩu hiệu cấp bách cứu sống hàng triệu đồng bào trước nạn đói 1945',
    type: 'radical',
    excerpt: 'Thóc gạo của ta giặc gom về tích trữ để chết mục trong kho trong khi nhân dân chết đói đầy đường. Hãy phá kho thóc cứu lấy mạng sống đồng bào!',
    authorPseudonym: 'Cứu Quốc Quân',
    targetClass: 'Nông dân nghèo Bắc Bộ & Trung Bộ',
    statBonus: { enlightenment: 26, alertLevel: 22, funds: 35 },
    trait: '🔥 Cứu đói khẩn cấp',
    traitColor: 'border-red-500 bg-red-950/80 text-red-200',
    historicalSource: 'Cao trào kháng Nhật cứu nước (1945)',
  },
  {
    id: 'pool-art-4-5',
    eraId: 4,
    title: 'Tin chiến thắng Phai Khắt & Nà Ngần của Đội Giải Phóng Quân',
    subtitle: 'Đội Việt Nam Tuyên truyền Giải phóng quân lập chiến công giòn giã',
    type: 'moderate',
    excerpt: 'Ba mươi tư chiến sĩ với súng kíp và gươm giáo đã mưu trí hạ hai đồn giặc, thu toàn bộ vũ khí mà không mất một giọt máu. Quân đội cách mạng đã ra đời!',
    authorPseudonym: 'Võ Nguyên Giáp',
    targetClass: 'Thanh niên tòng quân & Tự vệ',
    statBonus: { enlightenment: 23, alertLevel: 15, funds: 25 },
    trait: '🎖️ Chiến công hiển hách',
    traitColor: 'border-amber-500 bg-amber-950/80 text-amber-200',
    historicalSource: 'Báo Cờ Giải Phóng (12/1944)',
  },
  {
    id: 'pool-art-4-6',
    eraId: 4,
    title: 'Ca khúc Cứu Quốc: Đoàn quân Việt Nam đi chung lòng cứu quốc',
    subtitle: 'Lời bài hát Tiến Quân Ca của nhạc sĩ Văn Cao in trang trọng trên báo',
    type: 'mass',
    excerpt: 'Đoàn quân Việt Nam đi / Chung lòng cứu quốc / Bước chân dồn vang trên đường gập ghềnh xa / Cờ in máu chiến thắng mang hồn nước...',
    authorPseudonym: 'Văn Cao',
    targetClass: 'Toàn dân tộc Việt Nam',
    statBonus: { enlightenment: 25, alertLevel: 8, funds: 30 },
    trait: '🎶 Tiến Quân Ca hùng tráng',
    traitColor: 'border-yellow-500 bg-yellow-950/80 text-yellow-200',
    historicalSource: 'Bài hát Tiến Quân Ca in trên Báo Độc Lập (11/1944)',
  },
  {
    id: 'pool-art-4-7',
    eraId: 4,
    title: 'Quân lệnh số 1 & Lời kêu gọi Tổng khởi nghĩa Tháng Tám 1945',
    subtitle: 'Lệnh Tổng khởi nghĩa giành chính quyền về tay nhân dân trên toàn quốc',
    type: 'radical',
    excerpt: 'Hỡi quân dân toàn quốc! Giờ Tổng khởi nghĩa đã đánh! Cơ hội có một cho quân dân Việt Nam vùng dậy giành lấy quyền độc lập của nước nhà!... Hỡi đồng bào yêu quý! Toàn quốc đồng bào hãy đứng dậy đem sức ta mà tự giải phóng cho ta!',
    authorPseudonym: 'Ủy ban Khởi nghĩa toàn quốc & Hồ Chí Minh',
    targetClass: 'Toàn thể đồng bào, tự vệ & binh lính',
    statBonus: { enlightenment: 30, alertLevel: 24, funds: 40 },
    trait: '⭐ Giờ Tổng Khởi Nghĩa',
    traitColor: 'border-red-600 bg-red-950 text-yellow-300 font-black',
    historicalSource: 'Quân lệnh số 1 (13/8/1945, Văn kiện Đảng Toàn tập, t. 7, tr. 423) & Thư kêu gọi Tổng khởi nghĩa của Chủ tịch Hồ Chí Minh (Hồ Chí Minh: Toàn tập, t. 3, tr. 596)',
  },
];

/**
 * Hàm tự động random các bài viết cho màn chơi
 * Lấy ngẫu nhiên các bài viết thuộc giai đoạn lịch sử tương ứng
 * Thêm độ dao động nhẹ các chỉ số (jitter) để mỗi lần chơi là duy nhất!
 */
export function getRandomArticlesForLevel(
  levelId: number,
  count = 3
): ArticleOption[] {
  // Lọc các bài viết thuộc màn chơi hiện tại
  const pool = HISTORICAL_ARTICLE_POOL.filter((a) => a.eraId === levelId);

  // Xáo trộn ngẫu nhiên Fisher-Yates
  const shuffled = [...pool].sort(() => Math.random() - 0.5);

  // Cố gắng chọn đại diện đa dạng: 1 radical, 1 moderate, 1 mass nếu có
  const radical = shuffled.find((a) => a.type === 'radical');
  const moderate = shuffled.find((a) => a.type === 'moderate');
  const mass = shuffled.find((a) => a.type === 'mass');

  let selected: ExtendedArticleOption[] = [];
  if (radical && moderate && mass && count === 3) {
    selected = [radical, moderate, mass];
  } else {
    selected = shuffled.slice(0, count);
  }

  // Thêm độ co giãn chỉ số ngẫu nhiên nhỏ (±1 đến 2 điểm)
  return selected.map((art, index) => {
    const jitterEnlightenment = Math.floor(Math.random() * 5) - 2; // -2 đến +2
    const jitterAlert = Math.floor(Math.random() * 5) - 2;
    const jitterFunds = Math.floor(Math.random() * 5) - 2;

    return {
      id: `${art.id}-v${Date.now()}-${index}`,
      title: art.title,
      subtitle: art.subtitle,
      type: art.type,
      excerpt: art.excerpt,
      authorPseudonym: art.authorPseudonym,
      targetClass: art.targetClass,
      statBonus: {
        enlightenment: Math.max(6, art.statBonus.enlightenment + jitterEnlightenment),
        alertLevel: Math.max(3, art.statBonus.alertLevel + jitterAlert),
        funds: Math.max(2, (art.statBonus.funds || 5) + jitterFunds),
      },
      trait: art.trait,
    };
  });
}
