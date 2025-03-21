import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  token: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

function isTokenExpired(token: string): boolean {
  try {
    const expiry = JSON.parse(atob(token.split(".")[1])).exp;
    return Math.floor(new Date().getTime() / 1000) >= expiry;
  } catch {
    return true;
  }
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const navigate = useNavigate();

  const isAuthenticated = useMemo(() => {
    return token !== null && !isTokenExpired(token);
  }, [token]);

  useEffect(() => {
    if (token) {
      if (isTokenExpired(token)) {
        logout();
      } else {
        localStorage.setItem("token", token);
      }
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  const login = (newToken: string) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    navigate("/", { replace: true });
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    navigate("/login");
  };

  const contextValue = useMemo(
    () => ({
      token,
      isAuthenticated,
      login,
      logout,
    }),
    [token, isAuthenticated]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;
