import React, { useContext, useState, useEffect } from 'react'; //状態変数の標準ReactHooksメソッド
import { Link } from 'react-router-dom';  //ページ遷移用のリンクメソッド。ページ間のパラメータ転送に便利なので、統一。
import { ApiContext } from "../context/ApiContext";

const Home = () => {

  // 全投稿格納用のリスト型変数
  const [posts, setPosts] = useState([])
  const { getAllPosts } = useContext(ApiContext)

  // ページロードと同時に実行される処理
  useEffect(() => {
    // 全投稿取得用のAPI実行と、戻り値のpostsへの格納
    getAllPosts(setPosts);
  }, [])

  // ページのJSXを定義
  return (
    <div>
      {
        // ロード時に取得したpostsに対する繰り返し処理で、規定フォーマットで全件表示
        posts.map(post => <div class="container mt-3">
          <div class="alert alert-success" role="alert">
            {/* 各postに対し、DRFのシリアライザーで指定したフィールドを読み取り */}
            {/* タイトルに詳細ページへのリンクづけ。uriに含めた${ }は遷移先で、props.params.match.idで取得可能。 */}
            <p>タイトル：<Link to={`/detail/${post.id}`}>{post.title}</Link></p>
            <p>投稿者：{post.username}</p>
            {/* 以下、未処理 */}
            <a href="{% url 'like-home' item.pk %}" class="like-btn add-color" tabindex="-1" role="button" aria-disabled="true"><i class="fas fa-heart"></i></a>
            <a href="{% url 'like-home' item.pk %}" class="like-btn" tabindex="-1" role="button" aria-disabled="true"><i class="far fa-heart"></i></a>
            <a href="{% url 'follow-home' item.pk %}" class="btn btn-danger ms-3" tabindex="-1" role="button" aria-disabled="true">フォロー解除</a>
            <a href="{% url 'follow-home' item.pk %}" class="btn btn-primary ms-3" tabindex="-1" role="button" aria-disabled="true">フォロー</a>
          </div>
        </div>
        )
      }
    </div>
  )
}

export default Home
