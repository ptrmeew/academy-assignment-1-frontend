import { FC } from 'react';
import { IonItem, IonLabel, IonInput, IonText } from '@ionic/react';
import { Controller, Control } from 'react-hook-form';
import { CustomProfile } from 'types/db-type-mappings';
import { UploadAvatar } from '../ui-library/upload/Upload';
import { supabase } from 'apis/supabaseClient';
import { message } from 'antd';

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
  const uploadFile = async (file: File) => {
    try {
      const filePath = file.name;
      const { error, data } = await supabase.storage.from('avatars').upload(filePath, file);

      if (error) {
        throw error;
      }
      if (data) { 
        message.success(`${data} uploaded successfully.`);
      }

    } catch (error: any) {
      if (error.statusCode === '409') {
        message.info('File already uploaded, changing avatar on save.');
      } else {
        message.error(error.message);
      }
    }
    return false;
  };

  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
          <>
            {type === 'file' ? (
              <UploadAvatar
                multiple={false}
                beforeUpload={uploadFile}
                onChange={(e) => onChange(e.file.name)}
                fileType="photo"
              />
            ) : (
              <>
              <IonItem lines="none"
                className={`border justify-center ${!error ? 'border-grey-text mb-1' : 'border-red-300'}`}>
                {label && (
                  <IonLabel position="floating">{label}</IonLabel>
                )}
                <IonInput
                  type={type ?? 'text'}
                  onIonChange={onChange} // send value to hook form
                  value={value} // return updated value
                  ref={ref} // set ref for focus management
                />
              </IonItem>
              <IonText className={`text-red-500 ${!error && 'opacity-0'}`}>{error?.message}</IonText>
            </>
            )}
          </>
        )}
      />
    </>
  );
};

export default Input;