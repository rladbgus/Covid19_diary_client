import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import MypageForm from "./MypageForm";
import SettingInfo from "./SettingInfo";
import axios from "axios";
import getLogin from "../../Context/Context";
import CheckingModal from "../../Modal/CheckingModal";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 80px;

  .btn {
    display: inline-block;
    padding-bottom: 100px;
  }

  button {
    background: black;
    color: #81c784;
    border: none;
    position: relative;

    font-size: 1.25em;

    cursor: pointer;
    transition: 800ms ease all;
    outline: none;

    line-height: 40px;
    margin: 10px 10px;
    padding: 0px 20px;
  }
  button:hover {
    background: #fff;
    color: #1aab8a;
  }
  button:before,
  button:after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    height: 2px;
    width: 0;
    background: #1aab8a;
    transition: 400ms ease all;
  }
  button:after {
    right: inherit;
    top: inherit;
    left: 0;
    bottom: 0;
  }
  button:hover:before,
  button:hover:after {
    width: 100%;
    transition: 800ms ease all;
  }
`;

const Mypage = ({ history }) => {
  const [data, getData] = useState("");
  const value = useContext(getLogin);
  const url = "http://localhost:5000/mypage";
  const getToken = window.sessionStorage.getItem("token");
  const [modal, getModal] = useState(false);
  const [children, getChildren] = useState("");

  const openModalModify = () => {
    getModal(!modal);
    getChildren("정보수정");
  };

  const openModalDelete = () => {
    getModal(!modal);
    getChildren("회원탈퇴");
  };

  const closeModal = () => {
    getModal(!modal);
  };

  useEffect(() => {
    let ac = new AbortController();
    let mounted = true;
    axios
      .get(url, {
        headers: {
          "x-access-token": getToken,
        },
      })
      .then((res) => {
        getData(res.data);
      });

    return () => {
      ac.abort();
    };
  }, []);

  return (
    <>
      {!value.isChecking ? (
        <Container>
          <MypageForm token={getToken} history={history} />
          <div className="btn">
            <button onClick={openModalModify}>정보수정</button>
            <button onClick={openModalDelete}>회원탈퇴</button>
          </div>

          <CheckingModal visible={modal} onClose={closeModal}>
            {children}
          </CheckingModal>
        </Container>
      ) : (
        <Container>
          <SettingInfo userInfo={data} token={getToken} />
        </Container>
      )}
    </>
  );
};

export default Mypage;
