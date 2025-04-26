import Footer from "../../Components/Shared/Footer";
import Courses from "./Home-Components/Courses";
import Hero from "./Home-Components/Hero";
import Offer from "./Home-Components/Offer";
import Subjects from "./Home-Components/Subjects";
import Teachers from "./Home-Components/Teachers";

function Home() {
  return (
    <>
      <Hero />
      <Offer />
      <Teachers />
      <Courses />
      <Subjects />
      <Footer />
    </>
  );
}

export default Home;
