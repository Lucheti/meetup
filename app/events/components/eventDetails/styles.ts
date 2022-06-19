import { createStyles } from "@mantine/core"

export const eventDetailStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },
  avatar: {
    border: `2px solid ${theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white}`,
  },
  bg: {
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[4],
  },
}))
