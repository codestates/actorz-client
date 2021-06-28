import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectPostInfo } from "../actions/postAction";
import image from "../images/actor.jpeg";
import video from "../images/video.mp4";
import Nav from "../components/Nav";
import "../styles/Post.css";
const Post = (props) => {
  const post = useSelector((post) => post.postInfoReducer);
  // const dispatch = useDispatch();
  // dispatch(selectPostInfo(props.history.location.state.id));
  console.log(post);
  //장르, 좋아요 갯수,

  return (
    <>
      <Nav />
      <div className="container">
        <div className="info">
          <div className="post-name">Kimcoding</div>

          <img src={image} className="img" alt="프로필"></img>
          <span className="genre">공포, 스릴러</span>
          <span className="like">31</span>
          <video controls className="video">
            <source src={video}></source>
          </video>
        </div>
      </div>
    </>
  );
};
export default Post;
