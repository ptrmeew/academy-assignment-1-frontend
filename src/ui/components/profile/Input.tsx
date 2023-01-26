import { FC } from 'react';
import { IonItem, IonLabel, IonInput, IonText } from '@ionic/react';
import { Controller, Control } from 'react-hook-form';
import { CustomProfile } from 'types/db-type-mappings';
import { UploadFile } from '../ui-library/upload/Upload';
import { supabase } from 'apis/supabaseClient';
import { message } from 'antd';
import { object, string, number } from 'yup';

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
      
      const schema = object({
        type: string().required().test('type',
        'The only accepted formats are .jpeg, .jpg, .png', type => 
          ['image/jpg', 'image/jpeg', 'image/png'].includes(type || 'none')
        ),
        size: number().required().positive().integer().test('fileSize',
          'The file is too large',
          size => !size || size <= 1024*1024 // 1 MiB
        )
      });
      // TODO: move this validation to validation schema in ProfileForm
      // await schema.validate(file);

      const filePath = file.name;
      const { error, data } = await supabase.storage.from('avatars').upload(filePath, file);

      if (error) {
        throw error;
      }
      if (data) { 
        message.success(`${data.path} uploaded successfully.`);
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
              <UploadFile
                multiple={false}
                beforeUpload={uploadFile}
                onChange={(e) => onChange(e.file.name)}
                fileType={label ?? 'any'}
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