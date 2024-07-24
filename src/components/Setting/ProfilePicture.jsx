import React, { useState } from "react";
import axios from "axios";
import mainImage from "../../assets/imgs/main.png";
import "./ProfilePicture.css";

const ProfilePicture = ({ onUpload, defaultImage }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(defaultImage || mainImage); // 기본 이미지를 기본 상태로 설정

  const [uploadError, setUploadError] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("profilePicture", selectedFile);

    try {
      const response = await axios.post("/api/uploadProfilePicture", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const imageUrl = response.data.url; // Adjust according to your API response
      console.log("Image URL from server:", imageUrl); // Debug log
      onUpload(imageUrl); // Notify parent component of the new profile picture URL
      setUploadError(null); // Clear any previous error
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      setUploadError("프로필 사진 업로드를 실패하였습니다.");
    }
    // alert("프로필 사진 수정이 완료되었습니다!");
  };

  // const [selectedFile, setSelectedFile] = useState(null);
  // const [preview, setPreview] = useState(null);

  // const handleFileChange = (e) => {
  //   setSelectedFile(e.target.files[0]);
  //   setPreview(URL.createObjectURL(e.target.files[0]));
  // };

  // const handleUpload = async () => {
  //   const formData = new FormData();
  //   formData.append("profilePicture", selectedFile);

  //   try {
  //     const response = await axios.post("/api/uploadProfilePicture", formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });
  //     console.log("Profile picture uploaded:", response.data);
  //   } catch (error) {
  //     console.error("Error uploading profile picture:", error);
  //   }
  // };

  return (
    <div className="ProfilePicture-mom">
      {/* <h2>프로필 사진 변경</h2> */}
      {/* preview가 설정되어 있거나 selectedFile이 있는 경우에만 preview를 사용하고, 그렇지 않으면 기본 이미지 사용 */}
      <div className="file-select-div">
        <img
          className="img-section"
          src={preview}
          alt="Preview"
          style={{
            width: "200px",
            height: "200px",
            marginBottom: "20px",
            marginTop: "10px",
          }}
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
