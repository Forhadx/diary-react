import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

import Modal from "../../components/UI/Modal/Modal";
import FullPost from "../../components/Fullpost/Fullpost";

const Favourite = React.memo(props => {
  const { onFetchPost,token, userId } = props;

  const [love, setLove] = useState(false);
  const [fullpost, setFullPost] = useState(null);

  useEffect(() => {
    setLove(false);
    onFetchPost(token, userId);
  }, [love, token, userId]);

  const addLoveHandler = (data) => {
    const postDetails = {
      post: data.post,
      time: data.time,
      love: !data.love,
      userId: data.userId
    };
    setLove(true);
    props.onAddLove(data.id, postDetails, props.token);
  };

  const fullpostModalClosedHandler = () => {
    setFullPost("");
  };
  
  const fullPostHandler = (p) => {
    setFullPost(p);
  };

  return (
    <div className="posts">
      <Modal show={fullpost} modalClosed={fullpostModalClosedHandler}>
        {fullpost ? (
          <FullPost
            post={fullpost}
            fullPostClosed={fullpostModalClosedHandler}
          />
        ) : null}
      </Modal>
      <h2>Your Favourite List</h2>
      {props.allPosts.map((p) => (
        <React.Fragment key={p.id} >
          {p.love ? (
            <div className="details">
              <div className="post-header">
                <div className="tooltip" onClick={() => addLoveHandler(p)}>
                  <span className="tooltiptext">Remove Love</span>
                  <i className="fas fa-heart"></i>
                </div>
                <div>{p.time}</div>
              </div>
              <div className="description" onClick={() => fullPostHandler(p)}>
                {p.post.slice(0, 50)}...
              </div>
            </div>
          ) : null}
        </React.Fragment>
      ))}
    </div>
  );
});

const mapStateToProps = (state) => {
  return {
    allPosts: state.post.allPosts,
    token : state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchPost: (token, userId) => dispatch(actions.fetchPost(token, userId)),
    onAddLove: (id, postData, token) => dispatch(actions.addLove(id, postData, token))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Favourite);
