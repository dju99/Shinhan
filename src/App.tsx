import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Market from "./pages/Market";
import Store from "./pages/Store";
import PostWrite from "./pages/PostWrite";
import Post from "./pages/Post";
import MyPage from "./pages/Mypage";
import Coummunity from "./pages/Community";
import ShopSearch from "./pages/ShopSearch";
import Test from "./pages/text";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/market/:board" element={<Market />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/store/:name" element={<Store />} />
        <Route path="/post/:board/:postNum" element={<Post />} />
        <Route path="/post/write" element={<PostWrite />} />
        <Route path="/mypage/:post" element={<MyPage />} />
        <Route path="/community/:board" element={<Coummunity />} />
        <Route path="/shop/search" element={<ShopSearch />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
