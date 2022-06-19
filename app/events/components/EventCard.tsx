import React from "react"
import { Event, User, Location } from "db"
import { invalidateQuery, Routes, useMutation, useQuery, useRouter } from "blitz"
import joinEventMutation from "../mutations/joinEvent"
import isParticipantQuery from "../queries/isParticipant"
import { Clock, Location as LocationIcon, Minus } from "tabler-icons-react"
import {
  ActionIcon,
  Anchor,
  Avatar,
  AvatarsGroup,
  Button,
  Card,
  createStyles,
  Group,
  Image,
  Progress,
  Space,
  Text,
} from "@mantine/core"
import { showNotification } from "@mantine/notifications"
import leaveEventMutation from "../mutations/leaveEvent"
import dayjs from "dayjs"
import getEventsQuery from "../queries/getEvents"

type EventCardProps = {
  event: Event & { owner: User; participants: User[]; location: Location }
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const { classes, theme } = useStyles()
  const router = useRouter()
  const [joinEvent, joinEventMeta] = useMutation(joinEventMutation, {
    onSuccess: (data) => {
      invalidateQuery(isParticipantQuery)
      invalidateQuery(getEventsQuery)
      showNotification({
        title: `Joined event ${data.name}`,
        message: "13 days left to assist!",
      })
    },
  })

  const [leaveEvent, leaveEventMeta] = useMutation(leaveEventMutation, {
    onSuccess: (data) => {
      invalidateQuery(isParticipantQuery)
      invalidateQuery(getEventsQuery)
      showNotification({
        title: `Left event ${data.name}`,
        message: "We had to let you go",
      })
    },
  })

  const [isParticipant, isParticipantMeta] = useQuery(isParticipantQuery, { id: event.id })
  const eventDate = dayjs(event.date).format("DD/MM/YYYY")
  const eventTime = dayjs(event.date).format("HH:MM")
  const daysLeft = dayjs(event?.date).diff(dayjs(Date.now()), "day")
  const progress = (event?.capacity && (event.participants.length / event?.capacity) * 100) || 0
  const progressColor = progress
    ? progress < 50
      ? theme.colors.blue[5]
      : progress < 75
      ? theme.colors.yellow[5]
      : theme.colors.red[5]
    : undefined

  return (
    <Card withBorder radius="xl" p="md" shadow={"sm"} className={classes.card}>
      <Card.Section p={"lg"}>
        <Image
          radius={"lg"}
          src={
            "https://as2.ftcdn.net/v2/jpg/02/73/83/77/1000_F_273837724_rxwt9AmHNV2zout4XYiyL0Q5jQwgG9tx.jpg"
          }
          alt={event.name}
          height={180}
        />
      </Card.Section>

      <Group spacing="sm" mt={"sm"} position={"apart"} noWrap>
        <Group direction={"column"} spacing={0} grow>
          <Text
            size="sm"
            weight={500}
            lineClamp={1}
            onClick={() => router.push(Routes.ShowEventPage({ eventId: event.id }))}
            className={classes.pointer}
          >
            {event.name}
          </Text>
          <Text color="dimmed" size="xs">
            By{" "}
            <Anchor<"a">
              size="xs"
              onClick={(evt) => {
                evt.preventDefault()
                router.push(Routes.UserPage({ userId: event.owner.id }))
              }}
            >
              {event.owner.name}
            </Anchor>
          </Text>
        </Group>
        <AvatarsGroup limit={1} total={event.participants.length} style={{ width: "auto" }}>
          {event.participants.map((participant) => (
            <Avatar
              key={participant.id}
              src={
                "https://img.freepik.com/free-photo/portrait-cheerful-excited-tablet-user-wearing-eyeglasses_1262-18272.jpg?t=st=1655301292~exp=1655301892~hmac=e83046e607e86c9a67501b2b3ec4e96dd1b675fe9d987c94664319558a5af672"
              }
              component="a"
            />
          ))}
        </AvatarsGroup>
      </Group>

      <Space h={"lg"} />

      <Group position="apart" mt="xs">
        <Text size="sm" color="dimmed">
          Capacity
        </Text>
        <Text size="sm" color="dimmed">
          {progress}% (max {event.capacity})
        </Text>
      </Group>

      <Progress color={progressColor} value={progress} mt={5} />

      <Space h={"lg"} />
      <Group position={"apart"}>
        <Group>
          <Clock color={"gray"} size={20} />

          <Text size="sm" color="dimmed">
            {eventDate} - {eventTime}
          </Text>
        </Group>

        <Text size="sm" color="dimmed">
          {daysLeft === 0 ? "Today" : `In ${daysLeft} days`}
        </Text>
      </Group>

      <Space h={"lg"} />

      <Group>
        <LocationIcon color={"gray"} size={20} />

        <Text size="sm" color="dimmed" transform={"capitalize"}>
          {event.location.alias}
        </Text>
      </Group>

      <Group mt="xl">
        <Button
          radius="lg"
          style={{ flex: 1 }}
          onClick={() => joinEvent({ id: event.id })}
          loading={joinEventMeta.isLoading || isParticipantMeta.isLoading}
          disabled={isParticipant}
        >
          {isParticipant ? "Joined" : "Join"}
        </Button>
        {isParticipant && (
          <ActionIcon
            variant="default"
            radius="lg"
            size={36}
            loading={leaveEventMeta.isLoading || isParticipantMeta.isLoading}
            onClick={() => leaveEvent({ id: event.id })}
          >
            <Minus size={18} className={classes.like} />
          </ActionIcon>
        )}
      </Group>
    </Card>
  )
}

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  section: {
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },

  like: {
    color: theme.colors.red[6],
  },

  label: {
    textTransform: "uppercase",
    fontSize: theme.fontSizes.xs,
    fontWeight: 700,
  },
  pointer: {
    cursor: "pointer",
  },
}))
