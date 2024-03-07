import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "../components/layout/Loading";
import { useCompetition } from "../context/CompetititonContext.jsx";

const ScorersPage = () => {
  const competition = useSelector((state) => state.user.competition);
  const { contextValues } = useCompetition();
  const [sliderBgClass, setSliderBgClass] = useState("");
  const [loading, setLoading] = useState(true);
  const [logo, setLogo] = useState("");
  const [players, setplayers] = useState([]);

  useEffect(() => {
    setSliderBgClass(contextValues.sliderBgClass);
    setLogo(contextValues.logo);
  }, [contextValues]);

  const fetchPlayers = async () => {
    try {
      const response = await fetch(`/api/competitions/${competition}/scorers`);
      const data = await response.json();

      console.log(data.scorers);
      if (!data.scorers) {
        setLoading(true);
        return;
      }

      setplayers(data.scorers);
      setLoading(false);
    } catch (error) {
      console.error("Veri getirme hatası:", error);
      setLoading(true);
    }
  };
  const fetchPlayerData = async () => {
    try {
      const updatedPlayers = await Promise.all(
        players.map(async (player) => {
          console.log(player.player.name);
          console.log(player.team.name);
          const playerResponse = await fetch(
            `/sports/searchplayers.php?p=${encodeURIComponent(
              player.player.name
            )}`
          );
          const playerData = await playerResponse.json();

          if (!playerData.player[0]) {
            return player;
          }

          return {
            ...player,
            img: playerData ? playerData.player[0].strCutout : "",
          };
        })
      );
      if (updatedPlayers.length > 0) {
        console.log("girdi");
        console.log(updatedPlayers);
        setplayers(updatedPlayers);
      }
    } catch (error) {
      console.log(error + " error TEAM");
      setLoading(true);
    }
  };

  // useEffect(() => {
  //   fetchPlayers();
  //   if (players.length > 0) {
  //     fetchPlayerData();
  //   }
  // }, [competition]);

  // if (loading) {
  //   return <Loading />;
  // }

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

      <div className="site-section bg-dark" >
        <div className="container">
          <div className="row mb-5">
            <div className="col-12 ">
              <table id="scorersTable">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Player</th>
                    <th>Age</th>
                    <th>Team</th>
                    <th>Played</th>
                    <th>Assisted</th>
                    <th>Scored</th>
                  </tr>
                </thead>
                <tbody>

                <tr>
                  <td>1</td>
                  <td>
                    <img
                    width={"65rem"}

                      src="https://www.thesportsdb.com/images/media/player/cutout/n20bkp1693858058.png"
                      alt="Player"
                    />
                    <p>Rasmus Hojlund</p>
                  </td>
                  <td>22 </td>
                  <td>Manchester United FC</td>
                  <td> 8</td>
                  <td> 8</td>
                  <td> 11</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>
                    <img
                    width={"65rem"}
                      src="https://www.thesportsdb.com/images/media/player/cutout/n20bkp1693858058.png"
                      alt="Player"
                    />
                    <p>Rasmus Hojlund</p>
                  </td>
                  <td>22 </td>
                  <td>Manchester United </td>
                  <td> 8</td>
                  <td> 8</td>
                  <td> 11</td>
                </tr>

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
