// import React, { useState } from "react";
// import "./todoModal.css"; // 스타일이 필요하다면 추가

// const TodoModal = ({ currentDate, todos, handleClose, addTodo }) => {
//   const [todoInput, setTodoInput] = useState("");

//   const handleTodoChange = (e) => {
//     setTodoInput(e.target.value);
//   };

//   const handleAddTodo = () => {
//     if (todoInput.trim()) {
//       addTodo(todoInput);
//       setTodoInput(""); // 입력 필드 초기화
//     }
//   };

//   return (
//     <div className="todo-modal">
//       <div className="todo-modal-content">
//         <span className="todo-close" onClick={handleClose}>
//           &times;
//         </span>
//         <h2>{currentDate}</h2>
//         <div className="todo-list">
//           <input
//             type="text"
//             value={todoInput}
//             onChange={handleTodoChange}
//             placeholder="Add new todo"
//           />
//           <button onClick={handleAddTodo}>Add</button>
//           <ul>
//             {todos.map((todo, index) => (
//               <li key={index}>{todo.text}</li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TodoModal;
