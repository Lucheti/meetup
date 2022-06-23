import { Routes, usePaginatedQuery, useRouter } from "blitz"
import getEvents from "../queries/getEvents"
import { EventCard } from "./EventCard"
import { Grid, Group, Pagination, Space, TextInput } from "@mantine/core"
import React, { useState } from "react"
import { Search } from "tabler-icons-react"
import { useDebouncedValue } from "@mantine/hooks"
import { EmptyPage } from "../../core/components/error-handling/EmptyPage"
import getMyEvents from "../queries/getMyEvents"

const ITEMS_PER_PAGE = 12

export const MyEventsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) - 1 || 0
  const [search, setSearch] = useState("")
  const [debouncedSearch] = useDebouncedValue(search, 200)
  const [{ events, hasMore, count, nextPage }] = usePaginatedQuery(getMyEvents, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
    where: {
      OR: [
        { name: { contains: debouncedSearch, mode: "insensitive" } },
        { owner: { name: { contains: debouncedSearch, mode: "insensitive" } } },
        { owner: { username: { contains: debouncedSearch, mode: "insensitive" } } },
      ],
    },
  })

  const goTo = (page: number) => router.push({ query: { page } })
  const totalPages = Math.ceil(count / ITEMS_PER_PAGE)
  let content

  if (count === 0)
    content = (
      <EmptyPage
        code={"OOPS!"}
        title={"No events have been created yet."}
        description={"Be the first to create an event!"}
        button={{ text: "Create an event", onClick: () => router.push(Routes.NewEventPage()) }}
      />
    )
  else
    content = (
      <>
        <Space h={"xl"} />
        <Grid gutter={"xl"}>
          {events.map((event) => (
            <Grid.Col xs={12} sm={12} md={6} lg={4} key={event.id}>
              <EventCard event={event} />
            </Grid.Col>
          ))}
        </Grid>

        <Group align={"center"} position={"center"} mt={"xl"}>
          <Pagination page={page + 1} onChange={goTo} total={totalPages} />
        </Group>
      </>
    )
  return (
    <div>
      <TextInput
        placeholder="Search by event name or owner"
        mb="md"
        size={"lg"}
        icon={<Search size={14} />}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {content}
    </div>
  )
}
