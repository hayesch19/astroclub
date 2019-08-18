let missions = []
let currentIndex = 0

const unicorn = () => {
  nasaUrl()
  getMainImage()
  spaceXUrl()
  getLaunchInfo()
}

// Nasa API
const nasaUrl = nasaSite => {
  const NASA_API_URL = 'https://sdg-astro-api.herokuapp.com/api/Nasa/apod'
  return NASA_API_URL
}

// SpaceX API
const spaceXUrl = spaceXSite => {
  const SPACEX_API_URL =
    'https://sdg-astro-api.herokuapp.com/api/SpaceX/launches/upcoming'
  return SPACEX_API_URL
}

// Get NASA Image
const getMainImage = async nasaSite => {
  // eslint-disable-next-line no-undef
  const response = await fetch(nasaUrl(nasaSite))
  const nasaData = await response.json()

  console.log(nasaData)

  // Display Image
  const nasaImage = (document.querySelector(
    '.nasa-image'
  ).style.backgroundImage = `url(${nasaData.url})`)
  document.querySelector('.image-copyright').textContent =
    nasaData.copyright || 'no copyright'
  document.querySelector('.image-title').textContent = nasaData.title

  console.log(nasaImage)
}

// SpaceX Launch Info
const getLaunchInfo = async spaceXSite => {
  // eslint-disable-next-line no-undef
  const response = await fetch(spaceXUrl(spaceXSite))
  const spaceXInfo = await response.json()

  console.log(spaceXInfo)

  missions = spaceXInfo

  // Display Launch Info
  document.querySelector('.mission-name').textContent =
    missions[currentIndex].mission_name
  document.querySelector('.launch-info').textContent =
    missions[currentIndex].details || 'No description available yet.'
  document.querySelector('.location').textContent =
    missions[currentIndex].launch_site.site_name_long

  // Countdown Clock
  // eslint-disable-next-line space-before-function-paren
  const x = setInterval(function() {
    const now = new Date()
    const launchDate = new Date(missions[currentIndex].launch_date_utc)
    const diff = launchDate.getTime() - now.getTime()
    const secondsFromT1ToT2 = diff / 1e3
    let totalSeconds = Math.abs(secondsFromT1ToT2)
    if (secondsFromT1ToT2 < 0) {
      clearInterval(x)
      document.querySelector('.countdown').textContent = 'Launched!'
    } else {
      const time = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      }
      // Convert Time For Countdown
      time.days = Math.floor(totalSeconds / (60 * 60 * 24))
      totalSeconds = totalSeconds - time.days * 24 * 60 * 60
      time.hours = Math.floor(totalSeconds / (60 * 60))
      totalSeconds = totalSeconds - time.hours * 60 * 60
      time.minutes = Math.floor(totalSeconds / 60)
      totalSeconds = totalSeconds - time.minutes * 60
      time.seconds = Math.floor(totalSeconds)
      document.querySelector('.countdown').textContent =
        time.days +
        ' days, ' +
        time.hours +
        ' hours, ' +
        time.minutes +
        ' minutes, ' +
        time.seconds +
        ' seconds'
    }
  }, 1000)
}

// Next Mission Button
const nextMissionButton = () => {
  if (currentIndex > missions.length - 2) {
    currentIndex = 0
  } else {
    currentIndex++
  }
  getLaunchInfo()
}

// Previous Mission Button
const previousMissionButton = () => {
  if (currentIndex > 0) {
    currentIndex--
  } else {
    currentIndex = missions.length - 1
  }
  getLaunchInfo()
}
document.addEventListener('DOMContentLoaded', unicorn)
document
  .querySelector('.right-arrow')
  .addEventListener('click', nextMissionButton)
document
  .querySelector('.left-arrow')
  .addEventListener('click', previousMissionButton)
