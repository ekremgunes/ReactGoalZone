import Team from "../components/Team";
import { useParams } from "react-router-dom";
import { useSelector,  } from "react-redux";
import Loading from "../components/layout/Loading";

const TeamPage = () => {
  const id = useSelector((state) => state.user.id);
  const { teamId } = useParams();

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
