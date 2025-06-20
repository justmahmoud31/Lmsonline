import React, { useEffect } from "react";
import {
  FaBirthdayCake,
  FaCity,
  FaMapMarkerAlt,
  FaPhone,
  FaQrcode,
  FaUser,
  FaVenusMars,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../Components/Shared/Loading/Loading";
import { getMyData } from "../../Store/Apis/Profile/GetProfile/getProfileApi";
import { AppDispatch, RootState } from "../../Store/store";
import SidebarLayout from "../../Components/Shared/SidebarLayout";

const Profile: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { profileData, loading, error } = useSelector(
    (state: RootState) =>
      state.profile as {
        profileData: {
          firstName: string;
          lastName: string;
          phoneNumber: string;
          gender: "MALE" | "FEMALE";
          dob: string;
          address: string;
          city: string;
          zipCode: string;
          qrCode: string;
          username: string;
          role: string;
        };
        loading: boolean;
        error: string | null;
      }
  );

  useEffect(() => {
    dispatch(getMyData());
  }, [dispatch]);

  return (
    <>
      <SidebarLayout>
        <div className="p-12  mx-auto bg-white rounded-xl shadow-md mt-10 font-main">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            بيانات الحساب
          </h2>

          {loading ? (
            <div className="flex justify-center items-center my-12">
              <Loading />
            </div>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : profileData ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 text-right">
              <InfoRow icon={<FaUser />} label="الاسم">
                {profileData.firstName} {profileData.lastName}
              </InfoRow>
              <InfoRow icon={<FaPhone />} label="رقم الهاتف">
                {profileData.phoneNumber}
              </InfoRow>
              <InfoRow icon={<FaVenusMars />} label="النوع">
                {profileData.gender === "MALE" ? "ذكر" : "أنثى"}
              </InfoRow>
              <InfoRow icon={<FaBirthdayCake />} label="تاريخ الميلاد">
                {new Date(profileData.dob).toLocaleDateString("ar-EG")}
              </InfoRow>
              <InfoRow icon={<FaMapMarkerAlt />} label="العنوان">
                {profileData.address}
              </InfoRow>
              <InfoRow icon={<FaCity />} label="المدينة">
                {profileData.city}
              </InfoRow>
              <InfoRow label="الرمز البريدي">{profileData.zipCode}</InfoRow>
              <InfoRow icon={<FaQrcode />} label="رمز QR">
                {profileData.qrCode}
              </InfoRow>
              <InfoRow label="اسم المستخدم">{profileData.username}</InfoRow>
              <InfoRow label="الدور">{profileData.role}</InfoRow>
            </div>
          ) : (
            <p className="text-center text-gray-500">لا توجد بيانات لعرضها.</p>
          )}
        </div>
      </SidebarLayout>
    </>
  );
};

export default Profile;

const InfoRow = ({
  icon,
  label,
  children,
}: {
  icon?: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) => (
  <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-3">
    {icon && <div className="text-main text-lg">{icon}</div>}
    <div className="flex-1 text-sm">
      <span className="block text-gray-500 font-medium">{label}</span>
      <span className="block">{children}</span>
    </div>
  </div>
);
