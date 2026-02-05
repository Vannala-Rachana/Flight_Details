import { Injectable } from '@angular/core';

const THEME_KEY = 'theme'; // 'light' | 'dark'

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private current: 'light' | 'dark' = 'dark';

  constructor() {
    const saved = (localStorage.getItem(THEME_KEY) as 'light' | 'dark') || null;
    if (saved) {
      this.current = saved;
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.current = prefersDark ? 'dark' : 'light';
    }
    this.applyTheme();
  }

  toggle() {
    this.current = this.current === 'dark' ? 'light' : 'dark';
    localStorage.setItem(THEME_KEY, this.current);
    this.applyTheme();
  }

  get theme() {
    return this.current;
  }

  private applyTheme() {
    document.body.setAttribute('data-theme', this.current);
  }
}
