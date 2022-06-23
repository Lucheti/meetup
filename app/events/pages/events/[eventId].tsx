import React from "react"
import { BlitzPage, useParam, useQuery } from "blitz"
import Layout from "app/core/layouts/Layout"
import getEvent from "app/events/queries/getEvent"
import { Card, Container, Grid, Paper } from "@mantine/core"
import { EventDetails } from "../../components/eventDetails/EventDetails"
import { InvitationLink } from "../../components/invitationLink/InvitationLink"
import { Location } from "../../components/location/Location"
import { EventDetailsStats } from "../../components/eventDetails/eventDetailsStats/EventDetailsStats"

export const Event = () => {
  const eventId = useParam("eventId", "string")
  const [event] = useQuery(getEvent, { id: eventId })

  return (
    <Grid gutter={"xl"} justify={"center"}>
      <Grid.Col span={12}>
        <InvitationLink eventId={eventId} />
      </Grid.Col>
      <Grid.Col xs={12} md={4} lg={6}>
        <EventDetails eventId={eventId} />
      </Grid.Col>
      <Grid.Col xs={12} md={4} lg={6}>
        <Location event={event} />
      </Grid.Col>
      <Grid.Col span={12}>
        <EventDetailsStats event={event} />
      </Grid.Col>
    </Grid>
  )
}

const ShowEventPage: BlitzPage = () => {
  return (
    <Container size={"lg"}>
      <Event />
    </Container>
  )
}

ShowEventPage.authenticate = true
ShowEventPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowEventPage
