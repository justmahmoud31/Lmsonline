import line from "../../../assets/Line.png";
import Books from "../../../assets/Books.png";
import courses from "../../../assets/courses.png";
import exams from "../../../assets/exams.png";
const Offer: React.FC = () => {
  const offerItems = [
    {
      sections: "قسم الكتب",
      pic: Books,
      color: "#FFDFF2",
    },
    {
      sections: "قسم الكورسات",
      pic: courses,
      color: "#CDE5F6",
    },
    {
      sections: "قسم الاختبارات",
      pic: exams,
      color: "#F0FFC3",
    },
  ];
  return (
    <>
      <div className="flex lg:justify-evenly justify-center items-center mb-10 font-main">
        <div className="lg:flex sm:hidden"></div>
        <h2 className="text-2xl font-bold">ما نقدمة لك في منصة 100% اونلاين</h2>
        <img src={line} className="lg:mt-40 lg:flex hidden" />
      </div>
      <div className="grid lg:grid-cols-3 grid-cols-1 lg:gap-24 gap-12 p-4 lg:px-24 font-main">
        {offerItems.map((item, index) => (
          <div
            key={index}
            className="flex flex-col justify-center items-center gap-4 my-4 p-4 rounded-lg"
            style={{ backgroundColor: item.color }}
          >
            <h3 className="text-xl font-bold">{item.sections}</h3>
            <img src={item.pic} alt={item.sections} className="w-1/2" />
          </div>
        ))}
      </div>
    </>
  );
};
export default Offer;
