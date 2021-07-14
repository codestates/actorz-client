import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Post from "../pages/Post";
import Nav from "../components/Nav";
import Slider from "react-slick";
import server from "../apis/server";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/Posts.css";
import Iconlist from "../components/Iconlist";
import { DeleteOutlined } from "@ant-design/icons";
import Footer from "../components/Footer";
import Loading from "../components/loading";

const Posts = (props) => {
  const [clickModal, setClickModal] = useState(false);
  const [userinfo, setUserInfo] = useState({});
  const [userPost, setUserPost] = useState({});
  //const user = useSelector((user) => user.userInfoReducer);
  //const post = useSelector((post) => post.postInfoReducer);
  //console.log(post);

  useEffect(() => {
    const p = async () => {
      await server // 유저의 포스트를 가져옴
        .get(`/post/user/${props.history.location.state.id}`)
        .then((res) => {
          //console.log(res);
          setUserPost(res.data.data);
        })
        .catch((err) => {
          throw err;
        });

      await server //유저의 정보를 가져옴
        .get(`/user/${props.history.location.state.id}`)
        .then((res) => {
          setUserInfo(res.data.data);
        })
        .catch((err) => {
          throw err;
        });
    };
    p();
  }, []);

  //console.log(userinfo.userInfo); //여기에 해당 게시물 작성자 정보가 담겨있음.
  //console.log(userPost);
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    pauseOnHover: true,
    autoplay: true,
    draggable: false,
    slidesToShow: 1,
    slidesToScroll: 2,
    arrows: true,
  };

  const handleClickPost = (boolean, id) => {
    if (boolean) {
      setClickModal(true);
      window.history.pushState(null, "", `/post/${id}`);
    } else {
      setClickModal(false);
      window.history.pushState(null, "", `/posts`);
    }
  };

  return (
    <>
      <div className="blockhere"> </div>
      <div className="mainPage">
        <Nav />
        <Iconlist />

        <div className="newblockPosition"> </div>

        <div className="middleSpace">
          <div className="midContents">
            <div className="buttonHeader">
              <DeleteOutlined className="deleteButton" />
            </div>
            {userinfo.userInfo ? (
              <div className="midContentDownPart">
                <div className="displayPosition">
                  <div className="fixedSize">
                    <img
                      src={userinfo.userInfo.mainPic}
                      className="testPic"
                      alt=""
                    />
                  </div>
                  <div className="fixedContent">
                    <p className="name">{}</p>
                    <ul>
                      <strong>생년월일</strong>
                      <li className="dob">{userinfo.userInfo.dob.toString().split("T")[0]}</li>
                      <strong>이메일</strong>
                      <li className="email">{userinfo.userInfo.email}</li>
                      {
                        userinfo.userInfo.role === "actor" ? (
                          <>
                            <strong>소속사</strong>
                            <li className="company">
                              {userinfo.userInfo.company}
                            </li>
                          </>
                        ):(
                          <>
                            <strong>회사</strong>
                            <li className="company">
                              {userinfo.userInfo.recruiter.bName}
                            </li>
                          </>
                        )
                      }
                    </ul>
                  </div>
                </div>
                {/* 영화랑 드라마 경력 나눌꺼면 여기서 */}
                <div className="careerTitle">Career 🏆</div>
                <div className="careerContent">
                  <div className="career">
                    {userinfo.userInfo.careers.map((career) => {
                      return (
                        <li key={career._id}>
                          {`${career.year}` +
                            ` ${career.title}` +
                            ` / ` +
                            `${career.type}`}
                        </li>
                      );
                    })}
                  </div>
                </div>
                <div className="slider-img-box">
                  <Slider {...settings} className="slider">
                    {userPost.posts.map((post) => {
                      return (
                        <img
                          alt=""
                          key={post._id}
                          src={post.media[0].path}
                          onClick={() => handleClickPost(true, post._id)}
                        ></img>
                      );
                    })}
                  </Slider>
                </div>
                {clickModal ? <Post handleClickPost={handleClickPost} /> : null}
              </div>
            ) : (
              <Loading />
            )}
          </div>
        </div>
        <div className="newblockPosition2"> </div>

        <div className="rightSpace">
          <div className="iconList2"> </div>
        </div>
      </div>
      <Footer />

      {/* <Nav />
      <div id="post-container1"></div>
      <div id="post-title">Actor</div>
      <div id="container">
        <img src={img} className="img" alt="프로필"></img>
        <span id="post-info">
          <p className="name">{user.data.userInfo.name}</p>
          <ul>
            <strong>생년월일</strong>
            <li className="dob">{user.data.userInfo.dob}</li>
            <strong>이메일</strong>
            <li className="email">{user.data.userInfo.email}</li>
            <strong>소속사</strong>
            <li className="company">{user.data.userInfo.company}</li>
          </ul>
        </span>
      </div>
      <span className="post-career">
        {user.data.userInfo.careers.map((career) => {
          return (
            <li>
              {`${career.year}` +
                ` ${career.title}` +
                ` / ` +
                `${career.type.map((type) => {
                  return type;
                })}`}
            </li>
          );
        })}
      </span>
      {
        <Slider {...settings} className="slider">
          {post.data.posts.map((post) => {
            return (
              <img
                src={post.path}
                onClick={() => handleClickPost(true, post.id)}
              ></img>
            );
          })}
        </Slider>
      }
      {clickModal ? <Post handleClickPost={handleClickPost} /> : null} */}
    </>
  );
};
export default Posts;
