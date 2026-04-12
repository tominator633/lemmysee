import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { addCommunity, deleteCommunity, setCurrentCommunity } from '../../features/Communities/communitiesSlice';
import Community from './Community';

const mockStore = configureStore([]);

describe('Community component', () => {
    let store;
    let content;

    beforeEach(() => {
        store = mockStore({});
        store.dispatch = jest.fn();

        content = {
            id: 'test-community',
            name: 'Test Community',
            bannerImg: 'test-banner.png',
            iconImg: 'test-icon.png',
            headerImg: 'test-header.png'
        };
    });

    const renderComponent = (isSwiperCommunity = false) => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Community content={content} isSwiperCommunity={isSwiperCommunity} />
                </MemoryRouter>
            </Provider>
        );
    };

    it('renders community name, banner, and icon if present', () => {
        renderComponent();

        expect(screen.getByRole('img', { name: 'Test Community banner' })).toBeInTheDocument();
        expect(screen.getByRole('img', { name: 'Test Community icon' })).toBeInTheDocument();
        expect(screen.getByText('Test Community')).toBeInTheDocument();
    });

    it('displays the header image if the icon image is not available', () => {
        content.iconImg = null;
        renderComponent();

        expect(screen.getByRole('img', { name: 'Test Community icon' })).toBeInTheDocument();
        expect(screen.queryByAltText('test-icon.png')).not.toBeInTheDocument();
    });

    it('renders a default icon if no icon or header image is provided', () => {
        content.iconImg = null;
        content.headerImg = null;
        renderComponent();

        expect(screen.getByRole('presentation').querySelector('svg')).toBeInTheDocument();
    });

    it('dispatches setCurrentCommunity when detail link is clicked', () => {
        renderComponent();
        fireEvent.click(screen.getByRole('link', { name: /Open information window for this community/i }));

        expect(store.dispatch).toHaveBeenCalledWith(setCurrentCommunity(content));
    });

    it('dispatches addCommunity when "Add community" button is clicked', () => {
        renderComponent(false);
        fireEvent.click(screen.getByRole('button', { name: /Add community to your selection/i }));

        expect(store.dispatch).toHaveBeenCalledWith(addCommunity(content));
    });

    it('dispatches deleteCommunity when "Remove community" button is clicked if isSwiperCommunity is true', () => {
        renderComponent(true);
        fireEvent.click(screen.getByRole('button', { name: /Remove community from your selection/i }));

        expect(store.dispatch).toHaveBeenCalledWith(deleteCommunity(content));
    });

    it('matches the snapshot for the component', () => {
        const { asFragment } = render(
            <Provider store={store}>
                <MemoryRouter>
                    <Community content={content} isSwiperCommunity={false} />
                </MemoryRouter>
            </Provider>
        );
        expect(asFragment()).toMatchSnapshot();
    });
});
