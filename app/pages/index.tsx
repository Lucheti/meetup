import { BlitzPage, usePaginatedQuery } from "blitz"
import Layout from "app/core/layouts/Layout"
import getEvents from "../events/queries/getEvents"
import { NavigationBar } from "../core/components/navbar/Navbar"
import { Container, Grid, Space } from "@mantine/core"
import { EmailBanner } from "../core/components/home/EmailBanner"
import { TopEvents } from "../events/components/TopEvents"
import React from "react"
import { EventsList } from "../events/components/EventsList"
// import { EventsList } from "../events/components/EventsList"

const Home: BlitzPage = () => {
  return (
    <Container size={"xl"}>
      <Grid gutter={"xl"}>
        <Grid.Col xs={12} md={9} lg={9}>
          <Space h={"lg"} />
        </Grid.Col>
        <Grid.Col xs={12} md={3} lg={3}>
          <TopEvents />
        </Grid.Col>

        <Grid.Col span={12}>
          <EmailBanner />
        </Grid.Col>
      </Grid>
    </Container>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
