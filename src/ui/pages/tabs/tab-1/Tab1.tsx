import React, { useEffect, useState } from 'react';
import { IonContent, useIonAlert } from '@ionic/react';
import { useProfileStore } from 'store/profile';
import { fetchFromBucket } from 'apis/bucketClient';
import { supabase } from 'apis/supabaseClient';


const Tab1: React.FC = () => {

  const profile = useProfileStore((state) => state.profile);
  const [avatarUrl, setAvatarUrl] = useState<string>();
  const [location, setLocation] = useState<string>();

  const [presentAlert] = useIonAlert();


  useEffect(() => {
    const init = async () => {
      if (profile?.avatarPath) {
        const avatarUrl = await fetchFromBucket('avatars', profile.avatarPath).then(res => res?.url);
        setAvatarUrl(avatarUrl);
      }
      const { data, error } = await supabase.functions.invoke('location');
      error && await presentAlert({ header: 'Error', message: error.message, buttons: ['OK'] });
      data && setLocation(data);
    };
    init();
  }, [profile]);


  return (
    <IonContent color={'white-background'}>
      <div className='flex align-center h-full'>
        <div className='m-auto'>
          {avatarUrl && <img src={avatarUrl} alt="avatar" className="w-80 rounded" />}
          <h1 className='text-center mt-2'>Welcome {profile?.firstName} {profile?.lastName}</h1>
          <p className='text-center mb-1'>{location}</p>
        </div>
      </div>
    </IonContent>
  );
};

export default Tab1;
