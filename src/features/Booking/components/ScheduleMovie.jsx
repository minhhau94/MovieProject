import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Col, Row, Tabs, Affix, Button } from "antd";
import { getScheduleMovieCinema } from "../utils/bookService";
import moment from "moment/moment";

const ScheduleMovie = () => {
  const [listSchedule, setListSchedule] = useState([]);
  const cinemas = useSelector((state) => state.booking.cinemas);
  console.log(listSchedule);

  useEffect(() => {
    getScheduleMovieCinema(cinemas[0]?.maHeThongRap).then(
      (res) => setListSchedule(res.data.content),
      (err) => console.log(err)
    );
  }, [cinemas]);

  return (
    <div className="border border-solid border-neutral-300 container m-auto mt-16 p-5">
      <Tabs
        onChange={(key) => {
          getScheduleMovieCinema(key).then(
            (res) => setListSchedule(res.data.content),
            (err) => console.log(err)
          );
        }}
        tabPosition={"left"}
        items={cinemas.map((item) => {
          return {
            // label có thể bỏ biến hoạc thẻ vào được
            label: <img className="w-12" src={item.logo} />,
            key: item.maHeThongRap,
            children: (
              <div>
                <Tabs
                  tabPosition={"left"}
                  items={listSchedule[0]?.lstCumRap.map((itemCumRap) => {
                    return {
                      label: (
                        <div
                          key={itemCumRap.maCumRap}
                          className="w-72 text-left "
                        >
                          <p className="text-emerald-400 text-lg m-0">
                            {itemCumRap.tenCumRap.substr(0, 30) + "..."}
                          </p>
                          <span className="text-gray-400 text-sm">
                            {itemCumRap.diaChi.substr(0, 30) + "..."}
                          </span>
                        </div>
                      ),
                      key: itemCumRap.maCumRap,
                      children: (
                        <div
                          className="overflow-y-auto"
                          style={{ height: 600 }}
                        >
                          {itemCumRap?.danhSachPhim
                            .slice(0, 4)
                            .map((itemPhim) => {
                              return (
                                <div className="h-44">
                                  <Row>
                                    <Col  sm={12} md={8} lg={4}>
                                      <img
                                        alt=""
                                        className="w-28"
                                        src={itemPhim.hinhAnh}
                                      />
                                    </Col>
                                    <Col>
                                      <div>
                                        <p className="text-xl font-bold m-0 pb-4">
                                          {itemPhim.tenPhim}
                                        </p>
                                        <div className="grid grid-cols-2 gap-10">
                                          {itemPhim.lstLichChieuTheoPhim
                                            .slice(0, 4)
                                            .map((itemLichChieu) => {
                                              return (
                                                <div>
                                                  <a className="text-base text-lime-800 p-3 mr-5 bg-slate-200 rounded-md hover:text-lime-600 hover:bg-red-200">
                                                  {moment(
                                                    itemLichChieu.ngayChieuGioChieu
                                                  ).format("DD-MM-yyyy ~")}{" "}
                                                  <span className="text-red-600">
                                                    {moment(
                                                      itemLichChieu.ngayChieuGioChieu
                                                    ).format("hh:mm")}
                                                  </span>
                                                </a>
                                                </div>                                                
                                              );
                                            })}
                                        </div>
                                      </div>
                                    </Col>
                                  </Row>
                                </div>
                              );
                            })}
                        </div>
                      ),
                    };
                  })}
                />
              </div>
            ),
          };
        })}
      />
    </div>
  );
};

export default ScheduleMovie;
