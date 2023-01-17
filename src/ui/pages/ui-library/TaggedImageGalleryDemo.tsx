import { IonPage } from '@ionic/react';
import TaggedImageGallery from 'ui/components/ui-library/tagged-image-gallery/TaggedImageGallery';
import { TaggedImageProps } from 'ui/components/ui-library/tagged-image/TaggedImage';
import hthLogo from 'static/assets/img/hth-logo.svg';
import placeHolderOne from 'static/assets/img/placeholderone.webp';
import placeHolderTwo from 'static/assets/img/placeholdertwo.webp';

const images: TaggedImageProps[] = [
  { imgUrl: placeHolderOne, iconUrl: hthLogo },
  { imgUrl: placeHolderTwo, iconUrl: hthLogo },
  { imgUrl: placeHolderOne, iconUrl: hthLogo },
  { imgUrl: placeHolderTwo, iconUrl: hthLogo },
];

const TaggedImageGalleryDemo: React.FC = () => (
  <IonPage>
    <TaggedImageGallery images={images} />
  </IonPage>
);

export default TaggedImageGalleryDemo;
