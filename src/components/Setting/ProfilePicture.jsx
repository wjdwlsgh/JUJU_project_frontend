import React, { useState } from "react";
import axios from "axios";
import mainImage from "../../assets/imgs/main.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ProfilePicture.css";

const ProfilePicture = ({ onUpload, defaultImage }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(defaultImage || mainImage);
  const [uploadError, setUploadError] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      setUploadError("파일을 선택하지 않았습니다.");
      return;
    }
    if (!file.type.startsWith("image/")) {
      setUploadError("이미지 파일만 업로드할 수 있습니다.");
      return;
    }
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
    setUploadError(null);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("profilePicture", selectedFile);
    formData.append("email", localStorage.getItem("userEmail"));

    try {
      const response = await axios.post(
        "http://localhost:8080/api/uploadProfilePicture",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const imageUrl = response.data.profileImgPath;
      const fullImageUrl = `http://localhost:8080${imageUrl}`;
      onUpload(fullImageUrl);
      localStorage.setItem("userProfilePicture", imageUrl);
      setUploadError(null);
      toast.success("프로필 사진이 성공적으로 업로드되었습니다.");
    } catch (error) {
      console.error("프로필 사진 업로드 오류:", error);
      setUploadError("프로필 사진 업로드를 실패하였습니다.");
      toast.error("프로필 사진 업로드를 실패하였습니다.");
    }
  };

  return (
    <div className="ProfilePicture-mom">
      <div className="file-select-div">
        <img
          className="img-section"
          src={preview}
          alt="Preview"
          // style={{
          //   width: "200px",
          //   height: "200px",
          //   marginBottom: "20px",
          //   marginTop: "10px",
          // }}
        />
        <input
          id="file-upload-button"
          type="file"
          onChange={handleFileChange}
        />
      </div>

      <div className="upload-div">
        {uploadError && <p style={{ color: "red" }}>{uploadError}</p>}
        <button id="upload-button" onClick={handleUpload}>
          업로드
        </button>
      </div>
    </div>
  );
};

export default ProfilePicture;
