import { render, screen } from '@testing-library/react'
import Breadcrumbs from '../Breadcrumbs'
import { usePathname } from 'next/navigation'

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}))

describe('Breadcrumbs', () => {
  it('returns null when pathname is root', () => {
    ;(usePathname as jest.Mock).mockReturnValue('/')
    const { container } = render(<Breadcrumbs />)
    expect(container.firstChild).toBeNull()
  })

  it('renders breadcrumbs for /docs path', () => {
    ;(usePathname as jest.Mock).mockReturnValue('/docs')
    render(<Breadcrumbs />)
    
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Docs')).toBeInTheDocument()
  })

  it('renders breadcrumbs for nested path', () => {
    ;(usePathname as jest.Mock).mockReturnValue('/docs/01-introduction')
    render(<Breadcrumbs />)
    
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Docs')).toBeInTheDocument()
    expect(screen.getByText('01 Introduction')).toBeInTheDocument()
  })

  it('formats path segments correctly', () => {
    ;(usePathname as jest.Mock).mockReturnValue('/examples/01-basic-setup')
    render(<Breadcrumbs />)
    
    expect(screen.getByText('Examples')).toBeInTheDocument()
    expect(screen.getByText('01 Basic Setup')).toBeInTheDocument()
  })

  it('has correct aria-label for accessibility', () => {
    ;(usePathname as jest.Mock).mockReturnValue('/docs')
    render(<Breadcrumbs />)
    
    const nav = screen.getByLabelText('Breadcrumb')
    expect(nav).toBeInTheDocument()
  })
})

