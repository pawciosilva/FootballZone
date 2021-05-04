import './App.css';
import React from 'react'
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Home from './pages/Home';
import Ligue1 from './pages/Ligue1';
import SerieA from './pages/SerieA';
import LaLiga from './pages/LaLiga';
import PremierLeague from './pages/PremierLeague';
import Bundesliga from './pages/Bundesliga';

export default function App() {
  return (
      <div>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/ligue1">Ligue 1</Link></li>
            <li><Link to="/seriea">Serie A</Link></li>
            <li><Link to="/laliga">La Liga</Link></li>
            <li><Link to="/premierleague">Premier League</Link></li>
            <li><Link to="/bundesliga">Bundesliga</Link></li>
          </ul>
        </nav>
        <Route exact path="/"><Home /></Route>
        <Route path="/ligue1"><Ligue1 /></Route>
        <Route path="/seriea"><SerieA /></Route>
        <Route path="/laliga"><LaLiga /></Route>
        <Route path="/premierleague"><PremierLeague /></Route>
        <Route path="/bundesliga"><Bundesliga /></Route>
      </div>
  );
}