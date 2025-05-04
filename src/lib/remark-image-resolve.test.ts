import * as path from 'node:path'

import { describe, expect, it } from 'vitest'
import { VFile } from 'vfile'

import { ensureImportPath } from './remark-image-resolve.js'

describe('ensureImportPath', () => {
  it('should return the correct import path', () => {
    const src = './img.png'
    const fpath = path.join(process.cwd(), 'public', src)
    const file = new VFile({ path: fpath })
    const relative = ensureImportPath(src, file)
    expect(relative).toBe('./public/img.png')
  })
})
