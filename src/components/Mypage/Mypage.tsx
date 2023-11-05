import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import MyPost from "./MypageBoard/my_post";
import LikePost from "./MypageBoard/like_post";

/* css */
const ProfileCard = styled.div`
  position: relative;
  margin-top: 20px;
  width: 330px;
  height: 500px;
  border: 2px solid rgb(0, 0, 0, 0.1);
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1); /* 아래쪽 그림자 추가 */
  background-color: white;
  padding: 20px;
  text-align: center; /* 가로 중앙 정렬 추가 */
`;

const ProfileImg = styled.img`
  position: relative;
  width: 150px;
  margin-top: 20px;
`;

const UserName = styled.h2`
  margin: 40px 0 30px 0;
`;

const UserEmail = styled.h4`
  margin: 20px 0 30px 0;
`;

const UserPostBox = styled.div`
  position: relative;
  float: right;
  margin-top: 20px;
  padding: 20px;
  width: 750px;
  height: 500px;
  border: 2px solid rgb(0, 0, 0, 0.1);
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1); /* 아래쪽 그림자 추가 */
  background-color: white;
`;

const UserPostMenu = styled.div`
  display: flex;
  border-bottom: 1px solid silver;
`;

const UserPost = styled.div<{ post: string }>`
  margin: 10px;
  cursor: pointer;
  font-weight: ${(props) => (props.post === "my_post" ? "bold" : "initial")};
  color: ${(props) => (props.post === "my_post" ? "#bb86fc" : "initial")};
`;

const UserLikePost = styled.div<{ post: string }>`
  margin: 10px;
  cursor: pointer;
  font-weight: ${(props) => (props.post === "like_post" ? "bold" : "initial")};
  color: ${(props) => (props.post === "like_post" ? "#bb86fc" : "initial")};
`;

const MypageBoard = styled.div``;
/* css */

// 사용자 정보의 타입을 정의
interface User {
  id: string;
  profile: string;
  password: string;
  name: string;
}

interface BuyPost {
  postNum: string;
  title: string;
  board: string;
  data: string;
  user: string;
  content: string;
}

interface SellPost {
  postNum: string;
  title: string;
  board: string;
  data: string;
  user: string;
  content: string;
}

function MySite() {
  const userToken = localStorage.getItem("login-token");
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const [userData, setUserData] = useState<User | null>(null);
  const [userBuyPostData, setBuyPostData] = useState<BuyPost[] | null>(null);
  const [userSellPostData, setSellPostData] = useState<SellPost[] | null>(null);
  const { post } = useParams<{ post: string }>();
  const postValue = post || "";

  useEffect(() => {
    const fetchData = async () => {
      if (userToken) {
        try {
          const response = await fetch("http://localhost:8080/mypage", {
            method: "POST",
            body: JSON.stringify({
              token: userToken,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });

          const data = await response.json();

          if (data) {
            setUserData(data.userdata);
            setBuyPostData(data.userBuyPostdata);
            setSellPostData(data.userSellPostdata);
            setImage(data.userdata?.profile);
          } else {
            // 서버에서 유효한 데이터를 받지 못한 경우 에러 처리
            console.error("Received invalid data from server");
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, []);

  const onChangeImage = async (e: any) => {
    try {
      const img = e.target.files[0];
      const formData = new FormData();
      formData.append("file", img);

      const config = {
        headers: {
          Authorization: userToken, // 토큰 넣어주기
          "Content-Type": "multipart/form-data", // 데이터 형식 지정
        },
      };

      const response = await axios.post("http://localhost:8080/profileupload", formData, config);
      const updatedImageUrl = `http://localhost:8080/${response.data.imageUrl.replace(/\\/g, "/")}`;
      console.log(updatedImageUrl);
      setImage(updatedImageUrl);
    } catch (error) {
      alert("error");
    }
  };

  const onUserPost = () => {
    navigate("/mypage/my_post");
    console.log(userData);
    console.log(userBuyPostData);
    console.log(userSellPostData);
    console.log(post);
  };

  const onUserLikePost = () => {
    navigate("/mypage/like_post");
    console.log(post);
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-around " }}>
        <ProfileCard>
          <ProfileImg src={image} />
          <UserName>{userData?.name}</UserName>
          <UserEmail>{userData?.id}</UserEmail>
          <input type="file" accept="image/*" onChange={onChangeImage} />
          <button>수정</button>
        </ProfileCard>
        <UserPostBox>
          <UserPostMenu>
            <UserPost post={postValue} onClick={onUserPost}>
              내 글
            </UserPost>
            <UserLikePost post={postValue} onClick={onUserLikePost}>
              관심 글
            </UserLikePost>
          </UserPostMenu>
          <MypageBoard>
            {postValue === "my_post" && <MyPost />}
            {postValue === "like_post" && <LikePost />}
          </MypageBoard>
        </UserPostBox>
      </div>
      <div style={{ display: "flex", justifyContent: "space-around " }}>
        <h1>관심 매장</h1>
      </div>
    </>
  );
}

export default MySite;
