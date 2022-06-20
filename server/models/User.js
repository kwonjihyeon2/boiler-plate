//model : schema를 감싸주는 역할
//schema : 주제(유저 정보, 상품 정보)에 대한 타입을 지정해주는 것

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

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

//몽구스 메서드 - 무언가를 실행하기 전에 작성한 함수를 먼저 실행시킨다.
userSchema.pre("save", function (next) {
  var user = this;

  //유저 정보 수정일 경우에만 비밀번호 해싱 작업을 진행
  if (user.isModified("password")) {
    //bcrypt를 사용해 비밀번호를 암호화시킨다.
    //에러가 날 경우 next -> app.post 로 이동시킴
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        //다음 로직이 진행될 수 있게 next() 작성 필요 -> 아니면 이 함수에서 갇히게 됨.
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function (plainPassword, callback) {
  //클라이언트에 입력된 비밀번호 1234 <=> 암호화된 비밀번호를 비교해야함
  //입력된 비밀번호를 암호화시킨 후 비교해야함
  bcrypt.compare(plainPassword, this.password, (err, isMatch) => {
    if (err) return callback(err);
    //만약 에러가 없다면 isMatch를 전달할 것
    callback(null, isMatch);
  });
};

userSchema.methods.generateToken = function (callback) {
  var user = this;

  //json token 라이브러리 이용해서 토큰 생성하기
  var token = jwt.sign(user._id.toHexString(), "secretToken");

  user.token = token;
  user.save(function (err, user) {
    if (err) return callback(err);
    callback(null, user);
  });
};

userSchema.statics.findByToken = function (token, callback) {
  var user = this;
  console.log(user);

  //토큰 복호화 작업
  jwt.verify(token, "secretToken", function (err, decoded) {
    //유저 _id를 이용해서 유저를 찾은 뒤

    user.findOne({ _id: decoded, token: token }, function (err, user) {
      if (err) return callback(err);
      callback(null, user);
    });

    //클라이언트에서 가져온 token과 DB의 token이 일치하는 지 확인
  });
};

const User = mongoose.model("User", userSchema);

//다른 곳에서도 이 스키마를 사용할 수 있게 내보냄.
module.exports = { User };
