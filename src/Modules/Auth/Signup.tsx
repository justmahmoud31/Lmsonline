import { MenuItem, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { FiLock, FiPhone, FiUser } from "react-icons/fi";
import { IoSchoolOutline } from "react-icons/io5";
import { MdLocationOn } from "react-icons/md";
import signupImage from "../../assets/registerpic.png"; // Replace with your actual image
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Store/store";
import { getPresets } from "../../Store/Apis/Persets/getPersets";

const Signup: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { grades, stages } = useSelector((state: RootState) => state.presets);

  useEffect(() => {
    dispatch(getPresets({ entity: "GRADE" }));
    dispatch(getPresets({ entity: "STAGE" }));
  }, [dispatch]);
  return (
    <div
      className="font-main flex flex-col md:flex-row justify-center items-center bg-gray-50 min-h-screen"
      dir="rtl"
    >
      {/* Left Side - Image */}
      <div className="hidden md:flex justify-center items-center w-1/2 p-6">
        <img
          src={signupImage}
          alt="Signup Illustration"
          className="max-w-full h-auto"
        />
      </div>
      {/* Right Side - Form */}
      <div className="w-full md:w-1/2 p-6 md:p-12 ">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
          طلب إنشاء حساب
        </h2>
        <p className="text-sm text-gray-600 mb-6 text-center">
          أدخل بياناتك بشكل صحيح وسيتم التواصل معك خلال ساعات قليلة لتفعيل
          الحساب!
        </p>

        <form className="space-y-4">
          <div className="flex gap-4">
            <Input label="الاسم الأول" icon={<FiUser />} />
            <Input label="الاسم الأخير" icon={<FiUser />} />
          </div>

          <div className="flex gap-4">
            <Input label="رقم الهاتف" icon={<FiPhone />} />
            <Input label="رقم ولي الأمر" icon={<FiPhone />} />
          </div>
          <div className="flex gap-4">
            <Select
              label="الصف الدراسي"
              icon={<MdLocationOn />}
              options={grades.map((preset) => preset.name) || []}
            />
            <Select
              label="المرحلة الدراسية"
              icon={<IoSchoolOutline />}
              options={stages.map((preset) => preset.name) || []}
            />
          </div>

          <Input label="كلمة السر" icon={<FiLock />} type="password" />
          <Input label="تأكيد كلمة السر" icon={<FiLock />} type="password" />

          <div className="text-center pt-4">
            <button className="bg-main px-8 py-2 rounded-full text-white cursor-pointer">
              طلب إنشاء حساب
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
}: {
  label: string;
  icon: React.ReactNode;
  type?: string;
}) => (
  <div className="w-full relative">
    {/* <label className="text-sm text-gray-600 block mb-1">{label}</label> */}
    <div className="flex items-center border-b border-gray-400 focus-within:border-indigo-700">
      <input
        type={type}
        className="flex-1 py-2 pr-2 bg-transparent outline-none text-right placeholder-gray-500"
        placeholder={label}
      />
      <div className="text-gray-500">{icon}</div>
    </div>
  </div>
);

// Reusable Select Component
const Select = ({
  label,
  icon,
  options,
}: {
  label: string;
  icon: React.ReactNode;
  options: string[];
}) => {
  const [value, setValue] = React.useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <div className="w-full relative">
      <label className="text-sm text-gray-600 block mb-1">{label}</label>
      <div className="flex items-center border-b border-gray-400 focus-within:border-indigo-700">
        <TextField
          select
          fullWidth
          variant="standard"
          value={value} // ✅ value now handled
          onChange={handleChange} // ✅ updates value
          placeholder={label}
          InputProps={{ disableUnderline: true }}
          className="text-right"
        >
          <MenuItem value="">اختر</MenuItem>
          {options?.map((option, idx) => (
            <MenuItem key={idx} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <div className="text-gray-500">{icon}</div>
      </div>
    </div>
  );
};
