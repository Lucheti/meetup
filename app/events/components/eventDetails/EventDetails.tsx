import { Anchor, Box, Card, Image, Text, ThemeIcon } from "@mantine/core"
import React from "react"
import { eventDetailStyles } from "./styles"
import { Routes, useQuery, useRouter } from "blitz"
import getEvent from "../../queries/getEvent"
import { Edit } from "tabler-icons-react"
import { useCurrentUser } from "../../../core/hooks/useCurrentUser"

export const EventDetails = ({ eventId }: { eventId: string | undefined }) => {
  const { classes, theme } = eventDetailStyles()
  const user = useCurrentUser()
  const [event] = useQuery(getEvent, { id: eventId })
  const router = useRouter()
  const isOwner = user?.id === event?.owner?.id

  return (
    <Card withBorder p="xl" radius="md">
      <Card.Section className={classes.bg} sx={{ height: 200 }}>
        {isOwner && (
          <ThemeIcon
            className={classes.icon}
            m={"sm"}
            color={theme.colorScheme === "dark" ? "gray" : "white"}
            onClick={() => router.push(Routes.EditEventPage({ eventId: eventId || "" }))}
          >
            <Edit size={16} />
          </ThemeIcon>
        )}
        <Image width={200} height={200} src={""} alt="With default placeholder" withPlaceholder />
      </Card.Section>
      <Text align="center" size="lg" weight={500} mt="xl">
        {event?.name}
      </Text>
      <Text align="center" size="sm" color="dimmed">
        By{" "}
        <Anchor<"a">
          size="sm"
          onClick={(evt) => {
            evt.preventDefault()
            router.push(Routes.UserPage({ userId: event.owner.id }))
          }}
        >
          {event.owner.name}
        </Anchor>
      </Text>
    </Card>
  )
}
