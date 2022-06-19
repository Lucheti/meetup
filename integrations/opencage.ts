import { Cache } from "./cache/InMemoryCache"

export type Geolocation = {
  lat: number
  lng: number
}

type ApiResponse = {
  results: {
    geometry: Geolocation
    formatted: string
  }[]
}

export class OpencageApi {
  static async getGeolocationFromLocation(location: string): Promise<Geolocation> {
    if (Cache.has(location)) return Cache.get(location)
    if (!location) return { lat: 0, lng: 0 }

    console.log(`fetching geolocation from ${location}`)
    const response = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${location}&key=582bdc9ce7464574bb57b85614f9806c&no_annotations=1&language=es`
    )
    const json = await response.json()
    const result = json?.results[0]?.geometry
    Cache.set(location, result)
    return result
  }

  static async getLocationFromGeolocation({ lat, lng }: Geolocation): Promise<string> {
    const result = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=582bdc9ce7464574bb57b85614f9806c&no_annotations=1&language=es`
    )
    const json = await result.json()
    return json.results[0].formatted
  }
}
