const express = require("express");
const cors = require("cors");
const app = express();
const port = 8080;

// CORS 설정
app.use(
  cors({
    origin: "http://localhost:3000", // 클라이언트의 출처
    methods: ["GET", "POST", "PUT"], // 허용할 HTTP 메서드
    allowedHeaders: ["Content-Type"], // 허용할 헤더
  })
);

// JSON 본문을 파싱합니다.
app.use(express.json());

let id = 1; // Initialize id
const todolist = []; // Sample in-memory data store

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
    id: id++,
    title,
    start,
    end,
    color,
  };

  todolist.push(newTodo);

  return res.status(201).json(newTodo);
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

  return res.json(todolist[todoIndex]);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
