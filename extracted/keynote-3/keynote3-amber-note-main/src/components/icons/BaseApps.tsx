import React from 'react';

// 1. Base CRM Icon (Green with white curved chevron/arrow)
export const BaseCrmIcon: React.FC<{ className?: string; size?: number }> = ({
  className = 'w-10 h-10',
  size,
}) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={size ? { width: size, height: size } : undefined}
  >
    <rect width="100" height="100" rx="28" fill="#14693a" />
    <path
      d="M50 26C47.8 26 45.8 27.2 44.8 29.1L21.4 67.2C19.8 69.8 21.7 73.2 24.8 73.2C26.5 73.2 28.1 72.3 28.9 70.8L50 37.8L71.1 70.8C71.9 72.3 73.5 73.2 75.2 73.2C78.3 73.2 80.2 69.8 78.6 67.2L55.2 29.1C54.2 27.2 52.2 26 50 26Z"
      fill="white"
    />
  </svg>
);

// 2. Base HRIS / HRM Icon (Purple to Blue gradient with profile/sheet structure)
export const BaseHrisIcon: React.FC<{ className?: string; size?: number }> = ({
  className = 'w-10 h-10',
  size,
}) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={size ? { width: size, height: size } : undefined}
  >
    <defs>
      <linearGradient id="hrisGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#7c3aed" />
        <stop offset="100%" stopColor="#2563eb" />
      </linearGradient>
    </defs>
    <rect width="100" height="100" rx="28" fill="url(#hrisGradient)" />
    {/* Left doc block */}
    <rect x="22" y="24" width="38" height="52" rx="7" fill="white" />
    <rect x="30" y="38" width="22" height="7" rx="3.5" fill="#6d28d9" />
    <rect x="30" y="52" width="22" height="7" rx="3.5" fill="#6d28d9" />
    {/* Right tab */}
    <rect x="65" y="24" width="13" height="52" rx="6" fill="white" />
  </svg>
);

// 3. Base Workflow Icon (Blue to Teal gradient with workflow stages)
export const BaseWorkflowIcon: React.FC<{ className?: string; size?: number }> = ({
  className = 'w-10 h-10',
  size,
}) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={size ? { width: size, height: size } : undefined}
  >
    <defs>
      <linearGradient id="wfGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0284c7" />
        <stop offset="100%" stopColor="#0d9488" />
      </linearGradient>
    </defs>
    <rect width="100" height="100" rx="28" fill="url(#wfGradient)" />
    {/* Column 1 */}
    <rect x="24" y="25" width="22" height="34" rx="6" fill="white" />
    {/* Column 2 */}
    <rect x="54" y="25" width="22" height="50" rx="6" fill="white" />
  </svg>
);

// 4. Base Task Icon (Blue to Violet gradient with checkmark)
export const BaseTaskIcon: React.FC<{ className?: string; size?: number }> = ({
  className = 'w-10 h-10',
  size,
}) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={size ? { width: size, height: size } : undefined}
  >
    <defs>
      <linearGradient id="taskGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3b82f6" />
        <stop offset="100%" stopColor="#8b5cf6" />
      </linearGradient>
    </defs>
    <rect width="100" height="100" rx="28" fill="url(#taskGradient)" />
    <path
      d="M28 50L44 66L74 34"
      stroke="white"
      strokeWidth="11"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
