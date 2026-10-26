import React from 'react';
import { DemoMockupFrame } from '../DemoMockupFrame';

interface SlideDemoProps {
  isLed3x1?: boolean;
}

export const Slide11Demo: React.FC<SlideDemoProps> = ({ isLed3x1 }) => {
  return (
    <DemoMockupFrame
      src="/amber-crm-meeting-demo.html"
      title="Base CRM & Amber Note Meeting Extraction Demo"
      isLed3x1={isLed3x1}
    />
  );
};
