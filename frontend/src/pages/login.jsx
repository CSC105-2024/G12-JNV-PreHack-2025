import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import logo from "../images/logo.png";

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (Object.keys(errors).length > 0) return;
    console.log("✅ Logged in Data:", data);
    navigate("/homepage");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg border border-gray-300 p-8">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img src={logo} alt="Logo" className="h-60 w-auto object-contain" />
        </div>

        <div className="text-2xl font-bold font-poppins text-[#196C2E] text-center mb-3">
          Login to your Account
        </div>
        <div className="text-sm font-poppins text-[#196C2E] text-center mb-6">
          Small power creates a better tomorrow
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div>
            <label className="font-poppins font-semibold text-gray-400 text-sm">
              Email
            </label>
            <input
              type="text"
              placeholder="Sorasit@mail.com"
              {...register("email", { required: "Email is required" })}
              className="w-full px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#196C2E] placeholder-gray-300"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="font-poppins font-semibold text-gray-400 text-sm">
              Password
            </label>
            <input
              type="password"
              placeholder="********"
              {...register("password", { required: "Password is required" })}
              className="w-full px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#196C2E] placeholder-gray-300"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Remember Me */}
          <div className="flex items-center">
            <input
              type="checkbox"
              {...register("rememberMe")}
              className="mr-2"
            />
            <label className="font-poppins text-gray-600 text-sm">
              Remember Me
            </label>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-[#196C2E] text-white py-2 rounded-lg hover:opacity-90 transition"
          >
            <div className="font-bold font-poppins text-center">Login</div>
          </button>
        </form>

        {/* Register Link */}
        <p className="text-center mt-4 text-gray-600">
          Not Registered Yet?{" "}
          <Link
            to="/register"
            className="text-[#196C2E] font-semibold underline"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
