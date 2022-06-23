import { BlitzPage, Link, Routes, useMutation, useRouter } from "blitz"
import Layout from "app/core/layouts/Layout"
import createEvent from "app/events/mutations/createEvent"
import { EventForm, FORM_ERROR } from "app/events/components/EventForm"
import { Container } from "@mantine/core"
import dayjs from "dayjs"
import { showNotification, updateNotification } from "@mantine/notifications"
import { useEffect } from "react"
import { CheckIcon } from "@modulz/radix-icons"

const NewEventPage: BlitzPage = () => {
  const router = useRouter()
  const [createEventMutation] = useMutation(createEvent)

  return (
    <Container size={"lg"}>
      <h1>Create New Event</h1>

      <EventForm
        submitText="Create Event"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateEvent}
        // initialValues={{}}
        onSubmit={async ({ date, time, location, coords, ...values }) => {
          console.log(values)
          const combinedDate = dayjs(date)
            .set("hour", time.getHours())
            .set("minute", time.getMinutes())
            .toDate()
          const notificationId = "create-event-notification"
          try {
            showNotification({
              id: notificationId,
              title: "Creating event...",
              message: "This may take a few seconds...",
              loading: true,
            })
            const event = await createEventMutation({
              ...values,
              location: {
                ...coords,
                alias: location,
              },
              date: combinedDate,
            })
            updateNotification({
              id: notificationId,
              title: "Event created!",
              message: "Let's go! 🥳",
              loading: false,
              icon: <CheckIcon />,
              color: "teal",
              autoClose: false,
            })
            router.push(Routes.ShowEventPage({ eventId: event.id }))
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />
    </Container>
  )
}

NewEventPage.authenticate = true
NewEventPage.getLayout = (page) => <Layout title={"Create New Event"}>{page}</Layout>

export default NewEventPage
