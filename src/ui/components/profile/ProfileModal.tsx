import { IonButton, IonButtons, IonContent, IonHeader, IonModal, IonTitle, IonToolbar, useIonAlert, useIonLoading } from '@ionic/react';
import { useEffect, useState } from 'react';
import { supabase } from 'apis/supabaseClient';
import { useAuthUserStore } from 'store/user';
import { ProfileForm, fields } from './ProfileForm';
import { CustomProfile } from 'types/db-type-mappings';
import { useForm } from 'react-hook-form';
import { t } from 'i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { object } from 'yup';

export interface ProfileProps {
  showProfileModal: boolean,
  toggleProfileModal: () => void
}

const UserProfile: React.FC<ProfileProps> = ({ showProfileModal, toggleProfileModal }) => {

  const user = useAuthUserStore((state) => state.authUser);
  const [present, dismiss] = useIonLoading();
  const [presentAlert] = useIonAlert();
  const [values, setValues] = useState<CustomProfile>();

  useEffect(() => {
    const getProfile = async () => {
      console.log(user);
      if (!user) return;
      try {
        const { data, error, status } = await supabase
          .from('profile')
          .select('first_name, last_name, age')
          .eq('id', user.id)
          .single();

        if (error && status !== 406) {
          throw error;
        }

        if (data) {
          // TODO: automate mapping beetween snake and camelCase
          const { first_name: firstName, last_name: lastName, age } = data;
          setValues({ firstName, lastName, age });
        }
      } catch (error: any) {
        alert(error.message);
      };
    };
    getProfile();
  }, [user]);

  const updateProfile = async (values: CustomProfile) => {
    try {
      await present({ message: t('profile.saving') });
      const { firstName, lastName, age } = values;
      const updates = { first_name: firstName, last_name: lastName, age };
      const { error } = await supabase.from('profile').update(updates).eq('id', user?.id);

      if (error) {
        throw error;
      } else {
        setValues({ firstName, lastName, age });
      }
    } catch (error: any) {
      await presentAlert({
        header: t('profile.savingFailed'),
        message: error?.message,
        buttons: ['OK'],
      });
    } finally {
      await dismiss();
      toggleProfileModal();
    }
  };

  const validationSchema = object().shape(
    Object.keys(fields).reduce((obj, key) => {
      return Object.assign(obj, { [key]: fields[key as keyof CustomProfile].validation });
    }, {})
  );

  const formMethods = useForm<CustomProfile>({
    resolver: yupResolver(validationSchema),
    mode: 'onChange'
  });

  return (
    <IonModal
      isOpen={showProfileModal}
      onDidDismiss={() => showProfileModal ? toggleProfileModal() : ''}
    >
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={toggleProfileModal}>{t('profile.cancel')}</IonButton>
          </IonButtons>
          <IonTitle>{t('profile.edit')}</IonTitle>
          <IonButtons slot="end">
            <IonButton
              strong={true}
              onClick={formMethods?.handleSubmit(updateProfile)}
              disabled={Object.keys(formMethods?.formState.errors ?? {}).length > 0}
            >{t('profile.save')}</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding'>
          {Object.keys(values ?? {}).length > 0 && (
            <ProfileForm
              action={updateProfile}
              values={values}
              formMethods={formMethods}
            />
          )}
      </IonContent>
    </IonModal>
  );
};

export default UserProfile;
