import { render, screen } from '@testing-library/react'
import GatewayRelationships from '../GatewayRelationships'

describe('GatewayRelationships', () => {
  it('renders the diagram title', () => {
    render(<GatewayRelationships />)
    expect(screen.getByText('Gateway API Resource Relationships')).toBeInTheDocument()
  })

  it('renders all resource types', () => {
    render(<GatewayRelationships />)
    
    // Use getAllByText since these appear multiple times (in diagram and equivalents section)
    expect(screen.getAllByText('GatewayClass').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Gateway').length).toBeGreaterThan(0)
    expect(screen.getAllByText('HTTPRoute').length).toBeGreaterThan(0)
  })

  it('renders resource descriptions', () => {
    render(<GatewayRelationships />)
    
    expect(screen.getByText('Defines controller type')).toBeInTheDocument()
    expect(screen.getByText('Network entry point')).toBeInTheDocument()
    expect(screen.getByText('Routing rules')).toBeInTheDocument()
  })

  it('renders NGINX Ingress equivalents section', () => {
    render(<GatewayRelationships />)
    expect(
      screen.getByText(/NGINX Ingress Controller Equivalents/)
    ).toBeInTheDocument()
  })

  it('has correct structure', () => {
    const { container } = render(<GatewayRelationships />)
    const mainDiv = container.firstChild as HTMLElement
    
    expect(mainDiv).toHaveClass('w-full', 'max-w-5xl', 'mx-auto')
  })
})

