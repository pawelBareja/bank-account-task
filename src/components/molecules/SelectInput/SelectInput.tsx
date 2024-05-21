import * as React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useFormikContext } from 'formik';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { FormInputError } from '../InputError/FormInputError';

const LIST_ITEM_HEIGHT = 47;
const NUMBER_RECORDS_VISIBLE = 5;
const MENU_TOP_OFFSET = 8;
const MENU_LIST_HEIGHT =
  NUMBER_RECORDS_VISIBLE * LIST_ITEM_HEIGHT + MENU_TOP_OFFSET;

export interface OptionItem {
  value: string;
  label: string;
}

export interface ISelectInputField {
  options: OptionItem[];
  label: string;
  name?: string;
  id?: string;
  disabled?: boolean;
  defaultValue?: string;
}

export const SelectInputField: React.FC<ISelectInputField> = ({
  options,
  label,
  name,
  id,
  disabled = false,
  defaultValue,
}) => {
  const { values, setFieldValue, errors, touched } = useFormikContext<object>();

  const isError = errors[id as keyof object];
  const value = (values[id as keyof object] as string) ?? '';

  return (
    <FormControl sx={{ minHeight: 90 }}>
      <InputLabel sx={{ background: '#fff', paddingInline: '4px' }} id={id}>
        {label}
      </InputLabel>
      <Select
        labelId={id}
        defaultValue={defaultValue}
        value={value}
        fullWidth
        onChange={(event) => setFieldValue(id!, event.target.value)}
        IconComponent={KeyboardArrowDownIcon}
        name={name}
        id={id}
        displayEmpty
        disabled={disabled}
        MenuProps={{
          PaperProps: {
            sx: {
              maxHeight: MENU_LIST_HEIGHT,
            },
          },
        }}
      >
        {options.map((option: OptionItem) => (
          <MenuItem
            key={option.value}
            value={option.value}
            sx={{ height: LIST_ITEM_HEIGHT }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {isError && touched && <FormInputError>{isError}</FormInputError>}
    </FormControl>
  );
};
