import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useSelector, useDispatch } from "react-redux";
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
    const p = async () => {
      await server
        .get(`/like/${user.data.userInfo.id}`)
        .then((res) => {
          setLikePost(res.data.data.posts);
        })
        .catch((err) => {
          throw err;
        });
    };
    p();
  });

  const redirectPage = () => {
    return (
      <Alert
        content="로그인 후 이용 가능합니다."
        handleClickBtn={() => (window.location = "./mainpage")}
      />
    );
  };

  const isPc = useMediaQuery({
    query: "(min-width:1024px)",
  });

  const isTablet = useMediaQuery({
    query: "(min-width:768px) and (max-width:1023px)",
  });

  const isMobile = useMediaQuery({
    query: "(max-width:767px)",
  });
  return (
    <>
      {isPc && (
        <>
          {user.isLogin ? (
            <>
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
      )}

      {isTablet && (
        <>
          {user.isLogin ? (
            <>
              <Nav />
              <div className="mainPageResponsive">
                <ResponsiveIconlistTablet />

                <div className="middleSpace2">
                  <div className="midContentsResponsive midContentsReverse">
                    {likePost ? (
                      likePost.length !== 0 ? (
                        likePost.map((post) => {
                          return <PostList post={post} />;
                        })
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
      )}

      {isMobile && (
        <>
          {user.isLogin ? (
            <>
              <div className="mainPageResponsive2">
                <ResponsiveNav />

                <div className="middleSpaceResponsive2">
                  <div className="midContentsResponsive2 midContentsReverse">
                    {likePost ? (
                      likePost.length !== 0 ? (
                        likePost.map((post) => {
                          return <PostList post={post} />;
                        })
                      ) : (
                        <NoContents />
                      )
                    ) : (
                      <Loading />
                    )}
                  </div>
                </div>
              </div>
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
      )}
    </>
  );
};

export default Like;
