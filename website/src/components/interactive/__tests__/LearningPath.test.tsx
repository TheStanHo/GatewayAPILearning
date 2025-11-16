import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LearningPath from '../LearningPath'

const mockSteps = [
  {
    id: '1',
    title: 'Test Step 1',
    description: 'Description 1',
    href: '/docs/test-1',
    completed: false,
  },
  {
    id: '2',
    title: 'Test Step 2',
    description: 'Description 2',
    href: '/docs/test-2',
    completed: true,
  },
]

describe('LearningPath', () => {
  const mockOnToggleStep = jest.fn()

  beforeEach(() => {
    mockOnToggleStep.mockClear()
  })

  it('renders all learning steps', () => {
    render(<LearningPath steps={mockSteps} onToggleStep={mockOnToggleStep} />)
    
    expect(screen.getByText('Test Step 1')).toBeInTheDocument()
    expect(screen.getByText('Test Step 2')).toBeInTheDocument()
    expect(screen.getByText('Description 1')).toBeInTheDocument()
    expect(screen.getByText('Description 2')).toBeInTheDocument()
  })

  it('shows correct completion status', () => {
    render(<LearningPath steps={mockSteps} onToggleStep={mockOnToggleStep} />)
    
    expect(screen.getByText('Mark Complete')).toBeInTheDocument()
    expect(screen.getByText('✓ Completed')).toBeInTheDocument()
  })

  it('calls onToggleStep when button is clicked', async () => {
    const user = userEvent.setup()
    render(<LearningPath steps={mockSteps} onToggleStep={mockOnToggleStep} />)
    
    const completeButton = screen.getAllByText('Mark Complete')[0]
    await user.click(completeButton)
    
    expect(mockOnToggleStep).toHaveBeenCalledWith('1')
  })

  it('renders links to step pages', () => {
    render(<LearningPath steps={mockSteps} onToggleStep={mockOnToggleStep} />)
    
    const links = screen.getAllByText('Read More →')
    expect(links).toHaveLength(2)
    expect(links[0].closest('a')).toHaveAttribute('href', '/docs/test-1')
    expect(links[1].closest('a')).toHaveAttribute('href', '/docs/test-2')
  })

  it('displays step numbers', () => {
    render(<LearningPath steps={mockSteps} onToggleStep={mockOnToggleStep} />)
    
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
  })
})

