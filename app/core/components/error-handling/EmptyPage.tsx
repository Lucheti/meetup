import React from "react"
import { createStyles, Title, Text, Button, Container, Group, Center } from "@mantine/core"

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: 80,
    paddingBottom: 80,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  label: {
    textAlign: "center",
    fontWeight: 900,
    fontSize: 220,
    lineHeight: 1,
    marginBottom: theme.spacing.xl * 1.5,
    color: theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2],

    [theme.fn.smallerThan("sm")]: {
      fontSize: 120,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    textAlign: "center",
    fontWeight: 900,
    fontSize: 38,

    [theme.fn.smallerThan("sm")]: {
      fontSize: 32,
    },
  },

  description: {
    maxWidth: 500,
    margin: "auto",
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xl * 1.5,
  },
}))

type EmptyPageArgs = {
  code: string
  title: string
  description: string
  button?: {
    text: string
    onClick: () => void
  }
}

export function EmptyPage({ code, title, description, button }: EmptyPageArgs) {
  const { classes } = useStyles()

  return (
    <Container className={classes.root}>
      <div className={classes.label}>{code}</div>
      <Title className={classes.title}>{title}</Title>
      <Text color="dimmed" size="lg" align="center" className={classes.description}>
        {description}
      </Text>
      {button && (
        <Group position="center">
          <Button onClick={button.onClick} variant="subtle" size="md">
            {button.text}
          </Button>
        </Group>
      )}
    </Container>
  )
}
