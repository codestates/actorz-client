import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useSelector } from "react-redux";
import Nav from "../components/Nav";
import SocialSignup from "../components/SocialSignup";
import server from "../apis/server";
import Footer from "../components/Footer";
import Iconlist from "../components/Iconlist";
import PostList from "../components/PostList";
import Alert from "../components/Alert";
import NoContents from "../components/NoContents";
import ResponsiveNav from "../components/responsiveApp/ResponsiveNav";
import ResponsiveFooter from "../components/responsiveApp/ResponsiveFooter";
import ResponsiveIconlistTablet from "../components/responsiveApp/ResponsiveIconlistTablet";
import Loading from "../components/loading";
import "antd/dist/antd.css";
import "semantic-ui-css/semantic.min.css";

const Like = () => {
  const [oauthSignup] = useState("");
  const [modalSocialSignup, setModalSocialSignup] = useState(false);
  const [likePost, setLikePost] = useState(null);

  const user = useSelector((user) => user.userInfoReducer);

  useEffect(() => {
    const getInfo = async () => {
      await server
        .get(`/like/${user.data.userInfo.id}`)
        .then((res) => {
          setLikePost(res.data.data.posts);
        })
        .catch((err) => {
          throw err;
        });
    };
    getInfo();
  });

  const redirectPage = () => {
    return (
      <Alert
        content="로그인 후 이용 가능합니다."
        handleClickBtn={() => (window.location = "./mainpage")}
      />
    );
  };

  return (
    <>
      {user.isLogin ? (
        <>
          <ResponsiveIconlistTablet />
          <div className="mainPage">
            <Nav />
            <Iconlist />

            <div className="middleSpace">
              <div className="midContents2 midContentsReverse">
                {likePost ? (
                  likePost.length !== 0 ? (
                    <PostList post={likePost} page={"likepage"} />
                  ) : (
                    <NoContents />
                  )
                ) : (
                  <Loading />
                )}
              </div>
            </div>
          </div>
          <Footer />
          <ResponsiveNav />
          <ResponsiveFooter />

          {modalSocialSignup ? (
            <SocialSignup
              oauthSignup={oauthSignup}
              modalSocialClose={() => {
                setModalSocialSignup(false);
              }}
            ></SocialSignup>
          ) : null}
        </>
      ) : (
        redirectPage()
      )}
    </>
  );
};

export default Like;
