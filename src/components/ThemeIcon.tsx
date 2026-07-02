import React from 'react';
import { Moon, SunMedium } from 'lucide-react';

type ThemeIconProps = {
  theme: 'dark' | 'light';
};

export default function ThemeIcon({ theme }: ThemeIconProps) {
  return theme === 'dark' ? (
    <SunMedium className="h-5 w-5 text-foreground" />
  ) : (
    <Moon className="h-5 w-5 text-foreground" />
  );
}
