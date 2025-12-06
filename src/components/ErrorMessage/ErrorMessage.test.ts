
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ErrorMessage from './ErrorMessage';

describe('ErrorMessage Component', () => {
  
  const defaultMessage = "This is an error message";
  const onClickMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the error message text', () => {
    render(<ErrorMessage message={defaultMessage} />);
    const errorText = screen.getByText(defaultMessage);
    expect(errorText).toBeInTheDocument();
  });

  test('renders with proper accessibility roles and attributes', () => {
    render(<ErrorMessage message={defaultMessage} />);
    
    const errorContainer = screen.getByRole('alert');
    expect(errorContainer).toHaveAttribute('aria-live', 'assertive');
    expect(errorContainer).toHaveAttribute('tabIndex', '-1');
  });

  test('does not render button if onClick is not provided', () => {
    render(<ErrorMessage message={defaultMessage} />);
    const button = screen.queryByRole('button');
    expect(button).toBeNull();
  });

  test('renders button if onClick is provided', () => {
    render(<ErrorMessage message={defaultMessage} onClick={onClickMock} />);
    const button = screen.getByRole('button', { name: /try again this action/i });
    expect(button).toBeInTheDocument();
  });

  test('calls onClick handler when button is clicked', () => {
    render(<ErrorMessage message={defaultMessage} onClick={onClickMock} />);
    const button = screen.getByRole('button', { name: /try again this action/i });
    fireEvent.click(button);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
