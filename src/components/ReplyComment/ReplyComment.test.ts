import React from 'react';
import { render, screen } from '@testing-library/react';
import ReplyComment from './ReplyComment';
import { epochToAgo, formatNumberWithSpaces } from '../../utils/utils';
import MarkdownIt from 'markdown-it';
import DOMPurify from 'dompurify';

jest.mock('markdown-it');
jest.mock('dompurify', () => ({
  sanitize: jest.fn((html) => html)
}));

jest.mock('../../utils/utils', () => ({
  epochToAgo: jest.fn(),
  formatNumberWithSpaces: jest.fn()
}));

describe('ReplyComment Component', () => {
  const mockReplyContent = {
    rAuthor: 'testUser',
    rCreated: 1609459200, // A sample epoch timestamp
    rBody: '**Boldtext** and [link](https://example.com)',
    rScore: 1234
  };

  beforeEach(() => {
    MarkdownIt.mockImplementation(() => ({
      render: jest.fn().mockReturnValue('<strong>Bold text</strong> and <a href="https://example.com">link</a>')
    }));
    epochToAgo.mockReturnValue('2 days ago');
    formatNumberWithSpaces.mockReturnValue('1 234');
  });

  test('renders the component with correct structure and classes', () => {
    render(<ReplyComment replyContent={mockReplyContent} />);

    const article = screen.getByRole('article');
    expect(article).toHaveClass('replyComment');

    const authorLink = screen.getByRole('link', { name: /visit profile of testUser/i });
    expect(authorLink).toHaveAttribute('href', 'https://www.reddit.com/user/testUser/');
    expect(authorLink).toHaveTextContent('testUser');

    const timePosted = screen.getByText('2 days ago');
    expect(timePosted).toBeInTheDocument();
  });

  test('correctly sanitizes and renders Markdown content', () => {
    render(<ReplyComment replyContent={mockReplyContent} />);

    const commentText = screen.getByText('Boldtext');
    expect(commentText).toBeInTheDocument();
    expect(commentText.closest('p')).toHaveClass('replyCommentText');
    expect(DOMPurify.sanitize).toHaveBeenCalledWith('<strong>Bold text</strong> and <a href="https://example.com">link</a>');
  });

  test('displays formatted score with correct aria-label', () => {
    render(<ReplyComment replyContent={mockReplyContent} />);

    const score = screen.getByText('1 234');
    expect(score).toBeInTheDocument();
    expect(score).toHaveClass('score');
    expect(score).toHaveAttribute('aria-label', 'the score of this comment is: 1234');
  });

  test('displays formatted time using epochToAgo', () => {
    render(<ReplyComment replyContent={mockReplyContent} />);

    const timeElement = screen.getByText('2 days ago');
    expect(timeElement).toBeInTheDocument();
    expect(timeElement).toHaveAttribute('aria-label', 'Posted 2 days ago');
    expect(epochToAgo).toHaveBeenCalledWith(mockReplyContent.rCreated);
  });

  test('renders an empty body if rBody is not provided', () => {
    const noBodyContent = { ...mockReplyContent, rBody: '' };
    render(<ReplyComment replyContent={noBodyContent} />);

    const commentText = screen.queryByRole('p', { class: 'replyCommentText' });
    expect(commentText).not.toBeInTheDocument();
  });

  test('applies accessibility labels correctly', () => {
    render(<ReplyComment replyContent={mockReplyContent} />);

    const article = screen.getByRole('article', { name: 'Reply by testUser' });
    expect(article).toHaveAttribute('aria-label', 'Reply by testUser');

    const timeElement = screen.getByText('2 days ago');
    expect(timeElement).toHaveAttribute('aria-label', 'Posted 2 days ago');
  });
});
