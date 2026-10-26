import React from 'react';
import { DemoMockupFrame } from '../DemoMockupFrame';

interface SlideDemoProps {
  isLed3x1?: boolean;
}

export const Slide13Demo: React.FC<SlideDemoProps> = ({ isLed3x1 }) => {
  return (
    <DemoMockupFrame
      src="/amber-insights-demo.html"
      title="Amber Note Insights Demo"
      isLed3x1={isLed3x1}
    />
  );
};
