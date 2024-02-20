import React from 'react'
import { useCallback, useEffect, useState } from "react";

const Standings = (props) => {
    const [standingsTable, setStandings] = useState([]);

    var currentDate = new Date();  // Şu anki tarih
    var currentYear = currentDate.getFullYear();  // Yıl bilgisi
    var currentMonth = currentDate.getMonth();  // Ay bilgisi

    var season = "";

    if (currentMonth >= 5) {  // Haziran (indeksi 5) ve sonrası
        // Eğer tarih 30 Haziran'dan sonra ise aktif yılın ve bir sonraki yılın kombinasyonunu al
        season = currentYear + "-" + (currentYear + 1);
    } else {
        // Eğer tarih 30 Haziran öncesinde ise aktif yılın ve bir önceki yılın kombinasyonunu al
        season = (currentYear - 1) + "-" + currentYear;
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://www.thesportsdb.com/api/v1/json/3/lookuptable.php?l=4328&s=' + season); // API endpoint'inizi buraya ekleyin
                const data = await response.json();
                setStandings(data.table);
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
                        <th>PTS</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        
                        standingsTable.map((team) => (
                                
                            <tr key={team.idTeam} className={team.strTeam == props.teamName ? "selectedTeam" : ""}>
                                <td>{team.intRank}</td>
                                <td><strong className="text-white">{team.strTeam}</strong></td>
                                <td>{team.intWin}</td>
                                <td>{team.intDraw}</td>
                                <td>{team.intLoss}</td>
                                <td>{team.intPoints}</td>
                            </tr>

                        ))
                    }


                </tbody>
            </table>
        </div>
    )
}

export default Standings