'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

const SyntaxHighlighter = dynamic(
  () =>
    import('react-syntax-highlighter').then((mod) => {
      const { Prism } = mod
      return Prism
    }),
  { ssr: false }
)


interface CodeViewerProps {
  code: string
  language: string
  filename?: string
}

export default function CodeViewer({ code, language, filename }: CodeViewerProps) {
  const [copied, setCopied] = useState(false)
  const [style, setStyle] = useState<any>(null)

  useEffect(() => {
    import('react-syntax-highlighter/dist/esm/styles/prism').then((mod) => {
      setStyle(mod.vscDarkPlus)
    })
  }, [])

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  if (!style) {
    return (
      <div className="relative">
        <div className="flex items-center justify-between bg-gray-800 text-gray-200 px-4 py-2 rounded-t-lg">
          {filename && <span className="text-sm font-mono">{filename}</span>}
          <button
            onClick={copyToClipboard}
            className="ml-auto px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm transition-colors"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <pre className="bg-gray-900 text-gray-100 p-4 rounded-b-lg overflow-x-auto">
          <code>{code}</code>
        </pre>
      </div>
    )
  }

  return (
    <div className="relative">
      <div className="flex items-center justify-between bg-gray-800 text-gray-200 px-4 py-2 rounded-t-lg">
        {filename && <span className="text-sm font-mono">{filename}</span>}
        <button
          onClick={copyToClipboard}
          className="ml-auto px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm transition-colors"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <SyntaxHighlighter
        language={language}
        style={style}
        customStyle={{
          margin: 0,
          borderRadius: '0 0 0.5rem 0.5rem',
        }}
        showLineNumbers
      >
        {code}
      </SyntaxHighlighter>
    </div>
  )
}

