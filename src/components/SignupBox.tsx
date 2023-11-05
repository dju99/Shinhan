import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import IDimg from "../../assets/ID.png";
import PWimg from "../../assets/PW.png";
import axios from "axios";

const Form = styled.form`
  position: absolute;
  width: 500px;
  height: 700px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0 auto;
`;

const FormTitle = styled.div`
  font-size: 35px;
  font-weight: bold;
  color: black;
  margin-bottom: 20px;
`;

const InputBox = styled.div`
  width: 100%;
  height: 250px;
`;

const Icon = styled.img`
  margin-left: 10px;
  float: left;
  top: 50%;
  transform: translateY(-50%);
  height: 25px;
`;

const FormInput = styled.input`
  position: relative;
  margin: 20px 0 0 0;
  width: 430px;
  height: 50px;
  padding-left: 10px;
  outline: none;
  border-radius: 10px;
  border: 2px solid rgb(0, 0, 0, 0.1);
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1); /* 아래쪽 그림자 추가 */
`;

const NameCheckBtn = styled.button`
  position: relative;
  right: 45px;
  border: none;
  background: white;
`;

const FormButton = styled.input`
  width: 435px;
  background-color: #a653ec;
  color: white;
  padding: 10px 20px;
  border: none;
  height: 60px;
  border-radius: 10px;
  font-size: 18px;
  margin: 100px 0;

  cursor: pointer;

  &:hover {
    background-color: #6d14b8;
  }
`;

const Error = styled.p<{ isValid: boolean }>`
  margin: 10px 0;
  width: 430px;
  text-align: center;
  color: red;
  display: ${(props) => (props.isValid ? "none" : "block")};
`;

interface AccountProps {
  id: string;
  name: string;
  pw: string;
}

function SignupBox() {
  const [isNameChecked, setNameChecked] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<AccountProps>();

  const watchdId = watch("id");
  const watchdPw = watch("pw");
  const watchName = watch("name");

  useEffect(() => {
    if (watchdId) {
      const isEmailValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(watchdId);
      if (!isEmailValid) {
        setError("id", {
          type: "manual",
          message: "이메일 형식으로 입력해주세요.",
        });
      } else {
        clearErrors("id");
      }
    }

    if (watchdPw) {
      if (watchdPw.length < 6) {
        setError("pw", {
          type: "manual",
          message: "비밀번호는 최소 6자 이상이어야 합니다.",
        });
      } else {
        clearErrors("pw");
      }
    }
  }, [watchdId, watchdPw, setError, clearErrors]);

  const onNameCheck = async () => {
    try {
      const response = await axios.post("http://localhost:8080/userNameCheck", {
        name: watchName,
      });

      if (response.status === 200) {
        const data = response.data;
        if (data) {
          alert("사용 가능");
          setNameChecked(true); // 중복확인 성공 시 상태 변수 업데이트
        } else {
          alert("사용 불가");
          setNameChecked(false); // 중복확인 실패 시 상태 변수 업데이트
        }
      } else {
        alert("오류 발생");
        setNameChecked(false); // 오류 발생 시 상태 변수 업데이트
      }
    } catch (error) {
      console.error("오류 발생:", error);
      setNameChecked(false); // 오류 발생 시 상태 변수 업데이트
    }
  };

  const onSubmit = async (userData: AccountProps) => {
    if (isNameChecked) {
      // 중복확인이 완료된 경우에만 회원가입 진행
      try {
        const response = await axios.post("http://localhost:8080/userSignup", {
          id: userData.id,
          name: userData.name,
          pw: userData.pw,
        });

        if (response.status === 200) {
          const data = response.data;
          if (data) {
            alert("회원가입 완료");
            navigate("/");
          } else {
            alert("이미 가입한 이메일입니다.");
            window.location.reload();
          }
        } else {
          alert("오류 발생");
        }
      } catch (error) {
        console.error("오류 발생:", error);
      }
    } else {
      alert("중복 확인을 먼저 수행해주세요.");
    }
  };
  return (
    <div style={{ position: "relative", width: "60%", minHeight: "100vh", background: "white" }}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormTitle>회원가입</FormTitle>
        <InputBox>
          <FormInput
            {...register("id", {
              required: "아이디를 입력하세요.",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "이메일 형식으로 입력해주세요.",
              },
            })}
            placeholder="이메일"
          />
          <Error isValid={!errors.id}> {errors.id && errors.id.message} </Error>
          <FormInput
            {...register("name", {
              required: "닉네임을 입력하세요.",
            })}
            placeholder="닉네임"
          />
          <NameCheckBtn onClick={onNameCheck}>중복</NameCheckBtn>
          <FormInput
            {...register("pw", {
              required: "비밀번호를 입력하세요.",
              minLength: {
                value: 6,
                message: "비밀번호는 최소 6자 이상이어야 합니다.",
              },
            })}
            placeholder="비밀번호"
            type="password"
          />
          <Error isValid={!errors.pw}> {errors.pw && errors.pw.message} </Error>
        </InputBox>
        <FormButton type="submit" value={"회원가입"} />
      </Form>
    </div>
  );
}

export default SignupBox;

//          <div onClick={onNameCheck}>중복확인</div>
