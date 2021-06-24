import Nav from "./components/Nav";
import Intropage from "./pages/Intropage";
import Mainpage from "./pages/Mainpage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Intropage} />
        <Switch>
          <Route path="/mainpage" component={Mainpage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
