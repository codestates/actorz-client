import React, { useState, useEffect } from "react";
import server from "../apis/server";
import { useDispatch } from "react-redux";
import { getAllPostInfo } from "../actions/postAction";
import "../styles/Search.css";

const Search = () => {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  const dispatch = useDispatch();

  useEffect(async () => {
    try {
      await server
        .get(`post/search?name=${name}&content=${content}`)
        .then((res) => {
          dispatch(getAllPostInfo(res.data.data));
        });
    } catch (err) {
      throw err;
    }
  }, [name, content]);

  const handleInputValue = (key) => (event) => {
    if (key === "name") {
      setName(event.target.value);
    } else if (key === "conent") {
      setContent(event.target.value);
    }
  };

  return (
    <div id="search-modal-container">
      <div className="search-box">
        <span className="search-name">이름</span>
        <input type="text" onChange={handleInputValue("name")} />
      </div>
      <div className="search-box">
        <span className="search-content">내용</span>
        <input type="text" onChange={handleInputValue("conent")} />
      </div>
    </div>
  );
};

export default Search;
