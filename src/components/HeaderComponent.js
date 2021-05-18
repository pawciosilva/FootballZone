import React from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../assets/logo.jpg'


export const HeaderComponent = () => {
    return(
        <div className="container">
            <div className="text-center">
                <img id="headerPhoto" src={logo} className="img-fluid" alt="HeaderImage"></img>  
            </div> 

            <nav  id="headerNavBar"className="navbar navbar-expand-lg navbar-dark">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/" >FootballZone</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/ligue1">Ligue 1</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/seriea">Serie A</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/laliga">La Liga</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/premierleague">Premier League</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/bundesliga">Budesliga</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default HeaderComponent