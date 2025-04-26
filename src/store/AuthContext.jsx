import { createContext, useEffect, useState } from "react";

const AuthStore = createContext({
  email: "",
  password: "",
  isLoggedIn: false,
  loginHandler: () => {},
  logoutHandler: () => {},
});
export default AuthStore;

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const x = localStorage.getItem("abc");
    if (x === "123") {
      setIsLoggedIn(true);
    }
  }, []);
  const loginHandler = (email, password) => {
    setIsLoggedIn(true);
    localStorage.setItem("abc", "123");
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("abc");
  };
  return (
    <AuthStore.Provider
      value={{
        isLoggedIn: isLoggedIn,
        loginHandler: loginHandler,
        logoutHandler: logoutHandler,
      }}
    >
      {children}
    </AuthStore.Provider>
  );
};
