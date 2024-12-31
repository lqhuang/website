export default async function Page({ params }: { params: { tag: string } }) {
  const { tag } = await params

  return <h1>{tag}</h1>
}
