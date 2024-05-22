import { useState, useMemo } from 'react';
import { Button, Divider, Grid, Typography } from '@mui/material';
import {
  OptionItem,
  SelectInputField,
} from '../../components/molecules/SelectInput/SelectInput';
import { FormInput } from '../../components/molecules/FormInput/FormInput';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { NavLink, useNavigate } from 'react-router-dom';
import { APP_URL } from '../../constants/domain.constant';
import { useEditAccount, useGetAccounts } from '../../api/useAccounts';
import { transferFundsValidation } from '../../helpers/formValidation';

import Loader from '../../components/atoms/Loader/Loader';
import useFundsInfo from '../../hooks/useFundsInfo';
import { convertCurrency } from '../../helpers/convertCurrency';
import { exchangeRate } from '../../constants/exchangeRate.constant';
import { isAxiosError } from 'axios';
import ErrorBox from '../../components/atoms/ErrorBox/ErrorBox';
import { setFetchedAccounts } from './utils/helpers/setFetchedAccounts';
import { handleAmountKeyPress } from './utils/helpers/handleAmountKeyPress';
import { preparePayload } from './utils/helpers/preparePayload';

interface IFormValues {
  outgoingAccount: string;
  incomingAccount: string;
  transferAmount: number | null;
  transferName: string;
}
const initialValues: IFormValues = {
  outgoingAccount: '',
  incomingAccount: '',
  transferAmount: null,
  transferName: '',
};

const Transfer = () => {
  const [debitAccountId, setDebitAccountId] = useState('');
  const [creditAccountId, setCreditAccountId] = useState('');
  const [transferAmount, setTransferAmount] = useState<number | null>();

  const navigate = useNavigate();
  const { isPending, error, data: accounts } = useGetAccounts();
  const { mutate: editAccount } = useEditAccount();

  const { funds: debitFunds, currSymbol: debitCurrencySymbol } =
    useFundsInfo(accounts, debitAccountId) ?? {};

  const { funds: creditFunds, currSymbol: creditCurrencySymbol } =
    useFundsInfo(accounts, creditAccountId) ?? {};

  const convertedTransferAmount = useMemo(() => {
    if (transferAmount && debitCurrencySymbol && creditCurrencySymbol) {
      return convertCurrency(
        transferAmount,
        debitCurrencySymbol,
        creditCurrencySymbol,
        exchangeRate
      );
    }
  }, [transferAmount, debitCurrencySymbol, creditCurrencySymbol]);

  const accounOptionList = useMemo(() => {
    let options: OptionItem[] = [];
    if (accounts) {
      options = setFetchedAccounts(accounts);
    }
    return options;
  }, [accounts]);

  if (isPending) {
    return <Loader />;
  }

  if (isAxiosError(error)) {
    return <ErrorBox error={error} />;
  }

  const validationSchema = Yup.object({
    outgoingAccount: Yup.number().required('Field required'),
    incomingAccount: Yup.number().required('Field required'),
    transferAmount: transferFundsValidation(debitFunds),
  });

  return (
    <Grid container direction="column">
      <Grid item xs={12} md={6} mb={4}>
        <Typography variant="h5">Transfer details</Typography>
      </Grid>
      {accounOptionList?.length < 2 ? (
        <Grid container alignItems="center">
          <Typography mr={2} mb={{ xs: 2, sm: 0 }}>
            You need more than one account to make a transfer
          </Typography>
          <NavLink to={APP_URL.ACCOUNT.path}>
            <Button variant="outlined">Add new account</Button>
          </NavLink>
        </Grid>
      ) : (
        <Formik
          initialValues={initialValues}
          enableReinitialize={true}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            const outgoingAccountPayload = preparePayload(
              accounts,
              values.outgoingAccount,
              transferAmount,
              false
            );
            const incomingAccountPayload = preparePayload(
              accounts,
              values.incomingAccount,
              convertedTransferAmount,
              true
            );
            if (outgoingAccountPayload) {
              editAccount(outgoingAccountPayload);
            }
            if (incomingAccountPayload) {
              editAccount(incomingAccountPayload);
            }

            resetForm();
            navigate(APP_URL.HOME.path);
          }}
        >
          {({ isValid, dirty, values }) => {
            setDebitAccountId(values.outgoingAccount);
            setCreditAccountId(values.incomingAccount);
            setTransferAmount(values.transferAmount);
            return (
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
                  <Divider textAlign="left" sx={{ marginBottom: 4 }}>
                    Accounts
                  </Divider>
                  <Grid container item direction="column">
                    <Typography mb={2}>Choose an outgoing account:</Typography>
                    <SelectInputField
                      label="Outgoing account"
                      options={accounOptionList}
                      id="outgoingAccount"
                    />
                    <Typography mt={-1} mb={3}>
                      Funds available:
                      <Typography
                        component="span"
                        color="primary"
                        fontWeight="bold"
                        pl={1}
                      >
                        {debitFunds} {debitCurrencySymbol}
                      </Typography>
                    </Typography>

                    <Typography mb={2}>Choose an incoming account: </Typography>
                    <SelectInputField
                      label="Incoming account"
                      options={accounOptionList}
                      id="incomingAccount"
                    />
                    <Typography mt={-1} mb={3}>
                      Funds available:
                      <Typography
                        component="span"
                        color="primary"
                        fontWeight="bold"
                        pl={1}
                      >
                        {creditFunds} {creditCurrencySymbol}
                      </Typography>
                    </Typography>

                    <Divider textAlign="left" sx={{ marginBottom: 4 }}>
                      Transfer Opions
                    </Divider>
                    <Grid container wrap="nowrap">
                      <FormInput
                        id="transferAmount"
                        label="Transfer amount"
                        onKeyPress={handleAmountKeyPress}
                      />
                      <Typography color="primary" ml={1}>
                        {debitCurrencySymbol}
                      </Typography>
                    </Grid>

                    <Typography mt={-1} mb={3}>
                      Value after conversion:
                      <Typography
                        component="span"
                        color="primary"
                        fontWeight="bold"
                        px={1}
                      >
                        {convertedTransferAmount}
                      </Typography>
                      {creditCurrencySymbol}
                    </Typography>

                    <FormInput id="transferName" label="Transfer name" />
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
                      Send
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            );
          }}
        </Formik>
      )}
    </Grid>
  );
};

export default Transfer;
