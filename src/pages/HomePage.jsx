import Standings from "../components/Standings";
import LastGame from "../components/LastGame";
import { useEffect ,useState} from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../store/user";
import NextGame from '../components/NextGame';
import Loading from '../components/layout/Loading';
import { useCompetition } from "../context/CompetititonContext.jsx";


const HomePage = () => {
  const id = useSelector((state) => state.user.id);
  const competition = useSelector((state) => state.user.competition);
  const id_LS = localStorage.getItem("id");
  const shortName_LS = localStorage.getItem("shortName");
  const competition_LS = localStorage.getItem("competition");
  const { updateUserTeam } = userActions;
  const { contextValues } = useCompetition();
  const [sliderBgClass, setSliderBgClass] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  let textSliderValue = "Premier"

  
  useEffect(() => {
    setSliderBgClass(contextValues.sliderBgClass);
  }, [contextValues]);
  
  useEffect(() => {
    if (id_LS == null) {
      navigate("/starter");
    } else {
      if (!id) {
        dispatch(updateUserTeam({ id: id_LS, shortName: shortName_LS, competition: competition_LS }))
      }
    }

    if (competition && id) {
      switch (competition) {
        case "UCL":
          textSliderValue = "UCL Night"
          break;
        case "UEL":
          textSliderValue = "UEL Night"

          break;
        default:
          textSliderValue = "Premier"
          break;
      }
    }


  }, [id]);

  if (!id) {
    return <Loading />
  }


  return (
    <>

      <div className={`hero overlay ${sliderBgClass}`} id='bg-img-overlay'>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-4 ml-auto">
              <h1 className="text-white" >{textSliderValue}</h1>
              <p>The excitement of the 2026 World Cup is with you!</p>
              <p>
                <a href="#" className="btn btn-primary py-3 px-4 mr-3">Book Ticket</a>
                <a href="#" className="more light">Learn More</a>
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
               {/* <NextGame />  */}
            </div>
            <div className="col-lg-6">
               {/* <Standings id={id} />  */}
            </div>
          </div>
        </div>
      </div>

      <div className="site-section">
        <div className="container">
          <div className="row">
            <div className="col-6 title-section">
              <h2 className="heading">Videos</h2>
            </div>
            <div className="col-6 text-right">
              <div className="custom-nav">
                <a href="#" className="js-custom-prev-v2"><span className="icon-keyboard_arrow_left"></span></a>
                <span></span>
                <a href="#" className="js-custom-next-v2"><span className="icon-keyboard_arrow_right"></span></a>
              </div>
            </div>
          </div>


          <div className="owl-4-slider owl-carousel">
            <div className="item">
              <div className="video-media">
                <img src="/assets/images/img_1.jpg" alt="Image" className="img-fluid" />
                <a href="https://vimeo.com/139714818" className="d-flex play-button align-items-center" data-fancybox>
                  <span className="icon mr-3">
                    <span className="icon-play"></span>
                  </span>
                  <div className="caption">
                    <h3 className="m-0">Dogba set for Juvendu return?</h3>
                  </div>
                </a>
              </div>
            </div>
            <div className="item">
              <div className="video-media">
                <img src="/assets/images/img_2.jpg" alt="Image" className="img-fluid" />
                <a href="https://vimeo.com/139714818" className="d-flex play-button align-items-center" data-fancybox>
                  <span className="icon mr-3">
                    <span className="icon-play"></span>
                  </span>
                  <div className="caption">
                    <h3 className="m-0">Kai Nets Double To Secure Comfortable Away Win</h3>
                  </div>
                </a>
              </div>
            </div>
            <div className="item">
              <div className="video-media">
                <img src="/assets/images/img_3.jpg" alt="Image" className="img-fluid" />
                <a href="https://vimeo.com/139714818" className="d-flex play-button align-items-center" data-fancybox>
                  <span className="icon mr-3">
                    <span className="icon-play"></span>
                  </span>
                  <div className="caption">
                    <h3 className="m-0">Romolu to stay at Real Nadrid?</h3>
                  </div>
                </a>
              </div>
            </div>

            <div className="item">
              <div className="video-media">
                <img src="/assets/images/img_1.jpg" alt="Image" className="img-fluid" />
                <a href="https://vimeo.com/139714818" className="d-flex play-button align-items-center" data-fancybox>
                  <span className="icon mr-3">
                    <span className="icon-play"></span>
                  </span>
                  <div className="caption">
                    <h3 className="m-0">Dogba set for Juvendu return?</h3>
                  </div>
                </a>
              </div>
            </div>
            <div className="item">
              <div className="video-media">
                <img src="/assets/images/img_2.jpg" alt="Image" className="img-fluid" />
                <a href="https://vimeo.com/139714818" className="d-flex play-button align-items-center" data-fancybox>
                  <span className="icon mr-3">
                    <span className="icon-play"></span>
                  </span>
                  <div className="caption">
                    <h3 className="m-0">Kai Nets Double To Secure Comfortable Away Win</h3>
                  </div>
                </a>
              </div>
            </div>
            <div className="item">
              <div className="video-media">
                <img src="/assets/images/img_3.jpg" alt="Image" className="img-fluid" />
                <a href="https://vimeo.com/139714818" className="d-flex play-button align-items-center" data-fancybox>
                  <span className="icon mr-3">
                    <span className="icon-play"></span>
                  </span>
                  <div className="caption">
                    <h3 className="m-0">Romolu to stay at Real Nadrid?</h3>
                  </div>
                </a>
              </div>
            </div>

          </div>

        </div>
      </div>

    </>
  )
}
export default HomePage;