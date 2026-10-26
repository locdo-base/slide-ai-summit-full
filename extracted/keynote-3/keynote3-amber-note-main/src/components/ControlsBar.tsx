import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronLeft,
  ChevronRight,
  Maximize,
  Minimize,
  Grid,
  Play,
  Pause,
  Keyboard,
  FileText,
  Clock,
  Tv,
  Check,
} from 'lucide-react';
import { ScreenRatio } from '../types';

interface ControlsBarProps {
  currentSlideId: number;
  totalSlides: number;
  onPrev: () => void;
  onNext: () => void;
  isAutoPlaying: boolean;
  onToggleAutoPlay: () => void;
  autoPlayInterval: number;
  onChangeAutoPlayInterval: (val: number) => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  onOpenGrid: () => void;
  onOpenShortcuts: () => void;
  onToggleNotes: () => void;
  isNotesOpen: boolean;
  isVisible?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  screenRatio: ScreenRatio;
  onChangeScreenRatio: (ratio: ScreenRatio) => void;
}

export const ControlsBar: React.FC<ControlsBarProps> = ({
  currentSlideId,
  totalSlides,
  onPrev,
  onNext,
  isAutoPlaying,
  onToggleAutoPlay,
  autoPlayInterval,
  onChangeAutoPlayInterval,
  isFullscreen,
  onToggleFullscreen,
  onOpenGrid,
  onOpenShortcuts,
  onToggleNotes,
  isNotesOpen,
  isVisible = true,
  onMouseEnter,
  onMouseLeave,
  screenRatio,
  onChangeScreenRatio,
}) => {
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [showLedMenu, setShowLedMenu] = useState(false);
  const ledMenuRef = useRef<HTMLDivElement>(null);

  // Close LED menu on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ledMenuRef.current && !ledMenuRef.current.contains(e.target as Node)) {
        setShowLedMenu(false);
      }
    };
    if (showLedMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showLedMenu]);

  const ledOptions: { id: ScreenRatio; label: string; ratio: string; desc: string }[] = [
    {
      id: 'default',
      label: 'Mặc định (Toàn màn hình)',
      ratio: '16:9 / Full',
      desc: 'Tự động tương thích màn hình laptop, TV & máy chiếu',
    },
    {
      id: '9x4.5',
      label: 'Màn LED 9 × 4.5m',
      ratio: 'Tỷ lệ 2:1',
      desc: 'Chuẩn màn hình LED sân khấu hội trường & sự kiện',
    },
    {
      id: '3x1',
      label: 'Màn LED 3 × 1m (2304 × 768)',
      ratio: 'Chuẩn 3:1',
      desc: 'Chuẩn phân giải LED sân khấu 2304 × 768 px, chống tràn & méo hình',
    },
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.96 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          className="fixed bottom-4 sm:bottom-6 inset-x-0 mx-auto w-fit z-30 px-3 py-2 rounded-2xl bg-white/90 backdrop-blur-md border border-neutral-200/90 shadow-xl flex items-center gap-2 sm:gap-3 select-none text-neutral-800"
        >
          {/* Slide Navigation Buttons */}
      <div className="flex items-center gap-1">
        <button
          onClick={onPrev}
          disabled={currentSlideId === 1}
          title="Slide trước (← hoặc Backspace)"
          className="p-2 rounded-xl hover:bg-neutral-100 disabled:opacity-30 disabled:pointer-events-none text-neutral-700 transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Counter Display & Click for Grid */}
        <button
          onClick={onOpenGrid}
          title="Bấm để xem danh sách toàn bộ slide (G)"
          className="px-2.5 py-1 rounded-lg hover:bg-neutral-100 font-mono text-xs sm:text-sm font-semibold tracking-wider text-neutral-800 transition-colors flex items-center gap-1 cursor-pointer"
        >
          <span className="text-neutral-900">{String(currentSlideId).padStart(2, '0')}</span>
          <span className="text-neutral-400">/</span>
          <span className="text-neutral-500">{String(totalSlides).padStart(2, '0')}</span>
        </button>

        <button
          onClick={onNext}
          disabled={currentSlideId === totalSlides}
          title="Slide kế tiếp (→ hoặc Space)"
          className="p-2 rounded-xl hover:bg-neutral-100 disabled:opacity-30 disabled:pointer-events-none text-neutral-700 transition-colors cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="w-[1px] h-6 bg-neutral-200" />

      {/* Grid Overview Button */}
      <button
        onClick={onOpenGrid}
        title="Tổng quan danh sách slide (Phím G hoặc T)"
        className="p-2 rounded-xl hover:bg-neutral-100 text-neutral-700 transition-colors cursor-pointer flex items-center gap-1.5"
      >
        <Grid className="w-4 h-4" />
        <span className="text-xs font-medium hidden md:inline">Lưới slide</span>
      </button>

      {/* Auto-play Button & Speed selector */}
      <div className="relative flex items-center">
        <button
          onClick={onToggleAutoPlay}
          title={isAutoPlaying ? 'Tạm dừng tự động chạy (Phím A hoặc P)' : 'Tự động phát trình chiếu (Phím A hoặc P)'}
          className={`p-2 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 ${
            isAutoPlaying ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'hover:bg-neutral-100 text-neutral-700'
          }`}
        >
          {isAutoPlaying ? <Pause className="w-4 h-4 text-indigo-600" /> : <Play className="w-4 h-4" />}
          <span className="text-xs hidden lg:inline">
            {isAutoPlaying ? `${autoPlayInterval / 1000}s` : 'Tự chạy'}
          </span>
        </button>

        {isAutoPlaying && (
          <button
            onClick={() => setShowSpeedMenu(!showSpeedMenu)}
            title="Điều chỉnh tốc độ tự động chạy"
            className="p-1 text-xs font-mono text-neutral-500 hover:text-neutral-800"
          >
            ⚙️
          </button>
        )}

        {/* Speed dropup */}
        {showSpeedMenu && (
          <div className="absolute bottom-12 left-0 p-2 bg-white rounded-xl shadow-lg border border-neutral-200 flex flex-col gap-1 text-xs z-40">
            <span className="text-[10px] uppercase font-bold text-neutral-400 px-2">Khoảng cách chuyển:</span>
            {[4000, 6000, 8000, 12000].map((t) => (
              <button
                key={t}
                onClick={() => {
                  onChangeAutoPlayInterval(t);
                  setShowSpeedMenu(false);
                }}
                className={`px-3 py-1.5 rounded-lg text-left transition-colors ${
                  autoPlayInterval === t ? 'bg-neutral-900 text-white font-medium' : 'hover:bg-neutral-100 text-neutral-700'
                }`}
              >
                {t / 1000} giây
              </button>
            ))}
          </div>
        )}
      </div>

      {/* LED Screen Aspect Ratio Selector Dropup */}
      <div className="relative flex items-center" ref={ledMenuRef}>
        <button
          onClick={() => {
            setShowLedMenu(!showLedMenu);
            setShowSpeedMenu(false);
          }}
          title="Chọn tỷ lệ màn hình LED (9x4.5, 3x1 chuẩn 2304x768 hoặc Mặc định)"
          className={`p-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
            screenRatio !== 'default'
              ? 'bg-amber-500 text-white font-semibold shadow-xs'
              : 'hover:bg-neutral-100 text-neutral-700'
          }`}
        >
          <Tv className="w-4 h-4" />
          <span className="text-xs font-medium hidden sm:inline whitespace-nowrap">
            {screenRatio === 'default'
              ? 'Màn LED'
              : screenRatio === '9x4.5'
              ? 'LED 9×4.5'
              : 'LED 3×1 (2304×768)'}
          </span>
        </button>

        {/* LED Options Dropup Menu */}
        <AnimatePresence>
          {showLedMenu && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute bottom-12 left-1/2 -translate-x-1/2 p-3 bg-white rounded-2xl shadow-2xl border border-neutral-200 w-72 sm:w-84 flex flex-col gap-1.5 z-40 text-neutral-900"
            >
              <div className="px-2 py-1 flex items-center justify-between border-b border-neutral-100 pb-2 mb-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-800 uppercase tracking-wider">
                  <Tv className="w-3.5 h-3.5 text-amber-600" />
                  <span>Chọn màn LED trình chiếu</span>
                </div>
                <span className="text-[10px] text-neutral-400 font-mono">Phím M</span>
              </div>

              {ledOptions.map((opt) => {
                const isSelected =
                  screenRatio === opt.id ||
                  (opt.id === '3x1' && screenRatio === '9x3');
                return (
                  <button
                    key={opt.id}
                    onClick={() => {
                      onChangeScreenRatio(opt.id);
                      setShowLedMenu(false);
                    }}
                    className={`p-2.5 rounded-xl text-left transition-all cursor-pointer flex items-start justify-between gap-2 ${
                      isSelected
                        ? 'bg-amber-50 border border-amber-200 text-neutral-900'
                        : 'hover:bg-neutral-50 text-neutral-700 border border-transparent'
                    }`}
                  >
                    <div className="flex flex-col gap-0.5">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-semibold ${isSelected ? 'text-amber-900' : 'text-neutral-900'}`}>
                          {opt.label}
                        </span>
                        <span
                          className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-semibold ${
                            isSelected ? 'bg-amber-200 text-amber-900' : 'bg-neutral-100 text-neutral-600'
                          }`}
                        >
                          {opt.ratio}
                        </span>
                      </div>
                      <span className="text-[11px] text-neutral-500 leading-tight">
                        {opt.desc}
                      </span>
                    </div>
                    {isSelected && (
                      <Check className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    )}
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Speaker Notes Button */}
      <button
        onClick={onToggleNotes}
        title="Ghi chú thuyết trình (Phím N)"
        className={`p-2 rounded-xl transition-colors cursor-pointer ${
          isNotesOpen ? 'bg-neutral-100 text-neutral-900' : 'hover:bg-neutral-100 text-neutral-700'
        }`}
      >
        <FileText className="w-4 h-4" />
      </button>

      {/* Fullscreen Button */}
      <button
        onClick={onToggleFullscreen}
        title="Toàn màn hình (Phím F)"
        className="p-2 rounded-xl hover:bg-neutral-100 text-neutral-700 transition-colors cursor-pointer"
      >
        {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
      </button>

      {/* Shortcuts Help Button */}
      <button
        onClick={onOpenShortcuts}
        title="Danh sách phím tắt điều khiển (Phím ?)"
        className="p-2 rounded-xl hover:bg-neutral-100 text-neutral-700 transition-colors cursor-pointer"
      >
        <Keyboard className="w-4 h-4" />
      </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
