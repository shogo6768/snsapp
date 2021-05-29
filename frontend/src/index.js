import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// ???
import * as serviceWorker from "./serviceWorker";
// ルーティング用
import { Route, BrowserRouter } from "react-router-dom";
// ログイン用
import Login from "./components/Login";
// クッキー認証用
import { CookiesProvider } from "react-cookie";

// ルートURLでLoginを出す。profilesでAPPを出す。
const routing = (
  <React.StrictMode>
    <BrowserRouter>
      <CookiesProvider>
        <Route exact path="/" component={Login} />
        <Route path="/snsapp" component={App} />
      </CookiesProvider>
    </BrowserRouter>
  </React.StrictMode>
);

ReactDOM.render(routing, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
