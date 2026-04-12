import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, useSearchParams } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import SavedPosts from './SavedPosts';
import { selectSavedPosts } from '../../features/Posts/postsSlice';
import '@testing-library/jest-dom/extend-expect';

jest.mock('../../features/Posts/postsSlice', () => ({
    selectSavedPosts: jest.fn(),
    filterPosts: jest.fn((title, posts) => posts.filter((post) => post.title.includes(title))),
}));
jest.mock('../../components/ErrorMessage/ErrorMessage', () => ({ message }) => <div>{message}</div>);
jest.mock('../../features/Post/Post', () => ({ content }) => <div>{content.title}</div>);

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

describe('SavedPosts Component', () => {
    let store;
    let savedPostsMock;

    beforeEach(() => {
        savedPostsMock = [
            { id: '1', title: 'First Saved Post' },
            { id: '2', title: 'Another Post' },
            { id: '3', title: 'Interesting Post Post' }
        ];

        store = mockStore({
            posts: { savedPosts: savedPostsMock }
        });

        selectSavedPosts.mockReturnValue(savedPostsMock);
    });

    test('renders without errors', () => {
        renderWithProviders(<SavedPosts />, { store });
        expect(screen.getByRole('region')).toBeInTheDocument();
    });

    test('displays the correct number of saved posts', () => {
        renderWithProviders(<SavedPosts />, { store });
        expect(screen.getByText('Saved posts (3)')).toBeInTheDocument();
    });

    test('renders all saved posts when no filter is applied', () => {
        renderWithProviders(<SavedPosts />, { store });
        expect(screen.getByText('First Saved Post')).toBeInTheDocument();
        expect(screen.getByText('Another Post')).toBeInTheDocument();
        expect(screen.getByText('Interesting Post Post')).toBeInTheDocument();
    });

    test('filters posts by title when a search parameter is present', () => {
        savedPostsMock = [
            { id: '1', title: 'First Saved Post' },
            { id: '2', title: 'Another Post' },
            { id: '3', title: 'Interesting Post Post' }
        ];

        renderWithProviders(<SavedPosts />, { store, route: '/?title=First' });
        expect(screen.getByText('First Saved Post')).toBeInTheDocument();
        expect(screen.queryByText('Another Post')).not.toBeInTheDocument();
        expect(screen.queryByText('Interesting Post Post')).not.toBeInTheDocument();
    });

    test('displays an error message when there are no saved posts', () => {
        selectSavedPosts.mockReturnValue([]);
        renderWithProviders(<SavedPosts />, { store });
        expect(screen.getByText('No posts saved')).toBeInTheDocument();
    });

    test('displays an error message when no posts match the filter', () => {
        renderWithProviders(<SavedPosts />, { store, route: '/?title=Nonexistent' });
        expect(screen.getByText('No posts found for the given input')).toBeInTheDocument();
    });
});
