import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";

import * as actions from "../../store/actions/index";

import "./AddPost.css";

const AddPost = React.memo(props => {
  const [post, setPost] = useState("");
  const { onAddPostInit} = props;

  let message = <div className="message">Your Post is Uploaded.</div>;

  useEffect(() => {
    onAddPostInit();
  }, [onAddPostInit]);

  const addPostFormHandler = (event) => {
    event.preventDefault();

    const postDetails = {
      post: post,
      time: new Date().toLocaleString(),
      love: false,
      userId: props.userId
    };
    props.onAddPost(postDetails, props.token);
    setPost("");
    
    setTimeout(() => {
      message = null;
      onAddPostInit();
    }, 2000);
  };


  return (
    <div className="add-post">
      <h2>Write Your Opinion</h2>
      {props.addLoading ? (
        <Spinner />
      ) : (
        <form onSubmit={addPostFormHandler}>
          <textarea
            type="text"
            onChange={(e) => setPost(e.target.value)}
            value={post}
            placeholder="write from here..."
          />
          <button type="submit" className="addpost-btn" disabled={!post}>
            DONE
          </button>
        </form>
      )}
      {props.isAdd  && message}
    </div>
  );
});

const mapStateToProps = (state) => {
  return {
    allPosts: state.post.allPosts,
    isAdd: state.post.isAdd,
    token : state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddPost: (postData, token) => dispatch(actions.addPost(postData, token)),
    onAddPostInit: () => dispatch(actions.addPostInit()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPost);
