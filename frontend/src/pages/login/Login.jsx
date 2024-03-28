const Login = () => {
  return (
    <div className=" w-[370px]  min-h-[350px] mx-auto flex flex-col items-center justify-center">
      <div className="w-full  p-8 h-[350px] rounded-md   ">
        <h1 className="text-3xl font-semibold text-center  mb-8 font-mono mt-5">
          Login <span className="text-blue-500">ChatKar</span>
        </h1>
        <form action="">
          <div className="mb-4">
            <label className="input input-bordered flex items-center gap-2 font-mono">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input type="text" className="grow" placeholder="Username or Email" />
            </label>
          </div>
          <div className=" mb-4">
            <label className="input input-bordered flex items-center gap-2 font-mono">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input type="password" placeholder="Password" className="grow" />
            </label>
          </div>
          <button className="btn btn-outline btn-info btn-block text-lg mt-2 font-mono">Login</button>
          <a href="#" className="text-sm hover:underline hover:text-blue-600 inline-block mt-2 ">{"Don't"} have an account?</a>
        </form>
      </div>
    </div>
  );
};

export default Login;
