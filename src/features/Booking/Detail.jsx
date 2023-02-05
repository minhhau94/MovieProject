import { Col, Row, Rate, Tag, Button, Modal, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchMovieDetailAction,
  fetchMovieDetailScheduleAction,
} from "./redux/action";
import moment from "moment/moment";
import ReactPlayer from "react-player";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const MovieDetail = () => {
  const params = useParams();
  const dispatch = useDispatch();

  // const movieDetail = useSelector(state => state.booking.movieDetail);
  const movieDetail = useSelector((state) => state.booking.movieDetailSchedule);

  console.log(movieDetail);

  useEffect(() => {
    const movieId = params.id;
    dispatch(
      // fetchMovieDetailAction(movieId),
      fetchMovieDetailScheduleAction(movieId)
    );
  }, [params]);

  // ý nghĩa thêm dấu ?
  // const demo = () => {
  //   const ten = "";

  //   if (movieDetail != null) {
  //     ten = movieDetail.tenPhim;
  //   }else{
  //     ten = "";
  //   }
  //   // viết gọn
  //   ten = movieDetail != null ? movieDetail.tenPhim : "";
  //   // viết gọn
  //   ten = movieDetail != null && movieDetail.tenPhim;
  //   // viết gọn
  //   ten = movieDetail?.tenPhim;
  // }

  const [openModal, setOpenModal] = useState(false);
  // const [stopVideo, setStopVideo] = useState(false);

  const showModal = () => {
    setOpenModal(true);
    // setStopVideo(true);
  };

  const closeModal = () => {
    setOpenModal(false);
    let iframe =
      document.getElementById("video").parentElement.children[0].children[0]
        .children[0];
    if (iframe.src !== null) {
      let iframeSrc = iframe.src;
      iframe.src = iframeSrc;
    }
  };

  /* phải convet link youtube thành embed để mở trong iframe */
  // let trailer = "";
  // trailer = movieDetail && movieDetail.trailer.replace("watch?v=", "embed/");

  return (
    movieDetail && (
      <div className="container mx-auto pt-10">
        <Row>
          <Col span={8}>
            <img className="w-full" src={movieDetail.hinhAnh} alt=""></img>
          </Col>
          <Col className="pl-10" span={16}>
            <Row>
              <Col span={12}>
                <h1 className="m-0 pt-10">{movieDetail.tenPhim}</h1>
                <table className="table-auto text-left border-spacing-2">
                  <tbody>
                    <tr>
                      {/* <th>{movieDetail.dangChieu ? <Tag>Đang chiếu</Tag> : <Tag>Sắp chiếu</Tag>}</th> */}
                      <th>
                        {movieDetail.dangChieu && (
                          <Tag color="magenta"> Đang chiếu </Tag>
                        )}
                        {movieDetail.sapChieu && (
                          <Tag color="blue"> Sắp chiếu </Tag>
                        )}
                      </th>
                    </tr>
                    <tr>
                      <td className="text-lg font-bold">
                        Ngày chiếu:{" "}
                        {moment(movieDetail.ngayKhoiChieu).format("DD.MM.yyyy")}{" "}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Button
                          className="mr-3"
                          type="primary"
                          size="large"
                          onClick={() => showModal()}
                        >
                          Trailer
                        </Button>
                        <Button type="primary" size="large">
                          Đặt vé
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p>{movieDetail.moTa}</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Col>
              <Col span={12}>
                <div className="flex flex-col items-center mt-16 ml-10">
                  <div style={{ width: 150, height: 150 }}>
                    <CircularProgressbar
                      value={movieDetail.danhGia}
                      text={`${movieDetail.danhGia}`}
                      maxValue={10}
                      styles={buildStyles({
                        textSize: "60px",
                        textColor: "#C73866",
                        pathColor: "#FE676E",
                      })}
                    />
                  </div>
                  <p>
                    <Rate value={movieDetail.danhGia} count={10} />
                  </p>
                </div>
              </Col>
            </Row>
            <Tabs
              style={{ marginTop: 40 }}
              tabPosition={"left"}
              items={movieDetail.heThongRapChieu.map((itemRap) => {
                return {
                  // label có thể bỏ biến hoạc thẻ vào được
                  label: (
                    <div style={{ width: 100 }}>
                      {" "}
                      <img
                        style={{ width: "50%" }}
                        src={itemRap.logo}
                      /> <br /> {itemRap.tenHeThongRap}{" "}
                    </div>
                  ),
                  key: itemRap.maHeThongRap,
                  children: itemRap.cumRapChieu.map((itemCumRap) => {
                    return (
                      <div>
                        <p className="text-lg font-bold text-green-500">
                          {itemCumRap.tenCumRap}
                        </p>
                        <div className="grid grid-cols-3 gap-4">
                          {itemCumRap.lichChieuPhim.map((itemLichChieu) => {
                            return (
                              <a className="text-base text-lime-800 p-3 mr-5 bg-slate-200 rounded-md hover:text-lime-600 hover:bg-red-200">
                                {moment(itemLichChieu.ngayChieuGioChieu).format(
                                  "DD-MM-yyyy ~"
                                )}{" "}
                                <span className="text-red-600">
                                  {moment(
                                    itemLichChieu.ngayChieuGioChieu
                                  ).format("hh:mm")}
                                </span>
                              </a>
                            );
                          })}
                        </div>
                      </div>
                    );
                  }),
                };
              })}
            />
          </Col>
        </Row>
        <Modal
          title={"Trailer " + `${movieDetail.tenPhim}`}
          open={openModal}
          onCancel={closeModal}
          width={800}
        >
          {/* chi nội dung modal vào */}
          {/* closure function
        1 function lông vào trong 1 function, nhưng tham số function cha phía ngoài dùng cho function lồng bên trong
        vd function (a) {
          function (b){
            a+b
          }
        } */}

          {/* phải convet link youtube thành embed để mở trong iframe */}
          {/* <iframe
          width="100%"
          height={500}
          src={trailer}
        ></iframe> */}
          <ReactPlayer
            id="video"
            controls={true}
            // playing={stopVideo}
            width="100%"
            height={500}
            url={movieDetail.trailer}
          />
        </Modal>
      </div>
    )
  );
};

export default MovieDetail;
