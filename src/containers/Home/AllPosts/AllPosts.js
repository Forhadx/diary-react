import React, { useEffect, useState } from "react";

import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";

import Modal from "../../../components/UI/Modal/Modal";
import Spinner from "../../../components/UI/Spinner/Spinner";
import DeleteModal from "../../../components/DeletePost/DeletePost";
import UpdatePost from "../../../components/UpdatePost/UpdatePost";

import "./AllPosts.css";

const AllPosts = (props) => {
  const { onFetchPost } = props;

  const [show, setShow] = useState(false);
  const [delId, setDelId] = useState(null);
  const [upPost, setUpPost] = useState(null);

  let deleteModal = null;
  let updateModal = null;

  useEffect(() => {
    console.log("useEffect....");
    onFetchPost();
  }, [onFetchPost, upPost]);

  const postDeleteHandler = (id) => {
    setShow(true);
    setDelId(id);
  };

  const yesButtonHandler = () => {
    props.onDeletePost(delId);
    setDelId(null);
    setShow(false);
  };

  const noButtonHandler = () => {
    setShow(false);
  };

  const modalClosedHandler = () => {
    setShow(false);
  };

  const postUpdateHandler = (post) => {
    setShow(true);
    setUpPost(post);
  };

  const closeUpdateHandler = () =>{
    setShow(false);
    setUpPost(null);
  }
  

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
      <UpdatePost
        upPost={upPost}
        updatePostFormHandler={props.onUpdatePost}
        closeUpdate={closeUpdateHandler}
      />
    );
  }

  return (
    <div className="posts">
      <Modal show={show} modalClosed={modalClosedHandler}>
        {deleteModal}
        {updateModal}
      </Modal>
      <h2>Your all writtings</h2>
      {props.allPosts.map((p) => {
        return (
          <div className="details" key={p.id}>
            <div className="post-header">
              <div>{p.time}</div>
              <div className="post-option">
                <div onClick={() => postUpdateHandler(p)}>EDIT</div>
                <div onClick={() => postDeleteHandler(p.id)}>DELETE</div>
              </div>
            </div>
            {props.loading ? (
              <Spinner />
            ) : (
              <div className="description">{p.post}</div>
            )}
          </div>
        );
      })}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    allPosts: state.allPosts,
    loading: state.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchPost: () => dispatch(actions.fetchPost()),
    onDeletePost: (id) => dispatch(actions.deletePost(id)),
    onUpdatePost: (id, postData) => dispatch(actions.updatePost(id, postData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllPosts);
