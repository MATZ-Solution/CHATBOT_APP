import STATES from "./states"

function toTitleCase(str: string): string {
    str = str.replace(/[-_]/g, ' ')
    str = str.replace(/([a-z])([A-Z])/g, '$1 $2')
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    })
  }
  const normalizeState = (state: string): string => {
    state = state.trim()
    const upperState = state.toUpperCase()
  
   
    return upperState.length === 2 && upperState in STATES ? STATES[upperState] : toTitleCase(state)
  }
  
  interface JsonData {
    name: string
    fullAddress: string
    city: string
    state: string
    zipCode: string
    mainCategory: string
    scrapedAverageRating?: {
      stars: number
    }
  }
  
  const templatize = (json: JsonData, index: number): string => {
    let { name, fullAddress, city, state, zipCode, mainCategory: category } = json
  
    name = toTitleCase(name)
    fullAddress = toTitleCase(fullAddress)
    city = toTitleCase(city)
    state = toTitleCase(state)
    category = toTitleCase(category)
  
    return `
    <li class="py-1">
      <h2>${index + 1}. <b>${name}</b></h2>
      <ul class="pl-4">
        <li>
          <b>Address:</b> ${fullAddress}, ${city}, ${state} ${zipCode}
        </li>
        <li>
          <b>Category:</b> ${category}
        </li>
        <li>
          <b>Rating:</b> ${json.scrapedAverageRating ? json.scrapedAverageRating.stars.toFixed(2) : 'N/A'}
        </li>
      </ul>
    </li>
    `
  }
  
  const getLocation = (): void => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition)
    } else {
      console.error('Geolocation is not supported by this browser.')
    }
  }
  
  const showPosition = (position: GeolocationPosition): void => {
    const { postalCode, city, country } = position.coords as any // You may need to handle this based on how the `position` object is structured in your use case.
    alert(postalCode)
    alert(city)
    alert(country)
  }
  
  export { toTitleCase, normalizeState, templatize, getLocation }