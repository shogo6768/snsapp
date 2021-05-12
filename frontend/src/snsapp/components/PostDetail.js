import React, { useState, useEffect } from 'react';
import { getOnePost } from '../api/DrfApiFetch'

const PostDetail = (props) => {

  const [post, setPost] = useState([])

  useEffect(() => {
    getOnePost(this.props.params.id, setPost);
  }, [])

  return (
    <div>
      <div class="container">
        <div class="alert alert-success" role="alert">
          {/* <p>タイトル：{{ object.title }}</p>
          <p>投稿者：{{ object.user }}</p>
          <p>コメント：{{ object.content }}</p>
          <p><img src="{{object.sns_image.url}}" width=300></p> */}

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
