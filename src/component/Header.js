import React from "react";
import { Link } from "react-router-dom";
import { User, useAuth0 } from "@auth0/auth0-react";
import logo from '../assests/logo.png';

const Header = () => {
  const { loginWithRedirect,logout,isAuthenticated,user} = useAuth0();

  return (
    <div class="navbar navbar-expand-lg navbar-light tw-bg-white tw-shadow-sm m-0 p-0">
          
          <a className="navbar-brand" href="#Home">
          <img src={logo} alt="" className="tw-h-16 tw-w-16" />
          &nbsp;<h3 className=" tw-inline-block">Testify</h3>
          </a>

          <button
            className="navbar-toggler tw-bg-blue-600"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon tw-text-white"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav m-auto">
              <li class="nav-item active link tw-rounded-lg tw-text-xl p-1 hover:tw-bg-green-400">
                <Link to="/" className="nav-link text-black" href="#Home">
                  Home <span className="sr-only"></span>
                </Link>
              </li>
              <li className="nav-item active p-1 link tw-rounded-lg text-white hover:tw-bg-green-400 tw-text-xl">
                <Link to="/About" className="nav-link text-black" href="#About">
                  About<span className="sr-only"></span>
                </Link>
              </li>
              <li className="nav-item active p-1 link tw-rounded-lg text-white hover:tw-bg-green-400 tw-text-xl">
                <Link to="/test" className="nav-link text-black" href="#Internship">
                  Test Library <span className="sr-only"></span>
                </Link>
              </li>
              <li className="nav-item active p-1 link tw-rounded-lg hover:tw-bg-green-400 tw-text-xl">
                <Link to="/Contact" className="nav-link text-black" href="#Projects">
                  Contact <span className="sr-only"></span>
                </Link>
              </li>
              
              <li className="nav-item p-1 tw-rounded-lg tw-text-emerald-400">
                {isAuthenticated && <p>{user.name}</p>}
              </li>
            
              
            </ul>
            {isAuthenticated ? ( <button className=" tw-bg-green-400 px-4 tw-py-1 tw-rounded-md tw-text-lg m-1" onClick={()=>{logout({ returnTo: window.location.origin })}}>logout</button>) : (<button className=" tw-bg-green-400 px-4 tw-py-1 tw-rounded-md tw-text-lg m-1" onClick={()=>{loginWithRedirect()}}>login</button>)}
            
           

          </div>
         
        
          
          
        </div>

    
  );
};

export default Header;
