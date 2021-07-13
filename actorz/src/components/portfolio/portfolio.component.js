import React, { useRef, useState, useEffect } from "react";
import {
  PfUploadContainer,
  FormField,
  DragDropText,
  PostPreviewContainer,
  ImagePreview,
  VideoPreview,
  PostMetaData,
  PreviewContainer,
  PreviewList,
  RemovePostIcon,
  InputLabel,
} from "./portfolio.styles";
import "../../styles/Postupload.css";
import Loading from "../loading";

const PortfolioEdit = ({
  handleClickPfEdit,
  myPostsData,
  isLoading
}) => {
  const [postsData, setpostsData] = useState([]);

  useEffect(() => {
    console.log(myPostsData);
  }, [myPostsData])

  return (
    <>
      <div id="upload-modal-background"
        onClick={() => handleClickPfEdit(false)} >
        <div id="upload-modal-container"
        onClick={(event) => event.stopPropagation()}>
          <PfUploadContainer>
            <InputLabel>
              포트폴리오에 올릴 게시물을 선택해주세요
            </InputLabel>

            <PostPreviewContainer>
              <PreviewList>
                {myPostsData.map((post, index) => {
                  return (
                    <PreviewContainer key={index}>
                      <div>
                        {post.media[0].type === "img"
                        ? <ImagePreview src={post.media[0].path}/> 
                        : <VideoPreview src={post.media[0].path}/>}
                        {/* <PostMetaData isMediaFile={true}>
                          <aside>
                            <RemovePostIcon
                              className="fas fa-trash-alt"
                              onClick={() => console.log("remove")}
                            />
                          </aside>
                        </PostMetaData> */}
                      </div>
                    </PreviewContainer>
                  )
                })}


              </PreviewList>
            </PostPreviewContainer>


          </PfUploadContainer>
          <div className="desc-box">
          </div>

          <button
            className="cancel-btn"
            onClick={() => handleClickPfEdit(false)}
          >
            cancel
          </button>
          <button type="submit" className="upload-btn">
            upload
          </button>
          {isLoading ? (<Loading />) : null}
        </div>
      </div>
    </>
  );
};

export default PortfolioEdit;
