import React from 'react'
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../helpers/helpers.js";

const LastGame = () => {
  // const idTeam = useSelector((state) => state.user.idTeam);
  // const [lastGame, setLastGame] = useState({});
  // const [teams, setTeams] = useState([]);
  // const [matches, setMatches] = useState([]);
  
  // var currentDate = new Date();  
  // var currentYear = currentDate.getFullYear();
  // var season = (currentDate.getMonth() >= 5) ? `${currentYear}-${currentYear + 1}` : `${currentYear - 1}-${currentYear}`;
  
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(`https://www.thesportsdb.com/api/v1/json/3/eventsround.php?id=4328&r=${round}&s=${season}`);
  //       const data = await response.json();

  //       setMatches(data.events);
  //     } catch (error) {
  //       console.error('Veri getirme hatası:', error);
  //       return <div>Teams not found on server..</div>

  //     }
  //   };

  //   fetchData();

  //   const fetchTeamsData = async () => {
  //     try {
  //       const response = await fetch('https://api.football-data.org/v4/competitions/PL/teams',{
  //         headers : {
  //           "x-auth-token": ""
  //         }
  //       });
  //       const data = await response.json();
  //       setTeams(data.teams);
  //     } catch (error) {
  //       console.error('Veri getirme hatası:', error);
  //       return <div>Teams not found on server..</div>

  //     }
  //   };

  //   fetchTeamsData();
  // }, []);


  // const currentWeek = findCurrentWeek(matches);
  // console.log(`Şu anda ${currentWeek}. haftadasınız.`);


  // // console.log(lastGame)

  // var model = {
  //   homeTeamName:lastGame.strHomeTeam,
  //   homeScore:lastGame.intHomeScore,
  //   awayTeamName:lastGame.strAwayTeam,
  //   awayScore:lastGame.intAwayScore,
  //   homeBadge:"",
  //   awayBadge:"",
  // }
  return (

    <div className="container">


      {/* <div className="row">
        <div className="col-lg-12">

          <div className="d-flex team-vs">
            <span className="score">{model.homeScore} - {model.awayScore}</span>
            <div className="team-1 w-50">
              <div className="team-details w-100 text-center">
                <img src="/assets/images/logo_1.png" alt="Image" className="img-fluid" />
                <h3>{model.homeTeamName} <span></span></h3>

              </div>
            </div>
            <div className="team-2 w-50">
              <div className="team-details w-100 text-center">
                <img src="/assets/images/logo_2.png" alt="Image" className="img-fluid" />
                <h3>{model.awayTeamName} <span></span></h3>

              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  )
}

export default LastGame