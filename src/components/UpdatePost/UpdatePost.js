import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions/index";

import Spinner from "../UI/Spinner/Spinner";
import './UpdatePost.css';

const UpdatePost = React.memo(props => {

  const [post, setPost] = useState(props.upPost.post);

  const { onUpdatePostInit, isUpdate, closeUpdate } = props;

  useEffect(() => {
    onUpdatePostInit();
    if (isUpdate) {
      closeUpdate();
    }
  }, [onUpdatePostInit, isUpdate, closeUpdate]);

  const PostFormHandler = (event) => {
    event.preventDefault();

    const postDetails = {
      post: post,
      time: props.upPost.time,
      love: props.upPost.love,
      userId: props.upPost.userId
    };

    props.onUpdatePost(props.upPost.id, postDetails, props.token);
  };

  const closeUpdateModal = () =>{
    closeUpdate();
  }

  return (
    <div className="update-post">
      <button onClick={closeUpdateModal} className="closeBtn">X</button>
      <form onSubmit={PostFormHandler}>
        <label>Update Your Post</label>
        {props.upLoading ? (
          <Spinner />
        ) : (
          <textarea
            type="text"
            onChange={(e) => setPost(e.target.value)}
            value={post}
            placeholder="write from here..."
          />
        )}

        <button type="submit" >
          UPDATE
        </button>
      </form>
    </div>
  );
});

const mapStateToProps = (state) => {
  return {
    upLoading: state.post.upLoading,
    isUpdate: state.post.isUpdate,
    upModal: state.post.upModal,
    token : state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdatePost: (id, postData, token) => dispatch(actions.updatePost(id, postData, token)),
    onUpdatePostInit: () => dispatch(actions.updatePostInit()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdatePost);
