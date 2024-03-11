import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "../components/layout/Loading";
import { useCompetition } from "../context/CompetititonContext.jsx";
import { useParams } from "react-router-dom";

const PlayerPage = () => {
  const { playerName } = useParams();
  const competition = useSelector((state) => state.user.competition);
  const { contextValues } = useCompetition();
  const [sliderBgClass, setSliderBgClass] = useState("");
  const [loading, setLoading] = useState(true);
  const [logo, setLogo] = useState("");
  const [player, setplayer] = useState({});
  const [playerTeams, setplayerTeams] = useState();
  const [playerHonours, setplayerHonours] = useState();

  useEffect(() => {
    setSliderBgClass(contextValues.sliderBgClass);
    setLogo(contextValues.logo);
  }, [contextValues]);

  const fetchPlayerDetail = async () => {
    try {
      const response = await fetch(`/sports/searchplayers.php?p=${playerName}`);
      const data = await response.json();
      if (!data.player) {
        setLoading(true);
        return;
      }
      setplayer(data.player[0]);
    } catch (error) {
      console.error("Veri getirme hatası:", error);
      setLoading(true);
    }
  };

  const fetchPlayerTeams = async () => {
    try {
      const response = await fetch(
        `/sports/lookupformerteams.php?id=${player.idPlayer}`
      );
      const data = await response.json();

      if (data.formerteams == null) {
        return;
      }
      console.log(data);
      setplayerTeams(data.formerteams);
      setLoading(false);
    } catch (error) {
      console.error("Veri getirme hatası:", error);
      setLoading(true);
    }
  };

  const fetchPlayerHonours = async () => {
    try {
      const response = await fetch(
        `/sports/lookupmilestones.php?id=${player.idPlayer}`
      );
      const data = await response.json();
      if (data.milestones == null) {
        return;
      }
      setplayerHonours(data.milestones);
      setLoading(false);
    } catch (error) {
      console.error("Veri getirme hatası:", error);
      setLoading(true);
    }
  };

  useEffect(() => {
    fetchPlayerDetail();
  }, [playerName]);

  useEffect(() => {
    if (player.idPlayer) {
      fetchPlayerHonours();
      fetchPlayerTeams();
    }
  }, [player]);

  if (loading) {
    return <Loading />;
  }

  console.log(playerTeams);
  console.log(player);
  return (
    <>
      <div className={`hero overlay ${sliderBgClass}`} id="bg-img-overlay">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-2 ">
              <img src={player.strCutout} alt="Image" className="img-fluid" />
            </div>
            <div className="col-lg-4 ">
              <h2 className="text-white">{player.strPlayer}</h2>
              <p className="mb-0">{player.strPosition}</p>
              <p>{`${player.strTeam},${player.strTeam2} `}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="site-section bg-dark">
        <div className="container">
          {!playerTeams ? (
            ""
          ) : (
            <div className="row mb-5">
              <div className="col-12 title-section">
                <h2 className="heading">Former Teams</h2>
              </div>
              <div className="col-lg-12">
                {playerTeams.sort((a,b)=>a.strJoined-b.strJoined).map((team) => (
                  <div key={team.id} className="playerCircle competition">
                    <img src={team.strTeamBadge}></img>
                    <p>{`${team.strJoined}-${team.strDeparted}`}</p>
                    <p className="position">{team.strMoveType}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {!playerHonours ? (
            ""
          ) : (
            <div className="row mb-5">
              <div className="col-12 title-section">
                <h2 className="heading">Honours</h2>
              </div>
              <div className="col-lg-12">
                {playerHonours.map((honour) => (
                  <div
                    key={honour.id}
                    className="playerCircle competition honourImg"
                  >
                    <img src={honour.strMilestoneLogo}></img>
                    <p className="position">{honour.dateMilestone}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="row mb-5">
            <div className="col-12 title-section">
              <h2 className="heading">Who is {playerName}</h2>
            </div>
            <div className="col-lg-12">
              <p>{player.strDescriptionEN}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default PlayerPage;
