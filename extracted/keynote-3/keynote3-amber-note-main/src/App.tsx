import React, { useState, useEffect, useCallback, useRef } from 'react';
import { SLIDES } from './data/slides';
import { SlideContent } from './components/SlideContent';
import { ControlsBar } from './components/ControlsBar';
import { ShortcutsModal } from './components/ShortcutsModal';
import { SlideGridModal } from './components/SlideGridModal';
import { PresenterNotesModal } from './components/PresenterNotesModal';
import { motion, AnimatePresence } from 'motion/react';
import { ScreenRatio } from './types';
import { SlidersHorizontal } from 'lucide-react';

export default function App() {
  const [currentSlideId, setCurrentSlideId] = useState<number>(1);
  const [direction, setDirection] = useState<number>(1);
  const [isGridOpen, setIsGridOpen] = useState<boolean>(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState<boolean>(false);
  const [isNotesOpen, setIsNotesOpen] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);
  const [autoPlayInterval, setAutoPlayInterval] = useState<number>(6000);
  const [isControlsVisible, setIsControlsVisible] = useState<boolean>(false);
  const [screenRatio, setScreenRatio] = useState<ScreenRatio>('default');

  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartXRef = useRef<number | null>(null);
  const hideControlsTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isHoveringControlsRef = useRef<boolean>(false);
  const isHoveringHeaderRef = useRef<boolean>(false);

  const totalSlides = SLIDES.length;
  const currentSlide = SLIDES.find((s) => s.id === currentSlideId) || SLIDES[0];

  const resetControlsTimer = useCallback(() => {
    setIsControlsVisible(true);
    if (hideControlsTimerRef.current) {
      clearTimeout(hideControlsTimerRef.current);
    }
    hideControlsTimerRef.current = setTimeout(() => {
      if (!isHoveringControlsRef.current && !isHoveringHeaderRef.current) {
        setIsControlsVisible(false);
      }
    }, 2000);
  }, []);

  const goToNext = useCallback(() => {
    if (currentSlideId < totalSlides) {
      setDirection(1);
      setCurrentSlideId((prev) => prev + 1);
    } else {
      setIsAutoPlaying(false);
    }
  }, [currentSlideId, totalSlides]);

  const goToPrev = useCallback(() => {
    if (currentSlideId > 1) {
      setDirection(-1);
      setCurrentSlideId((prev) => prev - 1);
    }
  }, [currentSlideId]);

  const goToSlide = useCallback((id: number) => {
    setDirection(id > currentSlideId ? 1 : -1);
    setCurrentSlideId(id);
  }, [currentSlideId]);

  // Fullscreen toggle handler
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing inside an input or textarea
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      switch (e.key) {
        case 'c':
        case 'C':
          e.preventDefault();
          setIsControlsVisible((prev) => !prev);
          break;

        case 'ArrowRight':
        case ' ': // Spacebar
        case 'Enter':
        case 'PageDown':
          e.preventDefault();
          goToNext();
          break;

        case 'ArrowLeft':
        case 'Backspace':
        case 'PageUp':
          e.preventDefault();
          goToPrev();
          break;

        case 'Home':
          e.preventDefault();
          goToSlide(1);
          break;

        case 'End':
          e.preventDefault();
          goToSlide(totalSlides);
          break;

        case 'f':
        case 'F':
          e.preventDefault();
          toggleFullscreen();
          break;

        case 'g':
        case 'G':
        case 't':
        case 'T':
          e.preventDefault();
          setIsGridOpen((prev) => !prev);
          break;

        case 'a':
        case 'A':
        case 'p':
        case 'P':
          e.preventDefault();
          setIsAutoPlaying((prev) => !prev);
          break;

        case 'n':
        case 'N':
          e.preventDefault();
          setIsNotesOpen((prev) => !prev);
          break;

        case 'm':
        case 'M':
        case 'l':
        case 'L':
          e.preventDefault();
          setScreenRatio((prev) => {
            if (prev === 'default') return '9x4.5';
            if (prev === '9x4.5') return '3x1';
            return 'default';
          });
          break;

        case '?':
        case 'h':
        case 'H':
          e.preventDefault();
          setIsShortcutsOpen((prev) => !prev);
          break;

        case 'Escape':
          setIsGridOpen(false);
          setIsShortcutsOpen(false);
          setIsNotesOpen(false);
          setIsControlsVisible(false);
          break;

        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrev, goToSlide, toggleFullscreen, totalSlides, resetControlsTimer]);

  // Auto-play timer effect
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      if (currentSlideId < totalSlides) {
        setDirection(1);
        setCurrentSlideId((prev) => prev + 1);
      } else {
        setIsAutoPlaying(false);
      }
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [isAutoPlaying, currentSlideId, totalSlides, autoPlayInterval]);

  // Touch Swipe navigation for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartXRef.current - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // Swiped left -> Next
        goToNext();
      } else {
        // Swiped right -> Prev
        goToPrev();
      }
    }
    touchStartXRef.current = null;
  };

  // Progress percentage calculation
  const progressPercent = ((currentSlideId - 1) / (totalSlides - 1)) * 100;

  return (
    <div
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={`relative w-screen h-screen overflow-hidden flex flex-col justify-between font-sans selection:bg-neutral-900 selection:text-white transition-colors duration-300 ${
        !isControlsVisible && !isGridOpen && !isShortcutsOpen && !isNotesOpen
          ? 'presentation-mode'
          : ''
      } ${
        screenRatio !== 'default' ? 'bg-neutral-950 text-neutral-900' : 'bg-white text-neutral-900'
      }`}
    >
      {/* Top Header & Progress Bar (Auto-hides with controls bar) */}
      <AnimatePresence>
        {isControlsVisible && (
          <motion.header
            initial={{ opacity: 0, y: -25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -25 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            onMouseEnter={() => {
              isHoveringHeaderRef.current = true;
              setIsControlsVisible(true);
              if (hideControlsTimerRef.current) {
                clearTimeout(hideControlsTimerRef.current);
              }
            }}
            onMouseLeave={() => {
              isHoveringHeaderRef.current = false;
              resetControlsTimer();
            }}
            className={`fixed top-0 inset-x-0 z-20 backdrop-blur-md border-b px-4 sm:px-8 lg:px-12 py-3 flex items-center justify-between transition-colors ${
              screenRatio !== 'default'
                ? 'bg-neutral-900/90 border-neutral-800 text-white'
                : 'bg-white/85 border-neutral-100 text-neutral-900'
            }`}
          >
            {/* Left Branding */}
            <div className="flex items-center gap-3">
              <a
                href="https://base.vn"
                target="_blank"
                rel="noreferrer"
                className="flex items-center hover:opacity-85 transition-opacity"
                title="Base.vn"
              >
                <img
                  src="https://static-gcdn.basecdn.net/landing/base.vn/image/v2/logo/base.png"
                  alt="Base.vn"
                  className="h-6 sm:h-7 w-auto object-contain"
                  referrerPolicy="no-referrer"
                />
              </a>
              <span className={screenRatio !== 'default' ? 'text-neutral-600' : 'text-neutral-300'}>/</span>
              <div
                className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-semibold tracking-wider uppercase ${
                  screenRatio !== 'default' ? 'bg-neutral-800 text-amber-400' : 'bg-neutral-100 text-neutral-700'
                }`}
              >
                Amber Note
              </div>
            </div>

            {/* Center: Slide title indication */}
            <div
              className={`hidden md:flex items-center gap-2 text-xs font-medium truncate max-w-md ${
                screenRatio !== 'default' ? 'text-neutral-300' : 'text-neutral-500'
              }`}
            >
              <span className={`font-mono ${screenRatio !== 'default' ? 'text-neutral-400' : 'text-neutral-400'}`}>
                Slide {currentSlideId}:
              </span>
              <span className="truncate">{currentSlide.title}</span>
            </div>

            {/* Right Info: Shortcuts indicator */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsShortcutsOpen(true)}
                className={`hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs transition-colors ${
                  screenRatio !== 'default'
                    ? 'border-neutral-700 text-neutral-300 hover:text-white hover:border-neutral-500'
                    : 'border-neutral-200 text-neutral-500 hover:text-neutral-900 hover:border-neutral-300'
                }`}
              >
                <span>Phím tắt</span>
                <kbd
                  className={`px-1.5 py-0.5 rounded font-mono text-[10px] ${
                    screenRatio !== 'default' ? 'bg-neutral-800 text-neutral-300' : 'bg-neutral-100 text-neutral-600'
                  }`}
                >
                  ?
                </kbd>
              </button>
            </div>

            {/* Top Slim Progress Bar */}
            <div
              className={`absolute bottom-0 left-0 right-0 h-[2px] ${
                screenRatio !== 'default' ? 'bg-neutral-800' : 'bg-neutral-100'
              }`}
            >
              <motion.div
                className={`h-full ${screenRatio !== 'default' ? 'bg-amber-400' : 'bg-neutral-900'}`}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      {/* Main Slide Presentation Stage - Pure full presentation */}
      <main
        onClick={(e) => {
          const target = e.target as HTMLElement;
          if (
            target.closest('button') ||
            target.closest('a') ||
            target.closest('input') ||
            target.closest('textarea') ||
            target.closest('[role="button"]')
          ) {
            return;
          }
          goToNext();
        }}
        className="flex-1 w-full h-full flex items-center justify-center relative overflow-hidden p-0 m-0"
      >
        <div
          className={`relative flex flex-col justify-center items-center overflow-hidden transition-all duration-300 w-full h-full ${
            screenRatio !== 'default' ? 'bg-white' : 'w-full h-full'
          }`}
          style={{
            aspectRatio:
              screenRatio === '9x4.5'
                ? '9 / 4.5'
                : screenRatio === '9x3' || screenRatio === '3x1'
                ? '2304 / 768'
                : undefined,
            maxWidth:
              screenRatio === '9x4.5'
                ? 'calc(100vh * 2)'
                : screenRatio === '9x3' || screenRatio === '3x1'
                ? 'calc(100vh * 3)'
                : '100%',
            maxHeight: '100vh',
          }}
        >
          <SlideContent
            currentSlideId={currentSlideId}
            direction={direction}
            onNextSlide={goToNext}
            screenRatio={screenRatio}
          />
        </div>
      </main>

      {/* Floating Bottom Control Bar */}
      <ControlsBar
        currentSlideId={currentSlideId}
        totalSlides={totalSlides}
        onPrev={goToPrev}
        onNext={goToNext}
        isAutoPlaying={isAutoPlaying}
        onToggleAutoPlay={() => setIsAutoPlaying((prev) => !prev)}
        autoPlayInterval={autoPlayInterval}
        onChangeAutoPlayInterval={setAutoPlayInterval}
        isFullscreen={isFullscreen}
        onToggleFullscreen={toggleFullscreen}
        onOpenGrid={() => setIsGridOpen(true)}
        onOpenShortcuts={() => setIsShortcutsOpen(true)}
        onToggleNotes={() => setIsNotesOpen((prev) => !prev)}
        isNotesOpen={isNotesOpen}
        isVisible={isControlsVisible}
        screenRatio={screenRatio}
        onChangeScreenRatio={setScreenRatio}
        onMouseEnter={() => {
          isHoveringControlsRef.current = true;
          setIsControlsVisible(true);
          if (hideControlsTimerRef.current) {
            clearTimeout(hideControlsTimerRef.current);
          }
        }}
        onMouseLeave={() => {
          isHoveringControlsRef.current = false;
          resetControlsTimer();
        }}
      />

      {/* Speaker Notes Floating Drawer */}
      <PresenterNotesModal
        isOpen={isNotesOpen}
        onClose={() => setIsNotesOpen(false)}
        currentSlide={currentSlide}
      />

      {/* Discreet floating button - Only displayed when controls are open */}
      {isControlsVisible && (
        <button
          onClick={() => setIsControlsVisible(false)}
          title="Ẩn thanh điều khiển (Phím C hoặc Esc)"
          className="fixed bottom-3 right-3 sm:bottom-4 sm:right-4 z-40 p-2 rounded-xl bg-neutral-900/80 text-white backdrop-blur-md shadow-sm transition-all hover:bg-neutral-900 cursor-pointer"
          aria-label="Hide Controls"
        >
          <SlidersHorizontal className="w-4 h-4" />
        </button>
      )}

      {/* Slide Grid Modal */}
      <SlideGridModal
        isOpen={isGridOpen}
        onClose={() => setIsGridOpen(false)}
        slides={SLIDES}
        currentSlideId={currentSlideId}
        onSelectSlide={goToSlide}
      />

      {/* Keyboard Shortcuts Cheat Sheet Modal */}
      <ShortcutsModal
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
      />
    </div>
  );
}
