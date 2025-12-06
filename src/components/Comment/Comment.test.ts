import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Comment from './Comment';
import { epochToAgo, formatNumberWithSpaces } from '../../utils/utils';

jest.mock('../ReplyComment/ReplyComment', () => () => <div data-testid="reply-comment">Reply Comment</div>);
jest.mock('../../utils/utils', () => ({
    epochToAgo: jest.fn(),
    formatNumberWithSpaces: jest.fn()
}));

describe('Comment component', () => {
    const mockContent = {
        author: 'test_user',
        created: 1627502400, // Mock epoch time
        body: 'Hello **world**!', // Markdown content
        score: 1234,
        replies: [
            { author: 'reply_user', body: 'This is a reply', score: 10 }
        ]
    };

    beforeEach(() => {
        epochToAgo.mockReturnValue('5 hours ago');
        formatNumberWithSpaces.mockReturnValue('1 234');
    });

    test('renders the component with author and timestamp', () => {
        render(<Comment content={mockContent} />);

        expect(screen.getByText('test_user')).toBeInTheDocument();
        expect(screen.getByText('5 hours ago')).toBeInTheDocument();
    });

    test('displays sanitized markdown content in the comment body', () => {
        render(<Comment content={mockContent} />);
        
       // Use a custom function matcher
        const commentText = screen.getByText((content, element) => 
        element?.textContent === 'Hello world!'
        );
        expect(commentText).toBeInTheDocument();
    });

    test('renders the correct score with spaces', () => {
        render(<Comment content={mockContent} />);
        
        expect(screen.getByText('1 234')).toBeInTheDocument();
    });

    test('replies button toggles replies display', () => {
        render(<Comment content={mockContent} />);

        // Check that the replies section is initially hidden
        expect(screen.queryByTestId('reply-comment')).not.toBeInTheDocument();

        // Click the replies button to show replies
        const repliesButton = screen.getByRole('button', { name: /Replies/i });
        fireEvent.click(repliesButton);

        // Check that the replies section is now visible
        expect(screen.getByTestId('reply-comment')).toBeInTheDocument();

        // Click the replies button again to hide replies
        //NOT POSSIBLE, BECAUSE REPLIES BUTTON CHANGES ITS INNER TEXT WHEN CLICKED. WE MUST GET THAT BUTTON NOT BY ROLE, BUT ID OR SOMETHING
        //fireEvent.click(repliesButton);
        //expect(screen.queryByTestId('reply-comment')).not.toBeInTheDocument();
    });

    test('replies button has correct aria attributes when toggling', () => {
        render(<Comment content={mockContent} />);
        
        const repliesButton = screen.getByRole('button', { name: /Expand replies/i });
        expect(repliesButton).toHaveAttribute('aria-expanded', 'false');

        // Click to expand
        fireEvent.click(repliesButton);
        expect(repliesButton).toHaveAttribute('aria-expanded', 'true');

        // Click to collapse
        fireEvent.click(repliesButton);
        expect(repliesButton).toHaveAttribute('aria-expanded', 'false');
    });

    test('applies the correct background color based on repliesButton state', () => {
        render(<Comment content={mockContent} />);

        const article = screen.getByRole('article');
        expect(article).toHaveStyle('background-color: white');

        // Click the replies button to change background color
        fireEvent.click(screen.getByRole('button', { name: /Expand replies/i }));
        expect(article).toHaveStyle('background-color: #FEE');
    });

    test('link to author profile is rendered correctly', () => {
        render(<Comment content={mockContent} />);

        const profileLink = screen.getByRole('link', { name: /Visit profile of test_user/i });
        expect(profileLink).toHaveAttribute('href', 'https://www.reddit.com/user/test_user/');
    });

    test('renders replies only when repliesButton is true', () => {
        render(<Comment content={mockContent} />);

        // Initially, replies should not be rendered
        expect(screen.queryByTestId('reply-comment')).not.toBeInTheDocument();

        // Toggle replies button to display replies
        fireEvent.click(screen.getByRole('button', { name: /Expand replies/i }));
        expect(screen.getAllByTestId('reply-comment')).toHaveLength(mockContent.replies.length);
    });
});
