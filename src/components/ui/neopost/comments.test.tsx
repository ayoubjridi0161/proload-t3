import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Comments from './comments';
import { addComment } from '~/lib/actions/socialActions';
import { toast } from 'sonner';

jest.mock('~/lib/actions/socialActions', () => ({
    addComment: jest.fn()
}))
jest.mock('sonner');

const mockComments = [
    {
        content: 'Test comment',
        id: 1,
        users: { name: 'testUser' },
        replys: []
    }
];

describe('Comments Component', () => {
    const mockProps = {
        comments: mockComments,
        postID: 123,
        appUser: 'testUser',
        postUserID: '456',
        className: ''
    };

    beforeEach(() => {
        (addComment as jest.Mock).mockResolvedValue('success');
    });

    it('renders initial comments', () => {
        render(<Comments {...mockProps} />);
        expect(screen.getByText('Test comment')).toBeInTheDocument();
        expect(screen.getByText('testUser')).toBeInTheDocument();
    });

    it('allows submitting a new comment', async () => {
        render(<Comments {...mockProps} />);

        const textarea = screen.getByPlaceholderText('Write a comment...');
        const button = screen.getByRole('button', { name: 'Post' });

        // Enter comment text
        fireEvent.change(textarea, { target: { value: 'New test comment' } });

        // Submit comment
        fireEvent.click(button);

        // Check if comment appears in list
        await waitFor(() => {
            expect(screen.getByText('New test comment')).toBeInTheDocument();
        });

        // Verify API call
        expect(addComment).toHaveBeenCalledWith(123, 'New test comment', '456');
    });

    it('shows error when comment submission fails', async () => {
        (addComment as jest.Mock).mockRejectedValue(new Error('API error'));

        render(<Comments {...mockProps} />);

        const textarea = screen.getByPlaceholderText('Write a comment...');
        const button = screen.getByRole('button', { name: 'Post' });

        fireEvent.change(textarea, { target: { value: 'Failing comment' } });
        fireEvent.click(button);

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith('your comment was not posted');
        });
    });
});