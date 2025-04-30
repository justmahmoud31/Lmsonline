import React, { useCallback, useReducer } from "react";
import toast from "react-hot-toast";
import { FiLock, FiPhone } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import loginPic from "../../assets/bro.png";
import Footer from "../../Components/Shared/Footer";
import { loginUser } from "../../Store/Apis/Auth/Login/LoginApi";
import { AppDispatch, RootState } from "../../Store/store";
import { FiEye, FiEyeOff } from "react-icons/fi";
const initialState = {
  phoneNumber: "",
  password: "",
  useCodeLogin: false,
};

type State = typeof initialState;
type Action =
  | { type: "SET_PHONE"; payload: string }
  | { type: "SET_PASSWORD"; payload: string };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_PHONE":
      return { ...state, phoneNumber: action.payload };
    case "SET_PASSWORD":
      return { ...state, password: action.payload };
    default:
      return state;
  }
}

const Login: React.FC = () => {
  const [state, dispatchForm] = useReducer(reducer, initialState);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);

  const { phoneNumber, password } = state;
  const { loading } = useSelector((state: RootState) => state.login);

  const handleLogin = useCallback(async () => {
    if (!phoneNumber || !password) {
      return toast.error("يرجى ملء جميع الحقول");
    }

    try {
      const result = await dispatch(
        loginUser({ phoneNumber, password })
      ).unwrap();
      toast.success("تم تسجيل الدخول بنجاح!");

      if (result.access_token) {
        navigate("/");
      }
    } catch (err: any) {
      toast.error(err || "حدث خطأ أثناء تسجيل الدخول");
    }
  }, [phoneNumber, password, dispatch, navigate]);

  return (
    <>
      <div
        className="font-main flex items-center justify-center bg-gray-50 "
        dir="rtl"
      >
        <div className="flex flex-col md:flex-row w-full overflow-hidden bg-white lg:py-4 py-12">
          {/* Right Side - Illustration */}
          <div className="hidden md:flex items-center justify-center w-1/2 p-6">
            <img
              src={loginPic}
              alt="Login Illustration"
              className="max-w-full h-auto"
            />
          </div>

          {/* Left Side - Form */}
          <div className="w-full md:w-1/2 p-8 md:p-12">
            <h1 className="text-2xl font-bold mb-2 text-gray-800 text-center">
              تسجيل الدخول
            </h1>
            <p className="text-sm text-gray-500 mb-6 text-center">
              ادخل على حسابك بإدخال رقم الهاتف و كلمة المرور المسجل بهم من قبل
            </p>

            {/* Phone Input */}
            <InputField
              icon={<FiPhone className="text-gray-500 mr-2" />}
              placeholder="رقم الهاتف"
              value={phoneNumber}
              onChange={(e) =>
                dispatchForm({ type: "SET_PHONE", payload: e.target.value })
              }
            />

            {/* Password Input */}
            <InputField
              icon={<FiLock className="text-gray-500" />}
              type={showPassword ? "text" : "password"}
              placeholder="كلمة المرور"
              value={password}
              onChange={(e) =>
                dispatchForm({ type: "SET_PASSWORD", payload: e.target.value })
              }
              showPasswordToggle
              isPasswordVisible={showPassword}
              onTogglePassword={() => setShowPassword((prev) => !prev)}
            />

            {/* Login Button */}
            <div className="flex justify-center">
              <button
                disabled={loading}
                onClick={handleLogin}
                className="lg:w-1/4 w-1/2 py-2 bg-main text-white font-semibold rounded-3xl cursor-pointer shadow-md hover:shadow-lg transition duration-200 disabled:opacity-50"
              >
                {loading ? "جاري الدخول..." : "تسجيل الدخول"}
              </button>
            </div>

            {/* Links */}
            <AuthLinks />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;

// Reusable InputField Component
type InputFieldProps = {
  icon: React.ReactNode;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  showPasswordToggle?: boolean;
  isPasswordVisible?: boolean;
  onTogglePassword?: () => void;
};

const InputField: React.FC<InputFieldProps> = ({
  icon,
  placeholder,
  value,
  onChange,
  type = "text",
  showPasswordToggle = false,
  isPasswordVisible = false,
  onTogglePassword,
}) => (
  <div className="mb-6 relative">
    <div className="border-b border-gray-400 focus-within:border-indigo-700 flex items-center pr-2">
      <input
        type={type}
        className="flex-1 py-2 bg-transparent outline-none text-right placeholder-gray-500"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        dir="rtl"
      />
      {showPasswordToggle && onTogglePassword ? (
        <button
          type="button"
          onClick={onTogglePassword}
          className="ml-2 text-gray-500"
        >
          {isPasswordVisible ? <FiEyeOff /> : <FiEye />}
        </button>
      ) : (
        icon
      )}
    </div>
  </div>
);

// Auth Footer Links
const AuthLinks: React.FC = () => (
  <>
    <div className="text-sm mt-6 text-right">
      هل نسيت كلمة السر؟{" "}
      <Link to="/forgot-password" className="text-main underline font-bold">
        اضغط هنا
      </Link>
    </div>
    <div className="text-sm mt-6 text-right">
      لا يوجد لديك حساب؟{" "}
      <Link to="/register" className="text-main underline font-bold">
        أنشئ حسابك الآن!
      </Link>
    </div>
  </>
);
