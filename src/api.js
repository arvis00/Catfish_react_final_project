const baseUrl = 'https://api.unsplash.com/photos'

export const GET = async endpoint => {
  const response = await fetch(baseUrl + endpoint)
  return await response.json()
}

export const getRandomPhotos = async numberOfPhotos =>
  await GET(
    `/random?client_id=KdhCvP8tXfN1Byw49YkwKeDjHe5oa8fpZS2YGgmTYIM&count=${numberOfPhotos}`
  )

export const getSearchedPhotos = async (numberOfPhotos, searchValue) =>
  await GET(
    `/random?client_id=KdhCvP8tXfN1Byw49YkwKeDjHe5oa8fpZS2YGgmTYIM&count=${numberOfPhotos}&query=${searchValue}`
  )
