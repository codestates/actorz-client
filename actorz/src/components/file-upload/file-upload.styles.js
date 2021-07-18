import styled from "styled-components";

export const FileUploadContainer = styled.section`
  position: relative;
  margin: 4rem 0 1.5rem;
  border: 2px dotted lightgray;
  max-width: 100%;
  width: 40rem;
  height: 20rem;
  padding: 2.2rem 0 3rem;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 100%;
  background-color: white;
`;

export const FormField = styled.input`
  font-size: 18px;
  display: block;
  width: 100%;
  border: none;
  text-transform: none;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  margin: 0;

  &:focus {
    outline: none;
  }
`;

export const InputLabel = styled.label`
  top: -3.3rem;
  font-size: 1.5rem;
  color: black;
  left: 10;
  position: absolute;
`;

export const DragDropText = styled.p`
  font-weight: bold;
  font-size: 0.8rem;
  letter-spacing: 2.2px;
  margin-top: 0;
  text-align: center;
`;

export const UploadFileBtn = styled.button`
  box-sizing: border-box;
  appearance: none;
  background-color: transparent;
  border: 2px solid #3498db;
  cursor: pointer;
  font-size: 1rem;
  line-height: 1;
  padding: 1.1em 2.8em;
  text-align: center;
  text-transform: uppercase;
  font-weight: 700;
  border-radius: 6px;
  color: #3498db;
  position: relative;
  overflow: hidden;
  z-index: 1;
  transition: color 250ms ease-in-out;
  font-family: "Open Sans", sans-serif;
  width: 45%;
  display: flex;
  align-items: center;
  padding-right: 0;
  justify-content: center;

  &:after {
    content: "";
    position: absolute;
    display: block;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 100%;
    background: #3498db;
    z-index: -1;
    transition: width 250ms ease-in-out;
  }

  i {
    font-size: 22px;
    margin-right: 5px;
    border-right: 2px solid;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 20%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  @media only screen and (max-width: 500px) {
    width: 70%;
  }

  @media only screen and (max-width: 350px) {
    width: 100%;
  }

  &:hover {
    color: #fff;
    outline: 0;
    background: transparent;

    &:after {
      width: 110%;
    }
  }

  &:focus {
    outline: 0;
    background: transparent;
  }

  &:disabled {
    opacity: 0.4;
    filter: grayscale(100%);
    pointer-events: none;
  }
`;

export const FilePreviewContainer = styled.article`
  span {
    font-size: 0.9rem;
  }
`;

export const PreviewList = styled.section`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-top: 1rem;

  @media only screen and (max-width: 400px) {
    flex-direction: column;
  }
`;

export const FileMetaData = styled.div`
  display: ${(props) => (props.isImageFile ? "none" : "flex")};
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 10px;
  border-radius: 6px;
  color: white;
  font-weight: bold;
  background-color: rgba(5, 5, 5, 0.55);

  aside {
    margin-top: auto;
    display: flex;
    justify-content: space-between;
  }
`;

export const FileMetaData2 = styled.div`
  display: ${(props) => (props.isImageFile ? "none" : "flex")};
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 10px;
  border-radius: 6px;
  height: 200px;
  color: white;
  font-weight: bold;

  aside {
    margin-top: auto;
    display: flex;
    justify-content: space-between;
  }
`;

export const RemoveFileIcon = styled.i`
  cursor: pointer;
  color: white;
  width: 1rem;
  margin-top: 0.3rem;
  transform: scale(0.5);
  &:hover {
    transform: scale(0.7);
  }
`;

export const RemoveFileIcon2 = styled.i`
  cursor: pointer;
  color: black;
  margin-top: 0.3rem;
  margin-left: 10rem;
  transform: scale(0.5);
  &:hover {
    transform: scale(0.7);
  }
`;

export const RemoveFileIcon3 = styled.i`
cursor: pointer;
color: black;
margin-top: 3rem;
margin-left: 56rem;
margin-bottom: 10rem;
transform: scale(2.0);
&:hover {
  transform: scale(2.1);
}
  }
`;

export const PreviewContainer = styled.section`
  padding: 0.25rem;
  width: 8rem;
  height: 8rem;
  border-radius: 6px;
  box-sizing: border-box;

  &:hover {
    opacity: 0.55;

    ${FileMetaData} {
      display: flex;
    }
  }

  & > div:first-of-type {
    height: 100%;
    position: relative;
  }

  @media only screen and (max-width: 750px) {
    width: 25%;
  }

  @media only screen and (max-width: 500px) {
    width: 50%;
  }

  @media only screen and (max-width: 400px) {
    width: 100%;
    padding: 0 0 0.4em;
  }
`;

export const PreviewContainer2 = styled.section`
  padding: 0.25rem;
  width: 60rem;
  height: 8rem;
  border-radius: 6px;
  box-sizing: border-box;

  &:hover {
    ${FileMetaData} {
      display: flex;
    }
  }

  & > div:first-of-type {
    height: 100%;
    position: relative;
  }

  @media only screen and (max-width: 750px) {
    width: 25%;
  }

  @media only screen and (max-width: 500px) {
    width: 50%;
  }

  @media only screen and (max-width: 400px) {
    width: 100%;
    padding: 0 0 0.4em;
  }
`;

export const ImagePreview = styled.img`
  border-radius: 6px;
  width: 100%;
  height: 100%;
`;

export const VideoPreview = styled.video`
  border-radius: 6px;
  width: 100%;
  height: 100%;
`;

export const HeartOutlined = styled.button`
  cursor: pointer;
  color: rgb(54, 54, 54);
  margin-bottom: 5px;
  &:hover {
    transform: scale(1.3);
  }
`;
