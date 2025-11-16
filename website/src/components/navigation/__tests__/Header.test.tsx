import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Header from '../Header'

describe('Header', () => {
  it('renders the site title', () => {
    render(<Header />)
    expect(screen.getByText('Gateway API Learning')).toBeInTheDocument()
  })

  it('renders search input', () => {
    render(<Header />)
    const searchInput = screen.getByPlaceholderText('Search documentation...')
    expect(searchInput).toBeInTheDocument()
  })

  it('updates search query on input change', async () => {
    const user = userEvent.setup()
    render(<Header />)
    
    const searchInput = screen.getByPlaceholderText('Search documentation...')
    await user.type(searchInput, 'gateway')
    
    expect(searchInput).toHaveValue('gateway')
  })

  it('renders external links', () => {
    render(<Header />)
    
    const officialDocsLink = screen.getByText('Official Docs')
    const nginxDocsLink = screen.getByText('NGINX Docs')
    
    expect(officialDocsLink).toHaveAttribute('href', 'https://gateway-api.sigs.k8s.io/')
    expect(officialDocsLink).toHaveAttribute('target', '_blank')
    expect(officialDocsLink).toHaveAttribute('rel', 'noopener noreferrer')
    
    expect(nginxDocsLink).toHaveAttribute('href', 'https://docs.nginx.com/nginx-gateway-fabric/')
    expect(nginxDocsLink).toHaveAttribute('target', '_blank')
  })

  it('has correct structure and classes', () => {
    render(<Header />)
    const header = screen.getByRole('banner')
    expect(header).toHaveClass('sticky', 'top-0', 'z-20')
  })
})

