const express = require("express");
const cors = require("cors");

let todos = [
  { id: 1, text: "할일1", done: false },
  { id: 2, text: "할일2", done: true },
];

// 1. express 서버 생성
const app = express(); // express 애플리케이션을 생성한다.

// 2. cors 설정
app.use(
  cors({
    origin: "http://127.0.0.1:5501",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

// 3. body-parser 설정
app.use(express.json()); // 따로 parsing을 하지 않아도 JSON 형식의 요청 본문을 자동으로 파싱한다.
app.use(express.text()); // text/plain 형식의 요청 본문을 자동으로 파싱한다.

// 4. preflight 요청을 처리: method(endpoint, callback)형식
app.options("/", (req, res) => {
  return res.send("요청 보내세요");
});

app.get("/", (req, res) => {
  console.log(req.query);
  return res.json(todos); // todos 배열을 JSON 형식으로 응답한다.
});

app.post("/", (req, res) => {
  todos = [...todos, req.body]; // 수신한 데이터를 todos 배열에 추가한다.
  return res.send("등록되었습니다."); // 클라이언트에게 응답한다.
});

app.put("/", (req, res) => {
  todos = todos.map((el) => {
    if (el.id === req.body.id) {
      return { ...el, text: req.body.text }; // id가 일치하는 todo의 text를 업데이트한다.
    }
    return el; // 일치하지 않는 todo는 그대로 반환한다.
  });
  return res.send("수정되었습니다.");
});

app.delete("/", (req, res) => {
  todos = todos.filter((el) => el.id !== req.body.id); // id가 일치하지 않는 todo만 남긴다.
  return res.send("삭제되었습니다!");
});

app.listen(3000, () => {
  console.log("서버가 열렸어요! http://localhost:3000");
});

// 실행: node server.js
