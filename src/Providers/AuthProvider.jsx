import { createContext, useEffect, useState } from "react";
import usePublicAxios from "../Hooks/usePublicAxios";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const axiosInstance = usePublicAxios();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authReloader, setAuthReloader] = useState(true);

  //! User
  const getUser = async () => {
    const { data } = await axiosInstance.get("/user/find");
    if (data.status) {
      setUser(data.user);
    } else {
      setUser(null);
    }
    setLoading(false);
  };
  useEffect(() => {
    getUser();
  }, [authReloader]);

  //! LogOut
  const logOut = async () => {
    await axiosInstance.get("/user/logout");
    setAuthReloader(!authReloader);
  };

  //! LogIn
  const logIn = async (email, password) => {
    const { data } = await axiosInstance.post("/user/login", {
      email,
      password,
    });
    if (data.status) {
      setAuthReloader(!authReloader);
      return { success: true };
    } else {
      alert(data.msg);
      setAuthReloader(!authReloader);
      return { success: false };
    }
  };
  const authInfo = {
    user,
    logOut,
    authReloader,
    setAuthReloader,
    logIn,
    loading,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
