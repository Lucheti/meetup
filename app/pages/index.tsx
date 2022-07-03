import { BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import { Container } from "@mantine/core"
import { EmailBanner } from "../core/components/home/EmailBanner"
import React from "react"
import { HeroTitle } from "../home/components/HeroTitle"
import { FeaturesGrid } from "../home/components/AppFeatures"

const Home: BlitzPage = () => {
  return (
    <Container fluid p={0}>
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
