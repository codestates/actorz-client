import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import Post from "./Post";
import FileUpload from "../components/file-upload/file-upload.component";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllPostInfo } from "../actions/postAction";
import server from "../apis/server";
import Iconlist from "../components/Iconlist";
import Footer from "../components/Footer";
import "antd/dist/antd.css";
import "../mainpage.css";
import { HeartOutlined } from "@ant-design/icons";
import "semantic-ui-css/semantic.min.css";
import { Card, Icon, Image } from "semantic-ui-react";

const Mainpage = () => {
  const [clickupload, setClickUpload] = useState(false);
  const [clickModal, setClickModal] = useState(false);
  const post = useSelector((post) => post.postInfoReducer);
  const user = useSelector((user) => user.userInfoReducer);
  const dispatch = useDispatch();

  const [newfile, setNewFile] = useState({
    profileImages: [],
  });

  const handleClickUpload = (boolean) => {
    if (boolean) {
      setClickUpload(true);
    } else {
      setClickUpload(false);
    }
  };

  const updateUploadedFiles = (files) =>
    setNewFile({ ...newfile, profileImages: files });

  const handleSubmit = (event) => {
    event.preventDefault();
    // 여기에 이미지 올리는 로직 작성해야 함
  };

  const handleClickPost = (boolean, id) => {
    if (boolean) {
      setClickModal(true);
      window.history.pushState(null, "", `/post/${id}`);
    } else {
      setClickModal(false);
      window.history.pushState(null, "", `/mainpage`);
    }
  };

  const getPostLists = async () => {
    try {
      await server.get(`/post`).then((res) => {
        if (res.status === 200) {
          dispatch(getAllPostInfo(res.data.data));
        }
      });
    } catch (err) {
      alert(
        "게시물 정보를 가져오는 중에 예상치 못한 오류가 발생했습니다 \n 잠시 후 다시 이용해주세요"
      );
    }
  }
  useEffect(() => {getPostLists();}, []);

  //console.log(post); //여기에 서버에서 가져온 모든 post list가 담겨있음.

  return (
    <>
      <div className="blockhere"> </div>
      <div className="mainPage">
        <Nav />
        <Iconlist />

        <div className="newblockPosition"> </div>

        <div className="middleSpace">
          <div className="midContents">
            {post.data.data
              ? post.data.data.posts.posts.map((post) => {
                  return (
                    <Card centered={true} fluid={true} key={post._id}>
                      <div className="effecTest">
                        <div
                          className="screen"
                          onClick={() => handleClickPost(true, post._id)}
                        >
                          {/* <div className="top"> 이기능쓰긴함?</div> */}
                          <div className="bottom">
                            <HeartOutlined className="testIcon" />
                          </div>
                          {post.media[0] ? (
                            <Image
                              src={post.media[0].path}
                              className="exampleIMG"
                            />
                          ) : null}{" "}
                          {/* 사진 다 지워버리면 메인페이지 여기에 어떤 사진을 출력해야 할까, 기본 이미지..? */}
                        </div>
                      </div>

                      <Card.Content>
                        <Card.Header>
                          <div className="nothing2">
                            <Link
                              to={{
                                pathname: `/posts`,
                                state: {
                                  id: post.userInfo.user_id,
                                },
                              }}
                            >
                              <div className="nothing">
                                {post.userInfo.name}
                              </div>
                            </Link>
                          </div>
                        </Card.Header>
                        <Card.Meta>
                          <span className="date">
                            Updated at {post.updatedAt}
                          </span>
                        </Card.Meta>
                        <Card.Description>{post.content}</Card.Description>
                      </Card.Content>
                      <Card.Content extra>
                        <a>
                          <Icon name="like" />
                          {post.likes.length}
                        </a>
                      </Card.Content>
                    </Card>

                    
                  );
                })
              : null}
            {clickModal ? <Post handleClickPost={handleClickPost} /> : null}
          </div>
        </div>
        <div className="newblockPosition2"> </div>

        <div className="rightSpace">
          <div className="iconList2"> </div>
        </div>
      </div>
      <Footer />

      <div>
        {clickupload ? (
          <div>
            <form onSubmit={handleSubmit}>
              <FileUpload
                accept=".jpg,.png,.jpeg, .mp4"
                multiple
                updateFilesCb={updateUploadedFiles}
                handleClickUpload={handleClickUpload}
              />
            </form>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Mainpage;
