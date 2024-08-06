interface ApiResponse<T = void> {
  data?: T
}

export async function postData<T, R = ApiResponse>(
  url: string,
  data: T,
): Promise<R> {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error("Network response was not ok")
  }

  const responseData: R = await response.json()
  return responseData
}
