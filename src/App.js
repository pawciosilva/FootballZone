import './App.css';
import React from 'react'
import { BrowserRouter, Switch,  Route } from 'react-router-dom';
import Home from './pages/Home';
import HeaderComponent from './components/HeaderComponent';
import MainLeague from './pages/MainLeague';

export default function App() {
  return (
      <div className="body-app">
        
        <BrowserRouter>
           <HeaderComponent/>
           <Switch>
             <>
              <Route exact path="/" component={Home}/>
              <Route path="/ligue1" component={MainLeague}/>
              <Route path="/seriea" component={MainLeague}/>
              <Route path="/laliga" component={MainLeague}/>
              <Route path="/premierleague" component={MainLeague}/>
              <Route path="/bundesliga" component={MainLeague}/>
              </>
           </Switch>
        </BrowserRouter>
        
      </div>
  );
}