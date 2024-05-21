import { Grid, Button, Typography } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { sentenceAlikeValidation } from '../../helpers/formValidation';
import { FormInput } from '../../components/molecules/FormInput/FormInput';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SelectInputField } from '../../components/molecules/SelectInput/SelectInput';
import { useCurencySymbol } from '../../api/useCurencySymbol';
import Loader from '../../components/atoms/Loader/Loader';
import { isAxiosError } from 'axios';
import ErrorBox from '../../components/atoms/ErrorBox/ErrorBox';
import { generateBankAccountNumber } from '../../helpers/generateBankAccountNumber';
import { useNavigate } from 'react-router-dom';
import { APP_URL } from '../../constants/domain.constant';
import {
  IAccount,
  useAddAccount,
  useEditAccount,
  useGetSingleAccount,
} from '../../api/useAccounts';

const validationSchema = Yup.object({
  accountName: sentenceAlikeValidation(2, 30),
  accountNumber: Yup.number().required('Field required'),
  accountCurrency: Yup.string().required('Field required'),
  accountFunds: Yup.number().required('Field required'),
});

const initialValues: IAccount = {
  accountName: '',
  accountNumber: generateBankAccountNumber(),
  accountCurrency: 'EUR',
  accountFunds: 0,
  ownerId: 1,
  id: String(generateBankAccountNumber()),
};

// const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
//   const pressedKey = event.key
//   if (!/[0-9.,]/.test(pressedKey)) {
//     event.preventDefault()
//   }
// }

const Account = () => {
  const [account, setAccount] = useState<IAccount>(initialValues);
  const { mutate: addAccount } = useAddAccount();
  const { mutate: editAccount } = useEditAccount();
  const [searchParams] = useSearchParams();
  const fetchedAccountNumber = searchParams.get('id');
  const { data: accountData } = useGetSingleAccount(fetchedAccountNumber);
  const navigate = useNavigate();

  useEffect(() => {
    accountData && setAccount(accountData);
  }, [fetchedAccountNumber, accountData]);

  const { isPending, error, data: currencies } = useCurencySymbol();

  if (isPending) {
    return <Loader />;
  }

  if (isAxiosError(error)) {
    return <ErrorBox error={error} />;
  }

  return (
    <>
      <Grid item>
        <Typography variant="h5" mb={4}>
          {fetchedAccountNumber
            ? `Edit account number: ${fetchedAccountNumber}`
            : 'Add new Account'}
        </Typography>
      </Grid>

      <Formik
        initialValues={account}
        enableReinitialize={true}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          fetchedAccountNumber ? editAccount(values) : addAccount(values);
          resetForm();
          navigate(APP_URL.HOME.path);
        }}
      >
        {({ isValid, dirty }) => (
          <Form>
            <Grid
              container
              position="relative"
              direction="column"
              justifyContent="flex-start"
              alignItems="stretch"
              width="100%"
              maxWidth="400px"
            >
              <Grid container item direction="column">
                <FormInput id="accountName" label="Account Name" />
                <FormInput
                  id="accountNumber"
                  label="Account Number"
                  disabled={true}
                  // onKeyPress={handleKeyPress}
                />
                {currencies && (
                  <SelectInputField
                    label="Account Currency"
                    options={currencies}
                    defaultValue="EUR"
                    id="accountCurrency"
                    disabled={!!fetchedAccountNumber}
                  />
                )}

                <FormInput
                  id="accountFunds"
                  label="Account Funds"
                  disabled={true}
                />
              </Grid>
              <Grid container>
                <Button
                  variant="outlined"
                  sx={{
                    marginRight: 2,
                    width: '100px',
                  }}
                  onClick={() => navigate(APP_URL.HOME.path)}
                >
                  Cancel
                </Button>

                <Button
                  variant="contained"
                  type="submit"
                  sx={{
                    width: '100px',
                  }}
                  disabled={!isValid || !dirty}
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Account;
