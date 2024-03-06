import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const initialGameData = {
  homeTeamImage: "",
  awayTeamImage: "",
  homeTeam: "",
  awayTeam: "",
  competition: "",
  date: "",
  matchWeek: 0,
  venue: "",
  stage:""
};

const formatDate = (utcDate) => {
  const options = {
    weekday: "long",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  return new Date(utcDate).toLocaleString("en-US", options);
};

const NextGames = () => {
  const id = useSelector((state) => state.user.id);
  const [nextGames, setNextGames] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `/api/teams/${id}/matches?status=SCHEDULED&limit=4`
      );
      const data = await response.json();
      if (!data.matches) {
        setLoading(true);
        return;
      }
      const games = data.matches.map((match) => ({
        ...initialGameData,
        date: match.utcDate,
        homeTeamImage: match.homeTeam.crest,
        awayTeamImage: match.awayTeam.crest,
        homeTeam: match.homeTeam.shortName,
        awayTeam: match.awayTeam.shortName,
        competition: match.competition.name,
        matchWeek: match.matchday,
        venue:match.venue,
        stage:match.stage
      }));
      setNextGames(games);
      setLoading(false);
    } catch (error) {
      console.error("Veri getirme hatası:", error);
      setLoading(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  if (loading) {
    return <></>;
  }

  return (
    <div className="widget-next-match row">
      {nextGames.map((game, index) => (
        <div key={index} className="widget-item col-6 mb-3 col-xs-12">
          <div className="widget-title">
            <h3> {`${game.stage != "REGULAR_SEASON" ? game.stage.replace("_"," ") : `Match Week ${game.matchWeek}`}`}</h3>
          </div>
          <div className="widget-body mb-3">
            <div className="widget-vs">
              <div className="d-flex align-items-center justify-content-around justify-content-between w-100">
                <div className="team-1 text-center">
                  <img src={game.homeTeamImage} alt="Resim" />
                  <h3>{game.homeTeam}</h3>
                </div>
                <div>
                  <span className="vs">
                    <span>VS</span>
                  </span>
                </div>
                <div className="team-2 text-center">
                  <img src={game.awayTeamImage} alt="Resim" />
                  <h3>{game.awayTeam}</h3>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center widget-vs-contents mb-4">
            <h4>{game.competition}</h4>
            <p className="mb-5">
              <span className="d-block">{formatDate(game.date)}</span>
              <strong className="text-primary">{game.venue}</strong>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NextGames;
