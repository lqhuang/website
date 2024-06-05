export const genPaginations = (
  container: Record<string, any>[],
  limit: number,
) => {
  return {
    total: container.length,
    numPages: Math.ceil(container.length / limit),
  }
}
