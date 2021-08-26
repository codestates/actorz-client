import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { store, persistor } from "./store/store"; // persistor import
import { PersistGate } from "redux-persist/integration/react"; //PersistGate를 import
import { Provider } from "react-redux";
import reportWebVitals from "./reportWebVitals";

// 아래의 application의 최상단 컴포넌트를 PersistGate로 감싸고 props로 persistor를 넘겨준다.
ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
