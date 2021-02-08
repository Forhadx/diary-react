import React, { useState } from "react";

const UpdatePost = (props) => {
  const [post, setPost] = useState(props.upPost.post);

  const PostFormHandler = (event) => {
    event.preventDefault();

    const postDetails = {
      post: post,
      time: props.upPost.time
    };

    props.updatePostFormHandler(props.upPost.id, postDetails);
    props.closeUpdate();
  };

  return (
    <div className="add-post">
      <h2>Write Your opinion..</h2>
      <form onSubmit={PostFormHandler}>
        <textarea
          type="text"
          onChange={(e) => setPost(e.target.value)}
          value={post}
          placeholder="write from here..."
        />
        <button type="submit" className="addpost-btn">
          EDIT
        </button>
      </form>
    </div>
  );
};

export default UpdatePost;
