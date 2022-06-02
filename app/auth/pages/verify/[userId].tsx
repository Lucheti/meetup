import { invalidateQuery, useMutation, useParams } from "blitz"
import { Card, Container, Row, Text } from "@nextui-org/react"
import verifyAccountMutation from "../../mutations/verifyAccount"
import { useEffect } from "react"
import getCurrentUser from "../../../users/queries/getCurrentUser"
import Layout from "../../../core/layouts/Layout"

const VerifyAccount = () => {
  const { userId } = useParams("string")
  const [verifyAccount] = useMutation(verifyAccountMutation)

  useEffect(() => {
    if (userId) {
      verifyAccount(userId).then(() => invalidateQuery(getCurrentUser))
    }
  }, [userId])

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
            <Text h4>Your account has been verified!</Text>
            <Text>Go to the login page to log in.</Text>
          </Card>
        </Container>
      </Row>
    </Container>
  )
}

VerifyAccount.getLayout = (page) => <Layout title="Account verified">{page}</Layout>

export default VerifyAccount
