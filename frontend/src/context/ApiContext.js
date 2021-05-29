import React, { createContext, useState, useEffect } from "react";
import { withCookies } from "react-cookie";
import axios from 'axios'

// 外部から呼べる様にエクスポート
export const ApiContext = createContext();

// cookie情報格納用にprops利用
const ApiContextProvider = (props) => {
  // API用の状態変数
  // トークンをAPIコンテクストで使うので取得。ログイン認証に成功時に格納した変数を取得。
  const token = props.cookies.get("current-token");
  // ログインユーザー...全ページ
  const [requestUser, setRequestUser] = useState([]);
  // 全フォロー状況...全ページ
  const [followList, setFollowList] = useState([]);
  // 投稿詳細...Detail
  const [onePost, setOnePost] = useState([]);
  // 投稿のいいねリスト
  const [onePostLikeList, setOnePostLikeList] = useState([]);
  // 投稿一覧...Home、PostOfMe、PostOfFollow
  const [allPosts, setAllPosts] = useState([]);
  // 編集する投稿の内容...投稿編集
  const [editedOnePost, setEditedOnePost] = useState({ id: "", title: "", content: "", like: [] });

  // APIの共通URL部
  const API_BASE_URL = 'http://127.0.0.1:8000/snsapi/api'

  // アプリ起動時に呼ぶAPIを定義
  useEffect(() => {
    // ログインユーザーの取得
    const getRequestUser = async () => {
      try {
        const res = await axios.get(
          API_BASE_URL + "/request-user/",
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        // APIがリストAPIなのでインデックス付きで処理
        res.data[0] && setRequestUser(res.data[0]);
      }
      catch {
        console.log("error");
      }
    }
    // ログインユーザーのコネクションの取得
    const getFollowList = async () => {
      try {
        const res = await axios.get(
          API_BASE_URL + "/request-user/connections/",
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        // APIがリストAPIなのでインデックス付きで処理
        setFollowList(res.data[0].following);
      }
      catch {
        console.log("error");
      }
    }
    // 関数呼び出し
    getRequestUser();
    getFollowList();
    // 自分のプロフィールを新規作成、削除したときには呼ばれるように設定
  }, [token, requestUser.id]);

  // 全投稿取得
  const getAllPosts = async () => {
    try {
      const res = await axios.get(
        API_BASE_URL + "/posts/",
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      setAllPosts(res.data);
    }
    catch {
      console.log("error");
    }
  }

  // 投稿一件の詳細を取得
  const getOnePost = async (id) => {
    try {
      const res = await axios.get(
        API_BASE_URL + `/posts/${id}`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      setOnePost(res.data);
    }
    catch {
      console.log("error");
    }
  }

  // 投稿作成
  const createNewPost = async () => {
    const createData = FormData();
    createData.append("title", editedOnePost.title);
    createData.append("content", editedOnePost.content);
    try {
      await axios.post(
        API_BASE_URL + '/posts',
        createData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      );
    }
    catch {
      console.log("error");
    }
  }

  // フォロートグル
  const toggleOneUserFollow = async (post_id) => {
    try {
      await axios.get(
        API_BASE_URL + `/follow/${post_id}/`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
    }
    catch {
      console.log("error");
    }
  }

  // 一つの投稿のいいねリストを取得
  const getOnePostLikeList = async (id) => {
    try {
      const res = await axios.get(
        API_BASE_URL + `/posts/${id}`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      setOnePostLikeList(res.data.like);
    }
    catch {
      console.log("error");
    }
  }

  // いいねトグル
  const toggleOnePostLike = async (post_id) => {
    try {
      await axios.get(
        API_BASE_URL + `/like/${post_id}/`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      getOnePost(post_id);
      getOnePostLikeList(post_id);
    }
    catch {
      console.log("error");
    }
  }

  return (
    <ApiContext.Provider
      value={{
        requestUser,
        followList,
        onePost,
        onePostLikeList,
        allPosts,
        setAllPosts,
        getAllPosts,
        getOnePost,
        getOnePostLikeList,
        createNewPost,
        // いいね、投稿更新、投稿削除が必要
        toggleOnePostLike,
        toggleOneUserFollow,
      }}
    >
      {props.children}
    </ApiContext.Provider>
  );
};

// Cookie用のエクスポート
export default withCookies(ApiContextProvider)
