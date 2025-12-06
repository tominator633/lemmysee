import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import SubredditsSwiper from './SubredditsSwiper';

// Mocks
const mockStore = configureStore([]);
const mockSubreddits = [
  { id: '1', name: 'subreddit1', iconImg: 'icon1.png', headerImg: 'header1.png' },
  { id: '2', name: 'subreddit2', iconImg: 'icon2.png', headerImg: 'header2.png' },
];

// Props
const mockSetSearchBtn = jest.fn();
const mockSetSearchInput = jest.fn();

describe('SubredditsSwiper Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      subreddits: { swiperSubreddits: mockSubreddits },
    });
  });

  const renderComponent = () =>
    render(
      <Provider store={store}>
        <Router>
          <SubredditsSwiper setSearchBtn={mockSetSearchBtn} setSearchInput={mockSetSearchInput} />
        </Router>
      </Provider>
    );

  it('renders the Swiper component with navigation buttons and slides', () => {
    renderComponent();

    // Check that Swiper component is present
    const swiperContainer = screen.getByRole('group', { name: /popular reddits/i });
    expect(swiperContainer).toBeInTheDocument();

    // Check navigation buttons
    const nextButton = screen.getByLabelText('go right on the swiper');
    const prevButton = screen.getByLabelText('go left on the swiper');
    expect(nextButton).toBeInTheDocument();
    expect(prevButton).toBeInTheDocument();
  });

  it('renders popular subreddit slide correctly', () => {
    renderComponent();

    const popularSlide = screen.getByRole('group', { name: /popular reddits/i });
    expect(popularSlide).toBeInTheDocument();

    const popularLink = screen.getByRole('link', { name: /popular/i });
    expect(popularLink).toHaveAttribute('href', '/popular');
  });

  it('renders dynamic subreddit slides from Redux state', () => {
    renderComponent();

    mockSubreddits.forEach((subreddit) => {
      const subredditSlide = screen.getByRole('group', { name: `Subreddit: ${subreddit.name}` });
      expect(subredditSlide).toBeInTheDocument();

      const subredditLink = screen.getByRole('link', { name: subreddit.name });
      expect(subredditLink).toHaveAttribute('href', `/${subreddit.name}`);
      
      const subredditImg = screen.getByAltText(subreddit.name);
      expect(subredditImg).toHaveAttribute('src', subreddit.iconImg || subreddit.headerImg);
    });
  });

  it('calls setSearchBtn and setSearchInput on subreddit click', () => {
    renderComponent();

    const popularLink = screen.getByRole('link', { name: /popular/i });
    fireEvent.click(popularLink);

    expect(mockSetSearchBtn).toHaveBeenCalledWith(false);
    expect(mockSetSearchInput).toHaveBeenCalledWith('');
  });

  it('handles conditional rendering of subreddit icons', () => {
    const noIconSubreddits = [
      { id: '3', name: 'noIconSubreddit', iconImg: null, headerImg: null },
    ];
    store = mockStore({
      subreddits: { swiperSubreddits: noIconSubreddits },
    });

    renderComponent();

    const noIconSubreddit = screen.getByRole('group', { name: 'Subreddit: noIconSubreddit' });
    expect(noIconSubreddit).toBeInTheDocument();

    const fallbackIcon = screen.getByRole('img', { name: /default icon/i });
    expect(fallbackIcon).toBeInTheDocument();
  });
});
