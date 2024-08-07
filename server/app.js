import React, { useState } from "react";
import "./Find.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Find() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    birthDate: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/forgot-password",
        formData
      );
      if (response.data.success) {
        alert("임시 비밀번호가 이메일로 전송되었습니다.");
      } else {
        alert(response.data.message || "오류가 발생했습니다.");
      }
    } catch (error) {
      alert("오류가 발생했습니다.");
      console.error(
        "서버 응답 오류:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="find-wrapper">
      <div className="Findtt">
        <div className="Accounttt2">
          <button className="Find_button" onClick={() => navigate("/")}>
            JUJU__Calendar_
          </button>
        </div>
        <div className="Findtt3">
          # 하 이 # juju # 코 린 이 들 # 쌈 @ 뽕 # 🐧 🐹 🐶 🐿️ 🐤
        </div>
      </div>
      <div className="find-form-mom">
        <form method="post" id="find-form" onSubmit={handleSubmit}>
          <h2 id="Find_Title">Find Password🔐</h2>
          <div className="Find_text1">
            <label htmlFor="fullName" className="find_text_title">
              이름
            </label>
            <input
              type="text"
              placeholder="Name"
              id="fullName"
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>
          <div className="Find_text2">
            <label htmlFor="email" className="find_text_title">
              이메일
            </label>
            <input
              type="email"
              placeholder="test@email.com"
              id="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="Find_text3">
            <label htmlFor="birthDate" className="find_text_title">
              생년월일
            </label>
            <input
              type="date"
              id="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
            />
          </div>
          <div className="Find_text4">
            <input type="submit" value="비밀번호 찾기" id="Findbutton" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Find;

const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const multer = require("multer");
const path = require("path");
require("dotenv").config(); // 환경 변수 로드

const app = express();
const port = 8080;

// CORS 설정
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());

// 사용자 목록 및 인증 코드 저장소
let idCounter = 1;
const todolist = [];
const users = [
  {
    fullName: "Test User",
    email: "test@example.com",
    birthDate: "2000-01-01",
    password: "originalPassword",
    nickname: "testnickname",
  },
];
const emailVerificationCodes = {};

// 임시 비밀번호 생성 함수
const generateTempPassword = () => {
  return Math.random().toString(36).slice(-8); // 8자리 임시 비밀번호 생성
};

// 파일 업로드 설정
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

// 프로필 사진 업로드
app.post(
  "/api/uploadProfilePicture",
  upload.single("profilePicture"),
  (req, res) => {
    if (!req.file) {
      return res.status(400).send("파일이 업로드되지 않았습니다.");
    }

    const filePath = `/uploads/${req.file.filename}`;
    res.json({ url: filePath });
  }
);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Nodemailer 설정
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // 환경 변수에서 발신자 이메일
    pass: process.env.EMAIL_PASS, // 환경 변수에서 앱 비밀번호
  },
});

// 비밀번호 찾기 요청 처리
app.post("/api/forgot-password", async (req, res) => {
  const { fullName, email, birthDate } = req.body;
  const user = users.find(
    (u) =>
      u.fullName === fullName && u.email === email && u.birthDate === birthDate
  );

  if (user) {
    const tempPassword = generateTempPassword();
    user.password = tempPassword; // 임시 비밀번호로 변경

    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "임시 비밀번호 안내",
        text: `임시 비밀번호는 ${tempPassword}입니다.`,
      });
      res.json({ success: true });
    } catch (error) {
      console.error("이메일 전송 오류:", error);
      res.json({ success: false, message: "이메일 전송 오류가 발생했습니다." });
    }
  } else {
    res.json({ success: false, message: "사용자 정보를 확인할 수 없습니다." });
  }
});

// 이메일 인증 코드 전송
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
    from: process.env.EMAIL_USER,
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

// 이메일 인증 코드 확인
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

// 회원가입 처리
app.post("/api/register", (req, res) => {
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

// 로그인 처리
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

// 할 일 목록 조회
app.get("/api/todo", (req, res) => {
  res.json(todolist);
});

// 할 일 추가
app.post("/api/todo", (req, res) => {
  const { title, start, end, color } = req.body;

  if (!title) {
    return res.status(400).json({ error: "제목이 필요합니다." });
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

// 할 일 수정
app.put("/api/todo/:id", (req, res) => {
  const { id } = req.params;
  const { title, start, end, color } = req.body;

  const todoIndex = todolist.findIndex((todo) => todo.id === parseInt(id));
  if (todoIndex === -1) {
    return res.status(404).json({ error: "할 일이 없습니다." });
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

// 할 일 삭제
app.delete("/api/todo/:id", (req, res) => {
  const { id } = req.params;
  const todoIndex = todolist.findIndex((todo) => todo.id === parseInt(id));

  if (todoIndex === -1) {
    return res.status(404).json({ error: "할 일이 없습니다." });
  }

  todolist.splice(todoIndex, 1);
  res.status(204).send();
});

// 비밀번호 변경 처리
app.post("/api/changePassword", (req, res) => {
  const { email, currentPassword, newPassword } = req.body;
  const user = users.find((u) => u.email === email);

  if (!user) {
    return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
  }

  if (user.password !== currentPassword) {
    return res
      .status(400)
      .json({ message: "현재 비밀번호가 올바르지 않습니다." });
  }

  user.password = newPassword;
  res.json({ message: "비밀번호가 성공적으로 변경되었습니다." });
});

// 닉네임 변경 처리
app.post("/api/changeNickname", (req, res) => {
  const { email, newNickname } = req.body;
  const user = users.find((u) => u.email === email);

  if (!user) {
    return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
  }

  user.nickname = newNickname;
  res.json({ message: "닉네임이 성공적으로 변경되었습니다." });
});

// 서버 시작
app.listen(port, () => {
  console.log(`서버가 http://localhost:${port}에서 실행 중입니다.`);
});
