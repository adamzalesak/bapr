import { FormControl, InputLabel, Select as MuiSelect } from '@mui/material';
import { ReactNode } from 'react';
import { Control, Controller, FieldValues, Path, RegisterOptions } from 'react-hook-form';

interface SelectProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  label?: string;
  control: Control<TFieldValues>;
  rules?: Omit<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>;
  children: ReactNode;
}

export const Select = <TFieldValues extends FieldValues>({
  name,
  label,
  control,
  rules,
  children,
}: SelectProps<TFieldValues>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <FormControl>
          <InputLabel id={name}>{label}</InputLabel>
          <MuiSelect displayEmpty {...field} value={field.value ?? ''} label={label} id={name}>
            {children}
          </MuiSelect>
        </FormControl>
      )}
    />
  );
};

