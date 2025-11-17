import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'

export interface ExampleFile {
  name: string
  path: string
  content: string
  parsed?: any
}

export interface ExampleCategory {
  name: string
  path: string
  files: ExampleFile[]
}

// Examples YAML files are in website/content/examples
const examplesDirectory = path.join(process.cwd(), 'content', 'examples')

export function getExampleCategories(): ExampleCategory[] {
  if (!fs.existsSync(examplesDirectory)) {
    return []
  }

  const categories: ExampleCategory[] = []
  const entries = fs.readdirSync(examplesDirectory, { withFileTypes: true })

  for (const entry of entries) {
    if (entry.isDirectory()) {
      const categoryPath = path.join(examplesDirectory, entry.name)
      const files = fs.readdirSync(categoryPath)
        .filter((file) => file.endsWith('.yaml') || file.endsWith('.yml') || file.endsWith('.md') || file.endsWith('.mdx'))
        .map((file) => {
          const filePath = path.join(categoryPath, file)
          const content = fs.readFileSync(filePath, 'utf8')
          let parsed: any = null
          
          try {
            parsed = yaml.load(content)
          } catch (e) {
            // Invalid YAML, will be caught by validation
          }

          return {
            name: file,
            path: filePath,
            content,
            parsed,
          }
        })

      categories.push({
        name: entry.name,
        path: categoryPath,
        files,
      })
    }
  }

  return categories.sort((a, b) => {
    // Sort by directory name (e.g., 01-basic-setup comes before 02-path-routing)
    return a.name.localeCompare(b.name)
  })
}

export function getExampleFile(category: string, filename: string): ExampleFile | null {
  const filePath = path.join(examplesDirectory, category, filename)
  
  if (!fs.existsSync(filePath)) {
    return null
  }

  const content = fs.readFileSync(filePath, 'utf8')
  let parsed: any = null

  try {
    parsed = yaml.load(content)
  } catch (e) {
    // Invalid YAML
  }

  return {
    name: filename,
    path: filePath,
    content,
    parsed,
  }
}

export function getAllExampleFiles(): ExampleFile[] {
  const categories = getExampleCategories()
  return categories.flatMap((category) => category.files)
}

