import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './Reviews.css'
import reviewsData from '../../../data/reviewsData.json';

const Reviews = () => {


  return (
    <div className='reviews-section'>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={1}
        pagination={{ clickable: true }}
        navigation
        spaceBetween={0}
        loop
        freeMode
        speed={1000}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
      >
        {reviewsData.map((item) => (
          <SwiperSlide key={item.id} className='review-item'>
            <img className='review-image'
              src={item.image}
              alt={item.name}
            />
            <div className='review-text-container'>
              <p className='review-text'>{item.text}</p>
              <span className='review-name'>- {item.name}</span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Reviews;
