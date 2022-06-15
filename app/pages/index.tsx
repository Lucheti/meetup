import { BlitzPage, usePaginatedQuery } from "blitz"
import Layout from "app/core/layouts/Layout"
import { Topbar } from "../core/components/topbar"
import { Card, Col, Container, Grid, Spacer, Text } from "@nextui-org/react"
import getEvents from "../events/queries/getEvents"
import { EventsList } from "../events/components/EventsList"
import { TopEventsTable } from "../events/components/TopEventsTable"

const Home: BlitzPage = () => {
  const [{ events, hasMore }] = usePaginatedQuery(getEvents, {
    orderBy: { id: "asc" },
  })

  return (
    <div>
      <Topbar />

      <Container xl>
        <Grid.Container gap={3}>
          <Grid xs={12} sm={7} md={7} lg={7}>
            <Col>
              {/*<HomeHeroCard/>*/}
              <Spacer y={3} />
              <Text h2 color={"$blue900"}>
                {" "}
                Featured events{" "}
              </Text>
              <EventsList />
            </Col>
          </Grid>

          <Grid xs={12} sm={5} md={5} lg={5}>
            <Col>
              <Card css={{ p: 20, h: "fit-content" }}>
                <Text h2 color={"$blue900"}>
                  {" "}
                  Top events{" "}
                </Text>
                <TopEventsTable />
              </Card>
              <Spacer y={2} />

              <Card css={{ p: 20, h: "fit-content" }}>
                <Text h2 color={"$blue900"}>
                  {" "}
                  Top events{" "}
                </Text>
                <TopEventsTable />
              </Card>
            </Col>
          </Grid>
        </Grid.Container>
      </Container>
    </div>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
