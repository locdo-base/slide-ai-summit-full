import React from 'react';
import { DemoMockupFrame } from '../DemoMockupFrame';

interface SlideDemoProps {
  isLed3x1?: boolean;
}

export const Slide12Demo: React.FC<SlideDemoProps> = ({ isLed3x1 }) => {
  return (
    <DemoMockupFrame
      src="/amber-auto-order-demo.html"
      title="Amber Note Auto Order Demo"
      isLed3x1={isLed3x1}
    />
  );
};
