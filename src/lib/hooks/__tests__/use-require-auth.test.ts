import { useRouter, useSearchParams } from 'next/navigation';
import { renderHook } from '@testing-library/react';
import { useAuth } from '@/lib/context/auth-context';
import { useRequireAuth } from '../use-require-auth';

jest.mock('../../context/auth-context');
jest.mock('next/navigation');

describe('useRequireAuth', () => {
  it('should redirect if user is not authenticated', () => {
    const mockUser = null;
    const mockLoading = false;

    (useAuth as jest.Mock).mockReturnValue({
      user: mockUser,
      loading: mockLoading
    });

    const mockReplace = jest.fn();

    (useRouter as jest.Mock).mockReturnValue({ replace: mockReplace });
    (useSearchParams as jest.Mock).mockReturnValue({ toString: () => '' });

    renderHook(() => useRequireAuth());

    expect(mockReplace).toHaveBeenCalled();
  });

  it('should not redirect if user is authenticated', () => {
    const mockUser = { admin: true };
    const mockLoading = false;

    (useAuth as jest.Mock).mockReturnValue({
      user: mockUser,
      loading: mockLoading
    });

    const mockReplace = jest.fn();

    (useRouter as jest.Mock).mockReturnValue({ replace: mockReplace });
    (useSearchParams as jest.Mock).mockReturnValue({ toString: () => '' });

    renderHook(() => useRequireAuth({ admin: true, redirect: '/login/admin' }));

    expect(mockReplace).not.toHaveBeenCalled();
  });

  it('should not redirect if user is loading', () => {
    const mockUser = null;
    const mockLoading = true;

    (useAuth as jest.Mock).mockReturnValue({
      user: mockUser,
      loading: mockLoading
    });

    const mockReplace = jest.fn();

    (useRouter as jest.Mock).mockReturnValue({ replace: mockReplace });
    (useSearchParams as jest.Mock).mockReturnValue({ toString: () => '' });

    renderHook(() => useRequireAuth());

    expect(mockReplace).not.toHaveBeenCalled();
  });

  it('should redirect if user is not admin', () => {
    const mockUser = { admin: false };
    const mockLoading = false;

    (useAuth as jest.Mock).mockReturnValue({
      user: mockUser,
      loading: mockLoading
    });

    const mockReplace = jest.fn();

    (useRouter as jest.Mock).mockReturnValue({ replace: mockReplace });
    (useSearchParams as jest.Mock).mockReturnValue({ toString: () => '' });

    renderHook(() => useRequireAuth({ admin: true, redirect: '/login/admin' }));

    expect(mockReplace).toHaveBeenCalled();
  });
});
