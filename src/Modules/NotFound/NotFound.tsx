import React from "react";
import { Link } from "react-router-dom";
import notfound from '../../assets/notfound.png'
const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-6">
      <img
        src={notfound}
        alt="404 Not Found"
        className="max-w-xs sm:max-w-md mb-8"
      />
      <h1 className="text-3xl font-bold mb-2 text-gray-800">الصفحة غير موجودة</h1>
      <p className="text-gray-600 mb-6">
        عذرًا، لم نتمكن من العثور على الصفحة التي تبحث عنها.
      </p>
      <Link
        to="/"
        className="px-6 py-2 rounded-full bg-main text-white  transition"
      >
        العودة إلى الرئيسية
      </Link>
    </div>
  );
};

export default NotFound;
