import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";
import server from "../apis/server";
import Nav from "../components/Nav";
import Iconlist from "../components/Iconlist";
import SocialSignup from "../components/SocialSignup";
import Footer from "../components/Footer";
import { getUserInfo } from "../actions/userAction";
import ResponsiveNav from "../components/responsiveApp/ResponsiveNav";
import ResponsiveFooter from "../components/responsiveApp/ResponsiveFooter";
import ResponsiveIconlistTablet from "../components/responsiveApp/ResponsiveIconlistTablet";
import Loading from "../components/loading";
import { redirectUri } from "../config";

import "../mainpage.css";
import "../styles/Search.css";
import "../styles/ResponsiveMainpage.css";
import "semantic-ui-css/semantic.min.css";
import "antd/dist/antd.css";
import { Modal } from "antd";
import NoContents from "../components/NoContents";
import PostList from "../components/PostList";

const Mainpage = () => {
  const [oauthSignup, setOauthSignup] = useState("");
  const [modalSocialSignup, setModalSocialSignup] = useState(false);

  const post = useSelector((post) => post.postInfoReducer);
  const dispatch = useDispatch();

  const isPc = useMediaQuery({
    query: "(min-width:1024px)",
  });

  const isTablet = useMediaQuery({
    query: "(min-width:768px) and (max-width:1023px)",
  });

  const isMobile = useMediaQuery({
    query: "(max-width:767px)",
  });

  useEffect(() => {
    const oauthLogin = async () => {
      try {
        const [provider, code] = oauthSignup.split("=");
        if (!code.includes("@")) {
          await server
            .post(`/login/${provider}`, { code })
            .then(async (res) => {
              if (res.status === 200) {
                localStorage.setItem("accessToken", res.data.data.accessToken);
                localStorage.setItem("id", res.data.data.id);
                await server
                  .get(`/user/${localStorage.getItem("id")}`)
                  .then((res) => {
                    if (res.status === 200) {
                      setModalSocialSignup(false);
                      dispatch(
                        getUserInfo({
                          ...res.data.data.userInfo,
                          dob: res.data.data.userInfo.dob
                            .toString()
                            .split("T")[0],
                        })
                      );
                      window.location.href = redirectUri;
                    }
                  })
                  .catch((err) => {
                    throw err;
                  });
              } else if (res.status === 201) {
                setModalSocialSignup(true);
                setOauthSignup(`${provider}=${res.data.data.email}`);
              } else {
                Modal.warning({
                  title: "로그인 실패",
                  content: "소셜 로그인 중 오류가 발생했습니다.",
                });
                return;
              }
            });
        }
      } catch (err) {}
    };

    const parseQueryString = function () {
      const str = window.location.search;
      let objURL = {};

      str.replace(
        new RegExp("([^?=&]+)(=([^&]*))?", "g"),
        function ($0, $1, $2, $3) {
          objURL[$1] = $3;
        }
      );
      return objURL;
    };

    const getQuery = () => {
      const query = parseQueryString();
      if (query.code && !oauthSignup) {
        if (query.state) {
          query.provider = "naver";
        } else if (query.token) {
          query.provider = "google";
        }
        setOauthSignup(`${query.provider}=${query.code}`);
      } else {
      }
    };
    getQuery();
    if (oauthSignup) {
      oauthLogin();
    }
  }, [oauthSignup, dispatch]);

  const { data } = post.data;
  return (
    <>
      {isPc && (
        <>
          <div className="mainPage">
            <Nav />
            <Iconlist />
            <div className="middleSpace">
              <div className="midContents2 midContentsReverse">
                {data ? (
                  data.posts.posts.length !== 0 ? (
                    <PostList post={data.posts.posts} page={"mainpage"} />
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
              isMobile={false}
              oauthSignup={oauthSignup}
              modalSocialClose={() => {
                setModalSocialSignup(false);
              }}
            ></SocialSignup>
          ) : null}
        </>
      )}

      {isTablet && (
        <>
          <Nav />
          <div className="mainPageResponsive">
            <ResponsiveIconlistTablet />

            <div className="middleSpace2">
              <div className="midContentsResponsive midContentsReverse">
                {data ? (
                  data.posts.posts.length !== 0 ? (
                    data.posts.posts.map((post) => {
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
            <div className="responsiveNewblockPosition"> </div>
          </div>

          {modalSocialSignup ? (
            <SocialSignup
              isMobile={false}
              oauthSignup={oauthSignup}
              modalSocialClose={() => {
                setModalSocialSignup(false);
              }}
            ></SocialSignup>
          ) : null}
        </>
      )}

      {isMobile && (
        <>
          <div className="mainPageResponsive2">
            <ResponsiveNav />
            <ResponsiveFooter />

            <div className="middleSpaceResponsive2">
              <div className="midContentsResponsive2 midContentsReverse">
                {data ? (
                  data.posts.posts.length !== 0 ? (
                    data.posts.posts.map((post) => {
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

          {modalSocialSignup ? (
            <SocialSignup
              isMobile={true}
              oauthSignup={oauthSignup}
              modalSocialClose={() => {
                setModalSocialSignup(false);
              }}
            ></SocialSignup>
          ) : null}
        </>
      )}
    </>
  );
};

export default Mainpage;
