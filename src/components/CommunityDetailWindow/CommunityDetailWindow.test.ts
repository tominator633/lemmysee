// CommunityDetailWindow.test.js

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import CommunityDetailWindow from './CommunityDetailWindow';
import { addCommunity } from '../../features/Communities/communitiesSlice';
import { act } from 'react-dom/test-utils';

const mockStore = configureStore([]);
const currentCommunity = {
  id: '1',
  name: 'TestCommunity',
  bannerImg: 'test-banner.jpg',
  iconImg: 'test-icon.jpg',
  headerTitle: 'Test Header Title',
  publicDescription: 'Test description of the community',
  subscribers: 1234,
};

describe('CommunityDetailWindow Component', () => {
  let store;
  let initialState;

  beforeEach(() => {
    initialState = {
      communities: {
        currentCommunity,
        swiperCommunities: [],
      },
    };
    store = mockStore(initialState);
  });

  const renderComponent = () => {
    return render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/community/1']}>
          <Routes>
            <Route path="/community/:communityId" element={<CommunityDetailWindow />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
  };

  test('renders the community details correctly', () => {
    renderComponent();

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('TestCommunity')).toBeInTheDocument();
    expect(screen.getByText('Test Header Title')).toBeInTheDocument();
    expect(screen.getByText('Test description of the community')).toBeInTheDocument();
    expect(screen.getByText('Subscribers: 1 234')).toBeInTheDocument();
    expect(screen.getByAltText('banner image')).toBeInTheDocument();
    expect(screen.getByAltText('community icon')).toBeInTheDocument();
  });

  test('closes when the close button is clicked', () => {
    renderComponent();
    const closeButton = screen.getByRole('button', { name: 'close this window' });

    fireEvent.click(closeButton);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  test('closes when Escape key is pressed', () => {
    renderComponent();

    act(() => {
      fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
    });

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  test('dispatches addCommunity action when "Add to selection" button is clicked', () => {
    renderComponent();

    const addToSelectionButton = screen.getByRole('button', {
      name: 'Add this community to your selection',
    });

    fireEvent.click(addToSelectionButton);

    const actions = store.getActions();
    expect(actions).toContainEqual(addCommunity(currentCommunity));
  });

  test('hides "Add to selection" button and shows confirmation message when clicked', () => {
    renderComponent();

    const addToSelectionButton = screen.getByRole('button', {
      name: 'Add this community to your selection',
    });
    fireEvent.click(addToSelectionButton);

    expect(addToSelectionButton).not.toBeInTheDocument();
    expect(screen.getByText('Community added to your selection')).toBeInTheDocument();
  });
});
