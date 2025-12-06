import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Header from './Header';
import { Swiper, SwiperSlide } from 'swiper/react';
import SubredditsSwiper from "../SubredditsSwiper/SubredditsSwiper";

// Mock dependencies
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),  
  useParams: jest.fn(),
  useLocation: jest.fn(),
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

jest.mock('react-responsive', () => ({
  useMediaQuery: jest.fn(),
}));

// Mock CSS Modules
jest.mock('./Header.module.css', () => ({
  appHeader: 'appHeader',
  mainLine: 'mainLine',
  // Mock other classes as needed
}));

// Create a mock store for Redux
const mockStore = configureStore([]);

describe('Header component', () => {
  let store;
  let navigateMock;
  let setSearchParamsMock;

  beforeEach(() => {
    store = mockStore({
      reddits: { savedReddits: [] },
    });

    navigateMock = jest.fn();
    useNavigate.mockReturnValue(navigateMock);

    setSearchParamsMock = jest.fn();
    useParams.mockReturnValue({ subredditName: null });
    useLocation.mockReturnValue({ pathname: '/' });

    useSelector.mockImplementation((selector) => selector(store.getState()));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders without crashing and displays header elements', () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    expect(screen.getByLabelText('App header')).toBeInTheDocument();
    expect(screen.getByLabelText('Manage subreddits')).toBeInTheDocument();
    expect(screen.getByLabelText('Saved reddits')).toBeInTheDocument();
  });

  test('displays the search button conditionally based on saved reddits and subredditName', () => {
    // Test with savedReddits and subredditName
    useParams.mockReturnValue({ subredditName: 'reactjs' });
    useSelector.mockImplementation(() => [{ id: 1, title: 'Sample Reddit' }]);

    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    expect(screen.getByLabelText('open search bar')).toBeInTheDocument();
  });

  test('opens and closes the search bar when search button is clicked', async () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    // Open the search bar
    const openSearchBtn = screen.getByLabelText('open search bar');
    fireEvent.click(openSearchBtn);

    await waitFor(() => {
      expect(screen.getByLabelText('search reddits bar')).toBeInTheDocument();
    });

    // Close the search bar
    const closeSearchBtn = screen.getByLabelText('Close search bar');
    fireEvent.click(closeSearchBtn);

    await waitFor(() => {
      expect(screen.queryByLabelText('search reddits bar')).not.toBeInTheDocument();
    });
  });

  test('updates search input field and navigates based on search value changes', async () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    // Open search bar
    const openSearchBtn = screen.getByLabelText('open search bar');
    fireEvent.click(openSearchBtn);

    // Update search input field
    const searchInput = screen.getByLabelText('Search reddits by keywords');
    fireEvent.change(searchInput, { target: { value: 'react' } });

    expect(setSearchParamsMock).toHaveBeenCalledWith({ title: 'react' });
  });

  test('navigates to the saved page when "Saved reddits" button is clicked', () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    const savedRedditsBtn = screen.getByLabelText('Saved reddits');
    fireEvent.click(savedRedditsBtn);

    expect(navigateMock).toHaveBeenCalledWith('/saved');
  });

  test('focuses the search input field when the search bar opens', async () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    // Open the search bar
    const openSearchBtn = screen.getByLabelText('open search bar');
    fireEvent.click(openSearchBtn);

    await waitFor(() => {
      const searchInput = screen.getByLabelText('Search reddits by keywords');
      expect(searchInput).toHaveFocus();
    });
  });

  test('disables the search button if on the saved page and no saved reddits are present', () => {
    useLocation.mockReturnValue({ pathname: '/saved' });

    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    expect(screen.queryByLabelText('open search bar')).not.toBeInTheDocument();
  });
});
