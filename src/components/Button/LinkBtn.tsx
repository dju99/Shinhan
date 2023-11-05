import { LinkBtnStyle } from "../../assets/css/btn";

function LinkBtn({ url, title }: { url: string; title: string }) {
  return <LinkBtnStyle to={url}>{title}</LinkBtnStyle>;
}

export default LinkBtn;
