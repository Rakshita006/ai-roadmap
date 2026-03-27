import React, { useState } from "react";
import toast from "react-hot-toast";

const Signup = () => {
  const [state, setState] = useState("signup");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    //  basic validation
    if (state === "signup" && !name) {
      return toast.error("Name is required");
    }
    if (!email || !password) {
      return toast.error("All fields are required");
    }

    try {
      const BASE_URL = import.meta.env.VITE_BACKEND_URL;

      if (!BASE_URL) {
        return toast.error("Backend URL not configured");
      }

      const url =
        state === "signup"
          ? `${BASE_URL}/api/auth/signup`
          : `${BASE_URL}/api/auth/login`;

      const body =
        state === "signup"
          ? { name, email, password }
          : { email, password };

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // 🔥 important
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Something went wrong");
        return;
      }

      if (state === "signup") {
        toast.success("Sign up successful 🎉");
        setState("login");
        setName("");
        setEmail("");
        setPassword("");
      } else {
        if (!data.token) {
          toast.error("No token received");
          return;
        }

        localStorage.setItem("token", data.token);

        toast.success("Login successful 🚀");

        // better navigation
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error occurred while logging in");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={onSubmitHandler}
        className="bg-white text-gray-500 w-full max-w-[340px] mx-4 md:p-6 p-4 py-8 text-left 
        text-sm rounded-lg shadow-[0px_0px_10px_0px] shadow-black/10"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          {state === "signup" ? "Sign Up" : "Login"}
        </h2>

        {state === "signup" && (
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border mt-1 bg-gray-500/5 mb-2 border-gray-500/10 outline-none rounded py-2.5 px-3"
            type="text"
            placeholder="Username"
          />
        )}

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border mt-1 bg-gray-500/5 mb-2 border-gray-500/10 outline-none rounded py-2.5 px-3"
          type="email"
          placeholder="Email"
          required
        />

        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border mt-1 bg-gray-500/5 mb-7 border-gray-500/10 outline-none rounded py-2.5 px-3"
          type="password"
          placeholder="Password"
          required
        />

        <button className="w-full mb-3 bg-gray-500 hover:bg-gray-600 transition-all active:scale-95 py-2.5 rounded text-white font-medium">
          {state === "signup" ? "Create an account" : "Login"}
        </button>

        {state === "signup" ? (
          <p className="text-center mt-4">
            Already have an account?{" "}
            <span
              className="text-blue-500 underline cursor-pointer"
              onClick={() => setState("login")}
            >
              Log In
            </span>
          </p>
        ) : (
          <p className="text-center mt-4">
            Want to create an account?{" "}
            <span
              className="text-blue-500 underline cursor-pointer"
              onClick={() => setState("signup")}
            >
              Sign up
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default Signup;