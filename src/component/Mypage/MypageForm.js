import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import getLogin from "../../Context/Context";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px;
`;

const MypageForm = ({ handleSettingbutton, token, history }) => {
  const [change, setChange] = useState(true);
  const [data, getData] = useState("");
  const url = "http://localhost:5000";
  const value = useContext(getLogin);

  useEffect(() => {
    axios
      .get(url + "/mypage", {
        headers: {
          "x-access-token": token,
        },
      })
      .then(res => {
        getData(res.data);
      });
  }, []);

  const handlebutton = () => {
    setChange(!change);
    handleSettingbutton(change);
  };

  const handleDelete = event => {
    event.preventDefault();
    axios.patch(
      url + "/user/signout",
      {
        email: "deleted@deleted.com",
      },
      {
        headers: {
          "x-access-token": token,
        },
      }
    );
    value.handleLogin();
    value.handleToken("");
    value.handleGoogleToken("");
    history.push("/");
  };

  return (
    <>
      <Container>
        <h1 title="mypage">회원정보</h1>
        <div>
          <label>이메일 : </label>
          <label>{data.email}</label>
        </div>
        <div>
          <label>닉네임 : </label>
          <label>{data.nickName}</label>
        </div>
        <div>
          <label>나이대 : </label>
          <label>{data.age}</label>
        </div>
        <div>
          <label>격리된 지역 : </label>
          <label>{data.city}</label>
        </div>
        <button onClick={handlebutton}>정보수정</button>
        <button onClick={handleDelete}>회원탈퇴</button>
      </Container>
    </>
  );
};

export default MypageForm;
