import styled from "styled-components";
import SignupBox from "../components/SignupBox";

/* css */
const Root = styled.div`
  min-width: 100vh;
  min-height: 100vh;
  background: linear-gradient(45deg, #a653ec, white);
  background-size: 200% 200%;
  animation: gradientAnimation 10s linear infinite;

  @keyframes gradientAnimation {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

const Footer = styled.div``;
/* css */

function Signup() {
  return (
    <Root>
      <SignupBox />
    </Root>
  );
}

export default Signup;
