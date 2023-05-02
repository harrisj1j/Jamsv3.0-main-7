import { createBrowserRouter, createRoutesFromElements, Route, Link, Outlet, RouterProvider } from 'react-router-dom';
import logo from './img/JAMS_313X313.png'
import './NavbarStyles.css'
import {AuthDetails } from './AuthDetails';


export  const Root = () => {
        return (
        <>
        <nav>
        <img src={logo} alt="logo" />
        <ul id="navbar">

                <div>
                <li> <a><Link to="/">Home</Link></a></li>
                <li><Link to="/Login">Login</Link></li>
                <li><Link to="/Register">Register</Link></li>
                <li><AuthDetails /></li>
                </div>
        </ul>

          <div>
            <Outlet />
          </div>
        </nav>
        </>)
      }
      