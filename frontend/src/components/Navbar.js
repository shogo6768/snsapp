import React, { useState, useContext } from "react";
import { ApiContext } from "../context/ApiContext";
import axios from 'axios';
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import { FiLogOut } from "react-icons/fi";
import { withCookies } from "react-cookie";
import { Modal, Form, Button } from "react-bootstrap";

const useStyles = makeStyles((theme) => ({
  bg: {
    marginRight: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
    color: "#fff"
  },
}));

const Navbar = (props) => {
  // 上記定義のStylesを使用
  const classes = useStyles();
  // トークンをAPIコンテクストで使うので取得。ログイン認証に成功時に格納した変数を取得。
  const token = props.cookies.get("current-token");

  // モーダルの状態変数
  const [modalIsOpen, setIsOpen] = useState(false);
  const [formTitle, setFormTitle] = useState('');
  const [formContent, setFormContent] = useState('');

  // API周りの変数取得
  const { requestUser } = useContext(ApiContext);

  // モーダル処理
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
    setFormTitle('');
    setFormContent('');
  };

  // ログアウト処理
  const Logout = () => (event) => {
    props.cookies.remove("current-token");
    window.location.href = "/";
  };

  // APIの共通URL部
  const API_BASE_URL = 'http://127.0.0.1:8000/api/v1'

  // 送信処理
  const handleSubmit = async (event) => {
    event.preventDefault();
    const createData = new FormData();
    createData.append('title', formTitle);
    createData.append('content', formContent);
    createData.append('user', requestUser.id);
    try {
      const res = await axios.post(
        API_BASE_URL + "/posts/",
        createData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          }
        }
      );
      window.location.href = "/snsapp/mypost"
    }
    catch {
      console.log("error");
    }
  };

  // JSXの定義
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h5" className={classes.title}>
          SNSapp
        </Typography>
        <Breadcrumbs aria-label="breadcrumb" className={classes.title}>
          <Link color="inherit" href="/snsapp">
            全ユーザーの投稿
          </Link>
          <Link color="inherit" href="/snsapp/follow-list">
            フォローユーザーの投稿
          </Link>
          <Link color="inherit" href="/snsapp/mypost">
            自分の投稿
          </Link>
          <Button onClick={openModal} className="btn-lg btn-success">
            投稿
          </Button>
        </Breadcrumbs>
        <button className="signOut" onClick={Logout()}>
          <FiLogOut />
        </button>
      </Toolbar>

      <Modal show={modalIsOpen} onHide={() => closeModal()} aria-labelledby="modal-dialog">
        <Modal.Header closeButton bsPrefix="modal-header">
          <Modal.Title id="modal-dialog">{requestUser.username}さんの新規投稿</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>タイトル</Form.Label>
              <Form.Control type="text" name="title" value={formTitle} onChange={(e) => setFormTitle(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput2">
              <Form.Label>投稿内容</Form.Label>
              <Form.Control size="lg" type="text" name="content" value={formContent} onChange={(e) => setFormContent(e.target.value)} />
            </Form.Group>
            <Button type="submit">送信する</Button>
          </Form>
        </Modal.Body>
      </Modal>
      <div style={{ display: 'none' }}>
        <form name="contact" method="POST" data-netlify="true">
          <input type="hidden" name="form-name" value="newPost" />
          <input type="text" name="formtitle" defaultValue={formTitle} />
          <input type="text" name="formcontent" defaultValue={formContent} />
        </form>
      </div>
    </AppBar>
  );
};

export default withCookies(Navbar);
