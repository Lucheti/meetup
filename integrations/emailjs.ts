import fetch from "node-fetch"

//todo: get this from env
const EMAIL_API_URL = "https://api.emailjs.com/api/v1.0/email/send"
const service_id = "meetup_email_service"
const user_id = "FOnrb0s5xyNIK6rEb"
const accessToken = "GIYt2D8uceTKvf_09UKj5"

export class EmailSender {
  static send<T>(template_params: T, template_id: string) {
    fetch(EMAIL_API_URL, {
      method: "POST",
      body: JSON.stringify({
        service_id,
        template_id,
        user_id,
        template_params,
        accessToken,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
  }
}
