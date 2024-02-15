import React from 'react'

const HomePage = () => {
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

    
    
    <div className="container">
      

      <div className="row">
        <div className="col-lg-12">
          
          <div className="d-flex team-vs">
            <span className="score">4-1</span>
            <div className="team-1 w-50">
              <div className="team-details w-100 text-center">
                <img src="/assets/images/logo_1.png" alt="Image" className="img-fluid"/>
                <h3>LA LEGA <span>(win)</span></h3>/
                <ul className="list-unstyled">
                  <li>Anja Landry (7)</li>
                  <li>Eadie Salinas (12)</li>
                  <li>Ashton Allen (10)</li>
                  <li>Baxter Metcalfe (5)</li>
                </ul>
              </div>
            </div>
            <div className="team-2 w-50">
              <div className="team-details w-100 text-center">
                <img src="/assets/images/logo_2.png" alt="Image" className="img-fluid"/>
                <h3>JUVENDU <span>(loss)</span></h3>
                <ul className="list-unstyled">
                  <li>Macauly Green (3)</li>
                  <li>Arham Stark (8)</li>
                  <li>Stephan Murillo (9)</li>
                  <li>Ned Ritter (5)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  

  
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
                      <img src="/assets/images/logo_1.png" alt="Image"/>
                      <h3>Football League</h3>
                    </div>
                    <div>
                      <span className="vs"><span>VS</span></span>
                    </div>
                    <div className="team-2 text-center">
                      <img src="/assets/images/logo_2.png" alt="Image"/>
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
            
            <div className="widget-next-match">
              <table className="table custom-table">
                <thead>
                  <tr>
                    <th>P</th>
                    <th>Team</th>
                    <th>W</th>
                    <th>D</th>
                    <th>L</th>
                    <th>PTS</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td><strong className="text-white">Football League</strong></td>
                    <td>22</td>
                    <td>3</td>
                    <td>2</td>
                    <td>140</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td><strong className="text-white">Soccer</strong></td>
                    <td>22</td>
                    <td>3</td>
                    <td>2</td>
                    <td>140</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td><strong className="text-white">Juvendo</strong></td>
                    <td>22</td>
                    <td>3</td>
                    <td>2</td>
                    <td>140</td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td><strong className="text-white">French Football League</strong></td>
                    <td>22</td>
                    <td>3</td>
                    <td>2</td>
                    <td>140</td>
                  </tr>
                  <tr>
                    <td>5</td>
                    <td><strong className="text-white">Legia Abante</strong></td>
                    <td>22</td>
                    <td>3</td>
                    <td>2</td>
                    <td>140</td>
                  </tr>
                  <tr>
                    <td>6</td>
                    <td><strong className="text-white">Gliwice League</strong></td>
                    <td>22</td>
                    <td>3</td>
                    <td>2</td>
                    <td>140</td>
                  </tr>
                  <tr>
                    <td>7</td>
                    <td><strong className="text-white">Cornika</strong></td>
                    <td>22</td>
                    <td>3</td>
                    <td>2</td>
                    <td>140</td>
                  </tr>
                  <tr>
                    <td>8</td>
                    <td><strong className="text-white">Gravity Smash</strong></td>
                    <td>22</td>
                    <td>3</td>
                    <td>2</td>
                    <td>140</td>
                  </tr>
                </tbody>
              </table>
            </div>

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
              <img src="/assets/images/img_1.jpg" alt="Image" className="img-fluid"/>
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
              <img src="/assets/images/img_2.jpg" alt="Image" className="img-fluid"/>
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
              <img src="/assets/images/img_3.jpg" alt="Image" className="img-fluid"/>
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
              <img src="/assets/images/img_1.jpg" alt="Image" className="img-fluid"/>
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
              <img src="/assets/images/img_2.jpg" alt="Image" className="img-fluid"/>
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
              <img src="/assets/images/img_3.jpg" alt="Image" className="img-fluid"/>
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