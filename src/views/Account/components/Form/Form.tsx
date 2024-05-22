import { Grid, Button } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { isAxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { generateBankAccountNumber } from '../../../../helpers/generateBankAccountNumber';
import { sentenceAlikeValidation } from '../../../../helpers/formValidation';
import {
  IAccount,
  useAddAccount,
  useEditAccount,
  useGetSingleAccount,
} from '../../../../api/useAccounts';
import { useCurencySymbol } from '../../../../api/useCurencySymbol';
import Loader from '../../../../components/atoms/Loader/Loader';
import { APP_URL } from '../../../../constants/domain.constant';
import { FormInput } from '../../../../components/molecules/FormInput/FormInput';
import { SelectInputField } from '../../../../components/molecules/SelectInput/SelectInput';
import ErrorBox from '../../../../components/atoms/ErrorBox/ErrorBox';

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

const AccountForm = ({
  fetchedAccountNumber,
}: {
  fetchedAccountNumber: string | null;
}) => {
  const [account, setAccount] = useState<IAccount>(initialValues);
  const { mutate: addAccount } = useAddAccount();
  const { mutate: editAccount } = useEditAccount();

  const { isPending, error, data: currencies } = useCurencySymbol();

  const { data: accountData } = useGetSingleAccount(fetchedAccountNumber);
  const navigate = useNavigate();

  useEffect(() => {
    accountData && setAccount(accountData);
  }, [fetchedAccountNumber, accountData]);

  if (isPending) {
    return <Loader />;
  }

  if (isAxiosError(error)) {
    return <ErrorBox error={error} />;
  }

  return (
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
  );
};

export default AccountForm;
