'use client'

import { CopyButton } from './CopyButton'

interface CodeBlockProps {
  children?: React.ReactNode
  className?: string
  [key: string]: any
}

export function CodeBlock({ children, className = '', ...props }: CodeBlockProps) {
  // Extract language from className (e.g., "language-yaml" -> "yaml")
  const language = className.replace('language-', '') || 'text'
  
  // Get code content
  const code = typeof children === 'string' 
    ? children 
    : (Array.isArray(children) ? children.join('') : String(children || ''))

  return (
    <div className="relative group">
      <pre className={`${className} bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4`} {...props}>
        <code>{children}</code>
      </pre>
      <CopyButton code={code} />
    </div>
  )
}

