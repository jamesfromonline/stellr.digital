export const formatNum = x => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

export const abbrNum = (number, decPlaces) => {
  const abbreviations = ["K", "M", "B", "T"]
  decPlaces = Math.pow(10, decPlaces)
  for (let i = abbreviations.length - 1; i >= 0; i--) {
    const size = Math.pow(10, (i + 1) * 3)
    if (size <= number) {
      number = Math.round((number * decPlaces) / size) / decPlaces
      if (number === 1000) number = 1
      number += abbreviations[i]
    }
  }
  return number
}
