import React from "react";
import "./Delete.css";

const DeleteModal = React.memo(props => {
  return (
    <div className="delete-post">
      <p>DO YOU WANT TO DELETE THIS POST ?</p>
      <div>
        <button onClick={props.yesButtonHandler} className="yes">
          Yes
        </button>
        <button onClick={props.noButtonHandler} className="no">
          No
        </button>
      </div>
    </div>
  );
});

export default DeleteModal;
