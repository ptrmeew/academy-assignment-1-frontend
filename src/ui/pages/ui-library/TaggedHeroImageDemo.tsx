import { IonPage } from '@ionic/react';
import TaggedHeroImage from 'ui/components/ui-library/tagged-hero-image/TaggedHeroImage';
import placeHolderOne from 'static/assets/img/placeholderone.webp';

const TaggedHeroImageDemo: React.FC = () => (
  <IonPage>
    <TaggedHeroImage imgUrl={placeHolderOne} overlay={true} />{' '}
  </IonPage>
);

export default TaggedHeroImageDemo;
