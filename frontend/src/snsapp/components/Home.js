import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { getAllPosts, getOneUser, getRequestUser } from '../api/DrfApiFetch';

const Home = () => {

  // 全投稿格納用のリスト型変数
  const [posts, setPosts] = useState([])

  // ページロードと同時に実行される処理
  useEffect(() => {
    // 全投稿取得用のAPI実行と、戻り値のpostsへの格納
    getAllPosts(setPosts);
  }, [])

  // ページのJSXを定義
  return (
    <div>
      {
        posts.map(post => <div class="container mt-3">
          <div class="alert alert-success" role="alert">
            <p>タイトル：<Link to={`/detail/${post.id}`}>{post.title}</Link></p>
            <p>投稿者：{post.username}</p>
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
