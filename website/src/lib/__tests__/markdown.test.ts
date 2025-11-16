import { getDocSlugs, getDocBySlug, getAllDocs } from '../markdown'
import fs from 'fs'
import path from 'path'

// Mock fs module
jest.mock('fs', () => ({
  existsSync: jest.fn(),
  readdirSync: jest.fn(),
  readFileSync: jest.fn(),
  statSync: jest.fn(),
}))

// Mock remark and related modules
jest.mock('remark', () => ({
  remark: jest.fn(() => ({
    use: jest.fn().mockReturnThis(),
    processSync: jest.fn(() => ({
      toString: () => '<p>Test HTML</p>',
    })),
  })),
}))

jest.mock('remark-html', () => ({}))
jest.mock('remark-gfm', () => ({}))

// Mock gray-matter
jest.mock('gray-matter', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    data: { title: 'Test Title' },
    content: '# Test Content',
  })),
}))

describe('markdown utilities', () => {
  const mockDocsDirectory = path.join(process.cwd(), '../Documentation')

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('getDocSlugs', () => {
    it('returns empty array when directory does not exist', () => {
      ;(fs.existsSync as jest.Mock).mockReturnValue(false)
      expect(getDocSlugs()).toEqual([])
    })

    it('returns filtered and mapped slugs', () => {
      ;(fs.existsSync as jest.Mock).mockReturnValue(true)
      ;(fs.readdirSync as jest.Mock).mockReturnValue([
        '01-introduction.md',
        '02-core-concepts.md',
        'README.md',
        'not-a-md-file.txt',
      ])

      const slugs = getDocSlugs()
      expect(slugs).toEqual(['01-introduction', '02-core-concepts'])
      expect(slugs).not.toContain('README')
      expect(slugs).not.toContain('not-a-md-file')
    })
  })

  describe('getDocBySlug', () => {
    it('returns null when file does not exist', () => {
      ;(fs.existsSync as jest.Mock).mockReturnValue(false)
      expect(getDocBySlug('non-existent')).toBeNull()
    })

    it('returns markdown content when file exists', () => {
      const mockContent = '---\ntitle: Test\n---\n# Content'
      ;(fs.existsSync as jest.Mock).mockReturnValue(true)
      ;(fs.readFileSync as jest.Mock).mockReturnValue(mockContent)

      const result = getDocBySlug('test-slug')
      
      expect(result).not.toBeNull()
      expect(result?.slug).toBe('test-slug')
      expect(result?.data.title).toBe('Test Title')
    })
  })

  describe('getAllDocs', () => {
    it('returns array of all docs', () => {
      ;(fs.existsSync as jest.Mock).mockReturnValue(true)
      ;(fs.readdirSync as jest.Mock).mockReturnValue([
        '01-introduction.md',
        '02-core-concepts.md',
      ])
      ;(fs.readFileSync as jest.Mock).mockReturnValue('---\ntitle: Test\n---\n# Content')

      const docs = getAllDocs()
      expect(docs).toHaveLength(2)
      expect(docs[0].slug).toBe('01-introduction')
      expect(docs[1].slug).toBe('02-core-concepts')
    })
  })
})

