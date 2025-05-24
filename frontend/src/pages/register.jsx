import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import logo from "../images/logo.png";

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const onSubmit = (data) => {
    if (Object.keys(errors).length > 0) return;

    Swal.fire({
      title: "Registration Successful!",
      text: "You have successfully registered.",
      icon: "success",
      confirmButtonText: "Continue",
      confirmButtonColor: '#196C2E',
    }).then(() => {
      navigate("/login");
    });

    console.log("✅ Registered Data:", data);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg border border-gray-300">
        <div className="flex justify-center ">
          <img src={logo} alt="Logo" className="h-60 w-auto object-scale-down" />
        </div>
        <div className="text-2xl font-bold font-poppins text-[#196C2E] text-center mb-2">
          Create your Account
        </div>
        <div className="text-sm font-poppins text-[#196C2E] text-center mb-2">
          Welcome to the community
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="font-poppins font-semibold text-gray-400 text-sm">Firstname</label>
            <input
              type="text"
              placeholder="Firstname"
              {...register("firstname", { required: "Firstname is required" })}
              className="w-full px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#196C2E] placeholder-gray-300 font-poppins"
            />
            {errors.firstname && <p className="text-red-500 text-sm">{errors.firstname.message}</p>}
          </div>

          <div>
            <label className="font-poppins font-semibold text-gray-400 text-sm">Lastname</label>
            <input
              type="text"
              placeholder="Lastname"
              {...register("lastname", { required: "Lastname is required" })}
              className="w-full px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#196C2E] placeholder-gray-300 font-poppins"
            />
            {errors.lastname && <p className="text-red-500 text-sm">{errors.lastname.message}</p>}
          </div>

          <div>
            <label className="font-poppins font-semibold text-gray-400 text-sm">E-mail</label>
            <input
              type="text"
              placeholder="Sorasit@mail.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
              className="w-full px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#196C2E] placeholder-gray-300 font-poppins"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div>
            <label className="font-poppins font-semibold text-gray-400 text-sm">Password</label>
            <input
              type="password"
              placeholder="********"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 8, message: "Password must be at least 8 characters" },
              })}
              className="w-full px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#196C2E] placeholder-gray-300 font-poppins"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <div>
            <label className="font-poppins font-semibold text-gray-400 text-sm">Confirm Password</label>
            <input
              type="password"
              placeholder="********"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) => value === watch("password") || "Passwords don't match",
              })}
              className="w-full px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#196C2E] placeholder-gray-300 font-poppins"
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
          </div>

          <div>
            <label className="font-poppins font-semibold text-gray-400 text-sm">Gender</label>
            <div className="relative">
              <select
                {...register("gender", { required: "Please select your gender" })}
                className="w-full px-4 py-2 border border-gray-400 rounded-md bg-white text-gray-700 appearance-none focus:outline-none focus:ring-1 focus:ring-[#196C2E]"
              >
                <option value="" disabled selected>Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="lgbtq+">LGBTQ+</option>
              </select>
              {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}
              <div className="text-gray-400 absolute inset-y-0 right-3 flex items-center pointer-events-none">▼</div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#196C2E] text-white py-2 rounded-lg hover:bg-green-900 transition"
          >
            <div className="flex flex-col justify-center items-center font-bold font-poppins mt-1">Register</div>
          </button>
        </form>

        <p className="text-center mt-4 text-gray-600">
          Do you already have an account?{' '}
          <Link to="/login" className="text-[#196C2E] font-semibold underline">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;