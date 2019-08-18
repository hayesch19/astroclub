const unicorn = () => {
  nasaUrl()
  getMainImage()
  spaceXUrl()
  getLaunchCard()
}

// Nasa API
const nasaUrl = nasaSite => {
  const API_URL = 'https://sdg-astro-api.herokuapp.com/api/Nasa/apod'
  return API_URL
}

// SpaceX API
const spaceXUrl = spaceXSite => {
  const SPACE_API_URL =
    'https://sdg-astro-api.herokuapp.com/api/SpaceX/launches/upcoming'
  return SPACE_API_URL
}

// Get NASA Image
const getMainImage = async nasaSite => {
  // eslint-disable-next-line no-undef
  const response = await fetch(nasaUrl(nasaSite))
  const nasaData = await response.json()

  console.log(nasaData)
}

// SpaceX Launch Info
const getLaunchCard = async spaceXSite => {
  // eslint-disable-next-line no-undef
  const response = await fetch(spaceXUrl(spaceXSite))
  const spaceXData = await response.json()

  console.log(spaceXData)
}
document.addEventListener('DOMContentLoaded', unicorn)
