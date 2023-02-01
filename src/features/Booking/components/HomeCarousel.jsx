import React from "react";
import { Carousel } from "antd";
import { useSelector } from "react-redux";

const HomeCarousel = () => {
  // lấy dự liệu trên store về
  const banners = useSelector(state => state.booking.banners);

  return (
    <div>
      <Carousel>
        {banners.map((item) => {
          return <div key={item.maBanner}>
            <img alt="" src={item.hinhAnh} className="w-full h-100 object-cover" />
          </div>
        })}
      </Carousel>
    </div>
  );
};

export default HomeCarousel;
