import React from "react";
import { useMediaQuery } from "react-responsive"
import { Link } from "react-router-dom";
import '../App.css'
import 'antd/dist/antd.css';
import { Button, Carousel } from 'antd';
import { ArrowDownOutlined } from '@ant-design/icons';
import IntroNav from "../components/IntroNav";
//import IntroFooter from "../components/IntroFooter"
import ScrollTrigger from '@terwanerik/scrolltrigger';
import ResponsiveApp from "../components/responsiveApp/ResponsiveNav"
import Footer from "../components/Footer"
import ResponsiveFooter from "../components/responsiveApp/ResponsiveFooter";
import Slider from "react-slick";


const trigger = new ScrollTrigger();
trigger.add('[data-trigger]');

const Intropage = () => {

  const isPc = useMediaQuery({
    query : "(min-width:1024px)"
  });

  const isTablet = useMediaQuery({
    query: "(min-width:768px) and (max-width:1023px)",
  });

  const isMobile = useMediaQuery({
    query : "(max-width:767px)"
  });

  const contentStyle = {
    height: '30rem',
    color: '#fff',
    lineHeight: '30rem',
    textAlign: 'center',
    background: '#000000',

  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 1700,
    autoplaySpeed: 4000,
    pauseOnHover: false,
    autoplay: true,
    draggable: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
  };



  return (
    <>
      {isPc && 
      <>
      <div className="blockhere"> </div>
      <IntroNav />
        <div>
          <Slider {...settings} className="freeGroup">
            <div className="free">
              <div className="setOrder">
                <div className="set1">
                  <img className="setPhotoA" alt="" src="https://media.vlpt.us/images/iooi75/post/f424b957-0755-4407-b24f-01cd5da2c5a3/thumb-2009107696_1eypsHg8_75b78deb1f72d28d204e9c7f8684aa27b44c0cab_370x420.jpg"/>
                </div>
                <div className="set2">
                  <img className="setPhotoA" alt="" src="https://media.vlpt.us/images/iooi75/post/da81e99d-992a-4fe6-b2ac-f1f4c3b9fd99/thumb-2009107696_5JYdFNC8_38b982b821c5bf2707542cc9f296effec5bfad52_370x420.jpg"/>
                </div>
                <div className="set3">
                  <img className="setPhotoA" alt="" src="https://media.vlpt.us/images/iooi75/post/89c248b0-b0d8-4ef5-9c76-f8308b6bd57b/thumb-2009107696_Dc0ftFoi_30ad401a1186b39780e32885f2e949554cc0182c_370x420.jpg"/>
                </div>
                <div className="set4">
                  <img className="setPhotoA" alt="" src="https://media.vlpt.us/images/iooi75/post/58ae6ef0-52bf-40de-ba84-b30877518409/thumb-2009107696_N3lJKGb8_552ec481fca8ccf33b28281f462f87d9264691ca_370x420.jpg"/>
                </div>
              </div>

              <div className="setOrder">
                <div className="set1">
                  <img alt="" src="https://media.vlpt.us/images/iooi75/post/3c22e9a1-6c10-44fa-b8e2-ecdec3ed2ccd/thumb-2009107696_xPJE0lpT_da11888d84e969f6f85acbdb214582d75c19fd86_370x420.jpg"/>
                </div>
                <div className="set2">
                  <img alt="" src="https://media.vlpt.us/images/iooi75/post/cbdbe225-3cc5-4080-9bf0-5b82513911f8/thumb-2040665147_97NzQKEF_12beabc3b8b13a177358dd5b4cbc636187561a4e_370x420.jpg"/>
                </div>
                <div className="set3">
                  <img alt="" src="https://media.vlpt.us/images/iooi75/post/91a32cce-61a4-4721-b99e-0354f325ccd2/thumb-2040665147_d6gESnAz_673a0411062e8b6370c76113f987e20ce44474fc_370x420.jpg"/>
                </div>
                <div className="set4">
                  <img alt="" src="https://media.vlpt.us/images/iooi75/post/f42db9bb-45d9-4602-9b33-8a13e7a37631/thumb-2040665147_LMudibIf_db793839b04dff80f2e2aae0a8d8ffe7a85aa2a9_370x420.jpg"/>
                </div>
              </div>
            </div>
            {/*             
            <div className="free2">
              <img alt="" src="https://media.vlpt.us/images/iooi75/post/89c248b0-b0d8-4ef5-9c76-f8308b6bd57b/thumb-2009107696_Dc0ftFoi_30ad401a1186b39780e32885f2e949554cc0182c_370x420.jpg"/>
            </div>
            <div className="free3">
              <img alt="" src="https://media.vlpt.us/images/iooi75/post/58ae6ef0-52bf-40de-ba84-b30877518409/thumb-2009107696_N3lJKGb8_552ec481fca8ccf33b28281f462f87d9264691ca_370x420.jpg"/>
            </div> */}
          </Slider>
        </div>
        <div className="blockPosition"></div>
        <div>
          <Carousel autoplay effect="fade" dots={false} arrows={false} >
            <div>
              <h3 style={contentStyle}>1</h3>
            </div>
            <div>
              <h3 style={contentStyle}>2</h3>
            </div>
            <div>
              <h3 style={contentStyle}>3</h3>
            </div>
            <div>
              <h3 style={contentStyle}>4</h3>
            </div>
          </Carousel>
        </div>
      <div className="blockPosition"></div>
      <Footer />
      </>}
      
      {isTablet && 
        <>
        <IntroNav />
        <div className="backgroundImage">
          {/* <IntroNav /> */}
          <div className="blockPosition"></div>
          <div className="introContainer">
            <div id="logoPosition">
              <img src="https://media.vlpt.us/images/iooi75/post/08503e87-6d66-4e92-948b-58988f10b27a/Screen%20Shot%202021-06-22%20at%209.24.46%20PM.png" alt=""
                className="projectLogo"
              />
            </div>
            <div className="mainIntro1">매번 똑같은 포트폴리오 양식</div>
              <br></br>
            <div className="mainIntro2">나만의 특별한 포트폴리오에 사진과 영상을 담아 남들과 다른 포트폴리오를 만들어 드리겠습니다.</div>
              <br></br><br></br><br></br>
            <div className="button1Position">
              <Link to="/mainpage">
                <Button type="primary" className="startButton1" danger>시작하기</Button>
              </Link>
            </div>
            <div className="scrollEffect">
              스크롤을 내려주세요!
            </div>
            <ArrowDownOutlined className="scrollIcon"/>
          </div>
        </div>
        <div className="blockPosition2">
          <div className="blockPosition3"> </div>
          <div className="middleContents"> </div>
          <div className="blockPosition4"> </div>
          <div className="middleContents2"> 
              <div className="blackSpace01"> </div> 

              <div className="actorCardposition">
              
              </div>
              <div className="blackSpace02">  </div>
          </div>
        </div>

        <div className="lastContents"> 
          <div className="lastContext">
            다음 2022년 시상식의 주인공은 바로 여러분입니다!
          </div>
          <div className="lastContext">
            Acotrz는 여러분의 꿈을 도와 드리겠습니다.
          </div>
          </div>

        <div className="button2Position">
          <Link to="/mainpage">
            <Button type="primary" className="startButton2" danger>시작하기</Button>
          </Link>
        </div>
        <br></br><br></br><br></br><br></br>

        <Footer />

        </>
      }

      {isMobile && <>
        <ResponsiveApp />
        <div className="backgroundImage">
          {/* <IntroNav /> */}
          <div className="blockPosition"></div>
          <div className="introContainer">
            <div id="logoPosition">
              <img src="https://media.vlpt.us/images/iooi75/post/08503e87-6d66-4e92-948b-58988f10b27a/Screen%20Shot%202021-06-22%20at%209.24.46%20PM.png" alt=""
                className="projectLogo"
              />
            </div>
            <div className="mainIntro1">매번 똑같은 포트폴리오 양식</div>
              <br></br>
            <div className="mainIntro2">나만의 특별한 포트폴리오에 사진과 영상을 담아 남들과 다른 포트폴리오를 만들어 드리겠습니다.</div>
              <br></br><br></br><br></br>
            <div className="button1Position">
              <Link to="/mainpage">
                <Button type="primary" className="startButton1" danger>시작하기</Button>
              </Link>
            </div>
            <div className="scrollEffect">
              스크롤을 내려주세요!
            </div>
            <ArrowDownOutlined className="scrollIcon"/>
            
          </div>
        </div>
        <div className="blockPosition2">
          <div className="blockPosition3"> </div>
          <div className="middleContents"> </div>
          <div className="blockPosition4"> </div>
          <div className="middleContents2"> 
              <div className="blackSpace01"> </div> 

              <div className="actorCardposition">
              
              </div>
              <div className="blackSpace02">  </div>
          </div>
        </div>

        <div className="lastContents"> 
          <div className="lastContext">
            다음 2022년 시상식의 주인공은 바로 여러분입니다!
          </div>
          <div className="lastContext">
            Acotrz는 여러분의 꿈을 도와 드리겠습니다.
          </div>
          </div>

        <div className="button2Position">
          <Link to="/mainpage">
            <Button type="primary" className="startButton2" danger>시작하기</Button>
          </Link>
        </div>
        <br></br><br></br><br></br><br></br>
      </>}  
    </>
  )
}
export default Intropage;