import { IonPage } from '@ionic/react';

import DiagonalCollage from 'ui/components/ui-library/diagonal-collage/DiagonalCollage';
import type { CollageImageProps } from 'ui/components/ui-library/diagonal-collage/DiagonalCollage';

import placeHolderOne from 'static/assets/img/placeholderone.webp';
import placeHolderTwo from 'static/assets/img/placeholdertwo.webp';

const images: CollageImageProps = {
  topLeftUrl: placeHolderOne,
  centerUrl: placeHolderTwo,
  bottomRightUrl: placeHolderOne,
  iconUrl: placeHolderOne,
  collageText: 'Få 500kr i rabat eller undersøg dine personlige rabatkuponer',
};

const DiagonalCollageDemo: React.FC = () => (
  <IonPage>
    <DiagonalCollage
      topLeftUrl={images.topLeftUrl}
      centerUrl={images.centerUrl}
      bottomRightUrl={images.bottomRightUrl}
      iconUrl={images.iconUrl}
      collageText={images.collageText}
    />
  </IonPage>
);

export default DiagonalCollageDemo;
