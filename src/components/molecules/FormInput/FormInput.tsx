import { Grid, InputProps, TextField } from '@mui/material';
import { Field, useField } from 'formik';
import { styled } from '@mui/system';
import { CSSProperties } from 'react';
import { FormInputError } from '../InputError/FormInputError';

export interface IStyledInput extends InputProps {
  customWidth: CSSProperties;
  isError: boolean;
}
export const StyledInput = styled(TextField)<IStyledInput>(
  ({ theme, isError }) => ({
    '.MuiInputBase-root': {
      width: '100%',
      minWidth: '400px',
    },
    '.MuiInputLabel-root': {
      color: isError ? ` ${theme.palette.error} !important` : 'inherit',
    },
  })
);
export interface IFormInput {
  id: string;
  label: string;
  disabled?: boolean;
  onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const FormInput: React.FC<IFormInput> = ({
  id,
  label,
  disabled,
  onKeyPress,
  ...props
}) => {
  const [, { error, touched }] = useField(id);

  return (
    <Grid item minHeight={90}>
      <Field
        label={label}
        id={id}
        name={id}
        as={StyledInput}
        // type={type}
        disabled={disabled}
        isError={touched && error}
        // inputProps={{ maxLength: maxLength }}
        onKeyPress={onKeyPress}
        {...props}
      />
      {touched && error && <FormInputError>{error}</FormInputError>}
    </Grid>
  );
};
