import React, { useState, useEffect } from 'react'; //状態変数の標準ReactHooksメソッド
import { getOnePost } from '../api/DrfApiFetch'; //作成済みのAPIメソッド

const PostDetail = (props) => {

  // 投稿詳細格納用の変数
  const [post, setPost] = useState([])

  // ページロードと同時に実行される処理
  useEffect(() => {
    // 一件の投稿の詳細取得用のAPI実行と、戻り値のpostへの格納。URIパラメータはpropsから取得。
    getOnePost(props.match.params.id, setPost);
  }, [])

  // ページのJSXを定義
  return (
    <div>
      <div class="container">
        <div class="alert alert-success" role="alert">
          <p>タイトル：{post.title}</p>
          <p>投稿者：{post.user}</p>
          <p>コメント：{post.content}</p>
          {/* <p><img src="{{post.sns_image.url}}" width=300></p> */}

          {/* {% if request.user in object.like.all %} */}
          <a href="" class="like-btn add-color" tabindex="-1" role="button" aria-disabled="true"><i class="fas fa-heart"></i></a>
          {/* {% else %} */}
          <a href="" class="like-btn" tabindex="-1" role="button" aria-disabled="true"><i class="far fa-heart"></i></a>
          {/* {% endif %} */}

          {/* {% if object.user in connection.0.following.all %} */}
          <a href="{% url 'follow-detail' pk %}" class="btn btn-danger ms-3" tabindex="-1" role="button" aria-disabled="true">フォロー解除</a>
          {/* {% else %} */}
          <a href="{% url 'follow-detail' pk %}" class="btn btn-primary ms-3" tabindex="-1" role="button" aria-disabled="true">フォロー</a>
          {/* {% endif %} */}
        </div>
      </div>
    </div>
  )
}

export default PostDetail
