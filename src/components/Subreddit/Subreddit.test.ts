import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { addSubreddit, deleteSubreddit, setCurrentSubreddit } from '../../features/Subreddits/subredditsSlice';
import Subreddit from './Subreddit';

const mockStore = configureStore([]);

describe('Subreddit component', () => {
    let store;
    let content;

    beforeEach(() => {
        store = mockStore({});
        store.dispatch = jest.fn();

        content = {
            id: 'test-subreddit',
            name: 'Test Subreddit',
            bannerImg: 'test-banner.png',
            iconImg: 'test-icon.png',
            headerImg: 'test-header.png'
        };
    });

    const renderComponent = (isSwiperSubreddit = false) => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Subreddit content={content} isSwiperSubreddit={isSwiperSubreddit} />
                </MemoryRouter>
            </Provider>
        );
    };

    it('renders subreddit name, banner, and icon if present', () => {
        renderComponent();

        expect(screen.getByRole('img', { name: 'Test Subreddit banner' })).toBeInTheDocument();
        expect(screen.getByRole('img', { name: 'Test Subreddit icon' })).toBeInTheDocument();
        expect(screen.getByText('Test Subreddit')).toBeInTheDocument();
    });

    it('displays the header image if the icon image is not available', () => {
        content.iconImg = null;
        renderComponent();

        expect(screen.getByRole('img', { name: 'Test Subreddit icon' })).toBeInTheDocument();
        expect(screen.queryByAltText('test-icon.png')).not.toBeInTheDocument();
    });

    it('renders a default icon if no icon or header image is provided', () => {
        content.iconImg = null;
        content.headerImg = null;
        renderComponent();

        expect(screen.getByRole('presentation').querySelector('svg')).toBeInTheDocument();
    });

    it('dispatches setCurrentSubreddit when detail link is clicked', () => {
        renderComponent();
        fireEvent.click(screen.getByRole('link', { name: /Open information window for this subreddit/i }));

        expect(store.dispatch).toHaveBeenCalledWith(setCurrentSubreddit(content));
    });

    it('dispatches addSubreddit when "Add subreddit" button is clicked', () => {
        renderComponent(false);
        fireEvent.click(screen.getByRole('button', { name: /Add subreddit to your selection/i }));

        expect(store.dispatch).toHaveBeenCalledWith(addSubreddit(content));
    });

    it('dispatches deleteSubreddit when "Remove subreddit" button is clicked if isSwiperSubreddit is true', () => {
        renderComponent(true);
        fireEvent.click(screen.getByRole('button', { name: /Remove subreddit from your selection/i }));

        expect(store.dispatch).toHaveBeenCalledWith(deleteSubreddit(content));
    });

    it('matches the snapshot for the component', () => {
        const { asFragment } = render(
            <Provider store={store}>
                <MemoryRouter>
                    <Subreddit content={content} isSwiperSubreddit={false} />
                </MemoryRouter>
            </Provider>
        );
        expect(asFragment()).toMatchSnapshot();
    });
});
