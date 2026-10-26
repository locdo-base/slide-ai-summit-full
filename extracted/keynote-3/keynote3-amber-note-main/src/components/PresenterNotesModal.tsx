import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, FileText, Sparkles } from 'lucide-react';
import { SlideData } from '../types';

interface PresenterNotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSlide: SlideData;
}

export const PresenterNotesModal: React.FC<PresenterNotesModalProps> = ({
  isOpen,
  onClose,
  currentSlide,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="fixed bottom-20 right-6 z-40 w-96 bg-white/95 backdrop-blur-md rounded-2xl p-5 shadow-2xl border border-neutral-200 text-neutral-900"
      >
        <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-neutral-600" />
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-700">
              Ghi chú thuyết trình · Slide #{currentSlide.id}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md hover:bg-neutral-100 text-neutral-400 hover:text-neutral-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-3 text-sm text-neutral-700 leading-relaxed font-light">
          {currentSlide.notes || 'Không có ghi chú bổ sung cho slide này.'}
        </div>

        <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-400">
          <span>Phím tắt: <kbd className="px-1 bg-neutral-100 rounded text-neutral-600 font-mono">N</kbd></span>
          <span className="text-blue-600 font-medium">{currentSlide.category}</span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
