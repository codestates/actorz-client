import React, { useState } from "react";
import Slider from "react-slick";

import {
  PfUploadContainer,
  ImagePreview,
  VideoPreview,
  PostMetaData,
  PreviewContainer,
  PreviewList,
  RemovePostIcon,
} from "./portfolio.styles";

import "../../styles/Fileupload.css";
import "./portfolio.styles.css"


import Loading from "../loading";
import { Modal } from "antd";
import { NextArrow, PrevArrow } from "./portfolio.customArrow";

const settings = {
  className: "pf-slick",
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  centerMode: true,
  dots: true,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
};
const PortfolioEdit = ({
  handleClickPfEdit,
  myPostsData,
  clickPostBtn,
  isLoading
}) => {
  const [postsData, setPostsData] = useState([]);

  const handleClickPost = (post) => {
    setPostsData((prevPostsData) => [...prevPostsData, post]);
  };

  const handleClickPostBtn = () => {
    handleClickPfEdit(false);
    clickPostBtn(postsData);
  };

  // 선택한 post가 4개를 초과시, 경고 모달창
  const handleOverFiles = () => {
    Modal.error({
      title: "포스트 선택 실패",
      content: "포스트가 4개를 초과 할 수 없습니다.",
    });
    setPostsData([]);
  };

  const removePost = (index) => {
    postsData.splice(index, 1);
    setPostsData([...postsData]);
  };

  return (
    <>
      <div id="upload-modal-background"
        onClick={() => handleClickPfEdit(false)} >
        <div id="pf-modal-container"
        onClick={(event) => event.stopPropagation()}>
          <section className="pf headerSection">
            <label className="pf headerLabel">포트폴리오에 등록할 포스트를 선택해주세요</label>
          </section>
          <section className="pf postsSection">
            {myPostsData.length === 1 ? 
              myPostsData[0].media[0].type === "img" ? (
                <img 
                  key={myPostsData[0]._id}
                  className="pf postImg"
                  src={myPostsData[0].media[0].path}
                  alt="post first img"
                  onClick={() => handleClickPost(myPostsData[0])}
                />
              ) : (
                <video
                  controls
                  key={myPostsData[0]._id}
                  className="pf postVideo"
                  src={myPostsData[0].media[0].path}
                  onClick={() => handleClickPost(myPostsData[0])} 
                />
              ) : (
              <Slider {...settings}>
                {myPostsData.map((post) => post.media[0].type === "img" ? (
                  <img 
                    key={post._id}
                    className="pf postImg"
                    src={post.media[0].path}
                    alt="post first img"
                    onClick={() => handleClickPost(post)}
                  />
                ) : (
                  <video
                    controls
                    key={post._id}
                    className="pf postVideo"
                    src={post.media[0].path}
                    onClick={() => handleClickPost(post)} 
                  />
                ))}
              </Slider>
            )}
          </section>
          <section className="pf selectSection">
            {postsData[0] ? (
              <PfUploadContainer>
                <PreviewList>
                  {/* 등록 포스트가 4개이상 선택 될 경우경고 모달 나오게 수정해야함 */}
                  {postsData.length > 4 ? 
                    handleOverFiles() : 
                    postsData.map((post, index) => {
                      let isImage = post.media[0].type === "img";
                      return (
                        <PreviewContainer key={post._id}>
                          <div>
                            {(isImage ? (
                              <ImagePreview
                                src={post.media[0].path}
                                alt={`file preview ${index}`}
                              />
                            ) : (
                              <VideoPreview 
                              src={post.media[0].path}
                              alt={`file preview ${index}`}
                              />
                            ))}
                            <PostMetaData isMediaFile={true}>
                              <span>{post.content}</span>
                              <aside>
                                <RemovePostIcon
                                  className="fas fa-trash-alt"
                                  onClick={() => removePost(index)}
                                />
                              </aside>
                            </PostMetaData>
                          </div>
                        </PreviewContainer>
                      );
                    })
                  }
                </PreviewList>
              </PfUploadContainer>
            ) : null}
          </section>

          <button
            className="pf cancel-btn"
            onClick={() => handleClickPfEdit(false)}
          >
            cancel
          </button>
          <button onClick={handleClickPostBtn} className="pf upload-btn">
            post
          </button>

          {isLoading ? (<Loading />) : null}
        </div>
      </div>
    </>
  );
};

export default PortfolioEdit;
