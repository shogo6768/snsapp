import axios from 'axios'

// APIの共通URL部
const API_BASE_URL = 'http://127.0.0.1:8000/snsapi/api'

// 投稿一覧を取得
export const getAllPosts = (callback) => {
  axios.get(API_BASE_URL + '/posts/')
    .then(res => { return callback(res.data); })
}

// 投稿作成
export const createNewPost = async (post, callback) => {
  // postするデータを用意
  const data = {
    title: post.title,
    content: post.content,
    user: post.user,
  }

  // post処理
  axios.post(API_BASE_URL + '/posts', data, {
    'Content-type': 'application/json',
  })
    .then(res => { return callback(res.data); })
}

// 投稿一件の詳細を取得
export const getOnePost = async (id, callback) => {
  axios.get(API_BASE_URL + `/posts/${id}`)
    .then(res => { return callback(res.data); })
}

// 投稿一件の詳細を更新(いいねで使う)
export const patchOnePost = async (id, data, callback) => {
  axios.get(API_BASE_URL + `/posts/${id}`, data)
    .then(res => { return callback(res.data); })
}

// ユーザー一覧の取得
export const getAllUsers = async (callback) => {
  axios.get(API_BASE_URL + '/users/')
    .then(res => { return callback(res.data); })
}

// ユーザー一件の詳細を取得
export const getOneUser = async (id, callback) => {
  axios.get(API_BASE_URL + `/users/${id}`)
    .then(res => { return callback(res.data); })
}

// ログインユーザーの詳細を取得
export const getRequestUser = async (callback) => {
  axios.get(API_BASE_URL + '/request-user/')
    .then(res => { return callback(res.data); })
}

// ユーザーログイン
export const logInUser = async (user) => {

  const data = {
    'username': user.username,
    'password': user.password,
  }

  axios.post('http://127.0.0.1:8000/rest-auth/login/', data, {
    'Content-type': 'application/json',
  })
}

// ユーザーログアウト
export const logOutUser = async () => {

  axios.post('http://127.0.0.1:8000/rest-auth/logout/', {
    'Content-type': 'application/json',
  })
}

// コネクション全件取得(ログインユーザーでフィルターしたい)
export const getAllConnections = async (callback) => {
  axios.get(API_BASE_URL + '/connections/?user=${requestUser}')
    .then(res => { return callback(res.data); })
}

// コネクションの作成
export const createConnection = async (connection, callback) => {

  const data = {
    'user': connection.user,
    'follow': connection.follow,
  }

  axios.post(API_BASE_URL + '/connections/', data, {
    'Content-type': 'application/json',
  })
    .then(res => { return callback(res.data); })
}

// コネクション一件の取得
export const getOneConnection = async (id, callback) => {
  axios.get(API_BASE_URL + `/connections/${id}`)
    .then(res => { return callback(res.data); })
}

// コネクション一件の更新
export const patchOneConnection = async (id, connection, callback) => {

  const data = {
    'user': connection.user,
    'follow': connection.follow,
  }

  axios.patch(API_BASE_URL + `/connections/${id}`, data, {
    'Content-type': 'application/json',
  })
    .then(res => { return callback(res.data); })
}
