import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "../components/layout/Loading";
import NextGames from "../components/NextGames";
import { useCompetition } from "../context/CompetititonContext.jsx";

const initialData = {
  id: 0,
  name: "",
  shortName: "",
  crest: "",
  founded: 1880,
  venue: "",
  runningCompetitions: [],
  coach: {
    id: 0,
    name: "",
  },
  squad: [],
};

const initalSquad = [];

const Team = (props) => {
  const { teamId } = props;
  const id = useSelector((state) => state.user.id);
  const [team, setTeam] = useState(initialData);
  const [squad, setSquad] = useState(initalSquad);
  const [coach, setCoach] = useState({ position: "Manager" });
  const [loading, setLoading] = useState(true);
  const [apiUrl, setApiUrl] = useState("");
  const { contextValues } = useCompetition();
  const [sliderBgClass, setSliderBgClass] = useState("");

  useEffect(() => {
    setSliderBgClass(contextValues.sliderBgClass);

  }, [contextValues]);

  useEffect(() => {
    teamId == null || teamId == undefined
      ? setApiUrl(`/api/teams/${id}`)
      : setApiUrl(`/api/teams/${teamId}`);
  }, [id, teamId]);

  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (!data && data.name) {
        setLoading(true);
        return;
      }
      setTeam(() => ({
        ...data,
        name: data.name.replace(" FC", ""),
      }));
      setCoach((prev) => ({
        ...prev,
        id: data.coach.id,
        name: data.coach.name,
      }));
      setSquad(data.squad);
      setLoading(false);
    } catch (error) {
      console.error("Veri getirme hatası:", error);
      setLoading(true);
    }
  };

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const updatedSquad = await Promise.all(
          team.squad.map(async (player) => {
            const playerResponse = await fetch(
              `/sports/searchplayers.php?p=${encodeURIComponent(
                player.name
              )}&t=${team.name}`
            );
            const playerData = await playerResponse.json();
            if (!playerData.player) {
              return player;
            }

            return {
              ...player,
              name: player.name,
              img: playerData.player ? playerData.player[0].strCutout : "",
            };
          })
        );

        const updatedCoachResponse = await fetch(
          `/sports/searchplayers.php?p=${encodeURIComponent(
            team.coach.name
          )}&t=${team.name}`
        );
        const coachData = await updatedCoachResponse.json();
        if (!coachData.player) {
          throw coachData.error;
        }
        var updatedCoach = {
          ...coach,
          img: coachData.player[0].strCutout
            ? coachData.player[0].strCutout
            : "",
        };
        setCoach(updatedCoach);
        setSquad([updatedCoach, ...updatedSquad]);
      } catch (error) {
        console.log(error + " error TEAM");
        setLoading(true);
      }
    };

    if (team.squad.length > 0) {
      fetchTeamData();
    }
  }, [team.coach.name, team.name]);

  useEffect(() => {
    fetchData(apiUrl);
  }, [apiUrl]);

  const navigateToPlayer = (name) => {
    alert(name);
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
              <img src={team.crest} alt="Image" className="img-fluid" />
            </div>
            <div className="col-lg-4 ">
              <h2 className="text-white">{team.shortName}</h2>
              <p>{`${team.name} , founded at ${team.founded}. Their stadium is ${team.venue}`}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="site-section bg-dark">
        <div className="container">
          <div className="row mb-5">
            <div className="col-12 title-section">
              <h2 className="heading">Competitions</h2>
            </div>
            <div className="col-lg-12">
              {team.runningCompetitions.length == 0
                ? Array.from({ length: 3 }).map((_, index) => (
                    <div
                      key={index}
                      className="playerCircle loading-effect-player competition"
                    >
                      <img src={"../../public/assets/images/cup.png"}></img>
                      <p className="position">...</p>
                    </div>
                  ))
                : team.runningCompetitions
                    .sort((a, b) => (b.id ? 1 : -1))
                    .map((competition) => (
                      <div
                        key={competition.id}
                        className="playerCircle competition"
                      >
                        <img
                          src={
                            competition.emblem
                              ? competition.emblem
                              : "../../public/assets/images/cup.png"
                          }
                        ></img>
                        <p>{competition.name}</p>
                        <p className="position">{competition.type}</p>
                      </div>
                    ))}
            </div>
          </div>

          <div className="row mb-5">
            <div className="col-12 title-section">
              <h2 className="heading">Team</h2>
            </div>
            <div className="col-lg-12">
              {squad.length == 0
                ? Array.from({ length: 6 }).map((_, index) => (
                    <div
                      key={index}
                      className="playerCircle loading-effect-player"
                    >
                      <img src={"../../public/assets/images/player.png"}></img>
                      <p className="position">...</p>
                    </div>
                  ))
                : squad
                    .sort((a, b) => (b.img ? 1 : -1))
                    .sort((a, b) =>
                      b.position == "Goalkeeper" && b.img ? 1 : -1
                    )
                    .sort((a, b) => (b.position == "Manager" ? 1 : -1))
                    .map((player) => (
                      <div key={player.id} className="playerCircle">
                        <img
                          onClick={() => {
                            navigateToPlayer(player.name);
                          }}
                          src={
                            player.img
                              ? player.img
                              : "../../public/assets/images/player.png"
                          }
                        ></img>
                        <p>{player.name}</p>
                        <p className="position">{player.position}</p>
                      </div>
                    ))}
            </div>
          </div>

          <div className="row">
            <div className="col-12 title-section">
              <h2 className="heading">Upcoming Match</h2>
            </div>

            <NextGames />
          </div>
        </div>
      </div>
    </>
  );
};

export default Team;
