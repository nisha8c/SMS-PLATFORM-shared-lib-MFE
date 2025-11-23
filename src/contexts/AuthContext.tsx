import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type {User} from "../types";


interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user for demo
const mockUser: User = {
    id: '1',
    companyId: 'company-1',
    email: 'admin@example.com',
    name: 'Admin User',
    role: 'company_admin',
    status: 'active',
    timezone: 'UTC',
    locale: 'en',
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate checking for existing session
        setTimeout(() => {
            setUser(mockUser);
            setIsLoading(false);
        }, 500);
    }, []);

    const login = async (email: string, password: string) => {
        // Mock login - will be replaced with real auth
        setUser(mockUser);
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};
