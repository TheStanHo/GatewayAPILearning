# Testing Guide

This project uses [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/react) for unit testing.

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode (useful during development)
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

## Test Structure

Tests are located next to the components/utilities they test:

```
src/
  components/
    navigation/
      __tests__/
        Breadcrumbs.test.tsx
        Header.test.tsx
    diagrams/
      __tests__/
        GatewayFlow.test.tsx
  lib/
    __tests__/
      markdown.test.ts
```

## Writing Tests

### Component Tests

Test user interactions, rendering, and accessibility:

```typescript
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import MyComponent from '../MyComponent'

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })

  it('handles user interactions', async () => {
    const user = userEvent.setup()
    render(<MyComponent />)
    
    const button = screen.getByRole('button')
    await user.click(button)
    
    expect(screen.getByText('Clicked')).toBeInTheDocument()
  })
})
```

### Utility Function Tests

Test pure functions with various inputs:

```typescript
import { myFunction } from '../myFunction'

describe('myFunction', () => {
  it('handles valid input', () => {
    expect(myFunction('input')).toBe('expected output')
  })

  it('handles edge cases', () => {
    expect(myFunction('')).toBe('')
    expect(myFunction(null)).toBeNull()
  })
})
```

## Best Practices

1. **Test user behavior, not implementation details**
2. **Use semantic queries** (`getByRole`, `getByLabelText`) over `getByTestId`
3. **Test accessibility** - ensure components are accessible
4. **Keep tests simple** - one assertion per test when possible
5. **Mock external dependencies** - use Jest mocks for Next.js router, file system, etc.

## Coverage Goals

- Aim for 80%+ code coverage
- Focus on critical paths and user-facing features
- Don't test implementation details

## Common Patterns

### Mocking Next.js Router

```typescript
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/test'),
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}))
```

### Mocking File System

```typescript
jest.mock('fs', () => ({
  existsSync: jest.fn(),
  readFileSync: jest.fn(),
}))
```

