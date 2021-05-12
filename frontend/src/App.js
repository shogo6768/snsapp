import React from 'react';
// ルーティング処理に必要（npm install必要）
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// 以下、ルーティング先のページコンポーネントに指定用
import Header from './snsapp/Header';
import Home from './snsapp/components/Home.js';
import PostCreate from './snsapp/components/PostCreate.js';
import PostDetail from './snsapp/components/PostDetail';
import PostOfMe from './snsapp/components/PostOfMe';
import PostOfFollow from './snsapp/components/PostOfFollow';
// React-bootstrapをインポート（npm install必要）
import 'bootstrap/dist/css/bootstrap.min.css';

// import logo from './logo.svg';
// import './App.css';

function App() {
  return (
    <div>
      <Router>
        {/* 共通ページフォーマットとしてHeader.jsの内容をレンダリング */}
        <Header />
        <div>
          {/* アプリ全体で使用するページをルーティング */}
          <Switch>
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
  );
}

export default App;
