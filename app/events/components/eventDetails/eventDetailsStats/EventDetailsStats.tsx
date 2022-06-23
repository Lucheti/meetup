import React from "react"
import { createStyles, Text } from "@mantine/core"
import { useEventDetailsStatsStyles } from "./styles"
import { Event, User } from "db"

type EventDetailsStatsProps = {
  event?: Event & {
    participants: Partial<User>[]
  }
}

export const EventDetailsStats = ({ event }: EventDetailsStatsProps) => {
  const { classes } = useEventDetailsStatsStyles()

  const data = [
    {
      title: "New participants",
      stats: event?.participants.length,
      description: "Since the be",
    },
    {
      title: "Invitations",
      stats: "2,175",
      description: "Invitations sent",
    },
    {
      title: "Completed orders",
      stats: "1,994",
      description: "1994 orders were completed this month, 97% satisfaction rate",
    },
  ]
  const stats = data.map((stat) => (
    <div key={stat.title} className={classes.stat}>
      <Text className={classes.count}>{stat.stats}</Text>
      <Text className={classes.title}>{stat.title}</Text>
      <Text className={classes.description}>{stat.description}</Text>
    </div>
  ))
  return <div className={classes.root}>{stats}</div>
}
