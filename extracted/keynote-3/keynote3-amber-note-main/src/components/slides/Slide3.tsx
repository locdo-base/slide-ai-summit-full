import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Sparkles, RotateCcw } from 'lucide-react';

interface Slide3Props {
  onNextSlide?: () => void;
  isLed3x1?: boolean;
}

export const Slide3: React.FC<Slide3Props> = ({ onNextSlide, isLed3x1 = false }) => {
  // Stage 1: CONVERSATION -> RECORDING (GHI ÂM)
  // Stage 2: Strike RECORDING -> REMEMBERING (GHI NHỚ)
  // Stage 3: CONVERSATION BECOMES DATA (HỘI THOẠI BIẾN THÀNH DỮ LIỆU)
  const [stage, setStage] = useState<1 | 2 | 3>(1);

  // Keyboard navigation: press Right arrow / Space / Enter to advance stage 1 -> 2 -> 3 -> next slide
  useEffect(() => {
    const handleCaptureKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') {
        if (stage < 3) {
          e.preventDefault();
          e.stopPropagation();
          setStage((prev) => (prev === 1 ? 2 : 3));
        }
        // If stage === 3, event propagates to App.tsx to go to next slide!
      } else if (e.key === 'ArrowLeft' || e.key === 'Backspace') {
        if (stage > 1) {
          e.preventDefault();
          e.stopPropagation();
          setStage((prev) => (prev === 3 ? 2 : 1));
        }
        // If stage === 1, event propagates to App.tsx to go to previous slide!
      }
    };

    window.addEventListener('keydown', handleCaptureKeyDown, { capture: true });
    return () => {
      window.removeEventListener('keydown', handleCaptureKeyDown, { capture: true });
    };
  }, [stage]);

  const handleNextStage = () => {
    if (stage === 1) {
      setStage(2);
    } else if (stage === 2) {
      setStage(3);
    } else if (stage === 3 && onNextSlide) {
      onNextSlide();
    }
  };

  const handleReset = () => {
    setStage(1);
  };

  return (
    <div className="flex flex-col items-center justify-center max-w-7xl mx-auto px-2 sm:px-4 w-full text-center relative my-auto select-none">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4 sm:mb-6"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-3 border border-blue-100">
          <Sparkles className="w-4 h-4 text-blue-600" />
          Bước ngoặt công nghệ
        </div>
        <h2 className="text-3xl sm:text-5xl lg:text-7xl font-semibold tracking-tight text-neutral-900">
          TRÍ TUỆ NHÂN TẠO THAY ĐỔI ĐIỀU NÀY
        </h2>
      </motion.div>

      {/* Interactive Animation Canvas / Card */}
      <div
        onClick={handleNextStage}
        className={`min-h-[200px] sm:min-h-[240px] flex items-center justify-center relative cursor-pointer group rounded-3xl transition-all border border-transparent hover:border-neutral-200/80 hover:bg-neutral-50/50 ${
          isLed3x1 ? 'slide3-canvas w-auto max-w-none p-3 sm:p-5' : 'w-full max-w-4xl p-4 sm:p-8'
        }`}
      >
        <AnimatePresence mode="wait">
          {stage === 1 && (
            <motion.div
              key="stage-1"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center gap-4"
            >
              <div className="flex items-center justify-center gap-4 sm:gap-8 text-3xl sm:text-5xl lg:text-6xl font-medium text-neutral-800">
                <span className="tracking-tight font-semibold">HỘI THOẠI</span>
                <ArrowRight className="w-7 h-7 sm:w-11 sm:h-11 text-neutral-400 stroke-[2.5]" />
                <span className="text-neutral-500 tracking-normal bg-neutral-100 px-5 py-2 rounded-2xl border border-neutral-200 shadow-xs">
                  GHI ÂM
                </span>
              </div>
              <span className="text-xs sm:text-sm text-neutral-400 font-normal">
                Cách làm truyền thống: Chỉ lưu giữ âm thanh thô, khó tra cứu và xử lý
              </span>
            </motion.div>
          )}

          {stage === 2 && (
            <motion.div
              key="stage-2"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, filter: 'blur(6px)' }}
              transition={{ duration: 0.45 }}
              className="flex flex-col items-center gap-4 sm:gap-6"
            >
              {/* Previous recording crossed out */}
              <div className="flex items-center justify-center gap-3 sm:gap-5 text-xl sm:text-3xl text-neutral-400 line-through decoration-rose-500 decoration-3 opacity-60">
                <span>HỘI THOẠI</span>
                <ArrowRight className="w-5 h-5 text-neutral-300" />
                <span>GHI ÂM</span>
              </div>

              {/* Transformed into GHI NHỚ */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="flex items-center justify-center gap-4 sm:gap-8 text-3xl sm:text-5xl lg:text-6xl font-bold text-neutral-900"
              >
                <span className="tracking-tight">HỘI THOẠI</span>
                <ArrowRight className="w-7 h-7 sm:w-11 sm:h-11 text-blue-600 stroke-[2.5]" />
                <span className="text-blue-600 bg-blue-50 px-5 py-2 rounded-2xl border border-blue-200 shadow-xs">
                  GHI NHỚ
                </span>
              </motion.div>
              <span className="text-xs sm:text-sm text-blue-600/80 font-medium">
                AI thấu hiểu ngữ cảnh: Ghi nhớ nội dung trọng tâm và thông tin then chốt
              </span>
            </motion.div>
          )}

          {stage === 3 && (
            <motion.div
              key="stage-3"
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className={`flex flex-col items-center justify-center ${
                isLed3x1 ? 'slide3-box-container w-auto max-w-none space-y-3' : 'space-y-4 w-full'
              }`}
            >
              <div
                className={`slide3-black-box rounded-2xl sm:rounded-3xl bg-neutral-900 text-white shadow-2xl border border-neutral-800 ${
                  isLed3x1
                    ? 'w-fit max-w-fit px-8 py-4 sm:px-12 sm:py-5 mx-auto'
                    : 'p-7 sm:p-10'
                }`}
              >
                <span className="text-xs sm:text-sm uppercase tracking-[0.25em] text-amber-400 block mb-1.5 font-semibold text-center">
                  Bước tiến hóa tối thượng
                </span>
                <h3
                  className={`font-bold tracking-tight text-white leading-tight text-center ${
                    isLed3x1
                      ? 'text-2xl sm:text-4xl lg:text-5xl whitespace-nowrap'
                      : 'text-2xl sm:text-5xl lg:text-6xl'
                  }`}
                >
                  HỘI THOẠI BIẾN THÀNH DỮ LIỆU
                </h3>
              </div>
              <p
                className={`text-neutral-600 font-normal max-w-2xl mx-auto text-center ${
                  isLed3x1 ? 'text-xs sm:text-base' : 'text-sm sm:text-lg'
                }`}
              >
                Lời nói được cấu trúc hóa thành dữ liệu thông minh, đưa thẳng vào dòng chảy công việc doanh nghiệp.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Manual Step Navigation Tabs */}
      <div className="mt-5 sm:mt-7 flex items-center justify-center gap-2.5">
        <div className="inline-flex items-center p-1 rounded-full bg-neutral-100 border border-neutral-200 text-xs sm:text-sm shadow-xs">
          <button
            onClick={() => setStage(1)}
            className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full transition-all cursor-pointer ${
              stage === 1
                ? 'bg-white shadow-xs font-semibold text-neutral-900'
                : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
              stage === 1 ? 'bg-neutral-900 text-white' : 'bg-neutral-200 text-neutral-600'
            }`}>
              1
            </span>
            <span>Ghi âm</span>
          </button>

          <button
            onClick={() => setStage(2)}
            className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full transition-all cursor-pointer ${
              stage === 2
                ? 'bg-white shadow-xs font-semibold text-neutral-900'
                : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
              stage === 2 ? 'bg-blue-600 text-white' : 'bg-neutral-200 text-neutral-600'
            }`}>
              2
            </span>
            <span>Ghi nhớ</span>
          </button>

          <button
            onClick={() => setStage(3)}
            className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full transition-all cursor-pointer ${
              stage === 3
                ? 'bg-white shadow-xs font-semibold text-neutral-900'
                : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
              stage === 3 ? 'bg-amber-500 text-neutral-950' : 'bg-neutral-200 text-neutral-600'
            }`}>
              3
            </span>
            <span>Biến thành Dữ liệu</span>
          </button>
        </div>

        <button
          onClick={handleReset}
          title="Xem lại từ bước 1"
          className="p-2 rounded-full border border-neutral-200 hover:bg-neutral-100 text-neutral-600 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
