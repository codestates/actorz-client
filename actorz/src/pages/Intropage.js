import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import IntroNav from "../components/IntroNav";
import Footer from "../components/Footer";

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
import IntroMobileSlider from "../components/IntroMobileSlider";

const Intropage = () => {
  const trigger = new ScrollTrigger();
  trigger.add("[data-trigger]");
  trigger.add("[feedback-trigger]");
  trigger.add("[data-triggerAlways]", { once: false });

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

  window.onload = function () {
    setTimeout(function () {
      window.scrollTo(0, 0);
    }, 100);
  };

  return (
    <>
      <IntroNav />
      {isMobile ? <IntroMobileSlider /> : <IntroBackPics />}
      <IntroProfileEffect />
      <IntroCommentEffect />
      {!isMobile ? <GotoTop /> : <GotoTopMobile /> }
      {!isMobile ? <Footer /> : <></> }
    </>
  );
};
export default Intropage;
