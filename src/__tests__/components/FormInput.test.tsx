import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Formik } from 'formik';
import { FormInput } from '../../components/molecules/FormInput/FormInput';

describe('FormInput Component', () => {
  it('renders the TextField with the given label', () => {
    const mockLabel = 'Test Label';
    const mockId = 'testId';

    render(
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      <Formik initialValues={{ [mockId]: '' }} onSubmit={() => {}}>
        <FormInput id={mockId} label={mockLabel} />
      </Formik>
    );

    // Check if the TextField is rendered with the given label
    expect(screen.getByLabelText(mockLabel)).toBeInTheDocument();
  });

  it('displays the error message when there is an error', () => {
    const mockLabel = 'Test Label';
    const mockId = 'testId';
    const mockError = 'Test error message';

    render(
      <Formik
        initialValues={{ [mockId]: '' }}
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onSubmit={() => {}}
        initialErrors={{ [mockId]: mockError }}
        initialTouched={{ [mockId]: true }}
      >
        <FormInput id={mockId} label={mockLabel} />
      </Formik>
    );

    // Check if the error message is displayed
    expect(screen.getByText(mockError)).toBeInTheDocument();
  });
});
