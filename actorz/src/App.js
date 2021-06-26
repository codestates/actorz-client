import Nav from "./components/Nav";
import Intropage from "./pages/Intropage";
import Mainpage from "./pages/Mainpage";
import "./App.css"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React, { useState } from "react";
import FileUpload from "./components/file-upload/file-upload.component"

function App() {
  const [newUserInfo, setNewUserInfo] = useState({
    profileImages: []
  });

  const updateUploadedFiles = (files) =>
    setNewUserInfo({ ...newUserInfo, profileImages: files });

  const handleSubmit = (event) => {
    event.preventDefault();
    //logic to create new user...
  };

  return (
    <Router>
      <div>
        <Route exact path="/" component={Intropage} />
        <Switch>
          <Route path="/mainpage" component={Mainpage} />
        </Switch>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <FileUpload
            accept=".jpg,.png,.jpeg, .mp4"
            multiple
            updateFilesCb={updateUploadedFiles}
          />
        </form>
      </div>
    </Router>
  );
}

export default App;
