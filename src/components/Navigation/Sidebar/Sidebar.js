import React from "react";
import { NavLink } from "react-router-dom";

import Backdrop from "../../UI/Backdrop/Backdrop";
import "./Sidebar.css";

const Sidebar = React.memo(props => {
  
  let attachedClasses = ["sidebar", "Close"];
  if (props.open) {
    attachedClasses = ["sidebar", "Open"];
  }

  return (
    <React.Fragment>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={attachedClasses.join(" ")} onClick={props.closed}>
        <NavLink to="/" exact className="nav-logo" activeClassName="active">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI4okJDbWOUS7Oi2a7-7jALMNoyw6qki2a0w&usqp=CAU"
            alt="picture"
          />
        </NavLink>
        <ul className="sidebar-items">
          <li className="sidebar-item">
            <NavLink to="/" exact activeClassName="active">
              Home
            </NavLink>
          </li>
          <li className="sidebar-item">
            <NavLink to="/add-post" activeClassName="active">
              Add Post
            </NavLink>
          </li>
          <li className="sidebar-item">
            <NavLink to="/favourite" activeClassName="active">
              Favourite
            </NavLink>
          </li>
          <li className="sidebar-item">
            <NavLink  to="/logout" activeClassName="active">
              LOGOUT
            </NavLink>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
});

export default Sidebar;
