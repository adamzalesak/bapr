import { TextField as MuiTextField } from '@mui/material';
import { HTMLInputTypeAttribute } from 'react';
import { Control, Controller, FieldValues, Path, RegisterOptions } from 'react-hook-form';

interface TextFieldProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  type?: HTMLInputTypeAttribute;
  label?: string;
  control: Control<TFieldValues>;
  rules?: Omit<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>;
}

export const TextField = <TFieldValues extends FieldValues>({
  name,
  type,
  label,
  control,
  rules,
}: TextFieldProps<TFieldValues>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <MuiTextField
          {...field}
          value={field.value ?? ''}
          variant="outlined"
          id={name}
          label={label}
          type={type}
        />
      )}
    />
  );
};

