//모듈 불러오기
const express = require("express");
//함수 선언
const app = express();
//백엔드 포트설정
const port = 8080;

//클라이언트에서 오는 정보를 분석하는데 사용
const bodyParser = require("body-parser");
//토큰 저장소를 위한 라이브러리
const cookieParser = require("cookie-parser");
const config = require("./config/key");
const { User } = require("./models/User");

//application/x-www-form-urlencoded 파일을 분석하기 위함
app.use(bodyParser.urlencoded({ extended: true }));
//application/json 파일을 분석하기 위함
app.use(bodyParser.json());
//쿠키에 저장하기 위해 사용한다고 선언
app.use(cookieParser());

//몽구스로 어플과 몽고 DB연결
const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI, {
    //여러 에러 방지
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.log("error occured", err));

app.get("/", (req, res) => {
  res.send("Hello World! 바로 적용되는 지 확인합니다 - nodemon - 확인완료!");
});

app.post("/register", (req, res) => {
  //client에서 입력한 정보를 DB에 저장하기 위함
  const user = new User(req.body);

  //mongoDB 클라이언트에서 오는 정보 저장 메서드
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

app.post("/login", (req, res) => {
  //1. 넘어온 정보가 DB에 저장된 회원 정보에 있는지 확인
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "일치하는 유저가 없습니다",
      });
    }

    //2. DB의 비밀번호와 동일한 지 확인
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다.",
        });
      }

      //3. 확인된 회원에 대한 token을 생성
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        //토큰 저장소 설정
        res
          .cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id });
      });
    });
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
