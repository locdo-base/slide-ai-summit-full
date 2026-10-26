import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check } from 'lucide-react';
import { SlideData } from '../types';

interface SlideGridModalProps {
  isOpen: boolean;
  onClose: () => void;
  slides: SlideData[];
  currentSlideId: number;
  onSelectSlide: (id: number) => void;
}

export const SlideGridModal: React.FC<SlideGridModalProps> = ({
  isOpen,
  onClose,
  slides,
  currentSlideId,
  onSelectSlide,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-neutral-900/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-5xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-neutral-200 flex flex-col max-h-[85vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
            <div>
              <h3 className="text-xl font-bold text-neutral-900">Danh mục {slides.length} Slide trình chiếu</h3>
              <p className="text-xs text-neutral-500">Nhấp vào bất kỳ slide nào để nhảy trực tiếp tới nội dung đó</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-neutral-700 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Grid Content */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 mt-6 overflow-y-auto pr-1 no-scrollbar flex-1">
            {slides.map((s) => {
              const isCurrent = s.id === currentSlideId;
              return (
                <button
                  key={s.id}
                  onClick={() => {
                    onSelectSlide(s.id);
                    onClose();
                  }}
                  className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between transition-all group relative cursor-pointer min-h-[110px] ${
                    isCurrent
                      ? 'border-neutral-900 bg-neutral-900 text-white shadow-md ring-2 ring-neutral-900/20'
                      : 'border-neutral-200 bg-neutral-50 hover:bg-white hover:border-neutral-300 hover:shadow-xs text-neutral-800'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-2">
                    <span
                      className={`text-[11px] font-mono font-semibold px-2 py-0.5 rounded ${
                        isCurrent ? 'bg-neutral-800 text-neutral-200' : 'bg-neutral-200/70 text-neutral-600'
                      }`}
                    >
                      #{String(s.id).padStart(2, '0')}
                    </span>
                    {isCurrent && <Check className="w-4 h-4 text-emerald-400" />}
                  </div>

                  <div>
                    <h4
                      className={`text-xs font-bold line-clamp-2 leading-tight ${
                        isCurrent ? 'text-white' : 'text-neutral-900 group-hover:text-blue-600'
                      }`}
                    >
                      {s.title}
                    </h4>
                    {s.category && (
                      <span
                        className={`text-[10px] uppercase font-mono mt-1 block tracking-wider ${
                          isCurrent ? 'text-neutral-400' : 'text-neutral-400'
                        }`}
                      >
                        {s.category}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Footer bar */}
          <div className="mt-4 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-400">
            <span>Nhấn <kbd className="px-1.5 py-0.5 bg-neutral-100 rounded text-neutral-700 font-mono">Esc</kbd> để đóng</span>
            <span>Tổng cộng: 17 slide</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
