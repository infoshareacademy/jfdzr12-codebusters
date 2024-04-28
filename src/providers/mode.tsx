import { createContext, useContext, useEffect, useState } from "react";

type Mode = "light" | "dark";

type ContextType = {
    mode: Mode;
    toggleMode: () => void;
};

const ModeContext = createContext<ContextType | undefined>(undefined);

export const useMode = (): ContextType => {
    const context = useContext(ModeContext);
    if (!context) {
        throw new Error("useMode must be used within a ModeProvider");
    }
    return context;
};

type ModeProviderProps = {
    children: React.ReactNode;
};

export const ModeProvider: React.FC<ModeProviderProps> = ({ children }: ModeProviderProps) => {
    const [mode, setMode] = useState<Mode>("light");

    const toggleMode = (): void => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
    };

    useEffect(() => {
        const fetchModeFromLocalStorage = () => {
            try {
                const modeData: Mode | null = JSON.parse(localStorage.getItem('mode') || 'null');
                if (modeData && mode !== modeData) {
                    setMode(modeData);
                }
            } catch (error) {
                console.error("Error accessing local storage:", error);
            }
        };

        fetchModeFromLocalStorage();
    }, []);

    useEffect(() => {
        localStorage.setItem('mode', JSON.stringify(mode));
    }, [mode]);

    useEffect(() => {
        document.body.className = mode === "dark" ? "dark" : "";
    }, [mode]);

    return (
        <ModeContext.Provider value={{ mode, toggleMode }}>
            {children}
        </ModeContext.Provider>
    );
};
