import React from "react"
import { BlitzPage, useParam } from "blitz"
import Layout from "app/core/layouts/Layout"
import { Container, createStyles, Grid, Paper, Space } from "@mantine/core"
import { EventsList } from "../../components/EventsList"
import { EventPageBanner } from "../../components/banners/EventPageBanner"
import { MyEventsList } from "../../components/MyEventsList"

const MyEventsPage: BlitzPage = () => {
  return (
    <Container size={"xl"}>
      <Grid gutter={"xl"}>
        <Grid.Col xs={12} md={9} lg={9}>
          <MyEventsList />
        </Grid.Col>
      </Grid>
    </Container>
  )
}

MyEventsPage.authenticate = true
MyEventsPage.getLayout = (page) => <Layout>{page}</Layout>

export default MyEventsPage
