import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MessageSquare,
  Mic,
  Brain,
  Database,
  CheckCircle,
  ChevronRight,
  Sparkles,
  RotateCcw,
  Play,
  Check,
} from 'lucide-react';

export const Slide14: React.FC = () => {
  // Step state: 1 = Step 1, 2 = Step 1-2, 3 = Step 1-3, 4 = Step 1-4, 5 = Step 1-5, 6 = Step 1-5 + Câu chốt
  const [activeStep, setActiveStep] = useState<number>(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);

  const steps = [
    {
      step: '01',
      title: 'CON NGƯỜI TRÒ CHUYỆN',
      vn: 'Trao đổi trực tiếp',
      icon: MessageSquare,
      color: 'bg-blue-50 text-blue-600 border-blue-200',
      activeRing: 'ring-blue-500/30 border-blue-400 shadow-blue-100/50',
      badgeColor: 'bg-blue-600 text-white',
      desc: 'Trao đổi trực tiếp, thảo luận tự nhiên không rào cản.',
    },
    {
      step: '02',
      title: 'AMBER GHI NHẬN',
      vn: 'Thu lại cuộc trò chuyện',
      icon: Mic,
      color: 'bg-indigo-50 text-indigo-600 border-indigo-200',
      activeRing: 'ring-indigo-500/30 border-indigo-400 shadow-indigo-100/50',
      badgeColor: 'bg-indigo-600 text-white',
      desc: 'Ghi nhận những nội dung được trao đổi trong cuộc trò chuyện.',
    },
    {
      step: '03',
      title: 'AI THẤU HIỂU',
      vn: 'Hiểu nội dung & ngữ cảnh',
      icon: Brain,
      color: 'bg-purple-50 text-purple-600 border-purple-200',
      activeRing: 'ring-purple-500/30 border-purple-400 shadow-purple-100/50',
      badgeColor: 'bg-purple-600 text-white',
      desc: 'Nhận diện người nói, quyết định, đầu việc và thông tin quan trọng.',
    },
    {
      step: '04',
      title: 'BASE GHI NHỚ',
      vn: 'Biến thành ngữ cảnh và hành động',
      icon: Database,
      color: 'bg-sky-50 text-sky-600 border-sky-200',
      activeRing: 'ring-sky-500/30 border-sky-400 shadow-sky-100/50',
      badgeColor: 'bg-sky-600 text-white',
      desc: 'Thông tin được lưu vào công việc, khách hàng và tri thức trên Base.',
    },
    {
      step: '05',
      title: 'TỔ CHỨC THỰC THI',
      vn: 'Đưa ngữ cảnh vào công việc',
      icon: CheckCircle,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-200',
      activeRing: 'ring-emerald-500/30 border-emerald-400 shadow-emerald-100/50',
      badgeColor: 'bg-emerald-600 text-white',
      desc: 'Tạo đầu việc, giao người phụ trách và tiếp tục theo dõi thực hiện.',
    },
  ];

  // Auto-progress through steps 1 -> 2 -> 3 -> 4 -> 5 -> 6 (Câu chốt)
  useEffect(() => {
    if (!isAutoPlaying) return;

    if (activeStep < 6) {
      const timer = setTimeout(() => {
        setActiveStep((prev) => prev + 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [activeStep, isAutoPlaying]);

  const handleNextStep = () => {
    setIsAutoPlaying(false);
    setActiveStep((prev) => Math.min(prev + 1, 6));
  };

  const handleShowAll = () => {
    setIsAutoPlaying(false);
    setActiveStep(6);
  };

  const handleReplay = () => {
    setActiveStep(1);
    setIsAutoPlaying(true);
  };

  return (
    <div className="slide14-wrapper flex flex-col justify-center max-w-7xl mx-auto px-2 sm:px-4 w-full my-auto py-3 sm:py-5 lg:py-7">
      {/* Title & Interactive Controls Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-left sm:text-left w-full sm:w-auto"
        >
          <span className="text-xs sm:text-sm uppercase tracking-[0.25em] text-neutral-400 font-semibold block mb-1">
            Kiến trúc Toàn diện
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900">
            TỪ HỘI THOẠI ĐẾN HÀNH ĐỘNG
          </h2>
        </motion.div>

        {/* Presentation Step Indicator & Controls */}
        <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
          <button
            type="button"
            onClick={handleReplay}
            title="Chạy lại từ đầu"
            className="p-2 sm:px-3 sm:py-1.5 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-600 text-xs font-medium flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Phát lại</span>
          </button>

          {activeStep < 6 && (
            <button
              type="button"
              onClick={handleNextStep}
              className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1 shadow-xs transition-all cursor-pointer"
            >
              <span>Bước tiếp ({activeStep}/5)</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}

          {activeStep < 6 && (
            <button
              type="button"
              onClick={handleShowAll}
              className="px-3 py-1.5 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-700 text-xs font-medium transition-all cursor-pointer"
            >
              Xem tất cả
            </button>
          )}
        </div>
      </div>

      {/* 5 Step Pipeline Flow */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 relative mb-6">
        {steps.map((item, index) => {
          const Icon = item.icon;
          const stepNumber = index + 1;
          const isRevealed = activeStep >= stepNumber;
          const isCurrent = activeStep === stepNumber;

          return (
            <div key={index} className="relative">
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={
                  isRevealed
                    ? {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        transition: { duration: 0.45, ease: 'easeOut' },
                      }
                    : {
                        opacity: 0.25,
                        y: 10,
                        scale: 0.98,
                        transition: { duration: 0.3 },
                      }
                }
                onClick={() => {
                  setIsAutoPlaying(false);
                  setActiveStep(stepNumber);
                }}
                className={`h-full p-5 sm:p-6 rounded-2xl border transition-all flex flex-col justify-between cursor-pointer select-none ${
                  isRevealed
                    ? isCurrent
                      ? `bg-white border-2 ${item.activeRing} shadow-lg ring-4`
                      : 'bg-white border-neutral-200 shadow-sm hover:shadow-md hover:border-neutral-300'
                    : 'bg-neutral-50/60 border-dashed border-neutral-200'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`text-sm font-mono font-bold px-2 py-0.5 rounded-md ${
                        isRevealed
                          ? 'bg-neutral-100 text-neutral-800'
                          : 'bg-neutral-200/50 text-neutral-400'
                      }`}
                    >
                      {item.step}
                    </span>
                    <div
                      className={`p-2.5 rounded-xl border transition-all ${
                        isRevealed
                          ? `${item.color} shadow-2xs`
                          : 'bg-neutral-100 text-neutral-400 border-neutral-200'
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <h3
                    className={`font-bold text-lg sm:text-xl leading-tight transition-colors ${
                      isRevealed ? 'text-neutral-900' : 'text-neutral-400'
                    }`}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={`text-sm font-medium mt-0.5 transition-colors ${
                      isRevealed ? 'text-neutral-500' : 'text-neutral-400'
                    }`}
                  >
                    {item.vn}
                  </p>

                  <p
                    className={`text-sm font-light mt-3 leading-relaxed transition-colors ${
                      isRevealed ? 'text-neutral-600' : 'text-neutral-300'
                    }`}
                  >
                    {item.desc}
                  </p>
                </div>

                {/* Step status footer */}
                <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
                  {isRevealed ? (
                    <span className="text-emerald-600 font-medium flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Hoàn tất
                    </span>
                  ) : (
                    <span className="text-neutral-400 font-normal">Chờ kích hoạt...</span>
                  )}
                  {isCurrent && isRevealed && (
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                    </span>
                  )}
                </div>
              </motion.div>

              {/* Connecting arrow for larger screens */}
              {index < steps.length - 1 && (
                <div
                  className={`hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full border items-center justify-center transition-all ${
                    activeStep > stepNumber
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                      : 'bg-white text-neutral-300 border-neutral-200'
                  }`}
                >
                  <ChevronRight className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Concluding Statement (Câu chốt) - Revealed after Step 5 (activeStep >= 6) */}
      <AnimatePresence>
        {activeStep >= 6 ? (
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-center p-5 sm:p-6 rounded-2xl bg-neutral-900 text-white tracking-widest text-sm sm:text-base lg:text-lg uppercase font-semibold shadow-xl border border-neutral-800 relative overflow-hidden"
          >
            {/* Subtle highlight glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-amber-500/10 to-blue-600/10 pointer-events-none" />
            <div className="relative flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
              <Sparkles className="w-5 h-5 text-amber-400 shrink-0 animate-pulse" />
              <span>TỪ HỘI THOẠI THÀNH NGỮ CẢNH. TỪ NGỮ CẢNH THÀNH HÀNH ĐỘNG.</span>
              <Sparkles className="w-5 h-5 text-amber-400 shrink-0 animate-pulse" />
            </div>
          </motion.div>
        ) : (
          <div className="h-16 flex items-center justify-center text-xs text-neutral-400 font-mono tracking-wider">
            <span>Đang hoàn thiện chuỗi quy trình ({activeStep}/5)...</span>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

