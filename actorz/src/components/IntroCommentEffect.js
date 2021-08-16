
import Slider from "react-slick";
import { _Button, Card, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

const IntroCommentEffect = () => {
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

  return (
    <>
      <div data-trigger className="startContentsTitle">
        이미 증명 되었으니까
      </div>
      <div className="blockPositionDivide"></div>

      <div data-trigger>
        <Slider {...namecardSettings} className="cardlistGroup">
          <div className="cardUI">
            <Card
              className="profileCardList"
              image="https://media.vlpt.us/images/iooi75/post/4b3c6e85-002a-400b-aeb6-03e8ab10556f/Screen%20Shot%202021-07-15%20at%206.37.56%20AM.png"
              header="유병재"
              meta="개그맨"
              description="안녕하세요. 유병재입니다. 어플에 등록한지 3일만에 영화출연 연락이 왔습니다. 참 신기한 세상이네요 ㅋㅋㅋ"
              extra={extraHeart}
            />
          </div>
          <div className="cardUI">
            <Card
              image="https://media.vlpt.us/images/iooi75/post/9ad5085d-4265-4d91-bdb7-bda8561a6ed2/60497_30779_2227.jpeg"
              header="신혜선"
              meta="배우"
              description="안녕하세요 🤗  배우 신혜선입니다. 요즘 핫한 이 어플 저도 뒤늦게 시작했는데, 간단하게 작성만하면 출연 제의 연락이 오니까 너무너무 편한 것 같아요!"
              extra={extraHeart2}
            />
          </div>
          <div className="cardUI">
            <Card
              image="https://cdnweb01.wikitree.co.kr/webdata/editor/202009/23/img_20200923081643_5ab21941.webp"
              header="민효린"
              meta="배우"
              description="신인 때는 항~~상 두꺼운 포트폴리오를 가지고 직접 발로 뛰어 다녔는데, 무료로 이러한 좋은 어플이 생겨서 너무 좋은 것 같아요. 신인 배우분들 모두 파이팅하세요!"
              extra={extraHeart3}
            />
          </div>
          <div className="cardUI">
            <Card
              image="https://media.vlpt.us/images/iooi75/post/c65e0d90-4b8b-471f-8306-5b6dd7b754ba/image.png"
              header="송강"
              meta="배우"
              description="요즘 신인배우 사이에서 인기있는 앱! 코로나 때문에 모두가 힘든 시기이지만 모두 좋은 결과 있기를 바랄게요!   🥰 스위트 홈도 많이 사랑해주세요! ㅋㅋㅋㅋ"
              extra={extraHeart4}
            />
          </div>
          <div className="cardUI">
            <Card
              image="https://media.vlpt.us/images/iooi75/post/d1283901-7551-4f9d-96cc-ceafd12194ba/image.png"
              header="봉준호"
              meta="영화감독"
              description="원하는 배우의 나이로 배우를 검색할 수 있는 점이 좋습니다. 또한, 배우들의 다양한 모습을 볼 수 있어서 좋습니다. 차기작을 위하여 열심히 배우들을 검토하고 있습니다. 감독님들께도 추천드리는 앱입니다."
              extra={extraHeart5}
            />
          </div>
          <div className="cardUI">
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
      <div className="blockPosition"></div>

      <div data-trigger className="introLastContents">
        <div className="lastContentsTitleDD">
          <div className="lastContentsTitlePosition">
            다음 2022년 시상식의 주인공은 바로 여러분입니다! <br /> <br />
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
    </>
  );
}

export default IntroCommentEffect;