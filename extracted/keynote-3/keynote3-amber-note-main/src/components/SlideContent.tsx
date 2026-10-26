import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Slide1 } from './slides/Slide1';
import { Slide2 } from './slides/Slide2';
import { Slide3 } from './slides/Slide3';
import { Slide4 } from './slides/Slide4';
import { Slide5 } from './slides/Slide5';
import { Slide6 } from './slides/Slide6';
import { Slide7 } from './slides/Slide7';
import { Slide8 } from './slides/Slide8';
import { Slide9 } from './slides/Slide9';
import { Slide10 } from './slides/Slide10';
import { Slide11 } from './slides/Slide11';
import { Slide11Demo } from './slides/Slide11Demo';
import { Slide12Demo } from './slides/Slide12Demo';
import { Slide12 } from './slides/Slide12';
import { Slide13Demo } from './slides/Slide13Demo';
import { Slide13 } from './slides/Slide13';
import { SlideScale1000 } from './slides/SlideScale1000';
import { Slide14 } from './slides/Slide14';
import { Slide15 } from './slides/Slide15';
import { Slide16 } from './slides/Slide16';
import { Slide17 } from './slides/Slide17';
import { ScreenRatio } from '../types';

interface SlideContentProps {
  currentSlideId: number;
  direction: number; // 1 for forward, -1 for backward
  onNextSlide: () => void;
  screenRatio?: ScreenRatio;
}

export const SlideContent: React.FC<SlideContentProps> = ({
  currentSlideId,
  direction,
  onNextSlide,
  screenRatio = 'default',
}) => {
  const isLed3x1 = screenRatio === '9x3' || screenRatio === '3x1';

  const renderSlide = () => {
    switch (currentSlideId) {
      case 1:
        return <Slide1 />;
      case 2:
        return <Slide2 />;
      case 3:
        return <Slide3 onNextSlide={onNextSlide} isLed3x1={isLed3x1} />;
      case 4:
        return <Slide4 isLed3x1={isLed3x1} />;
      case 5:
        return <Slide5 />;
      case 6:
        return <Slide6 />;
      case 7:
        return <Slide7 />;
      case 8:
        return <Slide8 />;
      case 9:
        return <Slide9 onNextSlide={onNextSlide} />;
      case 10:
        return <Slide11 />;
      case 11:
        return <Slide11Demo isLed3x1={isLed3x1} />;
      case 12:
        return <Slide10 />;
      case 13:
        return <Slide12 />;
      case 14:
        return <Slide12Demo isLed3x1={isLed3x1} />;
      case 15:
        return <Slide13 />;
      case 16:
        return <SlideScale1000 />;
      case 17:
        return <Slide13Demo isLed3x1={isLed3x1} />;
      case 18:
        return <Slide15 />;
      case 19:
        return <Slide14 />;
      case 20:
        return <Slide16 />;
      case 21:
        return <Slide17 isLed3x1={isLed3x1} />;
      default:
        return <Slide1 />;
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 40 : -40,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.35, ease: 'easeOut' },
        scale: { duration: 0.4, ease: 'easeOut' },
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -40 : 40,
      opacity: 0,
      scale: 0.98,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.25, ease: 'easeIn' },
      },
    }),
  };

  return (
    <main
      className={`flex-1 flex items-center justify-center w-full mx-auto overflow-hidden relative box-border ${
        screenRatio === '9x3' || screenRatio === '3x1'
          ? 'pt-1 pb-2 sm:pt-2 sm:pb-3 lg:pt-2.5 lg:pb-4 px-3 sm:px-6 md:px-10 lg:px-14 max-w-none w-full h-full min-h-0'
          : screenRatio === '9x4.5'
          ? 'pt-3 pb-4 sm:pt-4 sm:pb-6 lg:pt-5 lg:pb-7 px-6 sm:px-10 md:px-14 lg:px-20 max-w-none w-full h-full min-h-0'
          : 'p-3 sm:p-5 md:p-6 max-w-[1700px] w-full h-full min-h-0'
      }`}
    >
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentSlideId}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="w-full h-full flex flex-col items-center justify-center"
        >
          <div
            className={`w-full h-full flex flex-col items-center justify-center ${
              screenRatio === '9x4.5'
                ? 'led-mode-9x45'
                : screenRatio === '9x3' || screenRatio === '3x1'
                ? 'led-mode-9x3 led-mode-3x1'
                : ''
            }`}
          >
            {renderSlide()}
          </div>
        </motion.div>
      </AnimatePresence>
    </main>
  );
};
