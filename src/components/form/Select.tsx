import { Select as MuiSelect } from '@mui/material';
import { ReactNode } from 'react';
import { Control, Controller, FieldValues, Path, RegisterOptions } from 'react-hook-form';

interface SelectProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  rules?: Omit<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>;
  children: ReactNode;
}

export const Select = <TFieldValues extends FieldValues>({
  name,
  control,
  rules,
  children,
}: SelectProps<TFieldValues>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => <MuiSelect {...field}>{children}</MuiSelect>}
    />
  );
};

