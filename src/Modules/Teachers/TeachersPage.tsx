import React, { useEffect } from "react";
import line from "../../assets/Line 2.png";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Store/store";
import { getAllTeachers } from "../../Store/Apis/Teachers/getTeachersApi";
import Loading from "../../Components/Shared/Loading/Loading";
import TeacherCard from "../../Components/Teachers-Components/Teacher-Card";
import teacherpic from '../../assets/TeahcerPic.png'
export const TeachersPage: React.FC = () => {
  const { teachers, teachersError, teachersLoading } = useSelector(
    (state: RootState) => state.teacher
  );
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getAllTeachers());
  }, [dispatch]);
  return (
    <>
      <div className="flex justify-center items-center flex-col my-12">
        <div className="flex flex-col justify-center items-center">
          <h2 className="text-2xl font-bold">المدرسين</h2>
          <img src={line} className="w-1/2" />
        </div>
        {teachersLoading ? (
          <div className="flex justify-center items-center">
            <Loading />
          </div>
        ) : (
          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1">
            {teachers.map((teacher) => {
              return (
                <TeacherCard
                  name={teacher.firstName + teacher.lastName}
                  subject="مادة"
                  image={teacherpic}
                />
              );
            })}
          </div>
        )}
        {teachersError && <p>{teachersError}</p>}
      </div>
    </>
  );
};
