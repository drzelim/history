import React, {useEffect, useRef, useState} from 'react';
import styles from './Slider.module.scss';
import MainStore from "../../store/main-store";
import {observer} from "mobx-react-lite";
import {IHistoricalEvent} from "../../api/interfaces";

import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation, Pagination} from 'swiper/modules';

import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

import './swiper-custom.scss';
import PointCategoryName from "../Circle/PointCategoryName";
import {getCN} from "../../utils/utils";

const sliderBreakpoints = {
  200: {
    slidesPerView: 1.5,
    spaceBetween: 25,
    navigation: false
  },
  640: {
    slidesPerView: 2,
    spaceBetween: 25
  },
  768: {
    slidesPerView: 3,
    spaceBetween: 25
  }
};


const Slider = observer(() => {
  const {historicalEvents, activeSlider} = MainStore;
  const sliderRef = useRef<HTMLElement | null>(null);
  const [currentInfo, setCurrentInfo] = useState<IHistoricalEvent[]>([]);

  useEffect(() => {
    if (historicalEvents.length) {
      sliderRef.current?.classList.add(styles['slider--hide']);

      setTimeout(() => {
        setCurrentInfo(historicalEvents[activeSlider - 1].events);
        sliderRef.current?.classList.remove(styles['slider--hide']);
      }, 750);
    }

  }, [activeSlider, historicalEvents]);


  return (
    <>
      <div className={getCN(styles['category-name'], 'desktop-hidden')}>
        <PointCategoryName/>
      </div>
      <section className={styles['slider']} ref={sliderRef}>

        <button className={'swiper-button-prev'}></button>
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={10}
          slidesPerView={3}
          navigation={{
            disabledClass: 'hidden',
            prevEl: '.swiper-button-prev',
            nextEl: '.swiper-button-next'
          }}
          pagination={{
            clickable: true,

          }}
          breakpoints={sliderBreakpoints}
          className={'my-swiper'}
        >
          {
            currentInfo.map((slide) => (
              <SwiperSlide key={slide.year}>
                <div className={styles['slide']}>
                  <div className={styles['slide__year']}>{slide.year}</div>
                  <div className={styles['slide__text']}>{slide.description}</div>
                </div>
              </SwiperSlide>
            ))
          }
        </Swiper>
        <button className={'swiper-button-next'}></button>
      </section>
    </>
  );
});

export default Slider;
