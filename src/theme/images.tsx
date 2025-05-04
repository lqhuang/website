import type { FC, ComponentProps, ReactNode } from 'react'

import * as path from 'node:path'

import dynamic from 'next/dynamic'
import { imageSize } from 'image-size'
import Image from 'next/image'

import { BlockSideTitle } from 'src/components/block-sidetitle'
import { readFile } from 'node:fs/promises'

const EXTERNAL_URL_REGEX = /^https?:\/\//

export const Picture: FC<ComponentProps<'picture'>> = async props => {
  console.log('picture', props)
  return <picture {...props} className="inline-block" />
}

export type CustomImageProps = {
  src: string | Blob
  width: number
  height: number
  orientation?: number
  type?: string
}

async function getExternalImageProps(src: string): Promise<CustomImageProps> {
  'use cache'
  if (!EXTERNAL_URL_REGEX.test(src) || src.startsWith('/'))
    throw new Error('Only allowed external URLs')
  const buffer = await fetch(src).then(res => res.arrayBuffer())

  return {
    src,
    ...imageSize(new Uint8Array(buffer)),
  }
}
async function getLocalImageProps(src: string): Promise<CustomImageProps> {
  'use cache'
  const abs = path.resolve(src.toString())

  const buffer = await readFile(abs)
  const size = imageSize(new Uint8Array(buffer))

  const mimeType = `image/${size.type}`
  return {
    src: `data:${mimeType};base64,${buffer.toString('base64')}`,
    ...size,
  }
}

export const Video: FC<
  ComponentProps<'video'> & { src: string | undefined }
> = async ({ src, title, ...props }) => {
  return (
    <video title={title} controls loop autoPlay {...props}>
      Sorry, your browser doesn't support embedded videos.
      <source src={src} type="video/mp4" />
      <track kind="descriptions" />
    </video>
  )
}

export const Img: FC<ComponentProps<'img'>> = async ({
  src,
  alt,
  title,
  ...props
}) => {
  // console.log('img', src, alt, title, props)
  if (src === undefined) return null
  if (src instanceof Blob)
    throw new Error('type `Blob` for <img> is not implemented')

  // const ext = path.extname(src)
  if (src.endsWith('.mp4')) return <Video src={src} title={title} />

  const isExternal = EXTERNAL_URL_REGEX.test(src)
  const image = isExternal
    ? await getExternalImageProps(src)
    : await getLocalImageProps(src)

  const img = (
    <Image
      className="mt-7"
      src={image.src}
      alt={alt}
      quality={95}
      width={image.width}
      height={image.height}
      placeholder={isExternal ? 'blur' : undefined}
      draggable={false}
    />
  )

  if (title) return <BlockSideTitle title={title}>{img}</BlockSideTitle>
  else return img
}

export const SVG: FC<ComponentProps<'svg'>> = async ({ ...props }) => {
  console.error('svg', props)
  return <svg {...props} className="inline-block" />
}
