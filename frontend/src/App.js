import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './snsapp/Header';
import Home from './snsapp/components/Home.js';
import PostCreate from './snsapp/components/PostCreate.js';
import PostDetail from './snsapp/components/PostDetail';
import PostOfMe from './snsapp/components/PostOfMe';
import PostOfFollow from './snsapp/components/PostOfFollow';
import 'bootstrap/dist/css/bootstrap.min.css';

// import logo from './logo.svg';
// import './App.css';
// import DrfApiFetch from './snsapp/api/DrfApiFetch';

function App() {
  return (
    <div>
      <Router>
        <Header />
        <div>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/create/' component={PostCreate} />
            <Route exact path='/detail/:id/' component={PostDetail} />
            <Route exact path='/mypost/' component={PostOfMe} />
            <Route exact path='/follow-list/' component={PostOfFollow} />
            <Route render={() => <h4>not found...</h4>} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
