import { redirect } from 'next/navigation'

export const dynamicParams = false

export const generateStaticParams = async () => {
  return [
    { params: { collection: 'post' } },
    { params: { collection: 'digest' } },
  ]
}

export default function Page({ params }: { params: { collection: string } }) {
  redirect(`/${params.collection}s`)
}
