import React, { useEffect, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { IonApp, IonLoading, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { supabase } from 'apis/supabaseClient';
import { Session, User } from '@supabase/supabase-js';
import { useAuthUserStore } from 'store/user';
import { useProfileStore } from 'store/profile';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Tailwind & Ant-d CSS imports */
import 'antd/dist/reset.css';
import './ui/theme/tailwind-setup.css';

/* Theme variables */
import './ui/theme/ionic-variables.css';
import './ui/theme/variables.css';
import './ui/theme/global.css';

/* _i18n */
import './_i18n/config';

/** Pages imports */
import LandingPage from './ui/pages/LandingPage';
import { UILibRouter } from './ui/pages/ui-library/UILibRouter';
import IntroPage from './ui/pages/IntroPage';
import LoginPage from './ui/pages/LoginPage';
import RegisterPage from 'ui/pages/RegisterPage';
import ForgotPasswordPage from 'ui/pages/ForgotPasswordPage';
import ResetPasswordPage from 'ui/pages/ResetPasswordPage';
import HomePage from 'ui/pages/HomePage';
import { AntdThemeWrapper } from './ui/theme/AntdThemeWrapper';
import { fetchProfile } from 'apis/profileClient';

setupIonicReact({ mode: 'ios' });

const App: React.FC = () => {
  const [session, setSession] = useState<Session | null>();
  const [loading, setLoading] = useState<boolean>(true);
  const setAuthUser = useAuthUserStore((state) => state.setAuthUser);
  const setProfile = useProfileStore((state) => state.setProfile);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange(() => updateSession());
    void setGlobalState();
    return () => data.subscription.unsubscribe();
  }, []);

  const setGlobalState = async (): Promise<void> => {
    const user = await updateSession();
    if (user) {
      const profile = await fetchProfile(user);
      profile && setProfile(profile);
    }
    setLoading(false);
  };

  const updateSession = async () => {
    const { data } = await supabase.auth.getSession();
    if (data.session) {
      setSession(data.session);
      setAuthUser(data.session.user);
      return data.session.user;
    }
  };

  if (loading) return <IonLoading isOpen />;
  return (
    <IonApp className="bg-white">
      <AntdThemeWrapper>
        <IonReactRouter>
          <Switch>
            <Route exact path="/home" component={HomePage} />
            <Route exact path="/welcome" component={LandingPage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/forgotpassword" component={ForgotPasswordPage} />
            <Route exact path="/resetpassword" component={ResetPasswordPage} />
            <Route exact path="/register" component={RegisterPage} />
            <Route exact path="/intro" component={IntroPage} />
            <Route path="/ui-library" component={UILibRouter} />
            <Route path="/*">
              <Redirect to={session ? '/home' : '/welcome'} />
            </Route>
          </Switch>
        </IonReactRouter>
      </AntdThemeWrapper>
    </IonApp>
  );
};
export default App;
