/** We allow console log here, for example purposes. */
/* eslint-disable no-console */
import { IonPage } from '@ionic/react';

import HeroSlider from 'ui/components/ui-library/heroslider/HeroSlider';
import type { HeroSlide } from 'ui/components/ui-library/heroslider/HeroSlider';

import placeHolderOne from 'static/assets/img/placeholderone.webp';
import placeHolderTwo from 'static/assets/img/placeholdertwo.webp';

const slides: HeroSlide[] = [
  { imgUrl: placeHolderOne, overlay: true },
  { imgUrl: placeHolderTwo, overlay: true },
  { imgUrl: placeHolderOne, overlay: true },
];

const HeroSliderDemo: React.FC = () => (
  <IonPage>
    <HeroSlider slides={slides} onSlideChange={() => console.log('i am a demo')} />
  </IonPage>
);

export default HeroSliderDemo;
