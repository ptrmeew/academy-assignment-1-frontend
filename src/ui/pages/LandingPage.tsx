import React from 'react';
import { IonButton, IonContent, IonImg, IonPage, useIonRouter } from '@ionic/react';
import img from 'static/assets/img/meew-bg.jpg';

/**
 * Notice that the img will "underlap" under the content, to keep its proportion.
 * This is the desired behavior, because it allows for any amount of content and takes the space from the bottom of the img.
 */
const LandingPage: React.FC = () => {
  const router = useIonRouter();
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonImg src={img} class="fixed w-full h-auto" />
        <div className="fixed w-full bg-white bottom-0 p-5">
          <h3>Velkommen til MeeW Apps!</h3>
          <p className="pb-4">Din app-udviklings template til alle behov dine app-udviklings behov!</p>

          <IonButton onClick={() => router.push('/login')} expand="full" className="h-[50px]">
            Kom i gang
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LandingPage;
