import React, { useState } from "react";
import toast from "react-hot-toast";

const Signup = () => {
  const [state, setState] = useState("signup");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const url =
        state === "signup"
          ? "http://localhost:5000/api/auth/signup"
          : "http://localhost:5000/api/auth/login";

      const body =
        state === "signup" ? { name, email, password } : { email, password };

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      console.log("raw response", response);

      const data = await response.json();

      

      if (!response.ok) {
        toast.error("something went wrong while signing up or logging in");
      }

      if (state === "signup") {
        toast.success("Sign up successful");
        setState("login");
      } else {
        if (!data.token) {
          toast.error("No token received");
          return;
        }

        localStorage.setItem("token", data.token);
        

        toast.success("Login successful");
        window.location.href = "/";
      }
    } catch (error) {
      console.log(error);
      toast.error("error occured while logging in");
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
            onChange={(e) => setName(e.target.value)}
            id="name"
            className="w-full border mt-1 bg-gray-500/5 mb-2 border-gray-500/10 outline-none rounded py-2.5 px-3"
            name="name"
            type="text"
            placeholder="Username"
          />
        )}
        <input
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          className="w-full border mt-1 bg-gray-500/5 mb-2 border-gray-500/10 outline-none rounded py-2.5 px-3"
          type="email"
          placeholder="Email"
          required
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          id="password"
          className="w-full border mt-1 bg-gray-500/5 mb-7 border-gray-500/10 outline-none rounded py-2.5 px-3"
          type="password"
          placeholder="Password"
          required
        />

        <button className="w-full mb-3 bg-gray-500 hover:bg-gray-600 transition-all active:scale-95 py-2.5 rounded text-white font-medium">
          {state === "signup" ? "Create an account" : "Login"}
        </button>
        {state === "signup" ? (
          <p className={`text-center mt-4 `}>
            Already have an account?{" "}
            <span
              className="text-blue-500 underline"
              onClick={() => setState("login")}
            >
              Log In
            </span>
          </p>
        ) : (
          <p className={`text-center mt-4 `}>
            Want to create an account?{" "}
            <span
              className="text-blue-500 underline"
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
