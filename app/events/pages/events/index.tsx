import React from "react"
import { BlitzPage, useParam } from "blitz"
import Layout from "app/core/layouts/Layout"
import { Container, createStyles, Grid, Paper, Space } from "@mantine/core"
import { EventsList } from "../../components/EventsList"
import { EventPageBanner } from "../../components/banners/EventPageBanner"

const EventsPage: BlitzPage = () => {
  return (
    <Container size={"xl"}>
      <Grid gutter={"xl"}>
        <Grid.Col xs={12} md={9} lg={9}>
          <EventsList />
        </Grid.Col>

        <Grid.Col xs={12} md={3} lg={3}>
          <EventPageBanner />
        </Grid.Col>
      </Grid>
    </Container>
  )
}

EventsPage.authenticate = true
EventsPage.getLayout = (page) => <Layout>{page}</Layout>

export default EventsPage
