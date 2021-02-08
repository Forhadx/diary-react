import React, { useState } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions/index";

import "./AddPost.css";

const AddPost = (props) => {
  const [post, setPost] = useState("");

  const addPostFormHandler = (event) => {
    event.preventDefault();

    const postDetails = {
        post: post,
        time: new Date().toLocaleString()
    }
    console.log(postDetails)
    props.onAddPost(postDetails)
    setPost('');
  };

  return (
    <div className="add-post">
      <h2>Write Your opinion..</h2>
      <form onSubmit={addPostFormHandler}>
        <textarea
          type="text"
          onChange={(e) => setPost(e.target.value)}
          value={post}
          placeholder="write from here..."
        />
        <button type="submit" className="addpost-btn">
          DONE
        </button>
      </form>
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
    onAddPost: (postData) => dispatch(actions.addPost(postData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPost);
