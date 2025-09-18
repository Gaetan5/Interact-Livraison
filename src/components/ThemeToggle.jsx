import { useTheme } from '../state/ThemeContext.jsx';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const next = theme === 'dark' ? 'light' : 'dark';
  return (
    <button className="toggle-btn" onClick={()=>setTheme(next)} aria-label="Basculer thème">
      {theme === 'dark' ? '🌙' : '☀️'}
    </button>
  );
}
