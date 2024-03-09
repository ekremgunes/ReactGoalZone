import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import React from "react";
import { userActions } from "../store/user";

import "../helpers/helpers.js";
import { useCompetition } from "../context/CompetititonContext.jsx";

const initialGameData = {
  status: "",
  homeTeamImage: "",
  awayTeamImage: "",
  homeTeam: "",
  awayTeam: "",
  homeScore: 0,
  homeScoreFH: 0,
  awayScore: 0,
  awayScoreFH: 0,
  duration: "",
};

const LastGame = () => {
  const id = useSelector((state) => state.user.id);
  const user = useSelector((state) => state.user);
  const [lastGame, setLastGame] = useState(initialGameData);
  const [loading, setLoading] = useState(true);
  const [scoreContent, setScoreContent] = useState("");
  const [goalAnimation, setGoalAnimation] = useState(false);
  const { contextValues } = useCompetition();
  const [scoreBgClass, setScoreBgClass] = useState("");
  const [totalHomeScore, setTotalHomeScore] = useState(0);
  const [totalAwayScore, setTotalAwayScore] = useState(0);
  const [tour, setTour] = useState(0);
  const { updateUserTeam } = userActions;
  const dispatch = useDispatch();

  useEffect(() => {
    setScoreBgClass(contextValues.scoreBgClass);
  }, [contextValues]);

  //goal animation
  useEffect(() => {
    if (
      lastGame.status == "IN_PLAY" &&
      lastGame.homeScore + lastGame.awayScore > 0
    ) {
      setScoreContent("⚽");

      setTimeout(() => {
        setGoalAnimation(true);

        setTimeout(() => {
          setScoreContent(`${lastGame.homeScore} - ${lastGame.awayScore}`);
        }, 1050); // Adjust the delay according to your needs
      }, 1000);

      setTimeout(() => {
        setGoalAnimation(false);
      }, 4000);
    }
  }, [lastGame.awayScore, lastGame.homeScore]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/api/teams/${id}/matches?status=IN_PLAY,PAUSED,FINISHED&limit=1`
        );
        const data = await response.json();
        if (!data.matches) {
          setLoading(true);
          return;
        }
        if (
          data.matches[0].area.code == "EUR" &&
          data.matches[0].matchday == 2 &&
          data.matches[0].id
        ) {
          const responseH2H = await fetch(
            `/api/matches/${data.matches[0].id}/head2head?limit=2`
          );
          const dataH2H = await responseH2H.json();
          setTour(data.matches[0].matchday);
          setTotalHomeScore(dataH2H.matches[1].score.fullTime.away);
          setTotalAwayScore(dataH2H.matches[1].score.fullTime.home);
        }

        var newuser = {
          ...user,
          competition: data.matches[0].competition.code,
        };
        dispatch(updateUserTeam(newuser));

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
          duration: data.matches[0].score.duration,
        });
        setScoreContent(
          `${data.matches[0].score.fullTime.home} - ${data.matches[0].score.fullTime.away}`
        ); // Move this line here
        setLoading(false);
      } catch (error) {
        console.error("Veri getirme hatası:", error);
        setLoading(true);
      }
    };

    fetchData();

    if (lastGame.status == "IN_PLAY") {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      setInterval(() => {
        console.log("girdi");
        fetchData();
      }, 20000);
    } else if (lastGame.status == "PAUSED") {
      setInterval(() => {
        fetchData();
      }, 90000);
    }
  }, [id, lastGame.status]);

  if (loading) {
    return <></>;
  }

  return (
    <div className="container">
      <div className="row d-flex justify-content-center">
        <div className="col-lg-11">
          <div className={`d-flex team-vs ${scoreBgClass}`}>
            <span
              className={`score ${goalAnimation ? "goalAnimation" : ""}`}
              id="gameScore"
            >
              {scoreContent}
            </span>
            <span
              className="score"
              style={{ top: "7%", fontSize: "13px", letterSpacing: "2px" }}
            >
              {lastGame.status != "IN_PLAY"
                ? lastGame.status == "FINISHED"
                  ? "FULL TIME"
                  : lastGame.status
                : <><span>LIVE</span><span className='redDotScore'>🔴</span></>}
            </span>
            <span className="score" style={{ top: "14.5%", fontSize: "7.5px" }}>
              {lastGame.awayScoreFH != null && lastGame.homeScoreFH != null
                ? `FH(${lastGame.homeScoreFH} - ${lastGame.awayScoreFH})`
                : ""}
            </span>
            <span className="score" style={{ top: "92%", fontSize: "11px" }}>
              {tour == 2
                ? `Agg(${lastGame.homeScore + totalHomeScore} - ${
                    lastGame.awayScore + totalAwayScore
                  })`
                : ""}
            </span>

            <div className="team-1 w-50">
              <div className="team-details w-100 text-center">
                <img
                  src={lastGame.homeTeamImage}
                  alt="Image"
                  className="img-fluid"
                />
                <h3>
                  {lastGame.homeTeam} <span></span>
                </h3>
              </div>
            </div>
            <div className="team-2 w-50">
              <div className="team-details w-100 text-center">
                <img
                  src={lastGame.awayTeamImage}
                  alt="Image"
                  className="img-fluid"
                />
                <h3>
                  {lastGame.awayTeam} <span></span>
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LastGame;
