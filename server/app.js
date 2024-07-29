const express = require("express");
const cors = require("cors");
const app = express();
const port = 8080;
const nodemailer = require("nodemailer");

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());

let idCounter = 1;
const todolist = [];
const users = [];
const emailVerificationCodes = {};

app.get("/", (req, res) => {
  res.send("Hello, this is the backend server for the ToDo app!");
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "jujucompany123@gmail.com", // 발신자 이메일
    pass: "sbrh uhel fjvk lzqm", // 생성한 앱 비밀번호
  },
});

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
    from: "jujucompany123@gmail.com",
    to: email,
    subject: "이메일 인증 코드",
    text: `인증 코드는 ${verificationCode} 입니다.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("이메일 전송 실패:", error);
      return res.status(500).json({ message: "이메일 전송 실패", error });
    }
    res.status(200).json({ message: "인증 코드가 이메일로 전송되었습니다." });
  });
});

// 이메일 인증 코드 확인 라우트
app.post("/api/verify-email-code", (req, res) => {
  const { email, code } = req.body;
  console.log(`Received request to verify code for email: ${email}`);

  const savedCode = emailVerificationCodes[email];

  if (savedCode && savedCode === code) {
    console.log(`Verification code matched for email: ${email}`);
    delete emailVerificationCodes[email];
    res.status(200).json({ message: "이메일 인증 완료", verified: true });
  } else {
    console.log(`Verification code did not match for email: ${email}`);
    res
      .status(400)
      .json({ message: "인증 코드가 유효하지 않습니다.", verified: false });
  }
});

app.post("/api/register", (req, res) => {
  console.log("회원가입 요청 데이터:", req.body);
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

app.get("/api/todo", (req, res) => {
  res.json(todolist);
});

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
