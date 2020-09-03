import React, { useState, useContext } from "react";
import styled from "styled-components";
import { NavLink, Link } from "react-router-dom";
import logo from "../../img/corona_logo.png";
import getLogin from "../../Context/Context";
import AlertModal from "../../Modal/AlertModal";

const Header = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  background-color: #cbe0e7;
  border: 0px;
  border-radius: 0, 0, 10px, 10px;
  height: 50px;

  button {
    float: right;
  }

  .menus {
    margin: 12px;
  }

  .search_btn {
    margin: 10px;
  }

  .open {
    background-color: #f8ec7f;
    float: right;
  }

  .close {
    display: none;
  }

  .logo {
    width: 40px;
    height: 40px;
    margin: 5px 0px 0px 10px;
  }
`;

function Nav(props) {
  const [MenuState, setIsMenuOpen] = useState(false);
  const [modal, getModal] = useState(false);
  const [children, getChildren] = useState("");
  const [className, getClassName] = useState("");

  const openModal = () => {
    getModal(!modal);
  };

  const closeModal = () => {
    getModal(!modal);
  };

  const value = useContext(getLogin);
  // console.log(value.token);
  console.log("로그인 상태", value.isLogin);

  return (
    <Header>
      {/* 로고 */}
      <Link to="/" className="homelink">
        <img className="logo" src={logo} alt="logo"></img>
      </Link>

      {/* 검색버튼 */}
      <Link to="/Search" className="search_btn">
        검색
      </Link>

      {/* 햄버거버튼 */}
      <button
        className="menus"
        onClick={() => {
          setIsMenuOpen(!MenuState);
        }}
      >
        ≡
      </button>
      {/* 로그인 전 내용 */}
      <span
        className="logoutstate"
        style={value.isLogin ? { display: "none" } : { display: "block" }}
      >
        <ul className={MenuState ? "open" : "close"}>
          <li>
            <NavLink exact to="/user/login" className="selected">
              로그인
            </NavLink>
          </li>
          <li>
            <NavLink to="/user/signup" className="selected">
              회원가입
            </NavLink>
          </li>
        </ul>
      </span>

      {/* 로그인 후 내용 */}
      <span
        className="loginstate"
        style={value.isLogin ? { display: "block" } : { display: "none" }}
      >
        <ul className={MenuState ? "open" : "close"}>
          <li>
            <NavLink exact to="/writing" className="selected">
              일기쓰기
            </NavLink>
          </li>
          <li>
            <NavLink to="/mypage" className="selected">
              회원정보
            </NavLink>
          </li>
          <li>
            <NavLink to="/mycontentslist" className="selected">
              내가 쓴 글 보기
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/"
              className="selected"
              onClick={() => {
                value.handleLogin();
                // alert("로그아웃 되었습니다:)");
                value.handleToken("");
                getChildren("로그아웃 되었습니다:)");
                getClassName("logout");
                return openModal();
              }}
            >
              로그아웃
            </NavLink>
          </li>
        </ul>
      </span>
    </Header>
  );
}

export default Nav;
