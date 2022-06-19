const BASE_URL = process.env.BLITZ_PUBLIC_STRAPI_API_URL

type StrapiUploadResponse = {
  id: string
  url: string
  formats: {
    medium: { url: string }
    small: { url: string }
    thumbnail: { url: string }
  }
}

export class StrapiApi {
  static uploadImage(form: FormData): Promise<StrapiUploadResponse[]> {
    return fetch(`${BASE_URL}/api/upload`, {
      method: "POST",
      body: form,
    }).then((response) => response.json())
  }
}
