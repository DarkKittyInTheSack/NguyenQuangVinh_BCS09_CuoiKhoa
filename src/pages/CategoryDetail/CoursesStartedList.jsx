import React from 'react'
import { Carousel,Card,Rate } from 'antd'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import './CoursesStartedList.scss'
import { Link } from 'react-router-dom'

const SampleNextArrow = props => {
    const { className, style, onClick } = props
    return (
      <div
        className={className}
        style={{
          ...style,
          color: '#fff',
          background: '#2d2f31',
          width: '40px',
          height: '40px',
          textAlign: 'center',
          fontSize: '20px',
          lineHeight: '35px',
          borderRadius: '50%',
          marginRight: '10px',
          border: '1px solid #fff'
        }}
        onClick={onClick}
      >
        <RightOutlined />
      </div>
    )
  }
  
const SamplePrevArrow = props => {
    const { className, style, onClick } = props
    return (
      <div
        className={className}
        style={{
          ...style,
          color: '#fff',
          background: '#2d2f31',
          width: '40px',
          height: '40px',
          textAlign: 'center',
          fontSize: '20px',
          lineHeight: '35px',
          borderRadius: '50%',
          border: '1px solid #fff',
          marginLeft: '10px',
          zIndex: '2'
        }}
        onClick={onClick}
      >
        <LeftOutlined />
      </div>
    )
  }

  const SampleNextArrowResponsive = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          color: "#fff",
          background: "#2d2f31",
          width: "40px",
          height: "40px",
          textAlign: "center",
          fontSize: "20px",
          lineHeight: "35px",
          borderRadius: "50%",
          marginRight: "35px",
          border: "1px solid #fff",
        }}
        onClick={onClick}
      >
        <RightOutlined />
      </div>
    );
  };
  
  const SamplePrevArrowResponsive = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          color: "#fff",
          background: "#2d2f31",
          width: "40px",
          height: "40px",
          textAlign: "center",
          fontSize: "20px",
          lineHeight: "35px",
          borderRadius: "50%",
          border: "1px solid #fff",
          marginLeft: "30px",
          zIndex: "2",
        }}
        onClick={onClick}
      >
        <LeftOutlined />
      </div>
    );
  };

const CoursesStartedList = ({courses}) => {
    const setting = {
        autoplay: false,
        nextArrow: <SampleNextArrow/>,
        prevArrow: <SamplePrevArrow/>,
        arrows: true,
        dots:false,
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 651,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              dots: false,
              infinite: false,
              nextArrow: <SampleNextArrowResponsive />,
              prevArrow: <SamplePrevArrowResponsive />,
            },
          },
        ],
    }

  return (
    <div>
        <Carousel {...setting} className='mb-5'>
          {
            courses ? (
              courses.map((item) =>{
                const {maKhoaHoc,tenKhoaHoc, nguoiTao, luotXem, hinhAnh} = item
                return <Card cover={
                  <Link to={`/detail/${maKhoaHoc}`}>
                    <img src= {hinhAnh} className='rounded-none'/>
                  </Link>
                } className='rounded-none border-none' key={maKhoaHoc}>
                <Link to={`/detail/${maKhoaHoc}`}>
                  <h3 className='font-bold text-sm line-clamp-2 leading-4'>{tenKhoaHoc}</h3>
                </Link>
                <span className='font-normal text-xs mb-1'>{nguoiTao.hoTen}</span>
                <div className="flex items-center">
                    <p className='font-semibold text-base text-amber-900'>4.3</p>
                    <Rate allowHalf defaultValue={4.3} className='mx-1 text-sm space-x-0.5'/>
                    <span className='font-medium text-xs'>({luotXem})</span>
                </div>
                <div className="flex items-center space-x-2">
                    <span className='font-bold text-base'>₫279,000</span>
                    <span className='font-medium text-base line-through text-gray-500'>₫1,799,000</span>
                </div>
                {
                  luotXem > 100 ? (<span className='py-1 px-2 bg-yellow-200 font-bold text-sm my-2 inline-block'>Bestseller</span>) : <p></p>
                }
                
            </Card>
              })
            ) : null
          }
        </Carousel>
    </div>
  )
}

export default CoursesStartedList