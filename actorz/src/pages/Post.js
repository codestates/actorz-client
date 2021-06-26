import { useSelector, useDispatch } from 'react-redux';
import Nav from '../components/Nav';
import "../styles/Post.css";
import img from "../images/actor.jpeg";

const Post = () => {
  const state = useSelector(state => state.userInfoReducer);
  console.log(state);

  return (
    <>
      <Nav />
      <div id="container1"></div>
      <div id="post-title">Actor</div>
      <div id="post-container">
        <img src={img} className="img" alt="프로필"></img>
        <span id="post-info">
          <p className="name">{state.data.userInfo.name}</p>
          <ul>
            <strong>생년월일</strong>
            <li className="dob">{state.data.userInfo.dob}</li>
            <strong>이메일</strong>
            <li className="email">{state.data.userInfo.email}</li>
            <strong>소속사</strong>
            <li className="company">{state.data.userInfo.company}</li>

          </ul>
        </span>
      </div>
      <span className="career">
        {
          state.data.userInfo.careers.map(career => {
            return (
              <li>{`${career.year}` + ` ${career.title}` + ` / ` +
                `${career.type.map(type => {
                  return type;
                })}`
              }</li>
            )
          })
        }
      </span>
    </>
  )
}
export default Post;