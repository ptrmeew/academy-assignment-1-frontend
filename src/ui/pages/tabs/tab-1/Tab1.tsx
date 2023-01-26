import React, { useEffect, useState } from 'react';
import { IonContent } from '@ionic/react';
import { useProfileStore } from 'store/profile';
import { fetchFromBucket } from 'apis/bucketClient';


const Tab1: React.FC = () => {
  
  const profile = useProfileStore((state) => state.profile);
  const [avatarUrl, setAvatarUrl] = useState<string>();

  useEffect(() => {
    const init = async () => {
      if( profile?.avatarPath) {
          const avatarUrl = await fetchFromBucket('avatars', profile.avatarPath).then(res=>res?.url);
          setAvatarUrl( avatarUrl );
        }
    };
    init();
  }, [profile]);


  return (
    <IonContent color={'white-background'}>
      <div className='h-full w-auto flex align-center'>
      <div className='m-auto'>
      {avatarUrl && <img src={avatarUrl} alt="your upload" className="m-auto" />}
      <h1 className='text-center mt-2'>Welcome {profile?.firstName} {profile?.lastName}</h1>
      </div>
      </div>
    </IonContent>
  );
};

export default Tab1;
