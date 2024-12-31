export const dynamicParams = false
export const dynamic = 'force-static'
export const generateStaticParams = () => {
  return [{ params: { tag: 'WIP' } }]
}

export default async function Page({ params }: { params: { tag: string } }) {
  const { tag } = await params

  return <h1>{tag}</h1>
}
