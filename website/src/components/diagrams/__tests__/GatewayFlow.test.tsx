import { render, screen } from '@testing-library/react'
import GatewayFlow from '../GatewayFlow'

describe('GatewayFlow', () => {
  it('renders the diagram title', () => {
    render(<GatewayFlow />)
    expect(screen.getByText('Gateway API Traffic Flow')).toBeInTheDocument()
  })

  it('renders all flow components', () => {
    render(<GatewayFlow />)
    
    expect(screen.getByText('Client')).toBeInTheDocument()
    expect(screen.getByText('Gateway')).toBeInTheDocument()
    expect(screen.getByText('HTTPRoute')).toBeInTheDocument()
    expect(screen.getByText('Service')).toBeInTheDocument()
    expect(screen.getByText('Pods')).toBeInTheDocument()
  })

  it('renders description text', () => {
    render(<GatewayFlow />)
    expect(
      screen.getByText(/Traffic flows from Client through Gateway/)
    ).toBeInTheDocument()
  })

  it('renders NGINX Ingress equivalent section', () => {
    render(<GatewayFlow />)
    expect(
      screen.getByText(/NGINX Ingress Controller Equivalent/)
    ).toBeInTheDocument()
  })

  it('has correct structure and classes', () => {
    const { container } = render(<GatewayFlow />)
    const mainDiv = container.firstChild as HTMLElement
    
    expect(mainDiv).toHaveClass('w-full', 'max-w-5xl', 'mx-auto')
  })
})

