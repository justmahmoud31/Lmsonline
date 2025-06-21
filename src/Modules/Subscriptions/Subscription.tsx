import axios from "axios";
import { useEffect, useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import Loading from "../../Components/Shared/Loading/Loading";
import SidebarLayout from "../../Components/Shared/SidebarLayout";

function Subscription() {
  const [orders, setUserOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const getUserOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_BASEURL}/api/orders`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserOrders(response.data.data);
    } catch (error) {
      console.error("فشل في جلب الطلبات", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loading />
      </div>
    );
  }

  return (
    <SidebarLayout>
      <div className="min-h-screen  py-8 px-4 sm:px-6 lg:px-8 text-right">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">اشتراكاتي</h1>

        {orders.length === 0 ? (
          <div className="text-center text-gray-500">لا يوجد اشتراكات.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders.map((order: any) => (
              <Card key={order.id} className="shadow-md">
                <CardContent>
                  <Typography variant="h6" component="div" className="mb-2">
                    رقم الدورة: {order.courseId}
                  </Typography>

                  <p  className="mb-2 text-gray-600">
                    الحالة: {order.status === "PENDING" ? "قيد الانتظار" : order.status}
                  </p>

                  <Typography variant="body2" className="mb-2">
                    <strong>السعر الكلي:</strong> ${order.totalPrice}
                  </Typography>

                  <Typography variant="body2" className="mb-2">
                    <strong>عدد الدروس:</strong> {order.Course._count.Lesson}
                  </Typography>

                  <Typography variant="body2" className="mb-2">
                    <strong>عدد الأجزاء:</strong> {order.Course._count.Part}
                  </Typography>

                  <p className="text-gray-600">
                    تم الإنشاء في: {new Date(order.createdAt).toLocaleString("ar-EG")}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </SidebarLayout>
  );
}

export default Subscription;
