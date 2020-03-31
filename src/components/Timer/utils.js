export const saveInfo = (toRememberImgArray, toGuessImgArray) => {
  const parsed = JSON.stringify(toGuessImgArray)
  localStorage.setItem('toGuessImg', parsed)
  const parsed2 = JSON.stringify(toRememberImgArray)
  localStorage.setItem('toRememberImg', parsed2)
}
