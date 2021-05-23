// デフォルトインポート
import React from 'react';
import './App.css';

// 以下、Udemyレクチャで追加
// Material UIライブラリ
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import indigo from '@material-ui/core/colors/indigo'
// 共通フォーマットコンポーネント
import Navbar from './components/Navbar';
// 自作APIの呼び出し適用範囲を指定
import ApiContextProvider from "./context/ApiContext";

// 以下、個人で追加
// 以下、ルーティング先のページコンポーネント
import Home from './components/Home';
// import PostCreate from './components/PostCreate';
// import PostDetail from './components/PostDetail';
// import PostOfMe from './components/PostOfMe';
// import PostOfFollow from './components/PostOfFollow';
// snsapp配下のルーティングに必要（npm install必要）
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// React-bootstrapをインポート（npm install必要）
import 'bootstrap/dist/css/bootstrap.min.css';


// theme（CSS的なもの）を設定
const theme = createMuiTheme({
  palette: {
    primary: indigo,
    secondary: {
      main: '#f44336',
    },
  },
  typography: {
    fontFamily: 'Comic Neue',
  }
})

// ルーティング
function App() {
  return (
    <ApiContextProvider>
      <MuiThemeProvider theme={theme}>
        {/* 共通ページフォーマットとしてNavbarの内容をレンダリング */}
        <Navbar />
        <div className="container">
          <Router>
            <div>
              {/* アプリ全体で使用するページをルーティング */}
              <Switch>
                {/* <Route exact path='/' component={Home} /> */}
                {/* <Route exact path='/create' component={PostCreate} />
                <Route exact path='/detail/:id' component={PostDetail} />
                <Route exact path='/mypost' component={PostOfMe} />
                <Route exact path='/follow-list' component={PostOfFollow} /> */}
                {/* 上記以外のURLには、Not foundページのルーティング */}
                <Route render={() => <h4>not found...</h4>} />
              </Switch>
            </div>
          </Router>
        </div>
      </MuiThemeProvider>
    </ApiContextProvider>
  );
}

export default App;
