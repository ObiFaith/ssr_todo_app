import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useContext,
	useState,
} from 'react';

type ThemeContextType = {
	isDarkMode: boolean;
	setDarkMode: Dispatch<SetStateAction<boolean>>;
};

const Theme = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
	const [isDarkMode, setDarkMode] = useState(false);
	return (
		<Theme.Provider value={{ isDarkMode, setDarkMode }}>
			{children}
		</Theme.Provider>
	);
};

const useTheme = () => {
	const context = useContext(Theme);
	if (context === undefined) {
		throw new Error('useTheme must be used within a ThemeProvider');
	}
	return context;
};

export default useTheme;
