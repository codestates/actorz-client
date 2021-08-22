import React, { useState } from "react";
import Slider from "react-slick";
import Loading from "../loading";
import { Modal } from "antd";
import { NextArrow, PrevArrow } from "./portfolio.customArrow";
import { useMediaQuery } from "react-responsive";

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
  isLoading,
}) => {
  const [postsData, setPostsData] = useState([]);

  const isPcAndTablet = useMediaQuery({
    query: "(min-width:768px)",
  });

  const isMobile = useMediaQuery({
    query: "(max-width:767px)",
  });

  const handleClickPost = (post) => {
    setPostsData((prevPostsData) => [...prevPostsData, post]);
  };

  const handleClickPostBtn = () => {
    handleClickPfEdit(false);
    clickPostBtn(postsData);
  };

  const handleOverFiles = () => {
    Modal.error({
      getContainer: "#upload-modal-container",
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
      {isPcAndTablet && (
        <>
          <div
            id="upload-modal-background"
            onClick={() => handleClickPfEdit(false)}
          >
            <div
              id="upload-modal-container"
              onClick={(event) => event.stopPropagation()}
            >
              <section className="pf headerSection">
                <label>포스트를 선택해주세요</label>
              </section>
              <section className="pf postsSection">
                {myPostsData.length === 1 ? (
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
                  )
                ) : (
                  <Slider {...settings}>
                    {myPostsData.map((post) =>
                      post.media[0].type === "img" ? (
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
                      )
                    )}
                  </Slider>
                )}
              </section>
              <section className="pf selectSection">
                <div className="pf previewHeader">
                  <label>최대 4개까지 선택 가능합니다.</label>
                </div>
                {postsData[0] ? (
                  <PfUploadContainer>
                    <PreviewList>
                      {postsData.length > 4
                        ? handleOverFiles()
                        : postsData.map((post, index) => {
                            let isImage = post.media[0].type === "img";
                            return (
                              <PreviewContainer key={post._id}>
                                <div>
                                  {isImage ? (
                                    <ImagePreview
                                      src={post.media[0].path}
                                      alt={`file preview ${index}`}
                                    />
                                  ) : (
                                    <VideoPreview
                                      src={post.media[0].path}
                                      alt={`file preview ${index}`}
                                    />
                                  )}
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
                          })}
                    </PreviewList>
                  </PfUploadContainer>
                ) : null}
              </section>

              <div className="pf cancel-or-post-btn">
                <button
                  className="pf cancel-btn"
                  onClick={() => handleClickPfEdit(false)}
                >
                  cancel
                </button>
                <button onClick={handleClickPostBtn} className="pf upload-btn">
                  post
                </button>
              </div>

              {isLoading ? <Loading /> : null}
            </div>
          </div>
        </>
      )}
      {isMobile && (
        <>
          <div
            id="upload-modal-background"
            onClick={() => handleClickPfEdit(false)}
          >
            <div
              id="upload-modal-container"
              style={{
                height: "100%",
                width: "100%",
                padding: "4rem 0 4rem 0",
              }}
              onClick={(event) => event.stopPropagation()}
            >
              <section className="pf headerSection">
                <label>포스트를 선택해주세요</label>
              </section>
              <section className="pf postsSection">
                {myPostsData.length === 1 ? (
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
                  )
                ) : (
                  <Slider {...settings}>
                    {myPostsData.map((post) =>
                      post.media[0].type === "img" ? (
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
                      )
                    )}
                  </Slider>
                )}
              </section>
              <section className="pf selectSection">
                <div className="pf previewHeader">
                  <label>최대 4개까지 선택 가능합니다.</label>
                </div>
                {postsData[0] ? (
                  <PfUploadContainer>
                    <PreviewList>
                      {postsData.length > 4
                        ? handleOverFiles()
                        : postsData.map((post, index) => {
                            let isImage = post.media[0].type === "img";
                            return (
                              <PreviewContainer key={post._id}>
                                <div>
                                  {isImage ? (
                                    <ImagePreview
                                      src={post.media[0].path}
                                      alt={`file preview ${index}`}
                                    />
                                  ) : (
                                    <VideoPreview
                                      src={post.media[0].path}
                                      alt={`file preview ${index}`}
                                    />
                                  )}
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
                          })}
                    </PreviewList>
                  </PfUploadContainer>
                ) : null}
              </section>

              <div className="pf cancel-or-post-btn">
                <button
                  className="pf cancel-btn"
                  onClick={() => handleClickPfEdit(false)}
                >
                  cancel
                </button>
                <button onClick={handleClickPostBtn} className="pf upload-btn">
                  post
                </button>
              </div>

              {isLoading ? <Loading /> : null}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default PortfolioEdit;
