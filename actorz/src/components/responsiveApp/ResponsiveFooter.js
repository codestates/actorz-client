import React, { useState } from "react";
//import { useSelector, useDispatch } from "react-redux";
import "antd/dist/antd.css";
// import Signin from "../Signin";
// import Signup from "../Signup";
import { Link } from "react-router-dom";
// import { Button } from "antd";
import server from "../../apis/server";
// import { persistor } from "../../store/store";
// import Loading from "../../components/loading";
// import Search from "antd/lib/transfer/search";
import { HomeOutlined, FileAddOutlined, UserOutlined, HeartOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import "../../styles/ResponisveFooter.css";

const ResponsiveFooter = () => {
  const [newfile, setNewFile] = useState({
    profileImages: [],
  });
  const [content, setContent] = useState({
    content: "",
    genre: ""
  })
  const [clickupload, setClickUpload] = useState(false);

  const handleClickUpload = (boolean) => {
    if (boolean) {
      setClickUpload(true);
    } else {
      setClickUpload(false);
    }
  };

  const handlePost = async (media) => {
    const accessToken = window.localStorage.getItem("accessToken")
    const bodyData = {
      media,
      ...content
    };
    const headers = {
      authorization: `Bearer ${accessToken}`
    };
    await server.post("/post/create", bodyData, { headers })
    .then(() => {
      alert("포스트가 등록되었습니다");
      handleClickUpload(false);
    })
    .catch((err) => console.log(err));

  };

  return (
    <>
      {/* <div id="page-container">
      <div id="content-wrap">
      </div>
      <footer id="footer"></footer>
      </div> */}

      <div className="ResponsiveFooter">
        <div className="ResponsivespaceDirection">
        <div className="responsiveHomeButtonFooter">
            <div className="responsiveHomeButtonIconFooter">
              
            </div>
          </div>

          <div className="responsiveHomeButtonFooter">
            <div className="responsiveHomeButtonIconFooter">
              <Link to="/mainpage" className="noEffect">
                <HomeOutlined className="realIcon" />
              </Link>
            </div>
          </div>

          <div className="responsiveHomeButtonFooter">
            <div className="responsiveHomeButtonIconFooter">
              <Link
                className="noEffect"
                onClick={() => handleClickUpload(true)}
                to="/"
              >
                <FileAddOutlined className="realIcon" />
              </Link>
            </div>
          </div>

          <div className="responsiveHomeButtonFooter">
            <div className="responsiveHomeButtonIconFooter">
              <Link className="noEffect" to="/mypage">
                <UserOutlined className="realIcon" />
              </Link>
            </div>
          </div>

          <div className="responsiveHomeButtonFooter">
            <div className="responsiveHomeButtonIconFooter">
              <Link className="noEffect" to="/mainpage">
                <HeartOutlined className="realIcon" />
              </Link>
            </div>
          </div>
          <div className="likeButton"></div>
        </div>
     </div>
   </>
  );
}

export default ResponsiveFooter;