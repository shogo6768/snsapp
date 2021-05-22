import React from 'react';
import './App.css';
// snsapp配下のルーティングに必要（npm install必要）
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// 以下、共通フォーマット用
import Navbar from './components/Navbar';
import Header from './components/Header';
// 以下、ルーティング先のページコンポーネント
import Home from './components/Home.js';
import PostCreate from './components/PostCreate.js';
import PostDetail from './components/PostDetail';
import PostOfMe from './components/PostOfMe';
import PostOfFollow from './components/PostOfFollow';
// APIcontext
import ApiContextProvider from "./context/ApiContext";
// Material UIライブラリ
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import indigo from '@material-ui/core/colors/indigo'
// React-bootstrapをインポート（npm install必要）
import 'bootstrap/dist/css/bootstrap.min.css';
// import { NavigateBefore } from '@material-ui/icons';

// themeを設定
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
            {/* 共通ページフォーマットとしてHeader.jsの内容をレンダリング */}
            <Header />
            <div>
              {/* アプリ全体で使用するページをルーティング */}
              <Switch>
                {/* <Route exact path='/auth/' component={Auth} /> */}
                <Route exact path='/' component={Home} />
                <Route exact path='/create/' component={PostCreate} />
                <Route exact path='/detail/:id/' component={PostDetail} />
                <Route exact path='/mypost/' component={PostOfMe} />
                <Route exact path='/follow-list/' component={PostOfFollow} />
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
