import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Tabs } from 'antd';
import { getScheduleMovieCinema } from '../utils/bookService';

const ScheduleMovie = () => {
  const [listSchedule, setListSchedule] = useState([])
  const cinemas = useSelector(state => state.booking.cinemas);
  console.log(listSchedule);
  
  useEffect(() => {
    getScheduleMovieCinema(cinemas[0]?.maHeThongRap).then(res => setListSchedule(res.data.content), err => console.log(err))
    
  }, [cinemas])

  return (
    <div>
      <Tabs
        onChange={(key) => {
          getScheduleMovieCinema(key).then(res => setListSchedule(res.data.content), err => console.log(err))
        }}
        tabPosition={"left"}
        items={cinemas.map(item => {
          return {
            // label có thể bỏ biến hoạc thẻ vào được
            label: <img className='w-12' src={item.logo} />,
            key: item.maHeThongRap,
            children: listSchedule[0]?.lstCumRap.map(itemCumRap => {
              return <div>
                <p>
                  {itemCumRap.tenCumRap}
                  <br />
                  <span>{itemCumRap.diaChi}</span>
                </p>
              </div>

            }),
          }
        })
        }
      />
    </div>
  )
}

export default ScheduleMovie
