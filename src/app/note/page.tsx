import { redirect } from 'next/navigation'

export const dynamicParams = false

export default function Page({}) {
  redirect(`/notes/1`)
}
