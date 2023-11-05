import { Root, Content } from "../assets/css/MainStructure";
import Header from "../components/Header";
import PostBox from "../components/Post/PostBox";

/* type */
interface Post {
  title: string;
  board: string;
  date: string;
  user: string;
}
/* type */
function Post() {
  return (
    <Root>
      <Header />
      <Content>
        <PostBox />
      </Content>
    </Root>
  );
}

export default Post;
