import React from 'react'
import Teams from "../components/Teams";
import { useParams } from 'react-router-dom';


const TeamPage = () => {
  const { idTeam } = useParams();
  //url useparam ile strteam alınıp tek takım gösterilebilir


  return (
    <>
    <Team></Team>
    </>
    
  )
}
export default TeamPage;