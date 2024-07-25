const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let id = 2;
const todolist = [
  {
    id: 1,
    text: "할일 1",
    done: false,
  },
];

// GET /api/todo 라우트
app.get("/api/todo", (req, res) => {
  res.json(todolist);
});

// POST /api/todo 라우트
app.post("/api/todo", (req, res) => {
  const { text, done = false } = req.body; // 기본값 설정

  if (!text) {
    return res.status(400).json({ error: "Text is required" }); // 에러 처리
  }

  const newTodo = {
    id: id++,
    text,
    done,
  };

  todolist.push(newTodo);

  return res.status(201).json(newTodo); // 상태 코드와 함께 응답
});

// 서버 시작
app.listen(4000, () => {
  console.log("server start!!");
});
