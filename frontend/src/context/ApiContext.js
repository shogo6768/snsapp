// import React, { createContext, useState, useEffect } from "react";
// import { withCookies } from "react-cookie";
// import axios from 'axios'

// // 外部から呼べる様にエクスポート
// export const ApiContext = createContext();

// // cookie情報格納用にprops利用
// const ApiContextProvider = (props) => {
//   // API用の状態変数
//   // トークンをAPIコンテクストで使うので取得。ログイン認証に成功時に格納した変数を取得。
//   const token = props.cookies.get("current-token");
//   // ログインユーザー...全ページ
//   const [requestUser, setRequestUser] = useState([]);
//   // 全フォロー状況...全ページ
//   const [allConnections, setAllConnections] = useState([]);
//   // 投稿詳細...Detail
//   const [onePost, setOnePost] = useState([]);
//   // 投稿一覧...Home、PostOfMe、PostOfFollow
//   const [allPosts, setAllPosts] = useState([]);
//   // 編集する投稿の内容...投稿編集
//   const [editedOnePost, setEditedOnePost] = useState({ id: "", title: "", content: "" });

//   // APIの共通URL部
//   const API_BASE_URL = 'http://127.0.0.1:8000/snsapi/api'

//   // アプリ起動時に呼ぶAPIを定義
//   useEffect(() => {
//     // ログインユーザーの取得
//     const getRequestUser = async () => {
//       try {
//         const res = await axios.get(
//           API_BASE_URL + "/request-user/",
//           {
//             headers: {
//               Authorization: `Token ${token}`,
//             },
//           }
//         );
//         setRequestUser(res.data);
//       }
//       catch {
//         console.log("error");
//       }
//     }
//     // 全コネクションの取得
//     const getAllConnections = async () => {
//       try {
//         const res = await axios.get(
//           API_BASE_URL + "/connections/",
//         );
//         setAllConnections(res.data);
//       }
//       catch {
//         console.log("error");
//       }
//     }
//     // 作成したHooksコンポーネントの呼び出し
//     getRequestUser();
//     getAllConnections();
//     // 自分のプロフィールを新規作成、削除したときには呼ばれるように設定
//   }, [token, requestUser.id]);

//   // 全投稿取得
//   const getAllPosts = async () => {
//     try {
//       const res = await axios.get(
//         API_BASE_URL + "/posts/"
//       );
//       setAllPosts(res.data);
//     }
//     catch {
//       console.log("error");
//     }
//   }

//   // 投稿一件の詳細を取得
//   const getOnePost = async (id) => {
//     try {
//       const res = await axios.get(
//         API_BASE_URL + `/posts/${id}`
//       )
//     }
//     catch {
//       console.log("error");
//     }
//   }

//   // 投稿作成
//   const createNewPost = async (callback) => {
//     const createData = FormData();
//     createData.append("title", editedOnePost.title);
//     createData.append("content", editedOnePost.content);
//     try {
//       const res = await axios.post(
//         API_BASE_URL + '/posts',
//         createData,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Token ${token}`,
//           },
//         }
//       );
//       callback(res.data);
//     }
//     catch {
//       console.log("error");
//     }
//   }


//   // // 投稿一件の詳細を更新(いいねで使う)
//   // const patchOnePost = async (id, data, callback) => {
//   //   axios.get(API_BASE_URL + `/posts/${id}`, data)
//   //     .then(res => { return callback(res.data); })
//   // }

//   // // コネクションの作成
//   // const createConnection = async (connection, callback) => {

//   //   const data = {
//   //     'user': connection.user,
//   //     'follow': connection.follow,
//   //   }

//   //   axios.post(API_BASE_URL + '/connections/', data, {
//   //     'Content-type': 'application/json',
//   //   })
//   //     .then(res => { return callback(res.data); })
//   // }

//   // // コネクション一件の更新
//   // const patchOneConnection = async (id, connection, callback) => {

//   //   const data = {
//   //     'user': connection.user,
//   //     'follow': connection.follow,
//   //   }

//   //   axios.patch(API_BASE_URL + `/connections/${id}`, data, {
//   //     'Content-type': 'application/json',
//   //   })
//   //     .then(res => { return callback(res.data); })
//   // };

//   return (
//     <ApiContext.Provider
//       value={{
//         requestUser,
//         allConnections,
//         onePost,
//         allPosts,
//         setAllPosts,
//         getAllPosts,
//         getOnePost,
//         createNewPost,
//         // いいね、投稿更新、投稿削除が必要
//       }}
//     >
//       {props.children}
//     </ApiContext.Provider>
//   );
// };

// // Cookie用のエクスポート
// export default withCookies(ApiContextProvider)
