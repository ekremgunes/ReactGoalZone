import React from "react";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Standings = (props) => {
  const [standingsTable, setStandings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/competitions/PL/standings");
        const data = await response.json();
        setStandings(data.standings[0].table);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const navigateToTeam = (id) => {
    if (!id) return;
    return navigate("/team/" + id);
  };

  return (
    <div className="widget-next-match" id="standingsTable">
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
          {!standingsTable ? (
            <tr>Loading . .</tr>
          ) : (
            standingsTable.map((row) => (
              <tr
                onClick={() => navigateToTeam(row.team.id)}
                key={row.team.id}
                className={`cursor-pointer ${row.team.id == props.id ? "selectedTeam" : ""}`}
              >
                <td>{row.position}</td>
                <td>
                  <strong className="text-white">{row.team.shortName}</strong>
                </td>
                <td>{row.won}</td>
                <td>{row.draw}</td>
                <td>{row.lost}</td>
                <td>{row.goalDifference}</td>
                <td>{row.points}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Standings;
