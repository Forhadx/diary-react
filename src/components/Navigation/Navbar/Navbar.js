import React from "react";
import { NavLink } from "react-router-dom";

import "./Navbar.css";

const Navbar = React.memo(props => {
  return (
    <div className="navbar">
      <NavLink to="/" className="logo">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI4okJDbWOUS7Oi2a7-7jALMNoyw6qki2a0w&usqp=CAU"
          alt="picture"
        />
      </NavLink>
      <ul className="navbar-items">
        
        <li>
          <NavLink to="/add-post" activeClassName="active">WRITE</NavLink>
        </li>
        <li>
          <NavLink to="/favourite" activeClassName="active">FAVOURITES</NavLink>
        </li>
        <li>
          <NavLink to="/logout" activeClassName="active">LOGOUT</NavLink>
        </li>
      </ul>
      <div className="DrawerToggle" onClick={props.drawerToggleClicked}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
});

export default Navbar;
