import { invalidateQuery, useMutation, useParams } from "blitz"
import verifyAccountMutation from "../../mutations/verifyAccount"
import { useEffect } from "react"
import getCurrentUser from "../../../users/queries/getCurrentUser"
import Layout from "../../../core/layouts/Layout"
import { Text } from "@mantine/core"

const VerifyAccount = () => {
  const [verifyAccount] = useMutation(verifyAccountMutation)

  useEffect(() => {
    verifyAccount().then(() => invalidateQuery(getCurrentUser))
  }, [])

  return (
    // <Container
    //   css={{
    //     minHeight: "100vh",
    //     linearGradient: "45deg, $blue600 -20%, $pink600 50%",
    //   }}
    //   display={"flex"}
    //   xl
    // >
    //   <Row justify="center" align="center">
    //     <Container display={"flex"}>
    //       <Card>
    <div>
      <Text>Your account has been verified!</Text>
      <Text>Go to the login page to log in.</Text>
    </div>
    //       </Card>
    //     </Container>
    //   </Row>
    // </Container>
  )
}

VerifyAccount.getLayout = (page) => <Layout title="Account verified">{page}</Layout>

export default VerifyAccount
