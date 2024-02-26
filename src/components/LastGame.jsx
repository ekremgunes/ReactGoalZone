import React from 'react'
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../helpers/helpers.js";

const initialGameData = {
  status: '',
  homeTeamImage: '',
  awayTeamImage: '',
  homeTeam: '',
  awayTeam: '',
  homeScore: 0,
  homeScoreFH: 0,
  awayScore: 0,
  awayScoreFH: 0,
  duration: null,
};

const LastGame = () => {
  const id = useSelector((state) => state.user.id);
  const [lastGame, setLastGame] = useState(initialGameData);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/teams/${id}/matches?status=IN_PLAY,FINISHED&limit=1`);
        const data = await response.json()
        console.log(data)

        setLastGame({
          status: data.matches[0].status,
          homeTeamImage: data.matches[0].homeTeam.crest,
          awayTeamImage: data.matches[0].awayTeam.crest,
          homeTeam: data.matches[0].homeTeam.shortName,
          awayTeam: data.matches[0].awayTeam.shortName,
          homeScore: data.matches[0].score.fullTime.home,
          homeScoreFH: data.matches[0].score.halfTime.home,
          awayScore: data.matches[0].score.fullTime.away,
          awayScoreFH: data.matches[0].score.halfTime.away,
          duration:data.matches[0].score.duration,
        });
        setLoading(false);

      } catch (error) {
        console.error('Veri getirme hatası:', error);
        setLoading(true);
      }
    };

    fetchData();

    if (lastGame.status == "IN_PLAY") {
      var fetchInterval = setInterval(() => {
        fetchData();
      }, 10000);

      return () => { clearInterval(fetchInterval) }

    }

  }, [id]);

  if (loading) {
    return <></>;
  }

  return (

    <div className="container">


      <div className="row">
        <div className="col-lg-12">

          <div className="d-flex team-vs">
            <span className="score">{lastGame.homeScore} - {lastGame.awayScore}</span>
            <span className="score" style={{ top: "9%", fontSize: "13px", letterSpacing: "5px" }}>
              {lastGame.status != "IN_PLAY" ? lastGame.status : `${lastGame.duration}'`}
            </span>
            <span className="score" style={{ top: "16%", fontSize: "9px" }}>FH({lastGame.homeScoreFH} - {lastGame.awayScoreFH})</span>
            

            <div className="team-1 w-50">
              <div className="team-details w-100 text-center">
                <img src={lastGame.homeTeamImage} alt="Image" className="img-fluid" />
                <h3>{lastGame.homeTeam} <span></span></h3>

              </div>
            </div>
            <div className="team-2 w-50">
              <div className="team-details w-100 text-center">
                <img src={lastGame.awayTeamImage} alt="Image" className="img-fluid" />
                <h3>{lastGame.awayTeam} <span></span></h3>

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

  )
}

export default LastGame