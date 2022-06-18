//모듈 불러오기
const express = require("express");
//함수 선언
const app = express();
//백엔드 포트설정
const port = 8080;

//클라이언트에서 오는 정보를 분석하는데 사용
const bodyParser = require("body-parser");

const config = require("./config/key");
const { User } = require("./models/User");

//application/x-www-form-urlencoded 파일을 분석하기 위함
app.use(bodyParser.urlencoded({ extended: true }));
//application/json 파일을 분석하기 위함
app.use(bodyParser.json());

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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
