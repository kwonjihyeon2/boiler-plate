import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../_action/user_action";

//보여질 컴포넌트, 로그인 여부, 관리자 접근 여부
//(adminRoute = null : ES6문법, 인자로 값을 안넣으면 기본값을 null이라고 지정하는 것)
export default function (SpecificComponent, option, adminRoute = null) {
  //option null -> 아무나 출입이 가능한 페이지
  //true -> 로그인한 유저만 출입이 가능한 페이지
  //false -> 로그인한 유저는 출입이 불가능한 페이지

  function AuthenticationCheck(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
      //action호출
      dispatch(auth()).then((res) => {
        console.log(res);

        //로그인 하지 않은 상태
        if (!res.payload.isAuth) {
          if (option) {
            alert("로그인을 먼저 해주세요");
            navigate("/login");
          }
        } else {
          //로그인 후 일반 유저가 관리자 페이지로 가려하면
          if (adminRoute && !res.payload.isAdmin) {
            alert("접근 권한이 없습니다");
            navigate("/");
          } else {
            if (option === false) {
              alert("이미 로그인된 유저입니다");
              navigate("/");
            }
          }
        }
      });
    }, []);

    //반환될 컴포넌트
    return <SpecificComponent />;
  }

  return AuthenticationCheck;
}
