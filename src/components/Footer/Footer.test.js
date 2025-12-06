import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';
import styles from './Footer.module.css';

describe("Footer component", () => {
  beforeEach(() => {
    render(<Footer />);
  });

  it('should render without crashing', () => {
    expect(screen.getByRole('contentinfo')).toBeInTheDocument(); // Footer is typically marked by "contentinfo" role
  });

  it('should have a footer with the correct class name', () => {
    const footer = screen.getByRole('contentinfo');
    expect(footer).toHaveClass(styles.appFooter);
  });

  it('should render a logo image with alt text', () => {
    const logo = screen.getByAltText('logo of the author');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', 'img/TR-logo-pink.png');
  });

  it('should render GitHub and LinkedIn links with correct attributes', () => {
    const githubLink = screen.getByLabelText('Visit my GitHub profile');
    const linkedInLink = screen.getByLabelText('Visit my LinkedIn profile');

    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute('href', 'https://github.com/tominator633');
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noreferrer noopener');

    expect(linkedInLink).toBeInTheDocument();
    expect(linkedInLink).toHaveAttribute('href', 'https://www.linkedin.com/in/tomas-r-65916ab8/');
    expect(linkedInLink).toHaveAttribute('target', '_blank');
    expect(linkedInLink).toHaveAttribute('rel', 'noreferrer noopener');
  });

});
