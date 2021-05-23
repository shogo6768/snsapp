// import React, { useContext, useState, useEffect } from 'react'; //状態変数の標準ReactHooksメソッド
// import { Link } from 'react-router-dom';  //ページ遷移用のリンクメソッド。ページ間のパラメータ転送に便利なので、統一。
// import { ApiContext } from "../context/ApiContext";

// // 追加
// import Grid from '@material-ui/core/Grid'
// import { BsFillPeopleFill } from "react-icons/bs";


// const Home = () => {

//   // 全投稿格納用のリスト型変数
//   const { allPosts } = useContext(ApiContext)

//   // ページロードと同時に実行される処理
//   // useEffect(() => {
//   //   // 全投稿取得用のAPI実行と、戻り値のpostsへの格納
//   //   getAllPosts(setPosts);
//   // }, [])

//   // ページのJSXを定義
//   return (
//     <Grid container>
//       <Grid item xs={12}>
//         <div className="container mt-3">
//           {allPosts.map((post) =>
//             <div className="alert alert-success" role="alert">
//               <p>
//                 タイトル：<Link to={`/detail/${post.id}`}>{post.title}</Link>
//               </p>
//               <p>
//                 投稿者：{post.username}
//               </p>
//               <a href="{% url 'like-home' item.pk %}" class="like-btn add-color" tabindex="-1" role="button" aria-disabled="true"><i class="fas fa-heart"></i></a>
//               <a href="{% url 'like-home' item.pk %}" class="like-btn" tabindex="-1" role="button" aria-disabled="true"><i class="far fa-heart"></i></a>
//               <a href="{% url 'follow-home' item.pk %}" class="btn btn-danger ms-3" tabindex="-1" role="button" aria-disabled="true">フォロー解除</a>
//               <a href="{% url 'follow-home' item.pk %}" class="btn btn-primary ms-3" tabindex="-1" role="button" aria-disabled="true">フォロー</a>
//             </div>
//           )}
//         </div>
//       </Grid>
//     </Grid>
//   )
// }

// export default Home
