import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router';
import { IonReactRouter } from '@ionic/react-router';
import {
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonTabs,
  IonRouterOutlet,
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonToolbar,
  useIonRouter,
  IonTitle,
} from '@ionic/react';
import { cameraOutline, homeOutline } from 'ionicons/icons';

import Tab1 from './tabs/tab-1/Tab1';
import Tab2 from './tabs/tab-2/Tab2';
import { supabase } from 'apis/supabaseClient';
import { useAuthUserStore } from 'store/user';
import { ProfileMenu, ProfileMenuProps } from 'ui/components/profile/ProfileMenu';
import Profile, { ProfileProps } from '../components/profile/ProfileModal';

const HomePage: React.FC = () => {
  const router = useIonRouter();
  const authUser = useAuthUserStore((state) => state.authUser);
  const resetAuthUser = useAuthUserStore((state) => state.resetAuthUser);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const toggleProfileModal = ()=>{
    setShowProfileModal(!showProfileModal);
  };

  useEffect(() => {
    if (!authUser) router.push('/login');
  }, [router, authUser]);

  const handleLogOut = async () => {
    resetAuthUser();
    await supabase.auth.signOut();
    router.push('/login');
  };

  const menuProps: ProfileMenuProps = {
    toggleProfileModal,
    handleLogOut
  };

  const profileProps: ProfileProps = {
    toggleProfileModal,
    showProfileModal
  };

  return (
    <IonPage id="main-content">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="end">
            <ProfileMenu {...menuProps}></ProfileMenu>
          </IonButtons>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <Profile {...profileProps} />
        <IonReactRouter>
          <IonTabs>
            <IonRouterOutlet>
              {pages.map((p, i) => {
                return <Route key={i} exact path={p.path} component={p.component} />;
              })}
              <Route exact path="/home">
                <Redirect to={pages.filter((p) => p.redirect)[0].path} />
              </Route>
            </IonRouterOutlet>

            <IonTabBar slot="bottom" color={'white-background'} class={'h-[70px] border-t-[1px] border'}>
              {pages.map((p, i) => {
                return (
                  <IonTabButton key={i} tab={`tab${i}`} href={p.path}>
                    <IonIcon icon={p.icon} />
                  </IonTabButton>
                );
              })}
            </IonTabBar>
          </IonTabs>
        </IonReactRouter>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;

const pages = [
  {
    name: 'welcomeUser',
    icon: homeOutline,
    path: '/tab1',
    component: Tab1,
    redirect: true,
  },
  {
    name: 'photo',
    icon: cameraOutline,
    path: '/tab2',
    component: Tab2,
    redirect: false,
  },
];
