import React from 'react';
import axios from 'axios'
import { Redirect } from 'react-router-dom';
import { withCookies } from 'react-cookie';

const LoggedIn = (props) => {

  // tokenが有効であるか確認
  if (props.cookies.get('blog-token')) {

    let form_data = new FormData();
    form_data.append('token', props.cookies.get('blog-token'));

    axios.post(`${process.env.REACT_APP_END_POINT}/api/token/verify/`, form_data, {
      headers: {
        'content-type': 'multipart/form-data'
      },
    })
      .catch(error => {
        alert('再度ログインを行なってください');
        props.cookies.remove('blog-token')
        window.location.href = "/auth";
      });

    return props.children;

  } else {
    return <Redirect to={'/auth'} />
  }
}

export default withCookies(LoggedIn);
