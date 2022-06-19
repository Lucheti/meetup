import React, { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getEvent from "app/events/queries/getEvent"
import deleteEvent from "app/events/mutations/deleteEvent"
import { Avatar, Container, createStyles, Grid } from "@mantine/core"
import { EventDetails } from "../../components/eventDetails/EventDetails"
import { maptiler } from "pigeon-maps/providers"
import { Map, Overlay } from "pigeon-maps"
import { Location } from "tabler-icons-react"

const useStyles = createStyles((theme) => ({
  map: {
    borderRadius: theme.radius.md,
  },
  marker_point: {
    transform: "translate(5px,-10px)",
    width: 0,
    height: 0,
    border: "23px solid transparent",
    borderRight: "23px solid transparent",
    borderTop: "23px solid white",
    zIndex: 1,
  },
  marker: {
    zIndex: 2,
    border: "2px solid white",
  },
}))

export const Event = () => {
  const router = useRouter()
  const eventId = useParam("eventId", "string")
  const [deleteEventMutation] = useMutation(deleteEvent)
  const [event] = useQuery(getEvent, { id: eventId })
  const { classes } = useStyles()

  return (
    <Grid gutter={"xl"}>
      <Grid.Col xs={12} md={6} lg={4}>
        <EventDetails eventId={eventId} />
      </Grid.Col>
      <Grid.Col xs={12} md={6} lg={8}>
        <Map
          provider={maptiler("EW0wjl9ko1WAO0rnFzb0", "pastel")}
          height={300}
          center={[event?.location?.latitude || 0, event?.location?.longitude || 0]}
          zoom={17}
        >
          <Overlay anchor={[event?.location?.latitude || 0, event?.location?.longitude || 0]}>
            <div className={classes.marker_point} />
          </Overlay>
        </Map>
      </Grid.Col>
    </Grid>
  )
}

const ShowEventPage: BlitzPage = () => {
  return (
    <Container size={"xl"}>
      <Event />
    </Container>
  )
}

ShowEventPage.authenticate = true
ShowEventPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowEventPage
