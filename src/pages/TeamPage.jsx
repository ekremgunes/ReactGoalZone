import React from 'react'
import Team from "../components/Team";
import { useParams } from 'react-router-dom';
import { NavLink } from "react-router-dom";


const TeamPage = () => {
  const { id } = useParams();
  //url useparam ile strteam alınıp tek takım gösterilebilir
  console.log("id **** "+id)

  return (
    <>
      <Team></Team>
    </>
    
  )
}
export default TeamPage;