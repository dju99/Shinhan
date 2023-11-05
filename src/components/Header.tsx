import HeadterBtn from "./Button/LinkBtn";
import LogoutBtn from "./Button/LogoutBtn";
import { Root, Content } from "../assets/css/HeaderStructure";
import { useEffect, useState } from "react";
import { userAuth } from "../utils/userAuth";

function HeaderComponents() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function checkLoginStatus() {
      const loggedIn = await userAuth();
      setIsLoggedIn(loggedIn);
    }

    checkLoginStatus();
  }, []); // 빈 배열을 전달하여 componentDidMount와 유사한 동작을 하도록 설정

  return (
    <Root>
      <Content>
        <HeadterBtn url="/" title="HOME" />
        <HeadterBtn url="/market/sell" title="중고악기" />
        <HeadterBtn url="/community/free" title="커뮤니티" />
        <HeadterBtn url="/shop/search" title="매장 찾기" />
        {isLoggedIn && <HeadterBtn url="/mypage/my_post" title="마이페이지" />}
        {isLoggedIn && <LogoutBtn url="/" title="로그아웃" />}
        {!isLoggedIn && <HeadterBtn url="/login" title="로그인" />}
      </Content>
    </Root>
  );
}

export default HeaderComponents;
