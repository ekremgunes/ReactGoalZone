import React from 'react'
import Standings from "../components/Standings";
import LastGame from "../components/LastGame";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../store/user";


const HomePage = () => {
  const id = useSelector((state) => state.user.id);
  const id_LS = localStorage.getItem("id");
  const shortName_LS = localStorage.getItem("shortName");
  const { updateUserTeam } = userActions;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (id_LS == null) {
      navigate("/starter");
    } else {
      if (!id) {
        dispatch(updateUserTeam({ id: id_LS , shortName:shortName_LS}))
      }
    }

  }, []);
  return (
    <>

      <div className="hero overlay" id='bg-img-overlay'>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5 ml-auto">
              <h1 className="text-white">World Cup</h1>
              <p>The excitement of the 2026 World Cup is with you!</p>
              <div id="date-countdown"></div>
              <p>
                <a href="#" className="btn btn-primary py-3 px-4 mr-3">Book Ticket</a>
                <a href="#" className="more light">Learn More</a>
              </p>
            </div>
          </div>
        </div>
      </div>





      <LastGame/>



      <div className="site-section bg-dark">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="widget-next-match">
                <div className="widget-title">
                  <h3>Next Match</h3>
                </div>
                <div className="widget-body mb-3">
                  <div className="widget-vs">
                    <div className="d-flex align-items-center justify-content-around justify-content-between w-100">
                      <div className="team-1 text-center">
                        <img src="/assets/images/logo_1.png" alt="Image" />
                        <h3>Football League</h3>
                      </div>
                      <div>
                        <span className="vs"><span>VS</span></span>
                      </div>
                      <div className="team-2 text-center">
                        <img src="/assets/images/logo_2.png" alt="Image" />
                        <h3>Soccer</h3>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center widget-vs-contents mb-4">
                  <h4>World Cup League</h4>
                  <p className="mb-5">
                    <span className="d-block">December 20th, 2020</span>
                    <span className="d-block">9:30 AM GMT+0</span>
                    <strong className="text-primary">New Euro Arena</strong>
                  </p>

                  <div id="date-countdown2" className="pb-1"></div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <Standings id={id}/>
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