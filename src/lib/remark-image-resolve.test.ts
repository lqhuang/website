import * as path from 'node:path'

import { describe, expect, it } from 'vitest'
import { VFile } from 'vfile'

import { ensureImportPath } from './remark-image-resolve.js'

describe('ensureImportPath', () => {
  it('should return the correct import path', () => {
    const src = './img.png'
    const dirname = path.join(process.cwd(), 'public')
    const file = new VFile({ path: dirname })
    const relative = ensureImportPath(src, file)
    expect(relative).toBe('./public/img.png')
  })
})
