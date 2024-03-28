import { useState } from "react";
import toast from "react-hot-toast";
import { z } from "zod";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";
// Desc: Custom hook for signup form to send request to backend
const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const {setAuthUser} = useAuthContext();
  // const array = [1,2,3,4,5,6,7,8,9,10];
  const signup = async ({
    fullName,
    username,
    email,
    gender,
    PasswordForm,
  }) => {
    const result = userDetails.safeParse({
      fullName,
      username,
      PasswordForm,
      gender,
      email,
    });
    if (!result.success) {
      result.error.errors.map((error) => {
        return toast.error(`${error.path[0]}:${error.message}`);
      });
    }
    // console.log(result.data);

    setLoading(true);
    try {
      const response = await axios.post(
        "/api/auth/signup",
        {
          fullName: result.data.fullName,
          username: result.data.username,
          email: result.data.email,
          PasswordForm: result.data.PasswordForm,
          gender: result.data.gender,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response);
      if (response.status === 201) {
        console.log("response", response.data);
        toast.success("Signup successfull");
        localStorage.setItem("authUser", JSON.stringify(response.data.User));
        setAuthUser(response.data.User);

      }
      if (response.status !== 201) {
        console.log("response", response.data);
        throw new Error(response.error);
        
      }
    } catch (error) {
      console.log(error.response.data);
      //   toast.error(error.message);
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

  return { loading, signup };
};

export default useSignup;

const userDetails = z.object({
  fullName: z.string().trim().min(3).max(30),
  username: z.string().trim().min(3).max(30),
  email: z.string().trim().email(),
  PasswordForm: z
    .object({
      password: z.string().trim().min(6).max(30),
      confirmPassword: z.string().trim().min(6).max(30),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["Password"],
    }),
  gender: z
    .string()
    .trim()
    .min(4)
    .max(6)
    .refine(
      (value) => {
        return value === "male" || value === "female";
      },
      {
        message: 'Gender must be either "male" or "female"',
      }
    ),
});
