import React from 'react';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import { IonButton, IonIcon } from '@ionic/react';
import { person } from 'ionicons/icons';
import { t } from 'i18next';

export interface ProfileMenuProps {
  toggleProfileModal: () => void,
  handleLogOut: () => void
}

export const ProfileMenu: React.FC<ProfileMenuProps> = ({ toggleProfileModal, handleLogOut }) => {
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a onClick={toggleProfileModal}>{t('profile.edit')}</a>
      ),
    },
    {
      key: '2',
      label: (
        <a onClick={handleLogOut}>{t('authentication.signOut')}</a>
      ),
    }
  ];
  return (
    <Space direction="vertical">
      <Space wrap>
        <Dropdown menu={{ items }} placement="topRight" trigger={['click']}>
          <IonButton slot='icon-only'><IonIcon icon={person}></IonIcon></IonButton>
        </Dropdown>
      </Space>
    </Space>
  );
};