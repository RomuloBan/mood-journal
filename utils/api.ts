const createURL = (path: string): string => {
  return `${window.location.origin}${path}`
}

export const createNewEntry = async () => {
  const response = await fetch(createURL("/api/journal"), {
      method: "POST",
  })
  if (response.ok) {
      const { data } = await response.json()
      return data
  }
}