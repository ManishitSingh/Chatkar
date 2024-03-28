import React from "react";

const Signup = () => {
  return (
    <div className=" min-w-[300px] w-4/5 max-w-[500px] h-3/4 max-h-[550px] mx-auto flex flex-col  ">
      <div className='"w-full  p-4 h-full  rounded-lg  '>
        <h1 className="text-3xl font-semibold text-center  mb-8 font-mono mt-5">
          SignUp <span className="text-blue-500">ChatKar</span>
        </h1>
        <form action="">
          <div className="mb-2">
            <label className="input input-bordered flex items-center gap-2">
              Name
              <input type="text" className="grow" placeholder="Daisy" />
            </label>
          </div>

          <div className="mb-2">
            <label className="input input-bordered flex items-center gap-2">
              Username
              <input type="text" className="grow" placeholder="Daisy" />
            </label>
          </div>

          <div className="mb-2">
            <label className="input input-bordered flex items-center gap-2">
              Email
              <input
                type="text"
                className="grow"
                placeholder="daisy@site.com"
              />
            </label>
          </div>

          <div className="mb-2">
            <label className="input input-bordered flex items-center gap-2">
              Password
              <input type="password" className="grow" placeholder="password" />
            </label>
          </div>

          <div className="mb-2">
            <label className="input input-bordered flex items-center gap-2">
              Password
              <input
                type="password"
                className="grow"
                placeholder="renter password"
              />
            </label>
          </div>

          <div className="flex">
            <div className="form-control">
              <label className="label gap-2 cursor-pointer">
                <span className="label-text">Male</span>
                <input type="checkbox"  className="checkbox" />
              </label>
            </div>

            <div className="form-control">
              <label className="label gap-2 cursor-pointer">
                <span className="label-text">Female</span>
                <input type="checkbox"  className="checkbox" />
              </label>
            </div>
          </div>

          <a href="#" className="text-sm hover:underline hover:text-blue-600 inline-block mt-2 ">Already have an account?</a>
            {/* <button className="btn btn-block btn-sm mt-2">SignUp</button> */}
          <button className="btn btn-outline btn-info btn-block text-lg mt-2 font-mono">Login</button>



        </form>
      </div>
    </div>
  );
};

export default Signup;
