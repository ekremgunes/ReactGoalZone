import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "../components/layout/Loading";
import { useCompetition } from "../context/CompetititonContext.jsx";
import { useNavigate } from "react-router-dom";

const calculateAge = (birthdate) => {
  // Verilen doğum tarihini ayrıştır
  const birthDateArray = birthdate.split("-");
  const birthYear = parseInt(birthDateArray[0], 10);
  const birthMonth = parseInt(birthDateArray[1], 10);
  const birthDay = parseInt(birthDateArray[2], 10);

  // Bugünkü tarihi al
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // JavaScript'te aylar 0'dan başlar
  const currentDay = currentDate.getDate();

  // Doğum günü henüz gelmediyse yaş bir azaltılır
  const age =
    currentMonth > birthMonth ||
    (currentMonth === birthMonth && currentDay >= birthDay)
      ? currentYear - birthYear
      : currentYear - birthYear - 1;
  return age;
};

const ScorersPage = () => {
  const competition = useSelector((state) => state.user.competition);
  const { contextValues } = useCompetition();
  const [sliderBgClass, setSliderBgClass] = useState("");
  const [loading, setLoading] = useState(true);
  const [logo, setLogo] = useState("");
  const [players, setplayers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setSliderBgClass(contextValues.sliderBgClass);
    setLogo(contextValues.logo);
  }, [contextValues]);

  const fetchPlayers = async () => {
    try {
      const response = await fetch(`/api/competitions/${competition}/scorers`);
      const data = await response.json();

      if (!data.scorers) {
        setLoading(true);
        return;
      }

      fetchPlayerData(data.scorers);
      setLoading(false);
    } catch (error) {
      console.error("Veri getirme hatası:", error);
      setLoading(true);
    }
  };
  const fetchPlayerData = async (scorers) => {
    try {
      const updatedPlayers = await Promise.all(
        scorers.map(async (player) => {
          const playerResponse = await fetch(
            `/sports/searchplayers.php?p=${encodeURIComponent(
              player.player.name
            )}`
          );
          const playerData = await playerResponse.json();
          if (playerData.player == null) {
            return player;
          }

          return {
            ...player,
            img: playerData ? playerData.player[0].strCutout : "",
          };
        })
      );
      if (updatedPlayers.length > 0) {
        setplayers(updatedPlayers);
      }
    } catch (error) {
      console.log(error + " error TEAM");
      // setLoading(true);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, [competition]);

  const navigateToPlayer = (name) => {
    if (!name) return;
    return navigate("/player/" + name);
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <div className={`hero overlay ${sliderBgClass}`} id="bg-img-overlay">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-2 ">
              <img
                src={`/public/assets/images/${logo}`}
                alt="Image"
                className="img-fluid"
              />
            </div>
            <div className="col-lg-4 ">
              <h2 className="text-white">{`Top Scorers in ${competition}`}</h2>
              <p>{`Top 10 Scorers in ${competition}`}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="site-section bg-dark">
        <div className="container">
          <div className="row mb-5">
            <div className="col-12 flexbaby">
              <table id="scorersTable">
                <thead>
                  <tr>
                    <th>Player</th>
                    <th>Age</th>
                    <th>Team</th>
                    <th>Played</th>
                    <th>Assisted</th>
                    <th>Scored</th>
                  </tr>
                </thead>
                <tbody>
                  {!players ? (
                    <tr className="text-center w-100">Loading . .</tr>
                  ) : (
                    players.map((row) => (
                      <tr key={row.id}>
                        <td
                          className="cursor-pointer"
                          onClick={() => navigateToPlayer(row.player.name)}
                        >
                          {players[0].goals == row.goals ? (
                            <img
                              src="/public/assets/images/king.png"
                              className="kingImg"
                            ></img>
                          ) : (
                            ""
                          )}

                          <img
                            src={
                              row.img
                                ? row.img
                                : "../../public/assets/images/player.png"
                            }
                            alt="Player"
                          />
                          <p>{row.player.name}</p>
                        </td>
                        <td>{calculateAge(row.player.dateOfBirth)} </td>
                        <td>{row.team.shortName} </td>
                        <td> {row.playedMatches}</td>
                        <td> {row.assists ? row.assists : "0"}</td>
                        <td>
                          {" "}
                          {`${row.goals} ${
                            row.penalties ? `(${row.penalties})` : ""
                          }`}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ScorersPage;
