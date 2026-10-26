import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, QrCode, Clock, CheckCircle2, Flame, ShieldCheck, Smartphone, Zap } from 'lucide-react';

interface Slide17Props {
  isLed3x1?: boolean;
}

export const Slide17: React.FC<Slide17Props> = ({ isLed3x1 = false }) => {
  // Live countdown timer starting at 3 minutes (03:00)
  const [totalSeconds, setTotalSeconds] = useState(180);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setTotalSeconds((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning]);

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');

  return (
    <div
      className={`slide17-wrapper flex flex-col justify-center items-center w-full mx-auto select-none ${
        isLed3x1
          ? 'max-w-[1720px] px-3 sm:px-6 py-1 lg:py-2 my-auto'
          : 'max-w-[1480px] px-3 sm:px-6 lg:px-8 py-3 sm:py-6 my-auto'
      }`}
    >
      {/* Top Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={`text-center ${isLed3x1 ? 'mb-2 lg:mb-3' : 'mb-5 sm:mb-7'}`}
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-900 text-xs sm:text-sm font-bold tracking-widest uppercase mb-1.5 shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
          <span>AMBER NOTE</span>
        </div>
        <h1
          className={`font-black tracking-tight text-neutral-900 uppercase ${
            isLed3x1
              ? 'text-2xl sm:text-3xl lg:text-4xl'
              : 'text-2xl sm:text-4xl lg:text-5xl xl:text-6xl'
          }`}
        >
          BIẾN HỘI THOẠI THÀNH HÀNH ĐỘNG
        </h1>
      </motion.div>

      {/* Main 3-Column Architecture: Perfectly engineered for wide screens & LED 3x1 */}
      <div
        className={`grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-5 lg:gap-6 w-full items-stretch ${
          isLed3x1 ? 'max-w-[1680px]' : 'max-w-6xl'
        }`}
      >
        {/* CỘT 1 (BÊN TRÁI): THỜI GIAN MỞ BÁN & ĐẾM NGƯỢC */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className={`slide17-card relative bg-gradient-to-br from-[#e6eff7] via-[#d7e4f0] to-[#c7d8e8] border-2 border-white/80 rounded-[28px] sm:rounded-[34px] flex flex-col justify-between shadow-[0_16px_36px_-12px_rgba(15,23,42,0.12)] overflow-hidden ${
            isLed3x1
              ? 'p-4 sm:p-5 lg:p-6 min-h-[380px] lg:min-h-[440px]'
              : 'p-5 sm:p-7 min-h-[420px] sm:min-h-[480px]'
          }`}
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute -top-16 -left-16 w-56 h-56 bg-amber-300/25 rounded-full blur-3xl pointer-events-none" />

          {/* Top Badges */}
          <div className="relative z-10 flex items-center justify-between gap-2 w-full">
            <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs sm:text-sm font-black px-3.5 py-1.5 sm:py-2 rounded-full shadow-sm shadow-amber-500/25 flex items-center gap-1.5 border border-amber-400/40 tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5 fill-white shrink-0" />
              <span>Ưu đãi đặt trước</span>
            </div>

            <div className="bg-white/95 backdrop-blur-md text-neutral-900 text-xs font-bold px-3 py-1.5 rounded-xl shadow-2xs border border-white flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-rose-500 fill-rose-500 shrink-0" />
              <span className="font-extrabold text-neutral-900">Giới hạn 500 đơn</span>
            </div>
          </div>

          {/* Center: Flip Countdown Timer */}
          <div className="relative z-10 flex flex-col my-auto py-2">
            <div className="flex items-center justify-between mb-3 px-1">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-700" />
                <span className="text-sm sm:text-base font-extrabold text-neutral-900 tracking-tight">
                  Thời gian mở bán
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500 text-white animate-pulse">
                  ĐANG DIỄN RA
                </span>
              </div>
            </div>

            {/* Flip Boxes */}
            <div className="flex items-center justify-center gap-2.5 sm:gap-3.5 w-full">
              {/* Minutes Box */}
              <div className="flex-1 bg-white/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl py-5 sm:py-8 px-2 sm:px-4 flex flex-col items-center justify-center shadow-lg border border-white relative overflow-hidden group">
                <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-amber-400 to-amber-500" />
                <span className="slide17-timer-num text-4xl sm:text-6xl lg:text-7xl font-black text-neutral-900 font-mono tracking-tighter leading-none">
                  {formattedMinutes}
                </span>
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-neutral-500 mt-2 font-mono">
                  Phút
                </span>
              </div>

              {/* Colon Separator */}
              <div className="flex flex-col gap-2 pb-4">
                <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-neutral-800" />
                <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-neutral-800" />
              </div>

              {/* Seconds Box */}
              <div className="flex-1 bg-white/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl py-5 sm:py-8 px-2 sm:px-4 flex flex-col items-center justify-center shadow-lg border border-white relative overflow-hidden group">
                <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-amber-400 to-amber-500" />
                <span className="slide17-timer-num text-4xl sm:text-6xl lg:text-7xl font-black text-neutral-900 font-mono tracking-tighter leading-none">
                  {formattedSeconds}
                </span>
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-neutral-500 mt-2 font-mono">
                  Giây
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Note */}
          <div className="relative z-10 w-full flex items-center justify-center gap-1.5 bg-white/80 backdrop-blur-xs py-2 px-3 rounded-xl border border-white/80 text-[11px] sm:text-xs font-semibold text-neutral-700 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
            <span>Ưu đãi áp dụng duy nhất cho các đơn đặt hàng đợt 1</span>
          </div>
        </motion.div>

        {/* CỘT 2 (Ở CHÍNH GIỮA): TRẠM QUÉT QR CODE SIÊU RÕ RÀNG — TRUNG TÂM SÂN KHẤU MÀN LED 3X1 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, delay: 0.15 }}
          className={`slide17-card slide17-qr-card relative bg-gradient-to-br from-white via-[#f0f6fa] to-[#dbe8f4] border-2 border-amber-400/90 rounded-[28px] sm:rounded-[34px] flex flex-col items-center justify-between shadow-[0_20px_48px_-10px_rgba(245,158,11,0.22)] overflow-hidden ${
            isLed3x1
              ? 'p-4 sm:p-5 lg:p-6 min-h-[380px] lg:min-h-[440px] ring-2 ring-amber-400/40'
              : 'p-5 sm:p-7 min-h-[420px] sm:min-h-[480px] ring-2 ring-amber-400/30'
          }`}
        >
          {/* Ambient Amber Core Glow */}
          <div className="absolute -top-16 inset-x-0 mx-auto w-64 h-64 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />

          {/* Top Banner */}
          <div className="relative z-10 w-full flex items-center justify-between">
            <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-white text-xs sm:text-sm font-black px-4 py-1.5 sm:py-2 rounded-full shadow-md flex items-center gap-2 uppercase tracking-wide border border-amber-300/40">
              <QrCode className="w-4 h-4 text-white shrink-0" />
              <span>Quét mã đặt hàng ngay</span>
            </div>

            <div className="flex items-center gap-1.5 bg-emerald-500/15 border border-emerald-500/40 px-3 py-1 rounded-full text-emerald-800 text-[11px] font-extrabold shadow-2xs">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Cổng mở trực tiếp</span>
            </div>
          </div>

          {/* HERO EXTRA-LARGE QR CODE CONTAINER: CỰC KỲ RÕ RÀNG Ở TRUNG TÂM SÂN KHẤU */}
          <div className="relative z-10 my-auto flex flex-col items-center justify-center w-full">
            <div
              className={`slide17-qr-box relative bg-white rounded-3xl p-3.5 sm:p-4.5 lg:p-5 flex flex-col items-center justify-center shadow-2xl border-2 border-white group transition-transform ${
                isLed3x1
                  ? 'w-[250px] sm:w-[280px] lg:w-[320px] xl:w-[350px] h-[250px] sm:h-[280px] lg:h-[320px] xl:h-[350px]'
                  : 'w-64 sm:w-72 lg:w-80 h-64 sm:h-72 lg:h-80'
              }`}
            >
              {/* Corner Laser Scan Accent Brackets (Vàng hổ phách định vị siêu chuẩn) */}
              <div className="absolute top-2.5 left-2.5 w-6 h-6 border-t-4 border-l-4 border-amber-500 rounded-tl-xl pointer-events-none" />
              <div className="absolute top-2.5 right-2.5 w-6 h-6 border-t-4 border-r-4 border-amber-500 rounded-tr-xl pointer-events-none" />
              <div className="absolute bottom-2.5 left-2.5 w-6 h-6 border-b-4 border-l-4 border-amber-500 rounded-bl-xl pointer-events-none" />
              <div className="absolute bottom-2.5 right-2.5 w-6 h-6 border-b-4 border-r-4 border-amber-500 rounded-br-xl pointer-events-none" />

              {/* High-Tech Animated Scanning Laser Beam */}
              <motion.div
                animate={{ y: [-100, 100, -100] }}
                transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut' }}
                className="absolute left-4 right-4 h-[2.5px] bg-gradient-to-r from-transparent via-amber-500 to-transparent shadow-[0_0_12px_rgba(245,158,11,0.9)] pointer-events-none z-10"
              />

              {/* Crystal Clear High Resolution / Vector QR Code */}
              <img
                src="https://base.vn/wp-content/uploads/2026/09/exported_qrcode_image_600.png"
                alt="QR Code Đặt hàng Amber Note"
                className="w-full h-full object-contain filter contrast-110 drop-shadow-xs"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  // Fallback to local vector/image QR assets
                  e.currentTarget.src = '/qr-base.svg';
                }}
              />
            </div>
          </div>

          {/* Action Guidance & Direct Domain */}
          <div className="relative z-10 w-full flex items-center justify-center gap-2 bg-white/95 backdrop-blur-xs py-2 px-3 sm:px-4 rounded-xl border border-white text-xs sm:text-sm font-extrabold text-neutral-800 shadow-2xs">
            <Smartphone className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Mở camera điện thoại quét để giữ suất ưu đãi</span>
          </div>
        </motion.div>

        {/* CỘT 3 (BÊN PHẢI): BẢNG GIÁ ƯU ĐÃI & GÓI SỞ HỮU TOÀN DIỆN */}
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, delay: 0.2 }}
          className={`slide17-card relative bg-gradient-to-br from-[#e6eff7] via-[#d7e4f0] to-[#c7d8e8] border-2 border-white/80 rounded-[28px] sm:rounded-[34px] flex flex-col justify-between shadow-[0_16px_36px_-12px_rgba(15,23,42,0.12)] overflow-hidden ${
            isLed3x1
              ? 'p-4 sm:p-5 lg:p-6 min-h-[380px] lg:min-h-[440px]'
              : 'p-5 sm:p-7 min-h-[420px] sm:min-h-[480px]'
          }`}
        >
          {/* Subtle Glow */}
          <div className="absolute -top-16 -right-16 w-56 h-56 bg-sky-300/25 rounded-full blur-3xl pointer-events-none" />

          {/* Top Badge & Listed Price */}
          <div className="relative z-10 flex items-center justify-between gap-2 w-full">
            <div className="bg-neutral-900 text-white text-xs sm:text-sm font-black px-3.5 py-1.5 sm:py-2 rounded-full shadow-sm flex items-center gap-1.5 uppercase tracking-wide">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Gói sở hữu toàn diện</span>
            </div>

            <div className="relative text-neutral-500 text-xs sm:text-sm font-bold px-2">
              <span>3.600.000 đ</span>
              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[1.5px] bg-rose-500 w-full opacity-90" />
            </div>
          </div>

          {/* Center: Pre-order Price Banner */}
          <div className="relative z-10 flex flex-col items-center my-auto py-2">
            <div className="text-neutral-600 text-xs sm:text-sm font-bold mb-1 uppercase tracking-wider">
              Giá đặt trước hôm nay
            </div>
            <div className="flex items-center gap-2 sm:gap-3 bg-white/95 backdrop-blur-sm px-4 sm:px-6 py-3 rounded-2xl border border-white shadow-md w-full justify-center">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-amber-700 tracking-tight">
                1.686.000 <span className="text-lg sm:text-xl font-bold">VNĐ</span>
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-rose-500 to-rose-600 text-white text-xs font-black uppercase shadow-xs">
                -53%
              </span>
            </div>

            {/* Feature Checklist */}
            <div className="w-full mt-3 sm:mt-4 space-y-1.5 sm:space-y-2 text-left">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-neutral-800 bg-white/70 backdrop-blur-2xs px-3 py-1.5 rounded-xl border border-white/60">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Trọn bộ thiết bị Amber Note cao cấp</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-neutral-800 bg-white/70 backdrop-blur-2xs px-3 py-1.5 rounded-xl border border-white/60">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>1 năm sử dụng giải pháp Amber AI Platform</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-neutral-800 bg-white/70 backdrop-blur-2xs px-3 py-1.5 rounded-xl border border-white/60">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Đồng bộ tự động dữ liệu sang Base.vn</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-neutral-800 bg-white/70 backdrop-blur-2xs px-3 py-1.5 rounded-xl border border-white/60">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Bảo hành chính hãng 1 đổi 1 trong 12 tháng</span>
              </div>
            </div>
          </div>

          {/* Bottom Note */}
          <div className="relative z-10 w-full flex items-center justify-center gap-1.5 bg-white/80 backdrop-blur-xs py-2 px-3 rounded-xl border border-white/80 text-[11px] sm:text-xs font-semibold text-neutral-700 shadow-2xs">
            <Zap className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>Tiết kiệm trực tiếp 1.914.000 VNĐ cho doanh nghiệp</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
