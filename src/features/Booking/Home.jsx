import React, { useEffect } from "react";
import HomeCarousel from "./components/HomeCarousel";
import { useDispatch } from "react-redux";
import { fetchBannersAction, fetchCinemasAction, fetchMoviesAction } from "./redux/action";
import MovieList from "./components/MovieList";
import ScheduleMovie from "./components/ScheduleMovie";


const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // set data store banner
    dispatch(fetchBannersAction);
    // set data store ds phim
    dispatch(fetchMoviesAction());
    // set data store ds hệ thống rạp
    dispatch(fetchCinemasAction);
  }, [])

  return (
    <div>
      <HomeCarousel />
      <MovieList />
      <ScheduleMovie />
    </div>
  );

  // khi load trang home , call api
  // 1. lấy ds banner
};

export default Home;