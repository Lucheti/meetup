import { BlitzPage, Routes, useMutation, useRouter } from "blitz"
import Layout from "app/core/layouts/Layout"
import createEvent from "app/events/mutations/createEvent"
import { EventForm } from "app/events/components/EventForm"
import { Container } from "@mantine/core"
import { CheckIcon } from "@modulz/radix-icons"
import { createLoadingNotification } from "../../../core/hooks/createLoadingNotification"
import { showNotification } from "@mantine/notifications"
import { EventVisibility } from "@prisma/client"

const NewEventPage: BlitzPage = () => {
  const router = useRouter()
  const [createEventMutation] = useMutation(createEvent)
  const withLoadingNotification = createLoadingNotification({
    loading: {
      title: "Creating event...",
      message: "Creating an awesome party...",
      loading: true,
    },
    success: {
      title: "Event created!",
      message: "Let's go! 🥳",
      loading: false,
      icon: <CheckIcon />,
      color: "teal",
      autoClose: 5000,
    },
    error: {
      title: "We have a problem",
      message: "Something went wrong. Please try again.",
    },
  })

  return (
    <Container size={"lg"}>
      <h1>Create Event</h1>

      <EventForm
        submitText="Create Event"
        // schema={CreateEvent}
        initialValues={{ paymentOptions: [], visibility: EventVisibility.Public }}
        onSubmit={async ({ ...values }) => {
          if (!values.images) {
            showNotification({
              title: "Missing image",
              message: "please add an image to your event",
            })
            return
          }
          try {
            const event = await withLoadingNotification(() => createEventMutation(values))
            await router.push(Routes.ShowEventPage({ eventId: event.id }))
          } catch (error: any) {
            console.error(error)
          }
        }}
      />
    </Container>
  )
}

NewEventPage.authenticate = true
NewEventPage.getLayout = (page) => <Layout title={"Create New Event"}>{page}</Layout>

export default NewEventPage
