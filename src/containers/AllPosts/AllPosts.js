import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

import Modal from "../../components/UI/Modal/Modal";
import DeleteModal from "../../components/DeletePost/DeletePost";
import UpdatePost from "../../components/UpdatePost/UpdatePost";
import FullPost from "../../components/Fullpost/Fullpost";

import "./AllPosts.css";

const AllPosts = React.memo(props => {
  const { onFetchPost, token, userId } = props;

  const [show, setShow] = useState(false);
  const [delId, setDelId] = useState(null);
  const [upPost, setUpPost] = useState(null);
  const [fullpost, setFullPost] = useState(null);

  const [love, setLove] = useState(false);

  let deleteModal = null;
  let updateModal = null;

  useEffect(() => {
    setLove(false);
    onFetchPost(token, userId);
  }, [onFetchPost, upPost, love, token, userId]);

  const postDeleteHandler = (id) => {
    setShow(true);
    setDelId(id);
  };

  const yesButtonHandler = () => {
    props.onDeletePost(delId, props.token);
    setDelId(null);
    setShow(false);
  };

  const noButtonHandler = () => {
    setShow(false);
  };

  const postUpdateHandler = (post) => {
    setUpPost(post);
  };

  const closeUpdateHandler = () => {
    setUpPost(null);
    updateModal = null;
  };

  if (delId) {
    deleteModal = (
      <DeleteModal
        yesButtonHandler={yesButtonHandler}
        noButtonHandler={noButtonHandler}
      />
    );
  }

  if (upPost) {
    updateModal = (
      <UpdatePost upPost={upPost} closeUpdate={closeUpdateHandler} />
    );
  }

  const modalClosedHandler = () => {
    setShow(false);
    setDelId(null);
  };

  const updateModalClosedHandler = () => {
    setUpPost(null);
    updateModal = null;
  };

  const addLoveHandler = (data) => {
    const postDetails = {
      post: data.post,
      time: data.time,
      love: !data.love,
      userId: data.userId,
    };
    setLove(true);
    props.onAddLove(data.id, postDetails, token);
  };

  const fullpostModalClosedHandler = () => {
    setFullPost("");
  };
  const fullPostHandler = (p) => {
    setFullPost(p);
  };

  return (
    <div className="posts">
      <Modal show={show} modalClosed={modalClosedHandler}>
        {deleteModal}
      </Modal>
      <Modal show={upPost} modalClosed={updateModalClosedHandler}>
        {updateModal}
      </Modal>
      <Modal show={fullpost} modalClosed={fullpostModalClosedHandler}>
        {fullpost ? (
          <FullPost
            post={fullpost}
            fullPostClosed={fullpostModalClosedHandler}
          />
        ) : null}
      </Modal>
      <h2>Your All Writtings</h2>
      {props.allPosts.map((p) => (
        <div key={p.id} className="details">
          <div className="post-header">
            {p.love ? (
              <div className="tooltip" onClick={() => addLoveHandler(p)}>
                <span className="tooltiptext">Remove Love</span>
                <i className="fas fa-heart"></i>
              </div>
            ) : (
              <div className="tooltip love" onClick={() => addLoveHandler(p)}>
                <span className="tooltiptext">Add Love</span>
                <i className="far fa-heart"></i>
              </div>
            )}
            <div className="time">{p.time}</div>
            <div className="post-option">
              <div className="tooltip" onClick={() => postUpdateHandler(p)}>
                <span className="tooltiptext">Edit Note</span>
                <i className="far fa-edit"></i>
              </div>
              <div className="tooltip" onClick={() => postDeleteHandler(p.id)}>
                <span className="tooltiptext">Delete Note</span>
                <i className="far fa-trash-alt"></i>
              </div>
            </div>
          </div>
          <div className="description" onClick={() => fullPostHandler(p)}>
            {p.post.slice(0, 50)}...
          </div>
        </div>
      ))}
    </div>
  );
});

const mapStateToProps = (state) => {
  return {
    allPosts: state.post.allPosts,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchPost: (token, userId) => dispatch(actions.fetchPost(token, userId)),
    onDeletePost: (id, token) => dispatch(actions.deletePost(id, token)),
    onUpdatePost: (id, postData) => dispatch(actions.updatePost(id, postData)),
    onAddLove: (id, postData, token) =>
      dispatch(actions.addLove(id, postData, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllPosts);
