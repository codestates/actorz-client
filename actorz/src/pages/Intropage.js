import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";

import IntroNav from "../components/IntroNav";
import Footer from "../components/Footer";
import Slider from "react-slick";
import { _Button, Comment, Card, Icon } from "semantic-ui-react";
import GotoTop from "../components/GotoTop";
import GotoTopTablet from "../components/GotoTopTablet";
import GotoTopMobile from "../components/GotoTopMobile";
import ScrollTrigger from "@terwanerik/scrolltrigger";
import iphoneG from "../images/iphoneGifcontent.gif";
import ipadG from "../images/ipadGifcontent.gif";
import IntroBackPics from "../components/IntroBackPics";
import IntroProfileEffect from "../components/IntroProfileEffect";
import IntroCommentEffect from "../components/IntroCommentEffect";
import "../App.css";
import "antd/dist/antd.css";

const Intropage = () => {
  const trigger = new ScrollTrigger();
  trigger.add("[data-trigger]");
  trigger.add("[feedback-trigger]");
  trigger.add("[data-triggerAlways]", { once: false });

  const isMobile = useMediaQuery({
    query: "(max-width:767px)",
  });

  const settingsInApp = {
    dots: false,
    infinite: true,
    speed: 2500,
    autoplaySpeed: 1000,
    pauseOnHover: false,
    autoplay: true,
    draggable: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
  };

  const namecardSettings = {
    className: "center",
    centerMode: true,
    dots: false,
    infinite: true,
    speed: 2500,
    autoplaySpeed: 3500,
    pauseOnHover: false,
    autoplay: true,
    draggable: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
  };

  const mobileNamecardSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3500,
  };

  const extraHeart = (
    <a>
      <Icon name="heart" />
      15,455 likes
    </a>
  );

  const extraHeart2 = (
    <a>
      <Icon name="heart" />
      132,555 likes
    </a>
  );

  const extraHeart3 = (
    <a>
      <Icon name="heart" />
      92,188 likes
    </a>
  );

  const extraHeart4 = (
    <a>
      <Icon name="heart" />
      220,381 likes
    </a>
  );

  const extraHeart5 = (
    <a>
      <Icon name="heart" />
      1,010,597 likes
    </a>
  );

  const extraHeart6 = (
    <a>
      <Icon name="heart" />
      98,113 likes
    </a>
  );

  const [position, setPosition] = useState(0);

  const onScroll = () => {
    setPosition(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  window.onload = function () {
    setTimeout(function () {
      window.scrollTo(0, 0);
    }, 100);
  };

  return (
    <>
      <IntroNav />
      <IntroBackPics />
      <IntroProfileEffect />
      <IntroCommentEffect />
      <GotoTop />
      <Footer />
      
    {/*
      {isTablet && (
        <>
          <IntroNav />
          <IntroBackPics />
          <div className="blockPosition"></div>
          <div data-trigger className="startContentsTitleT">
            포트폴리오에 사진과 영상을 담을 수 있다면 어떨까?
            <br />
            <br />
            <br />
          </div>

          <div className="blockPosition"></div>
          <div className="blockPositionDivide"></div>

          <div data-trigger className="startContentsTitleT">
            그렇다면 어떠한 고객이 사용하면 좋을까?
          </div>

          <div className="blockPosition"></div>
          <div className="blockPositionDivide"></div>

          <div data-trigger className="startContentsTitleT">
            답은
          </div>

          <div className="blockPosition"></div>

          <div data-trigger className="startContentsTitleT">
            <img
              className="mainActorPic"
              src="https://media.vlpt.us/images/iooi75/post/ebbbb9d9-784d-4210-b961-2f1d833423b5/Screen%20Shot%202021-07-17%20at%202.16.19%20AM.png"
              alt=""
            />

            <div className="blockPositionDivide"></div>
            <div data-trigger className="contentsPositionWhereStrong">
              {" "}
              배우{" "}
            </div>
          </div>

          <div className="blockPositionDivide"></div>
          <div className="blockPosition"></div>

          <div data-trigger className="startContentsTitleT">
            실제 한국예술종합학교 학생들의 피드백을 종합
          </div>

          <div className="blockPosition"></div>

          

          <div className="blockPositionDivide"></div>

          <div className="blockPositionDivide"></div>

          <div data-trigger className="startContentsTitleTStrong">
            영상도
          </div>

          <div className="blockPositionDivide"></div>

          <div className="gifContents" data-trigger>
            <img
              src="https://media.vlpt.us/images/iooi75/post/61f023dd-ca12-46f7-843b-70b108ca17f1/Jul-16-2021%2022-02-30.gif"
              alt=""
            />
          </div>

          <div className="blockPositionDivide"></div>

          <div data-trigger className="startContentsTitleTStrong">
            사진도
          </div>

          <div className="blockPositionDivide"></div>

          <div className="gifContents" data-trigger>
            <img
              src="https://media.vlpt.us/images/iooi75/post/566f2ed8-e8ff-4a59-b33f-4afc2a23fd79/Screen%20Shot%202021-07-16%20at%2010.39.54%20PM.png"
              alt=""
            />
          </div>

          <div className="blockPositionDivide"></div>

          <div data-trigger className="startContentsTitleTStrong">
            어떠한 기기에서도
          </div>

          <div className="blockPositionDivide"></div>
          <div className="blockPositionDivide"></div>

          <div className="device1T">
            <div data-trigger>
              <img
                alt=""
                className="iphonePic"
                src="https://media.vlpt.us/images/iooi75/post/f7b1069c-b36c-41a8-9bd7-725fbb01940d/iphone-1845808_1280.png"
              />

              <img alt="" className="iphoneGif" src={iphoneG} />
            </div>
          </div>

          <div className="blockPositionDivide"></div>

          <div className="device2T">
            <div data-trigger>
              <img
                alt=""
                className="ipadPicT"
                src="https://media.vlpt.us/images/iooi75/post/11d9594f-fd05-4245-a804-9c78addaab02/image.png"
              />
              <img alt="" className="ipadGifT" src={ipadG} />
            </div>
          </div>

          <div className="blockPositionDivide"></div>

          <div data-trigger className="startContentsTitleTStrong">
            자유롭게
          </div>

          <div className="commentsGroup">
            <div className="commentsGroupX"> </div>
            <div className="commentsGroupY"></div>
            <div className="commentsGroupX"> </div>
          </div>
          <div className="blockPositionDivide"></div>

          <div className="blockPositionDivide"></div>
          <div className="blockPositionDivide"></div>


          <GotoTopTablet />
          <Footer />
        </>
      )}
      */}

      {isMobile && (
        <>
          <IntroNav />
          {/* <ResponsiveApp /> */}
          <div className="mobileSliderPosition">
            <Slider {...settingsInApp} className="mobileSlider">
              <div className="mobileSlider">
                <div className="mobileText">
                  <div className="colorTest02M"> ACTORZ </div>
                  <div className="colorTest01M">
                    {" "}
                    매번 똑같은 포트폴리오 양식 <br />
                    <br />
                    <br />
                    나만의 특별한 포트폴리오에 사진과 영상을 담아 <br />
                    <br />
                    <br /> 남들과 다른 포트폴리오를 만들어 드리겠습니다
                  </div>
                  <div className="scrollIMGPositionM">
                    <img
                      alt=""
                      className="scrollIMG"
                      src="https://media.vlpt.us/images/iooi75/post/29cab61f-6111-4348-8e65-049fa80dbeeb/scroll_down.png"
                    />
                  </div>
                </div>
                <img
                  className="sliderAppContents"
                  alt=""
                  src="https://media.vlpt.us/images/iooi75/post/1f9c6dc0-f13d-446e-b6fc-fdf28a7ab865/m_visual17.jpg"
                />

                {/* <div className="mainContentsCenterDisplay"> 
                    <div  className="scrollIMGPosition">
                      <img alt="" className="introLOGO" src="https://media.vlpt.us/images/iooi75/post/1f61e5e2-18d4-469a-8718-ff6799aadbaf/-1.png"/>
                    </div>
                    <div className="colorTest02"> ACTORZ </div>
                      <br />
                      <br /><br />
                      <br />
                    <div className="colorTest01"> 매번 똑같은 포트폴리오 양식 <br/><br/><br/> 나만의 특별한 포트폴리오에 사진과 영상을 담아 남들과 다른 포트폴리오를 만들어 드리겠습니다 </div>
                      <br />
                      <br />
                      <div className="btnPosTop">
                        <Link to="/mainpage">
                          <button className="startButton1">시작하기</button>
                        </Link>
                      </div>
                      <br />
                      <br />
                      <br />
                      <br />
                      <br />
                      <br />
                    <div className="scrollIMGPosition">
                      <img alt="" className="scrollIMG" src="https://media.vlpt.us/images/iooi75/post/29cab61f-6111-4348-8e65-049fa80dbeeb/scroll_down.png"/>
                    </div>
                  </div> */}

                {/* 
                  <div data-trigger className="introLastContents">
                    <div className="lastContentsTitle">
                      <div className="lastContentsTitlePosition" >
                      다음 2022년 시상식의 주인공은 바로 여러분입니다!  <br />  <br /><br />  <br /> <br />Actorz에서 여러분의 미래를 시작하세요.
                      </div>
                      <br/>
                      <div className="button2PositionResponsive">
                        <Link to="/mainpage">
                          <button className="startButton2T">시작하기</button>
                        </Link>
                      </div>
                    </div>
                  
                    <img className="introLastContents2" alt="" src="https://media.vlpt.us/images/iooi75/post/f682088c-ca53-4303-b9d0-e7b13bfa06f4/3_2.png" />
                  </div> */}
              </div>

              <div className="mobileSlider">
                <div className="mobileText">
                  <div className="colorTest02M"> ACTORZ </div>
                  <div className="colorTest01M">
                    {" "}
                    매번 똑같은 포트폴리오 양식 <br />
                    <br />
                    <br />
                    나만의 특별한 포트폴리오에 사진과 영상을 담아 <br />
                    <br />
                    <br /> 남들과 다른 포트폴리오를 만들어 드리겠습니다
                  </div>
                  <div className="scrollIMGPositionM">
                    <img
                      alt=""
                      className="scrollIMG"
                      src="https://media.vlpt.us/images/iooi75/post/29cab61f-6111-4348-8e65-049fa80dbeeb/scroll_down.png"
                    />
                  </div>
                </div>
                <img
                  className="sliderAppContents"
                  alt=""
                  src="https://media.vlpt.us/images/iooi75/post/98ef02a5-a177-48ee-a7ce-ad7b1ebe0123/m_visual07.jpg"
                />
              </div>

              <div className="mobileSlider">
                <div className="mobileText">
                  <div className="colorTest02M"> ACTORZ </div>
                  <div className="colorTest01M">
                    {" "}
                    매번 똑같은 포트폴리오 양식 <br />
                    <br />
                    <br />
                    나만의 특별한 포트폴리오에 사진과 영상을 담아 <br />
                    <br />
                    <br /> 남들과 다른 포트폴리오를 만들어 드리겠습니다
                  </div>
                  <div className="scrollIMGPositionM">
                    <img
                      alt=""
                      className="scrollIMG"
                      src="https://media.vlpt.us/images/iooi75/post/29cab61f-6111-4348-8e65-049fa80dbeeb/scroll_down.png"
                    />
                  </div>
                </div>
                <img
                  className="sliderAppContents"
                  alt=""
                  src="https://media.vlpt.us/images/iooi75/post/1fd75bb2-3d87-41d0-95a1-33cc8d09d15c/m_visual08_.jpg"
                />
              </div>

              <div className="mobileSlider">
                <div className="mobileText">
                  <div className="colorTest02M"> ACTORZ </div>
                  <div className="colorTest01M">
                    {" "}
                    매번 똑같은 포트폴리오 양식 <br />
                    <br />
                    <br />
                    나만의 특별한 포트폴리오에 사진과 영상을 담아 <br />
                    <br />
                    <br /> 남들과 다른 포트폴리오를 만들어 드리겠습니다
                  </div>
                  <div className="scrollIMGPositionM">
                    <img
                      alt=""
                      className="scrollIMG"
                      src="https://media.vlpt.us/images/iooi75/post/29cab61f-6111-4348-8e65-049fa80dbeeb/scroll_down.png"
                    />
                  </div>
                </div>
                <img
                  className="sliderAppContents"
                  alt=""
                  src="https://media.vlpt.us/images/iooi75/post/3876dded-8caa-4654-8678-573602f23305/m_visual09_.jpg"
                />
              </div>

              <div className="mobileSlider">
                <div className="mobileText">
                  <div className="colorTest02M"> ACTORZ </div>
                  <div className="colorTest01M">
                    {" "}
                    매번 똑같은 포트폴리오 양식 <br />
                    <br />
                    <br />
                    나만의 특별한 포트폴리오에 사진과 영상을 담아 <br />
                    <br />
                    <br /> 남들과 다른 포트폴리오를 만들어 드리겠습니다
                  </div>

                  <div className="scrollIMGPositionM">
                    <img
                      alt=""
                      className="scrollIMG"
                      src="https://media.vlpt.us/images/iooi75/post/29cab61f-6111-4348-8e65-049fa80dbeeb/scroll_down.png"
                    />
                  </div>
                </div>
                <img
                  className="sliderAppContents"
                  alt=""
                  src="https://media.vlpt.us/images/iooi75/post/4cd38932-1614-4947-adf0-3e67c3eab566/m_visual10.jpg"
                />
              </div>

              <div className="mobileSlider">
                <div className="mobileText">
                  <div className="colorTest02M"> ACTORZ </div>
                  <div className="colorTest01M">
                    {" "}
                    매번 똑같은 포트폴리오 양식 <br />
                    <br />
                    <br />
                    나만의 특별한 포트폴리오에 사진과 영상을 담아 <br />
                    <br />
                    <br /> 남들과 다른 포트폴리오를 만들어 드리겠습니다
                  </div>
                  <div className="scrollIMGPositionM">
                    <img
                      alt=""
                      className="scrollIMG"
                      src="https://media.vlpt.us/images/iooi75/post/29cab61f-6111-4348-8e65-049fa80dbeeb/scroll_down.png"
                    />
                  </div>
                </div>
                <img
                  className="sliderAppContents"
                  alt=""
                  src="https://media.vlpt.us/images/iooi75/post/64d865c2-6db1-4ef2-ad10-d613967527b4/m_visual11.jpg"
                />
              </div>

              <div className="mobileSlider">
                <div className="mobileText">
                  <div className="colorTest02M"> ACTORZ </div>
                  <div className="colorTest01M">
                    {" "}
                    매번 똑같은 포트폴리오 양식 <br />
                    <br />
                    <br />
                    나만의 특별한 포트폴리오에 사진과 영상을 담아 <br />
                    <br />
                    <br /> 남들과 다른 포트폴리오를 만들어 드리겠습니다
                  </div>
                  <div className="scrollIMGPositionM">
                    <img
                      alt=""
                      className="scrollIMG"
                      src="https://media.vlpt.us/images/iooi75/post/29cab61f-6111-4348-8e65-049fa80dbeeb/scroll_down.png"
                    />
                  </div>
                </div>
                <img
                  className="sliderAppContents"
                  alt=""
                  src="https://media.vlpt.us/images/iooi75/post/e95deb2c-abfe-4963-8217-531b78ca6248/m_visual12_.jpg"
                />
              </div>

              <div className="mobileSlider">
                <div className="mobileText">
                  <div className="colorTest02M"> ACTORZ </div>
                  <div className="colorTest01M">
                    {" "}
                    매번 똑같은 포트폴리오 양식 <br />
                    <br />
                    <br />
                    나만의 특별한 포트폴리오에 사진과 영상을 담아 <br />
                    <br />
                    <br /> 남들과 다른 포트폴리오를 만들어 드리겠습니다
                  </div>
                  <div className="scrollIMGPositionM">
                    <img
                      alt=""
                      className="scrollIMG"
                      src="https://media.vlpt.us/images/iooi75/post/29cab61f-6111-4348-8e65-049fa80dbeeb/scroll_down.png"
                    />
                  </div>
                </div>
                <img
                  className="sliderAppContents"
                  alt=""
                  src="https://media.vlpt.us/images/iooi75/post/1985376a-539d-4a79-ad8e-2cee8638df53/m_visual18_.jpg"
                />
              </div>

              <div className="mobileSlider">
                <div className="mobileText">
                  <div className="colorTest02M"> ACTORZ </div>
                  <div className="colorTest01M">
                    {" "}
                    매번 똑같은 포트폴리오 양식 <br />
                    <br />
                    <br />
                    나만의 특별한 포트폴리오에 사진과 영상을 담아 <br />
                    <br />
                    <br /> 남들과 다른 포트폴리오를 만들어 드리겠습니다
                  </div>
                  <div className="scrollIMGPositionM">
                    <img
                      alt=""
                      className="scrollIMG"
                      src="https://media.vlpt.us/images/iooi75/post/29cab61f-6111-4348-8e65-049fa80dbeeb/scroll_down.png"
                    />
                  </div>
                </div>
                <img
                  className="sliderAppContents"
                  alt=""
                  src="https://media.vlpt.us/images/iooi75/post/307c2755-b93d-4138-b620-cb4b87704d9a/m_visual05__.jpg"
                />
              </div>

              <div className="mobileSlider">
                <div className="mobileText">
                  <div className="colorTest02M"> ACTORZ </div>
                  <div className="colorTest01M">
                    {" "}
                    매번 똑같은 포트폴리오 양식 <br />
                    <br />
                    <br />
                    나만의 특별한 포트폴리오에 사진과 영상을 담아 <br />
                    <br />
                    <br /> 남들과 다른 포트폴리오를 만들어 드리겠습니다
                  </div>
                  <div className="scrollIMGPositionM">
                    <img
                      alt=""
                      className="scrollIMG"
                      src="https://media.vlpt.us/images/iooi75/post/29cab61f-6111-4348-8e65-049fa80dbeeb/scroll_down.png"
                    />
                  </div>
                </div>
                <img
                  className="sliderAppContents"
                  alt=""
                  src="https://media.vlpt.us/images/iooi75/post/82f4119f-55e9-40d7-a09c-0095ce83065f/m_visual03.jpg"
                />
              </div>

              <div className="mobileSlider">
                <div className="mobileText">
                  <div className="colorTest02M"> ACTORZ </div>
                  <div className="colorTest01M">
                    {" "}
                    매번 똑같은 포트폴리오 양식 <br />
                    <br />
                    <br />
                    나만의 특별한 포트폴리오에 사진과 영상을 담아 <br />
                    <br />
                    <br /> 남들과 다른 포트폴리오를 만들어 드리겠습니다
                  </div>
                  <div className="scrollIMGPositionM">
                    <img
                      alt=""
                      className="scrollIMG"
                      src="https://media.vlpt.us/images/iooi75/post/29cab61f-6111-4348-8e65-049fa80dbeeb/scroll_down.png"
                    />
                  </div>
                </div>
                <img
                  className="sliderAppContents"
                  alt=""
                  src="https://media.vlpt.us/images/iooi75/post/3113cbf8-257f-47d0-aef2-9354ad8134b7/m_visual04.jpg"
                />
              </div>

              <div className="mobileSlider">
                <div className="mobileText">
                  <div className="colorTest02M"> ACTORZ </div>
                  <div className="colorTest01M">
                    {" "}
                    매번 똑같은 포트폴리오 양식 <br />
                    <br />
                    <br />
                    나만의 특별한 포트폴리오에 사진과 영상을 담아 <br />
                    <br />
                    <br /> 남들과 다른 포트폴리오를 만들어 드리겠습니다
                  </div>
                  <div className="scrollIMGPositionM">
                    <img
                      alt=""
                      className="scrollIMG"
                      src="https://media.vlpt.us/images/iooi75/post/29cab61f-6111-4348-8e65-049fa80dbeeb/scroll_down.png"
                    />
                  </div>
                </div>
                <img
                  className="sliderAppContents"
                  alt=""
                  src="https://media.vlpt.us/images/iooi75/post/7d22a316-5a2a-4c1c-98c0-d5b0abfba2c1/m_visual13.jpg"
                />
              </div>

              <div className="mobileSlider">
                <div className="mobileText">
                  <div className="colorTest02M"> ACTORZ </div>
                  <div className="colorTest01M">
                    {" "}
                    매번 똑같은 포트폴리오 양식 <br />
                    <br />
                    <br />
                    나만의 특별한 포트폴리오에 사진과 영상을 담아 <br />
                    <br />
                    <br /> 남들과 다른 포트폴리오를 만들어 드리겠습니다
                  </div>
                  <div className="scrollIMGPositionM">
                    <img
                      alt=""
                      className="scrollIMG"
                      src="https://media.vlpt.us/images/iooi75/post/29cab61f-6111-4348-8e65-049fa80dbeeb/scroll_down.png"
                    />
                  </div>
                </div>
                <img
                  className="sliderAppContents"
                  alt=""
                  src="https://media.vlpt.us/images/iooi75/post/76ffc763-3084-49b7-992c-0ecd77639eda/m_visual14_.jpg"
                />
              </div>

              <div className="mobileSlider">
                <div className="mobileText">
                  <div className="colorTest02M"> ACTORZ </div>
                  <div className="colorTest01M">
                    {" "}
                    매번 똑같은 포트폴리오 양식 <br />
                    <br />
                    <br />
                    나만의 특별한 포트폴리오에 사진과 영상을 담아 <br />
                    <br />
                    <br /> 남들과 다른 포트폴리오를 만들어 드리겠습니다
                  </div>
                  <div className="scrollIMGPositionM">
                    <img
                      alt=""
                      className="scrollIMG"
                      src="https://media.vlpt.us/images/iooi75/post/29cab61f-6111-4348-8e65-049fa80dbeeb/scroll_down.png"
                    />
                  </div>
                </div>
                <img
                  className="sliderAppContents"
                  alt=""
                  src="https://media.vlpt.us/images/iooi75/post/b3ec1068-7920-40f3-bafd-3b98fcbe97a2/m_visual15_.jpg"
                />
              </div>

              <div className="mobileSlider">
                <div className="mobileText">
                  <div className="colorTest02M"> ACTORZ </div>
                  <div className="colorTest01M">
                    {" "}
                    매번 똑같은 포트폴리오 양식 <br />
                    <br />
                    <br />
                    나만의 특별한 포트폴리오에 사진과 영상을 담아 <br />
                    <br />
                    <br /> 남들과 다른 포트폴리오를 만들어 드리겠습니다
                  </div>
                  <div className="scrollIMGPositionM">
                    <img
                      alt=""
                      className="scrollIMG"
                      src="https://media.vlpt.us/images/iooi75/post/29cab61f-6111-4348-8e65-049fa80dbeeb/scroll_down.png"
                    />
                  </div>
                </div>
                <img
                  className="sliderAppContents"
                  alt=""
                  src="https://media.vlpt.us/images/iooi75/post/351cf1e9-9190-46eb-9c48-31240325ac2b/m_visual16_.jpg"
                />
              </div>
            </Slider>
          </div>

          <div className="blockPosition"></div>
          <div data-trigger className="startContentsTitleM">
            <div>
              포트폴리오에 <br /> <br /> <br /> 사진과 영상을 담을 수 있다면
              어떨까?
            </div>
            <br />
            <br />
            <br />
            {/* <h4> * 실제 한국예술종합학교 학생들의 설문 조사를 바탕으로 작성하였습니다. </h4> */}
          </div>

          <div className="blockPosition"></div>
          <div className="blockPositionDivide"></div>

          <div data-trigger className="startContentsTitleM">
            그렇다면 <br />
            <br />
            <br />
            어떠한 고객이 사용하면 좋을까?
          </div>

          <div className="blockPosition"></div>
          <div className="blockPositionDivide"></div>

          <div data-trigger className="startContentsTitleM">
            답은
          </div>

          <div className="blockPosition"></div>

          <div data-trigger className="startContentsTitleM">
            <img
              className="mainActorPicM"
              src="https://media.vlpt.us/images/iooi75/post/ebbbb9d9-784d-4210-b961-2f1d833423b5/Screen%20Shot%202021-07-17%20at%202.16.19%20AM.png"
              alt=""
            />

            <div className="blockPositionDivide"></div>
            <div data-trigger className="contentsPositionWhereStrong">
              {" "}
              배우{" "}
            </div>
          </div>

          <div className="blockPositionDivide"></div>
          <div className="blockPosition"></div>

          <div data-trigger className="startContentsTitleM">
            실제 한국예술종합학교 학생들의 <br />
            <br />
            <br /> 피드백을 종합
          </div>

          {/* <div className="blockPosition"></div>  */}
          <div className="blockPositionDivide"></div>
          <div className="blockPositionDivide"></div>

          <div className="mobileCommentsPosition">
            <Comment.Group data-trigger size="massive">
              <Comment>
                <Comment.Avatar
                  as="a"
                  src="https://media.vlpt.us/images/iooi75/post/91a32cce-61a4-4721-b99e-0354f325ccd2/thumb-2040665147_d6gESnAz_673a0411062e8b6370c76113f987e20ce44474fc_370x420.jpg"
                />
                <Comment.Content>
                  <Comment.Author as="a">임정국</Comment.Author>
                  <Comment.Metadata>
                    <span>5 days ago</span>
                  </Comment.Metadata>
                  <Comment.Text>
                    역할에 따라 다른 포토폴리오를 제출하고 싶습니다.
                  </Comment.Text>
                  <Comment.Actions>
                    <a>Reply</a>
                  </Comment.Actions>
                </Comment.Content>
              </Comment>
            </Comment.Group>

            <Comment.Group data-trigger size="small">
              <Comment>
                <Comment.Avatar
                  as="a"
                  src="https://media.vlpt.us/images/iooi75/post/8358273b-0356-4609-bcaa-c5994e6f8143/thumb-3555495007_UkK1tqyz_9b9162add0597b54c1666643e93f359a985649b9_370x420.jpg"
                />
                <Comment.Content>
                  <Comment.Author as="a">한혜민</Comment.Author>
                  <Comment.Metadata>
                    <span>8 days ago</span>
                  </Comment.Metadata>
                  <Comment.Text>
                    여태까지 뽑는 사람/회사 중심으로 만들어진 어플이
                    대부분이었는데, 배우 중심이면 좋겠습니다. 단순히 예쁘고 잘난
                    사람들, 또는 멋진 사진을 찍은 사람이 상위권에 오르는 것이
                    아니라 진짜 배우를 발굴해낼 수 있는 기능을 할 수 있으면
                    좋겠습니다. 좋은 어플을 만들어주셔서 감사합니다.
                  </Comment.Text>
                  <Comment.Actions>
                    <a>Reply</a>
                  </Comment.Actions>
                </Comment.Content>
              </Comment>
            </Comment.Group>

            <Comment.Group data-trigger size="massive">
              <Comment>
                <Comment.Avatar
                  as="a"
                  src="https://media.vlpt.us/images/iooi75/post/5fb05e93-a32a-4283-a28f-1a3f05b150db/image.png"
                />
                <Comment.Content>
                  <Comment.Author as="a">이하나</Comment.Author>
                  <Comment.Metadata>
                    <span>6 days ago</span>
                  </Comment.Metadata>
                  <Comment.Text>남들과 다르게 어필하고 싶어요</Comment.Text>
                  <Comment.Actions>
                    <a>Reply</a>
                  </Comment.Actions>
                </Comment.Content>
              </Comment>
            </Comment.Group>

            <Comment.Group data-trigger size="massive">
              <Comment>
                <Comment.Avatar
                  as="a"
                  src="https://media.vlpt.us/images/iooi75/post/69939f54-8a86-4301-a6be-19ae12f09d7e/image.png"
                />
                <Comment.Content>
                  <Comment.Author as="a">이빛나</Comment.Author>
                  <Comment.Metadata>
                    <span>6 days ago</span>
                  </Comment.Metadata>
                  <Comment.Text>
                    현재는 개인유튜브를 개설하여 그곳에 출연영상들을 올리고
                    있는데, 간혹 저작권 등의 문제로 본인의 출연영상을 유튜브에
                    못 올릴 때도 있었기 때문에. [저작권 문제]
                  </Comment.Text>
                  <Comment.Actions>
                    <a>Reply</a>
                  </Comment.Actions>
                </Comment.Content>
              </Comment>
            </Comment.Group>

            <Comment.Group data-trigger size="massive">
              <Comment>
                <Comment.Avatar
                  as="a"
                  src="https://media.vlpt.us/images/iooi75/post/f424b957-0755-4407-b24f-01cd5da2c5a3/thumb-2009107696_1eypsHg8_75b78deb1f72d28d204e9c7f8684aa27b44c0cab_370x420.jpg"
                />
                <Comment.Content>
                  <Comment.Author as="a">이준석</Comment.Author>
                  <Comment.Metadata>
                    <span>4 days ago</span>
                  </Comment.Metadata>
                  <Comment.Text>
                    더 경쟁력있게 포트폴리오를 만드는 방법을 알고 싶습니다.
                  </Comment.Text>
                  <Comment.Actions>
                    <a>Reply</a>
                  </Comment.Actions>
                </Comment.Content>
              </Comment>
            </Comment.Group>

            <Comment.Group data-trigger size="large">
              <Comment>
                <Comment.Avatar
                  as="a"
                  src="https://media.vlpt.us/images/iooi75/post/902642ff-9b2d-404a-9116-82a42e44642b/image.png"
                />
                <Comment.Content>
                  <Comment.Author as="a">이강인</Comment.Author>
                  <Comment.Metadata>
                    <span>6 days ago</span>
                  </Comment.Metadata>
                  <Comment.Text>
                    {" "}
                    어플을 통해 여러 에이전시들에 프로필을 간편하게 보낼 수
                    있다면 좋을 것 같습니다
                  </Comment.Text>
                  <Comment.Actions>
                    <a>Reply</a>
                  </Comment.Actions>
                </Comment.Content>
              </Comment>
            </Comment.Group>

            <Comment.Group
              data-trigger
              className="commentsBlurEffect"
              size="large"
            >
              <Comment>
                <Comment.Avatar
                  className="commentsBlurEffect"
                  as="a"
                  src="https://media.vlpt.us/images/iooi75/post/a0e76905-5ec8-4bcc-8d64-2db0a6e6e168/image.png"
                />
                <Comment.Content className="commentsBlurEffect">
                  <Comment.Author as="a">이윤아</Comment.Author>
                  <Comment.Metadata>
                    <span>7 days ago</span>
                  </Comment.Metadata>
                  <Comment.Text>
                    카카오나 인스타와 연동이 되었으면 좋겠습니다.
                  </Comment.Text>
                  <Comment.Actions>
                    <a>Reply</a>
                  </Comment.Actions>
                </Comment.Content>
              </Comment>
            </Comment.Group>

            <Comment.Group
              className="commentsBlurEffect2"
              data-trigger
              size="large"
            >
              <Comment>
                <Comment.Avatar
                  className="commentsBlurEffect2"
                  as="a"
                  src="https://media.vlpt.us/images/iooi75/post/3c22e9a1-6c10-44fa-b8e2-ecdec3ed2ccd/thumb-2009107696_xPJE0lpT_da11888d84e969f6f85acbdb214582d75c19fd86_370x420.jpg"
                />
                <Comment.Content className="commentsBlurEffect2">
                  <Comment.Author as="a">김은미</Comment.Author>
                  <Comment.Metadata>
                    <span>2 days ago</span>
                  </Comment.Metadata>
                  <Comment.Text>
                    어떻게 해야 강력한 이미지로 부각될까와 이 프로필이 제대로
                    전해질까의 고민^^;
                  </Comment.Text>
                  <Comment.Actions>
                    <a>Reply</a>
                  </Comment.Actions>
                </Comment.Content>
              </Comment>
            </Comment.Group>

            <Comment.Group
              className="commentsBlurEffect3"
              data-trigger
              size="large"
            >
              <Comment>
                <Comment.Avatar
                  className="commentsBlurEffect3"
                  as="a"
                  src="https://media.vlpt.us/images/iooi75/post/a061751c-9e73-4344-9ff4-8edd9fc70dfa/image.png"
                />
                <Comment.Content className="commentsBlurEffect3">
                  <Comment.Author as="a">이하늘</Comment.Author>
                  <Comment.Metadata>
                    <span>2 days ago</span>
                  </Comment.Metadata>
                  <Comment.Text>
                    이미 존재하는 에이전시, 캐스팅디비 어라운드어스 등의 어플과
                    차이점이 있을까요
                  </Comment.Text>
                  <Comment.Actions>
                    <a>Reply</a>
                  </Comment.Actions>
                </Comment.Content>
              </Comment>
            </Comment.Group>

            <Comment.Group
              className="commentsBlurEffect4"
              data-trigger
              size="massive"
            >
              <Comment>
                <Comment.Avatar
                  className="commentsBlurEffect4"
                  as="a"
                  src="https://media.vlpt.us/images/iooi75/post/9763ba86-5501-426f-ada9-a43206c5e68d/image.png"
                />
                <Comment.Content className="commentsBlurEffect4">
                  <Comment.Author as="a">윤나라</Comment.Author>
                  <Comment.Metadata>
                    <span>9 days ago</span>
                  </Comment.Metadata>
                  <Comment.Text>
                    타 사이트와의 명백한 차이점? 배우들은 개개인의 작품활동을
                    하기위해 사이트에 등록을 합니다.. 본인에게 작품이 캐스팅이
                    되고, 활동을 할 수 있어야하는데 어떠한 작품에 어떤 경로로
                    어떤 제작진이 살펴보는지에 대한 정보공유(?)가 있으면 좋을것
                    같아요
                  </Comment.Text>
                  <Comment.Actions>
                    <a>Reply</a>
                  </Comment.Actions>
                </Comment.Content>
              </Comment>
            </Comment.Group>

            <Comment.Group
              className="commentsBlurEffect5"
              data-trigger
              size="large"
            >
              <Comment>
                <Comment.Avatar
                  className="commentsBlurEffect5"
                  as="a"
                  src="https://media.vlpt.us/images/iooi75/post/d820e8e1-9b0e-467e-9ae3-cbf9f41facc2/image.png"
                />
                <Comment.Content className="commentsBlurEffect5">
                  <Comment.Author as="a">이수진</Comment.Author>
                  <Comment.Metadata>
                    <span>2 days ago</span>
                  </Comment.Metadata>
                  <Comment.Text>
                    만드는 플랫폼이나 형식이 뚜렷하지 않아 어려운 것같습니다.{" "}
                  </Comment.Text>
                  <Comment.Actions>
                    <a>Reply</a>
                  </Comment.Actions>
                </Comment.Content>
              </Comment>
            </Comment.Group>

            <Comment.Group
              data-trigger
              className="commentsBlurEffect6"
              size="large"
            >
              <Comment>
                <Comment.Avatar
                  className="commentsBlurEffect6"
                  as="a"
                  src="https://media.vlpt.us/images/iooi75/post/68b1c9d4-5bca-4b69-bf4f-b0f7f9063b69/image.png"
                />
                <Comment.Content className="commentsBlurEffect6">
                  <Comment.Author as="a">이규진</Comment.Author>
                  <Comment.Metadata>
                    <span>2 days ago</span>
                  </Comment.Metadata>
                  <Comment.Text>양식이 정해져 있으면 좋겠습니다. </Comment.Text>
                  <Comment.Actions>
                    <a>Reply</a>
                  </Comment.Actions>
                </Comment.Content>
              </Comment>
            </Comment.Group>

            <Comment.Group
              data-trigger
              className="commentsBlurEffect7"
              size="large"
            >
              <Comment>
                <Comment.Avatar
                  className="commentsBlurEffect7"
                  as="a"
                  src="https://media.vlpt.us/images/iooi75/post/8b5bce11-546a-40fe-bfc0-cf0ff345029d/image.png"
                />
                <Comment.Content className="commentsBlurEffect7">
                  <Comment.Author as="a">이윤아</Comment.Author>
                  <Comment.Metadata>
                    <span>7 days ago</span>
                  </Comment.Metadata>
                  <Comment.Text>
                    카카오나 인스타와 연동이 되었으면 좋겠습니다.
                  </Comment.Text>
                  <Comment.Actions>
                    <a>Reply</a>
                  </Comment.Actions>
                </Comment.Content>
              </Comment>
            </Comment.Group>

            <Comment.Group
              data-trigger
              className="commentsBlurEffect8"
              size="massive"
            >
              <Comment>
                <Comment.Avatar
                  className="commentsBlurEffect8"
                  as="a"
                  src="https://media.vlpt.us/images/iooi75/post/9dd6bae5-a8f7-491a-9dca-6abdb5d6658d/image.png"
                />
                <Comment.Content className="commentsBlurEffect8">
                  <Comment.Author as="a">김나은</Comment.Author>
                  <Comment.Metadata>
                    <span>11 days ago</span>
                  </Comment.Metadata>
                  <Comment.Text>
                    매니저를 통하는 방법보다 편한 방법을 알고싶네요...{" "}
                  </Comment.Text>
                  <Comment.Actions>
                    <a>Reply</a>
                  </Comment.Actions>
                </Comment.Content>
              </Comment>
            </Comment.Group>

            <Comment.Group
              data-trigger
              className="commentsBlurEffect9"
              size="massive"
            >
              <Comment>
                <Comment.Avatar
                  className="commentsBlurEffect9"
                  as="a"
                  src="https://media.vlpt.us/images/iooi75/post/c59e08f7-2ec0-496a-b276-1252bf46e6e6/image.png"
                />
                <Comment.Content className="commentsBlurEffect9">
                  <Comment.Author as="a">최수빈</Comment.Author>
                  <Comment.Metadata>
                    <span>11 days ago</span>
                  </Comment.Metadata>
                  <Comment.Text>
                    사진만으로 배우의 매력을 다 알 수 없다고 생각하기 때문에
                    다른 무언가가 필요해요{" "}
                  </Comment.Text>
                  <Comment.Actions>
                    <a>Reply</a>
                  </Comment.Actions>
                </Comment.Content>
              </Comment>
            </Comment.Group>

            <Comment.Group
              data-trigger
              className="commentsBlurEffect10"
              size="massive"
            >
              <Comment>
                <Comment.Avatar
                  className="commentsBlurEffect10"
                  as="a"
                  src="https://media.vlpt.us/images/iooi75/post/5533a9b7-f895-402b-8ca8-fb9b69f5a3b9/image.png"
                />
                <Comment.Content className="commentsBlurEffect10">
                  <Comment.Author as="a">우지원</Comment.Author>
                  <Comment.Metadata>
                    <span>10 days ago</span>
                  </Comment.Metadata>
                  <Comment.Text>
                    올리고 싶지 않은 경력은 제외하면 좋겠습니다.{" "}
                  </Comment.Text>
                  <Comment.Actions>
                    <a>Reply</a>
                  </Comment.Actions>
                </Comment.Content>
              </Comment>
            </Comment.Group>

            <Comment.Group
              data-trigger
              className="commentsBlurEffect11"
              size="massive"
            >
              <Comment>
                <Comment.Avatar
                  className="commentsBlurEffect11"
                  as="a"
                  src="https://media.vlpt.us/images/iooi75/post/ecaed6e9-6e2a-4027-87dd-ab705e9ffec0/image.png"
                />
                <Comment.Content className="commentsBlurEffect11">
                  <Comment.Author as="a">이람</Comment.Author>
                  <Comment.Metadata>
                    <span>8 days ago</span>
                  </Comment.Metadata>
                  <Comment.Text>
                    배우들끼리 사진수업을 듣고 서로 찍어줄 수 있는 플랫폼,
                    협력자가 되면 좋겠단 생각이 듭니다.
                  </Comment.Text>
                  <Comment.Actions>
                    <a>Reply</a>
                  </Comment.Actions>
                </Comment.Content>
              </Comment>
            </Comment.Group>
          </div>

          <div className="blockPosition"></div>

          <div className="blockPositionDivide"></div>

          <div data-trigger className="startContentsTitleTStrong">
            영상도
          </div>

          <div className="blockPositionDivide"></div>

          <div className="gifPositioning">
            <div className="gifContentsM" data-trigger>
              <img
                className="gifM"
                src="https://media.vlpt.us/images/iooi75/post/61f023dd-ca12-46f7-843b-70b108ca17f1/Jul-16-2021%2022-02-30.gif"
                alt=""
              />
            </div>
          </div>

          <div className="blockPositionDivide"></div>

          <div data-trigger className="startContentsTitleTStrong">
            사진도
          </div>

          <div className="blockPositionDivide"></div>

          <div className="gifContentsM" data-trigger>
            <img
              className="pictureReposition"
              src="https://media.vlpt.us/images/iooi75/post/566f2ed8-e8ff-4a59-b33f-4afc2a23fd79/Screen%20Shot%202021-07-16%20at%2010.39.54%20PM.png"
              alt=""
            />
          </div>

          <div className="blockPositionDivide"></div>

          <div data-trigger className="startContentsTitleT">
            어떠한 기기에서도
          </div>

          <div className="blockPositionDivide"></div>
          <div className="blockPositionDivide"></div>

          <div className="device1M">
            <div data-trigger>
              {/* <img alt="" className="iphonePicM" src="https://media.vlpt.us/images/iooi75/post/f7b1069c-b36c-41a8-9bd7-725fbb01940d/iphone-1845808_1280.png" /> */}

              <img alt="" className="iphoneGifM" src={iphoneG} />
            </div>
          </div>

          <div className="blockPositionDivide"></div>

          <div className="device2M">
            <div data-trigger>
              {/* <img alt="" className="ipadPicM" src="https://media.vlpt.us/images/iooi75/post/f656e516-00ee-4d13-8df1-83daf1a79b64/image-removebg-preview.png" /> */}
              <img alt="" className="ipadGifM" src={ipadG} />
            </div>
          </div>

          <div className="blockPositionDivide"></div>

          <div data-trigger className="startContentsTitleT">
            자유롭게
          </div>

          <div className="blockPositionDivide"></div>
          <div className="blockPositionDivide"></div>
          <div data-trigger className="startContentsTitleT">
            이미 증명 되었으니까
          </div>

          <div className="blockPositionDivide"></div>

          <div data-trigger>
            <Slider {...mobileNamecardSettings} className="cardlistGroupM">
              <div className="cardUIM">
                <Card
                  image="https://media.vlpt.us/images/iooi75/post/9ad5085d-4265-4d91-bdb7-bda8561a6ed2/60497_30779_2227.jpeg"
                  header="신혜선"
                  meta="배우"
                  description="안녕하세요 🤗  배우 신혜선입니다. 요즘 핫한 이 어플 저도 뒤늦게 시작했는데, 간단하게 작성만하면 출연 제의 연락이 오니까 너무너무 편한 것 같아요!"
                  extra={extraHeart2}
                />
              </div>
              <div className="cardUIM">
                <Card
                  image="https://media.vlpt.us/images/iooi75/post/c65e0d90-4b8b-471f-8306-5b6dd7b754ba/image.png"
                  header="송강"
                  meta="배우"
                  description="요즘 신인배우 사이에서 인기있는 앱! 코로나 때문에 모두가 힘든 시기이지만 모두 좋은 결과 있기를 바랄게요!   🥰 스위트 홈도 많이 사랑해주세요! ㅋㅋㅋㅋ"
                  extra={extraHeart4}
                />
              </div>
              <div className="cardUIM">
                <Card
                  className="profileCardList"
                  image="https://media.vlpt.us/images/iooi75/post/4b3c6e85-002a-400b-aeb6-03e8ab10556f/Screen%20Shot%202021-07-15%20at%206.37.56%20AM.png"
                  header="유병재"
                  meta="개그맨"
                  description="안녕하세요. 유병재입니다. 어플에 등록한지 3일만에 영화출연 연락이 왔습니다. 참 신기한 세상이네요 ㅋㅋㅋ"
                  extra={extraHeart}
                />
              </div>
              <div className="cardUIM">
                <Card
                  image="https://cdnweb01.wikitree.co.kr/webdata/editor/202009/23/img_20200923081643_5ab21941.webp"
                  header="민효린"
                  meta="배우"
                  description="신인 때는 항~~상 두꺼운 포트폴리오를 가지고 직접 발로 뛰어 다녔는데, 무료로 이러한 좋은 어플이 생겨서 너무 좋은 것 같아요. 신인 배우분들 모두 파이팅하세요!"
                  extra={extraHeart3}
                />
              </div>
              <div className="cardUIM">
                <Card
                  image="https://media.vlpt.us/images/iooi75/post/d1283901-7551-4f9d-96cc-ceafd12194ba/image.png"
                  header="봉준호"
                  meta="영화감독"
                  description="원하는 배우의 나이로 배우를 검색할 수 있는 점이 좋습니다. 또한, 배우들의 다양한 모습을 볼 수 있어서 좋습니다. 차기작을 위하여 열심히 배우들을 검토하고 있습니다. 감독님들께도 추천드리는 앱입니다."
                  extra={extraHeart5}
                />
              </div>
              <div className="cardUIM">
                <Card
                  image="https://media.vlpt.us/images/iooi75/post/1ab14050-1a26-49e0-b195-3696ab89d6e1/image.png"
                  header="오연서"
                  meta="배우"
                  description="원하는 포트폴리오를 만들 수 있는 점이 정말 좋았어요. 👀 지원하는 역할에 맞는 자신의 경력을 어필하여 유니크한 포트폴리오를 제출할 수 있었습니다 👍🏻"
                  extra={extraHeart6}
                />
              </div>
            </Slider>
          </div>

          <div className="mainIntro1">매번 똑같은 포트폴리오 양식</div>
          <br></br>
          <div className="mainIntro2">
            나만의 특별한 포트폴리오에 사진과 영상을 담아 남들과 다른
            포트폴리오를 만들어 드리겠습니다.
          </div>
          <br></br>
          <br></br>
          <br></br>
          {/* <div className="button1Position">
            <Link to="/mainpage">
              <Button type="primary" className="startButton1" danger>시작하기</Button>
            </Link>
          </div> */}

          <div data-trigger className="introLastContents">
            <div className="lastContentsTitleM">
              <div className="lastContext">
                다음 2022년 시상식의 <br />
                <br />
                <br /> 주인공은 바로 여러분입니다! <br /> <br />
                <br /> <br /> <br />
                Actorz에서 여러분의 미래를 시작하세요.
              </div>
              <br />
              <div className="button2PositionResponsive">
                <Link to="/mainpage">
                  <button className="startButton2T">시작하기</button>
                </Link>
              </div>
            </div>

            <img
              className="introLastContents2"
              alt=""
              src="https://media.vlpt.us/images/iooi75/post/f682088c-ca53-4303-b9d0-e7b13bfa06f4/3_2.png"
            />
          </div>
          <GotoTopMobile />
        </>
      )}
    </>
  );
};
export default Intropage;
