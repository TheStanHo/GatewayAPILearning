import { render, screen } from '@testing-library/react'
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

  it('renders correct heading levels', () => {
    const { container } = render(<TableOfContents headings={mockHeadings} />)
    
    const h2Links = container.querySelectorAll('li.font-medium')
    const h3Links = container.querySelectorAll('li.ml-4')
    
    expect(h2Links.length).toBeGreaterThan(0)
    expect(h3Links.length).toBeGreaterThan(0)
  })

  it('creates correct anchor links', () => {
    render(<TableOfContents headings={mockHeadings} />)
    
    const introLink = screen.getByText('Introduction')
    expect(introLink).toHaveAttribute('href', '#introduction')
  })

  it('has correct title', () => {
    render(<TableOfContents headings={mockHeadings} />)
    expect(screen.getByText('Table of Contents')).toBeInTheDocument()
  })
})

