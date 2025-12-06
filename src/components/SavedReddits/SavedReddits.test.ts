import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, useSearchParams } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import SavedReddits from './SavedReddits';
import { selectSavedReddits } from '../../features/Reddits/redditsSlice';
import '@testing-library/jest-dom/extend-expect';

jest.mock('../../features/Reddits/redditsSlice', () => ({
    selectSavedReddits: jest.fn(),
    filterReddits: jest.fn((title, reddits) => reddits.filter((reddit) => reddit.title.includes(title))),
}));
jest.mock('../../components/ErrorMessage/ErrorMessage', () => ({ message }) => <div>{message}</div>);
jest.mock('../../features/Reddit/Reddit', () => ({ content }) => <div>{content.title}</div>);

const mockStore = configureStore([]);
const renderWithProviders = (ui, { store, route = '/' }) => {
    return render(
        <Provider store={store}>
            <MemoryRouter initialEntries={[route]}>
                {ui}
            </MemoryRouter>
        </Provider>
    );
};

describe('SavedReddits Component', () => {
    let store;
    let savedRedditsMock;

    beforeEach(() => {
        savedRedditsMock = [
            { id: '1', title: 'First Saved Reddit' },
            { id: '2', title: 'Another Reddit' },
            { id: '3', title: 'Interesting Reddit Post' }
        ];

        store = mockStore({
            reddits: { savedReddits: savedRedditsMock }
        });

        selectSavedReddits.mockReturnValue(savedRedditsMock);
    });

    test('renders without errors', () => {
        renderWithProviders(<SavedReddits />, { store });
        expect(screen.getByRole('region')).toBeInTheDocument();
    });

    test('displays the correct number of saved reddits', () => {
        renderWithProviders(<SavedReddits />, { store });
        expect(screen.getByText('Saved reddits (3)')).toBeInTheDocument();
    });

    test('renders all saved reddits when no filter is applied', () => {
        renderWithProviders(<SavedReddits />, { store });
        expect(screen.getByText('First Saved Reddit')).toBeInTheDocument();
        expect(screen.getByText('Another Reddit')).toBeInTheDocument();
        expect(screen.getByText('Interesting Reddit Post')).toBeInTheDocument();
    });

    test('filters reddits by title when a search parameter is present', () => {
        savedRedditsMock = [
            { id: '1', title: 'First Saved Reddit' },
            { id: '2', title: 'Another Reddit' },
            { id: '3', title: 'Interesting Reddit Post' }
        ];

        renderWithProviders(<SavedReddits />, { store, route: '/?title=First' });
        expect(screen.getByText('First Saved Reddit')).toBeInTheDocument();
        expect(screen.queryByText('Another Reddit')).not.toBeInTheDocument();
        expect(screen.queryByText('Interesting Reddit Post')).not.toBeInTheDocument();
    });

    test('displays an error message when there are no saved reddits', () => {
        selectSavedReddits.mockReturnValue([]);
        renderWithProviders(<SavedReddits />, { store });
        expect(screen.getByText('No reddits saved')).toBeInTheDocument();
    });

    test('displays an error message when no reddits match the filter', () => {
        renderWithProviders(<SavedReddits />, { store, route: '/?title=Nonexistent' });
        expect(screen.getByText('No reddits found for the given input')).toBeInTheDocument();
    });
});
