import {createContext, useContext, useState, type ReactNode, useLayoutEffect} from 'react';

export interface ThemeColors {
    primary: string; // HSL format: "180 100% 50%"
    secondary: string; // HSL format: "280 85% 60%"
}

export interface Theme {
    id: string;
    name: string;
    colors: ThemeColors;
}

// eslint-disable-next-line react-refresh/only-export-components
export const defaultThemes: Theme[] = [
    {
        id: 'default',
        name: 'Default (Cyan/Purple)',
        colors: {
            primary: '180 100% 50%',
            secondary: '280 85% 60%',
        },
    },
    {
        id: 'ocean',
        name: 'Ocean Blue',
        colors: {
            primary: '200 90% 50%',
            secondary: '220 85% 60%',
        },
    },
    {
        id: 'forest',
        name: 'Forest Green',
        colors: {
            primary: '150 70% 45%',
            secondary: '120 60% 50%',
        },
    },
    {
        id: 'sunset',
        name: 'Sunset Orange',
        colors: {
            primary: '25 95% 55%',
            secondary: '340 85% 60%',
        },
    },
    {
        id: 'corporate',
        name: 'Corporate Blue',
        colors: {
            primary: '210 100% 50%',
            secondary: '195 80% 55%',
        },
    },
];

interface ThemeContextType {
    currentTheme: Theme;
    setTheme: (theme: Theme) => void;
    customColors: ThemeColors | null;
    setCustomColors: (colors: ThemeColors) => void;
    applyTheme: (colors: ThemeColors) => void;
    customLogo: string | null;
    setCustomLogo: (logo: string | null) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
};

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
    //const [currentTheme, setCurrentTheme] = useState<Theme>(defaultThemes[0]);
    const [currentTheme, setCurrentTheme] = useState<Theme>(() => {
        const savedTheme = localStorage.getItem("app-theme");
        const savedCustomColors = localStorage.getItem("app-custom-colors");

        if (savedCustomColors) {
            const colors = JSON.parse(savedCustomColors);
            return {
                id: "custom",
                name: "Custom Theme",
                colors,
            };
        }

        if (savedTheme) {
            return defaultThemes.find(t => t.id === savedTheme) || defaultThemes[0];
        }

        return defaultThemes[0];
    });

    //const [customColors, setCustomColorsState] = useState<ThemeColors | null>(null);
    const [customColors, setCustomColorsState] = useState<ThemeColors | null>(() => {
        const saved = localStorage.getItem("app-custom-colors");
        return saved ? JSON.parse(saved) : null;
    });

    //const [customLogo, setCustomLogoState] = useState<string | null>(null);
    const [customLogo, setCustomLogoState] = useState<string | null>(() => {
        return localStorage.getItem("app-custom-logo") || null;
    });

    const applyTheme = (colors: ThemeColors) => {
        const root = document.documentElement;

        // Apply primary color
        root.style.setProperty('--primary', colors.primary);
        root.style.setProperty('--ring', colors.primary);
        root.style.setProperty('--glow-primary', colors.primary);
        root.style.setProperty('--sidebar-primary', colors.primary);
        root.style.setProperty('--sidebar-ring', colors.primary);

        // Apply secondary color
        root.style.setProperty('--secondary', colors.secondary);
        root.style.setProperty('--accent', colors.secondary);
        root.style.setProperty('--glow-secondary', colors.secondary);

        // Update glass border to match primary with adjusted opacity
        root.style.setProperty('--glass-border', colors.primary);
    };

    // Load theme from localStorage on mount
    useLayoutEffect(() => {
        if (customColors) {
            applyTheme(customColors);
        } else {
            applyTheme(currentTheme.colors);
        }
    }, [currentTheme, customColors]);



    const setTheme = (theme: Theme) => {
        setCurrentTheme(theme);
        setCustomColorsState(null);
        localStorage.setItem('app-theme', theme.id);
        localStorage.removeItem('app-custom-colors');
        applyTheme(theme.colors);
    };

    const setCustomColors = (colors: ThemeColors) => {
        setCustomColorsState(colors);
        const customTheme: Theme = {
            id: 'custom',
            name: 'Custom Theme',
            colors,
        };
        setCurrentTheme(customTheme);
        localStorage.setItem('app-custom-colors', JSON.stringify(colors));
        localStorage.removeItem('app-theme');
        applyTheme(colors);
    };

    const setCustomLogo = (logo: string | null) => {
        setCustomLogoState(logo);
        if (logo) {
            localStorage.setItem('app-custom-logo', logo);
        } else {
            localStorage.removeItem('app-custom-logo');
        }
    };

    return (
        <ThemeContext.Provider
            value={{
                currentTheme,
                setTheme,
                customColors,
                setCustomColors,
                applyTheme,
                customLogo,
                setCustomLogo,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
};
