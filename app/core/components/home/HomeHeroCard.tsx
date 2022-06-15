import { Button, Card, Grid, Spacer, Text } from "@nextui-org/react"

export const HomeHeroCard = () => {
  return (
    <Card css={{ $$cardColor: "$colors$gradientAlt", p: 60, w: "100%" }}>
      <Text h1 size={60} weight="bold" color={"white"}>
        Lets make celebrating Easier
      </Text>
      <Spacer y={1} />
      <Text h1 size={20} color={"white"} weight={"light"}>
        Hop on to discover the world of events
      </Text>
      <Spacer y={1} />
      <Grid.Container>
        <Grid>
          <Button css={{ background: "white", color: "#333" }} size={"lg"} flat>
            {" "}
            Discover events{" "}
          </Button>
        </Grid>
      </Grid.Container>
    </Card>
  )
}
