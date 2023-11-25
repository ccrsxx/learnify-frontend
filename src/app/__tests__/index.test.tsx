import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Home from '@/app/(public)/page';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn().mockReturnValue({ get: jest.fn() })
}));

jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn().mockReturnValue({ data: null, isLoading: false })
}));

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />);

    const heading = screen.getByRole('heading', {
      name: /belajar dari praktisi terbaik!/i
    });

    expect(heading).toBeInTheDocument();
  });
});
