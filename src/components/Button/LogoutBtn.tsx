import { LinkBtnStyle } from "../../assets/css/btn";

function LogoutButton({ url, title }: { url: string; title: string }) {
  const handleLinkClick = () => {
    localStorage.removeItem("login-token");
    window.location.reload(); // 페이지를 새로고침
  };

  return (
    <LinkBtnStyle to={url} onClick={handleLinkClick}>
      {title}
    </LinkBtnStyle>
  );
}

export default LogoutButton;
