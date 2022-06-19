import { Cache as ICache } from "./Cache"

export class InMemoryCache implements ICache {
  private cache: { [key: string]: any } = {}
  private ttl: number

  constructor(ttl: number) {
    this.ttl = ttl
  }

  get(key: string) {
    if (!this.has(key)) {
      return undefined
    }
    if (this.entryExpired(key)) {
      this.delete(key)
      return undefined
    }
    return this.cache[key].value
  }

  set(key: string, value: any) {
    this.cache[key] = { value, expires: Date.now() + this.ttl * 1000 }
    return value
  }

  has(key: string) {
    return this.cache[key] !== undefined && !this.entryExpired(key)
  }

  delete(key: string) {
    delete this.cache[key]
  }

  clear() {
    this.cache = {}
  }

  keys() {
    return Object.keys(this.cache)
  }

  entryExpired(key: string) {
    const value = this.cache[key]
    return value.expires < Date.now()
  }
}

export const Cache = new InMemoryCache(Number.MAX_SAFE_INTEGER)
