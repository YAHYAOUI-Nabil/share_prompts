"use client";

import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaFacebook } from "react-icons/fa";

const Login = () => {
  const { data: session } = useSession();
  const [userInfo, setUserInfo] = useState({ username: "", password: "" });
  const [userEmail, setUserEmail] = useState({ email: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      redirect: false,
      username: userInfo.username,
      password: userInfo.password,
    });
    console.log(res);
  };

  const handleLoginWithEmail = async (e) => {
    e.preventDefault();
    const res = await signIn("email", {
      redirect: false,
      email: userEmail.email,
    });
    console.log(res);
  };

  return (
    <div className="flex flex-col gap-6 lg:w-96 md:w-1/2 w-full my-6">
      <div className="flex flex-col">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="username" className="text-lg font-medium">
              Email
            </label>
            <input
              type="email"
              id="username"
              value={userInfo.username}
              onChange={(e) =>
                setUserInfo({ ...userInfo, username: e.target.value })
              }
              className="py-2.5 px-2 rounded-lg focus:outline-none border border-gray-400"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-lg font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={userInfo.password}
              onChange={(e) =>
                setUserInfo({ ...userInfo, password: e.target.value })
              }
              className="py-2.5 px-2 rounded-lg focus:outline-none border border-gray-400"
            />
          </div>
          <div className="w-full">
            <button
              type="submit"
              className="w-full py-2.5 text-normal font-medium rounded-lg border border-gray-400 hover:bg-gray-400"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>

      <div className="relative flex py-5 items-center">
        <div className="flex-grow border-t border-gray-400"></div>
        <span className="flex-shrink mx-4 text-gray-400">Or</span>
        <div className="flex-grow border-t border-gray-400"></div>
      </div>

      <div className="flex flex-col">
        <form onSubmit={handleLoginWithEmail} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-lg font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={userEmail.email}
              onChange={(e) =>
                setUserEmail({ ...userEmail, email: e.target.value })
              }
              className="py-2.5 px-2 rounded-lg focus:outline-none border border-gray-400"
            />
          </div>
          <div className="w-full">
            <button
              type="submit"
              className="w-full py-2.5 text-normal font-medium rounded-lg border border-gray-400 hover:bg-gray-400"
            >
              Sign in with Email
            </button>
          </div>
        </form>
      </div>

      <div className="relative flex py-5 items-center">
        <div className="flex-grow border-t border-gray-400"></div>
        <span className="flex-shrink mx-4 text-gray-400">Or</span>
        <div className="flex-grow border-t border-gray-400"></div>
      </div>

      <div className="flex flex-col gap-4">
        <button
          type="button"
          onClick={() => signIn("google")}
          className="flex items-center justify-between w-full py-2.5 px-4 text-normal font-medium rounded-lg border border-gray-400 hover:bg-gray-400"
        >
          <FcGoogle className="w-6 h-6" />
          <span className="w-full">Sign In with Google</span>
        </button>
        <button
          type="button"
          onClick={() => signIn("facebook")}
          className="flex items-center justify-between w-full py-2.5 px-4 text-normal font-medium rounded-lg border border-gray-400 hover:bg-gray-400"
        >
          <FaFacebook className="w-6 h-6 text-blue-600" />
          <span className="w-full">Sign In with Facebook</span>
        </button>
        <button
          type="button"
          onClick={() => signIn("github")}
          className="flex items-center justify-between w-full py-2.5 px-4 text-normal font-medium rounded-lg border border-gray-400 hover:bg-gray-400"
        >
          <FaGithub className="w-6 h-6" />
          <span className="w-full">Sign In with GitHub</span>
        </button>
      </div>
    </div>
  );
};

export default Login;
