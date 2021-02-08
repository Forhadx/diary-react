import React from "react";

const DeleteModal = (props) => {
  return (
    <div>
      <h1>I LOVE CODING !</h1>
      <button onClick={props.yesButtonHandler} className="yes">
        Yes
      </button>
      <button onClick={props.noButtonHandler} className="no">
        No
      </button>
    </div>
  );
};

export default DeleteModal;
