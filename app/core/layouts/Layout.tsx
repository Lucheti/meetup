import { Head, BlitzLayout } from "blitz"
import { NavigationBar } from "../components/navbar/Navbar"
import { Container, createStyles, Grid } from "@mantine/core"
import { AppFooter } from "../components/footer/footer"

const useStyles = createStyles((theme) => ({
  container: {
    background: theme.colorScheme === "dark" ? theme.colors.dark[7] : "#fdfeff",
    minHeight: "100vh",
    padding: 0,
  },
}))

const Layout: BlitzLayout<{ title?: string; children?: React.ReactNode }> = ({
  title,
  children,
}) => {
  const { classes } = useStyles()
  return (
    <>
      <Head>
        <title>{title || "meetup"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container fluid className={classes.container} p={0}>
        <NavigationBar />
        {children}
        <AppFooter />
      </Container>
    </>
  )
}

export default Layout
