const express = require("express");
const path = require("path");
const app = express();

const http = require("http").createServer(app);
http.listen(8080, function () {
  console.log("listening on 8080");
});

app.use(express.static(path.join(__dirname, "react-project/build")));
app.get("/", function (요청, 응답) {
  응답.sendFile(path.join(__dirname, "react-project/build/index.html"));
});
// react router를 쓸 때는 이렇게 처리해두면 됨
app.get("*", function (요청, 응답) {
  응답.sendFile(path.join(__dirname, "react-project/build/index.html"));
});
