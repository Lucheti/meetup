import { Suspense, useEffect } from "react"
import { BlitzPage, Head, Routes, useMutation, useParam, useQuery, useRouter } from "blitz"
import Layout from "app/core/layouts/Layout"
import getEvent from "app/events/queries/getEvent"
import updateEvent from "app/events/mutations/updateEvent"
import { EventForm } from "app/events/components/EventForm"
import { Container } from "@mantine/core"
import { showNotification } from "@mantine/notifications"
import { useCurrentUser } from "../../../../core/hooks/useCurrentUser"
import { UpdateEvent } from "../../../validations"
import { createLoadingNotification } from "../../../../core/hooks/createLoadingNotification"
import { CheckIcon } from "@modulz/radix-icons"

export const EditEvent = () => {
  const router = useRouter()
  const eventId = useParam("eventId", "string")
  const user = useCurrentUser()
  const [event, { setQueryData }] = useQuery(
    getEvent,
    { id: eventId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateEventMutation] = useMutation(updateEvent)
  const withLoadingNotification = createLoadingNotification({
    loading: {
      title: "Updating...",
      message: "Updating your event",
      loading: true,
    },
    success: {
      message: "Event updated!",
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

  const eventFormValues = {
    ...event,
    date: event.date,
    time: event.date,
    location: {
      alias: event?.location?.alias,
      coords: {
        lat: event?.location?.latitude,
        lng: event?.location?.longitude,
      },
    },
    coords: {
      lat: event?.location?.latitude,
      lng: event?.location?.longitude,
    },
  }

  useEffect(() => {
    if (event && user && event?.owner?.id !== user?.id) {
      router.push(Routes.Home())
    }
  }, [event, user])

  return (
    <>
      <Head>
        <title>Edit Event {event.id}</title>
      </Head>

      <Container size={"lg"}>
        <EventForm
          submitText="Update Event"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          schema={UpdateEvent}
          // @ts-ignore
          initialValues={eventFormValues}
          onSubmit={async (values) => {
            try {
              const updated = await withLoadingNotification(() => updateEventMutation(values))
              await setQueryData(updated)
              await router.push(Routes.ShowEventPage({ eventId: updated.id }))
            } catch (error: any) {
              console.error(error)
              showNotification({
                title: "Error updating event",
                message: error.message,
                color: "red",
              })
            }
          }}
        />
      </Container>
    </>
  )
}

const EditEventPage: BlitzPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditEvent />
    </Suspense>
  )
}

EditEventPage.authenticate = true
EditEventPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditEventPage
