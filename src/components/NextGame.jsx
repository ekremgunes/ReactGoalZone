import React from 'react'
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../helpers/helpers.js";

const initialGameData = {
  homeTeamId: 0,
  homeTeamImage: '',
  awayTeamImage: '',
  homeTeam: '',
  awayTeam: '',
  competition: '',
  date: '',
  matchWeek: 0,
  venue: ''
}

const formatDate = (utcDate) => {
  const options = {
    weekday: 'long',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  };

  return new Date(utcDate).toLocaleString('en-US', options);
}
const NextGame = () => {
  const id = useSelector((state) => state.user.id)
  const [nextGame, setNextGame] = useState(initialGameData)
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/teams/${id}/matches?status=SCHEDULED&limit=1`)
      const data = await response.json()
      if (!data.matches) {
        setLoading(true)
        return
      }
      setNextGame((prev)=>({
        ...prev,
        date: data.matches[0].utcDate,
        homeTeamId: data.matches[0].homeTeam.id,
        homeTeamImage: data.matches[0].homeTeam.crest,
        awayTeamImage: data.matches[0].awayTeam.crest,
        homeTeam: data.matches[0].homeTeam.shortName,
        awayTeam: data.matches[0].awayTeam.shortName,
        competition: data.matches[0].competition.name,
        matchWeek: data.matches[0].matchday,
      }));
      setLoading(false)

    } catch (error) {
      console.error('Veri getirme hatası:', error)
      setLoading(true)
    }
  };

  const fetchHomeTeam = async () => {
    try {

      if (nextGame.homeTeamId > 0) {
        const responseOfTeam = await fetch(`/api/teams/${nextGame.homeTeamId}`)
        const dataOfTeam = await responseOfTeam.json()

        if (dataOfTeam) {
          setNextGame((prev) => ({
            ...prev,
            venue: dataOfTeam.venue
          }));
        }

      }

    } catch (error) {
      console.error('Veri getirme hatası:', error)
    }
  };

  useEffect(() => {
    fetchData()    
  }, [id])

  useEffect(() => {
    fetchHomeTeam()
  }, [nextGame.homeTeamId])

  if (loading) {
    return <></>
  }



  return (
    <div className="widget-next-match">
      <div className="widget-title">
        <h3>Match Week {nextGame.matchWeek} </h3>
      </div>
      <div className="widget-body mb-3">
        <div className="widget-vs">
          <div className="d-flex align-items-center justify-content-around justify-content-between w-100">
            <div className="team-1 text-center">
              <img src={nextGame.homeTeamImage} alt="Image" />
              <h3>{nextGame.homeTeam}</h3>
            </div>
            <div>
              <span className="vs"><span>VS</span></span>
            </div>
            <div className="team-2 text-center">
              <img src={nextGame.awayTeamImage} alt="Image" />
              <h3>{nextGame.awayTeam}</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center widget-vs-contents mb-4">
        <h4>{nextGame.competition}</h4>
        <p className="mb-5">
          <span className="d-block">{formatDate(nextGame.date)}</span>
          <strong className="text-primary">{nextGame.venue}</strong>
        </p>

        <div id="date-countdown2" className="pb-1"></div>
      </div>
    </div>


  )
}

export default NextGame