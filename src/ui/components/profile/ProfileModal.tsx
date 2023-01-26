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
import { useProfileStore } from 'store/profile';
import { fetchFromBucket } from 'apis/bucketClient';

export interface ProfileProps {
  showProfileModal: boolean,
  toggleProfileModal: () => void
}

const UserProfile: React.FC<ProfileProps> = ({ showProfileModal, toggleProfileModal }) => {

  const user = useAuthUserStore((state) => state.authUser);
  const profile = useProfileStore((state) => state.profile);
  const setProfile = useProfileStore((state) => state.setProfile);
  const [present, dismiss] = useIonLoading();
  const [presentAlert] = useIonAlert();
  const [values, setValues] = useState<CustomProfile>();
  const [avatarUrl, setAvatarUrl] = useState<string>();

  useEffect(() => {
    const init = async () => {
      if (profile) {
        setValues(profile);
        if (profile.avatarPath) {
          const avatarUrl = await fetchFromBucket('avatars', profile.avatarPath).then(res=>res?.url);
          setAvatarUrl( avatarUrl );
        }
      }
    };
    init();
  }, [profile]);

  const updateProfile = async (values: CustomProfile) => {
    try {
      await present({ message: t('profile.saving') });
      const { firstName, lastName, age, avatarPath } = values;
      const updates = { first_name: firstName, last_name: lastName, age, avatar_path: avatarPath };
      const { error } = await supabase.from('profile').update(updates).eq('id', user?.id);

      if (error) {
        throw error;
      } else {
        const profile: CustomProfile = { firstName, lastName, age, avatarPath };
        setValues(profile);
        setProfile(profile);
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
          <>
          <div className='flex justify-center'>
            <div className='mt-3 mb-6 max-w-md'>
              <img className='rounded-full' alt="avatar" src={avatarUrl || 'https://place-hold.it/200x200'} />
            </div>
          </div>
            <ProfileForm
              action={updateProfile}
              values={values}
              formMethods={formMethods}
            />
          </>
        )}
      </IonContent>
    </IonModal>
  );
};

export default UserProfile;
