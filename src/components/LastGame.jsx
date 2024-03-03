import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../helpers/helpers.js";

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
  const competition = useSelector((state) => state.user.competition);
  const [lastGame, setLastGame] = useState(initialGameData);
  const [loading, setLoading] = useState(true);

  const [classNameScoreBg, setclassNameScoreBg] = useState("");
  const [scoreContent, setScoreContent] = useState("");
  const [goalAnimation, setGoalAnimation] = useState(false);
  var fetchInterval = null;

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
        setScoreContent(`${lastGame.homeScore} - ${lastGame.awayScore}`);

        setLoading(false);
      } catch (error) {
        console.error("Veri getirme hatası:", error);
        setLoading(true);
      }
    };

    fetchData();

    if (lastGame.status == "IN_PLAY") {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      fetchInterval = setInterval(() => {
        fetchData();
      }, 30000);

      return () => {
        clearInterval(fetchInterval);
      };
    } else if (lastGame.status == "PAUSED") {
      fetchInterval = setInterval(() => {
        fetchData();
      }, 90000);

      return () => {
        clearInterval(fetchInterval);
      };
    }

    if (competition && id) {
      switch (competition) {
        case "UCL":
          setclassNameScoreBg("ucl_score_bg");
          break;
        case "UEL":
          setclassNameScoreBg("uel_score_bg");

          break;
        default:
          setclassNameScoreBg("pl_score_bg");
          break;
      }
    }
  }, [id]);

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

  if (loading) {
    return <></>;
  }

  return (
    <div className="container">
      <div className="row d-flex justify-content-center">
        <div className="col-lg-11">
          <div className={`d-flex team-vs ${classNameScoreBg}`}>
            <span
              className={`score ${goalAnimation ? "goalAnimation" : ""}`}
              id="gameScore"
            >
              {scoreContent}
            </span>
            <span
              className="score"
              style={{ top: "8%", fontSize: "13px", letterSpacing: "2px" }}
            >
              {lastGame.status != "IN_PLAY"
                ? lastGame.status == "FINISHED"
                  ? "FULL TIME"
                  : lastGame.status
                : `LIVE🔴'`}
            </span>
            <span className="score" style={{ top: "16%", fontSize: "9px" }}>
              {lastGame.awayScoreFH != null && lastGame.homeScoreFH != null
                ? `FH(${lastGame.homeScoreFH} - ${lastGame.awayScoreFH})`
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
