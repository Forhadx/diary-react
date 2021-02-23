import React from "react";

import './Fullpost.css';

const Fullpost = React.memo(props => {
  return (
    <div className="full-posts">
      <div className="full-details">
        <div className="post-header">
        <div className="post-time">{props.post.time}</div>
          <button className="post-close-btn" onClick={props.fullPostClosed} >
            X
          </button>
        </div>
        <textarea className="post-description" value={props.post.post} readOnly></textarea>
      </div>
    </div>
  );
});

export default Fullpost;
