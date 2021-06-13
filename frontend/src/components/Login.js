// useReducerはログインの状態管理
import React, { useReducer } from "react";
// クッキー用
import { withCookies } from "react-cookie";
// ログインのAPIを使うので
import axios from "axios";
// アバター用のmaterial-ui
import Avatar from "@material-ui/core/Avatar";
// ボタン用のmaterial-ui
import Button from "@material-ui/core/Button";
// テキストフィールド用のmaterial-ui
import TextField from "@material-ui/core/TextField";
// 鍵が空いたアイコンのmaterial-ui
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
// タイポグラフィ用のmaterial-ui
import Typography from "@material-ui/core/Typography";
// useStylesの作成用
import { makeStyles } from "@material-ui/core/styles";
// コンテナ表示のmaterial-ui
import Container from "@material-ui/core/Container";
// ログインロードの状態を可視化
import CircularProgress from "@material-ui/core/CircularProgress";
// 定数マクロをインポート
import {
  START_FETCH,
  FETCH_SUCCESS,
  ERROR_CATCHED,
  //INPUT_EDIT,
  INPUT_EDIT_LOG,
  INPUT_EDIT_REG,
  TOGGLE_MODE,
} from "./actionTypes";

// styleの定義
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),  // マージン
    display: "flex",              // コンテナの定義
    flexDirection: "column",      // 列にで方向づけ
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  span: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "teal",
  },
  spanError: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "fuchsia",
    marginTop: 10,
  },
}));

// 初期状態の設定
const initialState = {

  // ロードの状態を保存
  isLoading: false,
  // ログインビューを最初に表示⇨切り替え後に新規登録
  isLoginView: true,
  // エラーメッセージの文字列
  error: "",
  // ユーザーネーム、Email、パスワードのステート。ログインと新規登録で分ける。
  credentialsLog: {
    username: "",
    password: "",
  },
  credentialsReg: {
    email: "",
    password: "",
  },
};

// Reducerでログイン状態を管理。状態とアクションにより処理を変える。
const loginReducer = (state, action) => {
  switch (action.type) {
    // START＿FETCHの場合
    case START_FETCH: {
      return {
        // initialStateを全部展開するという意味
        ...state,
        isLoading: true,
      };
    }
    case FETCH_SUCCESS: {
      return {
        ...state,
        // successしたらfalseにかえる
        isLoading: false,
      };
    }
    case ERROR_CATCHED: {
      return {
        ...state,
        // 出力エラーメッセージを格納
        error: "Email or password is not correct!",
        isLoading: false,
      };
    }
    // case INPUT_EDIT: {
    //   return {
    //     ...state,
    //     [action.inputName]: action.payload,
    //     error: "",
    //   };
    // }
    // 入力フォームの変更時
    case INPUT_EDIT_LOG: {
      return {
        ...state,
        //[action.inputName]: action.payload,
        credentialsLog: {
          ...state.credentialsLog,
          // formで入力された値を受け取る様に変更
          [action.inputName]: action.payload,
        },
        error: "",
      };
    }
    case INPUT_EDIT_REG: {
      return {
        ...state,
        //[action.inputName]: action.payload,
        credentialsReg: {
          ...state.credentialsReg,
          [action.inputName]: action.payload,
        },
        error: "",
      };
    }
    // loginとregisterを切り替えるモード
    case TOGGLE_MODE: {
      return {
        ...state,
        isLoginView: !state.isLoginView,
      };
    }
    default:
      return state;
  }
};

