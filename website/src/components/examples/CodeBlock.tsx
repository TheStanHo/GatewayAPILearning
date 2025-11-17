'use client'

import dynamic from 'next/dynamic'

const CodeViewer = dynamic(
  () => import('@/components/code-viewer/CodeViewer'),
  { ssr: false }
)

interface CodeBlockProps {
  filename: string
  content: string
}

export function CodeBlock({ filename, content }: CodeBlockProps) {
  const language = filename.endsWith('.yaml') || filename.endsWith('.yml') ? 'yaml' : 'text'
  
  return <CodeViewer code={content} language={language} filename={filename} />
}

