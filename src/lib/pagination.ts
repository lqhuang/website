export const genPaginations = (
  container: Record<string, object>[],
  limit: number,
) => {
  return {
    total: container.length,
    numPages: Math.ceil(container.length / limit),
  }
}