const Login = (props) => {
  // 上記のスタイルを使用することを宣言
  const classes = useStyles();
  // Reducerで管理するログイン状態を、dispatchという関数で変更できる様になった
  const [state, dispatch] = useReducer(loginReducer, initialState);

  // タイピングが会ったときに呼び出される
  const inputChangedLog = () => (event) => {
    //const cred = state.credentialsLog;
    //cred[event.target.name] = event.target.value;
    dispatch({
      // INPUT_EDIT_LOGというアクションで実行されている
      type: INPUT_EDIT_LOG,
      //inputName: "state.credentialLog",
      //payload: cred,
      inputName: event.target.name,
      payload: event.target.value,
    });
  };

  // タイピングが会ったときに呼び出される。新規登録版。
  const inputChangedReg = () => (event) => {
    //const cred = state.credentialsReg;
    //cred[event.target.name] = event.target.value;
    dispatch({
      type: INPUT_EDIT_REG,
      //inputName: "state.credentialReg",
      //payload: cred,
      inputName: event.target.name,
      payload: event.target.value,
    });
  };

  // loginのSubmitが押された時の関数
  // async, await...レスポンスが来るまで待機する
  const login = async (event) => {
    // リフレッシュを無視
    event.preventDefault();
    if (state.isLoginView) {
      try {
        dispatch({ type: START_FETCH });
        // await付きでバックエンドの認証エンドポイントにアクセス
        const res = await axios.post(
          "http://127.0.0.1:8000/authen/",
          // クリックされた瞬間のログイン情報ステートを送信する
          state.credentialsLog,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        // レスポンスで返ってくるトークンを、現在のトークンとしてcookiesに格納する
        props.cookies.set("current-token", res.data.token);
        res.data.token
          // 成功すればトップページへジャンプ
          ? (window.location.href = "/snsapp")
          // 失敗すればルートURLへジャンプ
          : (window.location.href = "/");
        dispatch({ type: FETCH_SUCCESS });
      } catch {
        dispatch({ type: ERROR_CATCHED });
      }
    } else {
      // 以下、isLoginView=false=新規登録用の処理
      try {
        dispatch({ type: START_FETCH });
        await axios.post(
          "http://127.0.0.1:8000/api/v1/users/",
          state.credentialsReg,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        dispatch({ type: FETCH_SUCCESS });
        // 新規登録が完了したらログインのモードに切り替える
        dispatch({ type: TOGGLE_MODE });
      } catch {
        // 失敗したらエラーキャッチを呼ぶ
        dispatch({ type: ERROR_CATCHED });
      }
    }
  };

  // ログイン切り替えのボタンを用意しておく
  const toggleView = () => {
    dispatch({ type: TOGGLE_MODE });
  };


  return (
    <Container maxWidth="xs">
      {/* submit時にログインを呼ぶフォームを作成 */}
      <form onSubmit={login}>
        {/* material-uiのサンプル */}
        <div className={classes.paper}>
          {/* ローディングしている時のみ、ロード状態を表示する工夫 */}
          {state.isLoading && <CircularProgress />}
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          {/* フォームラベルの表示をログインビューか否かで切り替える */}
          <Typography variant="h5">
            {state.isLoginView ? "Login" : "Register"}
          </Typography>

          {/* ログイン時はusername、新規作成時はemail（ログイン時にusernameなのに、emailが要求される理由はdjangoの仕様でusernameとしか表示できないから） */}
          {state.isLoginView ? (
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Username"
              name="username"
              value={state.credentialsLog.username}
              onChange={inputChangedLog()}
              autoFocus
            />
          ) : (
            // nameフィールドと、inputChangedRegが呼ばれるところが異なる
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Username"
              name="username"
              value={state.credentialsReg.username}
              onChange={inputChangedReg()}
              autoFocus
            />
          )}

          {/* 次はパスワード用のフォーム */}
          {state.isLoginView ? (
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={state.credentialsLog.password}
              onChange={inputChangedLog()}
            />
          ) : (
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={state.credentialsReg.password}
              onChange={inputChangedReg()}
            />
          )}

          {/* エラーメッセージ用の出力 */}
          <span className={classes.spanError}>{state.error}</span>

          {/* サブミット用のボタン */}
          {state.isLoginView ? (
            // ログインの場合
            // passwordまたは、usernameが空欄の場合は、ボタンを非アクティブに
            !state.credentialsLog.password || !state.credentialsLog.username ? (
              <Button
                className={classes.submit}
                type="submit"
                fullWidth
                disabled
                variant="contained"
                color="primary"
              >
                Login
              </Button>
            ) : (
              <Button
                className={classes.submit}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Login
              </Button>
            )
          ) : !state.credentialsReg.password || !state.credentialsReg.username ? (
            // こっちは新規登録の場合
            <Button
              className={classes.submit}
              type="submit"
              fullWidth
              disabled
              variant="contained"
              color="primary"
            >
              Register
            </Button>
          ) : (
            <Button
              className={classes.submit}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Register
            </Button>
          )}

          {/* ログインとレジスターを切り替え用のメッセージ */}
          <span onClick={() => toggleView()} className={classes.span}>
            {state.isLoginView ? "Create Account ?" : "Back to login ?"}
          </span>
        </div>
      </form>
    </Container>
  );
};

export default withCookies(Login);
