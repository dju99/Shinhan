import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import IDimg from "../assets/img/ID.png";
import PWimg from "../assets/img/PW.png";

/* css */
const Form = styled.form`
  position: relative;
  width: 50%;
  height: 600px;
  margin-top: 20px;
  background-color: white;
  text-align: center;
  border: 2px solid #e5e7eb;
`;

const FormTitle = styled.div`
  font-size: 35px;
  color: black;
  margin: 50px 0 50px 0;
`;

const InputBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const InputSet = styled.div`
  margin: 20px;
  width: 60%;
  height: 70px;
  background-color: #e5e7eb;
  border-radius: 10px;
`;

const Icon = styled.img`
  position: relative;
  margin-left: 10px;
  float: left;
  top: 50%;
  transform: translateY(-50%);
  height: 25px;
`;

const FormInput = styled.input`
  width: 80%;
  height: 90%;
  margin-left: 10px;
  position: relative;
  outline: none;
  float: left;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background-color: #e5e7eb;
`;

const FormButton = styled.input`
  width: 60%;
  color: white;
  padding: 10px 20px;
  border: none;
  height: 60px;
  border-radius: 4px;
  font-size: 18px;
  margin: 10px 0;
  background: #bb86fc;
  cursor: pointer;

  &:hover {
    background-color: #6d14b8;
  }
`;

const SignupBtn = styled.label`
  border: none;
  background-color: white;
  cursor: pointer;
`;

const SignupBox = styled.div`
  margin-top: 20px;
`;

/* css */

/* type */
interface AccountProps {
  id: string;
  pw: string;
}

/* type */

/* 
  required (필수 여부), 
  min (최소 값), max(최대값), 
  minLength(최소 길이), 
  maxLength(최대 길이), 
  pattern(정규 표현식), 
  validate (custom validation 함수) 
*/

function LoginBox() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors }, // formState에서 errors 가져오기
  } = useForm<AccountProps>();

  const onSubmit = async (userData: AccountProps) => {
    try {
      const response = await fetch("http://localhost:8080/userLogin", {
        method: "POST",
        body: JSON.stringify({
          id: userData.id,
          pw: userData.pw,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const data = await response.json();
        if (data) {
          localStorage.setItem("login-token", data);
          navigate("/");
        } else {
          alert("로그인 실패");
          window.location.reload();
        }
      } else {
        alert("오류 발생");
      }
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };

  const Singup = () => {
    navigate("/signup");
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormTitle>로그인</FormTitle>
      <InputBox>
        <InputSet>
          <Icon src={IDimg} />
          <FormInput
            {...register("id", {
              required: "아이디를 입력하세요.",
            })}
            placeholder="이메일"
          />
        </InputSet>
        <InputSet>
          <Icon src={PWimg} />
          <FormInput
            {...register("pw", {
              required: "비밀번호를 입력하세요.",
            })}
            placeholder="비밀번호"
            type="password"
          />
        </InputSet>
        <FormButton type="submit" value={"로그인"} />
      </InputBox>
      <SignupBox>
        <label>회원이 아니신가요?</label>
        <SignupBtn onClick={Singup}>회원가입</SignupBtn>
      </SignupBox>
    </Form>
  );
}

export default LoginBox;
