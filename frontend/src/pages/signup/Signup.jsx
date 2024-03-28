import { Link } from "react-router-dom";
import { useState } from "react";
import useSignup from "../../hooks/useSignup";

const Signup = () => {
  
  const [signupDetails, setSignupDetails] = useState({
    fullName: "",
    username: "",
    email: "",
    gender: "",
    PasswordForm: {
      password: "",
      confirmPassword: "",
    },
  });

  const {loading,signup} = useSignup();
  // console.log(loading);
  const handleSubmit =async (e)=>{
    e.preventDefault();
    await signup(signupDetails);
    // console.log(signupDetails);
  }
  return (
    <div className=" min-w-[300px] w-4/5 max-w-[500px] h-3/4 max-h-[550px] mx-auto flex flex-col  ">
      <div className='"w-full  p-4 h-full  rounded-lg  '>
        <h1 className="text-3xl font-semibold text-center  mb-8 font-mono mt-5">
          SignUp <span className="text-blue-500">ChatKar</span>
        </h1>

        <form action="" onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="input input-bordered flex items-center gap-2">
              Name
              <input
                type="text"
                className="grow"
                placeholder="Daisy"
                onChange={(e) => {
                  setSignupDetails((prevState) => ({ ...prevState, fullName: e.target.value }));
                }}
                
                value={signupDetails.fullName}
              />
            </label>
          </div>

          <div className="mb-2">
            <label className="input input-bordered flex items-center gap-2">
              Username
              <input
                type="text"
                className="grow"
                placeholder="Daisy"
                onChange={(e) => {
                  setSignupDetails((prevState) => ({ ...prevState, username: e.target.value }));
                }}
                
                value={signupDetails.username}
              />
            </label>
          </div>

          <div className="mb-2">
            <label className="input input-bordered flex items-center gap-2">
              Email
              <input
                type="text"
                className="grow"
                placeholder="daisy@site.com"
                onChange={(e) => {
                  setSignupDetails((prevState) => ({ ...prevState, email: e.target.value }));
                }}
                
                value={signupDetails.email}
              />
            </label>
          </div>

          <div className="mb-2">
            <label className="input input-bordered flex items-center gap-2">
              Password
              <input
                type="password"
                className="grow"
                placeholder="password"
                onChange={(e) => {
                  setSignupDetails((prevSignupDetails) => ({
                    ...prevSignupDetails,
                    PasswordForm: {
                      ...prevSignupDetails.PasswordForm,
                      password: e.target.value,
                    },
                  }));
                }}
                
                value={signupDetails.PasswordForm.password}
              />
            </label>
          </div>

          <div className="mb-2">
            <label className="input input-bordered flex items-center gap-2">
              Password
              <input
                type="password"
                className="grow"
                placeholder="renter password"
                onChange={(e) => {
                  setSignupDetails((prevSignupDetails) => ({
                    ...prevSignupDetails,
                    PasswordForm: {
                      ...prevSignupDetails.PasswordForm,
                      confirmPassword: e.target.value,
                    },
                  }));
                }}
                
                value={signupDetails.PasswordForm.confirmPassword}
              />
            </label>
          </div>

          <div className="flex">
            <div className="form-control">
              <label className="label gap-2 cursor-pointer">
                <span className="label-text">Male</span>
                <input
                  type="checkbox"
                  className="checkbox"
                  onChange={() => {
                    setSignupDetails((prevState)=> ({ ...prevState,gender:"male"}));
                  }}
                  checked={signupDetails.gender === "male"}
                />
              </label>
            </div>

            <div className="form-control">
              <label className="label gap-2 cursor-pointer">
                <span className="label-text">Female</span>
                <input
                  type="checkbox"
                  className="checkbox"
                  onChange={() => {
                    setSignupDetails((prevState)=> ({ ...prevState,gender:"female"}));
                  }}
                  checked={signupDetails.gender === "female"}
                />
              </label>
            </div>
          </div>

          <Link
            to="/login"
            className="text-sm hover:underline hover:text-blue-600 inline-block mt-2 "
          >
            Already have an account?
          </Link>
          {/* <button className="btn btn-block btn-sm mt-2">SignUp</button> */}
          <button disabled={loading} className="btn btn-outline btn-info btn-block text-lg mt-2 font-mono">
            {loading ? (<span className="loading loading-spinner"></span>) : "SignUp"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
