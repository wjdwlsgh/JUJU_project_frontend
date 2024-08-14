import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import "./Article.css";

// const posts = [
//   {
//     id: 1,
//     title: "Post 1",
//     date: "2024-08-01",
//     imageUrl: "https://via.placeholder.com/100",
//   },
//   {
//     id: 2,
//     title: "Post 2",
//     date: "2024-08-02",
//     imageUrl: "https://via.placeholder.com/100",
//   },
//   {
//     id: 3,
//     title: "Post 3",
//     date: "2024-08-03",
//     imageUrl: "https://via.placeholder.com/100",
//   },
//   {
//     id: 4,
//     title: "Post 4",
//     date: "2024-08-04",
//     imageUrl: "https://via.placeholder.com/100",
//   },
//   {
//     id: 5,
//     title: "Post 5",
//     date: "2024-08-05",
//     imageUrl: "https://via.placeholder.com/100",
//   },
//   {
//     id: 6,
//     title: "Post 6",
//     date: "2024-08-06",
//     imageUrl: "https://via.placeholder.com/100",
//   },
//   {
//     id: 7,
//     title: "Post 7",
//     date: "2024-08-07",
//     imageUrl: "https://via.placeholder.com/100",
//   },
// ];

const ITEMS_PER_PAGE = 5; // Maximum number of posts per page

const Article = () => {
  const navigate = useNavigate(); // `useNavigate` hook should be inside the component
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Retrieve diary entries from localStorage
    const savedEntries = JSON.parse(localStorage.getItem("diaryEntries")) || [];
    setPosts(savedEntries);
  }, []);

  // Filter posts based on the search query
  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.date.includes(searchQuery)
  );

  const pageCount = Math.ceil(filteredPosts.length / ITEMS_PER_PAGE);
  const offset = currentPage * ITEMS_PER_PAGE;
  const currentPosts = filteredPosts.slice(offset, offset + ITEMS_PER_PAGE);

  // Reset the page to 0 whenever the search query changes
  useEffect(() => {
    setCurrentPage(0);
  }, [searchQuery]);

  // Handle page click
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  // Navigation handlers
  const goToDiary = () => {
    navigate("/api/Diary");
  };

  const goToHome = () => {
    navigate("/api/main");
  };

  return (
    <div className="bulletin-board">
      <aside className="sidebar">
        <button onClick={goToHome}>홈으로</button>
        <button onClick={goToDiary}>글쓰기</button>
      </aside>
      <div className="content">
        <h1>나의 글</h1>
        <input
          type="text"
          placeholder="제목 또는 날짜를 검색하세요"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <p>Total Post: {filteredPosts.length}개</p>

        {filteredPosts.length === 0 ? (
          <div className="no-posts">게시물 없음</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>No.</th>
                <th>Post</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {currentPosts.map((post, index) => (
                <tr key={post.id}>
                  <td>{offset + index + 1}</td>
                  <td>
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      style={{ width: "50px", marginRight: "10px" }}
                    />
                    {post.title}
                  </td>
                  <td>{post.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <ReactPaginate
          previousLabel="⬅️"
          nextLabel="➡️"
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      </div>
    </div>
  );
};

export default Article;
