import type { Image, Root } from 'mdast'
import type { Transformer } from 'unified'
import type { Visitor } from 'unist-util-visit'
import type { VFile } from 'vfile'

import * as path from 'node:path'

import { visit } from 'unist-util-visit'

const EXTERNAL_URL_REGEX = /^https?:\/\//

/**
 * Resolved image source (src) to the project root
 *
 * @param src - image source (relative to file)
 * @returns string - resolved image source
 */
export const ensureImportPath = (src: string, file: VFile) => {
  if (file.path === undefined)
    throw new Error(
      '`file.path` is undefined, you may forget to pass the real path to compile function',
    )
  const dirname = path.dirname(file.path)
  const to = path.resolve(dirname, src)
  const relative = path.relative(process.cwd(), to)
  return relative.startsWith('./') ? relative : `./${relative}`
}

export function remarkImageResolve(): Transformer<Root, Root> {
  return async (tree, file) => {
    const visitor: Visitor<Image> = node => {
      const url = decodeURI(node.url)
      // only resolve relative URLs to project root
      // console.log('url', url)
      // console.log('node', node)
      // console.log('file', file)
      const isExternal = EXTERNAL_URL_REGEX.test(url)
      const isPublicDir = url.startsWith('/')
      if (!isExternal && !isPublicDir) {
        // console.log('ensured', ensureImportPath(url, file))
        Object.assign(node, {
          ...node,
          url: ensureImportPath(url, file),
        })
      }
    }

    visit(tree, 'image', visitor)
  }
}
