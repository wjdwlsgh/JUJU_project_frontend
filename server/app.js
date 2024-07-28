const express = require("express");
const cors = require("cors");
const app = express();
const port = 8080;
const nodemailer = require("nodemailer");

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
const users = [];
const emailVerificationCodes = {}; // 이메일 인증 코드를 저장하는 객체

// Nodemailer 설정 (이 설정은 실제 메일 전송을 위해 구성되어야 합니다)
const transporter = nodemailer.createTransport({
  service: "gmail", // 예: 'gmail'
  auth: {
    user: "jujucompany123@gmail.com", // 발신자 이메일
    pass: "abc123abc!@#", // 발신자 이메일 비밀번호
  },
});

// 기본 경로 처리
app.get("/", (req, res) => {
  res.send("Hello, this is the backend server for the ToDo app!");
});

// 이메일 인증 코드 전송 라우트
app.post("/api/send-email-verification", (req, res) => {
  const { email } = req.body;
  const existingUser = users.find((u) => u.email === email);

  if (existingUser) {
    return res.status(400).json({ message: "이미 가입된 이메일입니다." });
  }

  const verificationCode = Math.floor(
    100000 + Math.random() * 900000
  ).toString();
  emailVerificationCodes[email] = verificationCode;

  const mailOptions = {
    from: "jujucompany@gmail.com",
    to: email,
    subject: "이메일 인증 코드",
    text: `인증 코드는 ${verificationCode} 입니다.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ message: "이메일 전송 실패", error });
    }
    res.status(200).json({ message: "인증 코드가 이메일로 전송되었습니다." });
  });
});

// 이메일 인증 코드 확인 라우트
app.post("/api/verify-email-code", (req, res) => {
  const { email, code } = req.body;
  const savedCode = emailVerificationCodes[email];

  if (savedCode && savedCode === code) {
    delete emailVerificationCodes[email];
    res.status(200).json({ message: "이메일 인증 완료", verified: true });
  } else {
    res
      .status(400)
      .json({ message: "인증 코드가 유효하지 않습니다.", verified: false });
  }
});

app.get("/api/verify-email-code", (req, res) => {
  res.json(emailVerificationCodes);
});

// 회원가입 라우트
app.post("/api/register", (req, res) => {
  console.log("회원가입 요청 데이터:", req.body); // 디버깅을 위한 로그
  const { fullName, nickname, email, password1, password2, birthDate } =
    req.body;

  if (
    !fullName ||
    !nickname ||
    !email ||
    !password1 ||
    !password2 ||
    !birthDate
  ) {
    return res.status(400).json({ message: "모든 필드를 입력해야 합니다." });
  }

  if (password1 !== password2) {
    return res.status(400).json({ message: "비밀번호가 일치하지 않습니다." });
  }

  const existingUser = users.find((u) => u.email === email);
  if (existingUser) {
    return res.status(400).json({ message: "이미 사용중인 이메일입니다." });
  }

  const newUser = {
    fullName,
    nickname,
    email,
    password: password1,
    birthDate,
  };

  users.push(newUser);
  res.status(201).json({ message: "회원가입 성공", user: newUser });
});

// 로그인 라우트
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) {
    return res
      .status(401)
      .json({ message: "이메일 또는 비밀번호가 올바르지 않습니다." });
  }

  res.json({ message: "로그인 성공", user });
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
