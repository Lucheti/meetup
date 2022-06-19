import { usePaginatedQuery, useQuery } from "blitz"
import getEvents from "../../../events/queries/getEvents"
import { LoadingOverlay, Text } from "@mantine/core"
import React from "react"
import getFollowerCount from "../../../followers/queries/getFollowerCount"
import getFollowingCount from "../../../followers/queries/getFollowingCount"
import getEventsCount from "../../../events/queries/getEventsCount"
import { useCurrentUser } from "../../../core/hooks/useCurrentUser"
import getUser from "../../queries/getUser"

type UserStatsProps = {
  userId: string | undefined
}

export const UserStats = ({ userId }: UserStatsProps) => {
  const [user] = useQuery(getUser, { id: userId })
  const [followerCount, {}] = useQuery(getFollowerCount, { userId: user?.id })
  const [followingCount, {}] = useQuery(getFollowingCount, { userId: user?.id })
  const [eventCount, {}] = useQuery(getEventsCount, { userId: user?.id })
  const stats = [
    { label: "Followers", value: followerCount },
    { label: "Following", value: followingCount },
    { label: "Events", value: eventCount },
  ]

  if (!user) {
    return <LoadingOverlay visible={true} />
  }

  return (
    <>
      {stats.map((stat) => (
        <div key={stat.label}>
          <Text align="center" size="lg" weight={500}>
            {stat.value}
          </Text>
          <Text align="center" size="sm" color="dimmed">
            {stat.label}
          </Text>
        </div>
      ))}
    </>
  )
}
