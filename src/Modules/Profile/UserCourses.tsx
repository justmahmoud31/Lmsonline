import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Store/store";
import { useEffect } from "react";
import { fetchOrders } from "../../Store/Apis/Courses/getCoursesApi";
import Loading from "../../Components/Shared/Loading/Loading";
import { Card, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import SidebarLayout from "../../Components/Shared/SidebarLayout";
import courseImg from "../../assets/subject.png";
function UserCourses() {
  const dispatch = useDispatch<AppDispatch>();
  const { orders, loading, error } = useSelector(
    (state: RootState) => state.orders
  );

  useEffect(() => {
    dispatch(fetchOrders("SUCCESS"));
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loading />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-600">{error}</div>;
  }

  return (
    <SidebarLayout>
      <div className="lg:min-h-screen py-8 px-4 sm:px-6 lg:px-8 text-right">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">دوراتي</h1>

        {orders.length === 0 ? (
          <div className="text-center text-gray-500">
            لا يوجد دورات مشترك بها.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders.map((order: any) => (
              <Link to={`/courses/${order.courseId}`} key={order.id}>
                <Card className="shadow-md hover:shadow-lg transition duration-200">
                  <img
                    src={courseImg}
                    alt="صورة الدورة"
                    className="w-full h-[150px]   rounded-t-md"
                  />
                  <CardContent>
                    <Typography variant="h6" component="div" className="mb-2">
                      اسم الدورة: {order.Course.name}
                    </Typography>

                    <p className="mb-2 text-gray-600">
                      الحالة:{" "}
                      {order.status === "SUCCESS" ? "تم الدفع" : order.status}
                    </p>

                    <Typography variant="body2" className="mb-2">
                      <strong>السعر الكلي:</strong> {order.totalPrice} د.ك
                    </Typography>

                    <Typography variant="body2" className="mb-2">
                      <strong>عدد الدروس:</strong> {order.Course._count.Lesson}
                    </Typography>

                    <Typography variant="body2" className="mb-2">
                      <strong>عدد الأجزاء:</strong> {order.Course._count.Part}
                    </Typography>

                    <p className="text-gray-600">
                      تم الإنشاء في:{" "}
                      {new Date(order.createdAt).toLocaleString("ar-EG")}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </SidebarLayout>
  );
}

export default UserCourses;
