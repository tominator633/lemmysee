// RedditDetailWindow.test.js

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { loadComments, emptyComments } from '../../features/Reddit/redditSlice';
import RedditDetailWindow from './RedditDetailWindow';

const mockStore = configureStore([]);

describe('RedditDetailWindow Component', () => {
    let store;
    let mockDispatch;

    // Default mock data for `currentReddit` with `score` defined
    const defaultCurrentReddit = {
        score: 1000,
        user: 'test_user',
        created: 1632926400,
        title: 'Test Title',
        permalink: '/r/test/123'
    };

    beforeEach(() => {
        store = mockStore({
            reddit: {
                currentReddit: defaultCurrentReddit, // Set score in default data
                comments: [],
                isCommentsLoading: false,
                hasCommentsError: false
            }
        });
        mockDispatch = jest.fn();
        store.dispatch = mockDispatch;
    });

    const renderComponent = () => 
        render(
            <Provider store={store}>
                <Router>
                    <RedditDetailWindow />
                </Router>
            </Provider>
        );

    test('renders RedditDetailWindow with correct data', () => {
        renderComponent();

        // Check if the reddit details are displayed
        expect(screen.getByText('Test Title')).toBeInTheDocument();
        expect(screen.getByLabelText("The score of this reddit is 1000")).toBeInTheDocument();
        expect(screen.getByLabelText("View test_user's profile on Reddit in a new tab")).toBeInTheDocument();
    });

    test('loads comments when the component mounts', () => {
        renderComponent();

        // Verify loadComments is called with the correct permalink
        expect(mockDispatch).toHaveBeenCalledWith(loadComments('/r/test/123'));
    });

    test('closes window and empties comments when close button is clicked', async () => {
        renderComponent();

        const closeButton = screen.getByRole('button', { name: /close this window/i });
        fireEvent.click(closeButton);

        // Wait for the component to fully close and dispatch actions
        await waitFor(() => {
            expect(mockDispatch).toHaveBeenCalledWith(emptyComments());
        });
    });

    test('closes window and empties comments when "Escape" key is pressed', async () => {
        renderComponent();

        fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });

        // Verify that emptyComments and navigate actions were triggered
        await waitFor(() => {
            expect(mockDispatch).toHaveBeenCalledWith(emptyComments());
        });
    });

    test('shows loading component when comments are loading', () => {
        store = mockStore({
            reddit: {
                currentReddit: defaultCurrentReddit,
                comments: [],
                isCommentsLoading: true,
                hasCommentsError: false
            }
        });

        renderComponent();

        // Check for loading indicator
        expect(screen.getByText(/Loading comments.../i)).toBeInTheDocument();
    });

    test('shows error message and reload button when there is an error loading comments', () => {
        store = mockStore({
            reddit: {
                currentReddit: defaultCurrentReddit,
                comments: [],
                isCommentsLoading: false,
                hasCommentsError: true
            }
        });

        renderComponent();

        // Check for error message
        expect(screen.getByText(/Request failed./i)).toBeInTheDocument();
        const reloadButton = screen.getByRole('button', { name: /reload/i });
        expect(reloadButton).toBeInTheDocument();

        // Simulate clicking the reload button
        fireEvent.click(reloadButton);
        expect(mockDispatch).toHaveBeenCalledWith(loadComments('/r/test/123'));
    });

    test('displays comments if there are any', () => {
        store = mockStore({
            reddit: {
                currentReddit: defaultCurrentReddit,
                comments: [{ id: 1, content: 'Test comment' }],
                isCommentsLoading: false,
                hasCommentsError: false
            }
        });

        renderComponent();

        // Check for the comment in the document
        expect(screen.getByText('Test comment')).toBeInTheDocument();
    });

    test('displays "no comments" message if there are no comments', () => {
        renderComponent();

        // Check for "no comments" message
        expect(screen.getByText(/This post has no comments/i)).toBeInTheDocument();
    });
});
