import React from "react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import '../App.css';
import 'antd/dist/antd.css';
import { Button, Carousel } from 'antd';
import { ArrowDownOutlined } from '@ant-design/icons';
import IntroNav from "../components/IntroNav";
//import IntroFooter from "../components/IntroFooter"
import ScrollTrigger from '@terwanerik/scrolltrigger';
import ResponsiveApp from "../components/responsiveApp/ResponsiveNav"
import Footer from "../components/Footer";
import ResponsiveFooter from "../components/responsiveApp/ResponsiveFooter";
import Slider from "react-slick";
import { _Button, Comment, Form, Header, Card, Icon } from 'semantic-ui-react';


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

  const extraHeart = (
    <a>
      <Icon name='heart' />
      15,455 likes
    </a>
  )

  const extraHeart2 = (
    <a>
      <Icon name='heart' />
      132,555 likes
    </a>
  )

  const extraHeart3 = (
    <a>
      <Icon name='heart' />
      92,188 likes
    </a>
  )

  const extraHeart4 = (
    <a>
      <Icon name='heart' />
      999,999 likes
    </a>
  )




  return (
    <>
      {isPc && 
      <>
      <div className="blockhere"> </div>
      <IntroNav />
        <div>
          <Slider {...settings} className="freeGroup" >
            <div className="free">
              <div className="setOrder">
                <div className="set1">
                  <img className="setPhotoA" alt="" src="https://media.vlpt.us/images/iooi75/post/626f6d9e-d00a-4fbb-a6a4-bf323d1a214a/thumb-2040665147_N26XCtp1_db4bfe332def3e3638ad60082066ea543d1b2a13_370x420.jpg"/>
                </div>
                <div className="set2">
                  <img className="setPhotoA" alt="" src="https://media.vlpt.us/images/iooi75/post/4fa90170-d4d2-4dac-bcb4-f4742bdbdd22/thumb-2040665147_oTRzql6n_fb83b16b66cd4a82102a5b17d92622e0026dd89b_370x420.jpg"/>
                </div>
                <div className="set3">
                  <img className="setPhotoA" alt="" src="https://media.vlpt.us/images/iooi75/post/519313db-4fcc-4e8e-9b6f-ebac77c74cb7/thumb-2040665147_QKWs91C6_ed1c11d90991f2266852efe677c325262fc0b25b_370x420.jpg"/>
                </div>
                <div className="set4">
                  <img className="setPhotoA" alt="" src="https://media.vlpt.us/images/iooi75/post/5b9f0538-21c9-4ff0-b7bf-6ccc8eed8d77/thumb-2040665147_QmwC9G43_9a4bb4e53c0a45e5b21322dbfed9e3cd2799b2a2_370x420.jpg"/>
                </div>
                <div className="set5">
                  <img className="setPhotoA" alt="" src="https://media.vlpt.us/images/iooi75/post/f897ab15-e633-40a6-ba2b-c46a486fce0d/thumb-2040665147_W1DI2SpX_1ae4c9d5aa1b6231231bab84b699d25cb28dbc0b_370x420.jpg"/>
                </div>
              </div>

              <div className="setOrder">
                <div className="set1">
                  <img className="setPhotoA" alt="" src="https://media.vlpt.us/images/iooi75/post/772c2087-72fc-4206-92e6-a17fddd5608a/thumb-2040720731_9Uz8hjdM_6639cd61b64504ad10e57a081fa9d35ec6896d7d_370x420.jpg"/>
                </div>
                <div className="set2">
                  <img className="setPhotoA" alt="" src="https://media.vlpt.us/images/iooi75/post/211e8024-5106-471f-88d5-49d188c8ad0c/thumb-3555495007_14iZXDfu_bd36365aa955d6f3a3d01c6b891d15b3933c1226_370x420.jpg"/>
                </div>
                <div className="set3">
                  <img className="setPhotoA" alt="" src="https://media.vlpt.us/images/iooi75/post/8358273b-0356-4609-bcaa-c5994e6f8143/thumb-3555495007_UkK1tqyz_9b9162add0597b54c1666643e93f359a985649b9_370x420.jpg"/>
                </div>
                <div className="set4">
                  <img className="setPhotoA" alt="" src="https://media.vlpt.us/images/iooi75/post/58ae6ef0-52bf-40de-ba84-b30877518409/thumb-2009107696_N3lJKGb8_552ec481fca8ccf33b28281f462f87d9264691ca_370x420.jpg"/>
                </div>
                <div className="set5 resize">
                  <img className="setPhotoA" alt="" src="https://media.vlpt.us/images/iooi75/post/f424b957-0755-4407-b24f-01cd5da2c5a3/thumb-2009107696_1eypsHg8_75b78deb1f72d28d204e9c7f8684aa27b44c0cab_370x420.jpg"/>
                </div>
                <div className="mainContentsCenterDisplay"> 
                  <img alt="" src=""/>
                  <div className="colorTest02"> ACTORZ </div>
                    <br />
                    <br /><br />
                    <br />
                  <div className="colorTest01"> 매번 똑같은 포트폴리오 양식 <br/><br/><br/> 나만의 특별한 포트폴리오에 사진과 영상을 담아 남들과 다른 포트폴리오를 만들어 드리겠습니다 </div>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                  <div className="scrollIMGPosition">
                    <img alt="" className="scrollIMG" src="https://media.vlpt.us/images/iooi75/post/29cab61f-6111-4348-8e65-049fa80dbeeb/scroll_down.png"/>
                  </div>
                </div>
              </div>
            </div>
                        
            <div className="free2">
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
                  <img className="setPhotoB" alt="" src="https://media.vlpt.us/images/iooi75/post/58ae6ef0-52bf-40de-ba84-b30877518409/thumb-2009107696_N3lJKGb8_552ec481fca8ccf33b28281f462f87d9264691ca_370x420.jpg"/>
                </div>
                <div className="set5">
                  <img className="setPhoto" alt="" src="https://media.vlpt.us/images/iooi75/post/3c22e9a1-6c10-44fa-b8e2-ecdec3ed2ccd/thumb-2009107696_xPJE0lpT_da11888d84e969f6f85acbdb214582d75c19fd86_370x420.jpg"/>
                </div>
              </div>

              <div className="setOrder">
                <div className="set1">
                  <img className="setPhotoA" alt="" src="https://media.vlpt.us/images/iooi75/post/cbdbe225-3cc5-4080-9bf0-5b82513911f8/thumb-2040665147_97NzQKEF_12beabc3b8b13a177358dd5b4cbc636187561a4e_370x420.jpg"/>
                </div>
                <div className="set2">
                  <img className="setPhotoA" alt="" src="https://media.vlpt.us/images/iooi75/post/91a32cce-61a4-4721-b99e-0354f325ccd2/thumb-2040665147_d6gESnAz_673a0411062e8b6370c76113f987e20ce44474fc_370x420.jpg"/>
                </div>
                <div className="set3">
                  <img className="setPhotoA" alt="" src="https://media.vlpt.us/images/iooi75/post/03f86ad4-74e4-4197-939b-68df6cc05efa/thumb-2040665147_Ry2daJmh_732fdf976e8efd25d3c0ab34ae3d5c4da1d6ddbf_370x420.jpg"/>
                </div>
                <div className="set4">
                  <img className="setPhotoA" alt="" src="https://media.vlpt.us/images/iooi75/post/2d2b22e6-e1bb-4292-8d37-932c31b6e693/thumb-2040665147_hdorBEJz_b10c387c80529bb187f09ab804f1dc33cb6a0a4e_370x420.jpg"/>
                </div>
                <div className="set5 resize">
                  <img className="setPhotoA" alt="" src="https://media.vlpt.us/images/iooi75/post/f42db9bb-45d9-4602-9b33-8a13e7a37631/thumb-2040665147_LMudibIf_db793839b04dff80f2e2aae0a8d8ffe7a85aa2a9_370x420.jpg"/>
                </div>
                <div className="mainContentsCenterDisplay"> 
                  <img alt="" src=""/>
                  <div className="colorTest02"> ACTORZ </div>
                    <br />
                    <br /><br />
                    <br />
                  <div className="colorTest01"> 매번 똑같은 포트폴리오 양식 <br/><br/><br/> 나만의 특별한 포트폴리오에 사진과 영상을 담아 남들과 다른 포트폴리오를 만들어 드리겠습니다 </div>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                  <div className="scrollIMGPosition">
                    <img alt="" className="scrollIMG" src="https://media.vlpt.us/images/iooi75/post/29cab61f-6111-4348-8e65-049fa80dbeeb/scroll_down.png"/>
                  </div>
                </div>
              </div>
            </div>
          </Slider>
          
        </div>
        
        <div className="blockPosition"></div>
        <div className="startContentsTitle">
          <h1> Why we made this App?</h1>
          <br/>
          <br/>
          <br/>
          <h4> * 실제 한국예술종합학교 학생들의 설문 조사를 바탕으로 작성하였습니다. </h4>
        </div>

        <div className="blockPosition"></div>
        <div className="commentsGroup">
          <div className="commentsGroupX"> </div>
          <div className="commentsGroupY">
          <Comment.Group minimal>
            <Header as='h3' dividing>
              포토폴리오를 만드는데 어려움이 있으셨거나 블라블라 블라
            </Header>

            <Comment>
              <Comment.Avatar as='a' src='https://media.vlpt.us/images/iooi75/post/f424b957-0755-4407-b24f-01cd5da2c5a3/thumb-2009107696_1eypsHg8_75b78deb1f72d28d204e9c7f8684aa27b44c0cab_370x420.jpg' />
              <Comment.Content>
                <Comment.Author as='a'>이준석</Comment.Author>
                <Comment.Metadata>
                  <span>5 days ago</span>
                </Comment.Metadata>
                <Comment.Text>더 경쟁력있게 포트폴리오를 만드는 방법을 알고 싶습니다.</Comment.Text>
                <Comment.Actions>
                  <a>Reply</a>
                </Comment.Actions>
              </Comment.Content>
            </Comment>

            <Comment>
              <Comment.Avatar as='a' src='https://media.vlpt.us/images/iooi75/post/3c22e9a1-6c10-44fa-b8e2-ecdec3ed2ccd/thumb-2009107696_xPJE0lpT_da11888d84e969f6f85acbdb214582d75c19fd86_370x420.jpg' />
              <Comment.Content>
                <Comment.Author as='a'>김은미</Comment.Author>
                <Comment.Metadata>
                  <span>5 days ago</span>
                </Comment.Metadata>
                <Comment.Text>
                  <p>어떻게 해야 강력한 이미지로 부각될까와 이 프로필이 제대로 전해질까의 고민^^;</p>
                </Comment.Text>
                <Comment.Actions>
                  <a>Reply</a>
                </Comment.Actions>
              </Comment.Content>

              <Comment.Group size="middle">
                <Comment>
                  <Comment.Avatar as='a' src='https://media.vlpt.us/images/iooi75/post/91a32cce-61a4-4721-b99e-0354f325ccd2/thumb-2040665147_d6gESnAz_673a0411062e8b6370c76113f987e20ce44474fc_370x420.jpg' />
                  <Comment.Content>
                    <Comment.Author as='a'>Actorz</Comment.Author>
                    <Comment.Metadata>
                      <span>5 days ago</span>
                    </Comment.Metadata>
                    <Comment.Text>저희는  <u>이 기능</u>을 통하여 보다 경쟁력있는 포토폴리오를 만들어드립니다 :)</Comment.Text>
                    <Comment.Actions>
                      <a>Reply</a>
                    </Comment.Actions>
                  </Comment.Content>
                </Comment>
              </Comment.Group>
            </Comment>

            <Comment>
              <Comment.Avatar as='a' src='https://media.vlpt.us/images/iooi75/post/8358273b-0356-4609-bcaa-c5994e6f8143/thumb-3555495007_UkK1tqyz_9b9162add0597b54c1666643e93f359a985649b9_370x420.jpg' />
              <Comment.Content>
                <Comment.Author as='a'>한혜민</Comment.Author>
                <Comment.Metadata>
                  <span>3 days ago</span>
                </Comment.Metadata>
                <Comment.Text>여태까지 뽑는 사람/회사 중심으로 만들어진 어플이 대부분이었는데, 배우 중심이면 좋겠습니다. 단순히 예쁘고 잘난 사람들, 또는 멋진 사진을 찍은 사람이 상위권에 오르는 것이 아니라 진짜 배우를 발굴해낼 수 있는 기능을 할 수 있으면 좋겠습니다. 좋은 어플을 만들어주셔서 감사합니다.</Comment.Text>
                <Comment.Actions>
                  <a>Reply</a>
                </Comment.Actions>
              </Comment.Content>
              <Comment.Group size="middle">
                <Comment>
                  <Comment.Avatar as='a' src='https://media.vlpt.us/images/iooi75/post/91a32cce-61a4-4721-b99e-0354f325ccd2/thumb-2040665147_d6gESnAz_673a0411062e8b6370c76113f987e20ce44474fc_370x420.jpg' />
                  <Comment.Content>
                    <Comment.Author as='a'>Actorz</Comment.Author>
                    <Comment.Metadata>
                      <span>3 days ago</span>
                    </Comment.Metadata>
                    <Comment.Text>Actorz는 100% 배우를 중심으로 하는 어플입니다. 어쩌구저쩌구 :) 크기 조금 더 크게?</Comment.Text>
                    <Comment.Actions>
                      <a>Reply</a>
                    </Comment.Actions>
                  </Comment.Content>
                </Comment>
              </Comment.Group>
            </Comment>

        
          </Comment.Group>

            <Comment.Group threaded>
              <Header as='h3' dividing>
                포토폴리오를 만드는데 어려움이 있으셨거나 블라블라 블라
              </Header>

              <Comment>
                <Comment.Avatar as='a' src='https://media.vlpt.us/images/iooi75/post/f424b957-0755-4407-b24f-01cd5da2c5a3/thumb-2009107696_1eypsHg8_75b78deb1f72d28d204e9c7f8684aa27b44c0cab_370x420.jpg' />
                <Comment.Content>
                  <Comment.Author as='a'>이준석</Comment.Author>
                  <Comment.Metadata>
                    <span>5 days ago</span>
                  </Comment.Metadata>
                  <Comment.Text>더 경쟁력있게 포트폴리오를 만드는 방법을 알고 싶습니다.</Comment.Text>
                  <Comment.Actions>
                    <a>Reply</a>
                  </Comment.Actions>
                </Comment.Content>
              </Comment>

              <Comment>
                <Comment.Avatar as='a' src='https://media.vlpt.us/images/iooi75/post/3c22e9a1-6c10-44fa-b8e2-ecdec3ed2ccd/thumb-2009107696_xPJE0lpT_da11888d84e969f6f85acbdb214582d75c19fd86_370x420.jpg' />
                <Comment.Content>
                  <Comment.Author as='a'>김은미</Comment.Author>
                  <Comment.Metadata>
                    <span>5 days ago</span>
                  </Comment.Metadata>
                  <Comment.Text>
                    <p>어떻게 해야 강력한 이미지로 부각될까와 이 프로필이 제대로 전해질까의 고민^^;</p>
                  </Comment.Text>
                  <Comment.Actions>
                    <a>Reply</a>
                  </Comment.Actions>
                </Comment.Content>

                <Comment.Group>
                  <Comment>
                    <Comment.Avatar as='a' src='https://media.vlpt.us/images/iooi75/post/91a32cce-61a4-4721-b99e-0354f325ccd2/thumb-2040665147_d6gESnAz_673a0411062e8b6370c76113f987e20ce44474fc_370x420.jpg' />
                    <Comment.Content>
                      <Comment.Author as='a'>Actorz</Comment.Author>
                      <Comment.Metadata>
                        <span>5 days ago</span>
                      </Comment.Metadata>
                      <Comment.Text> 저희는  <u>이 기능</u>을 통하여 보다 경쟁력있는 포토폴리오를 만들어드립니다 :)</Comment.Text>
                      <Comment.Actions>
                        <a>Reply</a>
                      </Comment.Actions>
                    </Comment.Content>
                  </Comment>
                </Comment.Group>
              </Comment>

              <Comment>
                <Comment.Avatar as='a' src='https://media.vlpt.us/images/iooi75/post/8358273b-0356-4609-bcaa-c5994e6f8143/thumb-3555495007_UkK1tqyz_9b9162add0597b54c1666643e93f359a985649b9_370x420.jpg' />
                <Comment.Content>
                  <Comment.Author as='a'>한혜민</Comment.Author>
                  <Comment.Metadata>
                    <span>3 days ago</span>
                  </Comment.Metadata>
                  <Comment.Text>여태까지 뽑는 사람/회사 중심으로 만들어진 어플이 대부분이었는데, 배우 중심이면 좋겠습니다. 단순히 예쁘고 잘난 사람들, 또는 멋진 사진을 찍은 사람이 상위권에 오르는 것이 아니라 진짜 배우를 발굴해낼 수 있는 기능을 할 수 있으면 좋겠습니다. 좋은 어플을 만들어주셔서 감사합니다.</Comment.Text>
                  <Comment.Actions>
                    <a>Reply</a>
                  </Comment.Actions>
                </Comment.Content>


                <Comment.Group size='massive'>
                  <Comment>
                    <Comment.Avatar as='a' src='https://media.vlpt.us/images/iooi75/post/91a32cce-61a4-4721-b99e-0354f325ccd2/thumb-2040665147_d6gESnAz_673a0411062e8b6370c76113f987e20ce44474fc_370x420.jpg' />
                    <Comment.Content>
                      <Comment.Author as='a'>Actorz</Comment.Author>
                      <Comment.Metadata>
                        <span>3 days ago</span>
                      </Comment.Metadata>
                      <Comment.Text> Actorz는 100% 배우를 중심으로 하는 어플입니다. 어쩌구저쩌구 :) 크기 조금 더 크게?</Comment.Text>
                      <Comment.Actions>
                        <a>Reply</a>
                      </Comment.Actions>
                    </Comment.Content>
                  </Comment>
                </Comment.Group>
              </Comment>

            </Comment.Group>
          </div>
          <div className="commentsGroupX"> </div>
        </div>
        <div className="blockPositionDivide"></div>

        <div className="startContentsTitle">
          <h1>실제로 어플을 이용한 고객님들의 후기!</h1>
          <br/>
        </div>
        <div className="blockPositionDivide"></div>
        <div className="cardSlice">
          <Card
            className="profileCardList"
            image='https://media.vlpt.us/images/iooi75/post/4b3c6e85-002a-400b-aeb6-03e8ab10556f/Screen%20Shot%202021-07-15%20at%206.37.56%20AM.png'
            header='유병재'
            meta='개그맨'
            description='안녕하세요. 유병재입니다. 어플에 등록한지 3일만에 영화출연 연락이 왔습니다. 참 신기한 세상이네요 ㅋㅋㅋ'
            extra={extraHeart}
          />
          <Card
            image='https://media.vlpt.us/images/iooi75/post/9ad5085d-4265-4d91-bdb7-bda8561a6ed2/60497_30779_2227.jpeg'
            header='신혜선'
            meta='배우'
            description='안녕하세요 🖐🏻  신혜선입니다. 요즘 핫한 이 어플 저도 뒤늦게 시작했는데, 간단하게 작성만하면 출연 제의 연락이 오니까 너무너무 편한 것 같아요!'
            extra={extraHeart2}
          />
          <Card
            image='https://cdnweb01.wikitree.co.kr/webdata/editor/202009/23/img_20200923081643_5ab21941.webp'
            header='민효린'
            meta='배우'
            description='신인 때는 항~~상 두꺼운 포토폴리오를 가지고 직접 발로 뛰어 다녔는데, 무료로 이러한 좋은 어플이 생겨서 너무 좋은 것 같아요. 신인 배우분들 모두 파이팅하세요!'
            extra={extraHeart3}
          />
          <Card
            image='https://pbs.twimg.com/profile_images/847814355861110787/fdshCpyO.jpg'
            header='냐옹이'
            meta='고양이'
            description='난 냐옹이다옹!'
            extra={extraHeart4}
          />
        </div>

        <div className="blockPosition"></div>

        <div className="startContentsTitle">
          <h1>다음 2022년 시상식의 주인공은 바로 여러분입니다! <br /> Actorz에서 여러분의 미래를 시작하세요.</h1>
          <br/>
        </div>

        <div className="blockPosition"></div>

      <Footer />
      </>}
      
      {isTablet && 
        <>
      <div className="blockhere"> </div>
      <IntroNav />
        <div>
          <Slider {...settings} className="freeGroup" >
            <div className="free">
              <div className="setOrder">
                <div className="set1">
                  <img className="setPhotoA" alt="" src="https://media.vlpt.us/images/iooi75/post/626f6d9e-d00a-4fbb-a6a4-bf323d1a214a/thumb-2040665147_N26XCtp1_db4bfe332def3e3638ad60082066ea543d1b2a13_370x420.jpg"/>
                </div>
                <div className="set2">
                  <img className="setPhotoA" alt="" src="https://media.vlpt.us/images/iooi75/post/4fa90170-d4d2-4dac-bcb4-f4742bdbdd22/thumb-2040665147_oTRzql6n_fb83b16b66cd4a82102a5b17d92622e0026dd89b_370x420.jpg"/>
                </div>
                <div className="set3">
                  <img className="setPhotoA" alt="" src="https://media.vlpt.us/images/iooi75/post/519313db-4fcc-4e8e-9b6f-ebac77c74cb7/thumb-2040665147_QKWs91C6_ed1c11d90991f2266852efe677c325262fc0b25b_370x420.jpg"/>
                </div>
                <div className="set4">
                  <img className="setPhotoA" alt="" src="https://media.vlpt.us/images/iooi75/post/5b9f0538-21c9-4ff0-b7bf-6ccc8eed8d77/thumb-2040665147_QmwC9G43_9a4bb4e53c0a45e5b21322dbfed9e3cd2799b2a2_370x420.jpg"/>
                </div>
                <div className="set5">
                  <img className="setPhotoA" alt="" src="https://media.vlpt.us/images/iooi75/post/f897ab15-e633-40a6-ba2b-c46a486fce0d/thumb-2040665147_W1DI2SpX_1ae4c9d5aa1b6231231bab84b699d25cb28dbc0b_370x420.jpg"/>
                </div>
              </div>

              <div className="setOrder">
                <div className="set1">
                  <img className="setPhotoA" alt="" src="https://media.vlpt.us/images/iooi75/post/772c2087-72fc-4206-92e6-a17fddd5608a/thumb-2040720731_9Uz8hjdM_6639cd61b64504ad10e57a081fa9d35ec6896d7d_370x420.jpg"/>
                </div>
                <div className="set2">
                  <img className="setPhotoA" alt="" src="https://media.vlpt.us/images/iooi75/post/211e8024-5106-471f-88d5-49d188c8ad0c/thumb-3555495007_14iZXDfu_bd36365aa955d6f3a3d01c6b891d15b3933c1226_370x420.jpg"/>
                </div>
                <div className="set3">
                  <img className="setPhotoA" alt="" src="https://media.vlpt.us/images/iooi75/post/8358273b-0356-4609-bcaa-c5994e6f8143/thumb-3555495007_UkK1tqyz_9b9162add0597b54c1666643e93f359a985649b9_370x420.jpg"/>
                </div>
                <div className="set4">
                  <img className="setPhotoA" alt="" src="https://media.vlpt.us/images/iooi75/post/58ae6ef0-52bf-40de-ba84-b30877518409/thumb-2009107696_N3lJKGb8_552ec481fca8ccf33b28281f462f87d9264691ca_370x420.jpg"/>
                </div>
                <div className="set5 resize">
                  <img className="setPhotoA" alt="" src="https://media.vlpt.us/images/iooi75/post/f424b957-0755-4407-b24f-01cd5da2c5a3/thumb-2009107696_1eypsHg8_75b78deb1f72d28d204e9c7f8684aa27b44c0cab_370x420.jpg"/>
                </div>
                <div className="mainContentsCenterDisplay"> 
                  <img alt="" src=""/>
                    <div className="colorTest02"> ACTORZ </div>
                    <br />
                    <br />
                    <div className="colorTest01"> 매번 똑같은 포트폴리오 양식 <br/><br/><br/> 나만의 특별한 포트폴리오에 사진과 영상을 담아 남들과 다른 포트폴리오를 만들어 드리겠습니다 </div>
                    <br />
                    <br />
                    <br />
                    <br />
                </div>
              </div>
            </div>
                        
            <div className="free2">
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
                  <img className="setPhotoB" alt="" src="https://media.vlpt.us/images/iooi75/post/58ae6ef0-52bf-40de-ba84-b30877518409/thumb-2009107696_N3lJKGb8_552ec481fca8ccf33b28281f462f87d9264691ca_370x420.jpg"/>
                </div>
                <div className="set5">
                  <img className="setPhoto" alt="" src="https://media.vlpt.us/images/iooi75/post/3c22e9a1-6c10-44fa-b8e2-ecdec3ed2ccd/thumb-2009107696_xPJE0lpT_da11888d84e969f6f85acbdb214582d75c19fd86_370x420.jpg"/>
                </div>
              </div>

              <div className="setOrder">
                <div className="set1">
                  <img className="setPhotoA" alt="" src="https://media.vlpt.us/images/iooi75/post/cbdbe225-3cc5-4080-9bf0-5b82513911f8/thumb-2040665147_97NzQKEF_12beabc3b8b13a177358dd5b4cbc636187561a4e_370x420.jpg"/>
                </div>
                <div className="set2">
                  <img className="setPhotoA" alt="" src="https://media.vlpt.us/images/iooi75/post/91a32cce-61a4-4721-b99e-0354f325ccd2/thumb-2040665147_d6gESnAz_673a0411062e8b6370c76113f987e20ce44474fc_370x420.jpg"/>
                </div>
                <div className="set3">
                  <img className="setPhotoA" alt="" src="https://media.vlpt.us/images/iooi75/post/03f86ad4-74e4-4197-939b-68df6cc05efa/thumb-2040665147_Ry2daJmh_732fdf976e8efd25d3c0ab34ae3d5c4da1d6ddbf_370x420.jpg"/>
                </div>
                <div className="set4">
                  <img className="setPhotoA" alt="" src="https://media.vlpt.us/images/iooi75/post/2d2b22e6-e1bb-4292-8d37-932c31b6e693/thumb-2040665147_hdorBEJz_b10c387c80529bb187f09ab804f1dc33cb6a0a4e_370x420.jpg"/>
                </div>
                <div className="set5 resize">
                  <img className="setPhotoA" alt="" src="https://media.vlpt.us/images/iooi75/post/f42db9bb-45d9-4602-9b33-8a13e7a37631/thumb-2040665147_LMudibIf_db793839b04dff80f2e2aae0a8d8ffe7a85aa2a9_370x420.jpg"/>
                </div>
                <div className="mainContentsCenterDisplay"> 
                  <img alt="" src=""/>
                  <div className="colorTest02"> ACTORZ </div>
                  <div className="colorTest01"> 매번 똑같은 포트폴리오 양식 <br/><br/><br/> 나만의 특별한 포트폴리오에 사진과 영상을 담아 남들과 다른 포트폴리오를 만들어 드리겠습니다 </div>
                  <br />
                  <br />
                  <br />
                  <br />

                </div>
              </div>
            </div>
          </Slider>
          
        </div>
        
        <div className="blockPosition"></div>
        <div>
          
        </div>
      <div className="blockPosition"></div>
      <Footer />
    </>}

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