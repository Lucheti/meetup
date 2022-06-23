import { BlitzPage, Routes, useMutation, useParam, useRouter } from "blitz"
import Layout from "../../../../core/layouts/Layout"
import { Button, Center, Container, Group, LoadingOverlay, Paper, Text, Title } from "@mantine/core"
import { useCurrentUser } from "../../../../core/hooks/useCurrentUser"
import joinEventMutation from "../../../mutations/joinEvent"
import React, { useEffect } from "react"
import { showNotification } from "@mantine/notifications"
import { useJoinEventStyles } from "./styles"

export const JoinEvent: BlitzPage = () => {
  const eventId = useParam("eventId", "string")
  const { classes } = useJoinEventStyles()
  const router = useRouter()
  const [joinEvent, { isSuccess, isError, error, isLoading }] = useMutation(joinEventMutation)

  useEffect(() => {
    if (eventId)
      joinEvent({ id: eventId })
        .then(() => showNotification({ message: "You have joined the event" }))
        .catch((error) => showNotification({ message: error.message }))
  }, [])

  const Message = () => {
    return (
      <Container className={classes.root} fluid>
        <div className={classes.inner}>
          <div className={classes.image}>
            <div className={classes.label}>
              {isSuccess && "YES!"}
              {isError && "OOPS!"}
            </div>
          </div>
          <div className={classes.content}>
            <Title className={classes.title}>
              {isSuccess && "You have joined the event!"}
              {isError && (error as Error).message}
            </Title>
            <Text color="dimmed" size="lg" align="center" className={classes.description}>
              {isSuccess &&
                "Thanks for joining! For more information about your event, check out the event page."}
              {isError &&
                "It seems like there's been a error, please check if you copied the link correctly, otherwise go back to the home page."}
            </Text>
            <Group position="center">
              <Button
                onClick={() => {
                  isSuccess && router.push(Routes.ShowEventPage({ eventId: eventId || "" }))
                  isError && router.push(Routes.Home())
                }}
                size="md"
              >
                {isSuccess && "See event"}
                {isError && "Go home"}
              </Button>
            </Group>
          </div>
        </div>
      </Container>
    )
  }

  return (
    <Container size={"xl"}>
      <Center>
        {(isSuccess || isError) && <Message />}
        <LoadingOverlay visible={isLoading} />
      </Center>
    </Container>
  )
}

JoinEvent.getLayout = (page) => <Layout title="Join Event">{page}</Layout>
JoinEvent.authenticate = true

export default JoinEvent
