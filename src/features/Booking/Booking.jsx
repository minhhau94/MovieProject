import React from 'react';
import ChairList from './components/ChairList';
import Result from './components/Result';

const Booking = () => {
  return (
    <div className="container">
      <h2 className="text-center fw-bold my-5">Đặt vé xem phim Cyber-Movie</h2>
      <div className="row">
        <div className="col-8">
          <div className='bg-black text-white mb-3 text-center fs-4'>
            Screen
          </div>
          <ChairList />
        </div>
        <div className="col-4">
          <Result />
        </div>
      </div>
    </div>
  )
}

export default Booking