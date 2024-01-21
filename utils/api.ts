const createURL = (path: string): string => {
  return `${window.location.origin}${path}`
}

export const updateEntry = async (id: string, content: string) => {
  const res = await fetch(
    new Request(createURL(`/api/journal/${id}`), {
      method: 'PATCH',
      body: JSON.stringify({ content }),
    })
  )

  if (res.ok) {
    const { data } = await res.json()
    return data
  }
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