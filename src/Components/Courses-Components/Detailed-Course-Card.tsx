import React, { useEffect, useState } from "react";
import { IoCalendarOutline } from "react-icons/io5";
import { getSignedVideoUrl } from "../../services/s3Service";
import Loading from "../Shared/Loading/Loading";
import { Link } from "react-router-dom";

interface CourseApiData {
  id: number;
  name: string;
  description: string;
  price: number;
  createdAt: Date;
  Image?: {
    path: string;
  };
  Teacher?: {
    firstName: string;
    lastName: string;
  };
}

interface DetaildCourseCardProps {
  course: CourseApiData;
}

const DetaildCourseCard: React.FC<DetaildCourseCardProps> = ({ course }) => {
  const {
    name,
    description,
    price,
    createdAt,
    Image,
    Teacher,
  } = course;
  const [loading, setLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState();
  useEffect(() => {
    if (Image?.path) {
      getSignedVideoUrl(Image.path).then((res) => {
        setImageUrl(res.data);
        setLoading(false);
      });
    }
  }, [Image]);


  // Instructor full name
  const instructorName = Teacher
    ? `${Teacher.firstName} ${Teacher.lastName}`
    : "غير معروف";

  return (
    <div className="bg-white rounded-xl rounded-lg font-main flex flex-col">
      {/* Image with rounded top */}
      {loading ? <div className="flex items-center justify-center">
        <Loading />
      </div> :
        <div className="relative top-12 w-full h-64 rounded-lg">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      }

      {/* Content */}
      <div className="p-4 z-400 space-y-2 bg-secondary flex flex-col justify-between h-60 w-19/20 rounded-lg mx-auto">
        {/* Price */}
        <div className="flex justify-between items-center w-full">
          <h3 className="text-md font-bold text-right">{name}</h3>
          <div className="bg-[#001E43] flex gap-2 text-white text-sm px-2 py-1 rounded-md w-fit">
            <p className="bg-white text-main rounded-sm px-1">
              {price.toFixed(2)}
            </p>
            دينارا
          </div>
        </div>

        {/* Instructor */}
        <h4 className="text-sm font-semibold text-gray-600 text-right">
          {instructorName}
        </h4>

        {/* Description */}
        <p className="text-gray-500 text-sm leading-relaxed text-right line-clamp-3">
          {description}
        </p>

        {/* Duration (creation date) */}
        <div className="flex items-center text-gray-500 text-sm gap-1 justify-end mt-1">
          <IoCalendarOutline size={16} />
          <span>{new Date(createdAt).toLocaleDateString("ar-EG")}</span>
        </div>

        {/* Buttons */}
        <div className="flex justify-center items-center mt-4">
          <Link to={`/course/${course.id}`} className="bg-main text-white lg:px-4 px-2 py-2 cursor-pointer rounded-2xl text-sm font-semibold hover:bg-main/90">
            اشترك الآن
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DetaildCourseCard;
