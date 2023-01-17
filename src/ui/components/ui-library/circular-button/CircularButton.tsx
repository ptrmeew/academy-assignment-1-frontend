import React from 'react';
import { IonButton, IonIcon } from '@ionic/react';
import { chevronForwardOutline } from 'ionicons/icons';
import styles from './Circular-Button.module.css';

type CircularButtonProps = {
  className?: string;
  ionInnerClassName?: string;
  ionColor?: string;
  iconIonColor?: string;
  icon?: string;
  onClick?: () => void;
  disabled?: boolean;
};

const CircularButton: React.FC<CircularButtonProps> = ({
  ionColor = 'white-background',
  iconIonColor = 'black-text',
  icon = chevronForwardOutline,
  onClick,
  className = '',
  ionInnerClassName = '',
  disabled = false,
}) => (
  <div className={className}>
    <IonButton disabled={disabled} color={ionColor} class={`${styles.button} ${ionInnerClassName}`} onClick={onClick}>
      <IonIcon color={iconIonColor} icon={icon} size="small" />
    </IonButton>
  </div>
);

export default CircularButton;
