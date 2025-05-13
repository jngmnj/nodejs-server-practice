// HTTP모듈을 이용하면 서버를 쉽게 만들 수 있다.

// 내장된 http 모듈을 가져온다.
const http = require("http");

// Todo
let todos = [
  { id: 1, text: "할일1", done: false },
  { id: 2, text: "할일2", done: true },
];

// 서버를 생성한다. req는 요청, res는 응답을 나타낸다.
const server = http.createServer((req, res) => {
  console.log(req.method + "요청이 들어왔어요!");

  res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500"); // CORS 설정: 모든 도메인에서 접근 가능하도록 설정한다.
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, OPTIONS, DELETE"
  ); // CORS 설정: 허용할 HTTP 메서드를 설정한다.

  // preflight 요청 처리
  if (req.method === "OPTIONS") {
    return res.end("요청 보내세요");
  }

  if (req.method === "GET") {
    return res.end(JSON.stringify(todos)); // todos 배열을 JSON 형식으로 응답한다.
  }

  if (req.method === "POST") {
    let data;
    req.on("data", (chunk) => {
      data = chunk; // 요청 데이터 수신
    });
    req.on("end", () => {
      console.log(data); // 수신한 데이터를 콘솔에 출력한다.
      const todo = JSON.parse(data); // 수신한 데이터를 JSON 형식으로 파싱한다.
      const newTodo = {
        id: todos.length + 1, // 새로운 todo의 id는 기존 todos 배열의 길이에 1을 더한 값으로 설정한다.
        text: todo.text, // 요청 데이터에서 text를 가져온다.
        done: false, // 새로운 todo는 기본적으로 done이 false로 설정된다.
      };
      todos = [...todos, newTodo]; // 새로운 todo를 todos 배열에 추가한다.
      res.end("추가되었습니다."); 
    });
    return;
  }

  if (req.method === "PUT") {
    let data;
    req.on("data", (chunk) => {
      data = chunk; 
    });
    req.on("end", () => {
      console.log(data); // 수신한 데이터를 콘솔에 출력한다.
      const todo = JSON.parse(data); // 수신한 데이터를 JSON 형식으로 파싱한다.
      todos = todos.map((el) => {
        if (el.id === todo.id) {
          return { ...el, text: todo.text }; // id가 일치하는 todo의 text를 업데이트한다.
        }
        return el; // 일치하지 않는 todo는 그대로 반환한다.
      });
      res.end("수정되었습니다."); 
    });
    return;
  }

  if (req.method === "DELETE") {
    let data;
    req.on("data", (chunk) => {
      data = chunk; 
    });
    req.on("end", () => {
      console.log(data); // 수신한 데이터를 콘솔에 출력한다.
      const todo = JSON.parse(data); // 수신한 데이터를 JSON 형식으로 파싱한다.
      todos = todos.filter((el) => el.id !== todo.id); // id가 일치하지 않는 todo만 남긴다.
      res.end("삭제되었습니다!"); 
    });
    return;
  }
  return res.end("end!"); // 클라이언트에게 응답을 보낸다.
});

// 서버를 3000번 포트에서 실행한다.
server.listen(3000, () => {
  // 서버가 실행되면 콘솔에 메시지를 출력한다.
  console.log("서버가 열렸어요! http://localhost:3000");
});

// 실행: node server.js
