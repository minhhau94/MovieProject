import { Col, Row, Card, Button, Pagination } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchMoviesAction } from '../redux/action';

const MovieList = () => {
  const movies = useSelector(state => state.booking.movies);
  const dispatch = useDispatch()

  return (
    <div className='container mx-auto'>
      <h1 className='text-center text-5xl font-normal'>Danh sách phim</h1>
      <Row gutter={30}>
        {movies.items?.map((item) => (
          <Col key={item.maPhim} className="mb-7" xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              style={{
                width: "100%",
                height: "100%",
              }}
              cover={<img className='h-72 object-cover object-left-top' alt="example" src={item.hinhAnh} />}
            >
              <h1 className='text-2xl my-2 font-semibold h-20'>{item.tenPhim}</h1>
              <p className='text-xl my-2 h-36'>{item.moTa.substr(0, 50) + "..."}</p>
              <Link to={`/detail/${item.maPhim}`}>
                <Button type='primary' size='large'>Đặt vé</Button>
              </Link>
            </Card>
          </Col>)
        )}
      </Row>
      {movies.items && (
        <Pagination
          defaultCurrent={movies.curentPage}
          total={movies.totalCount}
          // số lượng item trên 1 trang
          pageSize={8}
          // page là số trang
          onChange={(page) => {
            dispatch(fetchMoviesAction(page))
          }} />
      )}
    </div>
  )
}

export default MovieList