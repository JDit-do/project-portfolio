import { create } from 'zustand';

import { THEME as TTHEME } from '@/types/common';
import { THEME } from '@/constants/common';

interface ThemeState {
  theme: TTHEME;
  setTheme: (theme: TTHEME) => void;
}

const useThemeStore = create<ThemeState>((set) => ({
  theme: THEME.DARK,
  setTheme: (theme) => set({ theme })
}));

export default useThemeStore;
