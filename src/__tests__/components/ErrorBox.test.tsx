import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { AxiosError } from 'axios';
import ErrorBox from '../../components/atoms/ErrorBox/ErrorBox';

describe('ErrorBox Component', () => {
  it('renders the error message', () => {
    const mockError = {
      message: 'Test error message',
    } as AxiosError;

    render(<ErrorBox error={mockError} />);

    // Check if the error message is displayed
    expect(screen.getByText('Test error message')).toBeInTheDocument();
  });

  it('renders the suggestion to refresh the page', () => {
    const mockError = {
      message: 'Test error message',
    } as AxiosError;

    render(<ErrorBox error={mockError} />);

    // Check if the suggestion text is displayed
    expect(
      screen.getByText(
        'Try to refresh the page or check you internet connection'
      )
    ).toBeInTheDocument();
  });
});
