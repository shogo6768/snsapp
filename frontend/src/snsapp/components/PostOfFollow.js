import React from 'react';
import { } from '../api/DrfApiFetch';

const PostOfFollow = () => {
  return (
    <div>
      <div class="container mt-3">
        <div class="alert alert-success" role="alert">
          {/* <p>タイトル：<a href="{% url 'detail' item.pk %}">{{ item.title }}</a></p>
          <p>投稿者：{{ item.user }}</p> */}

          <a href="{% url 'like-home' item.pk %}" class="like-btn add-color" tabindex="-1" role="button" aria-disabled="true"><i class="fas fa-heart"></i></a>
          <a href="{% url 'like-home' item.pk %}" class="like-btn" tabindex="-1" role="button" aria-disabled="true"><i class="far fa-heart"></i></a>

          <a href="{% url 'follow-home' item.pk %}" class="btn btn-danger ms-3" tabindex="-1" role="button" aria-disabled="true">フォロー解除</a>
          <a href="{% url 'follow-home' item.pk %}" class="btn btn-primary ms-3" tabindex="-1" role="button" aria-disabled="true">フォロー</a>
        </div>
      </div>
    </div>
  )
}

export default PostOfFollow
