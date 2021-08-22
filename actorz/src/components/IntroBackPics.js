import React from 'react';
import Slider from "react-slick";
import { Link } from "react-router-dom";

const IntroBackPics = () => {

  const settings = {
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
  
  return (
    <>
      <div className="mainContentsEffectP">
        <Slider {...settings} className="freeGroup">
          <div className="free">
            <div className="setOrder">
              <div className="set1">
                <img
                  className="setPhotoA"
                  alt=""
                  src="https://media.vlpt.us/images/iooi75/post/626f6d9e-d00a-4fbb-a6a4-bf323d1a214a/thumb-2040665147_N26XCtp1_db4bfe332def3e3638ad60082066ea543d1b2a13_370x420.jpg"
                />
              </div>
              <div className="set2">
                <img
                  className="setPhotoA"
                  alt=""
                  src="https://media.vlpt.us/images/iooi75/post/4fa90170-d4d2-4dac-bcb4-f4742bdbdd22/thumb-2040665147_oTRzql6n_fb83b16b66cd4a82102a5b17d92622e0026dd89b_370x420.jpg"
                />
              </div>
              <div className="set3">
                <img
                  className="setPhotoA"
                  alt=""
                  src="https://media.vlpt.us/images/iooi75/post/519313db-4fcc-4e8e-9b6f-ebac77c74cb7/thumb-2040665147_QKWs91C6_ed1c11d90991f2266852efe677c325262fc0b25b_370x420.jpg"
                />
              </div>
              <div className="set4">
                <img
                  className="setPhotoA"
                  alt=""
                  src="https://media.vlpt.us/images/iooi75/post/5b9f0538-21c9-4ff0-b7bf-6ccc8eed8d77/thumb-2040665147_QmwC9G43_9a4bb4e53c0a45e5b21322dbfed9e3cd2799b2a2_370x420.jpg"
                />
              </div>
              <div className="set5">
                <img
                  className="setPhotoA"
                  alt=""
                  src="https://media.vlpt.us/images/iooi75/post/f897ab15-e633-40a6-ba2b-c46a486fce0d/thumb-2040665147_W1DI2SpX_1ae4c9d5aa1b6231231bab84b699d25cb28dbc0b_370x420.jpg"
                />
              </div>
            </div>

            <div className="setOrder">
              <div className="set1">
                <img
                  className="setPhotoA"
                  alt=""
                  src="https://media.vlpt.us/images/iooi75/post/772c2087-72fc-4206-92e6-a17fddd5608a/thumb-2040720731_9Uz8hjdM_6639cd61b64504ad10e57a081fa9d35ec6896d7d_370x420.jpg"
                />
              </div>
              <div className="set2">
                <img
                  className="setPhotoA"
                  alt=""
                  src="https://media.vlpt.us/images/iooi75/post/211e8024-5106-471f-88d5-49d188c8ad0c/thumb-3555495007_14iZXDfu_bd36365aa955d6f3a3d01c6b891d15b3933c1226_370x420.jpg"
                />
              </div>
              <div className="set3">
                <img
                  className="setPhotoA"
                  alt=""
                  src="https://media.vlpt.us/images/iooi75/post/8358273b-0356-4609-bcaa-c5994e6f8143/thumb-3555495007_UkK1tqyz_9b9162add0597b54c1666643e93f359a985649b9_370x420.jpg"
                />
              </div>
              <div className="set4">
                <img
                  className="setPhotoA"
                  alt=""
                  src="https://media.vlpt.us/images/iooi75/post/58ae6ef0-52bf-40de-ba84-b30877518409/thumb-2009107696_N3lJKGb8_552ec481fca8ccf33b28281f462f87d9264691ca_370x420.jpg"
                />
              </div>
              <div className="set5 resize">
                <img
                  className="setPhotoA"
                  alt=""
                  src="https://media.vlpt.us/images/iooi75/post/f424b957-0755-4407-b24f-01cd5da2c5a3/thumb-2009107696_1eypsHg8_75b78deb1f72d28d204e9c7f8684aa27b44c0cab_370x420.jpg"
                />
              </div>
              <div className="mainContentsCenterDisplay">
                <div className="scrollIMGPosition">
                  <img
                    alt=""
                    className="introLOGO"
                    src="https://media.vlpt.us/images/iooi75/post/1f61e5e2-18d4-469a-8718-ff6799aadbaf/-1.png"
                  />
                </div>
                <div className="colorTest02"> ACTORZ </div>
                <br />
                <br />
                <br />
                <br />
                <div className="colorTest01">
                  {" "}
                  매번 똑같은 포트폴리오 양식 <br />
                  <br />
                  <br /> 나만의 특별한 포트폴리오에 사진과 영상을 담아
                  남들과 다른 포트폴리오를 만들어 드리겠습니다{" "}
                </div>
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
                  <img
                    alt=""
                    className="scrollIMG"
                    src="https://media.vlpt.us/images/iooi75/post/29cab61f-6111-4348-8e65-049fa80dbeeb/scroll_down.png"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="free2">
            <div className="setOrder">
              <div className="set1">
                <img
                  className="setPhotoA"
                  alt=""
                  src="https://media.vlpt.us/images/iooi75/post/f424b957-0755-4407-b24f-01cd5da2c5a3/thumb-2009107696_1eypsHg8_75b78deb1f72d28d204e9c7f8684aa27b44c0cab_370x420.jpg"
                />
              </div>
              <div className="set2">
                <img
                  className="setPhotoA"
                  alt=""
                  src="https://media.vlpt.us/images/iooi75/post/da81e99d-992a-4fe6-b2ac-f1f4c3b9fd99/thumb-2009107696_5JYdFNC8_38b982b821c5bf2707542cc9f296effec5bfad52_370x420.jpg"
                />
              </div>
              <div className="set3">
                <img
                  className="setPhotoA"
                  alt=""
                  src="https://media.vlpt.us/images/iooi75/post/89c248b0-b0d8-4ef5-9c76-f8308b6bd57b/thumb-2009107696_Dc0ftFoi_30ad401a1186b39780e32885f2e949554cc0182c_370x420.jpg"
                />
              </div>
              <div className="set4">
                <img
                  className="setPhotoA"
                  alt=""
                  src="https://media.vlpt.us/images/iooi75/post/58ae6ef0-52bf-40de-ba84-b30877518409/thumb-2009107696_N3lJKGb8_552ec481fca8ccf33b28281f462f87d9264691ca_370x420.jpg"
                />
              </div>
              <div className="set5">
                <img
                  className="setPhotoA"
                  alt=""
                  src="https://media.vlpt.us/images/iooi75/post/3c22e9a1-6c10-44fa-b8e2-ecdec3ed2ccd/thumb-2009107696_xPJE0lpT_da11888d84e969f6f85acbdb214582d75c19fd86_370x420.jpg"
                />
              </div>
            </div>

            <div className="setOrder">
              <div className="set1">
                <img
                  className="setPhotoA"
                  alt=""
                  src="https://media.vlpt.us/images/iooi75/post/cbdbe225-3cc5-4080-9bf0-5b82513911f8/thumb-2040665147_97NzQKEF_12beabc3b8b13a177358dd5b4cbc636187561a4e_370x420.jpg"
                />
              </div>
              <div className="set2">
                <img
                  className="setPhotoA"
                  alt=""
                  src="https://media.vlpt.us/images/iooi75/post/91a32cce-61a4-4721-b99e-0354f325ccd2/thumb-2040665147_d6gESnAz_673a0411062e8b6370c76113f987e20ce44474fc_370x420.jpg"
                />
              </div>
              <div className="set3">
                <img
                  className="setPhotoA"
                  alt=""
                  src="https://media.vlpt.us/images/iooi75/post/03f86ad4-74e4-4197-939b-68df6cc05efa/thumb-2040665147_Ry2daJmh_732fdf976e8efd25d3c0ab34ae3d5c4da1d6ddbf_370x420.jpg"
                />
              </div>
              <div className="set4">
                <img
                  className="setPhotoA"
                  alt=""
                  src="https://media.vlpt.us/images/iooi75/post/2d2b22e6-e1bb-4292-8d37-932c31b6e693/thumb-2040665147_hdorBEJz_b10c387c80529bb187f09ab804f1dc33cb6a0a4e_370x420.jpg"
                />
              </div>
              <div className="set5">
                <img
                  className="setPhotoA"
                  alt=""
                  src="https://media.vlpt.us/images/iooi75/post/f42db9bb-45d9-4602-9b33-8a13e7a37631/thumb-2040665147_LMudibIf_db793839b04dff80f2e2aae0a8d8ffe7a85aa2a9_370x420.jpg"
                />
              </div>
              <div className="mainContentsCenterDisplay">
                <div className="scrollIMGPosition">
                  <img
                    alt=""
                    className="introLOGO"
                    src="https://media.vlpt.us/images/iooi75/post/1f61e5e2-18d4-469a-8718-ff6799aadbaf/-1.png"
                  />
                </div>
                <div className="colorTest02"> ACTORZ </div>
                <br />
                <br />
                <br />
                <br />
                <div className="colorTest01">
                  {" "}
                  매번 똑같은 포트폴리오 양식 <br />
                  <br />
                  <br /> 나만의 특별한 포트폴리오에 사진과 영상을 담아
                  남들과 다른 포트폴리오를 만들어 드리겠습니다{" "}
                </div>
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
                  <img
                    alt=""
                    className="scrollIMG"
                    src="https://media.vlpt.us/images/iooi75/post/29cab61f-6111-4348-8e65-049fa80dbeeb/scroll_down.png"
                  />
                </div>
              </div>
            </div>
          </div>
        </Slider>
      </div>
    </>
  );
}

export default IntroBackPics;