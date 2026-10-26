import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AmberDeviceMockup } from '../AmberDeviceMockup';
import { Mic, Volume2, Waves, Compass, Sparkles, CheckCircle2 } from 'lucide-react';

type ViewMode = 'spin360' | 'zoomTop' | 'zoomBottom' | 'allMics';

export const Slide6: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('spin360');

  // Smooth continuous tour across 360 spin -> zoom top (2 mics) -> zoom bottom (2 mics) -> all mics overview
  useEffect(() => {
    const modes: ViewMode[] = ['spin360', 'zoomTop', 'zoomBottom', 'allMics'];
    const timer = setInterval(() => {
      setViewMode((prev) => {
        const currentIndex = modes.indexOf(prev);
        return modes[(currentIndex + 1) % modes.length];
      });
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const acousticFeatures = [
    {
      icon: Mic,
      title: 'Mảng mic đa hướng 360°',
      desc: 'Bắt trọn giọng nói tự nhiên từ mọi góc bàn họp.',
    },
    {
      icon: Waves,
      title: 'Công nghệ khử ồn',
      desc: 'Triệt tiêu tiếng gõ phím, tiếng quạt máy lạnh và tiếng va chạm cốc chén.',
    },
    {
      icon: Compass,
      title: 'Nhận diện phân tách người nói',
      desc: 'Tự động gắn thẻ speaker (Diarization) chính xác cho từng thành viên tham gia.',
    },
    {
      icon: Volume2,
      title: 'Thiết kế âm học chống dội',
      desc: 'Hốc tiêu âm laser bên dưới thân máy giảm thiểu biến dạng âm trường trong phòng kín.',
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center max-w-7xl mx-auto px-1 sm:px-3 w-full my-auto select-none py-1 sm:py-2">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-3 sm:mb-5"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-900 text-xs sm:text-sm font-bold tracking-widest uppercase mb-1.5 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>Kiến trúc Phần cứng Âm học</span>
        </div>
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-neutral-900 uppercase">
          MẢNG 4 MICRO ĐA HƯỚNG 360°
        </h2>
        <p className="text-base sm:text-xl text-neutral-500 font-normal mt-1 max-w-2xl mx-auto">
          Thu âm toàn cảnh 2 đầu thiết bị • Bắt trọn từng giọng nói trong mọi không gian phòng họp
        </p>
      </motion.div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-center w-full">
        {/* Device Feature Interactive Showcase Box (Left 5.5 cols) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-6 flex flex-col items-center justify-between p-4 sm:p-6 rounded-[28px] sm:rounded-[32px] bg-gradient-to-b from-[#f3f7fb] via-[#e7eff7] to-[#d8e5f2] border-2 border-white/80 shadow-[0_16px_36px_-10px_rgba(15,23,42,0.12)] relative overflow-hidden min-h-[460px] sm:min-h-[500px]"
        >
          {/* Device Showcase Canvas with 3D Transform & Zoom Controls */}
          <div className="relative w-full flex-1 flex items-center justify-center my-auto min-h-[300px] sm:min-h-[340px] perspective-[1200px]">
            {/* Ambient Acoustic Radar Waves (360 Degree Rings) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div
                animate={{
                  scale: viewMode === 'spin360' ? [1, 1.4, 1] : 1,
                  opacity: [0.15, 0.4, 0.15],
                }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                className="w-56 h-56 rounded-full border-2 border-dashed border-amber-500/30"
              />
              <motion.div
                animate={{
                  scale: viewMode === 'spin360' ? [1, 1.6, 1] : 1,
                  opacity: [0.1, 0.25, 0.1],
                }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut', delay: 0.5 }}
                className="w-80 h-80 rounded-full border border-neutral-400/30"
              />
            </div>

            {/* Dynamic Animated Device Container */}
            <motion.div
              key={viewMode}
              initial={
                viewMode === 'spin360'
                  ? { scale: 0.85, y: 0, rotateY: 0 }
                  : viewMode === 'zoomTop'
                  ? { scale: 1.35, y: 60, rotateY: 0 }
                  : viewMode === 'zoomBottom'
                  ? { scale: 1.35, y: -60, rotateY: 0 }
                  : { scale: 0.9, y: 0, rotateY: 0 }
              }
              animate={
                viewMode === 'spin360'
                  ? {
                      scale: [0.82, 0.88, 0.82],
                      y: 0,
                      rotateY: [0, 180, 360],
                    }
                  : viewMode === 'zoomTop'
                  ? { scale: 1.35, y: 60, rotateY: 0 }
                  : viewMode === 'zoomBottom'
                  ? { scale: 1.35, y: -60, rotateY: 0 }
                  : { scale: 0.9, y: 0, rotateY: 0 }
              }
              transition={
                viewMode === 'spin360'
                  ? {
                      rotateY: { repeat: Infinity, duration: 8, ease: 'linear' },
                      scale: { repeat: Infinity, duration: 4, ease: 'easeInOut' },
                    }
                  : { duration: 0.75, ease: [0.16, 1, 0.3, 1] }
              }
              className="relative flex items-center justify-center transition-all cursor-grab active:cursor-grabbing"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* The Realistic Amber Device */}
              <div className="relative">
                <AmberDeviceMockup color="silver" size="md" isRecording={true} showAudioWave={false} />

                {/* TOP EDGE MICROPHONES (2 MIC HOLES) */}
                <div className="absolute -top-2.5 inset-x-0 flex justify-between px-5 sm:px-6 pointer-events-none z-30">
                  {/* Top Left Mic */}
                  <div className="relative flex flex-col items-center">
                    <motion.div
                      animate={{ scale: [1, 1.5, 1], opacity: [0.85, 1, 0.85] }}
                      transition={{ repeat: Infinity, duration: 1.6 }}
                      className="w-3.5 h-3.5 rounded-full bg-amber-500/30 border border-amber-500 flex items-center justify-center shadow-xs"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-600 shadow-xs" />
                    </motion.div>
                    {/* Pulsing Acoustic Rings */}
                    <motion.div
                      animate={{ scale: [0.8, 2.2], opacity: [0.8, 0] }}
                      transition={{ repeat: Infinity, duration: 1.8 }}
                      className="absolute -inset-1 rounded-full border border-amber-500"
                    />
                  </div>

                  {/* Top Right Mic */}
                  <div className="relative flex flex-col items-center">
                    <motion.div
                      animate={{ scale: [1, 1.5, 1], opacity: [0.85, 1, 0.85] }}
                      transition={{ repeat: Infinity, duration: 1.6, delay: 0.2 }}
                      className="w-3.5 h-3.5 rounded-full bg-amber-500/30 border border-amber-500 flex items-center justify-center shadow-xs"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-600 shadow-xs" />
                    </motion.div>
                    {/* Pulsing Acoustic Rings */}
                    <motion.div
                      animate={{ scale: [0.8, 2.2], opacity: [0.8, 0] }}
                      transition={{ repeat: Infinity, duration: 1.8, delay: 0.2 }}
                      className="absolute -inset-1 rounded-full border border-amber-500"
                    />
                  </div>
                </div>

                {/* BOTTOM EDGE MICROPHONES (2 MIC HOLES) */}
                <div className="absolute -bottom-2.5 inset-x-0 flex justify-between px-5 sm:px-6 pointer-events-none z-30">
                  {/* Bottom Left Mic */}
                  <div className="relative flex flex-col items-center">
                    <motion.div
                      animate={{ scale: [1, 1.5, 1], opacity: [0.85, 1, 0.85] }}
                      transition={{ repeat: Infinity, duration: 1.6, delay: 0.4 }}
                      className="w-3.5 h-3.5 rounded-full bg-amber-500/30 border border-amber-500 flex items-center justify-center shadow-xs"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-600 shadow-xs" />
                    </motion.div>
                    {/* Pulsing Acoustic Rings */}
                    <motion.div
                      animate={{ scale: [0.8, 2.2], opacity: [0.8, 0] }}
                      transition={{ repeat: Infinity, duration: 1.8, delay: 0.4 }}
                      className="absolute -inset-1 rounded-full border border-amber-500"
                    />
                  </div>

                  {/* Bottom Right Mic */}
                  <div className="relative flex flex-col items-center">
                    <motion.div
                      animate={{ scale: [1, 1.5, 1], opacity: [0.85, 1, 0.85] }}
                      transition={{ repeat: Infinity, duration: 1.6, delay: 0.6 }}
                      className="w-3.5 h-3.5 rounded-full bg-amber-500/30 border border-amber-500 flex items-center justify-center shadow-xs"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-600 shadow-xs" />
                    </motion.div>
                    {/* Pulsing Acoustic Rings */}
                    <motion.div
                      animate={{ scale: [0.8, 2.2], opacity: [0.8, 0] }}
                      transition={{ repeat: Infinity, duration: 1.8, delay: 0.6 }}
                      className="absolute -inset-1 rounded-full border border-amber-500"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* CALLOUT OVERLAYS FOR ZOOM MODES */}
            <AnimatePresence>
              {viewMode === 'zoomTop' && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.35 }}
                  className="absolute top-2 inset-x-3 z-40 bg-neutral-900/90 backdrop-blur-md text-white p-3 sm:p-3.5 rounded-2xl border border-white/20 shadow-xl flex items-center gap-3"
                >
                  <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-400 flex items-center justify-center shrink-0">
                    <Mic className="w-4.5 h-4.5 text-amber-400" />
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black uppercase tracking-wider text-amber-400">Đầu trên thiết bị</span>
                      <span className="text-[10px] font-bold bg-amber-500/30 text-amber-200 px-2 py-0.5 rounded-full border border-amber-400/40">2 Micro Studio</span>
                    </div>
                    <p className="text-xs font-semibold text-neutral-200 mt-0.5">
                      Mic 1 & Mic 2: Định hướng thu trực diện người nói, lọc triệt để tiếng ồn nền.
                    </p>
                  </div>
                </motion.div>
              )}

              {viewMode === 'zoomBottom' && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.35 }}
                  className="absolute bottom-2 inset-x-3 z-40 bg-neutral-900/90 backdrop-blur-md text-white p-3 sm:p-3.5 rounded-2xl border border-white/20 shadow-xl flex items-center gap-3"
                >
                  <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-400 flex items-center justify-center shrink-0">
                    <Waves className="w-4.5 h-4.5 text-amber-400" />
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black uppercase tracking-wider text-amber-400">Đầu dưới thiết bị</span>
                      <span className="text-[10px] font-bold bg-amber-500/30 text-amber-200 px-2 py-0.5 rounded-full border border-amber-400/40">2 Micro Studio</span>
                    </div>
                    <p className="text-xs font-semibold text-neutral-200 mt-0.5">
                      Mic 3 & Mic 4: Bắt trường âm phản xạ từ bàn họp, tạo thuật toán triệt tiêu âm vang dội.
                    </p>
                  </div>
                </motion.div>
              )}

              {viewMode === 'allMics' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="absolute bottom-2 inset-x-3 z-40 bg-white/95 backdrop-blur-md text-neutral-900 p-2.5 sm:p-3 rounded-2xl border border-white shadow-lg flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs sm:text-sm font-extrabold">Tổng 4 Micro: 2 Đầu Trên + 2 Đầu Dưới</span>
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-bold bg-neutral-900 text-white px-2.5 py-1 rounded-full uppercase tracking-wider">
                    360° Beamforming
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom Caption Pill */}
          <div className="relative z-10 mt-2 text-center flex items-center justify-center gap-2 bg-white/80 backdrop-blur-xs px-4 py-1.5 rounded-full border border-white/90 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
            <span className="text-xs font-bold text-neutral-700 tracking-wide uppercase">
              VỎ NHÔM NGUYÊN KHỐI 30G • KHOANG ÂM HỌC LASER CHỐNG DỘI
            </span>
          </div>
        </motion.div>

        {/* Feature Specs List (Right 6 cols) */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-4.5">
          {acousticFeatures.map((f, index) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-neutral-200/80 bg-white/95 backdrop-blur-xs shadow-xs hover:border-neutral-300 hover:shadow-md transition-all flex flex-col justify-start text-left"
              >
                <div className="w-11 h-11 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-800 mb-4 border border-neutral-200/50">
                  <Icon className="w-5 h-5 stroke-[1.75]" />
                </div>
                <h4 className="font-bold text-neutral-900 text-base sm:text-lg mb-2 tracking-tight">
                  {f.title}
                </h4>
                <p className="text-xs sm:text-sm text-neutral-600 font-normal leading-relaxed">
                  {f.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
