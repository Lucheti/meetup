import { Link, Routes, usePaginatedQuery, useParam, useRouter } from "blitz"
import getEvents from "../queries/getEvents"
import { Grid, Pagination } from "@nextui-org/react"
import { EventCard } from "./EventCard"

const ITEMS_PER_PAGE = 12

export const EventsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ events, hasMore, count, nextPage }] = usePaginatedQuery(getEvents, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goTo = (page: number) => router.push({ query: { page } })

  return (
    <div>
      <Grid.Container gap={2} css={{ pl: 0, pr: 0 }}>
        {events.map((event) => (
          <Grid xs={12} sm={6} md={4} lg={4} key={event.id}>
            <EventCard event={event} />
          </Grid>
        ))}
      </Grid.Container>

      {/*<Pagination total={1} initialPage={0} onChange={goTo}/>;*/}
    </div>
  )
}
