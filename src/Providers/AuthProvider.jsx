import { createContext, useEffect, useState } from "react";
import usePublicAxios from "../Hooks/usePublicAxios";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const axiosInstance = usePublicAxios();
  const [user, setUser] = useState(null);
  const getUser = async () => {
    const { data } = await axiosInstance.get("/user/find");
    if (data.status) {
      setUser(data.user);
    } else {
      setUser(null);
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  const authInfo = { user };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
