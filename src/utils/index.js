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

export const decorateNumber = num => {
  if (num >= 10000) {
    return abbrNum(num, 0)
  } else if (num >= 1000 && num < 10000) {
    return formatNum(num)
  } else {
    return num
  }
}
