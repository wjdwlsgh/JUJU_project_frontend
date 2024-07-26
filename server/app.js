const express = require("express");
const cors = require("cors");
const app = express();
const port = 8080;

// CORS 설정
app.use(
  cors({
    origin: "*", // 모든 출처 허용, 배포 시에는 필요한 출처만 허용하도록 설정
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

// JSON 본문을 파싱합니다.
app.use(express.json());

// 메모리 내 데이터 저장소 및 ID 관리
let idCounter = 1;
const todolist = [];

// 기본 경로 처리
app.get("/", (req, res) => {
  res.send("Hello, this is the backend server for the ToDo app!");
});

// GET /api/todo 라우트
app.get("/api/todo", (req, res) => {
  res.json(todolist);
});

// POST /api/todo 라우트
app.post("/api/todo", (req, res) => {
  const { title, start, end, color } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  const newTodo = {
    id: idCounter++,
    title,
    start,
    end,
    color,
  };

  todolist.push(newTodo);
  res.status(201).json(newTodo);
});

// PUT /api/todo/:id 라우트 (이벤트 업데이트)
app.put("/api/todo/:id", (req, res) => {
  const { id } = req.params;
  const { title, start, end, color } = req.body;

  const todoIndex = todolist.findIndex((todo) => todo.id === parseInt(id));
  if (todoIndex === -1) {
    return res.status(404).json({ error: "Todo not found" });
  }

  if (title !== undefined) {
    todolist[todoIndex].title = title;
  }
  if (start !== undefined) {
    todolist[todoIndex].start = start;
  }
  if (end !== undefined) {
    todolist[todoIndex].end = end;
  }
  if (color !== undefined) {
    todolist[todoIndex].color = color;
  }

  res.json(todolist[todoIndex]);
});

// DELETE /api/todo/:id 라우트 (이벤트 삭제)
app.delete("/api/todo/:id", (req, res) => {
  const { id } = req.params;
  const todoIndex = todolist.findIndex((todo) => todo.id === parseInt(id));

  if (todoIndex === -1) {
    return res.status(404).json({ error: "Todo not found" });
  }

  todolist.splice(todoIndex, 1);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
