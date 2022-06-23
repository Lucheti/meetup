import { BlitzPage, usePaginatedQuery } from "blitz"
import Layout from "app/core/layouts/Layout"
import getEvents from "../events/queries/getEvents"
import { NavigationBar } from "../core/components/navbar/Navbar"
import { Container, Grid, Space } from "@mantine/core"
import { EmailBanner } from "../core/components/home/EmailBanner"
import { TopEvents } from "../events/components/TopEvents"
import React from "react"
import { EventsList } from "../events/components/EventsList"
import { HeroTitle } from "../home/components/HeroTitle"
import { FeaturesGrid } from "../home/components/AppFeatures"
// import { EventsList } from "../events/components/EventsList"

const Home: BlitzPage = () => {
  return (
    <Container size={"xl"}>
      <HeroTitle />
      <FeaturesGrid
        title={"Create events like never before"}
        description={
          "With seamless event creation, you can create events in minutes. No more lengthy forms, no more long wait times. Sync your data with your customers and providers."
        }
      />
      <EmailBanner />
    </Container>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
