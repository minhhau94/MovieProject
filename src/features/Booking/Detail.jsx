import { Col, Row, Rate, Tag, Button, Modal, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchMovieDetailAction, fetchMovieDetailScheduleAction } from './redux/action';
import moment from 'moment/moment';
import ReactPlayer from "react-player";

const MovieDetail = () => {
  const params = useParams();
  const dispatch = useDispatch();

  // const movieDetail = useSelector(state => state.booking.movieDetail);
  const movieDetail = useSelector(state => state.booking.movieDetailSchedule);

  console.log(movieDetail);

  useEffect(() => {
    const movieId = params.id;
    dispatch(
      // fetchMovieDetailAction(movieId),
      fetchMovieDetailScheduleAction(movieId),
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
    let iframe = document.getElementById("video").parentElement.children[0].children[0].children[0];
    if (iframe.src !== null) {
      let iframeSrc = iframe.src;
      iframe.src = iframeSrc;
    };
  };

  /* phải convet link youtube thành embed để mở trong iframe */
  // let trailer = "";
  // trailer = movieDetail && movieDetail.trailer.replace("watch?v=", "embed/");

  return (
    movieDetail && <div className='container mx-auto pt-10'>
      <Row>
        <Col span={8}>
          <img className='w-full' src={movieDetail.hinhAnh} alt=''></img>
        </Col>
        <Col className='pl-10' span={16}>
          <h1>{movieDetail.tenPhim}</h1>
          <p>{movieDetail.moTa}</p>
          {/* ngày chiếu, đánh giá, hot, đang chiếu, sắp chiếu */}
          <table className="table-auto text-left border-spacing-2">
            <tbody>
              <tr>
                <th>Đánh giá:</th>
                <td><Rate value={movieDetail.danhGia} count={10} /></td>
              </tr>
              <tr>
                {/* <th>{movieDetail.dangChieu ? <Tag>Đang chiếu</Tag> : <Tag>Sắp chiếu</Tag>}</th> */}
                <th>
                  {movieDetail.dangChieu && <Tag color='magenta'> Đang chiếu </Tag>}
                  {movieDetail.sapChieu && <Tag color='blue'> Sắp chiếu </Tag>}
                </th>
              </tr>
              <tr>
                <th>Ngày chiếu:</th>
                <td> {moment(movieDetail.ngayKhoiChieu).format("DD/MM/yyyy")} </td>
              </tr>
              <tr>
                <td>
                  <Button className='mr-3' type='primary' size='large' onClick={() => showModal()}>Trailer</Button>
                  <Button type='primary' size='large'>Đặt vé</Button>
                </td>
              </tr>
            </tbody>
          </table>
          <Tabs
            tabPosition={"left"}
            items={movieDetail.heThongRapChieu.map(itemRap => {
              return {
                // label có thể bỏ biến hoạc thẻ vào được
                label: <> <img className='w-12' src={itemRap.logo} /> <br /> {itemRap.tenHeThongRap} </>,
                key: itemRap.maHeThongRap,
                children: itemRap.cumRapChieu.map(itemCumRap => {
                  return <div >
                    <p className='text-lg font-bold text-green-800'>{itemCumRap.tenCumRap}</p>
                    <p></p>
                    {itemCumRap.lichChieuPhim.map(itemLichChieu => {
                      return <Tag color='green' className='text-base p-1 mr-5'>
                        {moment(itemLichChieu.ngayChieuGioChieu).format("DD-MM-yyyy ~ hh:mm")}
                      </Tag>
                    })}
                  </div>
                }),
              }
            })
            }
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
    </div >
  )
}

export default MovieDetail