import { render, screen, fireEvent } from '@testing-library/react'
import { NotificationCard } from './NotificationCard'

// Mock the update action
jest.mock('~/lib/actions/notifications', () => ({
  updateNotificationStatusAction: jest.fn().mockResolvedValue('success')
}))

describe('NotificationCard', () => {
  const mockNotification = {
    id: 1,
    title: 'Test Notification',
    content: 'Test Content',
    time: new Date(),
    read: false
  }

  it('renders notification details', () => {
    render(<NotificationCard {...mockNotification} />)
    expect(screen.getByText(/test notification/i)).toBeInTheDocument()
    expect(screen.getByText(/test content/i)).toBeInTheDocument()
  })

  it('shows unread indicator when notification is unread', () => {
    render(<NotificationCard {...mockNotification} />)
    expect(screen.getByText(/new/i)).toBeInTheDocument()
  })

  it('updates read status on hover', async () => {
    const { container } = render(<NotificationCard {...mockNotification} />)
    fireEvent.mouseLeave(container.firstChild!)
    
    expect(
      await screen.findByText(/new/i)
    ).not.toBeInTheDocument()
  })
})