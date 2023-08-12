import React from "react";
import {useNavigate} from "react-router-dom";
import { BiDonateBlood, BiUserCircle } from "react-icons/bi";
import { useSelector } from "react-redux";
const Header = () => {
     const {user} = useSelector(state => state.auth)

     const navigate = useNavigate();
     //logoutHandler

     const handleLogout = () =>{
        localStorage.clear();
        alert("Logout successfull.");
        navigate("/login");
     }

  return (
    <>
      <nav className="navbar">
        <div className="container-fluid">
          <div className="navbar-brand">
            <BiDonateBlood color="red" />
            Blood Bank
          </div>
          <ul className="navbar-nav flex-row ">
            <li className="nav-item mx-3">
              <p nav-link>
                <BiUserCircle/>
                Welcome {user?.name || user?.hospitalName || user?.organisationName} &nbsp;
                <span class="badge bg-primary">{user?.role}</span>
                </p>
            </li>
            <li className="nav-item mx-3 ">
              <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;
