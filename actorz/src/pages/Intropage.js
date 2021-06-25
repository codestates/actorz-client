import React from "react";
import { Link } from "react-router-dom"
import Nav from "../components/Nav";

const Intropage = () => {
  return (
    <>
      <Nav /> {/* navigation bar 상단에 고정시키려면 css에서 position:fixed 하면 됨*/}

      <div id="section1">
        section1
      </div>

      <div id="section2">
        section2
        <Link to="/mainpage">
          <button>시작하기</button>
        </Link>
      </div>

      <div id="footer">
        footer
      </div>

    </>
  )
}
export default Intropage;