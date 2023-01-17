import { IonPage, IonList, IonItem, IonLabel, IonContent } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import { ComponentRoutes } from './UILibRouter';

const UILibraryMenu: React.FC<RouteComponentProps> = ({ match }) => (
  <IonPage>
    <IonContent>
      <IonList>
        {ComponentRoutes.map((route) => (
          <IonItem key={route.route} href={`${match.url}/${route.route}`}>
            <IonLabel>{route.label}</IonLabel>
          </IonItem>
        ))}
      </IonList>
    </IonContent>
  </IonPage>
);

export default UILibraryMenu;
