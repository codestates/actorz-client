import React, { useState, useEffect } from "react";
import server from "../apis/server";
import { useDispatch } from "react-redux";
import { getAllPostInfo } from "../actions/postAction";
import "../styles/Search.css";

const Search = () => {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [age, setAge] = useState("");

  const dispatch = useDispatch();

  useEffect(async () => {
    try {
      if (Number(age) === 50) {
        await server
          .get(`post/search?name=${name}&content=${content}`)
          .then((res) => {
            dispatch(getAllPostInfo(res.data.data));
          });
      } else {
        await server
          .get(`post/search?name=${name}&content=${content}&age=${age}`)
          .then((res) => {
            dispatch(getAllPostInfo(res.data.data));
          });
      }
    } catch (err) {
      throw err;
    }
  }, [name, content, age]);

  const handleInputValue = (key) => (event) => {
    if (key === "name") {
      setName(event.target.value);
    } else if (key === "conent") {
      setContent(event.target.value);
    } else if (key === "age") {
      setAge(event.target.value);
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
      <div className="search-box" onChange={handleInputValue("age")}>
        <label>
          <input type="radio" name="age" value="10" /> ~10대
        </label>
        <label>
          <input type="radio" name="age" value="20" /> 20대
        </label>
        <label>
          <input type="radio" name="age" value="30" /> 30대
        </label>
        <label>
          <input type="radio" name="age" value="40" /> 40대~
        </label>
        <label>
          <input type="radio" name="age" value="50" /> 전체
        </label>
      </div>
    </div>
  );
};

export default Search;
