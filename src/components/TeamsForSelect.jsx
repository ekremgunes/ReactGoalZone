import React from 'react'
import { userActions } from "../store/user";
import '../../public/assets/css/TeamsForSelect.css'; // CSS dosyasını import et
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loading from './layout/Loading.jsx';
import { useNavigate } from "react-router-dom";

const TeamsForSelect = () => {
    const [teams, setTeams] = useState([]);
    const [teamName, setTeamName] = useState("");
    const { updateUserTeam } = userActions;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        document.body.style.overflowY = "hidden";
        const fetchData = async () => {
            try {
                const response = await fetch('https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?l=English%20Premier%20League');
                const data = await response.json();
                setTeams(data.teams);
            } catch (error) {
                console.error('Veri getirme hatası:', error);
                return <div>Teams not found on server..</div>

            }
        };

        fetchData();
    }, []);

    const updateUserTeams = (strTeam, elementId) => {
        var teamDiv = document.getElementById(elementId)

        var selectedTeams = document.getElementsByClassName("selected")
        if (selectedTeams.length > 0) {
            Array.from(selectedTeams).forEach(element => {
                element.classList.remove("selected")
            });
        }

        setTeamName(strTeam)
        teamDiv.classList.add("selected")
        var btn = document.getElementById("saveBtn")
        btn.style.display = "flex"

    }

    const updateUserTeamHandler = () => {
        if (!teamName) {
            return alert("Bir takım seçiniz")
        }
        dispatch(updateUserTeam({ strTeam: teamName }))
        navigate("/")
    }


    const scrollToTeamsSection = () => {
        var targetElement = document.getElementById("teams");
        var mainSection = document.querySelector(".content");
        document.body.style.overflowY = "visible";

        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
        setTimeout(() => {
            mainSection.remove();
        }, 280);

    }



    if (teams.length <= 0) {
        return <Loading />
    }
    return (
        <React.Fragment>



            <main className="content" data-form-type="card">
                <a href="#!" className="btn" onClick={() => scrollToTeamsSection()}>
                    <span className="btn__circle"></span>
                    <span className="btn__white-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" id="icon-arrow-right" viewBox="0 0 21 12">
                            <path d="M17.104 5.072l-4.138-4.014L14.056 0l6 5.82-6 5.82-1.09-1.057 4.138-4.014H0V5.072h17.104z"></path>
                        </svg>
                    </span>
                    <span className="btn__text">Let's Select Your Team!</span>
                </a>
            </main>

            <div id='saveBtn'>
                <p id='saveBtnInner' onClick={() => updateUserTeamHandler()}>Save</p>
            </div>

            <div className='teamsForSelect '>
                <div className='row pt-3' id='teams'>
                    {teams.sort((a, b) => a.intFormedYear - b.intFormedYear).map((team) => (
                        <div className="widget-next-match team " id={"team" + team.idTeam} onClick={() => updateUserTeams(team.strTeam, "team" + team.idTeam)} key={team.idTeam}>

                            <div className="widget-body mb-3">
                                <div className="widget-vs">
                                    <div className="d-flex align-items-center justify-content-around justify-content-between w-100">
                                        <div className="team-1 text-center">
                                            <img src={team.strTeamBadge} alt="Image" />
                                            <h3>{team.strTeam}</h3>
                                        </div>


                                    </div>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </React.Fragment>
    )
}

export default TeamsForSelect