import { Map, Overlay } from "pigeon-maps"
import { maptiler } from "pigeon-maps/providers"
import React from "react"
import { Box, Card, createStyles, Group, Paper, Space, Text } from "@mantine/core"
import { Target, Flag, Location as LocationIcon } from "tabler-icons-react"

const useStyles = createStyles((theme) => ({
  location: {
    position: "absolute",
    zIndex: Number.MAX_SAFE_INTEGER,
  },
  marker_point: {
    transform: "translate(5px,-10px)",
    width: 0,
    height: 0,
    border: "23px solid transparent",
    borderRight: "23px solid transparent",
    borderTop: "23px solid white",
    zIndex: 1,
  },
  mapContainer: {
    div: {
      borderRadius: 8,
    },
  },
}))

export const Location = ({ event }) => {
  const { classes } = useStyles()

  return (
    <Box className={classes.mapContainer}>
      <Card withBorder p={"sm"}>
        <Group>
          <LocationIcon color={"gray"} size={20} />

          <Text size="sm" color="dimmed" transform={"capitalize"}>
            {event.location.alias}
          </Text>
        </Group>
      </Card>
      <Space h={"xl"} />
      <Map
        provider={maptiler("EW0wjl9ko1WAO0rnFzb0", "pastel")}
        height={225}
        center={[event?.location?.latitude || 0, event?.location?.longitude || 0]}
        zoom={17}
      >
        <Overlay anchor={[event?.location?.latitude || 0, event?.location?.longitude || 0]}>
          <Flag size={30} color={"gray"} />
        </Overlay>
      </Map>
    </Box>
  )
}
