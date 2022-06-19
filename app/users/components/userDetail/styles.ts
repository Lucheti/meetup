import { createStyles } from "@mantine/core"

export const userDetailStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },
  Male: {
    backgroundColor: theme.colors.blue[7],
  },
  Female: {
    backgroundColor: theme.colors.pink[4],
  },
  Other: {
    background: theme.fn.linearGradient(
      90,
      theme.colors.red[7],
      `${theme.colors.red[7]} 16.6666%`,
      `${theme.colors.orange[7]} 16.6666%`,
      `${theme.colors.orange[7]} 33.333%`,
      `${theme.colors.yellow[7]} 33.333%`,
      `${theme.colors.yellow[7]} 50%`,
      `${theme.colors.green[7]} 50%`,
      `${theme.colors.green[7]} 66.666%`,
      `${theme.colors.blue[7]} 66.666%`,
      `${theme.colors.blue[7]} 83.333%`,
      `${theme.colors.indigo[7]} 83.333%`,
      `${theme.colors.indigo[7]} 100%`
    ),
  },
  avatar: {
    border: `2px solid ${theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white}`,
  },
  bg: {
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[4],
  },
}))
