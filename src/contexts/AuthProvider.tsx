import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
} from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  isRegistering: boolean;
  user: string;
  setIsLoggedIn: (status: boolean) => void;
  setIsRegistering: (status: boolean) => void;
  setUser: (name: string) => void;
}

// Default values for auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [user, setUser] = useState<string>("");

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isRegistering,
        user,
        setIsLoggedIn,
        setIsRegistering,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within a AuthProvider");
  }
  return context;
};
