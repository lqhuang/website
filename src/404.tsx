export default function NotFound() {
  return (
    <div className="prose py-8">
      <h3>404 Not Found</h3>
      <p>Sorry that this page could not be found</p>
      <link href="/" fetchPriority="auto">
        Return to homepage
      </link>
    </div>
  )
}
