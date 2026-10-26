import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Keyboard, ArrowRight, ArrowLeft, Maximize2, Grid, Play, FileText } from 'lucide-react';

interface ShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShortcutsModal: React.FC<ShortcutsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const shortcutGroups = [
    {
      group: 'Điều hướng trình chiếu',
      items: [
        { keys: ['→', 'Space', 'Enter'], desc: 'Chuyển sang slide kế tiếp' },
        { keys: ['←', 'Backspace'], desc: 'Quay lại slide trước' },
        { keys: ['PageDown'], desc: 'Tiến 1 slide' },
        { keys: ['PageUp'], desc: 'Lùi 1 slide' },
        { keys: ['Home'], desc: 'Về slide đầu tiên (Slide 1)' },
        { keys: ['End'], desc: 'Đến slide cuối cùng (Slide 17)' },
      ],
    },
    {
      group: 'Chế độ & Tiện ích',
      items: [
        { keys: ['C'], desc: 'Hiển thị thanh điều khiển ở dưới (tự ẩn sau 2s)' },
        { keys: ['M', 'L'], desc: 'Chuyển đổi tỷ lệ màn LED (9x4.5, 9x3, Mặc định)' },
        { keys: ['F'], desc: 'Bật / Tắt chế độ toàn màn hình (Fullscreen)' },
        { keys: ['G', 'T'], desc: 'Mở / Đóng bảng tổng quan tất cả slide (Grid)' },
        { keys: ['A', 'P'], desc: 'Bật / Tắt chế độ tự động chạy slide (Auto-play)' },
        { keys: ['N'], desc: 'Mở / Đóng ghi chú diễn giả (Speaker Notes)' },
        { keys: ['?'], desc: 'Hiển thị danh sách phím tắt này' },
        { keys: ['Esc'], desc: 'Đóng modal / Thoát chế độ toàn màn hình' },
      ],
    },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/40 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-neutral-200 relative text-neutral-900"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-neutral-100 text-neutral-800">
                <Keyboard className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-neutral-900">Phím tắt điều khiển Slide</h3>
                <p className="text-xs text-neutral-500">Thao tác nhanh bằng bàn phím để tăng trải nghiệm trình chiếu</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-neutral-700 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body List */}
          <div className="space-y-6 mt-6 max-h-[60vh] overflow-y-auto no-scrollbar">
            {shortcutGroups.map((group, idx) => (
              <div key={idx} className="space-y-3">
                <span className="text-xs uppercase tracking-widest font-semibold text-neutral-400">
                  {group.group}
                </span>
                <div className="space-y-2">
                  {group.items.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-neutral-50 border border-neutral-200/60"
                    >
                      <span className="text-xs sm:text-sm text-neutral-700">{item.desc}</span>
                      <div className="flex items-center gap-1.5">
                        {item.keys.map((k, kIdx) => (
                          <kbd
                            key={kIdx}
                            className="px-2 py-1 text-xs font-mono font-semibold text-neutral-800 bg-white border border-neutral-300 rounded-md shadow-2xs"
                          >
                            {k}
                          </kbd>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Footer note */}
          <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-400">
            <span>Mẹo: Nhấn phím <kbd className="px-1.5 py-0.5 bg-neutral-100 rounded text-neutral-700 font-mono">?</kbd> bất cứ lúc nào</span>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-full bg-neutral-900 text-white font-medium hover:bg-neutral-800 transition-colors"
            >
              Đã hiểu
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
