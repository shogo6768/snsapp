import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// パフォーマンスの計測ライブラリ
import reportWebVitals from './reportWebVitals';
// オフライン時のロードを早くするライブラリ
import * as serviceWorker from "./serviceWorker";
// ルーティング用ライブラリ
import { Route, BrowserRouter } from "react-router-dom";
// ログイン用のコンポーネント。ルートURLで適用。
// import Login from "./components/Login";
// クッキー認証用ライブラリ。
import { CookiesProvider } from "react-cookie";

const routing = (
  <React.StrictMode>
    <BrowserRouter>
      {/* クッキー認証する範囲を囲う */}
      <CookiesProvider>
        {/* <Route exact path="/" component={Login} /> */}
        <Route exact path="/snsapp" component={App} />
      </CookiesProvider>
    </BrowserRouter>
  </React.StrictMode>
);

ReactDOM.render(routing, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
