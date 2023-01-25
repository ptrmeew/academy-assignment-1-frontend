import { UseFormReturn } from 'react-hook-form';
import Input, { InputProps } from './Input';
import { string, number } from 'yup';
import { useEffect } from 'react';
import { CustomProfile } from 'types/db-type-mappings';


type profileKeys = keyof CustomProfile;

type Fields = {
  [key in profileKeys]: {
    input: { name: profileKeys; type?: string; label?: string; };
    validation: any;
  };
};

interface FormProps {
  action: (values: CustomProfile) => void,
  formMethods: UseFormReturn<CustomProfile>,
  values?: CustomProfile
}

export const fields: Fields = {
  firstName: {
    input: { name: 'firstName', label: 'First name' },
    validation: string().required().min(2).max(32)
  },
  lastName: {
    input: { name: 'lastName', label: 'Last name' },
    validation: string().required().min(2).max(32)
  },
  age: {
    input: { name: 'age', label: 'Age', type: 'number' },
    validation: number().required().min(18).max(200)
  },
  avatarPath: {
    input: {
      name: 'avatarPath',
      type: 'file',
    },
    validation: undefined
  },
};

export const ProfileForm: React.FC<FormProps> = ({ action, values, formMethods }) => {

  useEffect(() => {
    if (values) {
      // wait 1 ms with reset to fix floating labels (TODO: refactor)
      setTimeout(() => formMethods.reset(values), 1);
    }
  }, [values, formMethods]);

  const formFields: InputProps[] = Object.keys(fields).map((field => fields[field as profileKeys].input));

  return (
    <>
      <form onSubmit={formMethods.handleSubmit(action)}>
        {formFields.map((field, index) => (
          <Input {...field} control={formMethods.control} key={index} />
        ))}
      </form>
    </>
  );
};
