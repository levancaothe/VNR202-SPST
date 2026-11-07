/**
 * Utility to generate an authentic high-resolution vintage newspaper certificate
 * directly on an HTML5 Canvas, completely bypassing html2canvas CSS parsing bugs.
 */

export interface NewspaperCertificateData {
  comradeName: string;
  comradeRole: string;
  totalDistributed: number;
  secretCells: number;
}

export function drawNewspaperCertificate(
  data: NewspaperCertificateData
): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  const width = 1240;
  const height = 1754; // A4 ratio 1:1.414
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  // 1. Parchment Background
  ctx.fillStyle = '#f5eddb';
  ctx.fillRect(0, 0, width, height);

  // Subtle vintage paper texture gradient
  const grad = ctx.createLinearGradient(0, 0, width, height);
  grad.addColorStop(0, 'rgba(215, 195, 160, 0.25)');
  grad.addColorStop(0.5, 'rgba(255, 255, 255, 0.15)');
  grad.addColorStop(1, 'rgba(180, 150, 110, 0.3)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  // 2. Vintage Double Border
  ctx.strokeStyle = '#2b1b11';
  ctx.lineWidth = 5;
  ctx.strokeRect(45, 45, width - 90, height - 90);

  ctx.strokeStyle = '#5a3d28';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(55, 55, width - 110, height - 110);

  // Corner decorative flourishes
  const drawCornerFlourish = (x: number, y: number) => {
    ctx.fillStyle = '#8b2616';
    ctx.beginPath();
    ctx.arc(x, y, 6, 0, Math.PI * 2);
    ctx.fill();
  };
  drawCornerFlourish(55, 55);
  drawCornerFlourish(width - 55, 55);
  drawCornerFlourish(55, height - 55);
  drawCornerFlourish(width - 55, height - 55);

  let currentY = 110;

  // 3. Masthead Header
  ctx.fillStyle = '#5c3a21';
  ctx.font = 'bold 18px "Times New Roman"';
  ctx.textAlign = 'center';
  ctx.letterSpacing = '3px';
  ctx.fillText('CƠ QUAN PHÁT ĐỘNG TỔNG KHỞI NGHĨA GIÀNH CHÍNH QUYỀN', width / 2, currentY);
  currentY += 65;

  // Masthead Big Title: VIỆT NAM ĐỘC LẬP
  ctx.fillStyle = '#140b06';
  ctx.font = '900 78px "Times New Roman"';
  ctx.letterSpacing = '6px';
  ctx.fillText('VIỆT NAM ĐỘC LẬP', width / 2, currentY);
  currentY += 30;

  // Horizontal divider bars
  ctx.strokeStyle = '#1a110a';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(80, currentY);
  ctx.lineTo(width - 80, currentY);
  ctx.stroke();

  currentY += 26;

  // Issue Metadata Line
  ctx.fillStyle = '#4a3424';
  ctx.font = 'bold 18px "Times New Roman"';
  ctx.letterSpacing = '1px';
  ctx.textAlign = 'left';
  ctx.fillText('SỐ ĐẶC BIỆT MÙA THU 1945', 85, currentY);

  ctx.textAlign = 'center';
  ctx.fillText('HÀ NỘI NGÀY 2 THÁNG 9 NĂM 1945', width / 2, currentY);

  ctx.textAlign = 'right';
  ctx.fillText('GIÁ: TRUYỀN TAY ĐỌC KỸ', width - 85, currentY);

  currentY += 15;
  ctx.strokeStyle = '#1a110a';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(80, currentY);
  ctx.lineTo(width - 80, currentY);
  ctx.stroke();

  // 4. Red Rubber Stamp: HUÂN CHƯƠNG BÁO CHÍ
  ctx.save();
  ctx.translate(width - 240, 290);
  ctx.rotate((12 * Math.PI) / 180);
  ctx.strokeStyle = '#b91c1c';
  ctx.lineWidth = 3;
  ctx.strokeRect(-120, -30, 240, 60);
  ctx.fillStyle = '#b91c1c';
  ctx.font = 'bold 18px "Times New Roman"';
  ctx.textAlign = 'center';
  ctx.fillText('★ HUÂN CHƯƠNG BÁO CHÍ ★', 0, 8);
  ctx.restore();

  currentY += 60;

  // 5. Headline: Commendation
  ctx.textAlign = 'left';
  ctx.fillStyle = '#8b2616';
  ctx.font = 'bold 36px "Times New Roman"';
  ctx.letterSpacing = '1px';
  ctx.fillText(`TUYÊN DƯƠNG CHIẾN CÔNG CỦA ĐỒNG CHÍ:`, 85, currentY);
  currentY += 45;

  ctx.fillStyle = '#140b06';
  ctx.font = 'bold 42px "Times New Roman"';
  ctx.fillText(data.comradeName || 'Nguyễn Văn Yêu Nước', 85, currentY);
  currentY += 35;

  ctx.fillStyle = '#5c3e26';
  ctx.font = 'italic bold 22px "Times New Roman"';
  ctx.fillText(`Chức trách: ${data.comradeRole || 'Tổng Biên Tập Báo Cách Mạng'}`, 85, currentY);
  currentY += 35;

  // Thin separator
  ctx.strokeStyle = '#baa48b';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(85, currentY);
  ctx.lineTo(width - 85, currentY);
  ctx.stroke();
  currentY += 40;

  // 6. Two-Column Layout
  const colWidth = (width - 170 - 50) / 2; // 510px per column
  const leftX = 85;
  const rightX = 85 + colWidth + 50;
  const startContentY = currentY;

  // Helper for word wrapping
  const wrapText = (
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    lineHeight: number
  ): number => {
    const words = text.split(' ');
    let line = '';
    let curY = y;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        ctx.fillText(line.trim(), x, curY);
        line = words[n] + ' ';
        curY += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line.trim(), x, curY);
    return curY + lineHeight;
  };

  // Left Column: Historical Journey Narrative
  ctx.fillStyle = '#2b1f16';
  ctx.font = '21px "Times New Roman"';

  const paragraph1 =
    'Trải qua chặng đường hai mươi năm từ tiếng chuông báo Thanh Niên (1925) tại Quảng Châu cho đến ngọn cờ giải phóng tung bay giữa Quảng trường Ba Đình (1945), đồng chí đã kiên cường vượt qua mạng lưới mật thám bủa vây, giữ vững ngòi bút và bánh đà xưởng in thạch.';
  let leftY = wrapText(paragraph1, leftX, startContentY, colWidth, 34);

  leftY += 20;
  const paragraph2 =
    'Dù trong gác xép chật hẹp, xà lim nhà tù đế quốc hay hang đá mù sương Pác Bó, từng dòng chữ in bằng mực than củi của đồng chí đã gieo niềm tin tất thắng vào trái tim hàng triệu người cùng khổ, góp phần làm nên thắng lợi của Cách mạng Tháng Tám năm 1945!';
  wrapText(paragraph2, leftX, leftY, colWidth, 34);

  // Divider between columns
  ctx.strokeStyle = '#d5c2ab';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(leftX + colWidth + 25, startContentY - 10);
  ctx.lineTo(leftX + colWidth + 25, startContentY + 440);
  ctx.stroke();

  // Right Column: Achievements Box
  let rightY = startContentY;
  ctx.fillStyle = '#ebe0ca';
  ctx.fillRect(rightX, rightY, colWidth, 230);
  ctx.strokeStyle = '#baa48b';
  ctx.lineWidth = 2;
  ctx.strokeRect(rightX, rightY, colWidth, 230);

  ctx.fillStyle = '#8b2616';
  ctx.font = 'bold 22px "Times New Roman"';
  ctx.fillText('THÀNH TÍCH GHI NHẬN:', rightX + 25, rightY + 45);

  ctx.fillStyle = '#241a14';
  ctx.font = '20px "Times New Roman"';
  ctx.fillText(
    `● Đã phát hành: ${data.totalDistributed} tờ báo cách mạng`,
    rightX + 25,
    rightY + 95
  );
  ctx.fillText(
    `● Đã gây dựng: ${data.secretCells} chi bộ nòng cốt`,
    rightX + 25,
    rightY + 140
  );
  ctx.fillText(
    `● Danh hiệu: Chiến sĩ Tiên phong Báo chí Vô sản`,
    rightX + 25,
    rightY + 185
  );

  rightY += 280;

  // Signature Block
  ctx.textAlign = 'center';
  ctx.fillStyle = '#5c3a21';
  ctx.font = 'bold 18px "Times New Roman"';
  ctx.fillText(
    'THAY MẶT ỦY BAN DÂN TỘC GIẢI PHÓNG VIỆT NAM',
    rightX + colWidth / 2,
    rightY
  );
  rightY += 28;
  ctx.fillText('(CHÍNH PHỦ LÂM THỜI)', rightX + colWidth / 2, rightY);

  rightY += 60;
  ctx.fillStyle = '#8b2616';
  ctx.font = 'italic bold 34px "Times New Roman"';
  ctx.fillText('Chủ tịch Hồ Chí Minh', rightX + colWidth / 2, rightY);

  // 7. Bottom Archive Footer
  ctx.textAlign = 'center';
  ctx.fillStyle = '#6e4f35';
  ctx.font = '16px "Times New Roman"';
  ctx.fillText(
    'Trích lưu chiểu Bảo tàng Báo chí Cách mạng Việt Nam • Dự án "Tờ Báo Bí Mật (1925 - 1945)"',
    width / 2,
    height - 80
  );

  return canvas;
}

