import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { getProfile, updateProfile } from "../api/userApi";

const AccountSetting = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, formState: { errors }, getValues } = useForm();
  const [loading, setLoading] = useState(true);

  // โหลดข้อมูลผู้ใช้เมื่อเปิดหน้า
  useEffect(() => {
    getProfile()
      .then(res => {
        const user = res.data;
        setValue("firstname", user.firstname);
        setValue("lastname", user.lastname);
        setValue("email", user.email);
        // ไม่ preload password เพื่อความปลอดภัย
        setValue("password", "");
        setValue("confirmPassword", "");
      })
      .finally(() => setLoading(false));
  }, [setValue]);

  const onSubmit = async (data) => {
    try {
      // ส่งข้อมูลที่อัปเดตไปยัง backend
      await updateProfile(data);
      Swal.fire({
        title: "Account Updated!",
        text: "Your account details have been updated successfully.",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#196C2E",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/homepage");
        }
      });
    } catch (err) {
      Swal.fire("Update Failed", err.response?.data?.message || err.message, "error");
    }
  };

  if (loading) return <div className="text-center p-10">Loading...</div>;

  return (
    <div className="h-screen bg-[#196C2E] flex items-center justify-center overflow-hidden">
      <div className="w-full max-w-6xl bg-white p-10 shadow-lg rounded-lg border border-gray-300">
        <div className="w-full text-center mb-5">
          <span className="font-poppins inline-block bg-gradient-to-r from-[#196C2E] to-[#196C2E] bg-clip-text text-transparent text-3xl font-bold">
            Account Setting
          </span>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-7 overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-poppins font-semibold text-gray-400 text-sm"> Firstname </label>
              <input
                type="text"
                {...register("firstname", { required: "Firstname is required" })}
                className="placeholder-gray-400 font-poppins w-full px-4 py-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#196C2E]"
              />
              {errors.firstname && <p className="text-red-500 text-sm font-poppins">{errors.firstname.message}</p>}
            </div>
            <div>
              <label className="font-poppins font-semibold text-gray-400 text-sm"> Lastname </label>
              <input
                type="text"
                {...register("lastname", { required: "Lastname is required" })}
                className="placeholder-gray-400 font-poppins w-full px-4 py-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#196C2E]"
              />
              {errors.lastname && <p className="text-red-500 text-sm font-poppins">{errors.lastname.message}</p>}
            </div>
          </div>

          <div>
            <label className="font-poppins font-semibold text-gray-400 text-sm"> E-mail </label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
              className="placeholder-gray-400 font-poppins w-full px-4 py-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#196C2E]"
            />
            {errors.email && <p className="text-red-500 text-sm font-poppins">{errors.email.message}</p>}
          </div>

          <div>
            <label className="font-poppins font-semibold text-gray-400 text-sm"> Password </label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 8, message: "Password must be at least 8 characters" },
              })}
              className="placeholder-gray-400 font-poppins w-full px-4 py-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#196C2E]"
            />
            {errors.password && <p className="text-red-500 text-sm font-poppins">{errors.password.message}</p>}
          </div>

          <div>
            <label className="font-poppins font-semibold text-gray-400 text-sm"> Confirm Password </label>
            <input
              type="password"
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                validate: (value) =>
                  value === getValues("password") || "Passwords don't match",
              })}
              className="placeholder-gray-400 font-poppins w-full px-4 py-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#196C2E]"
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm font-poppins">{errors.confirmPassword.message}</p>}
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full max-w-sm bg-[#196C2E] text-white py-3 rounded-lg hover:bg-[#145025] transition font-bold font-poppins mt-4"
            >
              Save
            </button>
          </div>
          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className=" w-full max-w-sm border border-gray-400 bg-white text-[#196C2E] py-3 rounded-lg hover:bg-gray-100 transition font-bold font-poppins"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountSetting;
