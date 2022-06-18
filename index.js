//모듈 불러오기
const express = require("express");
//함수 선언
const app = express();
//백엔드 포트설정
const port = 8080;

//몽구스로 어플과 몽고 DB연결
const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://kwonjihyeon:wlgusgg701!@boilerplate.55bafcp.mongodb.net/?retryWrites=true&w=majority",
    {
      //여러 에러 방지
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.log("error occured", err));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
