import { useQuery } from "blitz"
import getEvents from "../queries/getEvents"
import React from "react"
import {
  Avatar,
  Badge,
  Container,
  createStyles,
  Grid,
  Group,
  Paper,
  Progress,
  Space,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core"
import { Event, User } from "db"
import dayjs from "dayjs"

const ICON_SIZE = 70

const useStyles = createStyles((theme) => ({
  card: {
    position: "relative",
    overflow: "visible",
    padding: theme.spacing.xl,
    paddingTop: theme.spacing.xl * 1.5 + ICON_SIZE / 3,
  },

  icon: {
    position: "absolute",
    top: -ICON_SIZE / 3,
    left: `calc(50% - ${ICON_SIZE / 2}px)`,
  },

  event_title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1,
  },
  title: {
    padding: theme.spacing.xl,
    background: theme.colors.blue[5],
    color: "white",
  },
}))

const TopEvent = ({ event }: { event: Event & { owner: User; participants: User[] } }) => {
  const { classes } = useStyles()
  const progress = event?.capacity && (event.participants.length / event?.capacity) * 100
  const daysLeft = dayjs(event?.date).diff(dayjs(Date.now()), "day")
  return (
    <Grid.Col key={event.id} span={12}>
      <Paper radius="md" withBorder className={classes.card} mt={ICON_SIZE / 3}>
        <ThemeIcon className={classes.icon} size={ICON_SIZE} radius={ICON_SIZE}>
          <Avatar
            size={ICON_SIZE}
            src={
              "https://as2.ftcdn.net/v2/jpg/02/73/83/77/1000_F_273837724_rxwt9AmHNV2zout4XYiyL0Q5jQwgG9tx.jpg"
            }
            radius={"lg"}
          />
        </ThemeIcon>

        <Text align="center" weight={500} className={classes.event_title}>
          {event.name}
        </Text>
        <Text color="dimmed" align="center" size="sm">
          by {event.owner.name}
        </Text>

        {progress && (
          <>
            <Group position="apart" mt="xs">
              <Text size="sm" color="dimmed">
                Capacity
              </Text>
              <Text size="sm" color="dimmed">
                {progress}%
              </Text>
            </Group>

            <Progress value={progress} mt={5} />
          </>
        )}

        <Group position="apart" mt="md">
          <Text size="sm">20 / 36 km</Text>
          <Badge size="sm">{daysLeft === 1 ? "today" : `${daysLeft} days`}</Badge>
        </Group>
      </Paper>
    </Grid.Col>
  )
}

export const TopEvents = () => {
  const { classes } = useStyles()
  const [{ events }] = useQuery(getEvents, {
    orderBy: { participants: { _count: "desc" } },
    take: 5,
  })

  return (
    <Container>
      <Paper className={classes.title} radius="md" withBorder>
        <Title mb={5}> Top Events </Title>
        <Text size="sm">
          You will never miss important product updates, latest news and community QA sessions. Our
          newsletter is once a week, every Sunday.
        </Text>
      </Paper>
      <Space h={"xl"} />
      <Grid>
        {events.map((event) => (
          <TopEvent key={event.id} event={event} />
        ))}
      </Grid>
    </Container>
  )
}
