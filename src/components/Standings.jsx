import React from 'react'
import { useCallback, useEffect, useState } from "react";

const Standings = (props) => {
    const [standingsTable, setStandings] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/competitions/PL/standings');
                const data = await response.json();
                setStandings(data.standings[0].table);
                console.log(data.standings[0].table);
            } catch (error) {
                console.error('Veri getirme hatası:', error);
            }
        };

        fetchData();
    }, []); 

    
    return (
        <div className="widget-next-match" id='standingsTable'>

            <table className="table custom-table">
                <thead>
                    <tr>
                        <th>P</th>
                        <th>Team</th>
                        <th>W</th>
                        <th>D</th>
                        <th>L</th>
                        <th>GD</th>
                        <th>PTS</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        
                        standingsTable.map((row) => (
                                
                            <tr key={row.team.id} className={row.team.id == props.id ? "selectedTeam" : ""}>
                                <td>{row.position}</td>
                                <td><strong className="text-white">{row.team.shortName}</strong></td>
                                <td>{row.won}</td>
                                <td>{row.draw}</td>
                                <td>{row.lost}</td>
                                <td>{row.goalDifference}</td>
                                <td>{row.points}</td>
                            </tr>

                        ))
                    }


                </tbody>
            </table>
        </div>
    )
}

export default Standings