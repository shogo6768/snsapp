import React from 'react'
import { } from '../api/DrfApiFetch'

const PostCreate = () => {
  return (
    <div>
      <form method="post">
        {/* {% csrf_token %}
        {{ form.as_p }} */}
        <input type="submit" value="投稿"></input>
      </form>
    </div>
  )
}

export default PostCreate
