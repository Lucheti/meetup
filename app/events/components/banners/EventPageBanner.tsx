import { createStyles, Group, Image, Paper, Space, Text } from "@mantine/core"
import React from "react"
import image from "./image2.svg"

const useStyles = createStyles((theme) => ({
  banner: {
    backgroundImage: `linear-gradient(-60deg, ${
      theme?.colors[theme?.primaryColor]?.[4] || ""
    } 0%, ${theme?.colors?.[theme.primaryColor]?.[7] || ""} 100%)`,
    padding: theme.spacing.xl * 2,
  },
  image: {
    maxWidth: "100%",
    marginTop: theme.spacing.xl * 6,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      maxWidth: "100%",
      marginTop: theme.spacing.xl,
    },
  },
  bigFont: {
    fontSize: theme.fontSizes.xl * 2,
  },
}))

export const EventPageBanner = () => {
  const { classes } = useStyles()

  return (
    <Paper className={classes.banner}>
      <Group position={"apart"} direction={"column"}>
        <Group direction={"column"}>
          <Text color={"white"} weight={500} className={classes.bigFont} mb={5}>
            Discover and join events with
            <Text color={"white"} weight={500} className={classes.bigFont}>
              all other creators!
            </Text>
          </Text>
          <Text color={"white"} size="md">
            <Text>
              Take a good look at all of our events and join the ones that are of tour interest.{" "}
            </Text>
            <Text>You can also create your own events and invite your friends to join.</Text>
          </Text>
        </Group>
        <Image src={image.src} className={classes.image} />
      </Group>
    </Paper>
  )
}
