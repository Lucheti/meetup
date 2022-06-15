import { useQuery } from "blitz"
import getEvents from "../queries/getEvents"
import { Avatar, Row, Spacer, Table, Text } from "@nextui-org/react"

export const TopEventsTable = () => {
  const [{ events }] = useQuery(getEvents, {
    orderBy: { participants: { _count: "desc" } },
    take: 5,
  })

  return (
    <Table
      css={{
        height: "auto",
        minWidth: "100%",
      }}
      shadow={false}
      selectionMode={"single"}
    >
      <Table.Header>
        <Table.Column>NAME</Table.Column>
        <Table.Column>OWNER</Table.Column>
        <Table.Column>PARTICIPANTS</Table.Column>
      </Table.Header>
      <Table.Body>
        {events.map((event, i) => (
          <Table.Row key={event.id}>
            <Table.Cell>{event.name}</Table.Cell>
            <Table.Cell>
              <Row>
                <Avatar size={"sm"} color={"primary"} />
                <Spacer x={0.5} />
                <Text>{event.owner.name}</Text>
              </Row>
            </Table.Cell>
            <Table.Cell>{event.participants.length}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}
