import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions/index";

import Spinner from "../UI/Spinner/Spinner";
import './UpdatePost.css';

const UpdatePost = (props) => {
  let x = props.upPost.post;
  const [post, setPost] = useState(x);

  const { onUpdatePostInit, isUpdate, closeUpdate } = props;

  useEffect(() => {
    console.log('up useeffect?? ');
    onUpdatePostInit();
    if (isUpdate) {
      console.log('isupdate: ', isUpdate);
      closeUpdate();
    }
  }, [onUpdatePostInit, isUpdate, closeUpdate]);

  const PostFormHandler = (event) => {
    event.preventDefault();

    const postDetails = {
      post: post,
      time: props.upPost.time,
    };

    props.onUpdatePost(props.upPost.id, postDetails);
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
};

const mapStateToProps = (state) => {
  return {
    upLoading: state.upLoading,
    isUpdate: state.isUpdate,
    upModal: state.upModal
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdatePost: (id, postData) => dispatch(actions.updatePost(id, postData)),
    onUpdatePostInit: () => dispatch(actions.updatePostInit()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdatePost);
