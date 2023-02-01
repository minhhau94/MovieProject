import Home from "features/Booking/Home";
import MovieDetail from "features/Booking/Detail";
import Booking from "features/Booking/Booking";
import Login from "features/Login/Login";
import Signup from "features/Login/Signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "components/Header";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchProfileActipn } from "features/Login/redux/action";
import AppRoute from "app/AppRoute";

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    // dispatch async action fetch profile
    dispatch(fetchProfileActipn);
  }, []);

  return (
    <BrowserRouter>
    <Header />
      <Routes>
        {/* do check ký tự nên khi /detail vẫ hiện cả trang home và detail
        dùng thêm Switch, nhưng khi /detail chie hiện home do check dòng đầu tiên thỏa dừng lại
        có 2 cách:
        1. cho Home xuống check cuối cùng
        2. thêm exact vào Home để chéch chính xác / mới hiện Home */}
        <Route exact path='/' element={<Home />} />
        <Route path='/detail/:id' element={<MovieDetail />} />
        <Route path='/booking' element={<AppRoute component={Booking} isPrivate />} />
        <Route path='/login' element={<AppRoute component={Login} isAuth />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


