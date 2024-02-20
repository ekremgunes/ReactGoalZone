import React from 'react'
import Teams from "../components/Teams";
import { useParams } from 'react-router-dom';


const TeamsPage = () => {
  const { strTeam } = useParams();
  //url useparam ile strteam alınıp tek takım gösterilebilir


  return (
    <>
    <Teams></Teams>
    </>
    
  )
}
export default TeamsPage;