import { Root, Content } from "../assets/css/MainStructure";
import LoginBox from "../components/LoginBox";
import Header from "../components/Header";

function Login() {
  return (
    <Root>
      <Header />
      <Content>
        <LoginBox />
      </Content>
    </Root>
  );
}

export default Login;
