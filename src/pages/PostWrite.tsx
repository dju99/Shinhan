import { Root, Content } from "../assets/css/MainStructure";
import Header from "../components/Header";
import PostWriteBox from "../components/Post/PostWrite/PostWriteBox";

/* type */

/* type */

function PostWrite() {
  return (
    <Root>
      <Header />
      <Content>
        <PostWriteBox />
      </Content>
    </Root>
  );
}
export default PostWrite;
