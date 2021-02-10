import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Spinner from "../../components/UI/Spinner/Spinner";

import * as actions from "../../store/actions/index";

import "./AddPost.css";

const AddPost = (props) => {
  const [post, setPost] = useState("");

  const {onAddPostInit} = props;
  let redirect = null;

  useEffect(()=>{
    onAddPostInit();
  }, [onAddPostInit])

  const addPostFormHandler = (event) => {
    event.preventDefault();

    const postDetails = {
        post: post,
        time: new Date().toLocaleString()
    }
    props.onAddPost(postDetails)
    setPost('');
  };

  if(!props.isPostAdd){
    //props.history.push('/')
    console.log('redirect?');
    {

      redirect = <Redirect to="/" />
    }
  }
  console.log('addpost-: ',props.allPosts);

  return (
    <div className="add-post">
      { redirect }
      <h2>Write Your opinion..</h2>
      <form onSubmit={addPostFormHandler}>
      { props.addLoading ? <Spinner /> :
        <textarea
          type="text"
          onChange={(e) => setPost(e.target.value)}
          value={post}
          placeholder="write from here..."
        />
      }
        
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
    isPostAdd: state.isPostAdd,
    addLoading: state.addLoading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddPost: (postData) => dispatch(actions.addPost(postData)),
    onAddPostInit: () => dispatch(actions.addPostInit())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPost);
