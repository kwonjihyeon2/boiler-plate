//인증 단계의 로직 작성
const { User } = require("../models/User");

let auth = (req, res, next) => {
  //클라이언트 쿠키에서 토큰을 받은 후
  let token = req.cookies.x_auth;

  //토큰을 복호화한 후 일치하는 유저를 찾는다
  User.findByToken(token, (err, user) => {
    //유저가 없으면 인증 불가
    if (err) throw err;
    if (!user) return res.json({ isAuth: false, error: true });

    //유저가 있으면 인증 통과
    //관련 데이터를 사용할 수 있게 하기위해 정보를 할당해줌.
    req.token = token;
    req.user = user;
    next();
  });
};

module.exports = { auth };
