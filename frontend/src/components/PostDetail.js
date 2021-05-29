import React, { useContext, useEffect } from 'react'; //状態変数の標準ReactHooksメソッド
import { ApiContext } from "../context/ApiContext";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PostDetail = (props) => {
  // API周りの変数取得
  const { getOnePost, onePost, getOnePostLikeList, onePostLikeList, requestUser, toggleOnePostLike, followList, toggleOneUserFollow } = useContext(ApiContext);

  // ページロードと同時に実行される処理。投稿を取得。
  useEffect(() => {
    // 一件の投稿の詳細取得用のAPI実行と、戻り値のpostへの格納。URIパラメータはpropsから取得。
    getOnePost(props.match.params.id);
    getOnePostLikeList(props.match.params.id);
  }, [])

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
    toggleOnePostLike(onePost.id);
  };

  // フォローボタンの非同期処理関数
  const toggleFollow = (event) => {
    // ボタンクリックのクラスリストで判定
    const evt_classes = event.currentTarget.classList

    // btn-dangerがあるか否かで、クラスつけ外し処理を分岐
    if (evt_classes.contains("btn-danger")) {
      event.currentTarget.classList.remove("btn-danger");
      event.currentTarget.classList.add("btn-primary");
      event.currentTarget.innerHTML = "フォロー"
    }
    else {
      event.currentTarget.classList.remove("btn-primary");
      event.currentTarget.classList.add("btn-danger");
      event.currentTarget.innerHTML = "フォロー解除"
    }
    // API関数は共通⇨DRF側で処理を分岐。
    toggleOneUserFollow(onePost.id);
  };

  // ページのJSXを定義
  return (
    <div>
      <div className="container">
        <div className="alert alert-success" role="alert">
          <p>タイトル：{onePost.title}</p>
          <p>投稿者：{onePost.user}</p>
          <p>コメント：{onePost.content}</p>

          {/* いいねボタン */}
          {
            onePostLikeList.includes(requestUser.id) ?
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

          {/* フォローボタン */}
          {
            followList.includes(onePost.user) ?
              <button
                onClick={toggleFollow}
                className="btn btn-danger ms-3"
                tabindex="-1"
                role="button"
                aria-disabled="true"
              >フォロー解除</button> :
              <button
                onClick={toggleFollow}
                className="btn btn-primary ms-3"
                tabindex="-1"
                role="button"
                aria-disabled="true"
              >フォロー</button>
          }
        </div>
      </div>
    </div >
  )
}

export default PostDetail
