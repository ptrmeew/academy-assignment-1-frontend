import { IonPage } from '@ionic/react';

import TaggedImage from 'ui/components/ui-library/tagged-image/TaggedImage';

import hthLogo from 'static/assets/img/hth-logo.svg';
import placeHolderOne from 'static/assets/img/placeholderone.webp';

const TaggedImageDemo: React.FC = () => (
  <IonPage>
    <TaggedImage imgUrl={placeHolderOne} iconUrl={hthLogo} />
  </IonPage>
);

export default TaggedImageDemo;
