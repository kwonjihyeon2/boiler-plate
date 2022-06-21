import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../../_action/user_action";
import Auth from "../../../hoc/auth";

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const onSubmitInfo = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return alert("비밀번호를 다시 확인해주세요");
    }
    let body = { email, password, name };

    dispatch(registerUser(body)).then((res) => {
      if (res.payload.success) {
        // console.log(props);
        navigate("/");
      } else {
        alert("회원가입 실패!");
      }
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <form
        onSubmit={onSubmitInfo}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <label>Email</label>
        <input type="email" value={email || ""} onChange={onChangeEmail} />
        <label>Name</label>
        <input type="text" value={name || ""} onChange={onChangeName} />
        <label>Password</label>
        <input
          type="password"
          autoComplete="off"
          value={password || ""}
          onChange={onChangePassword}
        />
        <label>ConfirmPassword</label>
        <input
          type="password"
          autoComplete="off"
          value={confirmPassword || ""}
          onChange={onChangeConfirmPassword}
        />
        <br />
        <button>Sign up</button>
      </form>
    </div>
  );
}

export default Auth(RegisterPage, false);
