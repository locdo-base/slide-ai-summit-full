import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface DemoMockupFrameProps {
  src: string;
  title: string;
  isLed3x1?: boolean;
}

export const DemoMockupFrame: React.FC<DemoMockupFrameProps> = ({
  src,
  title,
  isLed3x1 = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.85);

  // Kích thước chuẩn desktop của bản mockup demo tương tác (không bị xuống dòng hay tràn điện thoại)
  const BASE_WIDTH = 1440;
  const BASE_HEIGHT = 620;

  useEffect(() => {
    const updateScale = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const availW = rect.width;
      const availH = rect.height;

      if (availW <= 0 || availH <= 0) return;

      const scaleW = availW / BASE_WIDTH;
      const scaleH = availH / BASE_HEIGHT;
      let fit = Math.min(scaleW, scaleH);

      // Khi ở chế độ Màn LED 3x1, co lại để vừa vặn, thoáng đãng theo yêu cầu của người dùng
      if (isLed3x1) {
        fit = fit * 0.82;
      } else {
        fit = Math.min(fit * 0.94, 1.0);
      }

      setScale(Math.max(0.25, Math.min(fit, 1.25)));
    };

    updateScale();
    window.addEventListener('resize', updateScale);

    let observer: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && containerRef.current) {
      observer = new ResizeObserver(updateScale);
      observer.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener('resize', updateScale);
      if (observer) observer.disconnect();
    };
  }, [isLed3x1]);

  return (
    <div
      ref={containerRef}
      className="demo-mockup-container w-full h-full flex items-center justify-center overflow-hidden relative p-1 sm:p-2"
    >
      <motion.div
        initial={{ opacity: 0, scale: scale * 0.95 }}
        animate={{ opacity: 1, scale }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        style={{
          width: `${BASE_WIDTH}px`,
          height: `${BASE_HEIGHT}px`,
          transformOrigin: 'center center',
          flexShrink: 0,
        }}
        className="rounded-2xl border border-neutral-200/90 bg-white overflow-hidden shadow-2xl relative"
      >
        <iframe
          src={src}
          title={title}
          className="w-full h-full border-0 bg-neutral-50 block"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      </motion.div>
    </div>
  );
};
