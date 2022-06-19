import { Avatar, Button, Card, Group, Text } from "@mantine/core"
import { UserStats } from "../../../users/components/userDetail/userStats"
import { UserMinus, UserPlus } from "tabler-icons-react"
import React from "react"
import { eventDetailStyles } from "./styles"
import { useQuery } from "blitz"
import getEvent from "../../queries/getEvent"

export const EventDetails = ({ eventId }: { eventId: string | undefined }) => {
  const { classes } = eventDetailStyles()
  const [event] = useQuery(getEvent, { id: eventId })

  return (
    <Card withBorder p="xl" radius="md" className={classes.card}>
      <Card.Section className={classes.bg} sx={{ height: 100 }} />
      <Text align="center" size="lg" weight={500} mt="sm">
        {event?.name}
      </Text>
      <Text align="center" size="sm" color="dimmed">
        By {event?.owner.name}
      </Text>
    </Card>
  )
}
