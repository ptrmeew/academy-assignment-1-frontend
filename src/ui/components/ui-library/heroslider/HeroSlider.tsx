import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import TaggedHeroImage from '../tagged-hero-image/TaggedHeroImage';

import styles from './hero-slider.module.css';

import type { TaggedHeroImageProps } from '../tagged-hero-image/TaggedHeroImage';
export type HeroSlide = TaggedHeroImageProps;

export type HeroSliderProps = {
  slides: HeroSlide[];
  onSlideChange?: () => void;
};

const HeroSlider: React.FC<HeroSliderProps> = ({ slides, onSlideChange }) => (
  <section>
    <Swiper
      modules={[Pagination]}
      className={styles.swiper}
      pagination={{ clickable: true }}
      spaceBetween={50}
      slidesPerView={1}
      onSlideChange={onSlideChange}
      onSwiper={onSlideChange}
    >
      {slides.map((slider, i) => (
        <SwiperSlide key={i}>
          <TaggedHeroImage imgUrl={slider.imgUrl} overlay={slider.overlay} />
        </SwiperSlide>
      ))}
    </Swiper>
  </section>
);

export default HeroSlider;
