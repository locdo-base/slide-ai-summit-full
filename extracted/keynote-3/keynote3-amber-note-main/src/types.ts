export type ScreenRatio = 'default' | '9x4.5' | '9x3' | '3x1';

export interface SlideData {
  id: number;
  title: string;
  subtitle?: string;
  category?: string;
  notes?: string;
}

export interface ShortcutItem {
  keys: string[];
  description: string;
  actionName: string;
}
