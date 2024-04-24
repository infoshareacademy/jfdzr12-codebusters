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
        document.body.className = mode;
    }, [mode]);

    return (
        <ModeContext.Provider value={{ mode, toggleMode }}>
            {children}
        </ModeContext.Provider>
    );
};
