// src/tests/pages/StaticPage/StaticPage.test.tsx

import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { describe, it, expect, afterEach, beforeEach, vi } from 'vitest'; // Added beforeEach import
import StaticPage from '../../../pages/StaticPage/StaticPage';

// Mock the API calls used in StaticPage
vi.mock('../../../api/api', () => ({
  getMainMessage: vi.fn(),
}));

// Mock the useNavigate hook from react-router-dom
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(), // Mock useNavigate as a vi.fn() function
  };
});

import { getMainMessage } from '../../../api/api';
import { useNavigate } from 'react-router-dom';

describe('StaticPage Component', () => {
  const navigateMock = vi.fn(); // Define the navigateMock

  beforeEach(() => {
    (useNavigate as ReturnType<typeof vi.fn>).mockReturnValue(navigateMock);
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks(); // Clear all mocks after each test
  });

  it('displays "Loading..." initially', () => {
    render(<StaticPage />);
    const loadingText = screen.getByText(/loading\.\.\./i);
    expect(loadingText).toBeTruthy();
  });

  it('renders the fetched message from the API', async () => {
    (getMainMessage as ReturnType<typeof vi.fn>).mockResolvedValueOnce('Hello, World!');

    render(<StaticPage />);
    expect(await screen.findByText(/hello, world!/i)).toBeTruthy();
  });

  it('displays an error message when the API call fails', async () => {
    (getMainMessage as ReturnType<typeof vi.fn>).mockImplementationOnce(() =>
      Promise.reject(new Error('Failed to fetch message'))
    );

    render(<StaticPage />);
    expect(await screen.findByText(/failed to load the message\. please try again later\./i)).toBeTruthy();
  });

  it('navigates to the Form page when the button is clicked', () => {
    render(<StaticPage />);
    const button = screen.getByRole('button', { name: /go to form/i });
    fireEvent.click(button);

    expect(navigateMock).toHaveBeenCalledWith('/form');
  });

  it('matches the snapshot', () => {
    const { container } = render(<StaticPage />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
