import './App.css';
import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './pages/Home';
import Ligue1 from './pages/Ligue1';
import SerieA from './pages/SerieA';
import LaLiga from './pages/LaLiga';
import PremierLeague from './pages/PremierLeague';
import Bundesliga from './pages/Bundesliga';
import HeaderComponent from './components/HeaderComponent';
import Switch from 'react-bootstrap/esm/Switch';

export default function App() {
  return (
      <div>
        
        <BrowserRouter>

           <HeaderComponent/>

           <Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/ligue1" component={Ligue1}/>
              <Route path="/seriea" component={SerieA}/>
              <Route path="/laliga" component={LaLiga}/>
              <Route path="/premierleague" component={PremierLeague}/>
              <Route path="/bundesliga" component={Bundesliga}/>
           </Switch>
        </BrowserRouter>
        
      </div>
  );
}