import React, { useRef, useState } from "react";

import {
  FileUploadContainer,
  FormField,
  DragDropText,
  FilePreviewContainer,
  ImagePreview,
  PreviewContainer,
  PreviewList,
  FileMetaData,
  RemoveFileIcon,
} from "./post-upload.styles";
import "../../styles/Fileupload.css";

const KILO_BYTES_PER_BYTE = 1000;
const DEFAULT_MAX_FILE_SIZE_IN_BYTES = 50000000;

const convertNestedObjectToArray = (nestedObj) =>
  Object.keys(nestedObj).map((key) => nestedObj[key]);

const convertBytesToKB = (bytes) => Math.round(bytes / KILO_BYTES_PER_BYTE);

const Postupload = ({
  label,
  updateFilesCb,
  maxFileSizeInBytes = DEFAULT_MAX_FILE_SIZE_IN_BYTES,
  ...otherProps
}) => {
  const fileInputField = useRef(null);
  const [files, setFiles] = useState({});

  const addNewFiles = (newFiles) => {
    for (let file of newFiles) {
      if (file.size <= maxFileSizeInBytes) {
        if (!otherProps.multiple) {
          return { file };
        }
        files[file.name] = file;
      }
    }
    return { ...files };
  };
  const callUpdateFilesCb = (files) => {
    const filesAsArray = convertNestedObjectToArray(files);
    updateFilesCb(filesAsArray);
  };

  const handleNewFileUpload = (e) => {
    const { files: newFiles } = e.target;
    if (newFiles.length) {
      let updatedFiles = addNewFiles(newFiles);
      setFiles(updatedFiles);
      callUpdateFilesCb(updatedFiles);
    }
  };

  const removeFile = (fileName) => {
    delete files[fileName];
    setFiles({ ...files });
    callUpdateFilesCb({ ...files });
  };

  return (
    <>
      <FileUploadContainer>
        <DragDropText>
          게시물에 추가하고 싶은 사진이 있으면 클릭해주세요!
          <br></br>
          <span>Click Here!</span>
        </DragDropText>

        <FormField
          type="file"
          ref={fileInputField}
          onChange={handleNewFileUpload}
          title=""
          value=""
          {...otherProps}
        />
        <FilePreviewContainer>
          <PreviewList className="post-edit-preview-container-mobile">
            {Object.keys(files).map((fileName, index) => {
              let file = files[fileName];
              let isImageFile = file.type.split("/")[0] === "image";
              return (
                <PreviewContainer key={fileName}>
                  <div>
                    {isImageFile && (
                      <ImagePreview
                        src={URL.createObjectURL(file)}
                        alt={`file preview ${index}`}
                      />
                    )}
                    <FileMetaData isImageFile={isImageFile}>
                      <span>{file.name}</span>
                      <aside>
                        <span>{convertBytesToKB(file.size)} kb</span>
                        <RemoveFileIcon
                          className="fas fa-trash-alt"
                          onClick={() => removeFile(fileName)}
                        />
                      </aside>
                    </FileMetaData>
                  </div>
                </PreviewContainer>
              );
            })}
          </PreviewList>
        </FilePreviewContainer>
      </FileUploadContainer>
    </>
  );
};

export default Postupload;
