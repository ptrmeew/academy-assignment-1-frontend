import React from 'react';
import { IonPage, IonContent } from '@ionic/react';
import ResetPasswordForm from 'ui/components/authentication/reset-password/ResetPasswordForm';

const ResetPasswordPage: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen color={'white-background'} class="h-full w-full flex justify-center items-center">
        <ResetPasswordForm />
      </IonContent>
    </IonPage>
  );
};

export default ResetPasswordPage;
