import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import Loader from '../../components/atoms/Loader/Loader';

describe('Loader Component', () => {
  it('renders a CircularProgress component', () => {
    const { getByRole } = render(<Loader />);

    expect(getByRole('progressbar')).toBeInTheDocument();
  });
});
