//model : schema를 감싸주는 역할
//schema : 주제(유저 정보, 상품 정보)에 대한 타입을 지정해주는 것

const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true, // 유저가 입력한 빈 공간(space) 자동 제거
    unique: 1, // 중복 불가
  },
  password: {
    type: String,
    minlength: 5,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    //유저 권한 설정 : 관리자, 일반 회원
    type: Number,
    dafault: 0,
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

const User = mongoose.model("User", userSchema);

//다른 곳에서도 이 스키마를 사용할 수 있게 내보냄.
module.exports = { User };
