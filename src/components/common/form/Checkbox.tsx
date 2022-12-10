import { FormControl, FormControlLabel, Checkbox as MuiCheckbox } from '@mui/material';
import { Control, Controller, FieldValues, Path, RegisterOptions } from 'react-hook-form';

interface CheckboxProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  label?: string;
  control: Control<TFieldValues>;
  rules?: Omit<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>;
}

export const Checkbox = <TFieldValues extends FieldValues>({
  name,
  label,
  control,
  rules,
}: CheckboxProps<TFieldValues>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <FormControl>
          <FormControlLabel
            label={label}
            control={<MuiCheckbox {...field} checked={field.value ?? false} />}
          />
        </FormControl>
      )}
    />
  );
};

