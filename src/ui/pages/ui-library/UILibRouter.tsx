import { RouteComponentProps } from 'react-router';
import { IonPage, IonRouterOutlet } from '@ionic/react';
import { Route } from 'react-router-dom';
import UILibraryMenu from './UILibraryMenu';
import DiagonalCollageDemo from './DiagonalCollageDemo';
import TaggedImageDemo from './TaggedImageDemo';
import TaggedImageGalleryDemo from './TaggedImageGalleryDemo';
import TaggedHeroImageDemo from './TaggedHeroImageDemo';
import HeroSliderDemo from './HeroSliderDemo';

type ComponentRoute = {
  label: string;
  route: string;
  component: React.FC<any> | JSX.Element;
};

export enum MeewUI {
  DiagonalCollageDemo = 'diagonal-collage',
  TaggedImageDemo = 'tagged-image',
  TaggedImageGalleryDemo = 'tagged-image-gallery',
  TaggedHeroImageDemo = 'tagged-hero-image',
  HeroSliderDemo = 'hero-slider',
}

/** TO ADD COMPONENT: Name it in the above Enum, then insert an entry here :-) */
export const ComponentRoutes: ComponentRoute[] = [
  {
    label: 'Diagonal Collage',
    route: MeewUI.DiagonalCollageDemo,
    component: DiagonalCollageDemo,
  },
  {
    label: 'Tagged Image',
    route: MeewUI.TaggedImageDemo,
    component: TaggedImageDemo,
  },
  {
    label: 'Tagged Image Gallery',
    route: MeewUI.TaggedImageGalleryDemo,
    component: TaggedImageGalleryDemo,
  },
  {
    label: 'Tagged Hero Image',
    route: MeewUI.TaggedHeroImageDemo,
    component: TaggedHeroImageDemo,
  },
  {
    label: 'Hero Slider',
    route: MeewUI.HeroSliderDemo,
    component: HeroSliderDemo,
  },
];

/** This component wraps all the UI component library showcases with nice routes.*/
export const UILibRouter: React.FC<RouteComponentProps> = ({ match }) => (
  <IonPage>
    <IonRouterOutlet>
      <Route exact path={match.url} component={UILibraryMenu} />
      {ComponentRoutes.map((route) => (
        <Route key={route.route} path={`${match.url}/${route.route}`}>
          {route.component}
        </Route>
      ))}
    </IonRouterOutlet>
  </IonPage>
);
