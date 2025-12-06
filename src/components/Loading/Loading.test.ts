import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Loading from './Loading';

describe('Loading Component', () => {
    const loadingText = 'Loading, please wait...';

    beforeEach(() => {
        render(<Loading loadingText={loadingText} />);
    });

    it('renders the loading component and is visible', () => {
        const loadingSection = screen.getByRole('status', { hidden: true });
        expect(loadingSection).toBeInTheDocument();
        expect(loadingSection).toBeVisible();
    });

    it('displays the loading text provided as a prop', () => {
        const loadingMessage = screen.getByText(loadingText);
        expect(loadingMessage).toBeInTheDocument();
        expect(loadingMessage).toHaveAttribute('role', 'alert');
    });

    it('sets aria-busy on the loading text for accessibility', () => {
        const loadingMessage = screen.getByText(loadingText);
        expect(loadingMessage).toHaveAttribute('aria-busy', 'true');
    });

    it('renders the SVG loading icon with aria-hidden attribute', () => {
        const svgIcon = screen.getByRole('presentation', { hidden: true }).querySelector('svg');
        expect(svgIcon).toBeInTheDocument();
        expect(svgIcon).toHaveAttribute('aria-hidden', 'true');
    });
});
