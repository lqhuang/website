export const dynamicParams = false
export const dynamic = 'force-static'
export const generateStaticParams = (): Params[] => {
  return [{ tag: 'dev' }, { tag: 'python' }]
}

type Params = {
  tag: string
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { tag } = await params
  return <p>🚧 WIP: {tag}</p>
}
