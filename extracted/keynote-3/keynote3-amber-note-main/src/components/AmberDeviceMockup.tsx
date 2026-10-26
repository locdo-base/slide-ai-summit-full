import React from 'react';
import { motion } from 'motion/react';

export const AMBER_IMAGES = {
  silver: 'https://base.vn/wp-content/uploads/2026/09/Amber-note-xam.png',
  xam: 'https://base.vn/wp-content/uploads/2026/09/Amber-note-xam.png',
  dark: 'https://base.vn/wp-content/uploads/2026/09/Amber-note-xam.png',
  'rose-gold': 'https://base.vn/wp-content/uploads/2026/09/Amber-note-hong.png',
  hong: 'https://base.vn/wp-content/uploads/2026/09/Amber-note-hong.png',
};

interface AmberDeviceMockupProps {
  color?: 'silver' | 'rose-gold' | 'dark' | 'xam' | 'hong';
  size?: 'sm' | 'md' | 'lg' | 'hero';
  isRecording?: boolean;
  time?: string;
  badgePosition?: 'default' | 'pocket' | 'phone';
  showAudioWave?: boolean;
  showHud?: boolean;
  className?: string;
}

export const AmberDeviceMockup: React.FC<AmberDeviceMockupProps> = ({
  color = 'silver',
  size = 'md',
  isRecording = true,
  time = '20:29',
  showAudioWave = false,
  showHud = true,
  className = '',
}) => {
  const isRose = color === 'rose-gold' || color === 'hong';
  const imageUrl = isRose ? AMBER_IMAGES.hong : AMBER_IMAGES.xam;
  const altText = isRose ? 'Base Amber Note - Màu Hồng' : 'Base Amber Note - Màu Xám Titanium';

  // Responsive heights that match the ~ 1:1.59 aspect ratio of 251x399px image
  const sizeClasses = {
    sm: 'h-44 sm:h-52 w-auto',
    md: 'h-60 sm:h-68 w-auto',
    lg: 'h-72 sm:h-80 w-auto',
    hero: 'h-72 sm:h-88 lg:h-[390px] xl:h-[420px] w-auto',
  };

  return (
    <div className={`relative inline-flex flex-col items-center justify-center select-none group ${className}`}>
      {/* Ambient Realistic Glow / Drop Shadow */}
      <div
        className={`absolute inset-0 rounded-3xl blur-2xl opacity-40 transition-all duration-700 pointer-events-none group-hover:opacity-60 ${
          isRose
            ? 'bg-rose-300/40 scale-90'
            : 'bg-slate-400/30 scale-90'
        }`}
      />

      {/* Actual Amber Note Device Image */}
      <motion.div
        className="relative z-10 flex items-center justify-center"
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <img
          src={imageUrl}
          alt={altText}
          referrerPolicy="no-referrer"
          className={`${sizeClasses[size]} object-contain filter drop-shadow-2xl pointer-events-none transition-transform duration-300`}
          loading="eager"
        />
      </motion.div>
    </div>
  );
};
