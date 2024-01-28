import { Routes, Route } from "react-router-dom";
import BasicTemplate from "./templates/BasicTemplate/BasicTemplate";
import Home from "./pages/UserHomePage/Home";
import CourseDetail from "./pages/CourseDetail/CourseDetail";
import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";
import CheckOut from "./pages/CheckOut/CheckOut";
import AnnounCement from "./pages/AnnounCement/AnnounCement";
import AdminTemplate from "./pages/AdminTemplate/AdminTemplate";

function App() {
  return (
    <>
      <Routes>
        <Route element={<BasicTemplate />} path="/">
          <Route element={<Home />} index></Route>
          <Route element={<SignUp />} path="/signup"></Route>
          <Route element={<Login />} path="/login"></Route>
          <Route element={<CheckOut />} path="/checkout"></Route>
          <Route element={<AnnounCement />} path="/announcement"></Route>

          <Route element={<CourseDetail />} path="/detail" />
        </Route>
        <Route element={<AdminTemplate />} path="/admin"></Route>
      </Routes>
    </>
  );
}

export default App;
