import React, { useState, useEffect } from "react";
import { _Button } from "semantic-ui-react";
import iphoneG from "../images/iphoneGifcontent.gif";
import ipadG from "../images/ipadGifcontent.gif";
import ProfilesEffectinPC from "./ProfilesEffectinPC";
import { useMediaQuery } from "react-responsive";
import ProfilesEffectinTablet from "./ProfilesEffectinTablet";
import IntroGIFinPC from "./IntroGIFinPC";

const IntroProfileEffect = () => {
  const isPc = useMediaQuery({
    query: "(min-width:1600px)",
  });

  const isTablet = useMediaQuery({
    query: "(min-width:768px) and (max-width:1599px)",
  });

  const isMobile = useMediaQuery({
    query: "(max-width:767px)",
  });

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

  return (
    <>
      <div className="blockPosition"></div>
      <div data-trigger className="startContentsTitle">
        <div>포트폴리오에 사진과 영상을 담을 수 있다면 어떨까?</div>
        <br />
        <br />
        <br />
      </div>

      <div className="blockPosition"></div>

      <div data-trigger className="startContentsTitle">
        그렇다면 어떠한 고객이 사용하면 좋을까?
      </div>

      <div className="blockPosition"></div>

      <div data-trigger className="startContentsTitle">
        답은
      </div>

      <div className="blockPosition"></div>

      <div data-trigger className="startContentsTitle">
        <img
          className="mainActorPic"
          src="https://media.vlpt.us/images/iooi75/post/ebbbb9d9-784d-4210-b961-2f1d833423b5/Screen%20Shot%202021-07-17%20at%202.16.19%20AM.png"
          alt=""
        />

        <div className="blockPositionDivide"></div>
        <div data-trigger className="contentsPositionWhere">
          {" "}
          배우{" "}
        </div>
      </div>

      <div className="blockPositionDivide"></div>
      <div className="blockPosition"></div>

      <div data-trigger className="startContentsTitle">
        실제 한국예술종합학교 학생들의 피드백을 종합
      </div>
      <div className="blockPosition"></div>
      <ProfilesEffectinTablet />
      <div className="blockPositionDivide"></div>
      <div className="blockPositionDivide"></div><div className="gifContetsDivider">
      <div className="gifContents" data-trigger>
        <img
          src="https://media.vlpt.us/images/iooi75/post/61f023dd-ca12-46f7-843b-70b108ca17f1/Jul-16-2021%2022-02-30.gif"
          alt=""
        />
        <div data-trigger className="blockPosition30">
          사진도
        </div>
      </div>

        <div className="blockPositionDivider">
          <div data-trigger className="blockPosition20">
            영상도
          </div>
          <div data-trigger className="positionYellow">
            <img
              src="https://media.vlpt.us/images/iooi75/post/566f2ed8-e8ff-4a59-b33f-4afc2a23fd79/Screen%20Shot%202021-07-16%20at%2010.39.54%20PM.png"
              alt=""
            />
          </div>
        </div>
      </div>


      <div className="blockPositionDivide"></div>
      <div className="blockPositionDivide"></div>

      <IntroGIFinPC /> 
      

      <div className="blockPositionDivide"></div>
      <div className="blockPositionDivide"></div>

      <div data-trigger className="startContentsTitle">
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
    </>
  );
};

export default IntroProfileEffect;
