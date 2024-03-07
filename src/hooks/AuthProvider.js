import { createContext, useState } from "react";

export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
  // user - it must be an object
  const [user, setUser] = useState(null);
  const signIn = (newUser, authentification) => {
    setUser(newUser);
    // redirect function
    authentification();
  };
  const signOut = (disAuthentification) => {
    setUser(null);
    disAuthentification();
  };

  const userData = { user, signIn, signOut };

  return (
    <AuthContext.Provider value={userData}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
