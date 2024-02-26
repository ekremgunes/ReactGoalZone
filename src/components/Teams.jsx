import React from 'react'
import '../../public/assets/css/Teams.css'; // CSS dosyasını import et
import { useEffect, useState } from "react";
import Loading from './layout/Loading.jsx';

const TeamsForSelect = () => {
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/competitions/PL/teams');
                const data = await response.json();
                setTeams(data.teams);
            } catch (error) {
                console.error('Veri getirme hatası:', error);
                return <div>Teams not found on server..</div>

            }
        };

        fetchData();
    }, []);
        

    if (teams.length <= 0) {
        return <Loading/>
    }
    return (
        <React.Fragment>

            <div className='teamsForSelect '>
                <div className='row pt-3' id='teams'>
                    {teams.map((team) => (
                        <div key={team.idTeam} className="">
                            <div className="widget-next-match ">

                                <div className="widget-body mb-3">
                                    <div className="widget-vs">
                                        <div className="d-flex align-items-center justify-content-around justify-content-between w-100">
                                            <div className="team-1 text-center">
                                                <img src={team.crest} alt="Image" />
                                                <h3>{team.shortName}</h3>
                                            </div>


                                        </div>
                                    </div>
                                </div>

                                <div className="text-center widget-vs-contents mb-4">
                                    <h4>{team.strLeague}</h4>
                                    <p className="mb-1">
                                        <span className="d-block">Founded in {team.intFormedYear}</span>
                                        <strong className="text-primary">{team.strStadium}</strong>
                                    </p>
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