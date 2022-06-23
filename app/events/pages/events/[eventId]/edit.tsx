import { Suspense, useEffect } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getEvent from "app/events/queries/getEvent"
import updateEvent from "app/events/mutations/updateEvent"
import { EventForm, FORM_ERROR } from "app/events/components/EventForm"
import dayjs from "dayjs"
import { Container } from "@mantine/core"
import { showNotification } from "@mantine/notifications"
import { useCurrentUser } from "../../../../core/hooks/useCurrentUser"

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

  const eventFormValues = {
    ...event,
    date: event.date,
    time: event.date,
    location: event?.location?.alias,
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
          // schema={UpdateEvent}
          initialValues={eventFormValues}
          onSubmit={async ({ date, time, location, coords, ...values }) => {
            const combinedDate = dayjs(date)
              .set("hour", time.getHours())
              .set("minute", time.getMinutes())
              .toDate()
            try {
              const updated = await updateEventMutation({
                id: event.id,
                ...values,
                location: {
                  ...coords,
                  alias: location,
                },
                date: combinedDate,
              })
              console.log("UPDATED: ", updated)
              await setQueryData(updated)
              router.push(Routes.ShowEventPage({ eventId: updated.id }))
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
