import { Grid, TextField } from '@mui/material';
import { Field, useField } from 'formik';

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
}) => {
  const [, { error, touched }] = useField(id);

  return (
    <Grid item minHeight={90}>
      <Field
        label={label}
        id={id}
        name={id}
        as={TextField}
        disabled={disabled}
        error={touched && Boolean(error)}
        helperText={touched && error}
        onKeyPress={onKeyPress}
        fullWidth
        sx={{
          '& .MuiInputLabel-root': {
            color: touched && error ? 'error' : 'inherit',
          },
          '.MuiInputBase-root': {
            width: '100%',
            minWidth: '400px',
          },
        }}
      />
    </Grid>
  );
};
