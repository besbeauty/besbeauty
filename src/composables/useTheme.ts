import { inject } from 'vue';

export function useTheme() {
  const theme = inject('theme');
  const toggleTheme = inject('toggleTheme');

  return {
    theme,
    toggleTheme,
  };
}
