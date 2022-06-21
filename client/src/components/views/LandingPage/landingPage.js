import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Auth from "../../../hoc/auth";

function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/api/hello").then((response) => console.log(response));
  }, []);

  const onClickLogout = () => {
    axios.get("/api/users/logout").then((response) => {
      if (response.data.success) {
        navigate("/login");
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
      <h2>시작 페이지</h2>
      <button onClick={onClickLogout}>로그아웃</button>
    </div>
  );
}
export default Auth(LandingPage, null);
