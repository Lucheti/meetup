import React from "react"
import { Avatar, Button, Card, Group, LoadingOverlay, Text } from "@mantine/core"
import { userDetailStyles } from "./styles"
import { UserStats } from "./userStats"
import getUser from "../../queries/getUser"
import { invalidateQuery, useMutation, useQuery } from "blitz"
import followUserMutation from "../../../followers/mutations/followUser"
import isFollowerQuery from "../../../followers/queries/isFollower"
import { showNotification } from "@mantine/notifications"
import unfollowUserMutation from "app/followers/mutations/unfollowUser"
import getFollowerCount from "../../../followers/queries/getFollowerCount"
import { UserPlus, UserMinus } from "tabler-icons-react"

type UserDetailProps = {
  userId: string | undefined
  showFollow?: boolean
}

export function UserDetail({ userId, showFollow = false }: UserDetailProps) {
  const { classes, cx } = userDetailStyles()
  const [user] = useQuery(getUser, { id: userId })
  const [followUser] = useMutation(followUserMutation)
  const [unfollowUser] = useMutation(unfollowUserMutation)
  const [isFollower] = useQuery(isFollowerQuery, { followeeId: user?.id })

  if (!user) {
    return <LoadingOverlay visible={true} />
  }

  const handleFollow = async () => {
    if (isFollower) {
      await unfollowUser({ followeeId: user.id })
      showNotification({
        message: "You are no longer following " + user.name,
        color: "teal",
      })
    } else {
      await followUser({ followeeId: user.id })
      showNotification({
        message: "You are now following " + user.name,
        color: "teal",
      })
    }
    invalidateQuery(isFollowerQuery)
    invalidateQuery(getFollowerCount)
  }

  return (
    <Card withBorder p="xl" radius="md">
      <Card.Section className={cx(classes.bg, classes[user.sex])} sx={{ height: 100 }} />
      <Avatar
        src={user?.images?.url_small || undefined}
        size={80}
        radius={80}
        mx="auto"
        mt={-30}
        className={classes.avatar}
      />
      <Text align="center" size="lg" weight={500} mt="sm">
        @{user?.username}
      </Text>
      <Text align="center" size="sm" color="dimmed">
        {user?.email}
      </Text>
      <Group mt="md" position="center" spacing={30}>
        <UserStats userId={userId} />
      </Group>
      {showFollow && (
        <Button
          fullWidth
          radius="md"
          mt="xl"
          size="md"
          color={isFollower ? "dark" : "blue"}
          leftIcon={isFollower ? <UserMinus size={16} /> : <UserPlus size={16} />}
          onClick={handleFollow}
        >
          <Text size={"sm"}>{isFollower ? "Unfollow" : "Follow"}</Text>
        </Button>
      )}
    </Card>
  )
}
