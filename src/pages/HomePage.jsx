import Standings from "../components/Standings";
import LastGame from "../components/LastGame";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NextGame from "../components/NextGame";
import Loading from "../components/layout/Loading";
import { useCompetition } from "../context/CompetititonContext.jsx";

const HomePage = () => {
  const id = useSelector((state) => state.user.id);
  const competition = useSelector((state) => state.user.competition);
  const { contextValues } = useCompetition();
  const [sliderBgClass, setSliderBgClass] = useState("");
  const [textSliderValue, setTextSliderValue] = useState("");


  useEffect(() => {
    setSliderBgClass(contextValues.sliderBgClass);
  }, [contextValues]);


  useEffect(() => {
    if (competition) {
      console.log(competition)
      switch (competition) {
        case "CL":
          setTextSliderValue("UCL Night");
          break;
        case "EL":
          setTextSliderValue("UEL Night");

          break;
        default:
          setTextSliderValue("Premier");
          break;
      }
    }
  }, [competition, id]);

  

  if (!id) {
    return <Loading />;
  }

  return (
    <>
      <div className={`hero overlay ${sliderBgClass}`} id="bg-img-overlay">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-4 ml-auto">
              <h2 className="text-white">{textSliderValue}</h2>
              <p>You can see live match results, scorers, upcoming matches and standings on our website. Discuss with people about the matches via our live chat!</p>
              <p>
                <a href="#" className="btn btn-primary py-3 px-4 mr-3">
                  Scorers
                </a>
                <a href="#" className="more light">
                  Learn More
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

       <LastGame />  

      <div className="site-section bg-dark">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
               <NextGame /> 
            </div>
            <div className="col-lg-6">
               <Standings id={id} /> 
            </div>
          </div>
        </div>
      </div>

   

    </>
  );
};
export default HomePage;
