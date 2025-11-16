import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TableOfContents from '@/components/TableOfContents'

const mockHeadings = [
  { level: 2, text: 'Introduction', id: 'introduction' },
  { level: 3, text: 'Getting Started', id: 'getting-started' },
  { level: 2, text: 'Advanced Topics', id: 'advanced-topics' },
]

// Mock window.scrollTo
global.scrollTo = jest.fn()
global.window.history.pushState = jest.fn()

describe('TableOfContents', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders all headings', () => {
    render(<TableOfContents headings={mockHeadings} />)
    
    expect(screen.getByText('Introduction')).toBeInTheDocument()
    expect(screen.getByText('Getting Started')).toBeInTheDocument()
    expect(screen.getByText('Advanced Topics')).toBeInTheDocument()
  })

  it('renders correct heading levels', async () => {
    const user = userEvent.setup()
    const { container } = render(<TableOfContents headings={mockHeadings} />)
    
    // Click to expand the table of contents
    const expandButton = screen.getByRole('button', { name: /expand table of contents/i })
    await user.click(expandButton)
    
    await waitFor(() => {
      const h2Links = container.querySelectorAll('li.font-medium')
      // h3 items use ml-3 md:ml-4, so we need to check for either class
      const h3Links = container.querySelectorAll('li.ml-3, li.ml-4')
      
      expect(h2Links.length).toBeGreaterThan(0)
      expect(h3Links.length).toBeGreaterThan(0)
    })
  })

  it('creates correct anchor links', async () => {
    const user = userEvent.setup()
    render(<TableOfContents headings={mockHeadings} />)
    
    // Click to expand the table of contents to show links
    const expandButton = screen.getByRole('button', { name: /expand table of contents/i })
    await user.click(expandButton)
    
    // Wait for the expanded content to render, then find the link
    await waitFor(() => {
      const introLink = screen.getByRole('link', { name: 'Introduction' })
      expect(introLink).toHaveAttribute('href', '#introduction')
    })
  })

  it('has correct title', () => {
    render(<TableOfContents headings={mockHeadings} />)
    expect(screen.getByText('Table of Contents')).toBeInTheDocument()
  })
})

