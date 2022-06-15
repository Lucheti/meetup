import React from "react"
import { Card, Col, Row, Button, Text, Loading } from "@nextui-org/react"
import { User, Event } from "db"
import { useMutation, useQuery, invalidateQuery, Routes, Link } from "blitz"
import joinEventMutation from "../mutations/joinEvent"
import { useCurrentUser } from "../../core/hooks/useCurrentUser"
import isParticipantQuery from "../queries/isParticipant"
import getEvents from "../queries/getEvents"

type EventCardProps = {
  event: Event
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const [joinEvent, joinEventMeta] = useMutation(joinEventMutation)
  const [isParticipant, isParticipantMeta] = useQuery(isParticipantQuery, { id: event.id })

  return (
    <Card css={{ w: "100%", h: "400px" }}>
      <Card.Header>
        <Col>
          <Text size={12} weight="bold" transform="uppercase" color="#9E9E9E">
            New
          </Text>

          <Link href={Routes.ShowEventPage({ eventId: event.id })}>
            <Text h3 color={"$colors$gray900"} css={{ cursor: "pointer" }}>
              {event.name}
            </Text>
          </Link>
        </Col>
      </Card.Header>
      <Card.Body css={{ p: 0 }}>
        <Card.Image
          src="https://nextui.org/images/card-example-5.jpeg"
          objectFit="cover"
          width="100%"
          height="100%"
          alt="Relaxing app background"
        />
      </Card.Body>
      <Card.Footer
        isBlurred
        css={{
          position: "absolute",
          bgBlur: "#0f111466",
          borderTop: "$borderWeights$light solid $gray800",
          bottom: 0,
          zIndex: 1,
        }}
      >
        <Row>
          <Col>
            <Row>
              <Col span={3}>
                <Card.Image
                  src="https://nextui.org/images/breathing-app-icon.jpeg"
                  css={{ bg: "black", br: "50%" }}
                  height={40}
                  width={40}
                  alt="Breathing app icon"
                />
              </Col>
              <Col>
                <Text color="#d1d1d1" size={12}>
                  Owner
                </Text>
                <Text color="#d1d1d1" size={12}>
                  + 15 participants
                </Text>
              </Col>
            </Row>
          </Col>
          <Col>
            <Row justify="flex-end">
              <Button
                flat
                auto
                css={{ color: "#94f9f0", bg: "#94f9f026" }}
                onClick={() =>
                  joinEvent({ id: event.id }).then(() => {
                    invalidateQuery(isParticipantQuery)
                    invalidateQuery(getEvents)
                  })
                }
                disabled={joinEventMeta.isLoading || isParticipantMeta.isLoading || isParticipant}
              >
                {joinEventMeta.isLoading ? (
                  <Loading color="currentColor" size="sm" />
                ) : (
                  <Text css={{ color: "inherit" }} size={12} weight="bold" transform="uppercase">
                    {isParticipant ? "Joined" : "Join"}
                  </Text>
                )}
              </Button>
            </Row>
          </Col>
        </Row>
      </Card.Footer>
    </Card>
  )
}
