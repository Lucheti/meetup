import { Button, Group, Notification, Text, Transition } from "@mantine/core"
import { InfoCircle, Check } from "tabler-icons-react"
import React from "react"

export const InvitationLink = ({ eventId }: { eventId: string | undefined }) => {
  const [copy, setCopy] = React.useState(true)
  const [ready, setReady] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  return (
    <Notification p={"md"} icon={<InfoCircle />} color={"teal"} disallowClose>
      <Group position={"apart"}>
        <Text> Invite your friends to join the event! </Text>
        <Button
          color={"teal"}
          onClick={() => {
            setLoading(true)
            setCopy(false)

            //copy link to clipboard
            navigator.clipboard.writeText(
              `${process.env.BLITZ_PUBLIC_BASE_URL}/events/join/${eventId}`
            )

            setTimeout(() => {
              setLoading(false)
              setReady(true)
            }, 200)
          }}
          loading={loading}
        >
          <Transition mounted={copy} transition="fade" timingFunction="ease-in-out">
            {(styles) => (
              <Text size={"sm"} style={styles}>
                Copy link
              </Text>
            )}
          </Transition>
          <Transition mounted={ready} transition="fade" timingFunction="ease-in-out">
            {(styles) => (
              <Text size={"sm"} style={styles}>
                {" "}
                Copied!{" "}
              </Text>
            )}
          </Transition>
        </Button>
      </Group>
    </Notification>
  )
}
