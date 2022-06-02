import Layout from "../../core/layouts/Layout"
import { Card, Container, Row, Text } from "@nextui-org/react"
import { LoginForm } from "../components/LoginForm"
import { useCurrentUser } from "../../core/hooks/useCurrentUser"
import { useEffect } from "react"
import { Routes, useRouter } from "blitz"

const CheckEmail = () => {
  const currentUser = useCurrentUser()
  const router = useRouter()

  useEffect(() => {
    if (currentUser?.emailVerified) {
      router.push(Routes.Home())
    }
  }, [currentUser])

  return (
    <Container
      css={{
        minHeight: "100vh",
        linearGradient: "45deg, $blue600 -20%, $pink600 50%",
      }}
      display={"flex"}
      xl
    >
      <Row justify="center" align="center">
        <Container display={"flex"}>
          <Card>
            <Text h4>Thanks for Signing Up!</Text>
            <Text>Please check your email to verify your account.</Text>
          </Card>
        </Container>
      </Row>
    </Container>
  )
}

CheckEmail.redirectAuthenticatedTo = "/"
CheckEmail.getLayout = (page) => <Layout title="Verify Account">{page}</Layout>

export default CheckEmail
