import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getRequestUser } from './api/DrfApiFetch';


const Header = () => {
  const [requestUser, setRequestUser] = useState([])

  // ページロードと同時に実行される処理
  useEffect(() => {
    // 全投稿取得用のAPI実行と、戻り値のpostsへの格納
    getRequestUser(setRequestUser);
  }, [])

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-3">
      <div className="container-fluid">
        <a className="navbar-brand"><Link to='/'>Home</Link></a>
        {requestUser.id ?
          (
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
          ) :
          ''}
        {requestUser.id ?
          (
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                <div className="nav-link"><Link to='/follow-list/'>フォローユーザーの投稿</Link></div>
                <div className="nav-link"><Link to='/mypost/'>自分の投稿</Link></div>
                {/* <div class="nav-link"><Link to='/'>ログアウト</Link></div> */}
                <div className="nav-link btn btn-success" role="button"><Link to='/create/'>投稿</Link></div>
              </div>
            </div>
          ) :
          ''}
        {requestUser.id ?
          (
            <div>
              {requestUser.username + 'さん'}
            </div>
          ) :
          ''}
      </div>
    </nav>
  )
}

export default Header;
