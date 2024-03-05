import Team from "../components/Team";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../store/user";
import Loading from "../components/layout/Loading";

const TeamPage = () => {
  const id = useSelector((state) => state.user.id);
  const { teamId } = useParams();
  const id_LS = localStorage.getItem("id");
  const shortName_LS = localStorage.getItem("shortName");
  const competition_LS = localStorage.getItem("competition");
  const { updateUserTeam } = userActions;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (id_LS == null) {
      navigate("/starter");
    } else {
      if (!id) {
        dispatch(
          updateUserTeam({
            id: id_LS,
            shortName: shortName_LS,
            competition: competition_LS,
          })
        );
      }
    }

  }, [id]);

  if (!id) {
    return <Loading />;
  }

  return (
    <>
      <Team teamId={teamId} />
    </>
  );
};

export default TeamPage;
