import React from 'react'
import { NavLink } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import logo from './logo.jpg'


export const HeaderComponent = () => {
    return(
        <div className="container">
            <div className="text-center">
                <img src={logo} class="img-fluid" alt="HeaderImage" ></img>  
            </div>

            <nav className="navbar navbar-expand-lg navbar-dark" style={{borderRadius: '5px' ,backgroundImage: `linear-gradient(to right, #000428, #004e92)`}}>
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/" >FootballZone</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                            <NavLink className="nav-link" href="/ligue1">Ligue 1</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" href="/seriea">Serie A</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" href="/laliga">La Liga</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" href="/premierleague">Premier League</NavLink>
                            </li>
                            <li className="nav-item">
                            <NavLink className="nav-link" href="/bundesliga">Bundesliga</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default HeaderComponent