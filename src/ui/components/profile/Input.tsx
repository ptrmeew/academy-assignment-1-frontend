import { FC } from 'react';
import { IonItem, IonLabel, IonInput, IonNote } from '@ionic/react';
import { Controller, Control } from 'react-hook-form';
import { CustomProfile } from 'types/db-type-mappings';

export interface InputProps {
  name: keyof CustomProfile;
  control?: Control<CustomProfile>;
  label?: string;
  type?: any;
}

const Input: FC<InputProps> = ({
  name,
  control,
  type,
  label
}) => {
  return (
    <>  
        <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
          <>
          <IonItem className={`${error ? 'ion-invalid' : 'ion-valid'}`}>
            {(
                <>
                    {label && (
                        <IonLabel position="floating">{label}</IonLabel>
                    )}
                    <IonInput
                        type={type ?? 'text'}
                        onIonChange={onChange} // send value to hook form
                        value={value} // return updated value
                        ref={ref} // set ref for focus management
                    />
                </>
            )}
            <IonNote className="mb-1" slot="error">{error?.message}</IonNote>
            </IonItem>
          </>
        )}
        />
    </>
  );
};

export default Input;