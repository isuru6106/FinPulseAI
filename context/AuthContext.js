
import React, {
  createContext,
  useContext,
  useState,
} from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accounts, setAccounts] = useState([]);

  const register = ({ name, email, password }) => {
    const normalizedEmail = email.trim().toLowerCase();

    const accountExists = accounts.some(
      (account) => account.email === normalizedEmail
    );

    if (accountExists) {
      return {
        success: false,
        error: "An account with this email already exists.",
      };
    }

    const newAccount = {
      name: name.trim(),
      email: normalizedEmail,
      password,
    };

    setAccounts((previous) => [...previous, newAccount]);

    setUser({
      name: newAccount.name,
      email: newAccount.email,
    });

    return { success: true };
  };

  const login = ({ email, password }) => {
    const normalizedEmail = email.trim().toLowerCase();

    const account = accounts.find(
      (item) =>
        item.email === normalizedEmail &&
        item.password === password
    );

    if (!account) {
      return {
        success: false,
        error: "Invalid email or password.",
      };
    }

    setUser({
      name: account.name,
      email: account.email,
    });

    return { success: true };
  };

  const logout = () => {
    setUser(null);
  };

  const continueAsGuest = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        isGuest: !user,
        register,
        login,
        logout,
        continueAsGuest,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}
