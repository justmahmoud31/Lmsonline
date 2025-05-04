import { MenuItem, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FiLock, FiPhone, FiUser } from "react-icons/fi";
import { IoSchoolOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import signupImage from "../../assets/registerpic.png";
import { getPresets } from "../../Store/Apis/Persets/getPersets";
import { AppDispatch, RootState } from "../../Store/store";

const Signup: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { grades, stages } = useSelector((state: RootState) => state.presets);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    stageId: "",
    address: "",
    city: "",
    zipCode: "",
    dob: "",
    gender: "MALE",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    guardianPhone: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(getPresets({ entity: "GRADE" }));
    dispatch(getPresets({ entity: "STAGE" }));
  }, [dispatch]);

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return toast.error("كلمتا السر غير متطابقتين");
    }

    const requestBody = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      stageId: Number(formData.stageId),
      address: formData.address || "N/A",
      city: formData.city || "N/A",
      zipCode: formData.zipCode || "00000",
      dob: formData.dob || new Date().toISOString(),
      gender: formData.gender,
      password: formData.password,
      phoneNumber: formData.phoneNumber,
    };

    try {
      setLoading(true);
      await axios.post(
        `${import.meta.env.VITE_BASEURL}/api/auth/signup`,
        requestBody
      );
      toast.success("تم إرسال الطلب بنجاح!");
      setFormData({
        firstName: "",
        lastName: "",
        stageId: "",
        address: "",
        city: "",
        zipCode: "",
        dob: "",
        gender: "MALE",
        password: "",
        confirmPassword: "",
        phoneNumber: "",
        guardianPhone: "",
      });
    } catch (err: any) {
      toast.error(err.response?.data?.message || "حدث خطأ أثناء التسجيل");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="font-main flex flex-col md:flex-row justify-center items-center bg-gray-50 min-h-screen"
      dir="rtl"
    >
      <Toaster />
      {/* Image */}
      <div className="hidden md:flex justify-center items-center w-1/2 p-6">
        <img
          src={signupImage}
          alt="Signup Illustration"
          className="max-w-full h-auto"
        />
      </div>

      {/* Form */}
      <div className="w-full md:w-1/2 p-6 md:p-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
          طلب إنشاء حساب
        </h2>
        <p className="text-sm text-gray-600 mb-6 text-center">
          أدخل بياناتك بشكل صحيح وسيتم التواصل معك خلال ساعات قليلة لتفعيل
          الحساب!
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex lg:flex-row flex-col gap-4">
            <Input
              label="الاسم الأول"
              icon={<FiUser />}
              value={formData.firstName}
              onChange={(val) => handleChange("firstName", val)}
            />
            <Input
              label="الاسم الأخير"
              icon={<FiUser />}
              value={formData.lastName}
              onChange={(val) => handleChange("lastName", val)}
            />
          </div>

          <div className="flex lg:flex-row flex-col gap-4">
            <Input
              label="رقم الهاتف"
              icon={<FiPhone />}
              value={formData.phoneNumber}
              onChange={(val) => handleChange("phoneNumber", val)}
            />
            <Input
              label="رقم ولي الأمر"
              icon={<FiPhone />}
              value={formData.guardianPhone}
              onChange={(val) => handleChange("guardianPhone", val)}
            />
          </div>

          <div className="flex gap-4">
            <Select
              label="المرحلة الدراسية"
              icon={<IoSchoolOutline />}
              options={stages}
              value={formData.stageId}
              onChange={(val) => handleChange("stageId", val)}
            />
          </div>

          <Input
            label="كلمة السر"
            icon={<FiLock />}
            type="password"
            value={formData.password}
            onChange={(val) => handleChange("password", val)}
          />
          <Input
            label="تأكيد كلمة السر"
            icon={<FiLock />}
            type="password"
            value={formData.confirmPassword}
            onChange={(val) => handleChange("confirmPassword", val)}
          />

          <div className="text-center pt-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-main px-8 py-2 rounded-full text-white cursor-pointer disabled:opacity-50"
            >
              {loading ? "جاري الإرسال..." : "طلب إنشاء حساب"}
            </button>
          </div>

          <p className="text-center text-sm text-gray-500 pt-4">
            يوجد لديك حساب بالفعل؟{" "}
            <a href="/login" className="text-main font-bold underline">
              اضغط لتسجيل الدخول الآن!
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;

// Reusable Input Component
const Input = ({
  label,
  icon,
  type = "text",
  value,
  onChange,
}: {
  label: string;
  icon: React.ReactNode;
  type?: string;
  value: string;
  onChange: (value: string) => void;
}) => (
  <div className="w-full relative">
    <div className="flex items-center border-b border-gray-400 focus-within:border-indigo-700">
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 py-2 pr-2 bg-transparent outline-none text-right placeholder-gray-500"
        placeholder={label}
      />
      <div className="text-gray-500">{icon}</div>
    </div>
  </div>
);

const Select = ({
  label,
  icon,
  options,
  value,
  onChange,
}: {
  label: string;
  icon: React.ReactNode;
  options: { id: number; name: string }[];
  value: string;
  onChange: (value: string) => void;
}) => {
  return (
    <div className="w-full relative">
      <label className="text-sm text-gray-600 block mb-1">{label}</label>
      <div className="flex items-center border-b border-gray-400 focus-within:border-indigo-700">
        <TextField
          select
          fullWidth
          variant="standard"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={label}
          InputProps={{ disableUnderline: true }}
          className="text-right"
        >
          <MenuItem value="">اختر</MenuItem>
          {options.map((option) => (
            <MenuItem key={option.id} value={option.id.toString()}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>
        <div className="text-gray-500">{icon}</div>
      </div>
    </div>
  );
};
