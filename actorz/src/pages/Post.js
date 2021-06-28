import { useSelector, useDispatch } from "react-redux";
import Nav from "../components/Nav";
import Slider from "react-slick";
import img from "../images/actor.jpeg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/Post.css";

const Post = () => {
  const user = useSelector((user) => user.userInfoReducer);
  const post = useSelector((post) => post.postInfoReducer);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  return (
    <>
      <Nav />
      <div id="container1"></div>
      <div id="post-title">Actor</div>
      <div id="post-container">
        <img src={img} className="img" alt="프로필"></img>
        <span id="post-info">
          <p className="name">{user.data.userInfo.name}</p>
          <ul>
            <strong>생년월일</strong>
            <li className="dob">{user.data.userInfo.dob}</li>
            <strong>이메일</strong>
            <li className="email">{user.data.userInfo.email}</li>
            <strong>소속사</strong>
            <li className="company">{user.data.userInfo.company}</li>
          </ul>
        </span>
      </div>
      <span className="career">
        {user.data.userInfo.careers.map((career) => {
          return (
            <li>
              {`${career.year}` +
                ` ${career.title}` +
                ` / ` +
                `${career.type.map((type) => {
                  return type;
                })}`}
            </li>
          );
        })}
      </span>
      {
        <Slider {...settings} className="slider">
          {post.data.posts.map((post) => {
            return <img src={post.path}></img>;
          })}
        </Slider>
      }
    </>
  );
};
export default Post;
