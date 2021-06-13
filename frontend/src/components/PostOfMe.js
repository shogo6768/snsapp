import React, { useContext, useEffect } from 'react'; //状態変数の標準ReactHooksメソッド
import { ApiContext } from "../context/ApiContext";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom';  //ページ遷移用のリンクメソッド。ページ間のパラメータ転送に便利なので、統一。
// 追加
import Grid from '@material-ui/core/Grid'

const PostOfMe = () => {

  // API周りの変数取得
  const { allPosts, getAllPosts, requestUser, toggleOnePostLike } = useContext(ApiContext);

  useEffect(() => {
    getAllPosts();
  }, [])

  const postsOfMe = allPosts.filter((post) => {
    return post.user === requestUser.id
  })

  // いいねボタンの非同期処理関数
  const toggleLike = (event) => {
    // ボタンクリックのクラスリストで判定
    const evt_classes = event.currentTarget.classList

    // add-colorがあるか否かで、クラスつけ外し処理を分岐
    if (evt_classes.contains("add-color")) {
      event.currentTarget.classList.remove("add-color");
    }
    else {
      event.currentTarget.classList.add("add-color");
    }

    // API関数は共通⇨DRF側で処理を分岐。
    toggleOnePostLike(event.currentTarget.nextElementSibling.id);
  };

  // ページのJSXを定義
  return (
    <Grid container>
      <Grid item xs={12}>
        <div className="container mt-3">
          {postsOfMe.map((post) =>
            <div className="alert alert-success" role="alert">
              <p>
                タイトル：<Link to={`/snsapp/detail/${post.id}`}>{post.title}</Link>
              </p>
              <p>
                投稿者：{post.username}
              </p>
              {/* いいねボタン */}
              {
                post.like.includes(requestUser.id) ?
                  <FontAwesomeIcon
                    onClick={toggleLike}
                    icon={faHeart}
                    className="like-btn add-color"
                    tabIndex="-1"
                    role="button"
                    aria-disabled="true"
                  /> :
                  <FontAwesomeIcon
                    onClick={toggleLike}
                    icon={faHeart}
                    className="like-btn"
                    tabIndex="-1"
                    role="button"
                    aria-disabled="true"
                  />
              }
            </div>
          )}
        </div>
      </Grid>
    </Grid>
  )
}

export default PostOfMe
