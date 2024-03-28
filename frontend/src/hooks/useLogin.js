import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { z } from "zod";
import { useAuthContext } from "../context/AuthContext";
const useLogin = () => {
  const {setAuthUser} = useAuthContext();
  const [loading, setLoading] = useState(false);
  const Login = async ({ user, password }) => {
      try {
        setLoading(true);
      let result;
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailPattern.test(user)) {
             result = loginSchema.safeParse({
            credentials: { email: user, password },
            });
            if (!result.success) {
                result.error.errors.map((error) => {
                  return toast.error(`${error.path[0]}:${error.message}`);
                });
              }
        }else{
       result = loginSchema.safeParse({
        credentials: { username: user, password },
      });
      if (!result.success) {
        result.error.errors.map((error) => {
          return toast.error(`${error.path[0]}:${error.message}`);
        });
      }}
    //   console.log("out",result.data);
        const response = await axios.post(
            "/api/auth/login",
            result.data,
            {
            headers: {
                "Content-Type": "application/json",
            },
            }
        );
        if (response.status === 200) {
            console.log("response", response.data);
            toast.success("Login successfull");
            localStorage.setItem("authUser", JSON.stringify(response.data.User));
            setAuthUser(response.data.User);
        }
        if (response.status !== 200) {
            console.log("response", response.data);
            throw new Error(response.error);
        }


    //   console.log(result.data);
    } catch (error) {
      console.log("Login Route", error);
      toast.error(
        error.response.data.Error ||
          error.response.data.error ||
          error.response.data.message ||
          error.response.data
      );
    } finally {
      setLoading(false);
    }
  };
  return { Login, loading };
};
export default useLogin;

const loginSchema = z.object({
  credentials: z.union([
    z.object({
      username: z.string().trim().min(3).max(30),
      password: z.string().trim().min(6).max(30),
    }),
    z.object({
      email: z.string().trim().email(),
      password: z.string().trim().min(6).max(30),
    }),
  ]),
});
