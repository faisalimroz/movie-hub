import { useTheme } from '@/context/themeContext';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            style={{  color: '#FFFFFF' }}>
            <label className="flex cursor-pointer gap-2">
               
                <input type="checkbox" value="synthwave" className="toggle theme-controller" />
             
            </label>
        </button>

    );
};

export default ThemeToggle;
